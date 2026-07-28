"use client";

import { motion } from "framer-motion";
import {
  FileSearch,
  Blocks,
  Code,
  TestTube,
  Container,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { engineeringFlow } from "@/data/engineering";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

const iconMap: Record<string, LucideIcon> = {
  FileSearch,
  Blocks,
  Code,
  TestTube,
  Container,
  Rocket,
};

function EngineeringStepCard({
  step,
  index,
  isLast,
}: {
  step: (typeof engineeringFlow)[number];
  index: number;
  isLast: boolean;
}) {
  const Icon = iconMap[step.icon] || Code;
  const isLeft = index % 2 === 0;

  return (
    <ScrollReveal delay={index * 0.1}>
      <div className="relative flex items-start gap-6 md:gap-12">
        {/* Timeline line */}
        {!isLast && (
          <div className="absolute left-[27px] top-14 bottom-0 w-px bg-gradient-to-b from-blue-500/50 to-transparent hidden md:block" />
        )}

        {/* Icon node */}
        <div className="relative z-10 flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-blue-400" />
        </div>

        {/* Content */}
        <motion.div
          className="flex-1 pb-12 last:pb-0"
          whileHover={{ x: isLeft ? 4 : 0 }}
        >
          <h3 className="text-gray-900 dark:text-white font-semibold text-2xl mb-1">{step.step}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">{step.description}</p>
          <div className="flex flex-wrap gap-2">
            {step.details.map((d) => (
              <span
                key={d}
                className="px-3 py-1 text-xs text-gray-500 bg-gray-200 dark:bg-white/[0.04] border border-gray-300 dark:border-white/[0.06] rounded-full"
              >
                {d}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </ScrollReveal>
  );
}

export function EngineeringSection() {
  return (
    <section id="engineering" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <SectionHeader
          label="工程实践"
          title="工程实践流程"
          description="从需求到上线的完整开发流程"
        />

        <div className="mt-12">
          {engineeringFlow.map((step, i) => (
            <EngineeringStepCard
              key={step.step}
              step={step}
              index={i}
              isLast={i === engineeringFlow.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
