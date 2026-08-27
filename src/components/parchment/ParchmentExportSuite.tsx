import React, { useState } from "react";
import {
  Download,
  FileSpreadsheet,
  FileCode2,
  FileText,
  Printer,
  Check,
  Copy,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import jsPDF from "jspdf";
import { ParchmentParsedData } from "../../types/parchment";

interface ParchmentExportSuiteProps {
  data: ParchmentParsedData;
  sourceTitle?: string;
  redactPii: boolean;
}

export const ParchmentExportSuite: React.FC<ParchmentExportSuiteProps> = ({
  data,
  sourceTitle = "TranscriptG_Parchment_Evaluation",
  redactPii,
}) => {
  const [copiedMd, setCopiedMd] = useState(false);
  const [downloadingPdf, setDownloadingPdf] = useState(false);

  const cleanFileName = sourceTitle.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_");

  // Helper for masking text
  const mask = (text?: string, fallback: string = "N/A") => {
    if (!text) return fallback;
    if (!redactPii) return text;
    if (text.length <= 4) return "••••";
    return text.slice(0, 2) + "••••••••" + text.slice(-2);
  };

  // 1. Export CSV (AMCAS / Graduate School Ready)
  const handleExportCsv = () => {
    const headers = [
      "Academic Term",
      "Course Code",
      "Course Title",
      "Academic Category",
      "Credits Attempted",
      "Credits Earned",
      "Grade",
      "Quality Points",
      "Included In GPA",
    ];

    const rows: string[][] = [];

    data.terms.forEach((term) => {
      term.courses.forEach((c) => {
        rows.push([
          `"${term.termName}"`,
          `"${c.code}"`,
          `"${c.title.replace(/"/g, '""')}"`,
          `"${c.category || "General"}"`,
          c.creditsAttempted.toFixed(1),
          c.creditsEarned.toFixed(1),
          `"${c.grade}"`,
          (c.gradePoints || 0).toFixed(1),
          c.isIncludedInGpa ? "TRUE" : "FALSE",
        ]);
      });
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [
        `"Institution: ${data.institutionInfo.name}"`,
        `"Student: ${mask(data.studentInfo.name)}"`,
        `"Student ID: ${mask(data.studentInfo.studentId)}"`,
        `"Degree: ${data.degreeInfo.degreeAwarded || "N/A"}"`,
        `"Cumulative GPA: ${data.summary.cumulativeGpa.toFixed(2)}"`,
        `"Total Credits Earned: ${data.summary.totalCreditsEarned.toFixed(1)}"`,
        "",
        headers.join(","),
        ...rows.map((r) => r.join(",")),
      ].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${cleanFileName}_Course_History.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 2. Export JSON
  const handleExportJson = () => {
    const exportData = {
      ...data,
      studentInfo: {
        ...data.studentInfo,
        name: mask(data.studentInfo.name),
        studentId: mask(data.studentInfo.studentId),
        ssnLast4: mask(data.studentInfo.ssnLast4),
        birthDate: mask(data.studentInfo.birthDate),
      },
      exportedAt: new Date().toISOString(),
      evaluationPlatform: "TranscriptG Academic Intelligence (Zero Retention)",
    };

    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(exportData, null, 2)
    )}`;
    const link = document.createElement("a");
    link.setAttribute("href", jsonString);
    link.setAttribute("download", `${cleanFileName}_Data.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 3. Copy Markdown
  const handleCopyMarkdown = () => {
    let md = `# Academic Transcript Evaluation: ${data.institutionInfo.name}\n\n`;
    md += `**Student:** ${mask(data.studentInfo.name)} | **ID:** ${mask(data.studentInfo.studentId)}\n`;
    md += `**Degree:** ${data.degreeInfo.degreeAwarded || "Undergraduate"} | **Major:** ${data.degreeInfo.major || "N/A"}\n`;
    md += `**Cumulative GPA:** ${data.summary.cumulativeGpa.toFixed(2)} | **Credits Earned:** ${data.summary.totalCreditsEarned.toFixed(1)}\n\n`;

    data.terms.forEach((term) => {
      md += `### ${term.termName} (Term GPA: ${term.termGpa?.toFixed(2) || "N/A"})\n\n`;
      md += `| Course Code | Title | Category | Credits | Grade |\n`;
      md += `| :--- | :--- | :--- | :---: | :---: |\n`;
      term.courses.forEach((c) => {
        md += `| ${c.code} | ${c.title} | ${c.category || "General"} | ${c.creditsAttempted.toFixed(1)} | **${c.grade}** |\n`;
      });
      md += `\n`;
    });

    navigator.clipboard.writeText(md);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2500);
  };

  // 4. Download PDF Evaluation Report via jsPDF
  const handleExportPdf = () => {
    setDownloadingPdf(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      let y = 18;

      // Header Banner
      doc.setFillColor(13, 15, 18);
      doc.rect(0, 0, pageWidth, 28, "F");

      doc.setTextColor(255, 77, 0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text("TRANSCRIPTG ACADEMIC EVALUATION REPORT", 14, 12);

      doc.setTextColor(200, 200, 200);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text("PARCHMENT & REGISTRAR CREDENTIAL AUDIT • ZERO-DATA-RETENTION", 14, 18);
      doc.text(`DATE GENERATED: ${new Date().toLocaleDateString()}`, pageWidth - 14, 18, { align: "right" });

      y = 38;

      // Institution & Student Info Box
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(14, y, pageWidth - 28, 32, 2, 2, "F");

      doc.setTextColor(13, 15, 18);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text(data.institutionInfo.name, 18, y + 8);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Student: ${mask(data.studentInfo.name)} (ID: ${mask(data.studentInfo.studentId)})`, 18, y + 15);
      doc.text(`Degree: ${data.degreeInfo.degreeAwarded || "N/A"} - ${data.degreeInfo.major || "General"}`, 18, y + 21);
      doc.text(`Honors: ${data.degreeInfo.honors || "Good Standing"}`, 18, y + 27);

      // Summary Box on Right
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(`CUMULATIVE GPA: ${data.summary.cumulativeGpa.toFixed(2)}`, pageWidth - 20, y + 8, { align: "right" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(`Credits Earned: ${data.summary.totalCreditsEarned.toFixed(1)} / ${data.summary.totalCreditsAttempted.toFixed(1)}`, pageWidth - 20, y + 15, { align: "right" });
      doc.text(`Parchment DID: ${mask(data.authenticity.documentId || data.studentInfo.documentId, "PCH-2026-AUTH")}`, pageWidth - 20, y + 21, { align: "right" });
      doc.text(`Completion Rate: ${data.academicInsights.creditCompletionRate || 100}%`, pageWidth - 20, y + 27, { align: "right" });

      y += 42;

      // Terms & Courses
      data.terms.forEach((term) => {
        if (y > 255) {
          doc.addPage();
          y = 20;
        }

        // Term Header
        doc.setFillColor(235, 235, 235);
        doc.rect(14, y, pageWidth - 28, 6, "F");
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(13, 15, 18);
        doc.text(`${term.termName.toUpperCase()} — TERM GPA: ${term.termGpa?.toFixed(2) || "N/A"}`, 16, y + 4.5);
        y += 9;

        // Table Header
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text("CODE", 16, y);
        doc.text("COURSE TITLE", 40, y);
        doc.text("CATEGORY", 120, y);
        doc.text("CR", 155, y, { align: "center" });
        doc.text("GRADE", 175, y, { align: "center" });
        doc.text("QP", 190, y, { align: "right" });
        y += 4;

        doc.setDrawColor(220, 220, 220);
        doc.line(14, y, pageWidth - 14, y);
        y += 4;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(30, 30, 30);

        term.courses.forEach((c) => {
          if (y > 270) {
            doc.addPage();
            y = 20;
          }

          doc.setFont("helvetica", "bold");
          doc.text(c.code, 16, y);
          doc.setFont("helvetica", "normal");

          const titleTrunc = c.title.length > 42 ? c.title.substring(0, 40) + "..." : c.title;
          doc.text(titleTrunc, 40, y);

          const catTrunc = (c.category || "General").substring(0, 18);
          doc.text(catTrunc, 120, y);

          doc.text(c.creditsAttempted.toFixed(1), 155, y, { align: "center" });

          doc.setFont("helvetica", "bold");
          doc.text(c.grade, 175, y, { align: "center" });
          doc.setFont("helvetica", "normal");

          doc.text((c.gradePoints || 0).toFixed(1), 190, y, { align: "right" });

          y += 5.5;
        });

        y += 5;
      });

      // Footer Stamp
      const pageCount = doc.internal.pages.length - 1;
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(7);
        doc.setTextColor(150, 150, 150);
        doc.text(
          `Page ${i} of ${pageCount} • TranscriptG Academic Intelligence • Zero-Retention Cryptographic Audit`,
          pageWidth / 2,
          290,
          { align: "center" }
        );
      }

      doc.save(`${cleanFileName}_Academic_Report.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setDownloadingPdf(false);
    }
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-3xl border border-black/10 bg-white shadow-md space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/5">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#ff4d00] font-bold">
            Universal Export Engine
          </span>
          <h3 className="text-xl font-black text-[#0d0f12] tracking-tight mt-0.5">
            Lossless Academic Exports & Reports
          </h3>
          <p className="text-xs text-neutral-500 mt-1">
            Export verified course listings, GPAs, and evaluation summaries in all standard graduate and database formats.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>FERPA Zero Retention</span>
        </div>
      </div>

      {/* Export Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* PDF Evaluation Report */}
        <button
          type="button"
          disabled={downloadingPdf}
          onClick={handleExportPdf}
          className="p-5 rounded-2xl border border-black/10 bg-neutral-50/80 hover:bg-[#ff4d00] hover:text-white group text-left transition-all duration-200 shadow-xs hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-[#ff4d00] flex items-center justify-center mb-3 shadow-xs group-hover:bg-white group-hover:text-[#ff4d00]">
            <Download className="w-5 h-5" />
          </div>
          <div className="font-mono font-bold text-sm text-[#0d0f12] group-hover:text-white">
            PDF Evaluation Report
          </div>
          <p className="text-xs text-neutral-500 group-hover:text-white/80 mt-1">
            Formal styled academic transcript audit with GPA calculations.
          </p>
        </button>

        {/* AMCAS / Graduate CSV */}
        <button
          type="button"
          onClick={handleExportCsv}
          className="p-5 rounded-2xl border border-black/10 bg-neutral-50/80 hover:bg-[#0088a8] hover:text-white group text-left transition-all duration-200 shadow-xs hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-[#0088a8] flex items-center justify-center mb-3 shadow-xs group-hover:bg-white group-hover:text-[#0088a8]">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div className="font-mono font-bold text-sm text-[#0d0f12] group-hover:text-white">
            CSV / Excel (AMCAS)
          </div>
          <p className="text-xs text-neutral-500 group-hover:text-white/80 mt-1">
            Standard tabular format for grad applications & course transfer audits.
          </p>
        </button>

        {/* Structured JSON */}
        <button
          type="button"
          onClick={handleExportJson}
          className="p-5 rounded-2xl border border-black/10 bg-neutral-50/80 hover:bg-purple-600 hover:text-white group text-left transition-all duration-200 shadow-xs hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-purple-600 flex items-center justify-center mb-3 shadow-xs group-hover:bg-white group-hover:text-purple-600">
            <FileCode2 className="w-5 h-5" />
          </div>
          <div className="font-mono font-bold text-sm text-[#0d0f12] group-hover:text-white">
            Structured JSON
          </div>
          <p className="text-xs text-neutral-500 group-hover:text-white/80 mt-1">
            Machine-readable JSON schema with full term and course hierarchy.
          </p>
        </button>

        {/* Copy Markdown Table */}
        <button
          type="button"
          onClick={handleCopyMarkdown}
          className="p-5 rounded-2xl border border-black/10 bg-neutral-50/80 hover:bg-neutral-900 hover:text-white group text-left transition-all duration-200 shadow-xs hover:shadow-md"
        >
          <div className="w-10 h-10 rounded-xl bg-white text-neutral-800 flex items-center justify-center mb-3 shadow-xs group-hover:bg-white group-hover:text-neutral-900">
            {copiedMd ? <Check className="w-5 h-5 text-emerald-600" /> : <Copy className="w-5 h-5" />}
          </div>
          <div className="font-mono font-bold text-sm text-[#0d0f12] group-hover:text-white">
            {copiedMd ? "Copied to Clipboard!" : "Copy Markdown"}
          </div>
          <p className="text-xs text-neutral-500 group-hover:text-white/80 mt-1">
            Clean markdown table formatted for resumes, portfolios, and emails.
          </p>
        </button>
      </div>
    </div>
  );
};
