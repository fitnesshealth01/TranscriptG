import React, { useState } from "react";
import {
  Download,
  FileText,
  FileCode,
  Check,
  Share2,
  Sparkles,
  Printer,
  Copy,
} from "lucide-react";
import { YouTubeTranscriptData } from "../../types/youtube";
import { formatTime, exportToSrt, exportToVtt, exportToJson, exportToTxt } from "../../lib/transcript";
import { jsPDF } from "jspdf";

interface YouTubeExportSuiteProps {
  data: YouTubeTranscriptData;
}

export const YouTubeExportSuite: React.FC<YouTubeExportSuiteProps> = ({ data }) => {
  const [downloadedFormat, setDownloadedFormat] = useState<string | null>(null);

  const cleanFileName = (data.metadata.title || "youtube-transcript")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .slice(0, 50);

  const triggerDownload = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 1. Download SRT
  const handleExportSrt = () => {
    const srtContent = exportToSrt(data.segments);
    triggerDownload(srtContent, `${cleanFileName}.srt`, "text/plain");
    showDownloadedFeedback("srt");
  };

  // 2. Download VTT
  const handleExportVtt = () => {
    const vttContent = exportToVtt(data.segments);
    triggerDownload(vttContent, `${cleanFileName}.vtt`, "text/vtt");
    showDownloadedFeedback("vtt");
  };

  // 3. Download TXT (Plain or Timestamps)
  const handleExportTxt = (withTimestamps: boolean) => {
    const txtContent = exportToTxt(data.segments, withTimestamps);
    triggerDownload(
      txtContent,
      `${cleanFileName}${withTimestamps ? "-timestamps" : ""}.txt`,
      "text/plain"
    );
    showDownloadedFeedback(withTimestamps ? "txt-ts" : "txt");
  };

  // 4. Download JSON
  const handleExportJson = () => {
    const jsonContent = JSON.stringify(
      {
        metadata: data.metadata,
        language: data.languageDetected,
        source: data.source,
        summary: data.aiGeneratedDetails?.summary,
        keyTakeaways: data.aiGeneratedDetails?.keyTakeaways,
        chapters: data.aiGeneratedDetails?.chapters,
        segments: data.segments,
      },
      null,
      2
    );
    triggerDownload(jsonContent, `${cleanFileName}.json`, "application/json");
    showDownloadedFeedback("json");
  };

  // 5. Download Markdown (.md)
  const handleExportMarkdown = () => {
    let md = `# ${data.metadata.title}\n\n`;
    md += `**Channel / Creator:** ${data.metadata.authorName}\n`;
    md += `**Video URL:** ${data.metadata.url}\n`;
    md += `**Transcript Source:** ${data.source}\n\n`;

    if (data.aiGeneratedDetails?.summary) {
      md += `## Executive Summary\n${data.aiGeneratedDetails.summary}\n\n`;
    }

    if (data.aiGeneratedDetails?.keyTakeaways && data.aiGeneratedDetails.keyTakeaways.length > 0) {
      md += `## Key Takeaways\n`;
      data.aiGeneratedDetails.keyTakeaways.forEach((t) => {
        md += `- ${t}\n`;
      });
      md += `\n`;
    }

    if (data.aiGeneratedDetails?.chapters && data.aiGeneratedDetails.chapters.length > 0) {
      md += `## Chapters\n`;
      data.aiGeneratedDetails.chapters.forEach((c) => {
        md += `- **[${formatTime(c.startTime)}]** ${c.title}${c.summary ? `: ${c.summary}` : ""}\n`;
      });
      md += `\n`;
    }

    md += `## Full Timestamped Transcript\n\n`;
    data.segments.forEach((s) => {
      md += `**[${formatTime(s.start)}]** ${s.speaker ? `*${s.speaker}*: ` : ""}${s.text}\n\n`;
    });

    triggerDownload(md, `${cleanFileName}.md`, "text/markdown");
    showDownloadedFeedback("md");
  };

  // 6. Download PDF
  const handleExportPdf = () => {
    try {
      const doc = new jsPDF();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text("YouTube Video Transcript", 14, 20);

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`Title: ${data.metadata.title.slice(0, 70)}`, 14, 30);
      doc.text(`Creator: ${data.metadata.authorName}`, 14, 37);
      doc.text(`Word Count: ${data.wordCount} | Language: ${data.languageDetected}`, 14, 44);

      let y = 54;

      if (data.aiGeneratedDetails?.summary) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.text("Executive Summary:", 14, y);
        y += 6;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(9);
        const splitSummary = doc.splitTextToSize(data.aiGeneratedDetails.summary, 180);
        doc.text(splitSummary, 14, y);
        y += splitSummary.length * 5 + 6;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text("Timestamped Transcript:", 14, y);
      y += 8;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);

      for (let i = 0; i < data.segments.length; i++) {
        if (y > 275) {
          doc.addPage();
          y = 20;
        }
        const s = data.segments[i];
        const line = `[${formatTime(s.start)}] ${s.speaker ? s.speaker + ": " : ""}${s.text}`;
        const splitLine = doc.splitTextToSize(line, 180);
        doc.text(splitLine, 14, y);
        y += splitLine.length * 4.5 + 2;
      }

      doc.save(`${cleanFileName}.pdf`);
      showDownloadedFeedback("pdf");
    } catch (e) {
      console.error("PDF export error:", e);
      alert("Failed to create PDF. You can export as Markdown or TXT.");
    }
  };

  const showDownloadedFeedback = (fmt: string) => {
    setDownloadedFormat(fmt);
    setTimeout(() => setDownloadedFormat(null), 2000);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/5">
        <div>
          <h2 className="text-lg font-black text-[#0d0f12] tracking-tight">
            Universal Subtitle & Transcript Export Suite
          </h2>
          <p className="text-xs text-neutral-500">
            Export in studio-grade caption formats compatible with Premiere Pro, DaVinci Resolve, Notion & YouTube Studio
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <span>Zero Watermarks • 100% Free</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* SRT */}
        <button
          onClick={handleExportSrt}
          className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-black/5 hover:border-black/15 transition-all text-center group flex flex-col items-center justify-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0d0f12]">.SRT Subtitle</div>
            <div className="text-[10px] font-mono text-neutral-400">SubRip standard</div>
          </div>
          {downloadedFormat === "srt" ? (
            <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-0.5">
              <Check className="w-3 h-3" /> Saved!
            </span>
          ) : (
            <span className="text-[10px] font-mono text-neutral-500 group-hover:text-[#0d0f12]">
              Download
            </span>
          )}
        </button>

        {/* VTT */}
        <button
          onClick={handleExportVtt}
          className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-black/5 hover:border-black/15 transition-all text-center group flex flex-col items-center justify-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-[#0088a8] flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0d0f12]">.VTT Captions</div>
            <div className="text-[10px] font-mono text-neutral-400">HTML5 WebVTT</div>
          </div>
          {downloadedFormat === "vtt" ? (
            <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-0.5">
              <Check className="w-3 h-3" /> Saved!
            </span>
          ) : (
            <span className="text-[10px] font-mono text-neutral-500 group-hover:text-[#0d0f12]">
              Download
            </span>
          )}
        </button>

        {/* Plain Text */}
        <button
          onClick={() => handleExportTxt(false)}
          className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-black/5 hover:border-black/15 transition-all text-center group flex flex-col items-center justify-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-neutral-500/10 text-neutral-700 flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0d0f12]">.TXT (Plain)</div>
            <div className="text-[10px] font-mono text-neutral-400">Clean reading text</div>
          </div>
          {downloadedFormat === "txt" ? (
            <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-0.5">
              <Check className="w-3 h-3" /> Saved!
            </span>
          ) : (
            <span className="text-[10px] font-mono text-neutral-500 group-hover:text-[#0d0f12]">
              Download
            </span>
          )}
        </button>

        {/* Markdown */}
        <button
          onClick={handleExportMarkdown}
          className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-black/5 hover:border-black/15 transition-all text-center group flex flex-col items-center justify-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0d0f12]">.MD Markdown</div>
            <div className="text-[10px] font-mono text-neutral-400">Notion & Obsidian</div>
          </div>
          {downloadedFormat === "md" ? (
            <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-0.5">
              <Check className="w-3 h-3" /> Saved!
            </span>
          ) : (
            <span className="text-[10px] font-mono text-neutral-500 group-hover:text-[#0d0f12]">
              Download
            </span>
          )}
        </button>

        {/* JSON */}
        <button
          onClick={handleExportJson}
          className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-black/5 hover:border-black/15 transition-all text-center group flex flex-col items-center justify-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <FileCode className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0d0f12]">.JSON Data</div>
            <div className="text-[10px] font-mono text-neutral-400">API structure</div>
          </div>
          {downloadedFormat === "json" ? (
            <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-0.5">
              <Check className="w-3 h-3" /> Saved!
            </span>
          ) : (
            <span className="text-[10px] font-mono text-neutral-500 group-hover:text-[#0d0f12]">
              Download
            </span>
          )}
        </button>

        {/* PDF */}
        <button
          onClick={handleExportPdf}
          className="p-4 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-black/5 hover:border-black/15 transition-all text-center group flex flex-col items-center justify-center gap-2 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Printer className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-[#0d0f12]">.PDF Report</div>
            <div className="text-[10px] font-mono text-neutral-400">Styled document</div>
          </div>
          {downloadedFormat === "pdf" ? (
            <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-0.5">
              <Check className="w-3 h-3" /> Saved!
            </span>
          ) : (
            <span className="text-[10px] font-mono text-neutral-500 group-hover:text-[#0d0f12]">
              Download
            </span>
          )}
        </button>
      </div>
    </div>
  );
};
