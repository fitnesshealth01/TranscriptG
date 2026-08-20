import React, { useState } from "react";
import { CueSegment, exportToSRT, exportToVTT, exportToTXT, exportToJSON, exportToMarkdown, exportToPDF, exportToDOCX, downloadBlob } from "../lib/transcript";
import { Download, FileText, FileCode, File, Copy, Check, Sparkles } from "lucide-react";

interface ExportSuiteProps {
  segments: CueSegment[];
  title?: string;
  summary?: string;
  plainText?: string;
}

export const ExportSuite: React.FC<ExportSuiteProps> = ({
  segments,
  title = "TranscriptG_Export",
  summary = "",
  plainText = "",
}) => {
  const [copied, setCopied] = useState(false);

  const handleDownload = (format: "srt" | "vtt" | "txt" | "json" | "md" | "pdf" | "docx") => {
    const cleanTitle = title.replace(/[^a-zA-Z0-9_-]/g, "_") || "transcriptg";

    if (plainText && (format === "txt" || format === "md")) {
      downloadBlob(plainText, `${cleanTitle}.${format}`, "text/plain;charset=utf-8");
      return;
    }

    switch (format) {
      case "srt":
        downloadBlob(exportToSRT(segments), `${cleanTitle}.srt`, "text/plain;charset=utf-8");
        break;
      case "vtt":
        downloadBlob(exportToVTT(segments), `${cleanTitle}.vtt`, "text/vtt;charset=utf-8");
        break;
      case "txt":
        downloadBlob(exportToTXT(segments), `${cleanTitle}.txt`, "text/plain;charset=utf-8");
        break;
      case "json":
        downloadBlob(exportToJSON(segments), `${cleanTitle}.json`, "application/json;charset=utf-8");
        break;
      case "md":
        downloadBlob(exportToMarkdown(segments, title, summary), `${cleanTitle}.md`, "text/markdown;charset=utf-8");
        break;
      case "pdf":
        exportToPDF(segments, title, summary);
        break;
      case "docx":
        exportToDOCX(segments, title, summary);
        break;
    }
  };

  const copyToClipboard = () => {
    let content = plainText;
    if (!content) {
      content = exportToTXT(segments);
    }
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <h3 className="text-lg font-black text-[#0d0f12] flex items-center gap-2">
            <Download className="w-5 h-5 text-[#ff4d00]" /> Export Suite
          </h3>
          <p className="text-xs text-neutral-500 font-mono">
            Lossless downloads • Universal player compatibility
          </p>
        </div>

        <button
          onClick={copyToClipboard}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0d0f12] hover:bg-black text-white text-xs font-mono font-bold transition-colors shadow-md"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-[#00d9ff]" />}
          {copied ? "Copied to Clipboard!" : "Copy Raw Text"}
        </button>
      </div>

      {/* Format Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        <button
          onClick={() => handleDownload("srt")}
          className="p-3 rounded-2xl bg-neutral-100 hover:bg-[#ff4d00] hover:text-white border border-neutral-200 text-left transition-all duration-200 group flex flex-col justify-between"
        >
          <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white/80 font-bold uppercase">Subtitles</span>
          <span className="text-sm font-bold font-mono mt-1 flex items-center justify-between">
            SRT <FileCode className="w-4 h-4 text-[#ff4d00] group-hover:text-white" />
          </span>
        </button>

        <button
          onClick={() => handleDownload("vtt")}
          className="p-3 rounded-2xl bg-neutral-100 hover:bg-[#00d9ff] hover:text-black border border-neutral-200 text-left transition-all duration-200 group flex flex-col justify-between"
        >
          <span className="text-[10px] font-mono text-neutral-400 group-hover:text-black/70 font-bold uppercase">Web Video</span>
          <span className="text-sm font-bold font-mono mt-1 flex items-center justify-between">
            VTT <FileCode className="w-4 h-4 text-[#00d9ff] group-hover:text-black" />
          </span>
        </button>

        <button
          onClick={() => handleDownload("txt")}
          className="p-3 rounded-2xl bg-neutral-100 hover:bg-neutral-800 hover:text-white border border-neutral-200 text-left transition-all duration-200 group flex flex-col justify-between"
        >
          <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white/80 font-bold uppercase">Plain</span>
          <span className="text-sm font-bold font-mono mt-1 flex items-center justify-between">
            TXT <FileText className="w-4 h-4 text-neutral-500 group-hover:text-white" />
          </span>
        </button>

        <button
          onClick={() => handleDownload("json")}
          className="p-3 rounded-2xl bg-neutral-100 hover:bg-emerald-600 hover:text-white border border-neutral-200 text-left transition-all duration-200 group flex flex-col justify-between"
        >
          <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white/80 font-bold uppercase">Data</span>
          <span className="text-sm font-bold font-mono mt-1 flex items-center justify-between">
            JSON <FileCode className="w-4 h-4 text-emerald-600 group-hover:text-white" />
          </span>
        </button>

        <button
          onClick={() => handleDownload("md")}
          className="p-3 rounded-2xl bg-neutral-100 hover:bg-purple-600 hover:text-white border border-neutral-200 text-left transition-all duration-200 group flex flex-col justify-between"
        >
          <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white/80 font-bold uppercase">Docs</span>
          <span className="text-sm font-bold font-mono mt-1 flex items-center justify-between">
            MD <FileText className="w-4 h-4 text-purple-600 group-hover:text-white" />
          </span>
        </button>

        <button
          onClick={() => handleDownload("pdf")}
          className="p-3 rounded-2xl bg-neutral-100 hover:bg-rose-600 hover:text-white border border-neutral-200 text-left transition-all duration-200 group flex flex-col justify-between"
        >
          <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white/80 font-bold uppercase">Print</span>
          <span className="text-sm font-bold font-mono mt-1 flex items-center justify-between">
            PDF <File className="w-4 h-4 text-rose-600 group-hover:text-white" />
          </span>
        </button>

        <button
          onClick={() => handleDownload("docx")}
          className="p-3 rounded-2xl bg-neutral-100 hover:bg-blue-600 hover:text-white border border-neutral-200 text-left transition-all duration-200 group flex flex-col justify-between"
        >
          <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white/80 font-bold uppercase">Word</span>
          <span className="text-sm font-bold font-mono mt-1 flex items-center justify-between">
            DOCX <File className="w-4 h-4 text-blue-600 group-hover:text-white" />
          </span>
        </button>
      </div>
    </div>
  );
};
