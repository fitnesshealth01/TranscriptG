import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Seo } from "../components/Seo";
import { SpectrumTrace } from "../components/SpectrumTrace";
import { InteractiveDemoPlayer } from "../components/InteractiveDemoPlayer";
import { SUPPORTED_LANGUAGES } from "../lib/transcript";
import { TOOLS_REGISTRY } from "../lib/navigation";
import { BLOG_ARTICLES } from "../data/blogArticles";
import {
  Mic,
  FileText,
  Cpu,
  GraduationCap,
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
  BookOpen,
  Clock,
  Youtube,
  Languages,
} from "lucide-react";

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);
  const [heroTab, setHeroTab] = useState<"file" | "youtube">("file");
  const [heroYoutubeUrl, setHeroYoutubeUrl] = useState("");

  const handleHeroFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      // Navigate to transcribe tool
      navigate("/transcribe");
    }
  };

  const handleHeroYoutubeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroYoutubeUrl.trim()) {
      navigate(`/youtube-transcript?url=${encodeURIComponent(heroYoutubeUrl.trim())}`);
    } else {
      navigate("/youtube-transcript");
    }
  };

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
      a: "Privacy-first architecture: uploaded audio/video and text files are processed exclusively within your active session. Files are never stored on persistent disks, logged in databases, or used for model training.",
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
        title="TranscriptG – Free Audio, Video & YouTube Transcription"
        description="Free online transcription and video tools. Transcribe audio, convert SRT/VTT subtitles, translate speech, and summarize YouTube videos in 90+ languages."
        keywords={[
          "transcription",
          "speech to text",
          "youtube transcript generator",
          "srt converter",
          "vtt converter",
          "audio to text",
          "ai video translator",
          "youtube video summarizer",
          "free transcription tool",
        ]}
        faqs={faqs}
        canonicalPath="/"
      />

      {/* SECTION 1: TOOL-FIRST HERO */}
      <section className="relative pt-8 pb-16 overflow-hidden bg-grid-pattern border-b border-black/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#ff4d00]/15 via-[#00d9ff]/5 to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-5">
            {/* Status Pill */}
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white border border-black/10 shadow-sm max-w-full mx-auto">
              <span className="w-2 h-2 rounded-full bg-[#ff4d00] animate-pulse shrink-0" />
              <span className="text-[10px] sm:text-xs font-mono font-bold uppercase tracking-[0.12em] sm:tracking-[0.2em] text-neutral-800">
                Free Speech &amp; Subtitle Tools
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#00d9ff]/20 text-[#0088a8] text-[9px] sm:text-[10px] font-mono font-bold shrink-0">
                No Sign-Up
              </span>
            </div>

            {/* Exactly ONE H1 on page */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0d0f12] tracking-tight leading-tight">
              Free Audio, Video &amp; YouTube Transcription
            </h1>

            <p className="text-base sm:text-xl text-neutral-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Turn recordings, videos, and YouTube links into text, subtitles, translations, and summaries. Fast AI processing with no registration required.
            </p>

            {/* Above-the-fold Interactive Input Card */}
            <div className="max-w-2xl mx-auto mt-6 p-6 rounded-3xl bg-white border border-black/10 shadow-xl text-left">
              <div className="flex border-b border-neutral-200 mb-4">
                <button
                  type="button"
                  onClick={() => setHeroTab("file")}
                  className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 ${
                    heroTab === "file"
                      ? "border-[#ff4d00] text-[#ff4d00]"
                      : "border-transparent text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Upload Media File</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHeroTab("youtube")}
                  className={`pb-3 px-4 font-bold text-sm border-b-2 transition-colors flex items-center gap-2 ${
                    heroTab === "youtube"
                      ? "border-[#ff4d00] text-[#ff4d00]"
                      : "border-transparent text-neutral-500 hover:text-neutral-800"
                  }`}
                >
                  <Youtube className="w-4 h-4 text-red-600" />
                  <span>Paste YouTube Link</span>
                </button>
              </div>

              {heroTab === "file" ? (
                <div className="space-y-4">
                  <label className="border-2 border-dashed border-neutral-300 hover:border-[#ff4d00] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-50/50 hover:bg-orange-50/30">
                    <UploadCloud className="w-8 h-8 text-[#ff4d00] mb-2" />
                    <span className="font-bold text-neutral-800 text-sm">
                      Choose audio or video file (MP3, WAV, M4A, MP4)
                    </span>
                    <span className="text-xs text-neutral-500 mt-1">Up to 25MB · Zero sign-up</span>
                    <input
                      type="file"
                      accept="audio/*,video/*"
                      onChange={handleHeroFileSelect}
                      className="hidden"
                    />
                  </label>
                  <div className="flex justify-end">
                    <Link
                      to="/transcribe"
                      className="px-6 py-2.5 rounded-xl bg-[#ff4d00] hover:bg-[#e04400] text-white text-sm font-bold shadow-md flex items-center gap-2"
                    >
                      <span>Open Transcriber</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleHeroYoutubeSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      YouTube Video URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://www.youtube.com/watch?v=..."
                      value={heroYoutubeUrl}
                      onChange={(e) => setHeroYoutubeUrl(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-[#ff4d00] focus:ring-2 focus:ring-[#ff4d00]/20 outline-none text-sm font-mono"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-bold shadow-md flex items-center gap-2"
                    >
                      <span>Get YouTube Captions</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Quick Tasks Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-medium">
              <span className="text-neutral-500 font-mono text-[11px] uppercase tracking-wider mr-1">
                Quick Tools:
              </span>
              <Link
                to="/transcribe"
                className="px-3.5 py-1.5 rounded-xl bg-white border border-neutral-200 hover:border-[#ff4d00] text-neutral-800 shadow-sm transition-all"
              >
                Audio to Text
              </Link>
              <Link
                to="/youtube-transcript"
                className="px-3.5 py-1.5 rounded-xl bg-white border border-neutral-200 hover:border-red-500 text-neutral-800 shadow-sm transition-all"
              >
                YouTube Captions
              </Link>
              <Link
                to="/video-translator"
                className="px-3.5 py-1.5 rounded-xl bg-white border border-neutral-200 hover:border-[#ff4d00] text-neutral-800 shadow-sm transition-all"
              >
                AI Video Translator
              </Link>
              <Link
                to="/ai-subtitle-translator"
                className="px-3.5 py-1.5 rounded-xl bg-white border border-neutral-200 hover:border-[#0088a8] text-neutral-800 shadow-sm transition-all"
              >
                Subtitle Translator
              </Link>
              <Link
                to="/youtube-video-summarizer"
                className="px-3.5 py-1.5 rounded-xl bg-white border border-neutral-200 hover:border-red-500 text-neutral-800 shadow-sm transition-all"
              >
                YouTube Summarizer
              </Link>
              <Link
                to="/convert"
                className="px-3.5 py-1.5 rounded-xl bg-white border border-neutral-200 hover:border-[#0088a8] text-neutral-800 shadow-sm transition-all"
              >
                Convert SRT / VTT
              </Link>
            </div>
          </div>

          {/* SECTION 1.5: INTERACTIVE DEMO (Illustrative Example) */}
          <div className="mt-14 max-w-5xl mx-auto">
            <InteractiveDemoPlayer />
          </div>

          {/* Dynamic Engine Grid from TOOLS_REGISTRY */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {TOOLS_REGISTRY.map((tool, idx) => {
              const Icon = tool.icon;
              const engineNum = `0${idx + 1}`.slice(-2);
              return (
                <Link
                  key={tool.id}
                  to={tool.path}
                  className="glass-card glass-card-hover p-6 sm:p-7 rounded-3xl border border-black/10 flex flex-col justify-between group relative overflow-hidden"
                >
                  {tool.badge && (
                    <div className="absolute top-4 right-4">
                      <span
                        className={`px-2 py-0.5 rounded-full font-mono font-bold text-[9px] uppercase tracking-wider ${
                          tool.badgeType === "amber"
                            ? "bg-amber-100 text-amber-800"
                            : tool.badgeType === "purple"
                            ? "bg-purple-100 text-purple-800"
                            : tool.badgeType === "emerald"
                            ? "bg-emerald-100 text-emerald-800"
                            : tool.badgeType === "cyan"
                            ? "bg-cyan-100 text-cyan-800"
                            : "bg-[#ff4d00]/15 text-[#ff4d00]"
                        }`}
                      >
                        {tool.badge}
                      </span>
                    </div>
                  )}

                  <div>
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-105 transition-all ${tool.accentBg} ${tool.accentText}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-mono uppercase tracking-[0.2em] font-bold ${tool.accentText}`}>
                      Engine {engineNum}
                    </span>
                    <h2 className="text-xl font-black text-[#0d0f12] mt-1 mb-2 tracking-tight">
                      {tool.name}
                    </h2>
                    <p className="text-neutral-600 text-xs leading-relaxed line-clamp-3">
                      {tool.description}
                    </p>
                  </div>

                  <div className={`mt-6 flex items-center text-xs font-mono font-bold gap-1 group-hover:translate-x-1 transition-transform ${tool.accentText}`}>
                    Open Engine <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
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
              author: "Elena R.",
              role: "Documentary Filmmaker",
            },
            {
              quote: "The no-login, session-private guarantee is essential for our legal research team. Fast, precise, and completely privacy-first.",
              author: "Marcus V.",
              role: "Legal Researcher",
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

      {/* SECTION 6: PRACTICAL GUIDES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#ff4d00]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#ff4d00] font-bold">
                Practical Tutorials
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0d0f12] tracking-tight mt-2">
              Featured Transcription &amp; Video Guides
            </h2>
            <p className="text-neutral-600 text-sm sm:text-base mt-2 max-w-xl">
              Practical step-by-step guides on creating subtitles, translating videos, formatting SRT files, and summarizing speech.
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#ff4d00] hover:text-[#e04400] transition-colors shrink-0"
          >
            <span>Explore All Guides</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_ARTICLES.slice(0, 3).map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="glass-card glass-card-hover p-6 rounded-3xl border border-black/10 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span className="px-2.5 py-1 rounded-full bg-neutral-100 font-bold text-neutral-800">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#ff4d00]" />
                    {article.readTime}
                  </span>
                </div>
                <h3 className="text-lg font-black text-[#0d0f12] group-hover:text-[#ff4d00] transition-colors leading-snug">
                  {article.title}
                </h3>
                <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                  {article.summary}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs font-mono font-bold text-[#ff4d00]">
                <span>Read Full Guide</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* Clear About & Tools Links */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-2xl">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4d00]/20 text-[#ff4d00] font-mono text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5" /> Built for Creators &amp; Students
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Free, Transparent &amp; Private by Design
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
              Every tool and tutorial on TranscriptG is maintained by site founder Akash Singh Solanki. No logins required, and files are processed strictly in temporary session memory.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <Link
              to="/about"
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-100 text-[#0d0f12] font-mono text-xs font-bold transition-all shadow-md"
            >
              About the Author →
            </Link>
            <Link
              to="/glossary"
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all border border-white/10"
            >
              Audio Glossary
            </Link>
            <Link
              to="/tools"
              className="px-4 py-2.5 rounded-xl bg-[#ff4d00] hover:bg-[#e04400] text-white font-mono text-xs font-bold transition-all shadow-md"
            >
              All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 7: FAQ */}
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
        <div className="glass-card p-10 sm:p-16 rounded-3xl border border-black/10 text-center relative overflow-hidden bg-gradient-to-br from-white via-neutral-50 to-amber-50/30 text-black">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff4d00]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <span className="px-3 py-1 rounded-full bg-black/5 text-[#ff4d00] text-xs font-mono font-bold uppercase tracking-widest border border-black/10">
              Instant Access
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-black leading-tight">
              Ready to transform your audio into actionable knowledge?
            </h2>
            <p className="text-black text-base font-medium">
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

export default Home;
