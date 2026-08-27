import React, { useState, useRef, useMemo } from "react";
import {
  Youtube,
  Search,
  Copy,
  Check,
  Play,
  Clock,
  Sparkles,
  Layers,
  FileText,
  MessageSquare,
  Globe2,
  List,
  AlignLeft,
  Share2,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Quote,
  Send,
  Loader2,
  Languages,
} from "lucide-react";
import { YouTubeTranscriptData, YouTubeTranscriptSegment } from "../../types/youtube";
import { formatTime } from "../../lib/transcript";

interface YouTubeViewerProps {
  data: YouTubeTranscriptData;
  onReset: () => void;
}

type TabType = "transcript" | "summary" | "chapters" | "qa";
type ViewMode = "timestamped" | "paragraph";

const TRANSLATION_LANGUAGES = [
  { code: "original", label: "Original Language" },
  { code: "Spanish", label: "Spanish (Español)" },
  { code: "French", label: "French (Français)" },
  { code: "German", label: "German (Deutsch)" },
  { code: "Hindi", label: "Hindi (हिंदी)" },
  { code: "Japanese", label: "Japanese (日本語)" },
  { code: "Chinese", label: "Chinese (中文)" },
  { code: "Portuguese", label: "Portuguese (Português)" },
  { code: "Arabic", label: "Arabic (العربية)" },
  { code: "Italian", label: "Italian (Italiano)" },
  { code: "Korean", label: "Korean (한국어)" },
  { code: "Russian", label: "Russian (Русский)" },
  { code: "Dutch", label: "Dutch (Nederlands)" },
  { code: "Turkish", label: "Turkish (Türkçe)" },
  { code: "Vietnamese", label: "Vietnamese (Tiếng Việt)" },
  { code: "Indonesian", label: "Indonesian (Bahasa Indonesia)" },
  { code: "Polish", label: "Polish (Polski)" },
];

export const YouTubeViewer: React.FC<YouTubeViewerProps> = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState<TabType>("transcript");
  const [viewMode, setViewMode] = useState<ViewMode>("timestamped");
  const [searchQuery, setSearchQuery] = useState("");
  const [playerStartTime, setPlayerStartTime] = useState<number>(0);
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Q&A State
  const [qaMessages, setQaMessages] = useState<
    { role: "user" | "assistant"; content: string; time: string }[]
  >([
    {
      role: "assistant",
      content: `Hello! I've analyzed the transcript for "${data.metadata.title}". Ask me any question about key topics, quotes, timestamps, or specific arguments in this video!`,
      time: "Just now",
    },
  ]);
  const [qaInput, setQaInput] = useState("");
  const [isAsking, setIsAsking] = useState(false);

  // Inline Translation State & Cache
  const [selectedLanguage, setSelectedLanguage] = useState<string>("original");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationsCache, setTranslationsCache] = useState<
    Record<string, { segments: YouTubeTranscriptSegment[]; fullText: string }>
  >({});
  const [translationError, setTranslationError] = useState<string | null>(null);

  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Seek video player
  const handleSeek = (seconds: number) => {
    setPlayerStartTime(Math.floor(seconds));
  };

  // Active Segments & Full Text based on selected translation language
  const activeSegments = useMemo(() => {
    if (selectedLanguage !== "original" && translationsCache[selectedLanguage]) {
      return translationsCache[selectedLanguage].segments;
    }
    return data.segments;
  }, [selectedLanguage, translationsCache, data.segments]);

  const activeFullText = useMemo(() => {
    if (selectedLanguage !== "original" && translationsCache[selectedLanguage]) {
      return translationsCache[selectedLanguage].fullText;
    }
    return data.fullText;
  }, [selectedLanguage, translationsCache, data.fullText]);

  // Filtered segments for search
  const filteredSegments = useMemo(() => {
    if (!searchQuery.trim()) return activeSegments;
    const q = searchQuery.toLowerCase();
    return activeSegments.filter((s) => s.text.toLowerCase().includes(q));
  }, [activeSegments, searchQuery]);

  // Copy operations
  const handleCopyFull = (includeTimestamps: boolean = false) => {
    let textToCopy = "";
    if (includeTimestamps) {
      textToCopy = activeSegments
        .map((s) => `[${formatTime(s.start)}] ${s.speaker ? s.speaker + ": " : ""}${s.text}`)
        .join("\n");
    } else {
      textToCopy = activeFullText;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handleCopySegment = (seg: YouTubeTranscriptSegment, idx: number) => {
    navigator.clipboard.writeText(`[${formatTime(seg.start)}] ${seg.text}`);
    setCopiedId(idx);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Ask AI about video
  const handleSendQa = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qaInput.trim() || isAsking) return;

    const userQ = qaInput.trim();
    setQaInput("");
    setQaMessages((prev) => [
      ...prev,
      { role: "user", content: userQ, time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) },
    ]);
    setIsAsking(true);

    try {
      const res = await fetch("/api/youtube/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          videoTitle: data.metadata.title,
          authorName: data.metadata.authorName,
          transcriptText: activeFullText,
          question: userQ,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to get AI answer.");
      }

      setQaMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: json.answer,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch (err: any) {
      setQaMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${err.message || "Failed to process question. Please try again."}`,
          time: "Just now",
        },
      ]);
    } finally {
      setIsAsking(false);
    }
  };

  // Handle Translation Selection
  const handleLanguageChange = async (targetLang: string) => {
    setTranslationError(null);

    if (targetLang === "original") {
      setSelectedLanguage("original");
      return;
    }

    setSelectedLanguage(targetLang);

    // If already in cache, switch immediately
    if (translationsCache[targetLang]) {
      return;
    }

    // Call translation endpoint
    setIsTranslating(true);
    try {
      const res = await fetch("/api/youtube/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          segments: data.segments,
          targetLanguage: targetLang,
          fullText: data.fullText,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || "Failed to translate transcript.");
      }

      setTranslationsCache((prev) => ({
        ...prev,
        [targetLang]: {
          segments: json.data.segments || data.segments,
          fullText: json.data.fullText || data.fullText,
        },
      }));
    } catch (err: any) {
      console.error("Translation error:", err);
      setTranslationError(err.message || "Failed to translate transcript. Reverted to original.");
      setSelectedLanguage("original");
    } finally {
      setIsTranslating(false);
    }
  };

  const getSourceBadge = () => {
    if (data.source === "youtube_official_captions") {
      return (
        <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold">
          Official Creator Captions
        </span>
      );
    }
    if (data.source === "youtube_auto_captions") {
      return (
        <span className="px-2.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-[10px] font-mono font-bold">
          YouTube Auto Captions
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-[10px] font-mono font-bold flex items-center gap-1">
        <Sparkles className="w-3 h-3 text-red-600" />
        AI Speech Reconstruction (No Captions Available)
      </span>
    );
  };

  return (
    <div className="w-full space-y-6">
      {/* Top Header Information Card */}
      <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="relative aspect-video w-28 sm:w-36 rounded-xl overflow-hidden bg-neutral-100 shrink-0 border border-black/10">
            <img
              src={data.metadata.thumbnailUrl}
              alt={data.metadata.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <a
              href={data.metadata.url}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors flex items-center justify-center text-white"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              {getSourceBadge()}
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-mono font-bold">
                {data.languageDetected || "English"}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-600 text-[10px] font-mono">
                {data.wordCount.toLocaleString()} words
              </span>
            </div>

            <h1 className="text-lg sm:text-xl font-black text-[#0d0f12] tracking-tight line-clamp-2">
              {data.metadata.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
              <span>Channel: <strong className="text-neutral-800">{data.metadata.authorName}</strong></span>
              <span>•</span>
              <span>Segments: {data.segments.length}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 w-full md:w-auto justify-end">
          <button
            onClick={onReset}
            className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono font-bold transition-all cursor-pointer"
          >
            New Video
          </button>

          <button
            onClick={() => handleCopyFull(false)}
            className="px-4 py-2 rounded-xl bg-[#0d0f12] hover:bg-neutral-800 text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
          >
            {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedAll ? "Copied Plain Text!" : "Copy Full Text"}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: YouTube Video Player + Tabbed Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Embedded Synchronized YouTube Player */}
        <div className="lg:col-span-5 space-y-4 sticky top-20">
          <div className="rounded-2xl overflow-hidden bg-black aspect-video shadow-md border border-black/10">
            <iframe
              ref={iframeRef}
              src={`https://www.youtube-nocookie.com/embed/${data.metadata.videoId}?autoplay=0&start=${playerStartTime}&rel=0`}
              title={data.metadata.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          {/* Quick Player Controls & Info */}
          <div className="p-4 rounded-2xl bg-white border border-black/8 space-y-2 text-xs">
            <div className="flex items-center justify-between font-mono text-neutral-500">
              <span className="flex items-center gap-1 font-bold text-[#0d0f12]">
                <Play className="w-3 h-3 text-red-600 fill-current" />
                Live Seeking Sync
              </span>
              <span>Current Marker: {formatTime(playerStartTime)}</span>
            </div>
            <p className="text-neutral-500 text-[11px] leading-relaxed">
              Click any timestamp in the transcript to jump the video directly to that sentence.
            </p>
          </div>

          {/* AI Executive Summary Quick Card */}
          {data.aiGeneratedDetails?.summary && (
            <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500/5 to-red-500/5 border border-amber-500/20 space-y-2.5">
              <div className="flex items-center gap-2 text-amber-700 font-mono text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>EXECUTIVE SUMMARY</span>
              </div>
              <p className="text-xs text-neutral-700 leading-relaxed">
                {data.aiGeneratedDetails.summary}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Tabbed Content & Transcript Engine */}
        <div className="lg:col-span-7 space-y-4">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-neutral-100/80 border border-black/5 overflow-x-auto no-scrollbar text-xs font-mono">
            <button
              onClick={() => setActiveTab("transcript")}
              className={`px-3 py-2 rounded-xl transition-all font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === "transcript"
                  ? "bg-white text-red-600 shadow-sm"
                  : "text-neutral-600 hover:text-[#0d0f12]"
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Transcript ({filteredSegments.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("summary")}
              className={`px-3 py-2 rounded-xl transition-all font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === "summary"
                  ? "bg-white text-amber-600 shadow-sm"
                  : "text-neutral-600 hover:text-[#0d0f12]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Takeaways</span>
            </button>

            {data.aiGeneratedDetails?.chapters && data.aiGeneratedDetails.chapters.length > 0 && (
              <button
                onClick={() => setActiveTab("chapters")}
                className={`px-3 py-2 rounded-xl transition-all font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                  activeTab === "chapters"
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-neutral-600 hover:text-[#0d0f12]"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Chapters ({data.aiGeneratedDetails.chapters.length})</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab("qa")}
              className={`px-3 py-2 rounded-xl transition-all font-bold flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                activeTab === "qa"
                  ? "bg-white text-blue-600 shadow-sm"
                  : "text-neutral-600 hover:text-[#0d0f12]"
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Ask Video AI</span>
            </button>
          </div>

          {/* TAB 1: INTERACTIVE TRANSCRIPT */}
          {activeTab === "transcript" && (
            <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-sm space-y-4">
              {/* Search & View Mode + Translation Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-black/5">
                {/* Search Bar */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search keywords, names, timestamps..."
                    className="w-full pl-9 pr-8 py-2 rounded-xl bg-neutral-50 border border-black/10 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* View Mode Toggle: Timestamped vs Continuous */}
                  <div className="flex items-center gap-1 p-1 rounded-xl bg-neutral-100 text-neutral-600 text-xs font-mono">
                    <button
                      onClick={() => setViewMode("timestamped")}
                      className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                        viewMode === "timestamped" ? "bg-white font-bold text-[#0d0f12] shadow-xs" : "hover:text-[#0d0f12]"
                      }`}
                    >
                      <List className="w-3 h-3" />
                      <span>Timestamped</span>
                    </button>
                    <button
                      onClick={() => setViewMode("paragraph")}
                      className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                        viewMode === "paragraph" ? "bg-white font-bold text-[#0d0f12] shadow-xs" : "hover:text-[#0d0f12]"
                      }`}
                    >
                      <AlignLeft className="w-3 h-3" />
                      <span>Continuous</span>
                    </button>
                  </div>

                  {/* Inline Translation Tool (Placed directly next to Timestamped / Continuous) */}
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-neutral-100 border border-black/5 text-xs font-mono">
                    <div className="flex items-center gap-1 pl-2 text-neutral-500">
                      {isTranslating ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                      ) : (
                        <Globe2 className="w-3.5 h-3.5 text-emerald-600" />
                      )}
                    </div>

                    <select
                      value={selectedLanguage}
                      onChange={(e) => handleLanguageChange(e.target.value)}
                      disabled={isTranslating}
                      aria-label="Select translation language"
                      className="bg-transparent border-0 py-1 pr-2 text-xs font-mono font-bold text-[#0d0f12] focus:outline-none cursor-pointer disabled:opacity-50"
                    >
                      {TRANSLATION_LANGUAGES.map((opt) => (
                        <option key={opt.code} value={opt.code}>
                          {opt.code === "original" ? `Original (${data.languageDetected || "Detected"})` : opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopyFull(viewMode === "timestamped")}
                    className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{viewMode === "timestamped" ? "Copy with Timestamps" : "Copy Plain"}</span>
                  </button>
                </div>
              </div>

              {/* Translation Status Alert / Revert Banner */}
              {selectedLanguage !== "original" && (
                <div className="px-3.5 py-2 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-emerald-800">
                  <div className="flex items-center gap-2">
                    <Languages className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>
                      Translated into <strong>{selectedLanguage}</strong> with AI-synchronized timestamps
                    </span>
                  </div>
                  <button
                    onClick={() => handleLanguageChange("original")}
                    className="underline hover:text-emerald-950 font-bold cursor-pointer"
                  >
                    Revert to Original
                  </button>
                </div>
              )}

              {/* Translation Error Banner */}
              {translationError && (
                <div className="px-3.5 py-2 rounded-2xl bg-red-50 border border-red-200 text-xs font-mono text-red-700">
                  {translationError}
                </div>
              )}

              {/* Match Counter */}
              {searchQuery && (
                <div className="text-xs font-mono text-neutral-500 flex items-center justify-between">
                  <span>Found <strong>{filteredSegments.length}</strong> matching segments</span>
                </div>
              )}

              {/* Transcript Display */}
              <div className="max-h-[600px] overflow-y-auto pr-1 space-y-2 select-text">
                {viewMode === "timestamped" ? (
                  <div className="space-y-2">
                    {filteredSegments.map((seg, idx) => {
                      const isHighlighted = searchQuery && seg.text.toLowerCase().includes(searchQuery.toLowerCase());
                      return (
                        <div
                          key={idx}
                          className={`p-3 rounded-2xl border transition-all flex items-start gap-3 group ${
                            isHighlighted
                              ? "bg-amber-50/70 border-amber-300"
                              : "bg-neutral-50/60 hover:bg-neutral-50 border-black/5 hover:border-black/15"
                          }`}
                        >
                          {/* Seek Button / Timestamp */}
                          <button
                            onClick={() => handleSeek(seg.start)}
                            className="px-2.5 py-1 rounded-lg bg-red-50 hover:bg-red-600 hover:text-white text-red-600 font-mono text-xs font-bold transition-colors shrink-0 flex items-center gap-1 cursor-pointer"
                            title="Click to jump video to this moment"
                          >
                            <Play className="w-2.5 h-2.5 fill-current" />
                            <span>{formatTime(seg.start)}</span>
                          </button>

                          {/* Spoken Text */}
                          <div className="flex-1 min-w-0">
                            {seg.speaker && (
                              <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider block mb-0.5">
                                {seg.speaker}
                              </span>
                            )}
                            <p className="text-xs sm:text-sm text-[#0d0f12] leading-relaxed">
                              {seg.text}
                            </p>
                          </div>

                          {/* Quick Copy Action */}
                          <button
                            onClick={() => handleCopySegment(seg, idx)}
                            className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-neutral-400 hover:text-[#0d0f12] hover:bg-white transition-all shrink-0 cursor-pointer"
                            title="Copy this sentence"
                          >
                            {copiedId === idx ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* Continuous Paragraph Mode */
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 text-sm text-[#0d0f12] leading-relaxed space-y-4">
                    <p className="whitespace-pre-wrap">{activeFullText}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: AI TAKEAWAYS & SUMMARY */}
          {activeTab === "summary" && (
            <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-sm space-y-6">
              <div className="flex items-center gap-2 text-amber-600 font-mono text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Executive Synthesis & Core Insights</span>
              </div>

              {data.aiGeneratedDetails?.summary && (
                <div className="p-5 rounded-2xl bg-amber-50/50 border border-amber-200/60 space-y-2">
                  <h3 className="text-xs font-mono uppercase font-bold text-amber-900 tracking-wider">
                    Executive Thesis
                  </h3>
                  <p className="text-sm text-neutral-800 leading-relaxed">
                    {data.aiGeneratedDetails.summary}
                  </p>
                </div>
              )}

              {data.aiGeneratedDetails?.keyTakeaways && data.aiGeneratedDetails.keyTakeaways.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-mono uppercase font-bold text-neutral-500 tracking-wider">
                    Key Takeaways & Findings
                  </h3>
                  <div className="grid grid-cols-1 gap-2.5">
                    {data.aiGeneratedDetails.keyTakeaways.map((point, i) => (
                      <div
                        key={i}
                        className="p-3.5 rounded-2xl bg-neutral-50 border border-black/5 flex items-start gap-3"
                      >
                        <span className="w-6 h-6 rounded-xl bg-amber-500/10 text-amber-700 text-xs font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-[#0d0f12] leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: CHAPTERS & TIMELINE */}
          {activeTab === "chapters" && data.aiGeneratedDetails?.chapters && (
            <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-purple-600 font-mono text-xs font-bold uppercase tracking-wider">
                <Layers className="w-4 h-4" />
                <span>Video Chapters & Structural Mindmap</span>
              </div>

              <div className="space-y-3">
                {data.aiGeneratedDetails.chapters.map((ch, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSeek(ch.startTime)}
                    className="p-4 rounded-2xl bg-neutral-50 hover:bg-purple-50/50 border border-black/5 hover:border-purple-300 transition-all flex items-start justify-between gap-4 group cursor-pointer"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-purple-100 text-purple-700 font-mono text-xs font-bold">
                          {formatTime(ch.startTime)}
                        </span>
                        <h4 className="text-sm font-bold text-[#0d0f12] group-hover:text-purple-700 transition-colors">
                          {ch.title}
                        </h4>
                      </div>
                      {ch.summary && (
                        <p className="text-xs text-neutral-600 leading-relaxed pl-1">
                          {ch.summary}
                        </p>
                      )}
                    </div>

                    <div className="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-xs font-mono font-bold shrink-0 mt-1">
                      <span>Jump</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: ASK VIDEO AI (Q&A) */}
          {activeTab === "qa" && (
            <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-blue-600 font-mono text-xs font-bold uppercase tracking-wider">
                  <MessageSquare className="w-4 h-4" />
                  <span>Ask Video AI Assistant</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">
                  Grounded in video transcript
                </span>
              </div>

              {/* Chat Thread */}
              <div className="max-h-[400px] overflow-y-auto space-y-3 p-3 rounded-2xl bg-neutral-50 border border-black/5">
                {qaMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[88%] ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white ml-auto rounded-br-xs"
                        : "bg-white border border-black/10 text-neutral-800 mr-auto rounded-bl-xs shadow-xs"
                    }`}
                  >
                    <div className="text-[10px] opacity-70 font-mono mb-1">
                      {msg.role === "user" ? "You" : "TranscriptG AI"} • {msg.time}
                    </div>
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                ))}
                {isAsking && (
                  <div className="p-3.5 rounded-2xl bg-white border border-black/10 text-neutral-600 mr-auto flex items-center gap-2 text-xs font-mono">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
                    <span>Analyzing transcript dialogue...</span>
                  </div>
                )}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendQa} className="flex gap-2">
                <input
                  type="text"
                  value={qaInput}
                  onChange={(e) => setQaInput(e.target.value)}
                  placeholder="e.g., What was said about pricing? What is the main thesis?"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-50 border border-black/10 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white font-mono"
                  disabled={isAsking}
                />
                <button
                  type="submit"
                  disabled={isAsking || !qaInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Ask</span>
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
