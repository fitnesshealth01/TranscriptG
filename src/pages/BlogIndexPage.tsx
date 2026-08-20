import React from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

export const BlogIndexPage: React.FC = () => {
  const articles = [
    {
      slug: "how-transcriptg-works",
      title: "How TranscriptG Works: Inside Our Privacy-First Acoustic Engine",
      desc: "An architectural overview of sub-second speech processing, acoustic timecode generation, and session-private data handling.",
      readTime: "6 min read",
      category: "Architecture",
      date: "August 2026",
    },
    {
      slug: "transcription-tips",
      title: "10 Proven Tips for Achieving 99%+ Speech Transcription Accuracy",
      desc: "Learn how microphone placement, sample rate normalization, and background noise isolation drastically elevate transcript quality.",
      readTime: "8 min read",
      category: "Best Practices",
      date: "August 2026",
    },
    {
      slug: "srt-vs-vtt",
      title: "SRT vs. VTT: Which Subtitle Format Should You Use in 2026?",
      desc: "A definitive comparison between SubRip (SRT) and Web Video Text Tracks (VTT) for YouTube, HTML5 video, and video editing suites.",
      readTime: "5 min read",
      category: "Guides",
      date: "August 2026",
    },
    {
      slug: "ai-meeting-summarizer-guide",
      title: "How to Convert Zoom & Teams Meeting Audio into Actionable AI Digests",
      desc: "A practical guide for executives and remote teams to extract decision logs, action items, and executive summaries from recordings.",
      readTime: "7 min read",
      category: "Workflows",
      date: "August 2026",
    },
  ];

  return (
    <div className="space-y-12">
      <Seo
        title="Linguistic Journal & Guides — TranscriptG Blog"
        description="Deep dives on transcription accuracy, subtitle formats (SRT vs VTT), acoustic processing, and video accessibility."
      />

      <PageHeader
        eyebrow="Linguistic Journal"
        title="Engineering Insights & Guides"
        description="Explore technical breakdowns, subtitle standards, and best practices for high-precision audio transcription."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <Link
              key={art.slug}
              to={`/blog/${art.slug}`}
              className="glass-card glass-card-hover p-6 sm:p-8 rounded-3xl border border-black/10 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] text-[11px] font-mono font-bold uppercase">
                  {art.category}
                </div>

                <h2 className="text-xl font-bold text-[#0d0f12] group-hover:text-[#ff4d00] transition-colors leading-snug">
                  {art.title}
                </h2>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {art.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-mono text-neutral-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {art.readTime}
                </span>
                <span className="text-[#ff4d00] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
