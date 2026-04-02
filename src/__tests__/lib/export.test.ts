import { exportAsText, exportAsMarkdown, generateFilename } from "@/lib/export";
import { Message } from "@/types/chat";

const mockMessages: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Quais são os sinais?",
    timestamp: new Date("2025-01-15T14:30:00"),
  },
  {
    id: "2",
    role: "assistant",
    content:
      "Ah, os sinais... São cinco no total: Aard, Igni, Yrden, Quen e Axii.",
    timestamp: new Date("2025-01-15T14:30:15"),
  },
];

const singleMessage: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Olá, Vesemir!",
    timestamp: new Date("2025-01-15T10:00:00"),
  },
];

// Messages with timestamps as strings (simulating JSON deserialization)
const messagesWithStringTimestamps: Message[] = [
  {
    id: "1",
    role: "user",
    content: "Teste com string timestamp",
    timestamp: "2025-01-15T14:30:00" as unknown as Date,
  },
];

describe("exportAsText", () => {
  it("generates correct format with header, messages, and footer", () => {
    const result = exportAsText(mockMessages, "Conversa sobre Sinais");

    expect(result).toContain("═══ Witcher Oracle — Conversa sobre Sinais ═══");
    expect(result).toContain("Exportado em:");
    expect(result).toContain("─".repeat(50));
    expect(result).toContain("Você:");
    expect(result).toContain("Quais são os sinais?");
    expect(result).toContain("Vesemir:");
    expect(result).toContain(
      "Ah, os sinais... São cinco no total: Aard, Igni, Yrden, Quen e Axii.",
    );
    expect(result).toContain("--- Fim da conversa ---");
    expect(result).toContain("Gerado por Witcher Oracle • witcher-oracle.app");
  });

  it("handles empty messages array", () => {
    const result = exportAsText([], "Vazio");
    expect(result).toBe("Nenhuma mensagem para exportar");
  });

  it("handles undefined/null-like messages", () => {
    const result = exportAsText(undefined as unknown as Message[], "Nulo");
    expect(result).toBe("Nenhuma mensagem para exportar");
  });

  it("formats timestamps correctly with HH:MM pattern", () => {
    const result = exportAsText(mockMessages, "Teste");

    // Match [HH:MM] pattern — the exact value depends on locale/timezone,
    // but the format should always be present
    const timePattern = /\[\d{2}:\d{2}\]/g;
    const matches = result.match(timePattern);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(2);
  });

  it("labels user messages as 'Você' and assistant as 'Vesemir'", () => {
    const result = exportAsText(mockMessages, "Teste");

    const lines = result.split("\n");
    const senderLines = lines.filter((l) => /\[\d{2}:\d{2}\]/.test(l));

    expect(senderLines[0]).toContain("Você:");
    expect(senderLines[1]).toContain("Vesemir:");
  });

  it("handles messages with string timestamps (JSON deserialization)", () => {
    const result = exportAsText(messagesWithStringTimestamps, "Teste String");

    expect(result).toContain("Você:");
    expect(result).toContain("Teste com string timestamp");
    expect(result).not.toBe("Nenhuma mensagem para exportar");
  });

  it("works with a single message", () => {
    const result = exportAsText(singleMessage, "Uma mensagem");

    expect(result).toContain("═══ Witcher Oracle — Uma mensagem ═══");
    expect(result).toContain("Olá, Vesemir!");
    expect(result).toContain("--- Fim da conversa ---");
  });
});

describe("exportAsMarkdown", () => {
  it("generates correct markdown with headers and separators", () => {
    const result = exportAsMarkdown(mockMessages, "Conversa sobre Sinais");

    expect(result).toContain("# 🐺 Witcher Oracle — Conversa sobre Sinais");
    expect(result).toContain("> Exportado em");
    expect(result).toContain("| 2 mensagens");
    expect(result).toContain("---");
    expect(result).toContain("### 🗡️ Você —");
    expect(result).toContain("Quais são os sinais?");
    expect(result).toContain("### 🐺 Vesemir —");
    expect(result).toContain(
      "Ah, os sinais... São cinco no total: Aard, Igni, Yrden, Quen e Axii.",
    );
    expect(result).toContain(
      "*Gerado por [Witcher Oracle](https://github.com/) • O Oráculo do Bruxo*",
    );
  });

  it("handles empty messages", () => {
    const result = exportAsMarkdown([], "Vazio");
    expect(result).toBe("Nenhuma mensagem para exportar");
  });

  it("handles undefined/null-like messages", () => {
    const result = exportAsMarkdown(undefined as unknown as Message[], "Nulo");
    expect(result).toBe("Nenhuma mensagem para exportar");
  });

  it("correctly counts messages in the header", () => {
    const resultTwo = exportAsMarkdown(mockMessages, "Duas");
    expect(resultTwo).toContain("| 2 mensagens");

    const resultOne = exportAsMarkdown(singleMessage, "Uma");
    expect(resultOne).toContain("| 1 mensagens");
  });

  it("uses correct icons for user and assistant", () => {
    const result = exportAsMarkdown(mockMessages, "Ícones");

    expect(result).toContain("### 🗡️ Você");
    expect(result).toContain("### 🐺 Vesemir");
  });

  it("includes time in message headers", () => {
    const result = exportAsMarkdown(mockMessages, "Tempo");

    // Each message header should have a time like "— HH:MM"
    const headerPattern = /### .+ — \d{2}:\d{2}/g;
    const matches = result.match(headerPattern);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(2);
  });

  it("handles messages with string timestamps (JSON deserialization)", () => {
    const result = exportAsMarkdown(
      messagesWithStringTimestamps,
      "Teste String",
    );

    expect(result).toContain("### 🗡️ Você");
    expect(result).toContain("Teste com string timestamp");
    expect(result).not.toBe("Nenhuma mensagem para exportar");
  });
});

describe("generateFilename", () => {
  it("sanitizes special characters", () => {
    const filename = generateFilename("Conversa @sobre# sinais!", "txt");

    // Should not contain @, #, or !
    expect(filename).not.toMatch(/[@#!]/);
    expect(filename).toContain("witcher-oracle-");
    expect(filename).toContain("conversa");
    expect(filename).toContain("sinais");
    expect(filename).toMatch(/\.txt$/);
  });

  it("replaces spaces with hyphens and lowercases", () => {
    const filename = generateFilename("Minha Conversa", "md");

    expect(filename).toContain("minha-conversa");
    expect(filename).not.toContain(" ");
    expect(filename).toMatch(/\.md$/);
  });

  it("removes diacritics/accents", () => {
    const filename = generateFilename("Conversação Épica", "txt");

    expect(filename).toContain("conversacao-epica");
    expect(filename).not.toMatch(/[çãé]/);
  });

  it("truncates long titles to 60 characters", () => {
    const longTitle =
      "Esta é uma conversa extremamente longa sobre os vários aspectos do mundo de The Witcher incluindo monstros e sinais e poções";
    const filename = generateFilename(longTitle, "txt");

    // Extract the title part: everything between "witcher-oracle-" and the date part "-YYYY-MM-DD.ext"
    const match = filename.match(
      /^witcher-oracle-(.+)-\d{4}-\d{2}-\d{2}\.txt$/,
    );
    expect(match).not.toBeNull();
    expect(match![1].length).toBeLessThanOrEqual(60);
  });

  it("formats with correct date pattern YYYY-MM-DD", () => {
    const filename = generateFilename("Teste", "txt");

    // Should contain a date in YYYY-MM-DD format
    expect(filename).toMatch(/\d{4}-\d{2}-\d{2}/);
  });

  it("produces correct overall format", () => {
    const filename = generateFilename("Sinais", "md");

    // Pattern: witcher-oracle-{title}-{YYYY-MM-DD}.{ext}
    expect(filename).toMatch(/^witcher-oracle-sinais-\d{4}-\d{2}-\d{2}\.md$/);
  });

  it("handles extension with leading dot", () => {
    const filename = generateFilename("Teste", ".txt");
    expect(filename).toMatch(/\.txt$/);
    expect(filename).not.toContain("..txt");
  });

  it("collapses multiple spaces and hyphens", () => {
    const filename = generateFilename("Muitos   espaços   aqui", "txt");

    expect(filename).not.toContain("--");
    expect(filename).toContain("muitos-espacos-aqui");
  });

  it("handles empty title gracefully", () => {
    const filename = generateFilename("", "txt");

    // Should still produce a valid filename with just the prefix and date
    expect(filename).toMatch(/^witcher-oracle--\d{4}-\d{2}-\d{2}\.txt$/);
  });
});
