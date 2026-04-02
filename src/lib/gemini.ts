import { GoogleGenerativeAI } from "@google/generative-ai";
import { getPersona } from "./personas";

// ---------------------------------------------------------------------------
// Custom error classes
// ---------------------------------------------------------------------------

export class GeminiRateLimitError extends Error {
  retryAfterMs: number;
  constructor(message: string, retryAfterMs: number = 30000) {
    super(message);
    this.name = "GeminiRateLimitError";
    this.retryAfterMs = retryAfterMs;
  }
}

export class GeminiConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "GeminiConfigError";
  }
}

// ---------------------------------------------------------------------------
// Fallback model chain
// ---------------------------------------------------------------------------

const FALLBACK_MODELS = [
  "gemini-2.0-flash",
  "gemini-2.0-flash-lite",
  "gemini-1.5-flash",
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getGeminiClient(): GoogleGenerativeAI {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new GeminiConfigError("GEMINI_API_KEY is not configured");
  }

  return new GoogleGenerativeAI(apiKey);
}

function isRateLimitError(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const msg = error.message.toLowerCase();
  return (
    msg.includes("429") ||
    msg.includes("too many requests") ||
    msg.includes("quota") ||
    msg.includes("resource has been exhausted") ||
    msg.includes("rate limit")
  );
}

function parseRetryDelay(error: unknown): number {
  if (!(error instanceof Error)) return 30000;
  // Try to extract a "retry in XXs" hint from the error message
  const match = error.message.match(/retry\s+(?:in|after)\s+(\d+)\s*s/i);
  if (match) {
    return parseInt(match[1], 10) * 1000;
  }
  return 30000;
}

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ---------------------------------------------------------------------------
// Core: try a single model with retry + exponential backoff
// ---------------------------------------------------------------------------

async function tryModelWithRetry(
  client: GoogleGenerativeAI,
  modelName: string,
  systemPrompt: string,
  userMessage: string,
  chatHistory: Array<{ role: string; content: string }>,
  maxRetries: number = 1,
): Promise<string | null> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const model = client.getGenerativeModel({
        model: modelName,
        systemInstruction: systemPrompt,
      });

      const geminiHistory = chatHistory.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

      const chat = model.startChat({ history: geminiHistory });
      const result = await chat.sendMessage(userMessage);
      const text = result.response.text();

      if (!text) {
        throw new Error("Empty response from Gemini");
      }

      console.log(
        `[Witcher Oracle] ✅ Resposta obtida via modelo: ${modelName}`,
      );
      return text;
    } catch (error) {
      if (isRateLimitError(error)) {
        console.warn(
          `[Witcher Oracle] ⚠️ Rate limit no modelo ${modelName} (tentativa ${attempt + 1}/${maxRetries + 1})`,
        );

        if (attempt < maxRetries) {
          const delay = Math.min(2000 * Math.pow(2, attempt), 8000);
          console.log(
            `[Witcher Oracle] ⏳ Aguardando ${delay}ms antes de tentar novamente...`,
          );
          await sleep(delay);
          continue;
        }

        // All retries exhausted for this model — signal caller to try next
        return null;
      }

      // Non-rate-limit error — propagate immediately
      throw error;
    }
  }

  return null;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function getWitcherResponse(
  userMessage: string,
  chatHistory: Array<{ role: string; content: string }>,
  personaId?: string,
): Promise<string> {
  const client = getGeminiClient(); // May throw GeminiConfigError

  const persona = getPersona(personaId ?? "vesemir");
  const systemPrompt = persona.systemPrompt;

  // If the user pinned a specific model via env var, skip the fallback chain
  const envModel = process.env.GEMINI_MODEL;
  const modelsToTry = envModel ? [envModel] : FALLBACK_MODELS;

  let lastRetryDelay = 30000;

  for (const modelName of modelsToTry) {
    console.log(
      `[Witcher Oracle] 🔄 Tentando modelo: ${modelName} (persona: ${persona.name})...`,
    );

    try {
      const result = await tryModelWithRetry(
        client,
        modelName,
        systemPrompt,
        userMessage,
        chatHistory,
        1, // maxRetries per model
      );

      if (result !== null) {
        return result;
      }

      console.warn(
        `[Witcher Oracle] ❌ Modelo ${modelName} esgotado, tentando próximo...`,
      );
    } catch (error) {
      // Non-rate-limit error from tryModelWithRetry — bubble up
      if (isRateLimitError(error)) {
        lastRetryDelay = parseRetryDelay(error);
        console.warn(
          `[Witcher Oracle] ❌ Modelo ${modelName} esgotado (rate limit), tentando próximo...`,
        );
        continue;
      }
      throw error;
    }
  }

  // Every model in the chain was rate-limited
  throw new GeminiRateLimitError(
    "Todos os modelos atingiram o limite de requisições. Aguarde antes de tentar novamente.",
    lastRetryDelay,
  );
}
