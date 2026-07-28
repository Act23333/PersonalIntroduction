export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  file: string; // relative path in /public/music/
}

export const musicPlaylist: MusicTrack[] = [
  {
    id: "track-1",
    title: "特别的人",
    artist: "方大同",
    file: "/music/特别的人.mp3",
  },
  {
    id: "track-2",
    title: "just of love",
    artist: "曲婉婷",
    file: "/music/just of love.mp3",
  },
  {
    id: "track-3",
    title: "爱是个什么东西",
    artist: "陶喆",
    file: "/music/爱是个什么东西.mp3",
  },
  {
    id: "track-4",
    title: "死别",
    artist: "あいうaiu",
    file: "/music/死别.mp3"
  },
];
