import React, { useState } from "react";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { YouTubeUploader } from "../components/youtube/YouTubeUploader";
import { YouTubeViewer } from "../components/youtube/YouTubeViewer";
import { YouTubeExportSuite } from "../components/youtube/YouTubeExportSuite";
import { YouTubeGuide } from "../components/youtube/YouTubeGuide";
import { YouTubeTranscriptData } from "../types/youtube";

export const YouTubeTranscriptPage: React.FC = () => {
  const [transcriptData, setTranscriptData] = useState<YouTubeTranscriptData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = () => {
    setTranscriptData(null);
    setError(null);
  };

  const youtubeFaqs = [
    {
      q: "Can I generate a transcript if the creator turned subtitles off?",
      a: "Yes! TranscriptG includes an acoustic AI reconstruction pipeline that processes video audio directly to generate transcripts even when native creator captions or closed captions are completely absent.",
    },
    {
      q: "Does TranscriptG work on YouTube Shorts?",
      a: "Yes. Simply paste the YouTube Short URL (e.g. youtube.com/shorts/...) to instantly extract timestamped dialogue and key takeaway notes.",
    },
    {
      q: "Can I translate the YouTube transcript into another language?",
      a: "Yes. You can translate any YouTube transcript into Spanish, French, German, Hindi, Japanese, Chinese, and 90+ other languages while preserving exact timecode sync.",
    },
    {
      q: "How do I export the transcript for Premiere Pro or DaVinci Resolve?",
      a: "Use our one-click export suite to download standard SubRip (.SRT) or WebVTT (.VTT) subtitle tracks ready to drop onto your video editor timeline.",
    },
  ];

  return (
    <>
      <Seo
        title="YouTube Transcript Generator — Free Video to Text with Timestamps & AI Summaries"
        description="Free, instant YouTube video & Shorts transcript generator. Get verbatim spoken dialogue with timestamps, AI executive summaries, chapter breakdowns, interactive video seeking, and export to SRT/VTT/TXT — even when no captions exist on YouTube."
        canonicalPath="/youtube-transcript"
        keywords={[
          "youtube transcript generator",
          "youtube video to text",
          "youtube transcript with timestamps",
          "transcribe youtube video no captions",
          "youtube subtitles downloader",
          "youtube to srt converter",
          "youtube video summarizer",
          "youtube shorts transcript",
          "free youtube transcription tool",
          "youtube video speech to text",
          "youtube caption extractor",
        ]}
        faqs={youtubeFaqs}
        applicationCategory="MultimediaApplication"
      />

      <div className="min-h-screen py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
        {/* Hero Page Header */}
        <PageHeader
          eyebrow="YOUTUBE SPEECH LAB"
          badge="No Captions Fallback"
          title={
            <span>
              Generate Timestamps & Transcripts for <span className="text-red-600">Any YouTube Video</span>
            </span>
          }
          description="Instant spoken dialogue extraction, interactive synchronized video player, chapter breakdowns, and AI speech reconstruction when creator subtitles are disabled."
        />

        {/* Dynamic State: Uploader vs Full Interactive Suite */}
        {!transcriptData ? (
          <div className="space-y-12">
            <YouTubeUploader
              onTranscriptGenerated={(data) => setTranscriptData(data)}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              error={error}
              setError={setError}
            />
            <YouTubeGuide />
          </div>
        ) : (
          <div className="space-y-10 animate-fade-in">
            <YouTubeViewer
              data={transcriptData}
              onReset={handleReset}
            />

            <YouTubeExportSuite
              data={transcriptData}
            />

            <YouTubeGuide />
          </div>
        )}
      </div>
    </>
  );
};
