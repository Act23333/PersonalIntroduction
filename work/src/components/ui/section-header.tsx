"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn("text-center mb-16", className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
    >
      <span className="inline-block text-base font-mono tracking-widest uppercase text-blue-400 mb-4 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5">
        {label}
      </span>
      <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      {description && (
        <p className="text-gray-500 dark:text-gray-400 text-xl max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
