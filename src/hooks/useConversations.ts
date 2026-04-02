"use client";

import { useState, useCallback } from "react";
import type { Conversation, Message } from "@/types/chat";
import {
  loadConversations,
  saveConversations,
  generateTitle,
} from "@/lib/storage";

function loadInitialConversations(): Conversation[] {
  const stored = loadConversations();
  if (stored.length === 0) return [];
  return [...stored].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>(
    loadInitialConversations,
  );
  const [activeConversationId, setActiveConversationId] = useState<
    string | null
  >(null);

  // Persist helper — wraps setConversations to always save to localStorage
  const updateAndPersist = useCallback(
    (updater: (prev: Conversation[]) => Conversation[]) => {
      setConversations((prev) => {
        const next = updater(prev);
        saveConversations(next);
        return next;
      });
    },
    [],
  );

  // Derive the active conversation from state
  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) ?? null;

  // Create a new empty conversation and set it as active. Returns the new id.
  const createConversation = useCallback((): string => {
    const now = new Date().toISOString();
    const newConvo: Conversation = {
      id: crypto.randomUUID(),
      title: "Nova conversa",
      messages: [],
      createdAt: now,
      updatedAt: now,
      personaId: "vesemir",
    };

    updateAndPersist((prev) => [newConvo, ...prev]);
    setActiveConversationId(newConvo.id);

    return newConvo.id;
  }, [updateAndPersist]);

  // Delete a conversation by id.
  // If it was the active one, switch to the most recent remaining or null.
  const deleteConversation = useCallback(
    (id: string) => {
      setConversations((prev) => {
        const next = prev.filter((c) => c.id !== id);
        saveConversations(next);

        // If we just deleted the active conversation, pick a new one
        if (id === activeConversationId) {
          if (next.length > 0) {
            // Pick the most recent by updatedAt
            const sorted = [...next].sort(
              (a, b) =>
                new Date(b.updatedAt).getTime() -
                new Date(a.updatedAt).getTime(),
            );
            setActiveConversationId(sorted[0].id);
          } else {
            setActiveConversationId(null);
          }
        }

        return next;
      });
    },
    [activeConversationId],
  );

  // Rename a conversation
  const renameConversation = useCallback(
    (id: string, title: string) => {
      const trimmed = title.trim();
      if (!trimmed) return;

      updateAndPersist((prev) =>
        prev.map((c) =>
          c.id === id
            ? { ...c, title: trimmed, updatedAt: new Date().toISOString() }
            : c,
        ),
      );
    },
    [updateAndPersist],
  );

  // Switch to a different conversation
  const switchConversation = useCallback((id: string) => {
    setActiveConversationId(id);
  }, []);

  // Update the messages of a specific conversation.
  // Also updates `updatedAt` and auto-generates title from the first user message.
  const updateConversationMessages = useCallback(
    (id: string, messages: Message[]) => {
      updateAndPersist((prev) =>
        prev.map((c) => {
          if (c.id !== id) return c;

          const autoTitle = generateTitle(messages);
          return {
            ...c,
            messages,
            title: autoTitle,
            updatedAt: new Date().toISOString(),
          };
        }),
      );
    },
    [updateAndPersist],
  );

  return {
    conversations,
    activeConversation,
    activeConversationId,
    createConversation,
    deleteConversation,
    renameConversation,
    switchConversation,
    updateConversationMessages,
  };
}
