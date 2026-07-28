"use client";

import { motion } from "framer-motion";
import { Phone, Mail, ExternalLink, Copy, Check } from "lucide-react";
import { useState, useCallback } from "react";
import { profile } from "@/data/profile";
import { GlassCard } from "@/components/ui/glass-card";
import { SectionHeader } from "@/components/ui/section-header";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import { GradientText } from "@/components/effects/gradient-text";

function ContactItem({
  icon: Icon,
  label,
  value,
  href,
  copyable,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  copyable?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    if (!copyable) return;
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [copyable, value]);

  const content = (
    <GlassCard className="flex items-center gap-4 cursor-default">
      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-blue-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-gray-500 text-xs mb-0.5">{label}</p>
        <p className="text-gray-900 dark:text-white font-medium truncate">{value}</p>
      </div>
      {copyable && (
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
          aria-label={`复制 ${label}`}
        >
          {copied ? (
            <Check size={16} className="text-green-400" />
          ) : (
            <Copy size={16} />
          )}
        </button>
      )}
    </GlassCard>
  );

  if (href && !copyable) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return content;
}

export function ContactSection() {
  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <SectionHeader
          label="联系方式"
          title="联系我"
          description="欢迎技术交流与合作机会"
        />

        <ScrollReveal>
          <div className="space-y-4">
            <ContactItem
              icon={Phone}
              label="电话"
              value={profile.phone}
              copyable
            />
            <ContactItem
              icon={Mail}
              label="邮箱"
              value={profile.email}
              href={`mailto:${profile.email}`}
              copyable
            />
            <ContactItem
              icon={ExternalLink}
              label="GitHub"
              value={profile.github}
              href={profile.github}
            />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <motion.p className="text-center text-gray-600 text-sm mt-12">
            <GradientText>HT.dev</GradientText> &mdash; 用心构建 · AI 辅助
          </motion.p>
        </ScrollReveal>
      </div>
    </section>
  );
}
