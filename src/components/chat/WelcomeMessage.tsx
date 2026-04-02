"use client";

import { motion } from "framer-motion";
import { Sword } from "lucide-react";
import { getPersona } from "@/lib/personas";

interface WelcomeMessageProps {
  onSelectQuestion: (question: string) => void;
  personaId?: string;
}

export default function WelcomeMessage({
  onSelectQuestion,
  personaId = "vesemir",
}: WelcomeMessageProps) {
  const persona = getPersona(personaId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center justify-center w-full px-4 py-8"
    >
      <div className="glass-strong max-w-lg w-full p-8 text-center">
        {/* Persona Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            duration: 0.5,
            delay: 0.2,
            type: "spring",
            stiffness: 200,
          }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full"
          style={{
            background: `linear-gradient(135deg, ${persona.color}33, ${persona.color}1a)`,
            border: `1px solid ${persona.color}66`,
            boxShadow: `0 0 20px ${persona.color}4d, 0 0 40px ${persona.color}1a`,
          }}
        >
          <span className="text-3xl" role="img" aria-label={persona.name}>
            {persona.icon}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="font-[family-name:var(--font-cinzel)] text-2xl font-bold mb-4"
          style={{
            backgroundImage: `linear-gradient(135deg, ${persona.color}, ${persona.color}cc)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {persona.name}
        </motion.h2>

        {/* Persona Greeting */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-witcher-silver/80 text-sm leading-relaxed mb-8"
        >
          {persona.greeting}
        </motion.p>

        {/* Suggested Question Chips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.65 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {persona.suggestedQuestions.map((question, index) => (
            <motion.button
              key={question}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.75 + index * 0.08 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => onSelectQuestion(question)}
              className="glass-button text-xs px-4 py-2 transition-colors cursor-pointer"
              style={{
                color: `${persona.color}e6`,
              }}
            >
              {question}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
