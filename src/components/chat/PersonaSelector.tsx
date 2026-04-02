"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { PERSONAS } from "@/lib/personas";

interface PersonaSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  activePersonaId: string;
  onSelectPersona: (personaId: string) => void;
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 28 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 20,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 + i * 0.07,
      duration: 0.35,
      ease: "easeOut" as const,
    },
  }),
};

const personaList = Object.values(PERSONAS);

export default function PersonaSelector({
  isOpen,
  onClose,
  activePersonaId,
  onSelectPersona,
}: PersonaSelectorProps) {
  const handleSelect = (personaId: string) => {
    onSelectPersona(personaId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="persona-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "rgba(5, 5, 10, 0.75)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div
              className="rounded-2xl p-6 sm:p-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(20, 20, 30, 0.92), rgba(15, 15, 22, 0.95))",
                border: "1px solid rgba(201, 168, 76, 0.25)",
                boxShadow:
                  "0 0 40px rgba(201, 168, 76, 0.08), 0 25px 50px rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
              }}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1.5 rounded-lg transition-colors hover:bg-white/10"
                aria-label="Fechar seletor de persona"
              >
                <X className="w-5 h-5 text-witcher-silver/60" />
              </button>

              {/* Title */}
              <div className="text-center mb-6">
                <h2
                  className="text-gradient-gold text-xl sm:text-2xl font-bold tracking-wide"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  Escolha seu Guia
                </h2>
                <p className="text-witcher-silver/50 text-xs mt-1.5 tracking-wide">
                  Cada guia traz uma perspectiva única do Continente
                </p>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {personaList.map((persona, index) => {
                  const isActive = persona.id === activePersonaId;

                  return (
                    <motion.button
                      key={persona.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleSelect(persona.id)}
                      className="relative text-left rounded-xl p-4 transition-colors cursor-pointer group"
                      style={{
                        background: isActive
                          ? `linear-gradient(135deg, ${persona.color}18, ${persona.color}08)`
                          : "rgba(255, 255, 255, 0.03)",
                        border: isActive
                          ? `2px solid ${persona.color}90`
                          : "1px solid rgba(255, 255, 255, 0.08)",
                        boxShadow: isActive
                          ? `0 0 20px ${persona.color}25, 0 0 40px ${persona.color}10`
                          : "none",
                      }}
                    >
                      {/* Active indicator dot */}
                      {isActive && (
                        <motion.div
                          layoutId="active-persona-indicator"
                          className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
                          style={{
                            background: persona.color,
                            boxShadow: `0 0 8px ${persona.color}80`,
                          }}
                        />
                      )}

                      {/* Icon */}
                      <span className="text-3xl sm:text-4xl block mb-2">
                        {persona.icon}
                      </span>

                      {/* Name */}
                      <h3
                        className="font-bold text-sm sm:text-base tracking-wide mb-1"
                        style={{
                          color: isActive
                            ? persona.color
                            : "rgba(220, 220, 230, 0.9)",
                          fontFamily: "var(--font-cinzel)",
                        }}
                      >
                        {persona.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs leading-relaxed text-witcher-silver/50 group-hover:text-witcher-silver/70 transition-colors">
                        {persona.description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
