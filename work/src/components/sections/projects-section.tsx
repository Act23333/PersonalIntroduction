"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code,
  ChevronRight,
  Cpu,
} from "lucide-react";
import { projects, type Project } from "@/data/projects";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <ScrollReveal delay={index * 0.15}>
      <GlassCard className="h-full group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-2xl">
                {project.name}
              </h3>
              <p className="text-gray-500 text-base mt-0.5">{project.description}</p>
            </div>
          </div>
        </div>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-xs text-gray-400 bg-gray-200 dark:bg-white/[0.04] border border-gray-300 dark:border-white/[0.06] rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Highlights */}
        <div className="space-y-3">
          {project.highlights.map((h) => (
            <div
              key={h.label}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] transition-colors"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Code className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <div>
                <p className="text-gray-900 dark:text-white text-base font-medium">{h.label}</p>
                <p className="text-gray-500 text-sm mt-0.5 leading-relaxed">
                  {h.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture diagram expandable */}
        {project.architecture && (
          <div className="mt-5 pt-4 border-t border-gray-200 dark:border-white/5">
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors w-full"
            >
              <ChevronRight
                size={16}
                className={`transition-transform ${expanded ? "rotate-90" : ""}`}
              />
              架构拓扑
            </button>
            <AnimatePresence>
              {expanded && (
                <motion.pre
                  className="mt-3 p-4 rounded-xl bg-gray-100 dark:bg-black/40 border border-gray-200 dark:border-white/5 text-xs text-gray-400 font-mono leading-relaxed overflow-x-auto"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {project.architecture}
                </motion.pre>
              )}
            </AnimatePresence>
          </div>
        )}
      </GlassCard>
    </ScrollReveal>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="项目"
          title="项目经历"
          description="展示核心项目的技术架构与工程实践"
        />

        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
