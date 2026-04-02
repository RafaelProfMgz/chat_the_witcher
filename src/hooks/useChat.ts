"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Message, ChatState } from "@/types/chat";

interface ChatHistoryEntry {
  role: string;
  content: string;
}

export interface UseChatOptions {
  initialMessages?: Message[];
  onMessagesUpdate?: (messages: Message[]) => void;
  personaId?: string;
}

export function useChat(options: UseChatOptions = {}) {
  const [messages, setMessages] = useState<Message[]>(
    options.initialMessages ?? [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track whether this is the initial mount so we don't fire the callback
  // for the initial value (the parent already knows about it).
  const isInitialMount = useRef(true);

  // Keep a stable ref to the callback so we don't need it in deps
  const onMessagesUpdateRef = useRef(options.onMessagesUpdate);
  onMessagesUpdateRef.current = options.onMessagesUpdate;

  // Keep a stable ref to personaId so it's always current in callbacks
  const personaIdRef = useRef(options.personaId);
  personaIdRef.current = options.personaId;

  // Notify the parent whenever messages change (skip initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    onMessagesUpdateRef.current?.(messages);
  }, [messages]);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!content.trim() || isLoading) return;

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: content.trim(),
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const history: ChatHistoryEntry[] = messages.map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user",
          content: msg.content,
        }));

        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            message: content.trim(),
            history,
            persona: personaIdRef.current,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          const errorMessage =
            errorData?.error ||
            (response.status === 429
              ? "Calma, jovem bruxo. Até mesmo os sinais precisam de tempo para recarregar. Tente novamente em breve."
              : "Algo deu errado ao consultar os pergaminhos de Kaer Morhen. Tente novamente.");
          const isRateLimited = response.status === 429;

          throw new Error(
            isRateLimited ? `__RATE_LIMITED__${errorMessage}` : errorMessage,
          );
        }

        const data = await response.json();

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.response,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (err) {
        const msg =
          err instanceof Error
            ? err.message
            : "Falha na comunicação com o servidor. Verifique sua conexão e tente novamente.";
        const isRateLimit = msg.startsWith("__RATE_LIMITED__");

        setError(isRateLimit ? msg.replace("__RATE_LIMITED__", "") : msg);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, isLoading],
  );

  const clearChat = useCallback(() => {
    setMessages([]);
    setIsLoading(false);
    setError(null);
  }, []);

  const retryLastMessage = useCallback(async () => {
    if (isLoading) return;

    // Find the last user message
    const lastUserIndex = messages.findLastIndex((m) => m.role === "user");
    if (lastUserIndex === -1) return;

    const lastUserMessage = messages[lastUserIndex];
    const historyUpToLastUser = messages.slice(0, lastUserIndex);

    setError(null);
    setIsLoading(true);

    try {
      const history: ChatHistoryEntry[] = historyUpToLastUser.map((msg) => ({
        role: msg.role === "assistant" ? "model" : "user",
        content: msg.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: lastUserMessage.content,
          history,
          persona: personaIdRef.current,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        const errorMessage =
          errorData?.error ||
          (response.status === 429
            ? "Calma, jovem bruxo. Até mesmo os sinais precisam de tempo para recarregar. Tente novamente em breve."
            : "Algo deu errado ao consultar os pergaminhos de Kaer Morhen. Tente novamente.");
        const isRateLimited = response.status === 429;

        throw new Error(
          isRateLimited ? `__RATE_LIMITED__${errorMessage}` : errorMessage,
        );
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Falha na comunicação com o servidor. Verifique sua conexão e tente novamente.";
      const isRateLimit = msg.startsWith("__RATE_LIMITED__");

      setError(isRateLimit ? msg.replace("__RATE_LIMITED__", "") : msg);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearChat,
    retryLastMessage,
    setMessages,
  } satisfies ChatState & {
    sendMessage: (content: string) => Promise<void>;
    clearChat: () => void;
    retryLastMessage: () => Promise<void>;
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  };
}
