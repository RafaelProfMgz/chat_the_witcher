"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { Monster } from "@/data/bestiary";
import MonsterDetail from "./MonsterDetail";

interface MonsterCardProps {
  monster: Monster;
  isExpanded: boolean;
  onToggle: () => void;
}

const categoryColors: Record<string, string> = {
  Relictos: "rgba(45, 27, 105, 0.5)",
  Espectros: "rgba(100, 140, 200, 0.4)",
  Vampiros: "rgba(139, 26, 26, 0.5)",
  Insectóides: "rgba(80, 120, 50, 0.4)",
  Necrófalos: "rgba(90, 70, 60, 0.5)",
  Draconídeos: "rgba(180, 100, 30, 0.4)",
  Híbridos: "rgba(150, 130, 60, 0.4)",
  "Bestas Amaldiçoadas": "rgba(100, 40, 100, 0.45)",
  Elementais: "rgba(50, 120, 150, 0.45)",
  Ogróides: "rgba(100, 80, 60, 0.45)",
};

function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Dificuldade: ${level} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-sm ${
            i < level ? "text-witcher-gold drop-shadow-[0_0_3px_rgba(201,168,76,0.6)]" : "text-white/15"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function MonsterCard({ monster, isExpanded, onToggle }: MonsterCardProps) {
  const categoryColor = categoryColors[monster.category] || "rgba(255,255,255,0.1)";

  return (
    <motion.div
      layout
      layoutId={`monster-card-${monster.id}`}
      onClick={!isExpanded ? onToggle : undefined}
      className={`glass relative overflow-hidden transition-colors ${
        !isExpanded
          ? "cursor-pointer hover:border-witcher-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.15)]"
          : ""
      }`}
      style={{ borderRadius: "1rem" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, layout: { duration: 0.35, ease: "easeInOut" } }}
    >
      {/* Category badge */}
      <motion.div
        layout="position"
        className="absolute top-3 right-3 z-10"
      >
        <span
          className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border"
          style={{
            background: categoryColor,
            borderColor: "rgba(255,255,255,0.12)",
            color: "rgba(255,255,255,0.8)",
            backdropFilter: "blur(8px)",
          }}
        >
          {monster.category}
        </span>
      </motion.div>

      <div className="p-5">
        {/* Header section — always visible */}
        <motion.div layout="position" className="pr-24">
          <h3
            className="text-gradient-gold glow-gold text-lg font-bold tracking-wide"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {monster.name}
          </h3>
          <div className="mt-1.5">
            <DifficultyStars level={monster.difficulty} />
          </div>
        </motion.div>

        {/* Description — collapsed shows 2 lines, expanded shows full */}
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.p
              key="collapsed-desc"
              layout="position"
              className="mt-3 text-sm text-witcher-silver/60 leading-relaxed line-clamp-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {monster.description}
            </motion.p>
          ) : (
            <motion.div
              key="expanded-detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
            >
              <MonsterDetail monster={monster} onClose={onToggle} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Collapsed footer hint */}
        {!isExpanded && (
          <motion.div
            layout="position"
            className="mt-3 flex items-center gap-1.5 text-witcher-gold/40 text-xs"
          >
            <span>Clique para detalhes</span>
            <svg
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        )}
      </div>

      {/* Subtle bottom accent line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${categoryColor}, transparent)`,
        }}
      />
    </motion.div>
  );
}
