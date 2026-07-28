"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Music,
  X,
  ListMusic,
} from "lucide-react";
import { musicPlaylist, type MusicTrack } from "@/data/music";

// ─── Draggable Hook ──────────────────────────────────────

const BTN_SIZE = 48;
const DRAG_THRESHOLD = 4; // px — below this = click, above = drag

function useDraggable() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [ready, setReady] = useState(false);
  const startPos = useRef({ x: 0, y: 0 });
  const moved = useRef(0);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const nodeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!ready) {
      setPos({
        x: window.innerWidth - BTN_SIZE - 20,
        y: window.innerHeight - BTN_SIZE - 20,
      });
      setReady(true);
    }
  }, [ready]);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    dragging.current = true;
    moved.current = 0;
    startPos.current = { x: e.clientX, y: e.clientY };
    const rect = nodeRef.current?.getBoundingClientRect();
    if (rect) {
      offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    }
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    moved.current = Math.sqrt(dx * dx + dy * dy);

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    setPos({
      x: Math.max(8, Math.min(vw - BTN_SIZE - 8, e.clientX - offset.current.x)),
      y: Math.max(8, Math.min(vh - BTN_SIZE - 8, e.clientY - offset.current.y)),
    });
  }, []);

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  // Returns true if this was a click (not a drag)
  const wasClick = useCallback(() => moved.current < DRAG_THRESHOLD, []);

  return { pos, ready, nodeRef, onPointerDown, onPointerMove, onPointerUp, wasClick, dragging };
}

// ─── Vinyl Disc ──────────────────────────────────────────

function VinylDisc({ spinning }: { spinning: boolean }) {
  return (
    <motion.div
      className="relative w-40 h-40 flex-shrink-0"
      animate={{ rotate: spinning ? 360 : 0 }}
      transition={{
        rotate: { duration: 2.5, repeat: spinning ? Infinity : 0, ease: "linear" },
      }}
    >
      {/* Disc body */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-700 via-zinc-800 to-zinc-900 shadow-2xl">
        {/* Grooves */}
        <div className="absolute inset-[4px] rounded-full border border-zinc-600/50" />
        <div className="absolute inset-[9px] rounded-full border border-zinc-600/35" />
        <div className="absolute inset-[15px] rounded-full border border-zinc-600/25" />
        <div className="absolute inset-[22px] rounded-full border border-zinc-600/18" />
        <div className="absolute inset-[30px] rounded-full border border-zinc-600/12" />
        <div className="absolute inset-[39px] rounded-full border border-zinc-600/08" />

        {/* Rotation marker — bright dot */}
        <div className="absolute top-[8px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.9)]" />

        {/* Center label */}
        <div className="absolute inset-[43px] rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full bg-zinc-900/50" />
        </div>
      </div>

      {/* Static reflections */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-white/4 via-transparent to-transparent pointer-events-none" />
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────

export function MusicPlayer() {
  const [hidden, setHidden] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

  const { pos, ready, nodeRef, onPointerDown, onPointerMove, onPointerUp, wasClick, dragging } =
    useDraggable();

  const currentTrack: MusicTrack | undefined = musicPlaylist[currentTrackIndex];

  // ── Initialize audio + auto-play ───────────────────────
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.4;
    audioRef.current = audio;

    const onEnded = () => {
      setCurrentTrackIndex((i) => (i + 1) % musicPlaylist.length);
    };
    audio.addEventListener("ended", onEnded);

    if (musicPlaylist.length > 0) {
      audio.src = musicPlaylist[0].file;
      audio.load();
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }

    const retry = () => {
      if (!hasInteracted.current && !playing && audio.src) {
        hasInteracted.current = true;
        audio.play().then(() => setPlaying(true)).catch(() => {});
      }
    };
    window.addEventListener("click", retry, { once: true });
    window.addEventListener("keydown", retry, { once: true });

    return () => {
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audio.src = "";
      window.removeEventListener("click", retry);
      window.removeEventListener("keydown", retry);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Load track on index change ─────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentTrack) return;
    const wasPlaying = !audio.paused;
    audio.src = currentTrack.file;
    audio.load();
    if (wasPlaying || playing) {
      audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex]);

  // ── Controls ───────────────────────────────────────────
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    hasInteracted.current = true;
    if (playing) { audio.pause(); setPlaying(false); }
    else { audio.play().then(() => setPlaying(true)).catch(() => {}); }
  }, [playing]);

  const handleNext = useCallback(() => {
    setCurrentTrackIndex((i) => (i + 1) % musicPlaylist.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentTrackIndex((i) => (i - 1 + musicPlaylist.length) % musicPlaylist.length);
  }, []);

  const selectTrack = useCallback((index: number) => {
    setCurrentTrackIndex(index);
    setShowPlaylist(false);
    hasInteracted.current = true;
    setTimeout(() => {
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
    }, 80);
  }, []);

  // ── Render ─────────────────────────────────────────────

  return (
    <>
      {/* Floating draggable toggle */}
      <motion.button
        ref={nodeRef}
        className="fixed z-50 w-12 h-12 rounded-full bg-white/70 dark:bg-white/10 backdrop-blur-xl border border-gray-300 dark:border-white/20 flex items-center justify-center text-gray-800 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-white dark:hover:bg-white/20 shadow-lg cursor-grab active:cursor-grabbing select-none touch-none"
        style={{
          left: pos.x,
          top: pos.y,
          opacity: ready ? 1 : 0,
          transition: "opacity 0.3s",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onClick={() => {
          if (wasClick()) setHidden(!hidden);
        }}
        whileHover={{ scale: dragging.current ? 1 : 1.1 }}
        whileTap={{ scale: dragging.current ? 1 : 0.95 }}
        aria-label={hidden ? "打开音乐播放器" : "关闭音乐播放器"}
      >
        <Music size={18} />
        {playing && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-blue-400 rounded-full shadow-[0_0_6px_rgba(96,165,250,0.6)] animate-pulse" />
        )}
      </motion.button>

      {/* Player panel */}
      <AnimatePresence>
        {!hidden && (
          <motion.div
            className="fixed z-50 rounded-[28px] border border-white/10 bg-black/85 backdrop-blur-2xl shadow-2xl overflow-hidden"
            style={{ right: 20, bottom: 72, width: 300 }}
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 32 }}
          >
            {/* Ambient glow blobs */}
            <div className="absolute -left-12 -top-8 w-32 h-32 bg-blue-500/25 rounded-full blur-[40px] pointer-events-none" />
            <div className="absolute -right-12 -bottom-8 w-32 h-32 bg-purple-500/25 rounded-full blur-[40px] pointer-events-none" />

            {/* Header */}
            <div className="relative flex items-center justify-between px-5 pt-4 pb-1">
              <span className="text-white/70 text-[11px] font-medium tracking-widest uppercase">
                正在播放
              </span>
              <div className="flex items-center gap-0.5">
                <button
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className={`p-2 rounded-xl transition-colors cursor-pointer ${
                    showPlaylist
                      ? "text-blue-400 bg-blue-500/10"
                      : "text-white/40 hover:text-white hover:bg-white/5"
                  }`}
                  aria-label="播放列表"
                >
                  <ListMusic size={15} />
                </button>
                <button
                  onClick={() => setHidden(true)}
                  className="p-2 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                  aria-label="关闭"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Disc — centered, large */}
            <div className="relative flex justify-center py-6">
              <VinylDisc spinning={playing} />
            </div>

            {/* Track info — centered */}
            <div className="relative text-center px-5 pb-1">
              <p className="text-white font-semibold text-sm truncate">
                {currentTrack?.title || "未选择曲目"}
              </p>
              <p className="text-white/35 text-xs mt-0.5 truncate">
                {currentTrack?.artist || ""}
              </p>
            </div>

            {/* Controls — centered */}
            <div className="relative flex items-center justify-center gap-5 pb-6">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full text-white/35 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="上一首"
              >
                <SkipBack size={18} />
              </button>

              <button
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-colors cursor-pointer shadow-lg shadow-white/10"
                aria-label={playing ? "暂停" : "播放"}
              >
                {playing ? <Pause size={19} /> : <Play size={19} className="ml-0.5" />}
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-full text-white/35 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="下一首"
              >
                <SkipForward size={18} />
              </button>
            </div>

            {/* Playlist */}
            <AnimatePresence>
              {showPlaylist && (
                <motion.div
                  className="border-t border-white/5 max-h-52 overflow-y-auto"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {musicPlaylist.map((track, i) => (
                    <button
                      key={track.id}
                      onClick={() => selectTrack(i)}
                      className={`w-full text-left px-5 py-3 flex items-center gap-3 hover:bg-white/[0.04] transition-colors cursor-pointer ${
                        i === currentTrackIndex ? "bg-blue-500/8" : ""
                      }`}
                    >
                      <span
                        className={`text-xs font-mono w-5 ${
                          i === currentTrackIndex ? "text-blue-400" : "text-white/25"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm truncate ${
                            i === currentTrackIndex ? "text-blue-400 font-medium" : "text-white/70"
                          }`}
                        >
                          {track.title}
                        </p>
                        <p className="text-white/30 text-xs truncate">{track.artist}</p>
                      </div>
                      {i === currentTrackIndex && playing && (
                        <span className="flex gap-[2px] items-end h-4">
                          <span className="w-0.5 bg-blue-400 rounded-full" style={{ animation: "equalizer 0.6s ease-in-out infinite", height: "60%" }} />
                          <span className="w-0.5 bg-blue-400 rounded-full" style={{ animation: "equalizer 0.6s ease-in-out 0.15s infinite", height: "100%" }} />
                          <span className="w-0.5 bg-blue-400 rounded-full" style={{ animation: "equalizer 0.6s ease-in-out 0.3s infinite", height: "80%" }} />
                        </span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
