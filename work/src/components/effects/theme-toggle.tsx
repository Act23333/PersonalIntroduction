"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/effects/theme-provider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <motion.button
      onClick={toggle}
      className="fixed z-50 w-10 h-10 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-xl border border-gray-300 dark:border-white/20 flex items-center justify-center shadow-lg cursor-pointer"
      style={{ right: 20, top: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={theme === "dark" ? "切换到白天模式" : "切换到黑夜模式"}
    >
      {theme === "dark" ? (
        <Sun size={16} className="text-yellow-400" />
      ) : (
        <Moon size={16} className="text-blue-400" />
      )}
    </motion.button>
  );
}
