import type { Conversation, Message } from "@/types/chat";

const STORAGE_KEY = "witcher-oracle-conversations";
const MAX_CONVERSATIONS = 50;

/**
 * Safely load conversations from LocalStorage.
 * Returns an empty array on SSR, corrupt data, or any read error.
 */
export function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    // Basic shape validation: must be an array
    if (!Array.isArray(parsed)) {
      console.warn("[storage] Corrupt data in localStorage — expected array, clearing.");
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }

    // Filter out any entries that don't look like a Conversation
    const valid = parsed.filter(
      (item: unknown): item is Conversation =>
        typeof item === "object" &&
        item !== null &&
        typeof (item as Conversation).id === "string" &&
        typeof (item as Conversation).title === "string" &&
        Array.isArray((item as Conversation).messages) &&
        typeof (item as Conversation).createdAt === "string" &&
        typeof (item as Conversation).updatedAt === "string" &&
        typeof (item as Conversation).personaId === "string",
    );

    return valid;
  } catch (err) {
    console.warn("[storage] Failed to load conversations from localStorage:", err);
    // Don't nuke data on a transient read error — just return empty
    return [];
  }
}

/**
 * Persist conversations to LocalStorage.
 * Enforces a MAX_CONVERSATIONS limit by trimming the oldest conversations.
 */
export function saveConversations(conversations: Conversation[]): void {
  if (typeof window === "undefined") return;

  try {
    let toSave = conversations;

    // Enforce maximum limit — keep the most recent ones (by updatedAt)
    if (toSave.length > MAX_CONVERSATIONS) {
      const sorted = [...toSave].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
      toSave = sorted.slice(0, MAX_CONVERSATIONS);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch (err) {
    // localStorage can throw on quota exceeded or in private browsing edge cases
    console.warn("[storage] Failed to save conversations to localStorage:", err);
  }
}

/**
 * Auto-generate a conversation title from the first user message.
 * Takes the first 40 characters and appends "..." if truncated.
 * Falls back to "Nova conversa" when there's no user message yet.
 */
export function generateTitle(messages: Message[]): string {
  const firstUserMsg = messages.find((m) => m.role === "user");
  if (!firstUserMsg) return "Nova conversa";

  const text = firstUserMsg.content.trim().replace(/\n+/g, " ");
  if (text.length <= 40) return text;

  return text.slice(0, 40) + "...";
}
