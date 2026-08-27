import React, { useState } from "react";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { ExportSuite } from "../components/ExportSuite";
import { ProcessGuide } from "../components/ProcessGuide";
import { SUPPORTED_LANGUAGES, parseTXT, SAMPLE_PROCESS_TEXT } from "../lib/transcript";
import {
  Cpu,
  Sparkles,
  Languages,
  ListChecks,
  Wand2,
  Heading,
  Loader2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  FileText,
  Play
} from "lucide-react";

export const ProcessPage: React.FC = () => {
  const [text, setText] = useState(SAMPLE_PROCESS_TEXT);
  const [operation, setOperation] = useState<"summarize" | "translate" | "key_points" | "polish" | "title">(
    "summarize"
  );
  const [targetLanguage, setTargetLanguage] = useState("Spanish (Español)");
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState(
    "The engineering team achieved key milestones in the zero-retention acoustic processing pipeline, recording sub-second Mel-spectrogram generation and 99.4% Word Error Rate accuracy. Team leads committed to releasing accessibility compliance updates and Web Audio API optimizations while guaranteeing complete public access with no login requirements."
  );
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  const operations = [
    {
      id: "summarize",
      label: "Summarize",
      desc: "3–5 concise sentences executive overview",
      icon: Sparkles,
    },
    {
      id: "translate",
      label: "Translate",
      desc: "Translate accurately into 90+ languages",
      icon: Languages,
    },
    {
      id: "key_points",
      label: "Key Points",
      desc: "5–9 markdown key takeaway bullets",
      icon: ListChecks,
    },
    {
      id: "polish",
      label: "Polish & Fix",
      desc: "Remove filler words & refine grammar",
      icon: Wand2,
    },
    {
      id: "title",
      label: "Title & Chapters",
      desc: "Generate title + 3–5 structured chapter headings",
      icon: Heading,
    },
  ];

  const handleRunOperation = async () => {
    if (!text.trim()) {
      setError("Please enter or paste some text first.");
      return;
    }

    setError(null);
    setIsLoading(true);
    setResultText("");

    const maxAttempts = 3;
    let attempt = 0;
    let success = false;

    while (attempt < maxAttempts && !success) {
      attempt++;
      try {
        if (attempt > 1) {
          await new Promise((r) => setTimeout(r, 1500));
        }

        const res = await fetch("/api/process", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            operation,
            targetLanguage,
          }),
        });

        let json: any = {};
        const contentType = res.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          try {
            json = await res.json();
          } catch {
            throw new Error("Unable to parse intelligence response.");
          }
        } else {
          const textResp = await res.text();
          throw new Error(
            `Server error (${res.status}): ${textResp.replace(/<[^>]*>/g, "").slice(0, 120).trim() || "Service busy. Retrying..."}`
          );
        }

        if (!res.ok || json.error) {
          throw new Error(json.error || "Failed to process text intelligence.");
        }

        setResultText(json.result || "No response text received.");
        success = true;
      } catch (err: any) {
        console.error(`Process error attempt ${attempt}:`, err);
        if (attempt >= maxAttempts) {
          setError(err.message || "An error occurred during AI processing.");
        }
      }
    }

    setIsLoading(false);
  };

  const handleCopyResult = () => {
    if (resultText) {
      navigator.clipboard.writeText(resultText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleLoadSample = () => {
    setText(SAMPLE_PROCESS_TEXT);
    setOperation("summarize");
    setError(null);
  };

  const processFaqs = [
    {
      q: "What text intelligence operations does Engine 03 support?",
      a: "Engine 03 supports 5 core operations: Executive Summarization (3–5 sentences), Translation into 90+ languages, Key Action Item Bullets, Grammar & Verbal Polish, and Automated Title & Chapter Generation.",
    },
    {
      q: "Can I process confidential meeting transcripts safely?",
      a: "Yes. Processing occurs in ephemeral server memory with zero database retention, ensuring company meeting notes, legal depositions, and medical dictations remain strictly confidential.",
    },
    {
      q: "Is there any text input length restriction?",
      a: "You can input up to 50,000 words per request, supporting lengthy podcast episodes, conference recordings, and long-form research papers.",
    },
    {
      q: "How accurate is the multi-language translation?",
      a: "Our neural translation models retain linguistic nuances, domain terminology, and grammatical precision across 90+ supported languages.",
    },
  ];

  return (
    <div className="space-y-12">
      <Seo
        title="AI Transcript Summarizer & Translator — Instant Speech-to-Text NLP Intelligence"
        description="Free AI text intelligence engine. Transform raw transcripts and notes into executive digests, structured action items, 90+ language translations, and polished documents with zero data retention."
        keywords={[
          "transcript summarizer",
          "ai text summarizer",
          "speech to text translator",
          "meeting notes summarizer",
          "extract action items from audio",
          "transcript grammar polish",
          "generate chapters from transcript",
          "audio text intelligence",
          "free ai summarizer",
        ]}
        faqs={processFaqs}
        canonicalPath="/process"
        applicationCategory="BusinessApplication"
      />

      <PageHeader
        eyebrow="Engine 03 · Natural Language Intelligence"
        title="AI Text Summarizer, Translator & NLP Engine"
        description="Transform raw transcripts and text into executive digests, structured action items, multi-language translations, and polished documents."
        badge="Zero Storage • Instant Inference"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* INPUT COLUMN (LEFT) */}
          <div className="space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 space-y-5 bg-white shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-[#ff4d00]" />
                  <h3 className="text-lg font-black text-[#0d0f12]">Input Text Buffer</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleLoadSample}
                    className="px-2.5 py-1 rounded-xl bg-[#ff4d00]/10 hover:bg-[#ff4d00]/20 text-[#ff4d00] text-xs font-mono font-bold transition-colors flex items-center gap-1"
                  >
                    <Play className="w-3 h-3" /> Sample Meeting
                  </button>
                  <span className="text-xs font-mono text-neutral-400">
                    {wordCount} words · {charCount} chars
                  </span>
                </div>
              </div>

              {/* Text Area */}
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste transcript, meeting notes, interview text, or article draft here..."
                rows={10}
                className="w-full p-4 bg-neutral-50 rounded-2xl border border-neutral-200 font-sans text-sm text-[#0d0f12] focus:outline-none focus:border-[#ff4d00] leading-relaxed resize-y"
              />

              {/* Operation Selection Grid */}
              <div className="space-y-3">
                <label className="text-xs font-mono font-bold text-neutral-700 block">
                  Select Intelligence Operation:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {operations.map((op) => {
                    const Icon = op.icon;
                    const isSelected = operation === op.id;
                    return (
                      <button
                        key={op.id}
                        type="button"
                        onClick={() => setOperation(op.id as any)}
                        className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                          isSelected
                            ? "bg-[#ff4d00]/10 border-[#ff4d00] text-[#0d0f12] shadow-sm"
                            : "bg-neutral-50 border-neutral-200 text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <Icon className={`w-4 h-4 ${isSelected ? "text-[#ff4d00]" : "text-neutral-500"}`} />
                          <span className="text-xs font-bold font-mono">{op.label}</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 line-clamp-2 leading-tight">
                          {op.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Target Language Dropdown (if translate selected) */}
              {operation === "translate" && (
                <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 space-y-2">
                  <label className="text-xs font-mono font-bold text-neutral-700 block">
                    Target Output Language:
                  </label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="w-full p-2.5 bg-white rounded-xl border border-neutral-200 text-xs font-mono font-bold text-[#0d0f12] focus:outline-none focus:border-[#ff4d00]"
                  >
                    {SUPPORTED_LANGUAGES.filter((l) => l.code !== "auto").map((l) => (
                      <option key={l.code} value={l.name}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Execute Button */}
              <button
                onClick={handleRunOperation}
                disabled={isLoading || !text.trim()}
                className={`w-full py-3.5 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  isLoading || !text.trim()
                    ? "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                    : "bg-[#0d0f12] text-white hover:bg-[#ff4d00] shadow-lg shadow-black/10 cursor-pointer"
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-[#ff4d00]" />
                    <span>Processing Neural Inference...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-[#ff4d00]" />
                    <span>Execute {operations.find((o) => o.id === operation)?.label}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* OUTPUT COLUMN (RIGHT) */}
          <div className="space-y-6">
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-white shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-black text-[#0d0f12]">Intelligence Output</h3>
                </div>

                {resultText && (
                  <button
                    onClick={handleCopyResult}
                    className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-[#ff4d00]/10 hover:text-[#ff4d00] text-neutral-700 text-xs font-mono font-bold transition-colors flex items-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Output
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-2.5 text-red-700 text-xs font-mono">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Output Content */}
              {resultText ? (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl bg-neutral-50 border border-black/5 font-sans text-sm text-neutral-800 leading-relaxed whitespace-pre-wrap">
                    {resultText}
                  </div>

                  <ExportSuite
                    segments={parseTXT(resultText)}
                    title="TranscriptG_Intelligence"
                    summary={resultText}
                  />
                </div>
              ) : (
                <div className="py-16 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-neutral-100 text-neutral-400 flex items-center justify-center mx-auto">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-[#0d0f12]">Awaiting Execution</h4>
                  <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                    Click Execute on the left to transform your text with neural intelligence.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Guide */}
        <ProcessGuide />
      </div>
    </div>
  );
};
