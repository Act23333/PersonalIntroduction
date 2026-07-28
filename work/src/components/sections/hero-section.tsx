"use client";

import { motion } from "framer-motion";
import { ArrowDown, ChevronDown } from "lucide-react";
import Image from "next/image";
import { profile } from "@/data/profile";
import { GradientText } from "@/components/effects/gradient-text";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px]" />
      </div>

      <motion.div
        className="text-center max-w-[1000px]"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Avatar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="relative inline-block">
            {/* Glow ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-md" />
            <Image
              src="/avatar.jpg"
              alt="头像"
              width={120}
              height={120}
              className="relative w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-white/20 shadow-xl"
              priority
            />
          </div>
        </motion.div>

        {/* Greeting */}
        <motion.p
          className="text-gray-500 dark:text-gray-400 text-xl mb-4 font-mono"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          你好，我叫
        </motion.p>

        {/* Name */}
        <h1 className="text-6xl md:text-8xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          <GradientText as="span">{profile.nameEn}</GradientText>
        </h1>

        {/* Title */}
        <motion.p
          className="text-2xl md:text-3xl text-gray-700 dark:text-gray-300 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {profile.title}
        </motion.p>

        <motion.p
          className="text-gray-600 dark:text-gray-500 mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {profile.subtitle}
        </motion.p>

        {/* Tags */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {profile.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-1.5 text-sm text-blue-700 dark:text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Humble notes */}
        <motion.div
          className="mb-10 space-y-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <p className="text-gray-600 dark:text-gray-500 text-sm">{profile.tagline}</p>
          <p className="text-gray-500 dark:text-gray-600 text-xs">{profile.humilityNote}</p>
          <p className="text-gray-500 dark:text-gray-600 text-xs">{profile.aiNote}</p>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Button variant="primary" size="lg" onClick={scrollToProjects}>
            探索项目
            <ArrowDown size={18} />
          </Button>

          {/* Scroll hint */}
          <div className="flex flex-col items-center gap-1 mt-4">
            <span className="text-gray-500 dark:text-gray-600 text-xs tracking-widest uppercase">
              Scroll to Explore
            </span>
            <motion.div
              className="flex flex-col items-center gap-0.5 text-gray-400 dark:text-gray-700"
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ChevronDown size={14} />
              <ChevronDown size={14} />
              <ChevronDown size={14} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

    </section>
  );
}
