"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "关于", href: "#about" },
  { label: "技能", href: "#skills" },
  { label: "项目", href: "#projects" },
  { label: "工程", href: "#engineering" },
  { label: "AI 协作", href: "#ai" },
  { label: "联系", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = useCallback((href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-black/60 backdrop-blur-xl border-b border-white/10"
            : "bg-transparent",
        )}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleClick("#hero");
            }}
            className="text-white font-bold text-xl tracking-tight hover:text-blue-400 transition-colors"
          >
            HT<span className="text-blue-500">.dev</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className="px-3.5 py-2 text-sm text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-white/80 hover:text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="fixed top-16 left-4 right-4 z-50 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl p-4 md:hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleClick(item.href)}
                  className="block w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
