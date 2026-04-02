"use client";

import { useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { RotateCcw } from "lucide-react";
import type { Message } from "@/types/chat";
import ChatMessage from "@/components/chat/ChatMessage";
import ChatInput from "@/components/chat/ChatInput";
import TypingIndicator from "@/components/chat/TypingIndicator";
import WelcomeMessage from "@/components/chat/WelcomeMessage";

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  onRetry?: () => void;
  error: string | null;
  personaId?: string;
}

export default function ChatContainer({
  messages,
  isLoading,
  onSendMessage,
  onRetry,
  error,
  personaId,
}: ChatContainerProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive or loading state changes
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Small delay to let DOM update before scrolling
    const timeoutId = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [messages, isLoading]);

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col h-full min-h-0">
      {/* Scrollable message area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto min-h-0 px-4 py-6"
      >
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Welcome message when no messages */}
          <AnimatePresence mode="wait">
            {!hasMessages && !isLoading && (
              <WelcomeMessage
                onSelectQuestion={onSendMessage}
                personaId={personaId}
              />
            )}
          </AnimatePresence>

          {/* Message list */}
          <AnimatePresence initial={false}>
            {messages.map((message, index) => (
              <ChatMessage
                key={message.id}
                message={message}
                isLatest={index === messages.length - 1}
                personaId={personaId}
              />
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <TypingIndicator isVisible={isLoading} />

          {/* Error banner */}
          <AnimatePresence>
            {error && (
              <div
                className="glass px-4 py-3 text-sm flex items-center gap-3"
                style={{
                  borderColor: "rgba(139, 26, 26, 0.5)",
                  background: "rgba(139, 26, 26, 0.15)",
                }}
              >
                <span
                  className="shrink-0 w-2 h-2 rounded-full"
                  style={{ background: "var(--witcher-blood)" }}
                />
                <p className="flex-1" style={{ color: "#f0a0a0" }}>
                  {error}
                </p>
                {onRetry && (
                  <button
                    onClick={onRetry}
                    disabled={isLoading}
                    className="glass-button-gold px-3 py-1.5 text-xs font-medium shrink-0 flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Tentar novamente
                  </button>
                )}
              </div>
            )}
          </AnimatePresence>

          {/* Invisible scroll anchor */}
          <div ref={bottomRef} aria-hidden="true" />
        </div>
      </div>

      {/* Sticky input area */}
      <div
        className="shrink-0 border-t"
        style={{
          borderColor: "var(--witcher-glass-border)",
          background: "rgba(10, 10, 15, 0.8)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
        }}
      >
        <div className="max-w-3xl mx-auto">
          <ChatInput onSendMessage={onSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
