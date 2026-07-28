"use client";

import { useTheme } from "@/components/effects/theme-provider";
import { MusicPlayer } from "@/components/effects/music-player";
import { FlowField } from "@/components/effects/flow-field";
import { DayRain } from "@/components/effects/day-rain";
import { ThemeToggle } from "@/components/effects/theme-toggle";

export function ClientShell() {
  const { theme } = useTheme();

  return (
    <>
      {theme === "dark" ? <FlowField /> : <DayRain />}
      <ThemeToggle />
      <MusicPlayer />
    </>
  );
}
