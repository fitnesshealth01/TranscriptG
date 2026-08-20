import React, { useState } from "react";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { ExportSuite } from "../components/ExportSuite";
import { ProcessGuide } from "../components/ProcessGuide";
import { SUPPORTED_LANGUAGES, parseTXT } from "../lib/transcript";
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
} from "lucide-react";

export const ProcessPage: React.FC = () => {
  const [text, setText] = useState("");
  const [operation, setOperation] = useState<"summarize" | "translate" | "key_points" | "polish" | "title">(
    "summarize"
  );
  const [targetLanguage, setTargetLanguage] = useState("Spanish (Español)");
  const [isLoading, setIsLoading] = useState(false);
  const [resultText, setResultText] = useState("");
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
            throw new Error("Unable to parse response from server.");
          }
        } else {
          const textResp = await res.text();
          throw new Error(
            `Server error (${res.status}): ${textResp.replace(/<[^>]*>/g, "").slice(0, 120).trim() || "Service temporary busy."}`
          );
        }

        if (!res.ok || json.error) {
          throw new Error(json.error || "Failed to process text intelligence operation.");
        }

        setResultText(json.result || "");
        success = true;
      } catch (err: any) {
        console.error(`Process error (attempt ${attempt}/${maxAttempts}):`, err);
        if (attempt >= maxAttempts) {
          setError(err.message || "An error occurred while executing the operation.");
        }
      }
    }

    setIsLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(resultText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setText("");
    setResultText("");
    setError(null);
  };

  return (
    <div className="space-y-12">
      <Seo
        title="Text Intelligence Engine (Summarize, Translate, Polish) — TranscriptG"
        description="Run AI intelligence operations on transcripts or raw text. Summarize, translate across 90+ languages, extract key points, and generate titles & chapters."
      />

      <PageHeader
        eyebrow="Engine 03 · Text Intelligence"
        title="AI Text Intelligence & Transformation"
        description="Extract summaries, translate into 90+ languages, generate key points, and refine transcript manuscripts."
        badge="Gemini 3.7 Intelligence"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* INPUT & OPERATIONS COLUMN (LEFT) */}
          <div className="space-y-6">
            <div className="glass-card p-6 rounded-3xl border border-black/10 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-black text-[#0d0f12] flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-600" /> Input Manuscript
                </h3>
                <span className="text-xs font-mono text-neutral-500 font-semibold">
                  {wordCount} Words • {charCount} Chars
                </span>
              </div>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste transcript or raw article text here..."
                rows={10}
                className="w-full p-4 bg-neutral-50 rounded-2xl border border-neutral-200 text-sm text-[#0d0f12] focus:outline-none focus:border-purple-600 transition-colors leading-relaxed"
              />

              {/* Operation Selector */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-mono font-bold text-neutral-700 uppercase tracking-wider block">
                  Select Intelligence Operation:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {operations.map((op) => {
                    const Icon = op.icon;
                    const isSelected = operation === op.id;
                    return (
                      <button
                        key={op.id}
                        type="button"
                        onClick={() => setOperation(op.id as any)}
                        className={`p-3 rounded-2xl border text-left transition-all duration-200 flex items-start gap-3 ${
                          isSelected
                            ? "bg-purple-600 text-white border-purple-600 shadow-md scale-[1.01]"
                            : "bg-neutral-100 hover:bg-neutral-200/80 text-[#0d0f12] border-neutral-200"
                        }`}
                      >
                        <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${isSelected ? "text-white" : "text-purple-600"}`} />
                        <div>
                          <div className="text-xs font-bold font-mono">{op.label}</div>
                          <div className={`text-[10px] ${isSelected ? "text-purple-100" : "text-neutral-500"}`}>
                            {op.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Translation Language Selector if operation is translate */}
              {operation === "translate" && (
                <div className="p-3 bg-purple-50 rounded-2xl border border-purple-200 space-y-2">
                  <label className="text-xs font-mono font-bold text-purple-900 block">
                    Target Language:
                  </label>
                  <select
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                    className="w-full p-2 bg-white rounded-xl border border-purple-300 text-xs font-mono font-bold text-[#0d0f12]"
                  >
                    {SUPPORTED_LANGUAGES.filter((l) => l.code !== "auto").map((l) => (
                      <option key={l.code} value={l.name}>
                        {l.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {error && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Run CTA */}
              <button
                onClick={handleRunOperation}
                disabled={isLoading || !text.trim()}
                className="w-full py-4 rounded-2xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-black text-sm font-mono tracking-tight shadow-xl flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    Processing Operation...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Run {operation.toUpperCase()} Operation
                  </>
                )}
              </button>
            </div>
          </div>

          {/* RESULT COLUMN (RIGHT) */}
          <div className="space-y-6">
            {resultText ? (
              <div className="space-y-6">
                <div className="glass-card p-6 rounded-3xl border border-black/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-black/10 pb-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      <h3 className="text-lg font-black text-[#0d0f12]">Intelligence Output</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopy}
                        className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-mono font-bold border border-neutral-200 transition-colors flex items-center gap-1.5"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied" : "Copy"}
                      </button>

                      <button
                        onClick={handleReset}
                        className="p-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
                        title="Reset"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-900 text-neutral-100 rounded-2xl font-mono text-xs leading-relaxed max-h-[500px] overflow-y-auto whitespace-pre-wrap">
                    {resultText}
                  </div>
                </div>

                <ExportSuite
                  segments={parseTXT(resultText)}
                  title={`TranscriptG_${operation}`}
                  plainText={resultText}
                />
              </div>
            ) : (
              <div className="glass-card p-12 rounded-3xl border border-black/10 text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto text-purple-600">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-[#0d0f12]">No Output Generated Yet</h3>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto leading-relaxed">
                  Enter text on the left, select an AI operation (Summarize, Translate, Key points, Polish, or Title), and click Run Operation.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Detailed Tool Guide */}
        <ProcessGuide />
      </div>
    </div>
  );
};
