"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface ButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40",
    outline:
      "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30",
    ghost: "text-gray-400 hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-medium transition-colors cursor-pointer",
        variants[variant],
        sizes[size],
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
