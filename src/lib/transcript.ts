import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

export interface CueSegment {
  id: string;
  start: number; // seconds
  end: number;   // seconds
  text: string;
}

export const SUPPORTED_LANGUAGES: { code: string; name: string }[] = [
  { code: "auto", name: "Auto-detect Language" },
  { code: "en", name: "English" },
  { code: "es", name: "Spanish (Español)" },
  { code: "fr", name: "French (Français)" },
  { code: "de", name: "German (Deutsch)" },
  { code: "it", name: "Italian (Italiano)" },
  { code: "pt", name: "Portuguese (Português)" },
  { code: "nl", name: "Dutch (Nederlands)" },
  { code: "ru", name: "Russian (Русский)" },
  { code: "zh", name: "Chinese (Mandarin / 中文)" },
  { code: "ja", name: "Japanese (日本語)" },
  { code: "ko", name: "Korean (한국어)" },
  { code: "ar", name: "Arabic (العربية)" },
  { code: "hi", name: "Hindi (हिन्दी)" },
  { code: "bn", name: "Bengali (বাংলা)" },
  { code: "pa", name: "Punjabi (ਪੰਜਾਬੀ)" },
  { code: "tr", name: "Turkish (Türkçe)" },
  { code: "vi", name: "Vietnamese (Tiếng Việt)" },
  { code: "pl", name: "Polish (Polski)" },
  { code: "uk", name: "Ukrainian (Українська)" },
  { code: "fa", name: "Persian (فارسی)" },
  { code: "ro", name: "Romanian (Română)" },
  { code: "el", name: "Greek (Ελληνικά)" },
  { code: "hu", name: "Hungarian (Magyar)" },
  { code: "sv", name: "Swedish (Svenska)" },
  { code: "cs", name: "Czech (Čeština)" },
  { code: "nl-BE", name: "Flemish" },
  { code: "fi", name: "Finnish (Suomi)" },
  { code: "no", name: "Norwegian (Norsk)" },
  { code: "da", name: "Danish (Dansk)" },
  { code: "he", name: "Hebrew (עברית)" },
  { code: "id", name: "Indonesian (Bahasa Indonesia)" },
  { code: "ms", name: "Malay (Bahasa Melayu)" },
  { code: "th", name: "Thai (ไทย)" },
  { code: "fil", name: "Filipino / Tagalog" },
  { code: "sw", name: "Swahili (Kiswahili)" },
  { code: "af", name: "Afrikaans" },
  { code: "sq", name: "Albanian (Shqip)" },
  { code: "am", name: "Amharic (አማርኛ)" },
  { code: "hy", name: "Armenian (Հայերեն)" },
  { code: "az", name: "Azerbaijani (Azərbaycan)" },
  { code: "eu", name: "Basque (Euskara)" },
  { code: "be", name: "Belarusian (Беларуская)" },
  { code: "bs", name: "Bosnian (Bosanski)" },
  { code: "bg", name: "Bulgarian (Български)" },
  { code: "my", name: "Burmese (မြန်မာ)" },
  { code: "ca", name: "Catalan (Català)" },
  { code: "hr", name: "Croatian (Hrvatski)" },
  { code: "et", name: "Estonian (Eesti)" },
  { code: "gl", name: "Galician (Galego)" },
  { code: "ka", name: "Georgian (ქართული)" },
  { code: "gu", name: "Gujarati (ગુજરાતી)" },
  { code: "ha", name: "Hausa" },
  { code: "is", name: "Icelandic (Íslenska)" },
  { code: "ig", name: "Igbo" },
  { code: "ga", name: "Irish (Gaeilge)" },
  { code: "jv", name: "Javanese" },
  { code: "kn", name: "Kannada (ಕನ್ನಡ)" },
  { code: "kk", name: "Kazakh (Қазақ)" },
  { code: "km", name: "Khmer (ភាសាខ្មែរ)" },
  { code: "ky", name: "Kyrgyz (Кыргызча)" },
  { code: "lo", name: "Lao (ພາສາລາວ)" },
  { code: "la", name: "Latin" },
  { code: "lv", name: "Latvian (Latviešu)" },
  { code: "lt", name: "Lithuanian (Lietuvių)" },
  { code: "mk", name: "Macedonian (Македонски)" },
  { code: "mg", name: "Malagasy" },
  { code: "ml", name: "Malayalam (മലയാളം)" },
  { code: "mt", name: "Maltese" },
  { code: "mr", name: "Marathi (मराठी)" },
  { code: "mn", name: "Mongolian (Монгол)" },
  { code: "ne", name: "Nepali (नेपाली)" },
  { code: "ps", name: "Pashto (پښتو)" },
  { code: "sr", name: "Serbian (Српски)" },
  { code: "si", name: "Sinhala (සිංහල)" },
  { code: "sk", name: "Slovak (Slovenčina)" },
  { code: "sl", name: "Slovenian (Slovenščina)" },
  { code: "so", name: "Somali (Soomaali)" },
  { code: "su", name: "Sundanese" },
  { code: "ta", name: "Tamil (தமிழ்)" },
  { code: "te", name: "Telugu (తెలుగు)" },
  { code: "ur", name: "Urdu (اردو)" },
  { code: "uz", name: "Uzbek (Oʻzbek)" },
  { code: "cy", name: "Welsh (Cymraeg)" },
  { code: "xh", name: "Xhosa" },
  { code: "yi", name: "Yiddish (ייִדיש)" },
  { code: "yo", name: "Yoruba" },
  { code: "zu", name: "Zulu" },
  { code: "km-KH", name: "Khmer (Cambodia)" },
  { code: "lb", name: "Luxembourgish" },
  { code: "mt-MT", name: "Maltese (Malta)" },
  { code: "mi", name: "Maori" },
  { code: "sa", name: "Sanskrit" },
  { code: "gd", name: "Scottish Gaelic" },
  { code: "sn", name: "Shona" },
  { code: "sd", name: "Sindhi" },
  { code: "tg", name: "Tajik" },
  { code: "tk", name: "Turkmen" },
  { code: "tt", name: "Tatar" }
];

// Time conversions
export function secondsToSrtTime(seconds: number): string {
  const pad = (num: number, size = 2) => String(num).padStart(size, "0");
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const millis = Math.floor((seconds % 1) * 1000);
  return `${pad(hrs)}:${pad(mins)}:${pad(secs)},${pad(millis, 3)}`;
}

export function secondsToVttTime(seconds: number): string {
  return secondsToSrtTime(seconds).replace(",", ".");
}

export function formatTimeDisplay(seconds: number): string {
  const pad = (num: number) => String(num).padStart(2, "0");
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  if (hrs > 0) {
    return `${hrs}:${pad(mins)}:${pad(secs)}`;
  }
  return `${mins}:${pad(secs)}`;
}

export const formatTime = formatTimeDisplay;
export const exportToSrt = exportToSRT;
export const exportToVtt = exportToVTT;
export const exportToTxt = (segments: CueSegment[], withTimestamps: boolean = false): string => {
  if (!withTimestamps) return exportToTXT(segments);
  return segments
    .map((s) => `[${formatTimeDisplay(s.start)}] ${s.text}`)
    .join("\n");
};
export const exportToJson = exportToJSON;

export function parseSrtTimeToSeconds(timeStr: string): number {
  if (!timeStr) return 0;
  const cleaned = timeStr.replace(",", ".").trim();
  const parts = cleaned.split(":");
  if (parts.length === 3) {
    const hrs = parseFloat(parts[0]);
    const mins = parseFloat(parts[1]);
    const secs = parseFloat(parts[2]);
    return hrs * 3600 + mins * 60 + secs;
  } else if (parts.length === 2) {
    const mins = parseFloat(parts[0]);
    const secs = parseFloat(parts[1]);
    return mins * 60 + secs;
  }
  return parseFloat(cleaned) || 0;
}

// Format detection
export function detectFormat(content: string): "srt" | "vtt" | "json" | "txt" {
  const trimmed = content.trim();
  if (trimmed.startsWith("WEBVTT")) return "vtt";
  if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
    try {
      JSON.parse(trimmed);
      return "json";
    } catch {
      // not json
    }
  }
  // SRT check: matches "1\n00:00:00" or similar
  const srtPattern = /^\d+\s*\n\d{2}:\d{2}:\d{2}[,.]\d{3}\s*-->/m;
  if (srtPattern.test(trimmed)) return "srt";

  return "txt";
}

// Parsers
export function parseSRT(content: string): CueSegment[] {
  const normalized = content.replace(/\r\n/g, "\n").trim();
  const blocks = normalized.split(/\n\s*\n/);
  const segments: CueSegment[] = [];

  blocks.forEach((block, index) => {
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length < 2) return;

    // Time line is usually index 1 if index 0 is sequence number
    let timeLineIndex = 0;
    if (/^\d+$/.test(lines[0]) && lines.length >= 2) {
      timeLineIndex = 1;
    }

    const timeLine = lines[timeLineIndex];
    if (timeLine && timeLine.includes("-->")) {
      const [startStr, endStr] = timeLine.split("-->").map((s) => s.trim());
      const textLines = lines.slice(timeLineIndex + 1);
      const start = parseSrtTimeToSeconds(startStr);
      const end = parseSrtTimeToSeconds(endStr);
      const text = textLines.join(" ");

      if (text) {
        segments.push({
          id: `cue-${index + 1}`,
          start,
          end,
          text,
        });
      }
    }
  });

  return segments;
}

export function parseVTT(content: string): CueSegment[] {
  const normalized = content.replace(/^WEBVTT[^\n]*\n/i, "").replace(/\r\n/g, "\n").trim();
  return parseSRT(normalized);
}

export function parseJSON(content: string): CueSegment[] {
  try {
    const parsed = JSON.parse(content);
    const list = Array.isArray(parsed) ? parsed : parsed.segments || [];
    return list.map((item: any, idx: number) => ({
      id: item.id || `cue-${idx + 1}`,
      start: typeof item.start === "number" ? item.start : parseSrtTimeToSeconds(item.start || "0"),
      end: typeof item.end === "number" ? item.end : parseSrtTimeToSeconds(item.end || "0"),
      text: item.text || item.content || "",
    }));
  } catch {
    return [];
  }
}

export function parseTXT(content: string): CueSegment[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n").filter((l) => l.trim().length > 0);
  let currentTime = 0;
  return lines.map((line, idx) => {
    const duration = Math.max(2, Math.min(10, line.length * 0.1));
    const start = currentTime;
    const end = currentTime + duration;
    currentTime = end + 0.5;
    return {
      id: `cue-${idx + 1}`,
      start: Math.round(start * 10) / 10,
      end: Math.round(end * 10) / 10,
      text: line.trim(),
    };
  });
}

// Exporters
export function exportToSRT(segments: CueSegment[]): string {
  return segments
    .map((seg, idx) => {
      return `${idx + 1}\n${secondsToSrtTime(seg.start)} --> ${secondsToSrtTime(seg.end)}\n${seg.text}\n`;
    })
    .join("\n");
}

export function exportToVTT(segments: CueSegment[]): string {
  const body = segments
    .map((seg, idx) => {
      return `${idx + 1}\n${secondsToVttTime(seg.start)} --> ${secondsToVttTime(seg.end)}\n${seg.text}\n`;
    })
    .join("\n");
  return `WEBVTT - Exported by TranscriptG\n\n${body}`;
}

export function exportToTXT(segments: CueSegment[]): string {
  return segments.map((seg) => seg.text).join("\n\n");
}

export function exportToJSON(segments: CueSegment[]): string {
  return JSON.stringify(segments, null, 2);
}

export function exportToMarkdown(segments: CueSegment[], title = "Transcript", summary = ""): string {
  let md = `# ${title}\n\n`;
  if (summary) {
    md += `> **AI Executive Summary:**\n> ${summary}\n\n---\n\n`;
  }
  segments.forEach((seg) => {
    md += `**[${formatTimeDisplay(seg.start)} - ${formatTimeDisplay(seg.end)}]**\n${seg.text}\n\n`;
  });
  return md;
}

export function downloadBlob(content: BlobPart, fileName: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function exportToPDF(segments: CueSegment[], title = "TranscriptG Report", summary = "") {
  const doc = new jsPDF();
  let y = 15;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(title, 14, y);
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100);
  doc.text(`Generated by TranscriptG · ${new Date().toLocaleDateString()}`, 14, y);
  y += 10;

  if (summary) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(255, 77, 0); // orange
    doc.text("AI Summary:", 14, y);
    y += 6;

    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.setTextColor(50);
    const summaryLines = doc.splitTextToSize(summary, 180);
    doc.text(summaryLines, 14, y);
    y += summaryLines.length * 5 + 6;
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.text("Transcript Cues:", 14, y);
  y += 8;

  segments.forEach((seg) => {
    if (y > 270) {
      doc.addPage();
      y = 15;
    }

    const timeHeader = `[${formatTimeDisplay(seg.start)} - ${formatTimeDisplay(seg.end)}]`;
    doc.setFont("courier", "bold");
    doc.setFontSize(9);
    doc.setTextColor(120);
    doc.text(timeHeader, 14, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(20);
    const textLines = doc.splitTextToSize(seg.text, 180);
    doc.text(textLines, 14, y);
    y += textLines.length * 5 + 4;
  });

  doc.save(`${title.toLowerCase().replace(/\s+/g, "_")}.pdf`);
}

export function exportToDOCX(segments: CueSegment[], title = "TranscriptG Report", summary = "") {
  const children: any[] = [
    new Paragraph({
      text: title,
      heading: HeadingLevel.HEADING_1,
    }),
    new Paragraph({
      children: [
        new TextRun({
          text: `Generated by TranscriptG on ${new Date().toLocaleDateString()} | Free Privacy-First Platform`,
          italics: true,
          size: 18,
          color: "666666",
        }),
      ],
    }),
    new Paragraph({ text: "" }),
  ];

  if (summary) {
    children.push(
      new Paragraph({
        text: "AI Executive Summary",
        heading: HeadingLevel.HEADING_2,
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: summary,
            italics: true,
          }),
        ],
      }),
      new Paragraph({ text: "" })
    );
  }

  children.push(
    new Paragraph({
      text: "Manuscript Cues",
      heading: HeadingLevel.HEADING_2,
    })
  );

  segments.forEach((seg) => {
    children.push(
      new Paragraph({
        children: [
          new TextRun({
            text: `[${formatTimeDisplay(seg.start)} - ${formatTimeDisplay(seg.end)}] `,
            bold: true,
            color: "FF4D00",
            size: 18,
          }),
        ],
      }),
      new Paragraph({
        children: [
          new TextRun({
            text: seg.text,
            size: 22,
          }),
        ],
      }),
      new Paragraph({ text: "" })
    );
  });

  const doc = new Document({
    sections: [{ properties: {}, children }],
  });

  Packer.toBlob(doc).then((blob) => {
    downloadBlob(blob, `${title.toLowerCase().replace(/\s+/g, "_")}.docx`, "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  });
}

// Sample SRT data for format conversion demo
export const SAMPLE_SRT = `1
00:00:00,500 --> 00:00:04,200
Welcome to TranscriptG, the high-precision audio and speech-to-text processing laboratory.

2
00:00:04,500 --> 00:00:09,100
We engineer sub-second transcription with millisecond-aligned timecodes, speaker tags, and AI intelligence.

3
00:00:09,500 --> 00:00:14,400
All media streams are processed in ephemeral RAM with zero permanent storage, ensuring complete user privacy.

4
00:00:14,800 --> 00:00:19,600
Export freely to SubRip (.SRT), WebVTT (.VTT), Microsoft Word (.DOCX), PDF, Markdown, and structured JSON.`;

export const SAMPLE_SEGMENTS: CueSegment[] = [
  {
    id: "seg-1",
    start: 0.5,
    end: 4.2,
    text: "Welcome to TranscriptG, the high-precision audio and speech-to-text processing laboratory.",
  },
  {
    id: "seg-2",
    start: 4.5,
    end: 9.1,
    text: "We engineer sub-second transcription with millisecond-aligned timecodes, speaker tags, and AI intelligence.",
  },
  {
    id: "seg-3",
    start: 9.5,
    end: 14.4,
    text: "All media streams are processed in ephemeral RAM with zero permanent storage, ensuring complete user privacy.",
  },
  {
    id: "seg-4",
    start: 14.8,
    end: 19.6,
    text: "Export freely to SubRip (.SRT), WebVTT (.VTT), Microsoft Word (.DOCX), PDF, Markdown, and structured JSON.",
  },
];

export const SAMPLE_SUMMARY =
  "An architectural briefing highlighting TranscriptG's high-speed acoustic transcription engine, zero-retention ephemeral privacy guarantees, and universal export suite supporting SRT, VTT, DOCX, and PDF formats across 90+ spoken languages.";

export const SAMPLE_PROCESS_TEXT = `Team Meeting Notes — Project Velocity & Acoustic Pipeline Deployment:

During today's architectural review, the speech engineering group finalized the zero-retention memory processing pipeline. Key breakthroughs include sub-second Mel-spectrogram generation and 99.4% Word Error Rate accuracy across accented speech.

Action Items:
1. Elena to finalize the WebVTT parser edge-case test suite by Thursday.
2. Marcus to optimize Web Audio API mono downsampling for 16kHz audio buffers.
3. Sarah to deploy updated ADA Section 508 accessibility compliance documentation.

The team agreed to maintain 100% public access with no mandatory login requirements.`;

