"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, Check } from "lucide-react";
import { THEMES, type WitcherTheme } from "@/lib/themes";

interface ThemeSelectorProps {
  activeThemeId: string;
  onSelectTheme: (themeId: string) => void;
}

export default function ThemeSelector({
  activeThemeId,
  onSelectTheme,
}: ThemeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const themeList = Object.values(THEMES);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="glass-button p-2 flex items-center justify-center"
        title="Trocar tema"
        aria-label="Abrir seletor de tema"
        aria-expanded={isOpen}
        style={{ borderRadius: "0.75rem" }}
      >
        <Palette
          className="w-5 h-5"
          style={{ color: THEMES[activeThemeId]?.colors.primary ?? "#c9a84c" }}
        />
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-0 top-full mt-2 z-50 min-w-[220px]"
            style={{
              background: "rgba(10, 10, 18, 0.85)",
              backdropFilter: "blur(32px) saturate(1.4)",
              WebkitBackdropFilter: "blur(32px) saturate(1.4)",
              border: "1px solid rgba(255, 255, 255, 0.12)",
              borderRadius: "0.85rem",
              boxShadow:
                "0 12px 40px rgba(0, 0, 0, 0.5), 0 0 1px rgba(255, 255, 255, 0.1)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              className="px-3 py-2 text-[11px] uppercase tracking-widest font-medium"
              style={{
                color: "rgba(255, 255, 255, 0.35)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.06)",
              }}
            >
              Tema
            </div>

            {/* Theme options */}
            <div className="py-1">
              {themeList.map((theme: WitcherTheme) => {
                const isActive = theme.id === activeThemeId;

                return (
                  <motion.button
                    key={theme.id}
                    onClick={() => {
                      onSelectTheme(theme.id);
                      setIsOpen(false);
                    }}
                    whileHover={{
                      backgroundColor: "rgba(255, 255, 255, 0.06)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-left"
                    style={{
                      background: isActive
                        ? "rgba(255, 255, 255, 0.04)"
                        : "transparent",
                      color: isActive ? theme.colors.primaryLight : "#c8c8d0",
                      cursor: "pointer",
                      border: "none",
                      outline: "none",
                      transition:
                        "background-color 0.15s ease, color 0.15s ease",
                    }}
                  >
                    {/* Icon */}
                    <span className="text-lg leading-none flex-shrink-0">
                      {theme.icon}
                    </span>

                    {/* Name + description */}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium truncate">
                        {theme.name}
                      </div>
                      <div
                        className="text-[10px] truncate"
                        style={{ color: "rgba(255, 255, 255, 0.3)" }}
                      >
                        {theme.description}
                      </div>
                    </div>

                    {/* Color swatch */}
                    <span
                      className="flex-shrink-0 w-3.5 h-3.5 rounded-full"
                      style={{
                        background: theme.colors.primary,
                        boxShadow: `0 0 8px ${theme.colors.primary}66`,
                        border: `1px solid ${theme.colors.primaryLight}44`,
                      }}
                    />

                    {/* Active checkmark */}
                    <span className="flex-shrink-0 w-4 flex items-center justify-center">
                      {isActive && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                          }}
                        >
                          <Check
                            className="w-3.5 h-3.5"
                            style={{ color: theme.colors.primary }}
                          />
                        </motion.span>
                      )}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
