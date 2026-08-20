import React, { useState } from "react";
import {
  HelpCircle,
  Sparkles,
  Zap,
  ShieldCheck,
  FileText,
  Video,
  Mic,
  Clock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Cpu,
  Globe,
  Download,
  BookOpen,
  Target,
  ArrowRight,
  Layers,
  Search,
} from "lucide-react";

export const TranscribeGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "Is my audio or video file saved or used for training AI models?",
      a: "No, absolutely not. TranscriptG operates under a strict Zero-Retention Privacy Policy. Your uploaded audio and video files are processed in ephemeral memory during your active browser session and immediately discarded from the server memory once transcription completes. We do not store, archive, sell, or use your private recordings for AI training.",
    },
    {
      q: "What file formats and sizes are supported by Engine 01?",
      a: "Engine 01 supports all major audio and video container formats, including MP3, WAV, M4A, MP4, MOV, OGG, FLAC, WEBM, and AAC. You can upload files up to 25MB directly through your browser without registering an account.",
    },
    {
      q: "How accurate is the AI transcription engine?",
      a: "TranscriptG leverages modern neural whisper and multi-stage acoustic processing models that achieve up to 99.2% word accuracy on clear studio recordings, webinars, and interviews. It automatically handles accents, domain terminology, technical jargon, and background acoustic noise.",
    },
    {
      q: "Can I generate subtitles for YouTube, Premiere Pro, or Final Cut Pro?",
      a: "Yes! TranscriptG generates precise millisecond-level timecodes for every sentence segment. You can export your transcripts in standard closed-caption formats including SubRip (.SRT) and WebVTT (.VTT), as well as formatted documents like PDF, Microsoft Word (.DOCX), Markdown (.MD), and Plain Text (.TXT).",
    },
    {
      q: "How fast is the transcription process?",
      a: "Engine 01 is optimized for sub-second processing speed. A 10-minute audio file is typically transcribed, aligned, and summarized in less than 5 to 10 seconds thanks to server-side parallel batch processing.",
    },
    {
      q: "Does TranscriptG support multi-lingual audio transcription?",
      a: "Yes. Engine 01 features automatic language detection supporting over 90 world languages including English, Spanish, French, German, Mandarin, Japanese, Portuguese, Hindi, Arabic, Italian, and Dutch.",
    },
  ];

  return (
    <section className="mt-16 pt-12 border-t border-black/10 text-[#0d0f12] space-y-12">
      {/* HEADER BANNER */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 bg-gradient-to-br from-white via-neutral-50 to-amber-50/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4d00]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] font-mono text-xs font-bold uppercase tracking-widest border border-[#ff4d00]/20">
            <BookOpen className="w-3.5 h-3.5" /> Comprehensive User Guide & Documentation
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0d0f12] tracking-tight leading-tight">
            Understanding Engine 01: AI Speech-to-Text & Subtitle Transcription
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            Welcome to the ultimate guide for <strong>TranscriptG Engine 01</strong>. Discover how our browser-native neural speech recognition model transforms raw audio recordings and video broadcasts into searchable, timecoded manuscripts and actionable executive summaries in seconds.
          </p>
        </div>
      </div>

      {/* 2-COLUMN OVERVIEW & FEATURES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-black/10 space-y-4 bg-white">
            <h3 className="text-xl font-black text-[#0d0f12] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#ff4d00]" /> What is TranscriptG Engine 01?
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              <strong>TranscriptG Engine 01</strong> is a state-of-the-art, privacy-first audio and video transcription platform powered by deep neural acoustic modeling. Traditional transcription services rely on expensive human typists or legacy voice-recognition software that suffers from poor accuracy, slow turnaround times, and strict paywalls.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Engine 01 bridges the gap between raw acoustic signals and human-readable text manuscripts. By processing high-density audio streams through advanced attention-based neural architectures, Engine 01 converts speech into precise, timestamped cues with context-aware punctuation, capitalization, and paragraph segmentation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 space-y-1">
                <div className="text-xs font-mono font-bold text-[#ff4d00]">Zero Registration</div>
                <p className="text-xs text-neutral-600">No account creation, email verification, or credit card required.</p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 space-y-1">
                <div className="text-xs font-mono font-bold text-[#00d9ff]">Sub-Second Speed</div>
                <p className="text-xs text-neutral-600">Converts full-length recordings faster than real-time playback.</p>
              </div>
            </div>
          </div>

          {/* STEP BY STEP GUIDE */}
          <div className="glass-card p-8 rounded-3xl border border-black/10 space-y-6 bg-white">
            <h3 className="text-xl font-black text-[#0d0f12] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#ff4d00]" /> Step-by-Step Guide: How to Transcribe Media
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#ff4d00] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
                  01
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-[#0d0f12]">Upload or Drop Your Media File</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Click the dropzone above or drag and drop any audio or video file (MP3, WAV, M4A, MP4, MOV, AAC, OGG up to 25MB). You can also click <em>"Load Sample Audio"</em> to test the transcription engine instantly without uploading your own file.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#0d0f12] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
                  02
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-[#0d0f12]">Configure AI Options</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Toggle the <strong>"Generate Executive Summary"</strong> switch if you want the neural engine to construct a bulleted overview, key decision list, and main takeaways alongside the verbatim transcript.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#ff4d00] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
                  03
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-[#0d0f12]">Instant Neural Processing</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Click <strong>"Start AI Transcription"</strong>. Engine 01 ingests the binary buffer, performs noise filtering, detects the primary spoken language, aligns timestamp boundaries, and generates structured timecoded segments.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#0d0f12] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
                  04
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-[#0d0f12]">Review, Search, Edit & Export</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Use the interactive Manuscript Editor to search text cues, edit sentences directly, adjust speaker cues, and export in 1-click to <strong>SRT, VTT, PDF, DOCX, Markdown, or Plain Text</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR BENEFIT CARDS */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-black/10 space-y-4 bg-gradient-to-br from-neutral-900 to-[#0d0f12] text-white">
            <h4 className="text-base font-bold flex items-center gap-2 text-[#00d9ff]">
              <ShieldCheck className="w-5 h-5 text-[#00d9ff]" /> Privacy First Infrastructure
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Your audio files remain confidential. Data is streamed securely in encrypted memory buffers and erased immediately upon processing completion.
            </p>
            <ul className="space-y-2 text-xs text-neutral-300 font-mono">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Ephemeral Buffer Processing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Zero File Disk Logging
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> No AI Model Training
              </li>
            </ul>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-black/10 space-y-4 bg-white">
            <h4 className="text-base font-bold text-[#0d0f12] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#ff4d00]" /> Supported Export Formats
            </h4>
            <div className="space-y-2 text-xs text-neutral-600">
              <div className="flex justify-between p-2 rounded-xl bg-neutral-50 font-mono">
                <span className="font-bold text-[#0d0f12]">SubRip (.SRT)</span>
                <span className="text-neutral-400">Video Subtitles</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-neutral-50 font-mono">
                <span className="font-bold text-[#0d0f12]">WebVTT (.VTT)</span>
                <span className="text-neutral-400">Web Video Captions</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-neutral-50 font-mono">
                <span className="font-bold text-[#0d0f12]">PDF Document</span>
                <span className="text-neutral-400">Print & Archive</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-neutral-50 font-mono">
                <span className="font-bold text-[#0d0f12]">MS Word (.DOCX)</span>
                <span className="text-neutral-400">Editable Documents</span>
              </div>
              <div className="flex justify-between p-2 rounded-xl bg-neutral-50 font-mono">
                <span className="font-bold text-[#0d0f12]">Markdown (.MD)</span>
                <span className="text-neutral-400">Notion & Obsidian</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* USE CASES SECTION */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h3 className="text-2xl font-black text-[#0d0f12] tracking-tight">
            Why Professionals & Teams Rely on Engine 01
          </h3>
          <p className="text-xs text-neutral-500 font-mono uppercase tracking-wider">
            Tailored solutions across diverse industries & workflows
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-3xl border border-black/10 bg-white space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Video className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#0d0f12]">Content Creators & Editors</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Instantly create subtitle captions for YouTube videos, TikTok clips, Instagram Reels, and podcasts. Boost audience retention and viewer accessibility across social media platforms.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-black/10 bg-white space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#0d0f12]">Executives & Remote Teams</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Convert Zoom, Microsoft Teams, and Google Meet recordings into concise meeting minutes, decision logs, and key action items with AI summaries.
            </p>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-black/10 bg-white space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Search className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-base text-[#0d0f12]">Journalists & Researchers</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Transcribe long audio interviews, press conferences, lectures, and qualitative research interviews into fully searchable, editable text manuscripts.
            </p>
          </div>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 bg-white space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#ff4d00]/10 text-[#ff4d00] flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#0d0f12]">Frequently Asked Questions</h3>
            <p className="text-xs text-neutral-500 font-mono">Everything you need to know about Engine 01 transcription</p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-black/10 rounded-2xl overflow-hidden transition-all bg-neutral-50/50"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-[#0d0f12] hover:bg-neutral-100/50 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#ff4d00] shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0 ml-2" />
                )}
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-black/5 pt-3 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* BEST PRACTICES */}
      <div className="glass-card p-8 rounded-3xl border border-black/10 bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent space-y-4">
        <h4 className="text-base font-bold text-[#0d0f12] flex items-center gap-2">
          <Target className="w-5 h-5 text-[#ff4d00]" /> Pro Tips for Maximum Transcription Precision
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-neutral-700">
          <div className="p-3 bg-white rounded-2xl border border-black/5">
            <strong>1. Clear Microphone Distance:</strong> Keep speakers 6–12 inches from the microphone to eliminate reverb and echo.
          </div>
          <div className="p-3 bg-white rounded-2xl border border-black/5">
            <strong>2. Minimize Background Music:</strong> Lower background instrumentation to prevent track masking during speech cues.
          </div>
          <div className="p-3 bg-white rounded-2xl border border-black/5">
            <strong>3. Standard Formats:</strong> Use native 16-bit 44.1kHz WAV or high-bitrate MP3 for maximum acoustic detail.
          </div>
        </div>
      </div>
    </section>
  );
};
