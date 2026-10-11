import { LucideIcon, Mic, FileText, Cpu, GraduationCap, Youtube, Home, Sparkles, Wand2, Layers, Music, FileCode2, Search, ChefHat, Globe2 } from "lucide-react";

export interface ToolItem {
  id: string;
  name: string;
  shortName: string;
  path: string;
  icon: LucideIcon;
  description: string;
  category: "Audio & Speech" | "Academic & Documents" | "Subtitles & Formats" | "AI & Intelligence" | "Video & YouTube" | "Utilities";
  badge?: string;
  badgeType?: "orange" | "cyan" | "purple" | "emerald" | "amber" | "red";
  dockPriority: number; // Lower numbers appear first in the mobile quick dock
  accentBg: string;
  accentText: string;
  keywords: string[];
}

export const TOOLS_REGISTRY: ToolItem[] = [
  {
    id: "transcribe",
    name: "Speech → Text Engine",
    shortName: "Transcribe",
    path: "/transcribe",
    icon: Mic,
    description: "High-precision audio/video transcription with automated cue timestamps and AI executive summaries.",
    category: "Audio & Speech",
    badge: "Engine 01",
    badgeType: "orange",
    dockPriority: 1,
    accentBg: "bg-[#ff4d00]/10",
    accentText: "text-[#ff4d00]",
    keywords: ["audio", "speech", "voice", "video", "mp3", "wav", "m4a", "transcribe", "stt", "dictation"],
  },
  {
    id: "youtube",
    name: "YouTube Transcript Generator",
    shortName: "YouTube",
    path: "/youtube-transcript",
    icon: Youtube,
    description: "Instant YouTube transcript with timestamps, chapter summaries, Q&A, and AI speech synthesis for accessible study notes.",
    category: "Video & YouTube",
    badge: "Engine 02",
    badgeType: "red",
    dockPriority: 2,
    accentBg: "bg-red-500/10",
    accentText: "text-red-600",
    keywords: ["youtube", "video", "shorts", "captions", "subtitles", "timestamps", "summary", "youtube to text", "study notes"],
  },
  {
    id: "convert",
    name: "Subtitle & Format Converter",
    shortName: "Convert",
    path: "/convert",
    icon: FileText,
    description: "Seamlessly convert between SRT, VTT, TXT, JSON, and DOCX formats while preserving cue timing.",
    category: "Subtitles & Formats",
    badge: "Engine 03",
    badgeType: "cyan",
    dockPriority: 3,
    accentBg: "bg-[#00d9ff]/15",
    accentText: "text-[#0088a8]",
    keywords: ["srt", "vtt", "subtitles", "captions", "json", "txt", "convert", "timing"],
  },
  {
    id: "process",
    name: "Text Intelligence & Summary",
    shortName: "Process",
    path: "/process",
    icon: Cpu,
    description: "Multi-language AI intelligence: summarize, translate in 90+ languages, extract key insights, and polish.",
    category: "AI & Intelligence",
    badge: "Engine 04",
    badgeType: "purple",
    dockPriority: 4,
    accentBg: "bg-purple-500/10",
    accentText: "text-purple-600",
    keywords: ["ai", "summary", "translate", "languages", "intelligence", "action items", "polish"],
  },
  {
    id: "video-translator",
    name: "AI Video Translator",
    shortName: "Video Translator",
    path: "/video-translator",
    icon: Globe2,
    description: "Translate audio, video, or YouTube speech into English and 90+ languages with fast AI accuracy.",
    category: "AI & Intelligence",
    badge: "Translator",
    badgeType: "orange",
    dockPriority: 5,
    accentBg: "bg-[#ff4d00]/10",
    accentText: "text-[#ff4d00]",
    keywords: ["translate", "video translator", "ai translator", "languages", "speech translation", "youtube translation"],
  },
  {
    id: "ai-subtitle-translator",
    name: "AI Subtitle Translator",
    shortName: "Subtitle Translator",
    path: "/ai-subtitle-translator",
    icon: FileCode2,
    description: "Translate SRT and VTT subtitle files with millisecond timecodes preserved intact.",
    category: "Subtitles & Formats",
    badge: "Subtitles",
    badgeType: "cyan",
    dockPriority: 6,
    accentBg: "bg-[#00d9ff]/15",
    accentText: "text-[#0088a8]",
    keywords: ["srt", "vtt", "subtitle translator", "translate srt", "translate vtt", "captions"],
  },
  {
    id: "youtube-video-summarizer",
    name: "YouTube Video Summarizer",
    shortName: "Summarizer",
    path: "/youtube-video-summarizer",
    icon: Sparkles,
    description: "Instant AI summaries, key takeaways, and chapter outlines from any public YouTube link.",
    category: "Video & YouTube",
    badge: "Summarizer",
    badgeType: "red",
    dockPriority: 7,
    accentBg: "bg-red-500/10",
    accentText: "text-red-600",
    keywords: ["youtube", "summarize", "video summary", "youtube to notes", "action items", "takeaways"],
  },
  {
    id: "tools",
    name: "Interactive Utilities & Pacer",
    shortName: "Utilities",
    path: "/tools",
    icon: Wand2,
    description: "Real-time client-side tools: Subtitle syntax validator, WPM speech pacer, and audio file size/bitrate estimator.",
    category: "Utilities",
    badge: "Utility Lab",
    badgeType: "emerald",
    dockPriority: 8,
    accentBg: "bg-emerald-500/10",
    accentText: "text-emerald-600",
    keywords: ["validator", "srt", "vtt", "wpm", "speech rate", "bitrate", "audio size", "calculator", "telemetry"],
  },
];

/**
 * Mobile Dock Strategy:
 * When more tools are added in the future, the primary items + 'Tools' drawer launcher
 * ensures the bottom bar never wraps, cuts off, or breaks on any screen width (320px+).
 */
export const MAX_MOBILE_DOCK_ITEMS = 3; // Home + top 3 tools + "More / Tools" button

export const getDockPrimaryTools = (): ToolItem[] => {
  return [...TOOLS_REGISTRY]
    .sort((a, b) => a.dockPriority - b.dockPriority)
    .slice(0, MAX_MOBILE_DOCK_ITEMS);
};

export const getAllTools = (): ToolItem[] => {
  return TOOLS_REGISTRY;
};

export const getToolsByCategory = () => {
  const categories: Record<string, ToolItem[]> = {};
  TOOLS_REGISTRY.forEach((tool) => {
    if (!categories[tool.category]) {
      categories[tool.category] = [];
    }
    categories[tool.category].push(tool);
  });
  return categories;
};
