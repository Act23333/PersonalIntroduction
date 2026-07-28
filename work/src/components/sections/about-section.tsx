"use client";

import {
  GraduationCap,
  Award,
  MapPin,
  Calendar,
} from "lucide-react";
import { education, certificates, profile, selfEvaluation } from "@/data/profile";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/effects/scroll-reveal";

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <SectionHeader
          label="关于"
          title="关于我"
          description={selfEvaluation}
        />

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <ScrollReveal delay={0}>
            <GlassCard className="h-full">
              <GraduationCap className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-gray-900 dark:text-white font-semibold text-xl mb-2">教育背景</h3>
              <p className="text-gray-700 dark:text-gray-300 font-medium">{education.school}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{education.major}</p>
              <p className="text-gray-500 text-sm mt-1">{education.degree}</p>
              <div className="flex items-center gap-2 mt-3 text-gray-500 text-sm">
                <Calendar size={14} />
                <span>{education.period}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-blue-400 text-sm">
                <MapPin size={14} />
                <span>{profile.graduationYear}</span>
              </div>
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <GlassCard className="h-full">
              <Award className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-gray-900 dark:text-white font-semibold text-xl mb-2">技能证书</h3>
              {certificates.map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-white/5 last:border-0"
                >
                  <span className="text-gray-700 dark:text-gray-300">{cert.name}</span>
                  <span className="text-gray-500 text-sm">{cert.level}</span>
                </div>
              ))}
            </GlassCard>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <GlassCard className="h-full">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 mb-4 flex items-center justify-center text-white text-sm font-bold">
                HT
              </div>
              <h3 className="text-gray-900 dark:text-white font-semibold text-xl mb-2">求职方向</h3>
              <div className="flex flex-wrap gap-2">
                {profile.jobPreferences.map((job) => (
                  <span
                    key={job}
                    className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-full"
                  >
                    {job}
                  </span>
                ))}
              </div>
            </GlassCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
