import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { SpectrumTrace } from "../components/SpectrumTrace";
import { SUPPORTED_LANGUAGES } from "../lib/transcript";
import {
  Mic,
  FileText,
  Cpu,
  ArrowRight,
  UploadCloud,
  Layers,
  Download,
  CheckCircle2,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  Zap,
  Globe2,
  FileCode2,
  Lock,
  Star,
} from "lucide-react";

export const Home: React.FC = () => {
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Is TranscriptG really 100% free with no hidden account fees?",
      a: "Yes. TranscriptG is built as a public-access linguistic platform. There are no paywalls, subscriptions, account signups, credit cards, or watermarks required.",
    },
    {
      q: "What export formats are supported?",
      a: "TranscriptG supports SRT (SubRip), VTT (Web Video Text Tracks), TXT (Plain text), JSON (Structured cues), PDF (Formatted report), DOCX (Word document), and Markdown (.md). All formats preserve timecodes and text fidelity losslessly.",
    },
    {
      q: "How is my privacy protected during processing?",
      a: "Privacy-first architecture: uploaded audio/video and text files are processed exclusively within your active browser session. Files are never retained on our servers, stored in databases, or used for model training.",
    },
    {
      q: "Which languages does TranscriptG support?",
      a: "TranscriptG supports 90+ spoken and written languages including English, Spanish, French, German, Mandarin Chinese, Japanese, Korean, Arabic, Hindi, Portuguese, Russian, and auto-language identification.",
    },
    {
      q: "Do I need to create an account or sign in?",
      a: "No account or login is required. You can start transcribing, converting, and processing text intelligence immediately upon visiting the site.",
    },
  ];

  return (
    <div className="space-y-24">
      <Seo
        title="TranscriptG — Free Precision Transcription & Text Intelligence Platform"
        description="Transcribe audio & video into subtitles, convert SRT/VTT/JSON, and run AI summaries in 90+ languages. No login, no watermark, 100% free and private."
      />

      {/* SECTION 1: HERO */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-grid-pattern border-b border-black/5">
        {/* Radial thermal backdrop */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ff4d00]/15 via-[#00d9ff]/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/10 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#ff4d00] animate-pulse" />
              <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-neutral-800">
                Precision Linguistic Engine
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#00d9ff]/20 text-[#0088a8] text-[10px] font-mono font-bold">
                No Login Required
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0d0f12] tracking-[-0.04em] leading-[1.05]">
              Transcribe, convert, and think in{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff4d00] to-amber-500">
                90+ languages
              </span>
            </h1>

            <p className="text-lg sm:text-2xl text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
              A public-access transcription laboratory that turns sound into knowledge. Zero signups, zero watermarks, session-private.
            </p>

            {/* Hero Spectrum Trace */}
            <div className="max-w-md mx-auto my-6 p-3 bg-white/80 rounded-2xl border border-black/10 shadow-sm">
              <SpectrumTrace active={true} barsCount={32} heightClass="h-10" accentColor="mixed" />
            </div>

            {/* Primary CTA */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/transcribe"
                className="px-8 py-4 rounded-2xl bg-[#ff4d00] hover:bg-[#e04400] text-white text-base font-black tracking-tight shadow-xl thermal-glow flex items-center gap-2 group transition-all duration-300 transform hover:scale-[1.02]"
              >
                <span>Start Transcribing</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/convert"
                className="px-8 py-4 rounded-2xl bg-white hover:bg-neutral-50 text-[#0d0f12] text-base font-bold tracking-tight border border-black/10 shadow-md flex items-center gap-2 transition-all duration-300"
              >
                <span>Format Converter</span>
              </Link>
            </div>
          </div>

          {/* 3 Engine Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
            {/* Engine 1 */}
            <Link
              to="/transcribe"
              className="glass-card glass-card-hover p-8 rounded-3xl border border-black/10 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#ff4d00]/10 flex items-center justify-center text-[#ff4d00] mb-6 group-hover:bg-[#ff4d00] group-hover:text-white transition-colors">
                  <Mic className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#ff4d00] font-bold">
                  Engine 01
                </span>
                <h2 className="text-2xl font-black text-[#0d0f12] mt-1 mb-2 tracking-tight">
                  Speech → Text
                </h2>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  High-precision audio/video transcription with automated cue timestamps and optional AI executive summary.
                </p>
              </div>
              <div className="mt-8 flex items-center text-xs font-mono font-bold text-[#ff4d00] gap-1 group-hover:translate-x-1 transition-transform">
                Open Engine <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Engine 2 */}
            <Link
              to="/convert"
              className="glass-card glass-card-hover p-8 rounded-3xl border border-black/10 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#00d9ff]/15 flex items-center justify-center text-[#0088a8] mb-6 group-hover:bg-[#00d9ff] group-hover:text-black transition-colors">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#0088a8] font-bold">
                  Engine 02
                </span>
                <h2 className="text-2xl font-black text-[#0d0f12] mt-1 mb-2 tracking-tight">
                  Subtitle Convert
                </h2>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Convert SRT, VTT, TXT, and JSON formats seamlessly while preserving exact cue timestamps and layout.
                </p>
              </div>
              <div className="mt-8 flex items-center text-xs font-mono font-bold text-[#0088a8] gap-1 group-hover:translate-x-1 transition-transform">
                Open Engine <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            {/* Engine 3 */}
            <Link
              to="/process"
              className="glass-card glass-card-hover p-8 rounded-3xl border border-black/10 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Cpu className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-purple-600 font-bold">
                  Engine 03
                </span>
                <h2 className="text-2xl font-black text-[#0d0f12] mt-1 mb-2 tracking-tight">
                  Text Intelligence
                </h2>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Run AI operations on transcripts: summarize, translate across 90+ languages, extract key points, and polish.
                </p>
              </div>
              <div className="mt-8 flex items-center text-xs font-mono font-bold text-purple-600 gap-1 group-hover:translate-x-1 transition-transform">
                Open Engine <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2: HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#ff4d00] font-bold">
            Workflow Logic
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0d0f12] tracking-tight mt-2">
            Three simple steps to mastery
          </h2>
          <p className="text-neutral-600 text-base mt-3">
            Designed for speed and privacy. No registration or software downloads required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="glass-card p-8 rounded-3xl border border-black/10 relative">
            <div className="w-10 h-10 rounded-2xl bg-[#0d0f12] text-white font-mono font-bold text-lg flex items-center justify-center mb-6">
              01
            </div>
            <h3 className="text-xl font-bold text-[#0d0f12] mb-2">Upload or Paste</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Drop any audio/video file up to 25MB (MP3, WAV, M4A, OGG, MP4, MOV) or paste raw SRT/VTT/TXT text into the dropzone.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-black/10 relative">
            <div className="w-10 h-10 rounded-2xl bg-[#ff4d00] text-white font-mono font-bold text-lg flex items-center justify-center mb-6 thermal-glow">
              02
            </div>
            <h3 className="text-xl font-bold text-[#0d0f12] mb-2">Instant Acoustic Processing</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Our high-precision linguistic pipeline analyzes speech frequencies and generates exact start/end timecode cues.
            </p>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-black/10 relative">
            <div className="w-10 h-10 rounded-2xl bg-[#00d9ff] text-black font-mono font-bold text-lg flex items-center justify-center mb-6 cyan-glow">
              03
            </div>
            <h3 className="text-xl font-bold text-[#0d0f12] mb-2">Export Losslessly</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">
              Download your formatted result as SRT, VTT, TXT, JSON, PDF, DOCX, or Markdown with a single click.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3: FORMAT UNIVERSE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 bg-gradient-to-br from-white via-white to-neutral-50">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#0088a8] font-bold">
                Compatibility Engine
              </span>
              <h2 className="text-3xl font-black text-[#0d0f12] tracking-tight mt-2 mb-4">
                Universal Format Universe
              </h2>
              <p className="text-neutral-600 text-sm leading-relaxed mb-6">
                Whether you need YouTube-ready SRT subtitles, HTML5 WEBVTT tracks, structured JSON data, or formatted PDF reports — TranscriptG handles them all losslessly.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#ff4d00]">
                <Sparkles className="w-4 h-4" /> 100% Timecode Accuracy
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: "SRT", desc: "SubRip Subtitle", type: "Output" },
                { name: "VTT", desc: "Web Video Text", type: "Output" },
                { name: "TXT", desc: "Plain Manuscript", type: "Output" },
                { name: "JSON", desc: "Structured Cues", type: "Output" },
                { name: "PDF", desc: "Print Document", type: "Output" },
                { name: "DOCX", desc: "Word Document", type: "Output" },
                { name: "MD", desc: "Markdown", type: "Output" },
                { name: "MP3/MP4", desc: "Media Inputs", type: "Input" },
              ].map((fmt) => (
                <div
                  key={fmt.name}
                  className="p-4 rounded-2xl bg-neutral-100/80 border border-neutral-200/80 text-left"
                >
                  <span className="text-[10px] font-mono text-[#ff4d00] font-bold uppercase">{fmt.type}</span>
                  <div className="text-lg font-black font-mono text-[#0d0f12] mt-0.5">{fmt.name}</div>
                  <div className="text-[11px] text-neutral-500 font-medium">{fmt.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: LANGUAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#ff4d00] font-bold">
            Global Coverage
          </span>
          <h2 className="text-3xl sm:text-5xl font-black text-[#0d0f12] tracking-tight mt-2">
            90+ Languages Supported
          </h2>
          <p className="text-neutral-600 text-sm mt-3">
            Automatic language detection across global dialects and scripts.
          </p>
        </div>

        <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10">
          <div className="flex flex-wrap gap-2 justify-center max-h-72 overflow-y-auto p-2">
            {SUPPORTED_LANGUAGES.filter((l) => l.code !== "auto").map((lang) => (
              <span
                key={lang.code}
                className="px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-[#ff4d00] hover:text-white border border-neutral-200 text-xs font-mono font-semibold text-neutral-700 transition-colors cursor-default"
              >
                {lang.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: TRUST & STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="glass-card p-8 rounded-3xl border border-black/10 text-center">
            <div className="text-4xl font-black text-[#ff4d00] font-mono mb-2">90+</div>
            <div className="text-sm font-bold text-[#0d0f12]">Languages & Dialects</div>
            <div className="text-xs text-neutral-500 mt-1">Global speech recognition models</div>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-black/10 text-center">
            <div className="text-4xl font-black text-[#00d9ff] font-mono mb-2">25MB</div>
            <div className="text-sm font-bold text-[#0d0f12]">Max Upload Capacity</div>
            <div className="text-xs text-neutral-500 mt-1">MP3, WAV, M4A, OGG, MP4, MOV</div>
          </div>

          <div className="glass-card p-8 rounded-3xl border border-black/10 text-center">
            <div className="text-4xl font-black text-emerald-500 font-mono mb-2">&lt;2s</div>
            <div className="text-sm font-bold text-[#0d0f12]">Average Response Time</div>
            <div className="text-xs text-neutral-500 mt-1">Ultra-fast acoustic processing</div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "TranscriptG converted 45 minutes of audio into an SRT subtitle file in seconds with zero errors in timestamp alignment.",
              author: "Elena Rostova",
              role: "Documentary Filmmaker",
            },
            {
              quote: "The no-login, session-private guarantee is essential for our legal research team. Fast, precise, and completely ad-free.",
              author: "Marcus Vance",
              role: "Senior Legal Analyst",
            },
            {
              quote: "Having SRT, VTT, and Markdown exports in one click saves our podcast production team hours every week.",
              author: "Sarah Jenkins",
              role: "Media Producer",
            },
          ].map((item, idx) => (
            <div key={idx} className="glass-card p-6 rounded-3xl border border-black/10 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex gap-1 text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-neutral-700 italic leading-relaxed">
                  "{item.quote}"
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-black/5">
                <div className="text-xs font-bold text-[#0d0f12]">{item.author}</div>
                <div className="text-[11px] text-neutral-500 font-mono">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: FAQ */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#ff4d00] font-bold">
            Knowledge Base
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0d0f12] tracking-tight mt-2">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-black/10 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bold text-[#0d0f12] text-base sm:text-lg hover:text-[#ff4d00] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#ff4d00]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 text-sm text-neutral-600 leading-relaxed border-t border-black/5 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 7: CLOSING CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="glass-card p-10 sm:p-16 rounded-3xl border border-black/10 text-center relative overflow-hidden bg-gradient-to-br from-[#0d0f12] to-[#1a1e24] text-white">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff4d00]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="px-3 py-1 rounded-full bg-white/10 text-[#00d9ff] text-xs font-mono font-bold uppercase tracking-widest border border-white/10">
              Instant Access
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Ready to transform your audio into actionable knowledge?
            </h2>
            <p className="text-neutral-300 text-base">
              No account, no signups, no watermarks. Experience precision transcription right now.
            </p>
            <div className="pt-2">
              <Link
                to="/transcribe"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#ff4d00] hover:bg-[#e04400] text-white font-black text-base thermal-glow transition-all duration-300 transform hover:scale-[1.02]"
              >
                <span>Launch Transcribe Engine</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
