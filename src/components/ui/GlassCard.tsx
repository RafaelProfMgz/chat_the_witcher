"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  variant?: "default" | "strong" | "subtle";
}

const variantClasses: Record<NonNullable<GlassCardProps["variant"]>, string> = {
  default: "glass",
  strong: "glass-strong",
  subtle: "glass-subtle",
};

export default function GlassCard({
  children,
  className = "",
  hover = false,
  variant = "default",
}: GlassCardProps) {
  const baseClass = variantClasses[variant];

  if (hover) {
    return (
      <motion.div
        className={`${baseClass} ${className}`}
        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.div>
    );
  }

  return <div className={`${baseClass} ${className}`}>{children}</div>;
}
