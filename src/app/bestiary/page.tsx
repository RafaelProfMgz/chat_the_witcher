"use client";

import { useState, useMemo, useCallback } from "react";
import { Search, ArrowLeft, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BESTIARY, MONSTER_CATEGORIES } from "@/data/bestiary";
import type { Monster, MonsterCategory } from "@/data/bestiary";
import MonsterDetail from "@/components/bestiary/MonsterDetail";

// Strip accents for accent-insensitive search
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
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
    <div
      className="flex items-center gap-0.5"
      aria-label={`Dificuldade: ${level} de 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-sm ${
            i < level
              ? "text-witcher-gold drop-shadow-[0_0_3px_rgba(201,168,76,0.6)]"
              : "text-white/15"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function MonsterGridCard({
  monster,
  onSelect,
}: {
  monster: Monster;
  onSelect: (monster: Monster) => void;
}) {
  const categoryColor =
    categoryColors[monster.category] || "rgba(255,255,255,0.1)";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={() => onSelect(monster)}
      className="glass relative overflow-hidden cursor-pointer hover:border-witcher-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.15)] transition-all duration-300 group"
      style={{ borderRadius: "1rem" }}
    >
      {/* Category badge */}
      <div className="absolute top-3 right-3 z-10">
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
      </div>

      <div className="p-5">
        {/* Header */}
        <div className="pr-24">
          <h3
            className="text-gradient-gold glow-gold text-lg font-bold tracking-wide"
            style={{ fontFamily: "var(--font-cinzel)" }}
          >
            {monster.name}
          </h3>
          <div className="mt-1.5">
            <DifficultyStars level={monster.difficulty} />
          </div>
        </div>

        {/* Description truncated to 2 lines */}
        <p className="mt-3 text-sm text-witcher-silver/60 leading-relaxed line-clamp-2">
          {monster.description}
        </p>

        {/* Footer hint */}
        <div className="mt-3 flex items-center gap-1.5 text-witcher-gold/40 text-xs group-hover:text-witcher-gold/70 transition-colors">
          <span>Clique para detalhes</span>
          <svg
            className="w-3 h-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
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

export default function BestiaryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    MonsterCategory | "Todos"
  >("Todos");
  const [selectedMonster, setSelectedMonster] = useState<Monster | null>(null);

  const filteredMonsters = useMemo(() => {
    const normalizedQuery = normalizeText(searchQuery.trim());

    return BESTIARY.filter((monster) => {
      // Category filter
      if (activeCategory !== "Todos" && monster.category !== activeCategory) {
        return false;
      }

      // Search filter
      if (normalizedQuery) {
        const nameMatch = normalizeText(monster.name).includes(normalizedQuery);
        const descMatch = normalizeText(monster.description).includes(
          normalizedQuery,
        );
        const categoryMatch = normalizeText(monster.category).includes(
          normalizedQuery,
        );
        return nameMatch || descMatch || categoryMatch;
      }

      return true;
    });
  }, [searchQuery, activeCategory]);

  const handleSelectMonster = useCallback((monster: Monster) => {
    setSelectedMonster(monster);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedMonster(null);
  }, []);

  return (
    <>
      <div className="flex flex-col min-h-screen overflow-x-hidden">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="glass shrink-0 w-full px-4 sm:px-8 py-4 flex items-center gap-4 min-w-0"
        >
          <Link
            href="/"
            className="glass-button flex items-center gap-2 px-3 py-2 text-sm text-witcher-silver/70 hover:text-witcher-gold-light transition-colors ml-0"
            style={{ borderRadius: "0.75rem" }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Voltar ao Chat</span>
          </Link>

          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-witcher-gold" />
            <div>
              <h1
                className="text-gradient-gold glow-gold text-xl sm:text-2xl font-bold tracking-wide"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                📖 Bestiário
              </h1>
              <p className="text-witcher-silver/50 text-[10px] sm:text-xs tracking-widest uppercase">
                Os monstros que assolam o Continente
              </p>
            </div>
          </div>

          {/* Monster count */}
          <div className="ml-auto hidden sm:flex items-center gap-2 text-witcher-silver/40 text-xs">
            <span>
              {filteredMonsters.length} de {BESTIARY.length} criaturas
            </span>
          </div>
        </motion.header>

        {/* Main content */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-witcher-silver/40 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar monstro..."
              className="glass-input w-full pl-11 pr-4 py-3 text-sm"
              style={{ borderRadius: "0.75rem" }}
            />
          </motion.div>

          {/* Category filter chips */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-2 overflow-x-auto pb-2 scroll-smooth"
          >
            {/* "Todos" chip */}
            <button
              onClick={() => setActiveCategory("Todos")}
              className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-250 border ${
                activeCategory === "Todos"
                  ? "glass-button-gold"
                  : "glass-button text-witcher-silver/60 hover:text-witcher-silver/90"
              }`}
            >
              Todos
            </button>

            {MONSTER_CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              const count = BESTIARY.filter(
                (m) => m.category === category,
              ).length;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`shrink-0 px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-250 border ${
                    isActive
                      ? "glass-button-gold"
                      : "glass-button text-witcher-silver/60 hover:text-witcher-silver/90"
                  }`}
                >
                  {category}{" "}
                  <span className="opacity-50 ml-0.5">({count})</span>
                </button>
              );
            })}
          </motion.div>

          {/* Monster grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredMonsters.map((monster) => (
                <MonsterGridCard
                  key={monster.id}
                  monster={monster}
                  onSelect={handleSelectMonster}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {filteredMonsters.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-20 text-center"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3
                className="text-witcher-gold/60 text-lg font-semibold"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Nenhum monstro encontrado
              </h3>
              <p className="text-witcher-silver/40 text-sm mt-2 max-w-md">
                Tente buscar por outro nome ou selecione uma categoria
                diferente. Talvez o monstro que procuras ainda não tenha sido
                catalogado.
              </p>
            </motion.div>
          )}
        </main>

        {/* Footer */}
        <footer
          className="shrink-0 border-t px-4 py-2 text-center"
          style={{
            borderColor: "var(--witcher-glass-border)",
            background: "rgba(10, 10, 15, 0.6)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          <p className="text-[11px] tracking-wide text-witcher-silver/40">
            Dados baseados em The Witcher 3: Wild Hunt • Fonte:{" "}
            <span className="text-witcher-gold/50">Bestiário do Bruxo</span>
          </p>
        </footer>
      </div>

      {/* Monster detail modal */}
      <AnimatePresence>
        {selectedMonster && (
          <MonsterDetail
            monster={selectedMonster}
            onClose={handleCloseDetail}
          />
        )}
      </AnimatePresence>
    </>
  );
}
