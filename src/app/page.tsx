"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { MessageSquare, Users } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { useConversations } from "@/hooks/useConversations";
import { useTheme } from "@/hooks/useTheme";
import { getPersona, DEFAULT_PERSONA_ID } from "@/lib/personas";
import Header from "@/components/layout/Header";
import ChatContainer from "@/components/chat/ChatContainer";
import ConversationSidebar from "@/components/chat/ConversationSidebar";
import PersonaSelector from "@/components/chat/PersonaSelector";
import ThemeSelector from "@/components/ui/ThemeSelector";
import type { Message } from "@/types/chat";

function loadPersonaId(): string {
  if (typeof window === "undefined") return DEFAULT_PERSONA_ID;
  try {
    const stored = localStorage.getItem("witcher-oracle-persona");
    if (stored && typeof stored === "string") return stored;
  } catch {
    // ignore
  }
  return DEFAULT_PERSONA_ID;
}

function savePersonaId(id: string): void {
  try {
    localStorage.setItem("witcher-oracle-persona", id);
  } catch {
    // ignore
  }
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [personaSelectorOpen, setPersonaSelectorOpen] = useState(false);
  const [activePersonaId, setActivePersonaId] = useState<string>(loadPersonaId);
  const { themeId, switchTheme } = useTheme();

  const activePersona = getPersona(activePersonaId);

  const {
    conversations,
    activeConversation,
    activeConversationId,
    createConversation,
    deleteConversation,
    renameConversation,
    switchConversation,
    updateConversationMessages,
  } = useConversations();

  // We need a ref to track the active conversation id inside callbacks
  // without causing re-creation of the callbacks themselves.
  const activeConversationIdRef = useRef<string | null>(null);

  // Sync the ref in an effect instead of during render (React 19 strictness)
  useEffect(() => {
    activeConversationIdRef.current = activeConversationId;
  }, [activeConversationId]);

  // Ref to track whether we're in the middle of a programmatic setMessages call
  // (e.g. switching conversations) so we can skip the onMessagesUpdate callback.
  const isSwitchingRef = useRef(false);

  const handleMessagesUpdate = useCallback(
    (messages: Message[]) => {
      if (isSwitchingRef.current) return;

      const convoId = activeConversationIdRef.current;
      if (convoId) {
        updateConversationMessages(convoId, messages);
      }
    },
    [updateConversationMessages],
  );

  const {
    messages,
    isLoading,
    error,
    sendMessage: chatSendMessage,
    clearChat,
    retryLastMessage,
    setMessages,
  } = useChat({
    initialMessages: activeConversation?.messages ?? [],
    onMessagesUpdate: handleMessagesUpdate,
    personaId: activePersonaId,
  });

  // When the active conversation changes (e.g. user switches), load its messages.
  const prevActiveIdRef = useRef<string | null>(null);
  useEffect(() => {
    if (activeConversationId === prevActiveIdRef.current) return;
    prevActiveIdRef.current = activeConversationId;

    isSwitchingRef.current = true;
    if (activeConversation) {
      setMessages(activeConversation.messages);
    } else {
      setMessages([]);
    }
    // Allow the next tick to complete before re-enabling the callback
    requestAnimationFrame(() => {
      isSwitchingRef.current = false;
    });
  }, [activeConversationId, activeConversation, setMessages]);

  // Wrap sendMessage so we auto-create a conversation on first message
  const sendMessage = useCallback(
    async (content: string) => {
      if (!activeConversationIdRef.current) {
        // No active conversation yet — create one first.
        const newId = createConversation();
        activeConversationIdRef.current = newId;
      }
      await chatSendMessage(content);
    },
    [chatSendMessage, createConversation],
  );

  // Handle persona change
  const handleSelectPersona = useCallback(
    (personaId: string) => {
      if (personaId === activePersonaId) return;

      setActivePersonaId(personaId);
      savePersonaId(personaId);

      // Clear current chat so the new persona starts fresh
      isSwitchingRef.current = true;
      clearChat();

      // If there's an active conversation, deselect it so we start fresh
      // (the user can still access old conversations from the sidebar)
      activeConversationIdRef.current = null;

      requestAnimationFrame(() => {
        isSwitchingRef.current = false;
      });
    },
    [activePersonaId, clearChat],
  );

  // Sidebar actions
  const handleNewConversation = useCallback(() => {
    const newId = createConversation();
    activeConversationIdRef.current = newId;
    isSwitchingRef.current = true;
    clearChat();
    requestAnimationFrame(() => {
      isSwitchingRef.current = false;
    });
    setSidebarOpen(false);
  }, [createConversation, clearChat]);

  const handleSelectConversation = useCallback(
    (id: string) => {
      if (id === activeConversationIdRef.current) {
        setSidebarOpen(false);
        return;
      }
      switchConversation(id);
      setSidebarOpen(false);
    },
    [switchConversation],
  );

  const handleDeleteConversation = useCallback(
    (id: string) => {
      const wasActive = id === activeConversationIdRef.current;
      deleteConversation(id);

      if (wasActive) {
        isSwitchingRef.current = true;
        clearChat();
        requestAnimationFrame(() => {
          isSwitchingRef.current = false;
        });
      }
    },
    [deleteConversation, clearChat],
  );

  // Sidebar toggle button for the header
  const sidebarToggle = (
    <button
      onClick={() => setSidebarOpen((prev) => !prev)}
      className="glass-button p-2 flex items-center justify-center"
      title="Histórico de conversas"
      aria-label="Abrir histórico de conversas"
      style={{ borderRadius: "0.75rem" }}
    >
      <MessageSquare
        className="w-5 h-5"
        style={{ color: "var(--witcher-gold)" }}
      />
      {conversations.length > 0 && (
        <span
          className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center"
          style={{
            background: "var(--witcher-gold)",
            color: "var(--witcher-dark)",
          }}
        >
          {conversations.length > 9 ? "9+" : conversations.length}
        </span>
      )}
    </button>
  );

  // Persona selector button + active badge for the header
  const personaHeaderActions = (
    <div className="flex items-center gap-2">
      {sidebarToggle}
      <ThemeSelector activeThemeId={themeId} onSelectTheme={switchTheme} />
      <button
        onClick={() => setPersonaSelectorOpen(true)}
        className="glass-button p-2 flex items-center gap-2"
        title="Trocar persona"
        aria-label="Abrir seletor de persona"
        style={{ borderRadius: "0.75rem" }}
      >
        <Users className="w-5 h-5" style={{ color: activePersona.color }} />
        <span
          className="hidden sm:inline text-xs font-medium tracking-wide"
          style={{ color: activePersona.color }}
        >
          {activePersona.icon} {activePersona.name}
        </span>
      </button>
    </div>
  );

  return (
    <>
      {/* Conversation sidebar (overlay drawer) */}
      <ConversationSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onDeleteConversation={handleDeleteConversation}
        onRenameConversation={renameConversation}
      />

      {/* Persona selector modal */}
      <PersonaSelector
        isOpen={personaSelectorOpen}
        onClose={() => setPersonaSelectorOpen(false)}
        activePersonaId={activePersonaId}
        onSelectPersona={handleSelectPersona}
      />

      <div className="flex flex-col h-screen min-h-0 overflow-hidden">
        {/* Fixed header */}
        <div className="shrink-0">
          <Header leftAction={personaHeaderActions} />
        </div>

        {/* Chat area — fills remaining space, scrolls independently */}
        <main className="flex-1 min-h-0">
          <ChatContainer
            messages={messages}
            isLoading={isLoading}
            onSendMessage={sendMessage}
            onRetry={retryLastMessage}
            error={error}
            personaId={activePersonaId}
          />
        </main>

        {/* Glassmorphism footer */}
        <footer
          className="shrink-0 border-t px-4 py-2 text-center"
          style={{
            borderColor: "var(--witcher-glass-border)",
            background: "rgba(10, 10, 15, 0.6)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <p className="text-[11px] tracking-wide text-witcher-silver/40">
            Powered by Gemini AI • Feito com{" "}
            <span className="text-red-500/70" aria-label="amor">
              ❤️
            </span>{" "}
            para a comunidade Witcher
          </p>
        </footer>
      </div>
    </>
  );
}
