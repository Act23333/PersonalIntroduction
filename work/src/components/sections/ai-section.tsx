"use client";

import { motion } from "framer-motion";
import {
  Lightbulb,
  PenTool,
  Terminal,
  GitPullRequest,
  FileText,
  Bot,
  User,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import { aiWorkflow, aiPhilosophy } from "@/data/ai-workflow";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

const iconMap: Record<string, LucideIcon> = {
  Lightbulb,
  PenTool,
  Terminal,
  GitPullRequest,
  FileText,
};

export function AISection() {
  return (
    <section id="ai" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="AI 开发"
          title="AI 开发协作"
          description={aiPhilosophy.description}
        />

        {/* Philosophy card */}
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-500/5 to-purple-500/5 p-8 mb-12">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <Bot className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-gray-900 dark:text-white font-bold text-2xl mb-1">
                  {aiPhilosophy.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{aiPhilosophy.description}</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Workflow steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {aiWorkflow.map((step, i) => {
            const Icon = iconMap[step.icon] || Terminal;
            return (
              <ScrollReveal key={step.phase} delay={i * 0.1}>
                <motion.div
                  className="relative rounded-2xl border border-gray-300 dark:border-white/[0.06] bg-white/[0.03] p-5 h-full hover:bg-white/[0.05] transition-colors"
                  whileHover={{ y: -2 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-400" />
                    </div>
                    <span className="text-gray-900 dark:text-white font-semibold text-sm">
                      {step.phase}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Bot className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        {step.aiRole}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <User className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                        {step.developerRole}
                      </p>
                    </div>
                  </div>

                  {/* Arrow connector between AI and Dev */}
                  <div className="mt-4 pt-3 border-t border-gray-200 dark:border-white/5 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-gray-600" />
                  </div>
                </motion.div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
