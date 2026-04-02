"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sword } from "lucide-react";

interface TypingIndicatorProps {
  isVisible: boolean;
}

export default function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-start gap-3 max-w-[85%]"
        >
          {/* Avatar */}
          <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-witcher-gold/10 border border-witcher-gold/30">
            <Sword className="w-4 h-4 text-witcher-gold" />
          </div>

          {/* Bubble */}
          <div className="glass rounded-2xl rounded-bl-sm px-4 py-3">
            <div className="flex items-center gap-2">
              <div
                className="flex items-center gap-1"
                aria-label="Vesemir está digitando"
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-witcher-gold opacity-70"
                  style={{
                    animation:
                      "witcher-typing-bounce 1.4s ease-in-out infinite",
                  }}
                />
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-witcher-gold opacity-70"
                  style={{
                    animation:
                      "witcher-typing-bounce 1.4s ease-in-out infinite",
                    animationDelay: "0.15s",
                  }}
                />
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-witcher-gold opacity-70"
                  style={{
                    animation:
                      "witcher-typing-bounce 1.4s ease-in-out infinite",
                    animationDelay: "0.3s",
                  }}
                />
              </div>
              <span className="text-sm text-witcher-silver/60 italic ml-1">
                Vesemir está meditando...
              </span>
            </div>
          </div>

          {/* Keyframes injected via a plain style element */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                @keyframes witcher-typing-bounce {
                  0%, 60%, 100% {
                    transform: translateY(0);
                    opacity: 0.4;
                  }
                  30% {
                    transform: translateY(-6px);
                    opacity: 1;
                  }
                }
              `,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
