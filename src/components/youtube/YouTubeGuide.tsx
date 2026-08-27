import React, { useState } from "react";
import {
  Youtube,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Zap,
  Globe2,
  FileCode2,
  FileText,
  Clock,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

export const YouTubeGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const FAQS = [
    {
      q: "How does TranscriptG transcribe YouTube videos when no captions are available?",
      a: "When a creator has disabled subtitles or when YouTube fails to generate automatic closed captions (ASR), TranscriptG's backend activates Gemini AI Multimodal Speech Intelligence. The model analyzes the video's title, narration structure, dialogue clues, and audio cues to perform an authentic, chronological spoken reconstruction complete with timestamps, summaries, and chapter markers.",
    },
    {
      q: "Does this work with YouTube Shorts, unlisted videos, and podcasts?",
      a: "Yes! TranscriptG supports standard YouTube videos (`youtube.com/watch?v=...`), mobile links (`youtu.be/...`), YouTube Shorts (`youtube.com/shorts/...`), and embedded URLs. As long as the video is public or unlisted, the engine can extract or synthesize its transcript.",
    },
    {
      q: "Can I jump the video player by clicking timestamps in the transcript?",
      a: "Yes! The embedded video player is fully synchronized. Clicking any timestamp button (e.g., [02:15]) will immediately seek the video to that exact second.",
    },
    {
      q: "Which subtitle and document formats can I export?",
      a: "You can download studio-grade SubRip (.SRT) and WebVTT (.VTT) subtitle files for video editing software (Premiere Pro, DaVinci Resolve, Final Cut Pro), clean Plain Text (.TXT), Markdown (.MD) for Notion and Obsidian, structured JSON data, and formatted PDF summaries.",
    },
    {
      q: "Is there any sign-up, subscription, or watermark required?",
      a: "Zero signups, zero subscriptions, and zero watermarks. TranscriptG is an open-access transcription laboratory that runs instantly in your browser session with zero data retention.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 pt-8">
      {/* 3-Pillar Architectural Breakdown */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0d0f12] tracking-tight">
          How TranscriptG's YouTube Speech Lab Works
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Combining YouTube native timedtext extraction with multi-model AI speech intelligence for 100% reliable transcript generation.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1 */}
        <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold font-mono">
            01
          </div>
          <h3 className="text-base font-bold text-[#0d0f12]">
            Native Track Extraction
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Instantly scrapes official human-translated caption tracks and YouTube auto-generated speech recognition (ASR) streams without latency.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold font-mono">
            02
          </div>
          <h3 className="text-base font-bold text-[#0d0f12]">
            No-Captions AI Fallback
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            If the video has zero captions uploaded, Gemini AI reconstructs spoken dialogue, scene narration, and speaker turns chronologically.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold font-mono">
            03
          </div>
          <h3 className="text-base font-bold text-[#0d0f12]">
            Intelligence & Export Suite
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Extract executive summaries, query the video with conversational Q&A, translate into 90+ languages, and export to SRT, VTT, and Markdown.
          </p>
        </div>
      </div>

      {/* Practical Use Cases Grid */}
      <div className="p-8 rounded-3xl bg-[#0d0f12] text-white relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-red-400 font-bold">
            Creator & Researcher Workflows
          </span>
          <h3 className="text-2xl font-black tracking-tight">
            Turn Any YouTube Video Into High-Yield Knowledge
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <Clock className="w-5 h-5 text-red-400" />
            <h4 className="text-sm font-bold">Skip Long Video Fluff</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Skim 2-hour podcasts and university lectures in 90 seconds using AI executive summaries and chapter highlights.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <FileCode2 className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-bold">Video Repurposing</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Export timestamped SRT/VTT subtitles to burn into TikToks, Instagram Reels, and YouTube Shorts in Premiere or CapCut.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <Globe2 className="w-5 h-5 text-cyan-400" />
            <h4 className="text-sm font-bold">Global Multilingual Reach</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Translate foreign interviews, Japanese anime clips, or Spanish documentaries into English or 90+ other tongues with 1 click.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <h4 className="text-sm font-bold">Study & Note-Taking</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Copy clean Markdown formatting straight into Notion, Obsidian, or Google Docs with clickable timestamps.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-black text-[#0d0f12] tracking-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-neutral-500 font-mono">
            Everything you need to know about YouTube transcript generation
          </p>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-black/8 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0d0f12] hover:text-red-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-red-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-black/5 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
