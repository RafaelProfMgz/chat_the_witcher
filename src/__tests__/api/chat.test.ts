/**
 * @jest-environment node
 */

import { GeminiConfigError, GeminiRateLimitError } from "@/lib/gemini";

const mockGetWitcherResponse = jest.fn();

jest.mock("@/lib/gemini", () => ({
  getWitcherResponse: (...args: unknown[]) => mockGetWitcherResponse(...args),
  GeminiConfigError: class GeminiConfigError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "GeminiConfigError";
    }
  },
  GeminiRateLimitError: class GeminiRateLimitError extends Error {
    retryAfterMs: number;
    constructor(message: string, retryAfterMs: number = 30000) {
      super(message);
      this.name = "GeminiRateLimitError";
      this.retryAfterMs = retryAfterMs;
    }
  },
}));

describe("POST /api/chat", () => {
  let POST: (req: Request) => Promise<Response>;

  beforeAll(async () => {
    jest.useFakeTimers();
    const mod = await import("@/app/api/chat/route");
    POST = mod.POST as unknown as (req: Request) => Promise<Response>;
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  afterEach(() => {
    mockGetWitcherResponse.mockReset();
  });

  function buildRequest(body: unknown): Request {
    const { NextRequest } = require("next/server");
    return new NextRequest("http://localhost:3002/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  }

  it("returns 400 for missing message", async () => {
    const request = buildRequest({ history: [] });
    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toHaveProperty("error");
  });

  it("returns 400 for empty message", async () => {
    const request = buildRequest({ message: "", history: [] });
    const response = await POST(request);

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toHaveProperty("error");
  });

  it("returns 400 for message that is only whitespace", async () => {
    const request = buildRequest({ message: "   ", history: [] });
    const response = await POST(request);

    expect(response.status).toBe(400);
  });

  it("returns 500 when getWitcherResponse throws GeminiConfigError", async () => {
    const { GeminiConfigError: MockedConfigError } = require("@/lib/gemini");
    mockGetWitcherResponse.mockRejectedValue(
      new MockedConfigError("GEMINI_API_KEY is not configured"),
    );

    const request = buildRequest({ message: "Hello", history: [] });
    const response = await POST(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data.error).toContain("Gemini");
    expect(data.code).toBe("CONFIG_ERROR");
  });

  it("returns 429 when getWitcherResponse throws GeminiRateLimitError", async () => {
    const {
      GeminiRateLimitError: MockedRateLimitError,
    } = require("@/lib/gemini");
    mockGetWitcherResponse.mockRejectedValue(
      new MockedRateLimitError("Rate limited", 45000),
    );

    const request = buildRequest({ message: "Hello", history: [] });
    const response = await POST(request);

    expect(response.status).toBe(429);
    const data = await response.json();
    expect(data).toHaveProperty("error");
    expect(data.code).toBe("RATE_LIMITED");
    expect(data.retryAfterMs).toBe(45000);
    expect(response.headers.get("Retry-After")).toBe("45");
  });

  it("returns 200 with response on success", async () => {
    mockGetWitcherResponse.mockResolvedValue(
      "Ah, jovem bruxo, deixe-me contar sobre os sinais...",
    );

    const request = buildRequest({
      message: "Quais são os sinais?",
      history: [],
    });
    const response = await POST(request);

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.response).toBe(
      "Ah, jovem bruxo, deixe-me contar sobre os sinais...",
    );
  });

  it("returns 500 for unexpected errors", async () => {
    mockGetWitcherResponse.mockRejectedValue(new Error("Unexpected failure"));

    const request = buildRequest({ message: "Hello", history: [] });
    const response = await POST(request);

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toHaveProperty("error");
    expect(data.code).toBe("INTERNAL_ERROR");
  });

  it("passes message and history to getWitcherResponse", async () => {
    mockGetWitcherResponse.mockResolvedValue("Resposta do Vesemir");

    const history = [
      { role: "user", content: "Olá" },
      { role: "assistant", content: "Bem-vindo" },
    ];

    const request = buildRequest({
      message: "Como derrotar o Grifino?",
      history,
    });
    await POST(request);

    expect(mockGetWitcherResponse).toHaveBeenCalledWith(
      "Como derrotar o Grifino?",
      history,
      undefined,
    );
  });
});
