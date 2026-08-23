import { BlogArticle } from "./types";

export const article13_developerSubtitleParsing: BlogArticle = {
  slug: "developer-guide-parsing-srt-vtt-json-subtitles",
  title: "Developer's Guide: Parsing & Manipulating SRT, WebVTT & JSON Subtitles in TypeScript & Python",
  metaTitle: "Developer Guide: Parsing SRT, WebVTT & JSON Subtitles (TypeScript/Python)",
  metaDescription: "Full developer tutorial on parsing, validating, and manipulating SRT, WebVTT, and JSON subtitle formats with clean TypeScript and Python code examples.",
  keywords: "parse SRT TypeScript, parse WebVTT Python, subtitle parser regex, timecode conversion JavaScript, subtitle format manipulation, JSON transcript parser",
  category: "Engineering",
  readTime: "14 min read",
  date: "August 2026",
  author: "TranscriptG Developer Relations",
  authorRole: "Core SDK & Open-Source Tooling Group",
  summary: "A practical guide for software engineers building subtitle parsers, video editors, and audio synchronization tools. Includes production-ready TypeScript and Python parsers, timecode converters, and regex patterns.",
  tableOfContents: [
    { id: "subtitle-data-models", title: "1. The Universal Subtitle Data Model" },
    { id: "typescript-srt-parser", title: "2. Building a Robust TypeScript SRT Parser" },
    { id: "python-webvtt-parser", title: "3. Building a WebVTT Parser & Validator in Python" },
    { id: "millisecond-timecode-math", title: "4. Millisecond Timecode Math & Drift Correction" },
    { id: "json-transcript-schema", title: "5. Standardizing Word-Level JSON Transcripts" },
    { id: "transcriptg-api-integration", title: "6. Integrating with TranscriptG's Ephemeral API" },
  ],
  content: `
<h2 id="subtitle-data-models">1. The Universal Subtitle Data Model</h2>
<p>Whether parsing SubRip (.SRT), WebVTT (.VTT), or modern JSON transcripts, all time-synchronized caption structures share a foundational data model:</p>

<pre><code>export interface SubtitleCue {
  id?: string | number;
  startTime: number; // Start timestamp in milliseconds
  endTime: number;   // End timestamp in milliseconds
  text: string;      // Rendered caption text
  speaker?: string;  // Optional speaker attribution
}</code></pre>

<hr />

<h2 id="typescript-srt-parser">2. Building a Robust TypeScript SRT Parser</h2>
<p>Here is a complete, zero-dependency TypeScript implementation for parsing SRT subtitle blocks into structured cue objects (compare syntax differences in our <a href="/blog/srt-vs-vtt-subtitles-format-guide">SRT vs. WebVTT Format Guide</a>):</p>

<pre><code>export function parseSrt(srtContent: string): SubtitleCue[] {
  const cues: SubtitleCue[] = [];
  const normalized = srtContent.replace(/\\r\\n|\\r/g, '\\n').trim();
  const blocks = normalized.split(/\\n\\n+/);

  const timecodeRegex = /^(\\d{2}):(\\d{2}):(\\d{2})[,.](\\d{3})\\s*--&gt;\\s*(\\d{2}):(\\d{2}):(\\d{2})[,.](\\d{3})/;

  for (const block of blocks) {
    const lines = block.split('\\n');
    if (lines.length &lt; 2) continue;

    let timeLineIdx = 0;
    let cueId: string | undefined;

    // Check if first line is a numeric ID
    if (/^\\d+$/.test(lines[0].trim())) {
      cueId = lines[0].trim();
      timeLineIdx = 1;
    }

    const timeLine = lines[timeLineIdx];
    const match = timeLine.match(timecodeRegex);
    if (!match) continue;

    const startMs = parseTimeToMs(match[1], match[2], match[3], match[4]);
    const endMs = parseTimeToMs(match[5], match[6], match[7], match[8]);
    const text = lines.slice(timeLineIdx + 1).join('\\n').trim();

    cues.push({ id: cueId, startTime: startMs, endTime: endMs, text });
  }

  return cues;
}

function parseTimeToMs(hh: string, mm: string, ss: string, ms: string): number {
  return (
    parseInt(hh, 10) * 3600000 +
    parseInt(mm, 10) * 60000 +
    parseInt(ss, 10) * 1000 +
    parseInt(ms, 10)
  );
}</code></pre>

<hr />

<h2 id="python-webvtt-parser">3. Building a WebVTT Parser & Validator in Python</h2>
<p>Below is a clean Python 3.11 implementation for parsing and formatting WebVTT files:</p>

<pre><code>import re
from typing import List, Dict, Any

def parse_webvtt(vtt_text: str) -&gt; List[Dict[str, Any]]:
    lines = [l.strip() for l in vtt_text.strip().splitlines() if l.strip()]
    if not lines or not lines[0].startswith("WEBVTT"):
        raise ValueError("Invalid WebVTT: Missing WEBVTT header")

    cues = []
    tc_pattern = re.compile(r"(?:(\\d{2}):)?(\\d{2}):(\\d{2})\\.(\\d{3})\\s*--&gt;\\s*(?:(\\d{2}):)?(\\d{2}):(\\d{2})\\.(\\d{3})")

    i = 1
    while i &lt; len(lines):
        match = tc_pattern.match(lines[i])
        if match:
            start_ms = time_to_ms(*match.groups()[:4])
            end_ms = time_to_ms(*match.groups()[4:])
            text_lines = []
            i += 1
            while i &lt; len(lines) and not tc_pattern.match(lines[i]):
                text_lines.append(lines[i])
                i += 1
            cues.append({
                "start": start_ms,
                "end": end_ms,
                "text": " ".join(text_lines)
            })
        else:
            i += 1
    return cues

def time_to_ms(hh, mm, ss, ms) -&gt; int:
    h = int(hh) if hh else 0
    return h * 3600000 + int(mm) * 60000 + int(ss) * 1000 + int(ms)</code></pre>

<hr />

<h2 id="millisecond-timecode-math">4. Millisecond Timecode Math & Drift Correction</h2>
<p>When stitching audio chunks together or correcting drift caused by frame rate conversions (e.g. 23.976 fps to 29.97 fps), working with pure integer milliseconds avoids floating-point precision loss. For audio format container details, consult our <a href="/blog/audio-formats-codecs-containers-guide">Audio Formats, Codecs & Containers Guide</a>.</p>

<hr />

<h2 id="json-transcript-schema">5. Standardizing Word-Level JSON Transcripts</h2>
<p>Modern web video applications (like custom audio waveforms and interactive karaoke players) require word-level precision. TranscriptG exports structured JSON following this standard (learn how to build vector indexes with this schema in our <a href="/blog/audio-archives-json-transcripts-semantic-search">Audio Archives & Semantic Search Guide</a>):</p>

<pre><code>{
  "durationSeconds": 142.5,
  "language": "en",
  "segments": [
    {
      "id": 1,
      "start": 0.12,
      "end": 3.48,
      "speaker": "Speaker 1",
      "text": "Welcome to TranscriptG's neural transcription platform.",
      "words": [
        { "word": "Welcome", "start": 0.12, "end": 0.65, "confidence": 0.99 },
        { "word": "to", "start": 0.68, "end": 0.82, "confidence": 0.99 },
        { "word": "TranscriptG", "start": 0.85, "end": 1.45, "confidence": 0.98 }
      ]
    }
  ]
}</code></pre>

<hr />

<h2 id="transcriptg-api-integration">6. Integrating with TranscriptG's Ephemeral API</h2>
<p>Developers can integrate with TranscriptG to generate frame-accurate SRT, VTT, and JSON exports instantly with zero data persistence overhead. Try out instantaneous format conversions on our interactive <a href="/convert">Subtitle Converter Tool</a> or test our speech models via the <a href="/transcribe">Free Speech Transcriber</a>.</p>
`,
  faqs: [
    { q: "Why use integer milliseconds instead of float seconds?", a: "Floating-point numbers suffer from rounding errors during subtitle math. Storing timestamps as integer milliseconds guarantees exact synchronization." },
    { q: "How do I handle both comma and period millisecond delimiters?", a: "Use a regular expression like '[,.]' that matches both commas (SRT standard) and periods (VTT standard)." },
    { q: "Can I export word-level timestamps in TranscriptG?", a: "Yes. TranscriptG exports structured JSON containing start and end timestamps for every individual spoken word." },
  ],
  relatedSlugs: [
    "srt-vs-vtt-subtitles-format-guide",
    "audio-formats-codecs-containers-guide",
    "audio-archives-json-transcripts-semantic-search",
  ],
};
