import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/effects/theme-provider";
import { ClientShell } from "@/components/layout/client-shell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HT.dev | Java 后端开发工程师",
  description:
    "黄涛 - Java后端开发工程师。专注高并发系统、微服务架构、Redis优化与AI应用开发。",
  keywords: [
    "Java",
    "SpringBoot",
    "SpringCloud",
    "微服务",
    "后端开发",
    "Redis",
    "Docker",
  ],
  authors: [{ name: "黄涛" }],
  openGraph: {
    title: "HT.dev | Java 后端开发工程师",
    description: "构建可扩展的分布式系统",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <ClientShell />
          <div className="relative z-10 flex flex-col flex-1">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
