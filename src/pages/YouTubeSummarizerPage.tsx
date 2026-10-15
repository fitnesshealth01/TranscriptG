import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import {
  Youtube,
  Sparkles,
  Copy,
  Check,
  Download,
  AlertCircle,
  HelpCircle,
  ListOrdered,
  FileText,
  Clock,
  Zap,
} from "lucide-react";
import { Analytics } from "../lib/analytics";

export default function YouTubeSummarizerPage() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState<"executive" | "bullets" | "chapters">("executive");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [summaryResult, setSummaryResult] = useState("");
  const [originalVideoTitle, setOriginalVideoTitle] = useState("");
  const [copied, setCopied] = useState(false);

  const handleSummarize = async () => {
    if (!url.trim()) {
      setError("Please paste a valid YouTube video URL.");
      return;
    }

    setError(null);
    setIsLoading(true);
    Analytics.youtubeUrlSubmitted(url);
    Analytics.processStarted(`youtube-summarize-${format}`);

    try {
      // 1. Fetch YouTube transcript first
      const ytRes = await fetch("/api/youtube-transcript", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const ytJson = await ytRes.json();
      if (!ytRes.ok || ytJson.error) {
        throw new Error(ytJson.error || "Unable to retrieve YouTube transcript for this video.");
      }

      setOriginalVideoTitle(ytJson.title || "YouTube Video");
      const transcriptSegments = ytJson.transcript || [];
      const fullText = transcriptSegments.map((s: any) => s.text).join(" ");

      if (!fullText.trim()) {
        throw new Error("No caption or transcript dialogue detected in this video.");
      }

      // 2. Process summary based on selected format
      let promptOperation = "summarize";
      let promptInstruction = "";

      if (format === "bullets") {
        promptOperation = "actionItems";
      } else if (format === "chapters") {
        promptOperation = "titleAndChapters";
      }

      const procRes = await fetch("/api/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: fullText,
          operation: promptOperation,
        }),
      });

      const procJson = await procRes.json();
      if (!procRes.ok || procJson.error) {
        // Fallback to the summary generated directly by YouTube endpoint if available
        if (ytJson.summary) {
          setSummaryResult(ytJson.summary);
          return;
        }
        throw new Error(procJson.error || "Failed to generate video summary.");
      }

      setSummaryResult(procJson.result || ytJson.summary || "Summary generated successfully.");
    } catch (err: any) {
      setError(err.message || "An error occurred while generating YouTube summary.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (summaryResult) {
      navigator.clipboard.writeText(summaryResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!summaryResult) return;
    const blob = new Blob([summaryResult], { type: "text/markdown;charset=utf-8" });
    const blobUrl = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = `youtube_summary_${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(blobUrl);
    Analytics.exportDownloaded("md", "youtube-video-summarizer");
  };

  const faqs = [
    {
      q: "How does the AI YouTube Video Summarizer work?",
      a: "TranscriptG extracts the verified transcript track from the YouTube video and processes it with Google's Gemini models to distill the core arguments, key takeaways, and chapter milestones into a concise summary.",
    },
    {
      q: "Can I summarize videos without existing subtitles?",
      a: "If a video has auto-generated or creator-uploaded captions, TranscriptG summarizes it immediately. For videos without captions, our YouTube Speech Lab reconstructs dialogue under educational fair use guidelines directly in your browser without requiring external audio downloads.",
    },
    {
      q: "What summary formats are available?",
      a: "You can generate: (1) Executive Overview (a structured narrative), (2) Key Takeaways (bulleted actionable points), or (3) Timestamped Chapters & Outlines.",
    },
    {
      q: "Is this YouTube summarizer completely free?",
      a: "Yes. There are no usage quotas, no required registration, and no credit cards needed.",
    },
    {
      q: "How long can the YouTube video be?",
      a: "TranscriptG supports long-form YouTube videos including podcasts, interviews, lectures, and documentaries up to several hours in duration.",
    },
  ];

  return (
    <div className="space-y-12">
      <Seo
        title="YouTube Video Summarizer — Free AI Summaries & Key Points"
        description="Summarize any YouTube video instantly with AI. Extract key takeaways, chapter breakdowns, and concise notes. 100% free with no login."
        keywords={[
          "youtube video summarizer",
          "summarize youtube video",
          "ai youtube summary",
          "youtube transcript summarizer",
          "youtube video to notes",
          "free youtube summarizer",
        ]}
      />

      {/* Hero */}
      <section className="text-center max-w-4xl mx-auto space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-mono font-bold uppercase tracking-wider">
          <Youtube className="w-3.5 h-3.5" />
          <span>YouTube Speech Intelligence</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#0d0f12] tracking-tight leading-tight">
          YouTube Video Summarizer
        </h1>

        <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
          Turn long YouTube videos, podcasts, and lectures into actionable bullet points, chapter outlines, or executive summaries in seconds.
        </p>
      </section>

      {/* Main Tool Card */}
      <section className="max-w-4xl mx-auto">
        <div className="glass-card rounded-3xl border border-black/10 p-6 sm:p-8 shadow-xl bg-white space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider">
              Paste YouTube Video URL
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 focus:border-[#ff4d00] focus:ring-2 focus:ring-[#ff4d00]/20 outline-none text-sm font-mono"
              />
            </div>
          </div>

          {/* Output Format Picker */}
          <div>
            <label className="block text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider mb-2">
              Choose Summary Style
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => setFormat("executive")}
                className={`p-3 rounded-xl border text-left transition-all ${
                  format === "executive"
                    ? "border-[#ff4d00] bg-orange-50/40 text-[#ff4d00] font-bold"
                    : "border-neutral-200 text-neutral-700 hover:border-neutral-300"
                }`}
              >
                <div className="text-sm font-bold">Executive Overview</div>
                <div className="text-xs text-neutral-500 font-normal">Concise, coherent narrative</div>
              </button>

              <button
                type="button"
                onClick={() => setFormat("bullets")}
                className={`p-3 rounded-xl border text-left transition-all ${
                  format === "bullets"
                    ? "border-[#ff4d00] bg-orange-50/40 text-[#ff4d00] font-bold"
                    : "border-neutral-200 text-neutral-700 hover:border-neutral-300"
                }`}
              >
                <div className="text-sm font-bold">Key Takeaways</div>
                <div className="text-xs text-neutral-500 font-normal">Actionable bullet points</div>
              </button>

              <button
                type="button"
                onClick={() => setFormat("chapters")}
                className={`p-3 rounded-xl border text-left transition-all ${
                  format === "chapters"
                    ? "border-[#ff4d00] bg-orange-50/40 text-[#ff4d00] font-bold"
                    : "border-neutral-200 text-neutral-700 hover:border-neutral-300"
                }`}
              >
                <div className="text-sm font-bold">Chapters &amp; Milestones</div>
                <div className="text-xs text-neutral-500 font-normal">Section breakdown with ideas</div>
              </button>
            </div>
          </div>

          {/* Action CTA */}
          <div>
            <button
              type="button"
              onClick={handleSummarize}
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#ff4d00] hover:bg-[#e04400] text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Zap className="w-5 h-5 animate-spin" />
                  <span>Distilling Video Dialogue...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Generate AI Summary</span>
                </>
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-2">
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Summary Output */}
          {summaryResult && (
            <div className="space-y-4 pt-4 border-t border-neutral-200">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <span className="font-bold text-sm text-neutral-800 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    Summary Generated
                  </span>
                  {originalVideoTitle && (
                    <span className="text-xs text-neutral-500 truncate block max-w-md">
                      {originalVideoTitle}
                    </span>
                  )}
                </div>

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
                    <span>Download Markdown</span>
                  </button>
                </div>
              </div>

              <div className="w-full p-5 rounded-xl border border-neutral-200 bg-neutral-50 text-sm leading-relaxed text-neutral-800 whitespace-pre-wrap">
                {summaryResult}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3 Step Workflow */}
      <section className="max-w-4xl mx-auto space-y-8 pt-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-[#0d0f12]">How to Summarize YouTube Videos in 3 Steps</h2>
          <p className="text-sm text-neutral-600">Extract high-value knowledge without spending hours watching.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
            <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 font-black text-sm flex items-center justify-center font-mono">
              1
            </span>
            <h3 className="font-bold text-base text-[#0d0f12]">Paste the Video URL</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Copy any public YouTube link from your browser address bar or mobile share sheet.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
            <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 font-black text-sm flex items-center justify-center font-mono">
              2
            </span>
            <h3 className="font-bold text-base text-[#0d0f12]">Select Output Style</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Choose between narrative executive overview, bulleted key takeaways, or timestamped chapter breakdowns.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
            <span className="w-8 h-8 rounded-full bg-red-100 text-red-600 font-black text-sm flex items-center justify-center font-mono">
              3
            </span>
            <h3 className="font-bold text-base text-[#0d0f12]">Review &amp; Export</h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Read the generated summary, copy directly to Notion or Obsidian, or save as a Markdown file.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-4xl mx-auto space-y-6 pt-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-bold text-[#0d0f12]">Frequently Asked Questions</h2>
          <p className="text-sm text-neutral-600">Answers to questions about AI YouTube video summarization.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-neutral-200 shadow-sm space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-[#0d0f12] flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-red-600 shrink-0" />
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
