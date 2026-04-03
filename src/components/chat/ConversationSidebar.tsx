"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Trash2, MessageSquare, Pencil, Check } from "lucide-react";
import type { Conversation } from "@/types/chat";

interface ConversationSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
  onRenameConversation: (id: string, title: string) => void;
}

function formatRelativeDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Agora";
  if (diffMins < 60) return `${diffMins}min atrás`;
  if (diffHours < 24) return `${diffHours}h atrás`;
  if (diffDays < 7) return `${diffDays}d atrás`;

  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
  });
}

function ConversationItem({
  conversation,
  isActive,
  onSelect,
  onDelete,
  onRename,
}: {
  conversation: Conversation;
  isActive: boolean;
  onSelect: () => void;
  onDelete: () => void;
  onRename: (title: string) => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(conversation.title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const commitRename = useCallback(() => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== conversation.title) {
      onRename(trimmed);
    } else {
      setEditValue(conversation.title);
    }
    setIsEditing(false);
  }, [editValue, conversation.title, onRename]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      commitRename();
    } else if (e.key === "Escape") {
      setEditValue(conversation.title);
      setIsEditing(false);
    }
  };

  const messageCount = conversation.messages.length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className="group relative"
    >
      <button
        onClick={onSelect}
        onDoubleClick={(e) => {
          e.preventDefault();
          setEditValue(conversation.title);
          setIsEditing(true);
        }}
        className="w-full text-left px-3 py-3 rounded-xl transition-all duration-200 relative"
        style={{
          background: isActive
            ? "rgba(201, 168, 76, 0.1)"
            : "rgba(255, 255, 255, 0.02)",
          border: isActive
            ? "1px solid rgba(201, 168, 76, 0.35)"
            : "1px solid transparent",
        }}
        aria-current={isActive ? "true" : undefined}
      >
        {/* Title row */}
        <div className="flex items-start gap-2 pr-14">
          <MessageSquare
            className="w-3.5 h-3.5 mt-0.5 shrink-0"
            style={{
              color: isActive
                ? "var(--witcher-gold)"
                : "rgba(192, 192, 192, 0.35)",
            }}
          />
          <div className="flex-1 min-w-0">
            {isEditing ? (
              <div
                className="flex items-center gap-1"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  ref={inputRef}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={commitRename}
                  className="w-full bg-transparent text-sm font-medium outline-none px-1 py-0 rounded"
                  style={{
                    color: "var(--witcher-gold-light)",
                    borderBottom: "1px solid rgba(201, 168, 76, 0.4)",
                  }}
                  maxLength={80}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    commitRename();
                  }}
                  className="shrink-0 p-0.5 rounded hover:bg-white/10 transition-colors"
                >
                  <Check
                    className="w-3 h-3"
                    style={{ color: "var(--witcher-gold)" }}
                  />
                </button>
              </div>
            ) : (
              <p
                className="text-sm font-medium truncate leading-snug"
                style={{
                  color: isActive
                    ? "var(--witcher-gold-light)"
                    : "rgba(226, 226, 232, 0.85)",
                }}
              >
                {conversation.title}
              </p>
            )}

            {/* Meta row */}
            <div
              className="flex items-center gap-2 mt-1 text-[11px]"
              style={{ color: "rgba(192, 192, 192, 0.4)" }}
            >
              <span>{formatRelativeDate(conversation.updatedAt)}</span>
              <span>•</span>
              <span>
                {messageCount} {messageCount === 1 ? "msg" : "msgs"}
              </span>
            </div>
          </div>
        </div>
      </button>

      {/* Hover action buttons */}
      <div
        className="absolute top-2 right-2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setEditValue(conversation.title);
            setIsEditing(true);
          }}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          title="Renomear"
        >
          <Pencil
            className="w-3 h-3"
            style={{ color: "rgba(192, 192, 192, 0.6)" }}
          />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1.5 rounded-lg hover:bg-red-500/20 transition-colors"
          title="Excluir"
        >
          <Trash2
            className="w-3 h-3"
            style={{ color: "rgba(220, 80, 80, 0.7)" }}
          />
        </button>
      </div>
    </motion.div>
  );
}

export default function ConversationSidebar({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
  onRenameConversation,
}: ConversationSidebarProps) {
  // Sort conversations by updatedAt descending (most recent first)
  const sorted = [...conversations].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            key="sidebar-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40"
            style={{ background: "rgba(0, 0, 0, 0.55)" }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sidebar drawer */}
          <motion.aside
            key="sidebar-drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 z-50 w-80 max-w-[85vw] flex flex-col glass-strong"
            style={{
              borderRadius: "0 1rem 1rem 0",
              borderLeft: "none",
            }}
          >
            {/* Sidebar header */}
            <div
              className="shrink-0 flex items-center justify-between px-5 py-4 border-b"
              style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
            >
              <h2
                className="text-gradient-gold text-lg font-bold tracking-wide"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Histórico
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={onNewConversation}
                  className="glass-button-gold px-3 py-1.5 text-xs font-medium flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Nova conversa
                </button>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg hover:bg-white/10 transition-colors ml-1"
                  title="Fechar"
                >
                  <X
                    className="w-4 h-4"
                    style={{ color: "rgba(192, 192, 192, 0.6)" }}
                  />
                </button>
              </div>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto min-h-0 px-3 py-3 space-y-1">
              {sorted.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3 py-12">
                  <MessageSquare
                    className="w-10 h-10"
                    style={{ color: "rgba(192, 192, 192, 0.15)" }}
                  />
                  <p
                    className="text-sm text-center leading-relaxed"
                    style={{ color: "rgba(192, 192, 192, 0.35)" }}
                  >
                    Nenhuma conversa salva ainda
                  </p>
                  <p
                    className="text-xs text-center"
                    style={{ color: "rgba(192, 192, 192, 0.2)" }}
                  >
                    Envie uma mensagem para começar
                  </p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {sorted.map((convo) => (
                    <ConversationItem
                      key={convo.id}
                      conversation={convo}
                      isActive={convo.id === activeConversationId}
                      onSelect={() => onSelectConversation(convo.id)}
                      onDelete={() => onDeleteConversation(convo.id)}
                      onRename={(title) =>
                        onRenameConversation(convo.id, title)
                      }
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Sidebar footer */}
            <div
              className="shrink-0 px-5 py-3 border-t text-center"
              style={{ borderColor: "rgba(255, 255, 255, 0.06)" }}
            >
              <p
                className="text-[10px] tracking-wide"
                style={{ color: "rgba(192, 192, 192, 0.25)" }}
              >
                {conversations.length} / 50 conversas
              </p>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
