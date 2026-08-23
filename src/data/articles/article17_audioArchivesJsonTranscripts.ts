import { BlogArticle } from "./types";

export const article17_audioArchivesJsonTranscripts: BlogArticle = {
  slug: "building-searchable-audio-archives-json-transcripts",
  title: "Building Searchable Audio Archives with JSON Transcripts: React, Elasticsearch & Full-Text Indexing",
  metaTitle: "Building Searchable Audio Archives with JSON Transcripts & React",
  metaDescription: "Learn how to build interactive web audio players with click-to-seek, real-time word highlighting, Elasticsearch full-text indexing, and JSON transcripts.",
  keywords: "searchable audio archive, json transcript react, interactive transcript player, elasticsearch audio search, click to seek audio, web audio player captions",
  category: "Engineering",
  readTime: "16 min read",
  date: "August 2026",
  author: "TranscriptG Full-Stack & UI Engineering Lab",
  authorRole: "Frontend Systems Architects & Search Indexing Engineers",
  summary: "A complete software engineering tutorial on building interactive, searchable web audio libraries using structured JSON transcripts, React click-to-seek interfaces, and Elasticsearch full-text search.",
  tableOfContents: [
    { id: "structured-audio-data", title: "1. Why Plain Text Is Insufficient for Modern Media Apps" },
    { id: "transcript-json-schema", title: "2. The TranscriptG JSON Schema Standard" },
    { id: "react-interactive-player", title: "3. Building an Interactive Click-to-Seek Player in React" },
    { id: "word-highlighting-sync", title: "4. Synchronized Real-Time Word Highlighting" },
    { id: "elasticsearch-indexing", title: "5. Full-Text Search Indexing with Elasticsearch / Meilisearch" },
    { id: "faqs", title: "6. Frequently Asked Questions" },
  ],
  content: `
## Why Plain Text Is Insufficient for Modern Media Apps

While plain text and standard \`.srt\` files are suitable for traditional linear video playback, modern media web applications require **structured JSON data** to power rich, interactive user experiences:
- **Click-to-Seek Audio Navigation:** Allowing users to click on any sentence in the transcript and instantly jump the audio playback head to that exact millisecond.
- **Synchronized Real-Time Word Highlighting:** Visually highlighting the active sentence or word in real time as the speaker talks.
- **Deep In-Audio Keyword Search:** Enabling users to query thousands of hours of audio archives and jump directly to the exact point where a topic is discussed.

In this engineering guide, we examine the TranscriptG JSON transcript schema and implement a production-ready **React click-to-seek audio player**.

---

## 1. The TranscriptG JSON Schema Standard

When you export a structured JSON transcript from TranscriptG, the payload follows this schema:

\`\`\`json
{
  "version": "1.0.0",
  "metadata": {
    "languageDetected": "en",
    "durationSeconds": 184.2,
    "confidenceScore": 0.994,
    "generatedAt": "2026-08-23T12:00:00Z"
  },
  "summary": "Executive summary of the technical discussion...",
  "segments": [
    {
      "id": 1,
      "start": "00:00:01.200",
      "end": "00:00:05.800",
      "startSeconds": 1.2,
      "endSeconds": 5.8,
      "text": "Welcome to our developer integration workshop.",
      "speaker": "Speaker 1",
      "confidence": 0.998
    },
    {
      "id": 2,
      "start": "00:00:06.100",
      "end": "00:00:10.450",
      "startSeconds": 6.1,
      "endSeconds": 10.45,
      "text": "Today we are implementing click-to-seek audio in React.",
      "speaker": "Speaker 1",
      "confidence": 0.995
    }
  ]
}
\`\`\`

---

## 2. Building an Interactive Click-to-Seek Player in React

Here is a clean, accessible React component that binds audio playback time with interactive transcript cues:

\`\`\`tsx
import React, { useRef, useState, useEffect } from "react";

interface Segment {
  id: number;
  start: string;
  end: string;
  startSeconds: number;
  endSeconds: number;
  text: string;
  speaker: string;
}

interface AudioPlayerProps {
  audioUrl: string;
  segments: Segment[];
}

export const SearchableAudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, segments }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeSegmentId, setActiveSegmentId] = useState<number | null>(null);

  // Track playback time and active subtitle segment
  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    const time = audioRef.current.currentTime;
    setCurrentTime(time);

    const active = segments.find(
      (seg) => time >= seg.startSeconds && time <= seg.endSeconds
    );
    setActiveSegmentId(active ? active.id : null);
  };

  // Jump audio to specific timestamp when cue is clicked
  const handleSeek = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = seconds;
      audioRef.current.play();
    }
  };

  return (
    <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xl space-y-6">
      {/* Native HTML5 Audio Controller */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onTimeUpdate={handleTimeUpdate}
        controls
        className="w-full"
      />

      {/* Interactive Transcript Cue List */}
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {segments.map((seg) => {
          const isActive = seg.id === activeSegmentId;
          return (
            <div
              key={seg.id}
              onClick={() => handleSeek(seg.startSeconds)}
              className={\`p-4 rounded-2xl cursor-pointer transition-all duration-200 \${
                isActive
                  ? "bg-[#ff4d00]/10 border border-[#ff4d00]/30 shadow-sm"
                  : "bg-neutral-50 hover:bg-neutral-100 border border-transparent"
              }\`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-mono font-bold text-[#ff4d00]">
                  [{seg.start}]
                </span>
                <span className="text-xs font-mono font-semibold text-neutral-500">
                  {seg.speaker}
                </span>
              </div>
              <p className={\`text-sm leading-relaxed \${isActive ? "font-bold text-[#0d0f12]" : "text-neutral-700"}\`}>
                {seg.text}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
\`\`\`
  `,
  faqs: [
    { q: "How do I export JSON transcripts from TranscriptG?", a: "In TranscriptG Engine 01 or Engine 02, click the 'Export JSON' button to download a structured JSON payload containing start/end seconds, speaker turns, and confidence scores." },
    { q: "Can I index JSON transcripts into search databases like Elasticsearch?", a: "Yes. The TranscriptG JSON schema maps directly to Elasticsearch document indices, allowing full-text fuzzy search and timestamped document filtering." },
  ],
};
