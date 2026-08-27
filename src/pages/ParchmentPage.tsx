import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  ShieldCheck,
  Sparkles,
  FileText,
  RotateCcw,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Award
} from "lucide-react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { ParchmentUploader } from "../components/parchment/ParchmentUploader";
import { ParchmentViewer } from "../components/parchment/ParchmentViewer";
import { ParchmentExportSuite } from "../components/parchment/ParchmentExportSuite";
import { ParchmentGuide } from "../components/parchment/ParchmentGuide";
import { SAMPLE_PARCHMENT_CS } from "../data/parchmentSamples";
import { ParchmentParsedData } from "../types/parchment";

export const ParchmentPage: React.FC = () => {
  const [parsedData, setParsedData] = useState<ParchmentParsedData | null>(null);
  const [sourceFileName, setSourceFileName] = useState<string>("Sample_University_of_Michigan.pdf");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [redactPii, setRedactPii] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleDataLoaded = (data: ParchmentParsedData, fileName?: string) => {
    setParsedData(data);
    if (fileName) setSourceFileName(fileName);
    window.scrollTo({ top: 400, behavior: "smooth" });
  };

  const handleReset = () => {
    setParsedData(null);
    setSourceFileName("");
  };

  const parchmentFaqs = [
    {
      q: "What is the Parchment Transcript Parser & GPA Calculator?",
      a: "It is a free tool that automatically analyzes official Parchment, National Student Clearinghouse, and scanned academic transcripts to calculate unweighted, weighted, and major GPAs, audit graduation credit requirements, and export structured course tables.",
    },
    {
      q: "Is my personal educational data secure and FERPA compliant?",
      a: "Yes. TranscriptG operates on a zero-data-retention architecture. Your academic transcript PDFs and extracted course data are never saved to disk or shared with third parties, ensuring strict compliance with FERPA regulations.",
    },
    {
      q: "Does it support different GPA grading scales (e.g. 4.0 vs 5.0 vs AMCAS)?",
      a: "Yes. The parser computes standard 4.0 unweighted GPA, weighted GPA for honors/AP/IB courses, and customizable grade-point scales.",
    },
    {
      q: "Can I export my course list and GPA audit to Excel or CSV?",
      a: "Yes. You can export clean CSV, JSON, Markdown, and PDF audit summaries ready for graduate school applications and job portfolios.",
    },
  ];

  return (
    <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      <Seo
        title="Parchment Transcript Parser & GPA Calculator — Free Academic PDF Audit Tool"
        description="Free academic transcript analyzer for Parchment & National Student Clearinghouse PDFs. Compute unweighted/weighted GPAs, audit course credits, and export CSV/JSON reports. 100% FERPA compliant, zero data retention."
        canonicalPath="/parchment-transcript"
        keywords={[
          "parchment transcript parser",
          "gpa calculator",
          "academic transcript audit",
          "parse parchment pdf",
          "college transcript to excel",
          "unweighted gpa calculator",
          "weighted gpa calculator",
          "ferpa compliant transcript parser",
          "national student clearinghouse pdf",
          "degree credit audit",
        ]}
        faqs={parchmentFaqs}
        applicationCategory="EducationalApplication"
      />
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-orange-50 border border-[#ff4d00]/30 text-[#ff4d00] text-[10px] sm:text-xs font-mono font-bold tracking-wide shadow-xs max-w-full text-center">
          <GraduationCap className="w-4 h-4 shrink-0" />
          <span>PARCHMENT & REGISTRAR INTELLIGENCE</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-[#0d0f12] tracking-tight leading-[1.15] break-words">
          Parse, Calculate & Audit Any <span className="text-[#ff4d00]">Academic Transcript</span>
        </h1>

        <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans max-w-2xl mx-auto">
          Extract course histories, compute unweighted & weighted GPAs, simulate graduation milestones, and export clean reports from official Parchment PDFs, National Student Clearinghouse, and registrar scans.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs font-mono text-neutral-600">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Zero-Data Retention (FERPA Compliant)
          </div>
          <span className="text-neutral-300">•</span>
          <div className="flex items-center gap-1.5">
            <Award className="w-4 h-4 text-[#ff4d00]" /> 4.0 / 5.0 / AMCAS GPA Engine
          </div>
          <span className="text-neutral-300">•</span>
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#0088a8]" /> Instant Interactive Previews
          </div>
        </div>
      </div>

      {/* Main Interactive Tool Container */}
      <div className="space-y-8">
        {/* If no data is loaded, show uploader */}
        {!parsedData ? (
          <ParchmentUploader
            onDataLoaded={handleDataLoaded}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            redactPii={redactPii}
            setRedactPii={setRedactPii}
          />
        ) : (
          <div className="space-y-8">
            {/* Top Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-100/80 border border-black/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white text-[#ff4d00] shadow-xs">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-[#0d0f12] block">
                    Active Document: {sourceFileName || "Academic_Transcript.pdf"}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500">
                    {parsedData.institutionInfo.name} • {parsedData.summary.cumulativeGpa.toFixed(2)} GPA
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 font-mono text-xs font-bold border border-neutral-200 transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Upload Another Document
                </button>
              </div>
            </div>

            {/* Viewer Component */}
            <ParchmentViewer
              data={parsedData}
              onUpdateData={setParsedData}
              redactPii={redactPii}
            />

            {/* Export Suite */}
            <ParchmentExportSuite
              data={parsedData}
              sourceTitle={sourceFileName}
              redactPii={redactPii}
            />
          </div>
        )}
      </div>

      {/* Educational Guide & Knowledge Base */}
      <ParchmentGuide />

      {/* Cross-Tool Navigation Banner */}
      <div className="glass-card p-8 rounded-3xl border border-black/10 bg-neutral-900 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff4d00] font-bold">
            Full Audio & Document Suite
          </span>
          <h3 className="text-xl font-bold tracking-tight">
            Explore TranscriptG's Other High-Precision Engines
          </h3>
          <p className="text-xs text-neutral-400 max-w-lg">
            Transcribe lectures and audio files, convert formats, or run deep AI intelligence across research papers.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/transcribe"
            className="px-4 py-2.5 rounded-xl bg-[#ff4d00] hover:bg-[#e04400] text-white font-mono text-xs font-bold transition-all shadow-sm"
          >
            Audio Transcribe Engine
          </Link>
          <Link
            to="/convert"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all"
          >
            Format Converter
          </Link>
          <Link
            to="/process"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all"
          >
            Text Intelligence
          </Link>
        </div>
      </div>
    </div>
  );
};
