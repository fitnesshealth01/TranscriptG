import React, { useState } from "react";
import {
  HelpCircle,
  FileCode2,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Globe,
  BookOpen,
  ArrowRight,
  Layers,
  Sparkles,
  RefreshCw,
  FileText,
  Clock,
} from "lucide-react";

export const ConvertGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What is the primary difference between SRT and WebVTT subtitle formats?",
      a: "SubRip (.SRT) uses comas as millisecond separators (e.g. 00:01:20,500) and is widely used for offline media players, YouTube uploads, and video editing software. WebVTT (.VTT) is the modern web standard defined by W3C that uses dots for milliseconds (e.g. 00:01:20.500), supports cue positioning metadata, and is required for HTML5 <track> video players.",
    },
    {
      q: "Will converting my subtitle file cause audio or video sync issues?",
      a: "No. TranscriptG Engine 02 preserves exact millisecond timecodes during conversion. Whether converting SRT to VTT or vice versa, cue start times, end times, and duration ratios remain 100% synchronized with your video timeline.",
    },
    {
      q: "Can I convert video captions (SRT/VTT) into a readable document or transcript?",
      a: "Yes! Engine 02 automatically parses individual subtitle cues and allows you to export them as plain paragraph text (.TXT), formatted Microsoft Word documents (.DOCX), clean PDF files, or Markdown (.MD) with all timestamp clutter removed.",
    },
    {
      q: "What happens if my source subtitle file contains syntax or formatting errors?",
      a: "Engine 02 includes an active fault-tolerant parsing engine. It automatically repairs missing cue numbers, malformed timestamp delimiters, trailing spaces, and unclosed HTML styling tags during ingestion.",
    },
    {
      q: "Is there a file size limit or cost for using the Subtitle Converter?",
      a: "No. Subtitle format conversion in TranscriptG is 100% free with unlimited usage. You can paste raw text or upload subtitle files directly from your browser with zero registration required.",
    },
    {
      q: "How do I convert subtitles into structured JSON for web applications?",
      a: "Simply paste or upload your SRT or VTT file on the left panel, and select JSON as your export format. Engine 02 outputs a structured JSON array containing cue IDs, start seconds, end seconds, formatted timestamps, and text content.",
    },
  ];

  return (
    <section className="mt-16 pt-12 border-t border-black/10 text-[#0d0f12] space-y-12">
      {/* HEADER BANNER */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 bg-gradient-to-br from-white via-neutral-50 to-orange-50/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ff4d00]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] font-mono text-xs font-bold uppercase tracking-widest border border-[#ff4d00]/20">
            <BookOpen className="w-3.5 h-3.5" /> Subtitle Engine 02 Guide
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0d0f12] tracking-tight leading-tight">
            Lossless Subtitle & Closed Caption Format Converter
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            Welcome to the complete reference guide for <strong>TranscriptG Engine 02</strong>. Learn how to convert, repair, align, and re-export SRT, WebVTT, JSON, and plain text captions losslessly across platforms and video players.
          </p>
        </div>
      </div>

      {/* 2-COLUMN OVERVIEW & FEATURES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-black/10 space-y-4 bg-white">
            <h3 className="text-xl font-black text-[#0d0f12] flex items-center gap-2">
              <FileCode2 className="w-5 h-5 text-[#ff4d00]" /> Understanding Subtitle Syntax & Engine 02
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Closed captions and video subtitles exist in multiple competing file formats depending on the target distribution platform. Video editors using Adobe Premiere, Final Cut Pro, or DaVinci Resolve frequently output <strong>SubRip (.SRT)</strong>, whereas modern web applications and HTML5 video players mandate <strong>WebVTT (.VTT)</strong>.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              <strong>TranscriptG Engine 02</strong> solves cross-platform subtitle incompatibility by performing client-side AST (Abstract Syntax Tree) parsing on subtitle streams. It extracts timecode boundaries, normalizes sequence numbering, strips or converts markup tags, and re-encodes cues into your target format instantly.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 space-y-1">
                <div className="text-xs font-mono font-bold text-[#ff4d00]">Millisecond Precision</div>
                <p className="text-xs text-neutral-600">Preserves exact frame timing and cue duration without drift.</p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 space-y-1">
                <div className="text-xs font-mono font-bold text-[#00d9ff]">AST Fault Tolerance</div>
                <p className="text-xs text-neutral-600">Auto-corrects malformed timecodes and broken line breaks.</p>
              </div>
            </div>
          </div>

          {/* STEP BY STEP GUIDE */}
          <div className="glass-card p-8 rounded-3xl border border-black/10 space-y-6 bg-white">
            <h3 className="text-xl font-black text-[#0d0f12] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#ff4d00]" /> How to Convert Subtitles in 4 Steps
            </h3>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#ff4d00] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
                  01
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-[#0d0f12]">Input Source Subtitles</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Paste raw subtitle text directly into the source editor or click <strong>"Upload Subtitle File"</strong> to load an existing .srt, .vtt, .json, or .txt file from your computer. You can also click <em>"Load Sample Subtitle"</em> to test.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#0d0f12] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
                  02
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-[#0d0f12]">Automated Format Detection</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Engine 02 immediately inspects the syntax header, timestamp delimiters (<code className="font-mono text-[#ff4d00]">{"-->"}</code>), sequence blocks, and WebVTT headers to automatically identify your input format with 100% accuracy.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#ff4d00] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
                  03
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-[#0d0f12]">Interactive Cue Inspection</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    View individual timecoded cues on the right panel. Inspect start times, end times, duration lengths, and sentence boundaries in real-time.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl bg-[#0d0f12] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
                  04
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-base text-[#0d0f12]">Export Target Format</h4>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    Select your desired target export format (SRT, VTT, PDF, DOCX, Markdown, or Plain Text) and download your newly formatted file instantly with 1-click.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR FORMAT MATRIX */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-black/10 space-y-4 bg-white">
            <h4 className="text-base font-bold text-[#0d0f12] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#ff4d00]" /> Supported Subtitle Formats
            </h4>
            <div className="space-y-3 text-xs text-neutral-600">
              <div className="p-3 rounded-2xl bg-neutral-50 border border-black/5 space-y-1">
                <div className="flex justify-between font-bold text-[#0d0f12]">
                  <span>SubRip (.SRT)</span>
                  <span className="text-[#ff4d00] font-mono">Standard</span>
                </div>
                <p className="text-[11px] text-neutral-500">Universal video format using sequence numbers and comas for timecodes.</p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-50 border border-black/5 space-y-1">
                <div className="flex justify-between font-bold text-[#0d0f12]">
                  <span>WebVTT (.VTT)</span>
                  <span className="text-[#00d9ff] font-mono">Web Native</span>
                </div>
                <p className="text-[11px] text-neutral-500">W3C HTML5 video caption standard using dot millisecond separators.</p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-50 border border-black/5 space-y-1">
                <div className="flex justify-between font-bold text-[#0d0f12]">
                  <span>Structured JSON</span>
                  <span className="text-purple-600 font-mono">API / Data</span>
                </div>
                <p className="text-[11px] text-neutral-500">Programmatic array objects with start, end, duration, and text keys.</p>
              </div>

              <div className="p-3 rounded-2xl bg-neutral-50 border border-black/5 space-y-1">
                <div className="flex justify-between font-bold text-[#0d0f12]">
                  <span>Document (PDF/DOCX)</span>
                  <span className="text-emerald-600 font-mono">Readable</span>
                </div>
                <p className="text-[11px] text-neutral-500">Converts timestamped captions into clean, readable paragraph documents.</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-black/10 space-y-4 bg-gradient-to-br from-neutral-900 to-[#0d0f12] text-white">
            <h4 className="text-base font-bold flex items-center gap-2 text-[#00d9ff]">
              <ShieldCheck className="w-5 h-5 text-[#00d9ff]" /> 100% Client-Side Conversion
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Your subtitle text is parsed directly inside your browser web runtime. No text data ever leaves your computer or passes through external storage servers.
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
            <p className="text-xs text-neutral-500 font-mono">Everything you need to know about Engine 02 conversion</p>
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
    </section>
  );
};
