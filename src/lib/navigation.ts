import { LucideIcon, Mic, FileText, Cpu, GraduationCap, Youtube, Home, Sparkles, Wand2, Layers, Music, FileCode2, Search } from "lucide-react";

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
    badge: "Popular",
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
    description: "Instant YouTube transcript with timestamps, chapter summaries, Q&A, and AI speech reconstruction when NO captions exist.",
    category: "Video & YouTube",
    badge: "New AI",
    badgeType: "red",
    dockPriority: 2,
    accentBg: "bg-red-500/10",
    accentText: "text-red-600",
    keywords: ["youtube", "video", "shorts", "captions", "subtitles", "timestamps", "summary", "youtube to text", "no captions"],
  },
  {
    id: "parchment",
    name: "Parchment Transcript Engine",
    shortName: "Parchment",
    path: "/parchment-transcript",
    icon: GraduationCap,
    description: "Parse registrar PDFs, audit courses, compute 4.0/5.0/AMCAS GPAs, and simulate graduation milestones.",
    category: "Academic & Documents",
    badge: "Elite",
    badgeType: "amber",
    dockPriority: 3,
    accentBg: "bg-amber-500/10",
    accentText: "text-amber-600",
    keywords: ["gpa", "parchment", "transcript", "grades", "university", "college", "academic", "amcas", "pdf", "courses"],
  },
  {
    id: "convert",
    name: "Subtitle & Format Converter",
    shortName: "Convert",
    path: "/convert",
    icon: FileText,
    description: "Seamlessly convert between SRT, VTT, TXT, JSON, and DOCX formats while preserving cue timing.",
    category: "Subtitles & Formats",
    dockPriority: 4,
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
    badge: "AI 3.7",
    badgeType: "purple",
    dockPriority: 5,
    accentBg: "bg-purple-500/10",
    accentText: "text-purple-600",
    keywords: ["ai", "summary", "translate", "languages", "intelligence", "action items", "polish"],
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
