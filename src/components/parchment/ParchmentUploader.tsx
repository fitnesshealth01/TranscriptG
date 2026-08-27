import React, { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Building2,
  CheckCircle2,
  Lock,
  ChevronRight,
  BookOpen,
  EyeOff,
  Sliders
} from "lucide-react";
import {
  SAMPLE_PARCHMENT_CS,
  SAMPLE_PARCHMENT_ECON,
  SAMPLE_PARCHMENT_HIGH_SCHOOL,
  SAMPLE_PARCHMENT_PREMED,
} from "../../data/parchmentSamples";
import { ParchmentParsedData } from "../../types/parchment";

interface ParchmentUploaderProps {
  onDataLoaded: (data: ParchmentParsedData, sourceFileName?: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  redactPii: boolean;
  setRedactPii: (redact: boolean) => void;
}

export const ParchmentUploader: React.FC<ParchmentUploaderProps> = ({
  onDataLoaded,
  isLoading,
  setIsLoading,
  redactPii,
  setRedactPii,
}) => {
  const [activeTab, setActiveTab] = useState<"upload" | "paste">("upload");
  const [pastedText, setPastedText] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileUpload = async (file: File) => {
    setUploadError(null);
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/parchment/parse", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || "Failed to parse academic transcript document.");
      }

      onDataLoaded(json.data, file.name);
    } catch (err: any) {
      console.error("Parchment parse error:", err);
      setUploadError(err.message || "Failed to parse transcript. Try pasting raw text or test with our sample transcripts.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextSubmit = async () => {
    if (!pastedText.trim()) return;
    setUploadError(null);
    setIsLoading(true);

    try {
      const res = await fetch("/api/parchment/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: pastedText }),
      });

      const json = await res.json();
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || "Failed to parse academic transcript text.");
      }

      onDataLoaded(json.data, "Pasted_Transcript_Document.txt");
    } catch (err: any) {
      console.error("Parchment text parse error:", err);
      setUploadError(err.message || "Failed to parse text. Try testing with our sample transcripts.");
    } finally {
      setIsLoading(false);
    }
  };

  const sampleButtons = [
    {
      title: "Univ of Michigan",
      subtitle: "B.S. Computer Science",
      gpa: "3.88 GPA",
      badge: "STEM / Dean's List",
      color: "border-[#ff4d00]/30 hover:border-[#ff4d00] bg-orange-50/40 text-[#ff4d00]",
      data: SAMPLE_PARCHMENT_CS,
    },
    {
      title: "UC Berkeley",
      subtitle: "B.A. Economics",
      gpa: "3.76 GPA",
      badge: "Major Honors",
      color: "border-[#00d9ff]/40 hover:border-[#0088a8] bg-cyan-50/40 text-[#0088a8]",
      data: SAMPLE_PARCHMENT_ECON,
    },
    {
      title: "Thomas Jefferson HS",
      subtitle: "AP / Honors Diploma",
      gpa: "4.62 W-GPA",
      badge: "10+ AP Courses",
      color: "border-purple-300 hover:border-purple-500 bg-purple-50/40 text-purple-700",
      data: SAMPLE_PARCHMENT_HIGH_SCHOOL,
    },
    {
      title: "Johns Hopkins",
      subtitle: "Pre-Med Prerequisites",
      gpa: "3.94 BCPM",
      badge: "AMCAS Ready",
      color: "border-emerald-300 hover:border-emerald-500 bg-emerald-50/40 text-emerald-700",
      data: SAMPLE_PARCHMENT_PREMED,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Sample Quick-Load Bar */}
      <div className="glass-card p-5 sm:p-6 rounded-3xl border border-black/10 bg-white shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#ff4d00]" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#0d0f12]">
              Instant Interactive Demo Datasets
            </h3>
          </div>
          <span className="text-[11px] font-mono text-neutral-500">
            Click to test parser, GPA calculator, and export suite immediately
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {sampleButtons.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              disabled={isLoading}
              onClick={() => onDataLoaded(sample.data, `Sample_${sample.title.replace(/\s+/g, "_")}.pdf`)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] ${sample.color} group relative overflow-hidden`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white border border-black/5 shadow-xs">
                  {sample.badge}
                </span>
                <span className="text-xs font-mono font-black">{sample.gpa}</span>
              </div>
              <div className="font-bold text-sm text-[#0d0f12] group-hover:text-black">
                {sample.title}
              </div>
              <div className="text-xs text-neutral-600 truncate mt-0.5">
                {sample.subtitle}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Parser Container */}
      <div className="glass-card rounded-3xl border border-black/10 bg-white shadow-md overflow-hidden">
        {/* Tab Header */}
        <div className="p-4 sm:p-5 border-b border-black/5 flex flex-wrap items-center justify-between gap-4 bg-neutral-50/60">
          <div className="flex items-center gap-2 bg-neutral-200/70 p-1 rounded-2xl">
            <button
              type="button"
              onClick={() => setActiveTab("upload")}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "upload"
                  ? "bg-white text-[#0d0f12] shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <UploadCloud className="w-3.5 h-3.5 inline mr-1.5" /> Upload Document (PDF / Image)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("paste")}
              className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "paste"
                  ? "bg-white text-[#0d0f12] shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <FileText className="w-3.5 h-3.5 inline mr-1.5" /> Paste Transcript Text
            </button>
          </div>

          {/* Privacy & Redaction Toggle */}
          <label className="flex items-center gap-2 text-xs font-mono font-semibold text-neutral-700 cursor-pointer bg-white px-3 py-1.5 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors">
            <input
              type="checkbox"
              checked={redactPii}
              onChange={(e) => setRedactPii(e.target.checked)}
              className="w-4 h-4 rounded text-[#ff4d00] focus:ring-[#ff4d00] accent-[#ff4d00]"
            />
            <EyeOff className="w-3.5 h-3.5 text-[#ff4d00]" />
            <span>Redact PII (SSN, ID, DOB)</span>
          </label>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8">
          {activeTab === "upload" ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileUpload(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-3xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
                dragOver
                  ? "border-[#ff4d00] bg-[#ff4d00]/5 scale-[1.01]"
                  : "border-neutral-300 hover:border-[#ff4d00]/60 hover:bg-neutral-50/50"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,image/png,image/jpeg,image/webp,application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />

              <div className="w-16 h-16 rounded-3xl bg-[#ff4d00]/10 text-[#ff4d00] mx-auto flex items-center justify-center mb-4 shadow-inner">
                <GraduationCap className="w-8 h-8" />
              </div>

              <h3 className="text-lg font-bold text-[#0d0f12]">
                Drop Official or Unofficial Transcript Document
              </h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto mt-1.5 leading-relaxed font-sans">
                Supports official Parchment PDF, National Student Clearinghouse, Registrar scans, PNG, JPG, and WebP up to 25MB.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-2 mt-6 text-[11px] font-mono text-neutral-600">
                <span className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200">
                  PDF Documents
                </span>
                <span className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200">
                  Scanned Images (OCR)
                </span>
                <span className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200">
                  Parchment Electronic Exchange
                </span>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs font-mono text-[#ff4d00] font-bold">
                <ShieldCheck className="w-4 h-4" /> 100% Zero-Retention Session Processing (FERPA Compliant)
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-xs font-mono font-bold text-neutral-700">
                Paste Raw Academic Transcript Text, OCR Dump, or Registrar Export:
              </label>
              <textarea
                rows={9}
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder={`Example:\nUniversity of Michigan - Ann Arbor\nStudent: Alex Rivera (UM-84920155)\nFall 2024\nEECS 280 Intro Data Structures 4.0 A\nMATH 215 Calculus III 4.0 A-\nPHYSICS 240 General Physics II 4.0 A\nTerm GPA: 3.92 Cumulative GPA: 3.88`}
                className="w-full p-4 rounded-2xl border border-neutral-300 bg-neutral-50 font-mono text-xs text-[#0d0f12] focus:outline-none focus:border-[#ff4d00] focus:ring-1 focus:ring-[#ff4d00]"
              />

              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={isLoading || !pastedText.trim()}
                  onClick={handleTextSubmit}
                  className="px-6 py-3 rounded-xl bg-[#ff4d00] hover:bg-[#e04400] text-white font-mono text-xs font-bold transition-all shadow-md disabled:opacity-50 flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> Parse Transcript Text
                </button>
              </div>
            </div>
          )}

          {uploadError && (
            <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2.5">
              <div className="font-bold">Error:</div>
              <div>{uploadError}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
