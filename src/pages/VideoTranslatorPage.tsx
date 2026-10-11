import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import {
  Languages,
  UploadCloud,
  Youtube,
  Play,
  Copy,
  Check,
  Download,
  AlertCircle,
  FileText,
  Sliders,
  Sparkles,
  HelpCircle,
  Clock,
  Shield,
  Zap,
  Globe2,
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

export default function VideoTranslatorPage() {
  const [activeTab, setActiveTab] = useState<"upload" | "youtube">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [targetLang, setTargetLang] = useState("English");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [translatedText, setTranslatedText] = useState("");
  const [originalSummary, setOriginalSummary] = useState("");
  const [copied, setCopied] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      setFile(selected);
      setError(null);
      Analytics.fileSelected(selected.type || "unknown", selected.size / (1024 * 1024));
    }
  };

  const handleTranslate = async () => {
    setError(null);
    setIsLoading(true);
    Analytics.processStarted("video-translate", targetLang);

    try {
      if (activeTab === "upload") {
        if (!file) {
          throw new Error("Please select an audio or video file to translate.");
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("generateSummary", "true");
        formData.append("targetLanguage", targetLang);

        const res = await fetch("/api/transcribe", {
          method: "POST",
          body: formData,
        });

        const json = await res.json();
        if (!res.ok || json.error) {
          throw new Error(json.error || "Failed to process and translate video.");
        }

        const data = json.data;
        const textParts = (data.segments || []).map((s: any) => s.text).join(" ");
        setTranslatedText(textParts || "No spoken dialogue detected in file.");
        setOriginalSummary(data.summary || "");
      } else {
        if (!youtubeUrl.trim()) {
          throw new Error("Please enter a valid YouTube video URL.");
        }

        Analytics.youtubeUrlSubmitted(youtubeUrl);

        // Fetch transcript first
        const ytRes = await fetch("/api/youtube-transcript", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: youtubeUrl.trim() }),
        });

        const ytJson = await ytRes.json();
        if (!ytRes.ok || ytJson.error) {
          throw new Error(ytJson.error || "Unable to extract YouTube transcript.");
        }

        const transcriptSegments = ytJson.transcript || [];
        const fullTranscript = transcriptSegments.map((s: any) => s.text).join(" ");

        if (!fullTranscript.trim()) {
          throw new Error("No caption track found for this YouTube video.");
        }

        // Translate via text processing endpoint
        const procRes = await fetch("/api/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: fullTranscript,
            operation: "translate",
            targetLanguage: targetLang,
          }),
        });

        const procJson = await procRes.json();
        if (!procRes.ok || procJson.error) {
          throw new Error(procJson.error || "Failed to translate transcript.");
        }

        setTranslatedText(procJson.result || "");
        setOriginalSummary(ytJson.summary || "");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred during translation.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (translatedText) {
      navigator.clipboard.writeText(translatedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!translatedText) return;
    const blob = new Blob([translatedText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `translated_${targetLang.toLowerCase().replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    Analytics.exportDownloaded("txt", "video-translator");
  };

  const faqs = [
    {
      q: "How does the AI Video Translator translate video speech?",
      a: "TranscriptG extracts the audio stream from your video file or retrieves the captions from your YouTube link, recognizes the spoken dialogue in its original language, and translates the text into your chosen target language using Google's Gemini models.",
    },
    {
      q: "Is TranscriptG's video translator free to use?",
      a: "Yes. TranscriptG is 100% free with no sign-up, no credit card required, and no watermarks on your generated translations or transcripts.",
    },
    {
      q: "What video and audio formats can I upload?",
      a: "You can upload standard video and audio formats including MP4, MOV, WEBM, MKV, MP3, WAV, AAC, and M4A up to 25MB per upload.",
    },
    {
      q: "How accurate is the AI translation?",
      a: "Translation quality depends on audio clarity, speaker accents, and background noise. For clear speech, the models deliver high semantic accuracy. We always recommend reviewing translations for specialized legal, technical, or medical terminology.",
    },
    {
      q: "Are my uploaded videos or transcripts stored on your server?",
      a: "No. Files are held temporarily in memory only while being processed and sent to the Gemini API. Once your translation is returned, media buffers are immediately discarded.",
    },
  ];

  return (
    <div className="space-y-12">
      <Seo
        title="Free AI Video Translator — Translate Video to English & 90+ Languages"
        description="Translate videos and YouTube clips to English and 90+ languages for free. Fast AI speech translation, no signup, no watermark."
        keywords={[
          "ai video translator",
          "free video translator",
          "translate video to english",
          "translate youtube video",
          "video subtitle translator",
          "translate video free",
        ]}
      />

      {/* Hero Section */}
      <section className="text-center max-w-4xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4d00]/10 border border-[#ff4d00]/20 text-[#ff4d00] text-xs font-mono font-bold uppercase tracking-wider">
          <Languages className="w-3.5 h-3.5" />
          <span>Multilingual Video Intelligence</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#0d0f12] tracking-tight leading-tight">
          Free AI Video Translator
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Translate audio recordings, video files, or YouTube links into English and 90+ languages. Fast AI translation with zero sign-up required.
        </p>
      </section>

      {/* Main Interactive Tool Card */}
      <section className="max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl border border-black/10 p-6 sm:p-8 shadow-xl bg-white space-y-6">
          {/* Dual Tabs: Upload vs YouTube */}
          <div className="flex border-b border-neutral-200">
            <button
              type="button"
              onClick={() => setActiveTab("upload")}
              className={`pb-3 px-4 font-bold text-sm sm:text-base border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "upload"
                  ? "border-[#ff4d00] text-[#ff4d00]"
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
              }`}
            >
              <UploadCloud className="w-4 h-4" />
              <span>Upload Video / Audio File</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("youtube")}
              className={`pb-3 px-4 font-bold text-sm sm:text-base border-b-2 transition-colors flex items-center gap-2 ${
                activeTab === "youtube"
                  ? "border-[#ff4d00] text-[#ff4d00]"
                  : "border-transparent text-neutral-500 hover:text-neutral-800"
              }`}
            >
              <Youtube className="w-4 h-4 text-red-600" />
              <span>Translate YouTube URL</span>
            </button>
          </div>

          {/* Tab 1: Upload */}
          {activeTab === "upload" ? (
            <div className="space-y-4">
              <label className="border-2 border-dashed border-neutral-300 hover:border-[#ff4d00] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors bg-neutral-50/50 hover:bg-orange-50/30">
                <UploadCloud className="w-10 h-10 text-[#ff4d00] mb-2" />
                <span className="font-bold text-neutral-800 text-sm sm:text-base">
                  {file ? file.name : "Click or drag video/audio file here"}
                </span>
                <span className="text-xs text-neutral-500 mt-1">
                  Supports MP4, MOV, WEBM, MP3, WAV, M4A up to 25MB
                </span>
                <input
                  type="file"
                  accept="audio/*,video/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            /* Tab 2: YouTube */
            <div className="space-y-2">
              <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider">
                Paste YouTube Link
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 focus:border-[#ff4d00] focus:ring-2 focus:ring-[#ff4d00]/20 outline-none text-sm font-mono"
                />
              </div>
            </div>
          )}

          {/* Target Language Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2">
                Translate To (Target Language)
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
                    <span>Translating Media...</span>
                  </>
                ) : (
                  <>
                    <Languages className="w-4 h-4" />
                    <span>Translate Video Now</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Results Output */}
          {translatedText && (
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold text-sm text-neutral-800 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  Translated to {targetLang}
                </span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 text-xs font-medium text-neutral-700 flex items-center gap-1.5"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied" : "Copy Text"}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-xs font-medium text-white flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download TXT</span>
                  </button>
                </div>
              </div>

              <textarea
                readOnly
                value={translatedText}
                rows={8}
                className="w-full p-4 rounded-xl border border-neutral-200 bg-neutral-50 font-mono text-sm leading-relaxed text-neutral-800 outline-none"
              />

              {originalSummary && (
                <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-100 text-xs text-neutral-700 space-y-1">
                  <span className="font-bold text-neutral-900 block">Original Summary Overview:</span>
                  <p>{originalSummary}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Guide Content: 3 Easy Steps */}
      <section className="max-w-4xl mx-auto space-y-8 pt-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#0d0f12]">How to Translate a Video in 3 Steps</h2>
          <p className="text-sm text-neutral-600">Quick, free, and accurate speech translation directly in your browser.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] font-black text-sm flex items-center justify-center font-mono">
              1
            </span>
            <h3 className="font-bold text-base text-[#0d0f12]">Upload Video or Paste URL</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Drag in your video or audio file (MP4, MOV, MP3, WAV up to 25MB) or enter a public YouTube link.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] font-black text-sm flex items-center justify-center font-mono">
              2
            </span>
            <h3 className="font-bold text-base text-[#0d0f12]">Choose Target Language</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Select English, Spanish, French, German, Japanese, Hindi, or any of 90+ supported languages.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
            <span className="w-8 h-8 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] font-black text-sm flex items-center justify-center font-mono">
              3
            </span>
            <h3 className="font-bold text-base text-[#0d0f12]">Copy or Download</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Copy the translated text to your clipboard or download it as a clean text file for subtitles and notes.
            </p>
          </div>
        </div>
      </section>

      {/* Practical Tips & Limits */}
      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3">
          <h3 className="font-bold text-base text-[#0d0f12] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#ff4d00]" />
            <span>Best Results & Audio Quality Tips</span>
          </h3>
          <ul className="text-xs text-neutral-600 space-y-2 leading-relaxed">
            <li>• Ensure speaker voices are clearly audible above background music or ambient noise.</li>
            <li>• Videos with multiple overlapping voices may require reviewing speaker transitions.</li>
            <li>• For non-English languages with regional dialects, standard accents produce the highest translation precision.</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-3">
          <h3 className="font-bold text-base text-[#0d0f12] flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Privacy & File Limits</span>
          </h3>
          <ul className="text-xs text-neutral-600 space-y-2 leading-relaxed">
            <li>• <strong>Max Upload:</strong> 25MB per file. For larger recordings, compress audio or trim sections.</li>
            <li>• <strong>No Data Storage:</strong> Audio files are held strictly in temporary memory during inference.</li>
            <li>• <strong>Zero Account Friction:</strong> No email or registration required to translate.</li>
          </ul>
        </div>
      </section>

      {/* FAQs Section with FAQPage Schema */}
      <section className="max-w-4xl mx-auto space-y-6 pt-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-[#0d0f12]">Frequently Asked Questions</h2>
          <p className="text-sm text-neutral-600">Everything you need to know about translating video audio.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-[#0d0f12] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#ff4d00] shrink-0" />
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
