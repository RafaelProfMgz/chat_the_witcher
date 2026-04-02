"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Sword, BookOpen } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function WolfMedallion({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer medallion circle */}
      <circle
        cx="32"
        cy="32"
        r="30"
        stroke="url(#gold-gradient)"
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="32"
        cy="32"
        r="27"
        stroke="url(#gold-gradient)"
        strokeWidth="0.5"
        opacity="0.4"
        fill="none"
      />
      {/* Stylized wolf head */}
      <g transform="translate(14, 12) scale(0.56)">
        {/* Left ear */}
        <path
          d="M18 8 L10 22 L22 20 Z"
          fill="url(#gold-gradient)"
          opacity="0.9"
        />
        {/* Right ear */}
        <path
          d="M46 8 L54 22 L42 20 Z"
          fill="url(#gold-gradient)"
          opacity="0.9"
        />
        {/* Head shape */}
        <path
          d="M22 20 C16 24 12 34 14 42 C16 48 22 54 26 58 L32 68 L38 58 C42 54 48 48 50 42 C52 34 48 24 42 20"
          fill="none"
          stroke="url(#gold-gradient)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Snout bridge */}
        <path
          d="M28 36 L32 52 L36 36"
          fill="none"
          stroke="url(#gold-gradient)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.7"
        />
        {/* Left eye */}
        <ellipse
          cx="24"
          cy="32"
          rx="3"
          ry="2.5"
          fill="url(#gold-gradient)"
          opacity="0.85"
        />
        {/* Right eye */}
        <ellipse
          cx="40"
          cy="32"
          rx="3"
          ry="2.5"
          fill="url(#gold-gradient)"
          opacity="0.85"
        />
        {/* Brow lines */}
        <path
          d="M18 28 L24 30"
          stroke="url(#gold-gradient)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M46 28 L40 30"
          stroke="url(#gold-gradient)"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
        {/* Nose */}
        <path
          d="M29 50 L32 54 L35 50"
          fill="url(#gold-gradient)"
          opacity="0.8"
        />
      </g>
      <defs>
        <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a84c" />
          <stop offset="50%" stopColor="#e8d28a" />
          <stop offset="100%" stopColor="#d4a853" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BestiaryLink() {
  const pathname = usePathname();
  const isActive = pathname === "/bestiary";

  return (
    <Link
      href="/bestiary"
      className={`glass-button p-2 flex items-center gap-1.5 ${
        isActive
          ? "border-witcher-gold/40 shadow-[0_0_12px_rgba(201,168,76,0.2)]"
          : ""
      }`}
      style={{ borderRadius: "0.75rem" }}
      title="Bestiário"
      aria-label="Bestiário"
    >
      <BookOpen
        className="w-5 h-5"
        style={{
          color: isActive ? "var(--witcher-gold-light)" : "var(--witcher-gold)",
        }}
      />
      <span
        className="hidden sm:inline text-xs font-medium tracking-wide"
        style={{
          color: isActive ? "var(--witcher-gold-light)" : "var(--witcher-gold)",
        }}
      >
        Bestiário
      </span>
    </Link>
  );
}

interface HeaderProps {
  leftAction?: ReactNode;
}

export default function Header({ leftAction }: HeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="glass w-full px-6 py-4 flex items-center gap-4"
    >
      {/* Optional left action (e.g. sidebar toggle) */}
      {leftAction}

      <motion.div
        initial={{ opacity: 0, scale: 0.7, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="relative flex-shrink-0"
      >
        {/* Fallback: Sword icon if SVG doesn't render well */}
        <div className="relative">
          <WolfMedallion className="w-12 h-12 drop-shadow-lg" />
          <div className="absolute inset-0 rounded-full bg-witcher-gold/10 blur-md -z-10" />
        </div>
      </motion.div>

      <div className="flex flex-col">
        <motion.h1
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="text-gradient-gold glow-gold text-2xl font-bold tracking-wide"
          style={{ fontFamily: "var(--font-cinzel)" }}
        >
          Witcher Oracle
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
          className="text-witcher-silver/60 text-xs tracking-widest uppercase mt-0.5"
        >
          O Oráculo do Bruxo
        </motion.p>
      </div>

      {/* Right side navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="ml-auto flex items-center gap-2"
      >
        <BestiaryLink />
        <Sword className="w-5 h-5 text-witcher-gold/40 hidden sm:block" />
      </motion.div>
    </motion.header>
  );
}
