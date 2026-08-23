import { BlogArticle } from "./types";

export const article13_developerSubtitleParsing: BlogArticle = {
  slug: "developer-guide-parsing-srt-vtt-json-subtitles-javascript-python",
  title: "Developer Guide: Parsing SRT, WebVTT & JSON Subtitles in TypeScript, JavaScript & Python",
  metaTitle: "Developer Guide: Parsing SRT, WebVTT & JSON in TS, JS & Python",
  metaDescription: "A comprehensive developer guide with production-ready TypeScript, JavaScript, and Python code to parse, validate, and convert SRT and WebVTT subtitle files.",
  keywords: "parse SRT javascript, parse WebVTT typescript, python srt parser regex, convert srt to json, subtitle parsing algorithms, webvtt regex parser",
  category: "Engineering",
  readTime: "17 min read",
  date: "August 2026",
  author: "TranscriptG Developer Relations Group",
  authorRole: "Full-Stack Engineers & Open Source Maintainers",
  summary: "A production engineering tutorial providing robust regular expressions, timecode conversion algorithms, and edge-case handling for parsing SRT, WebVTT, and JSON subtitle formats.",
  tableOfContents: [
    { id: "the-parsing-challenge", title: "1. The Hidden Complexity of Subtitle Parsing" },
    { id: "timecode-math", title: "2. Timecode Mathematics: Milliseconds to HH:MM:SS" },
    { id: "typescript-srt-parser", title: "3. Complete TypeScript / JavaScript SRT Parser" },
    { id: "typescript-vtt-parser", title: "4. Complete TypeScript WebVTT Parser" },
    { id: "python-subtitle-parser", title: "5. Production Python 3 Subtitle Parser" },
    { id: "edge-cases-validation", title: "6. Handling Malformed Cues, BOM & UTF-8 Edge Cases" },
    { id: "faqs", title: "7. Frequently Asked Questions" },
  ],
  content: `
## The Hidden Complexity of Subtitle Parsing

To the casual developer, subtitle formats like SubRip (.SRT) and WebVTT (.VTT) appear deceptively simple. After all, they are just plain text files containing numbers, timestamps, and lines of dialogue.

In production environments, however, naive string-splitting implementations quickly crash when encountering real-world edge cases:
- Inconsistent line breaks (\`\\r\\n\` vs. \`\\n\`)
- Byte Order Marks (UTF-8 BOM) at the beginning of files
- Missing sequential cue numbers or blank lines
- Commas (\`,\`) vs. periods (\`.\`) in millisecond delimiters
- Multiline subtitle text containing embedded HTML/VTT tags

In this developer guide, we provide robust, production-tested parsers in **TypeScript/JavaScript** and **Python 3**.

---

## 1. Timecode Mathematics: Milliseconds to HH:MM:SS

Converting between human-readable timestamp strings (\`01:23:45,678\`) and floating-point seconds (\`5025.678\`) requires precise arithmetic:

### TypeScript Timecode Conversion Utilities

\`\`\`typescript
/** Converts "HH:MM:SS,mmm" or "HH:MM:SS.mmm" to total seconds */
export function parseTimestampToSeconds(timestamp: string): number {
  const normalized = timestamp.trim().replace(",", ".");
  const parts = normalized.split(":");
  
  if (parts.length === 3) {
    const hours = parseFloat(parts[0]);
    const minutes = parseFloat(parts[1]);
    const seconds = parseFloat(parts[2]);
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    const minutes = parseFloat(parts[0]);
    const seconds = parseFloat(parts[1]);
    return minutes * 60 + seconds;
  }
  return 0;
}

/** Formats seconds into "HH:MM:SS,mmm" (SRT) or "HH:MM:SS.mmm" (VTT) */
export function formatSecondsToTimestamp(totalSeconds: number, delimiter: "," | "." = ","): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const millis = Math.round((totalSeconds % 1) * 1000);

  const pad = (n: number, size = 2) => n.toString().padStart(size, "0");
  return \`\${pad(hours)}:\${pad(minutes)}:\${pad(seconds)}\${delimiter}\${pad(millis, 3)}\`;
}
\`\`\`

---

## 2. Complete TypeScript / JavaScript SRT Parser

\`\`\`typescript
export interface SubtitleCue {
  id: number;
  start: string;
  end: string;
  startSeconds: number;
  endSeconds: number;
  text: string;
}

export function parseSRT(srtContent: string): SubtitleCue[] {
  // Normalize line breaks and strip UTF-8 BOM
  const cleanContent = srtContent.replace(/^\\uFEFF/, "").replace(/\\r\\n|\\r/g, "\\n").trim();
  const blocks = cleanContent.split(/\\n\\n+/);
  const cues: SubtitleCue[] = [];

  const timecodeRegex = /(\\d{1,2}:\\d{2}:\\d{2}[,\\.]\\d{3})\\s*-->\\s*(\\d{1,2}:\\d{2}:\\d{2}[,\\.]\\d{3})/;

  for (const block of blocks) {
    const lines = block.split("\\n").map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) continue;

    let timecodeLineIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (timecodeRegex.test(lines[i])) {
        timecodeLineIndex = i;
        break;
      }
    }

    if (timecodeLineIndex === -1) continue;

    const match = lines[timecodeLineIndex].match(timecodeRegex);
    if (!match) continue;

    const id = timecodeLineIndex > 0 ? parseInt(lines[0], 10) || cues.length + 1 : cues.length + 1;
    const start = match[1].replace(".", ",");
    const end = match[2].replace(".", ",");
    const text = lines.slice(timecodeLineIndex + 1).join("\\n");

    cues.push({
      id,
      start,
      end,
      startSeconds: parseTimestampToSeconds(start),
      endSeconds: parseTimestampToSeconds(end),
      text,
    });
  }

  return cues;
}
\`\`\`

---

## 3. Production Python 3 Subtitle Parser

\`\`\`python
import re
from typing import List, Dict, Any

TIMECODE_RE = re.compile(r"(\d{1,2}:\d{2}:\d{2}[,\.]\d{3})\s*-->\s*(\d{1,2}:\d{2}:\d{2}[,\.]\d{3})")

def parse_timestamp_to_seconds(ts: str) -> float:
    normalized = ts.strip().replace(",", ".")
    parts = normalized.split(":")
    if len(parts) == 3:
        return float(parts[0]) * 3600 + float(parts[1]) * 60 + float(parts[2])
    return 0.0

def parse_srt(content: str) -> List[Dict[str, Any]]:
    clean = content.replace("\ufeff", "").replace("\r\n", "\n").strip()
    blocks = re.split(r"\n\n+", clean)
    cues = []

    for block in blocks:
        lines = [line.strip() for line in block.split("\n") if line.strip()]
        if not lines:
            continue
        
        tc_idx = next((i for i, l in enumerate(lines) if TIMECODE_RE.search(l)), -1)
        if tc_idx == -1:
            continue

        match = TIMECODE_RE.search(lines[tc_idx])
        start, end = match.group(1), match.group(2)
        text = "\n".join(lines[tc_idx + 1:])

        cues.append({
            "id": len(cues) + 1,
            "start": start,
            "end": end,
            "start_seconds": parse_timestamp_to_seconds(start),
            "end_seconds": parse_timestamp_to_seconds(end),
            "text": text
        })

    return cues
\`\`\`
  `,
  faqs: [
    { q: "How do I handle both comma and period millisecond delimiters in one parser?", a: "Always normalize timestamps by replacing commas with periods before parsing or splitting, then re-format with the required delimiter during export." },
    { q: "Can TranscriptG export subtitles directly as JSON arrays?", a: "Yes. In TranscriptG Engine 01 or Engine 02, you can export structured JSON containing millisecond timestamps, speaker tags, and cue text directly." },
  ],
};
