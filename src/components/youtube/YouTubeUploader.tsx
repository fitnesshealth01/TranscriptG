import React, { useState } from "react";
import {
  Youtube,
  Search,
  Sparkles,
  Play,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Globe,
  SlidersHorizontal,
  UploadCloud,
  FileAudio,
  ArrowRight,
  RefreshCw,
} from "lucide-react";
import { YouTubeTranscriptData } from "../../types/youtube";

interface YouTubeUploaderProps {
  onTranscriptGenerated: (data: YouTubeTranscriptData) => void;
  isLoading: boolean;
  setIsLoading: (val: boolean) => void;
  error: string | null;
  setError: (val: string | null) => void;
}

const PRESET_VIDEOS = [
  {
    id: "UF8uR6Z6KLc",
    title: "Steve Jobs' Stanford Commencement Speech",
    channel: "Stanford University",
    duration: "15:04",
    tag: "Commencement",
    thumbnail: "https://img.youtube.com/vi/UF8uR6Z6KLc/hqdefault.jpg",
  },
  {
    id: "qp0HIF3SfI4",
    title: "Simon Sinek: How Great Leaders Inspire Action",
    channel: "TEDx Talks",
    duration: "18:04",
    tag: "TED Talk",
    thumbnail: "https://img.youtube.com/vi/qp0HIF3SfI4/hqdefault.jpg",
  },
  {
    id: "L_Guz73e6fw",
    title: "Sam Altman: OpenAI, GPT-5 & AGI Future",
    channel: "Lex Fridman Podcast",
    duration: "1:58:20",
    tag: "AI Podcast",
    thumbnail: "https://img.youtube.com/vi/L_Guz73e6fw/hqdefault.jpg",
  },
  {
    id: "Y16y8Gk8oYQ",
    title: "Marques Brownlee: The Future of Consumer Tech",
    channel: "MKBHD",
    duration: "14:12",
    tag: "Tech Review",
    thumbnail: "https://img.youtube.com/vi/Y16y8Gk8oYQ/hqdefault.jpg",
  },
];

export const YouTubeUploader: React.FC<YouTubeUploaderProps> = ({
  onTranscriptGenerated,
  isLoading,
  setIsLoading,
  error,
  setError,
}) => {
  const [urlInput, setUrlInput] = useState("");
  const [forceAiReconstruct, setForceAiReconstruct] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en");
  const [showOptions, setShowOptions] = useState(false);
  const [loadingStep, setLoadingStep] = useState<string>("");

  const handleGenerate = async (customUrl?: string) => {
    const targetUrl = (customUrl || urlInput).trim();
    if (!targetUrl) {
      setError("Please paste a YouTube video URL or select a preset sample.");
      return;
    }

    setError(null);
    setIsLoading(true);
    setLoadingStep("Inspecting YouTube video metadata & caption tracks...");

    try {
      // Step update timer for visual polish
      const timer1 = setTimeout(() => {
        setLoadingStep("Checking official and auto-generated subtitle tracks...");
      }, 1200);

      const timer2 = setTimeout(() => {
        setLoadingStep("Running AI Speech Intelligence & timestamp synchronization...");
      }, 2600);

      const response = await fetch("/api/youtube/transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: targetUrl,
          languageCode: selectedLang,
          forceAiReconstruct,
        }),
      });

      clearTimeout(timer1);
      clearTimeout(timer2);

      const json = await response.json();

      if (!response.ok || !json.success) {
        throw new Error(json.error || "Failed to generate YouTube transcript. Please verify the URL.");
      }

      onTranscriptGenerated(json.data);
    } catch (err: any) {
      console.error("YouTube error:", err);
      setError(err.message || "Failed to retrieve transcript. Check the YouTube link and try again.");
    } finally {
      setIsLoading(false);
      setLoadingStep("");
    }
  };

  const handlePresetSelect = (videoId: string) => {
    const url = `https://www.youtube.com/watch?v=${videoId}`;
    setUrlInput(url);
    handleGenerate(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Primary Input Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-xl relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Header & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-sm">
                <Youtube className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h2 className="text-lg font-black text-[#0d0f12] tracking-tight">
                  Paste Any YouTube Video or Shorts URL
                </h2>
                <p className="text-xs text-neutral-500">
                  Instant timestamps, speaker separation & guaranteed AI speech reconstruction
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                No Captions Fallback Active
              </span>
            </div>
          </div>

          {/* URL Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleGenerate();
            }}
            className="space-y-4"
          >
            <div className="relative flex flex-col sm:flex-row items-stretch gap-2">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-neutral-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=... or youtu.be/... or Shorts link"
                  className="w-full pl-11 pr-24 py-3.5 sm:py-4 rounded-2xl bg-neutral-50 border border-black/10 text-sm sm:text-base text-[#0d0f12] placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:bg-white transition-all font-mono"
                  disabled={isLoading}
                />
                {urlInput && (
                  <button
                    type="button"
                    onClick={() => setUrlInput("")}
                    className="absolute inset-y-0 right-3 flex items-center text-xs font-mono text-neutral-400 hover:text-neutral-700 px-2"
                  >
                    Clear
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading || !urlInput.trim()}
                className="px-7 py-3.5 sm:py-4 rounded-2xl bg-red-600 hover:bg-red-700 active:scale-98 disabled:opacity-50 text-white font-bold text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 shrink-0 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Generate Transcript</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Options Bar */}
            <div className="flex flex-wrap items-center justify-between text-xs text-neutral-600 pt-1 gap-3">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setShowOptions(!showOptions)}
                  className="flex items-center gap-1.5 font-medium text-neutral-600 hover:text-[#0d0f12] transition-colors"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Advanced Parameters</span>
                </button>

                <label className="flex items-center gap-2 cursor-pointer select-none text-neutral-600 hover:text-[#0d0f12]">
                  <input
                    type="checkbox"
                    checked={forceAiReconstruct}
                    onChange={(e) => setForceAiReconstruct(e.target.checked)}
                    className="rounded text-red-600 focus:ring-red-500 accent-red-600"
                  />
                  <span className="font-medium">Force AI Speech Model (Enhanced accuracy)</span>
                </label>
              </div>

              <div className="text-[11px] font-mono text-neutral-400">
                Supports regular videos, Shorts & unlisted URLs
              </div>
            </div>

            {/* Collapsible Options */}
            {showOptions && (
              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 space-y-3 transition-all">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="font-bold text-neutral-700 block mb-1.5">
                      Preferred Language Track
                    </label>
                    <select
                      value={selectedLang}
                      onChange={(e) => setSelectedLang(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-white border border-black/10 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="en">English (Default / Auto-detect)</option>
                      <option value="es">Spanish (Español)</option>
                      <option value="fr">French (Français)</option>
                      <option value="de">German (Deutsch)</option>
                      <option value="hi">Hindi (हिंदी)</option>
                      <option value="ja">Japanese (日本語)</option>
                      <option value="zh">Chinese (中文)</option>
                      <option value="pt">Portuguese (Português)</option>
                      <option value="ar">Arabic (العربية)</option>
                      <option value="ru">Russian (Русский)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-neutral-700 block mb-1.5">
                      No-Captions Mode Behavior
                    </label>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">
                      When a video has no native subtitles uploaded, TranscriptG automatically triggers Gemini Speech Intelligence to reconstruct spoken dialogue and chapter timestamps seamlessly.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </form>

          {/* Loading Animation Progress */}
          {isLoading && (
            <div className="p-5 rounded-2xl bg-neutral-900 text-white space-y-3 animate-fade-in">
              <div className="flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-red-400 font-bold">TRANSCRIPTG ENGINE RUNNING</span>
                </div>
                <span className="text-neutral-400">Processing media...</span>
              </div>

              <div className="w-full bg-neutral-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-amber-500 h-full w-2/3 animate-pulse rounded-full" />
              </div>

              <p className="text-xs text-neutral-300 font-mono">
                {loadingStep || "Extracting transcript and generating timestamps..."}
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-500" />
              <div className="space-y-1">
                <p className="font-bold">Transcription Error</p>
                <p>{error}</p>
                <p className="text-[11px] text-red-600/80">
                  Tip: Verify that the YouTube URL is public or try toggling "Force AI Speech Model".
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Preset Demo Videos Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-[0.15em] text-neutral-600">
              Or Try A Popular Sample Video (1-Click Test)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">
            Zero configuration required
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {PRESET_VIDEOS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset.id)}
              disabled={isLoading}
              className="p-3 rounded-2xl bg-white hover:bg-neutral-50/80 border border-black/8 hover:border-red-500/40 text-left transition-all group flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer disabled:opacity-50"
            >
              <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-2.5 bg-neutral-100 border border-black/5">
                <img
                  src={preset.thumbnail}
                  alt={preset.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>
                <div className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded-md bg-black/80 text-white text-[9px] font-mono font-bold">
                  {preset.duration}
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600 text-[9px] font-mono font-bold uppercase">
                    {preset.tag}
                  </span>
                </div>
                <p className="text-xs font-bold text-[#0d0f12] line-clamp-2 group-hover:text-red-600 transition-colors">
                  {preset.title}
                </p>
                <p className="text-[11px] text-neutral-500 truncate">
                  {preset.channel}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-black/5 flex items-center justify-between text-[10px] font-mono text-red-600 font-bold">
                <span>Load Transcript</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
