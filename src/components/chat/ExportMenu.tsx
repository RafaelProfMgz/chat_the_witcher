'use client';

import { useState, useRef, useEffect } from 'react';
import { Download, FileText, FileCode } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { Message } from '@/types/chat';
import {
  exportAsText,
  exportAsMarkdown,
  downloadFile,
  generateFilename,
} from '@/lib/export';

interface ExportMenuProps {
  messages: Message[];
  title: string;
  disabled?: boolean;
}

export default function ExportMenu({ messages, title, disabled = false }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const isDisabled = disabled || messages.length === 0;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  function handleExportText() {
    const content = exportAsText(messages, title);
    const filename = generateFilename(title, 'txt');
    downloadFile(content, filename, 'text/plain;charset=utf-8');
    setIsOpen(false);
  }

  function handleExportMarkdown() {
    const content = exportAsMarkdown(messages, title);
    const filename = generateFilename(title, 'md');
    downloadFile(content, filename, 'text/markdown;charset=utf-8');
    setIsOpen(false);
  }

  return (
    <div ref={menuRef} className="relative inline-block">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        disabled={isDisabled}
        aria-label="Exportar conversa"
        aria-expanded={isOpen}
        aria-haspopup="true"
        className={`
          flex items-center justify-center
          w-9 h-9 rounded-lg
          backdrop-blur-md bg-white/10 border border-white/20
          text-white/80 transition-all duration-200
          ${isDisabled
            ? 'opacity-40 cursor-not-allowed'
            : 'hover:bg-white/20 hover:text-white hover:border-white/30 cursor-pointer'
          }
        `}
      >
        <Download size={16} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="
              absolute right-0 top-full mt-2 z-50
              min-w-[240px] py-1.5 rounded-xl
              backdrop-blur-xl bg-black/60 border border-white/15
              shadow-xl shadow-black/30
            "
            role="menu"
          >
            <button
              onClick={handleExportText}
              role="menuitem"
              className="
                flex items-center gap-3 w-full px-4 py-2.5
                text-sm text-white/80 hover:text-white hover:bg-white/10
                transition-colors duration-150 cursor-pointer
              "
            >
              <FileText size={16} className="text-amber-400/80 shrink-0" />
              <span>📄 Exportar como Texto (.txt)</span>
            </button>

            <button
              onClick={handleExportMarkdown}
              role="menuitem"
              className="
                flex items-center gap-3 w-full px-4 py-2.5
                text-sm text-white/80 hover:text-white hover:bg-white/10
                transition-colors duration-150 cursor-pointer
              "
            >
              <FileCode size={16} className="text-amber-400/80 shrink-0" />
              <span>📝 Exportar como Markdown (.md)</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
