import { ExternalLink, Mail, Phone } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-white/10 bg-gray-100/60 dark:bg-black/40">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="text-gray-900 dark:text-white font-bold text-lg">
              HT<span className="text-blue-500">.dev</span>
            </span>
            <span className="text-gray-500 dark:text-gray-600 text-sm">
              &copy; {new Date().getFullYear()}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`tel:${profile.phone}`}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="电话"
            >
              <Phone size={18} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="邮箱"
            >
              <Mail size={18} />
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <ExternalLink size={18} />
            </a>
          </div>

          <p className="text-gray-500 dark:text-gray-600 text-sm">
            使用 Next.js 构建 &middot; AI 辅助设计
          </p>
        </div>
      </div>
    </footer>
  );
}
