"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export default function ChatInput({
  onSendMessage,
  isLoading,
  disabled = false,
}: ChatInputProps) {
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isDisabled = isLoading || disabled;

  const resizeTextarea = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const lineHeight = 24;
    const maxHeight = lineHeight * 4;
    textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
  }, []);

  useEffect(() => {
    resizeTextarea();
  }, [input, resizeTextarea]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isDisabled) return;
    onSendMessage(trimmed);
    setInput("");
    // Reset textarea height after clearing
    requestAnimationFrame(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    });
  }, [input, isDisabled, onSendMessage]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <div className="w-full px-4 pb-4 pt-2">
      <div className="glass-strong mx-auto flex max-w-3xl items-end gap-3 p-3">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Pergunte ao Vesemir sobre The Witcher 3..."
          disabled={isDisabled}
          rows={1}
          className="glass-input min-h-11 w-full resize-none px-4 py-3 text-sm leading-6 transition-colors disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Mensagem para Vesemir"
        />

        <button
          onClick={handleSend}
          disabled={isDisabled || !input.trim()}
          aria-label="Enviar mensagem"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-250 disabled:cursor-not-allowed disabled:opacity-30"
          style={{
            background:
              isDisabled || !input.trim()
                ? "rgba(255, 255, 255, 0.04)"
                : "linear-gradient(135deg, rgba(201, 168, 76, 0.2), rgba(212, 168, 83, 0.1))",
            border:
              isDisabled || !input.trim()
                ? "1px solid rgba(255, 255, 255, 0.06)"
                : "1px solid rgba(201, 168, 76, 0.35)",
          }}
        >
          <Send
            size={18}
            className="transition-colors"
            style={{
              color:
                isDisabled || !input.trim()
                  ? "rgba(255, 255, 255, 0.25)"
                  : "var(--witcher-gold)",
            }}
          />
        </button>
      </div>
    </div>
  );
}
