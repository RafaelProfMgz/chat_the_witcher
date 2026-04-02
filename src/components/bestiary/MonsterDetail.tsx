"use client";

import { motion } from "framer-motion";
import { X, MapPin, Flame, Droplets, Bomb, Quote, Shield } from "lucide-react";
import type { Monster } from "@/data/bestiary";

interface MonsterDetailProps {
  monster: Monster;
  onClose: () => void;
}

function DifficultyStars({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Dificuldade: ${level} de 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-sm ${i < level ? "text-witcher-gold" : "text-white/15"}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function Badge({ children, variant = "default" }: { children: React.ReactNode; variant?: "sign" | "oil" | "bomb" | "location" | "default" }) {
  const styles: Record<string, string> = {
    sign: "bg-witcher-gold/15 border-witcher-gold/30 text-witcher-gold-light",
    oil: "bg-witcher-purple/20 border-witcher-purple/40 text-purple-300",
    bomb: "bg-witcher-blood/20 border-witcher-blood/40 text-red-300",
    location: "bg-witcher-blue/20 border-witcher-blue/40 text-blue-300",
    default: "bg-white/5 border-white/10 text-white/70",
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${styles[variant]}`}>
      {children}
    </span>
  );
}

export default function MonsterDetail({ monster, onClose }: MonsterDetailProps) {
  const hasWeaknesses =
    monster.weaknesses.signs.length > 0 ||
    monster.weaknesses.oils.length > 0 ||
    monster.weaknesses.bombs.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />

      {/* Modal content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="glass-strong relative w-full max-w-lg max-h-[85vh] overflow-y-auto z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 glass-button p-1.5 rounded-full z-20 hover:bg-white/10 transition-colors"
          aria-label="Fechar detalhes"
        >
          <X className="w-4 h-4 text-witcher-silver/70" />
        </button>

        <div className="p-6 space-y-5">
          {/* Header: Name, Category, Difficulty */}
          <div className="pr-8">
            <div className="flex items-center gap-2 mb-2">
              <Badge>{monster.category}</Badge>
              <DifficultyStars level={monster.difficulty} />
            </div>
            <h2
              className="text-gradient-gold glow-gold text-2xl font-bold tracking-wide"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              {monster.name}
            </h2>
          </div>

          {/* Description */}
          <p className="text-witcher-silver/80 text-sm leading-relaxed">
            {monster.description}
          </p>

          {/* Weaknesses */}
          {hasWeaknesses && (
            <div className="space-y-3">
              <h3
                className="flex items-center gap-2 text-witcher-gold text-sm font-semibold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                <Shield className="w-4 h-4" />
                Fraquezas
              </h3>

              <div className="glass-subtle p-4 space-y-3">
                {/* Signs */}
                {monster.weaknesses.signs.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-witcher-gold-light/70 uppercase tracking-wider">
                      <Flame className="w-3.5 h-3.5" />
                      <span>Sinais</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {monster.weaknesses.signs.map((sign) => (
                        <Badge key={sign} variant="sign">{sign}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Oils */}
                {monster.weaknesses.oils.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-purple-300/70 uppercase tracking-wider">
                      <Droplets className="w-3.5 h-3.5" />
                      <span>Óleos</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {monster.weaknesses.oils.map((oil) => (
                        <Badge key={oil} variant="oil">{oil}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bombs */}
                {monster.weaknesses.bombs.length > 0 && (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs text-red-300/70 uppercase tracking-wider">
                      <Bomb className="w-3.5 h-3.5" />
                      <span>Bombas</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {monster.weaknesses.bombs.map((bomb) => (
                        <Badge key={bomb} variant="bomb">{bomb}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Locations */}
          {monster.locations.length > 0 && (
            <div className="space-y-2">
              <h3
                className="flex items-center gap-2 text-witcher-gold text-sm font-semibold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                <MapPin className="w-4 h-4" />
                Localizações
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {monster.locations.map((loc) => (
                  <Badge key={loc} variant="location">{loc}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Vesemir's Tip */}
          {monster.tip && (
            <div className="space-y-2">
              <h3
                className="flex items-center gap-2 text-witcher-gold text-sm font-semibold uppercase tracking-wider"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                <Quote className="w-4 h-4" />
                Conselho de Vesemir
              </h3>
              <div className="glass-subtle p-4 border-l-2 border-witcher-gold/40">
                <p className="text-witcher-silver/80 text-sm italic leading-relaxed">
                  &ldquo;{monster.tip}&rdquo;
                </p>
                <p className="text-witcher-gold/50 text-xs mt-2 text-right">
                  — Vesemir, Mestre Bruxo
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
