import { Message } from "@/types/chat";

/**
 * Ensures a timestamp value is a proper Date object.
 * Handles the case where timestamp might be a string (e.g., from JSON serialization).
 */
function ensureDate(timestamp: Date | string): Date {
  if (timestamp instanceof Date) {
    return timestamp;
  }
  return new Date(timestamp);
}

/**
 * Formats a Date to HH:MM using pt-BR locale.
 */
function formatTime(date: Date): string {
  return date.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Formats a Date to a full pt-BR date string.
 */
function formatFullDate(date: Date): string {
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Formats a conversation as plain text (.txt)
 */
export function exportAsText(messages: Message[], title: string): string {
  if (!messages || messages.length === 0) {
    return "Nenhuma mensagem para exportar";
  }

  const lines: string[] = [];

  // Header
  lines.push(`═══ Witcher Oracle — ${title} ═══`);
  lines.push(`Exportado em: ${formatFullDate(new Date())}`);
  lines.push("─".repeat(50));
  lines.push("");

  // Messages
  for (const message of messages) {
    const time = formatTime(ensureDate(message.timestamp));
    const sender = message.role === "user" ? "Você" : "Vesemir";

    lines.push(`[${time}] ${sender}:`);
    lines.push(message.content);
    lines.push("");
  }

  // Footer
  lines.push("--- Fim da conversa ---");
  lines.push("Gerado por Witcher Oracle • witcher-oracle.app");

  return lines.join("\n");
}

/**
 * Formats a conversation as Markdown (.md)
 */
export function exportAsMarkdown(messages: Message[], title: string): string {
  if (!messages || messages.length === 0) {
    return "Nenhuma mensagem para exportar";
  }

  const lines: string[] = [];

  // Header
  lines.push(`# 🐺 Witcher Oracle — ${title}`);
  lines.push("");
  lines.push(
    `> Exportado em ${formatFullDate(new Date())} | ${messages.length} mensagens`
  );
  lines.push("");
  lines.push("---");
  lines.push("");

  // Messages
  for (const message of messages) {
    const time = formatTime(ensureDate(message.timestamp));
    const icon = message.role === "user" ? "🗡️" : "🐺";
    const sender = message.role === "user" ? "Você" : "Vesemir";

    lines.push(`### ${icon} ${sender} — ${time}`);
    lines.push("");
    lines.push(message.content);
    lines.push("");
    lines.push("---");
    lines.push("");
  }

  // Footer
  lines.push(
    "*Gerado por [Witcher Oracle](https://github.com/) • O Oráculo do Bruxo*"
  );

  return lines.join("\n");
}

/**
 * Triggers a file download in the browser.
 */
export function downloadFile(
  content: string,
  filename: string,
  mimeType: string
): void {
  // Prepend BOM for text files to ensure proper Unicode handling
  const bom = mimeType.includes("text") ? "\ufeff" : "";
  const blob = new Blob([bom + content], { type: `${mimeType};charset=utf-8` });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();

  // Cleanup
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Generates a safe filename from a title.
 * Format: "witcher-oracle-{sanitized-title}-{YYYY-MM-DD}.{ext}"
 */
export function generateFilename(title: string, extension: string): string {
  // Sanitize: remove special chars, replace spaces with hyphens, lowercase
  let sanitized = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-|-$/g, ""); // Trim leading/trailing hyphens

  // Truncate title part to max 60 chars
  if (sanitized.length > 60) {
    sanitized = sanitized.substring(0, 60).replace(/-$/, "");
  }

  // Format date as YYYY-MM-DD
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const dateStr = `${year}-${month}-${day}`;

  // Clean extension (remove leading dot if present)
  const ext = extension.replace(/^\./, "");

  return `witcher-oracle-${sanitized}-${dateStr}.${ext}`;
}
