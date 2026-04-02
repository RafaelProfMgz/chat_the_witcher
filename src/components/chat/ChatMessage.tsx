"use client";

import { motion } from "framer-motion";
import type { Message } from "@/types/chat";
import { getPersona } from "@/lib/personas";
import MarkdownRenderer from "@/components/ui/MarkdownRenderer";

interface ChatMessageProps {
  message: Message;
  isLatest?: boolean;
  personaId?: string;
}

function formatTimestamp(date: Date): string {
  const d = date instanceof Date ? date : new Date(date);
  return d.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatMessage({
  message,
  isLatest: _isLatest = false,
  personaId = "vesemir",
}: ChatMessageProps) {
  const isUser = message.role === "user";
  const persona = getPersona(personaId);

  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 30 : -30, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`flex max-w-[85%] gap-3 sm:max-w-[75%] ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar area */}
        {!isUser && (
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
            style={{
              border: `1px solid ${persona.color}4d`,
              background: `${persona.color}1a`,
            }}
          >
            <span className="text-sm" role="img" aria-label={persona.name}>
              {persona.icon}
            </span>
          </div>
        )}

        {/* Message bubble */}
        <div className="flex flex-col gap-1">
          {/* Label */}
          <span
            className={`text-xs font-medium ${
              isUser ? "text-right text-witcher-amber/70" : "text-left"
            }`}
            style={!isUser ? { color: `${persona.color}b3` } : undefined}
          >
            {isUser ? "Você" : persona.name}
          </span>

          {/* Bubble */}
          <div
            className={`relative rounded-2xl px-4 py-3 ${
              isUser
                ? "rounded-br-sm border border-witcher-amber/20 bg-gradient-to-br from-witcher-amber/15 to-witcher-gold/5 backdrop-blur-xl"
                : "glass rounded-bl-sm"
            }`}
          >
            <MarkdownRenderer
              content={message.content}
              className="text-sm leading-relaxed text-gray-200/90 sm:text-[0.935rem]"
            />
          </div>

          {/* Timestamp */}
          <span
            className={`text-[0.65rem] text-gray-500 ${
              isUser ? "text-right" : "text-left"
            }`}
          >
            {formatTimestamp(message.timestamp)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
