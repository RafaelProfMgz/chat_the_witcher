import { NextRequest, NextResponse } from "next/server";
import {
  getWitcherResponse,
  GeminiRateLimitError,
  GeminiConfigError,
} from "@/lib/gemini";

// ---------------------------------------------------------------------------
// In-memory rate limiting (per IP, max 30 requests / minute)
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  timestamps: number[];
}

const rateLimitMap = new Map<string, RateLimitEntry>();

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 30;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { timestamps: [now] });
    return false;
  }

  // Purge timestamps older than the window
  entry.timestamps = entry.timestamps.filter(
    (ts) => now - ts < RATE_LIMIT_WINDOW_MS,
  );

  if (entry.timestamps.length >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.timestamps.push(now);
  return false;
}

// Periodic cleanup so the map doesn't grow unbounded (every 5 min)
setInterval(
  () => {
    const now = Date.now();
    for (const [ip, entry] of rateLimitMap.entries()) {
      entry.timestamps = entry.timestamps.filter(
        (ts) => now - ts < RATE_LIMIT_WINDOW_MS,
      );
      if (entry.timestamps.length === 0) {
        rateLimitMap.delete(ip);
      }
    }
  },
  5 * 60 * 1000,
);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  return request.headers.get("x-real-ip") ?? "127.0.0.1";
}

interface ChatRequestBody {
  message: string;
  history: Array<{ role: string; content: string }>;
  persona?: string;
}

function isValidBody(body: unknown): body is ChatRequestBody {
  if (typeof body !== "object" || body === null) return false;

  const obj = body as Record<string, unknown>;

  if (typeof obj.message !== "string" || obj.message.trim().length === 0) {
    return false;
  }

  if (!Array.isArray(obj.history)) {
    return false;
  }

  // persona is optional, but if present must be a string
  if (obj.persona !== undefined && typeof obj.persona !== "string") {
    return false;
  }

  return obj.history.every(
    (entry: unknown) =>
      typeof entry === "object" &&
      entry !== null &&
      typeof (entry as Record<string, unknown>).role === "string" &&
      typeof (entry as Record<string, unknown>).content === "string",
  );
}

// ---------------------------------------------------------------------------
// POST /api/chat
// ---------------------------------------------------------------------------

export async function POST(request: NextRequest) {
  // 1. Rate limiting
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        error:
          "Calma, jovem bruxo. Até mesmo Vesemir precisa de um momento para " +
          "recuperar o fôlego. Tente novamente em instantes.",
      },
      { status: 429 },
    );
  }

  // 2. Parse & validate body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corpo da requisição inválido. Envie um JSON válido." },
      { status: 400 },
    );
  }

  if (!isValidBody(body)) {
    return NextResponse.json(
      {
        error:
          'Requisição mal-formada. Envie { "message": string, "history": Array<{ role: string, content: string }>, "persona"?: string }.',
      },
      { status: 400 },
    );
  }

  const { message, history, persona } = body;

  // 3. Call the Gemini service
  try {
    const response = await getWitcherResponse(message, history, persona);
    return NextResponse.json({ response }, { status: 200 });
  } catch (error) {
    console.error("[/api/chat] Error:", error);

    if (error instanceof GeminiRateLimitError) {
      return NextResponse.json(
        {
          error:
            "Os sinais mágicos estão sobrecarregados... Todos os canais de poder atingiram seu limite. Aguarde um momento e tente novamente, jovem bruxo.",
          retryAfterMs: error.retryAfterMs,
          code: "RATE_LIMITED",
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.ceil(error.retryAfterMs / 1000)),
          },
        },
      );
    }

    if (error instanceof GeminiConfigError) {
      return NextResponse.json(
        {
          error:
            "A chave da API Gemini não está configurada. Defina GEMINI_API_KEY no .env.local",
          code: "CONFIG_ERROR",
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        error:
          "Os sinais mágicos estão instáveis... Não foi possível responder. Tente novamente mais tarde.",
        code: "INTERNAL_ERROR",
      },
      { status: 500 },
    );
  }
}
