"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-gray-200 dark:border-white/10",
        "bg-white/50 dark:bg-white/[0.06] backdrop-blur-xl",
        "p-6 md:p-8",
        glow && "before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-br before:from-blue-500/10 before:to-purple-500/10 before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        className,
      )}
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
