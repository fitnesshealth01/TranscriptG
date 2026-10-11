import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import {
  FileText,
  UploadCloud,
  Languages,
  Copy,
  Check,
  Download,
  AlertCircle,
  HelpCircle,
  Shield,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Analytics } from "../lib/analytics";

const POPULAR_LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Hindi",
  "Japanese",
  "Portuguese",
  "Chinese (Simplified)",
  "Arabic",
  "Russian",
  "Italian",
  "Korean",
  "Dutch",
  "Turkish",
  "Vietnamese",
  "Polish",
  "Indonesian",
];

export default function SubtitleTranslatorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [subtitleContent, setSubtitleContent] = useState("");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translatedSubtitles, setTranslatedSubtitles] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setError(null);
      Analytics.fileSelected(selected.type || "subtitle", selected.size / (1024 * 1024));

      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setSubtitleContent(text || "");
      };
      reader.readAsText(selected);
    }
  };

  const handleTranslate = async () => {
    if (!subtitleContent.trim()) {
      setError("Please upload an SRT or VTT file, or paste subtitle text below.");
      return;
    }

    setError(null);
    setIsLoading(true);
    Analytics.processStarted("subtitle-translate", targetLang);

    try {
      // Use text intelligence endpoint with explicit prompt instructions to preserve cue timestamps
      const res = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: subtitleContent,
          operation: "translate",
          targetLanguage: `${targetLang}. CRITICAL: You must preserve all cue numbers, timecodes (e.g. 00:01:23,456 --> 00:01:26,789), and line structure exactly as input. Only translate the dialogue lines.`,
        }),
      });

      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error || "Failed to translate subtitle file.");
      }

      setTranslatedSubtitles(json.result || "");
    } catch (err: any) {
      setError(err.message || "An error occurred while translating subtitles.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (translatedSubtitles) {
      navigator.clipboard.writeText(translatedSubtitles);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!translatedSubtitles) return;
    const isVtt = file?.name.toLowerCase().endsWith(".vtt") || subtitleContent.startsWith("WEBVTT");
    const ext = isVtt ? "vtt" : "srt";
    const blob = new Blob([translatedSubtitles], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `subtitles_${targetLang.toLowerCase().replace(/\s+/g, "_")}.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
    Analytics.exportDownloaded(ext, "ai-subtitle-translator");
  };

  const faqs = [
    {
      q: "Does this AI subtitle translator preserve timecodes?",
      a: "Yes. The AI is instructed to retain all cue sequence numbers and exact timestamps (e.g., 00:00:12,345 --> 00:00:15,678) intact while translating only the dialogue text.",
    },
    {
      q: "Which subtitle formats are supported?",
      a: "You can translate standard SubRip (.SRT) and WebVTT (.VTT) subtitle files, as well as plain text dialogue transcripts.",
    },
    {
      q: "Can I download the translated subtitles directly into an SRT file?",
      a: "Yes. Once translation completes, click 'Download Subtitles' to immediately save an SRT or VTT file ready for upload to YouTube, Vimeo, Premiere Pro, or DaVinci Resolve.",
    },
    {
      q: "Is there any character limit for subtitle translation?",
      a: "TranscriptG accepts subtitle files up to approximately 50,000 words in a single translation request, covering full-length movies, documentaries, and conference recordings.",
    },
    {
      q: "Do I need to sign up or create an account?",
      a: "No. TranscriptG is entirely free with no account creation or credit card requirement.",
    },
  ];

  return (
    <div className="space-y-12">
      <Seo
        title="AI Subtitle Translator — Translate SRT & VTT Subtitles Free"
        description="Translate SRT and VTT subtitle files into 90+ languages with preserved timestamps. Fast, free AI subtitle translator with no login."
        keywords={[
          "ai subtitle translator",
          "translate srt file",
          "translate vtt subtitles",
          "subtitle translator online",
          "free srt translator",
          "translate captions to english",
        ]}
      />

      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d9ff]/15 border border-[#00d9ff]/30 text-[#0088a8] text-xs font-mono font-bold uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>SRT & VTT Subtitle Engine</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#0d0f12] tracking-tight leading-tight">
          AI Subtitle Translator
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Translate SRT and VTT subtitle files into 90+ languages while keeping millisecond timecodes perfectly synchronized. Free and no account needed.
        </p>
      </section>

      {/* Main Subtitle Tool Card */}
      <section className="max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl border border-black/10 p-6 sm:p-8 shadow-xl bg-white space-y-6">
          {/* File Upload Zone */}
          <div>
            <label className="border-2 border-dashed border-neutral-300 hover:border-[#ff4d00] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-50/50 hover:bg-orange-50/30">
              <UploadCloud className="w-10 h-10 text-[#0088a8] mb-2" />
              <span className="font-bold text-neutral-800 text-sm sm:text-base">
                {file ? file.name : "Drop SRT or VTT subtitle file here"}
              </span>
              <span className="text-xs text-neutral-500 mt-1">
                Supports .srt, .vtt, or paste raw text below
              </span>
              <input
                type="file"
                accept=".srt,.vtt,.txt"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Raw Text Input / Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider">
                Subtitle Content / Timecoded Cues
              </label>
              {subtitleContent && (
                <button
                  type="button"
                  onClick={() => setSubtitleContent("")}
                  className="text-xs text-neutral-500 hover:text-red-600"
                >
                  Clear
                </button>
              )}
            </div>
            <textarea
              value={subtitleContent}
              onChange={(e) => setSubtitleContent(e.target.value)}
              placeholder={`1\n00:00:01,000 --> 00:00:04,000\nWelcome to our video guide.\n\n2\n00:00:04,500 --> 00:00:08,000\nToday we'll translate subtitles into multiple languages.`}
              rows={6}
              className="w-full p-4 rounded-xl border border-neutral-300 font-mono text-xs sm:text-sm leading-relaxed text-neutral-800 outline-none focus:border-[#ff4d00] focus:ring-2 focus:ring-[#ff4d00]/20"
            />
          </div>

          {/* Language Selector + CTA */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Translate Subtitles To
              </label>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-[#ff4d00] outline-none text-sm font-medium bg-white"
              >
                {POPULAR_LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={handleTranslate}
                disabled={isLoading}
                className="w-full py-3.5 px-6 rounded-xl bg-[#ff4d00] hover:bg-[#e04400] text-white font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Zap className="w-4 h-4 animate-spin" />
                    <span>Translating Cues...</span>
                  </>
                ) : (
                  <>
                    <Languages className="w-4 h-4" />
                    <span>Translate Subtitles</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Output Results */}
          {translatedSubtitles && (
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold text-sm text-neutral-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Translated Subtitles ({targetLang})
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-xs font-medium text-neutral-700 flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs font-medium text-white flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Subtitles</span>
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                value={translatedSubtitles}
                rows={8}
                className="w-full p-4 rounded-xl border border-neutral-200 bg-neutral-50 font-mono text-xs sm:text-sm leading-relaxed text-neutral-800 outline-none"
              />
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto space-y-8 pt-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#0d0f12]">How It Works with Timecode Preservation</h2>
          <p className="text-sm text-neutral-600">Ensure captions sync accurately to video timelines in any language.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#00d9ff]/20 text-[#0088a8] font-black text-sm flex items-center justify-center font-mono">
              1
            </span>
            <h3 className="font-bold text-base text-[#0d0f12]">Upload SRT or VTT</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Upload your original subtitle track or paste timecoded text lines directly.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#00d9ff]/20 text-[#0088a8] font-black text-sm flex items-center justify-center font-mono">
              2
            </span>
            <h3 className="font-bold text-base text-[#0d0f12]">AI Semantic Translation</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Google's Gemini models translate dialogue while strictly maintaining cue blocks and millisecond stamps.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#00d9ff]/20 text-[#0088a8] font-black text-sm flex items-center justify-center font-mono">
              3
            </span>
            <h3 className="font-bold text-base text-[#0d0f12]">Download &amp; Publish</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Download your new translated SRT file and add it as a closed caption track on YouTube, Vimeo, or social video.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto space-y-6 pt-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-[#0d0f12]">Frequently Asked Questions</h2>
          <p className="text-sm text-neutral-600">Common questions about SRT and VTT translation.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-[#0d0f12] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#0088a8] shrink-0" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed pl-6">{faq.a}</p>
            </div>
          ))}
        </div>

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: f.a,
                },
              })),
            }),
          }}
        />
      </section>
    </div>
  );
}
