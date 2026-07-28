"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { skillCategories, type SkillCategory } from "@/data/skills";
import {
  Server,
  Network,
  Database,
  Layout,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Server,
  Network,
  Database,
  Layout,
  Sparkles,
};

function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div className="mb-3 last:mb-0">
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-gray-300">{name}</span>
        <span className="text-gray-600 text-xs">
          {level === 5
            ? "精通"
            : level === 4
              ? "熟练"
              : level === 3
                ? "掌握"
                : level === 2
                  ? "了解"
                  : "入门"}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: 0 }}
          whileInView={{ width: `${(level / 5) * 100}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

function SkillCategoryCard({ category }: { category: SkillCategory }) {
  const Icon = iconMap[category.icon] || Server;

  return (
    <GlassCard className="h-full" hover={false}>
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-blue-400" />
        </div>
        <h3 className="text-white font-semibold text-lg">{category.category}</h3>
      </div>
      {category.skills.map((skill) => (
        <SkillBar key={skill.name} name={skill.name} level={skill.level} />
      ))}
    </GlassCard>
  );
}

export function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="技术栈"
          title="技术能力矩阵"
          description="持续学习与积累的技术栈，涵盖后端开发、微服务、数据存储与AI应用"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => (
            <ScrollReveal key={category.category} delay={i * 0.1}>
              <SkillCategoryCard category={category} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
