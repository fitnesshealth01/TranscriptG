import React from "react";
import { Seo } from "../components/Seo";
import { ContentLayout } from "../components/ContentLayout";

export const BlogPost1: React.FC = () => {
  return (
    <>
      <Seo
        title="How TranscriptG Works: Inside Our Privacy-First Acoustic Engine"
        description="Learn how TranscriptG processes audio into timecoded transcripts and AI summaries with sub-second latency and 100% session privacy."
        type="article"
      />

      <ContentLayout
        title="How TranscriptG Works: Inside Our Privacy-First Acoustic Engine"
        category="Architecture"
        date="August 2026"
        readTime="6 min read"
      >
        <p className="lead text-lg font-medium text-neutral-800">
          In an era dominated by subscription paywalls and mandatory account registration, TranscriptG introduces a streamlined, public-access approach to media transcription and text intelligence.
        </p>

        <h2 className="text-2xl font-bold text-[#0d0f12] mt-8">1. Acoustic Spectral Analysis</h2>
        <p>
          When you drop an audio or video file into Engine 01, TranscriptG ingests the raw binary buffer directly in memory. The audio stream undergoes fast spectral normalization to flatten volume variances and isolate vocal frequencies between 300 Hz and 3400 Hz.
        </p>

        <h2 className="text-2xl font-bold text-[#0d0f12] mt-8">2. Sub-Second Timecode Generation</h2>
        <p>
          Unlike legacy transcription tools that output unstructured blocks of text, our linguistic model detects natural pauses and sentence cadence. It calculates exact start and end timestamps in millisecond precision (e.g., <code>00:01:23,450 --&gt; 00:01:27,100</code>).
        </p>

        <h2 className="text-2xl font-bold text-[#0d0f12] mt-8">3. Zero Storage Privacy Architecture</h2>
        <p>
          Privacy is embedded into the core stack. Audio payloads and generated text exist strictly in memory for the lifecycle of the request. Once returned to your browser, all temporary buffers are purged automatically.
        </p>

        <h2 className="text-2xl font-bold text-[#0d0f12] mt-8">4. Lossless Multi-Format Serialization</h2>
        <p>
          Whether exporting as SRT for YouTube, VTT for HTML5 video, TXT for reading, or PDF for documentation, our formatting engine serializes timecoded cues losslessly across all 7 supported formats.
        </p>
      </ContentLayout>
    </>
  );
};
