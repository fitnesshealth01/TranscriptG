import React, { useState } from "react";
import {
  Youtube,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
  Zap,
  Globe2,
  FileCode2,
  FileText,
  Clock,
  Layers,
  ArrowRight,
  CheckCircle2,
  BookOpen,
  Scale,
  Monitor,
  Code,
} from "lucide-react";
import { Link } from "react-router-dom";

export const YouTubeGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  const FAQS = [
    {
      q: "How does TranscriptG transcribe educational YouTube videos?",
      a: "TranscriptG parses public creator captions and official timed subtitles. For videos where captions are missing or disabled, our AI language pipeline analyzes public dialogue to generate structured study notes, chapter markers, and readable transcripts under educational fair use.",
    },
    {
      q: "Does this work with YouTube Shorts, unlisted videos, and podcasts?",
      a: "Yes. TranscriptG supports standard YouTube videos (youtube.com/watch?v=...), mobile share links (youtu.be/...), YouTube Shorts (youtube.com/shorts/...), and unlisted lectures. As long as the video is publicly accessible, the tool can generate its transcript and chapters.",
    },
    {
      q: "Can I jump the video player by clicking timestamps in the transcript?",
      a: "Yes! The embedded video player is fully synchronized. Clicking any timestamp button (e.g., [02:15]) will immediately seek the embedded YouTube player to that exact second.",
    },
    {
      q: "Which subtitle and document formats can I export?",
      a: "You can download studio-grade SubRip (.SRT) and WebVTT (.VTT) subtitle files for video editing software (Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro), clean Plain Text (.TXT), Markdown (.MD) for Notion and Obsidian, structured JSON data, and formatted summaries.",
    },
    {
      q: "Does TranscriptG download, store, or re-encode YouTube video files?",
      a: "No. TranscriptG never downloads, stream-rips, stores, or re-distributes YouTube audio or video files. Video playback is rendered strictly through YouTube's official embedded player in full accordance with the YouTube Developer Policies.",
    },
    {
      q: "Can I translate the YouTube transcript into another language?",
      a: "Yes. You can translate any YouTube transcript into Spanish, French, German, Hindi, Japanese, Chinese, and 90+ other languages while preserving exact timecode sync.",
    },
    {
      q: "Is there any sign-up, subscription, or watermark required?",
      a: "Zero signups, zero subscriptions, and zero watermarks. TranscriptG is an open-access utility that runs in your browser session with zero personal data retention.",
    },
    {
      q: "How does transcript extraction comply with copyright and fair use?",
      a: "TranscriptG complies with Title 17 U.S. Code § 107 (Fair Use Doctrine) and § 512 (DMCA Safe Harbor). Transcripts are generated for personal research, educational study, quotations, and accessibility accommodations. For more details, see our official Copyright Policy.",
    },
  ];

  const FORMAT_SPECS = [
    {
      name: "SubRip Subtitle (.SRT)",
      timecode: "00:01:23,456 --> 00:01:28,789",
      bestFor: "Adobe Premiere Pro, DaVinci Resolve, VLC, Final Cut Pro, YouTube Studio",
      syntax: "Sequential integer IDs, comma millisecond delimiters, line breaks between cue blocks.",
    },
    {
      name: "WebVTT (.VTT)",
      timecode: "00:01:23.456 --> 00:01:28.789",
      bestFor: "HTML5 <track> video tags, web players, Vimeo, Zoom, modern mobile video",
      syntax: "Starts with mandatory 'WEBVTT' header, period millisecond delimiters, CSS styling support.",
    },
    {
      name: "Markdown (.MD)",
      timecode: "**[01:23]** Speaker 1: Spoken text",
      bestFor: "Notion, Obsidian, GitHub documentation, personal study notes",
      syntax: "Bulleted or timestamped bold headers with formatted paragraphs and callouts.",
    },
    {
      name: "Structured JSON (.JSON)",
      timecode: '{"start": 83.456, "end": 88.789, "text": "..."}',
      bestFor: "Programmatic pipelines, search indexation, custom web applications",
      syntax: "Machine-readable array of cue objects with floating-point second offsets.",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 pt-8">
      {/* 3-Pillar Architectural Breakdown */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="text-2xl sm:text-3xl font-black text-[#0d0f12] tracking-tight">
          How TranscriptG's YouTube Speech Lab Works
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Combining official YouTube timedtext metadata with multi-model AI speech intelligence for reliable transcript generation and study notes.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pillar 1 */}
        <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-red-500/10 text-red-600 flex items-center justify-center font-bold font-mono">
            01
          </div>
          <h3 className="text-base font-bold text-[#0d0f12]">
            Native Track Extraction
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Quickly parses official creator captions and YouTube accessibility subtitle streams without latency.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold font-mono">
            02
          </div>
          <h3 className="text-base font-bold text-[#0d0f12]">
            Educational Speech Synthesis
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            If the video has zero creator captions, our speech pipeline synthesizes spoken dialogue, scene narration, and speaker turns chronologically.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-6 rounded-3xl bg-white border border-black/10 shadow-xs space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold font-mono">
            03
          </div>
          <h3 className="text-base font-bold text-[#0d0f12]">
            Intelligence &amp; Export Suite
          </h3>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Extract executive summaries, query the video with conversational Q&amp;A, translate into 90+ languages, and export to SRT, VTT, and Markdown.
          </p>
        </div>
      </div>

      {/* 4-Step Production Workflow */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#ff4d00] font-bold">
            Workflow Blueprint
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#0d0f12] tracking-tight">
            Step-by-Step Guide: From YouTube URL to Searchable Transcript
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-[#0d0f12] text-white flex items-center justify-center text-xs font-mono font-bold">
              1
            </div>
            <h4 className="text-sm font-bold text-[#0d0f12]">Paste Video URL</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Copy any public YouTube URL, mobile share link, or YouTube Short and paste it into the search input.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-[#0d0f12] text-white flex items-center justify-center text-xs font-mono font-bold">
              2
            </div>
            <h4 className="text-sm font-bold text-[#0d0f12]">Automated Extraction</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              TranscriptG extracts verified dialogue lines, attaches millisecond timestamps, and builds chapter markers.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-[#0d0f12] text-white flex items-center justify-center text-xs font-mono font-bold">
              3
            </div>
            <h4 className="text-sm font-bold text-[#0d0f12]">Interactive Verification</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Click any timestamp to seek the synchronized video player directly to that second for quick fact-checking.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-[#0d0f12] text-white flex items-center justify-center text-xs font-mono font-bold">
              4
            </div>
            <h4 className="text-sm font-bold text-[#0d0f12]">Export or Translate</h4>
            <p className="text-xs text-neutral-600 leading-relaxed">
              Export studio-grade SRT or VTT for video editing, save clean Markdown for study notes, or translate into 90+ languages.
            </p>
          </div>
        </div>
      </div>

      {/* Practical Use Cases Grid */}
      <div className="p-8 rounded-3xl bg-[#0d0f12] text-white relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-red-400 font-bold">
            Creator &amp; Researcher Workflows
          </span>
          <h3 className="text-2xl font-black tracking-tight">
            Turn Any YouTube Video Into High-Yield Knowledge
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <Clock className="w-5 h-5 text-red-400" />
            <h4 className="text-sm font-bold">Skip Long Video Fluff</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Skim 2-hour podcasts and university lectures in 90 seconds using AI executive summaries and chapter highlights.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <FileCode2 className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-bold">Video Repurposing</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Export timestamped SRT/VTT subtitles to burn into TikToks, Instagram Reels, and YouTube Shorts in Premiere or CapCut.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <Globe2 className="w-5 h-5 text-cyan-400" />
            <h4 className="text-sm font-bold">Global Multilingual Reach</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Translate foreign interviews, Japanese anime clips, or Spanish documentaries into English or 90+ other tongues with 1 click.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <FileText className="w-5 h-5 text-purple-400" />
            <h4 className="text-sm font-bold">Study &amp; Note-Taking</h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Copy clean Markdown formatting straight into Notion, Obsidian, or Google Docs with clickable timestamps.
            </p>
          </div>
        </div>
      </div>

      {/* Subtitle Formats Reference Specification */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-xs space-y-6">
        <div className="space-y-1">
          <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#00d9ff] font-bold">
            Technical Standards Reference
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-[#0d0f12] tracking-tight">
            Subtitle Format Specifications &amp; Compatibility
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Understanding timecode formats, millisecond delimiters, and editing software compatibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {FORMAT_SPECS.map((spec, i) => (
            <div key={i} className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#0d0f12] flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#ff4d00]" />
                  {spec.name}
                </h4>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-neutral-200 font-mono text-[11px] text-neutral-700">
                <code>{spec.timecode}</code>
              </div>
              <p className="text-xs text-neutral-600 leading-relaxed">
                <strong>Best For:</strong> {spec.bestFor}
              </p>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {spec.syntax}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Accessibility & Compliance Guidelines */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-emerald-600 shrink-0" />
          <h3 className="text-lg font-black text-[#0d0f12]">
            Web Accessibility Guidelines (WCAG 2.1 AA &amp; Section 508)
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Closed captions are an essential requirement under the Americans with Disabilities Act (ADA), Section 508 of the Rehabilitation Act, and the W3C Web Content Accessibility Guidelines (WCAG 2.1 AA Success Criterion 1.2.2). High-quality captions must provide verbatim speech representation, identify background sound effects [e.g., laughter, applause], and maintain synchronization within 100 milliseconds of spoken dialogue.
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-500 pt-1">
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> ADA Compliant
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> WCAG 2.1 AA Criterion 1.2.2
          </span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" /> FCC Closed Captioning Pacing
          </span>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4">
        <div className="text-center space-y-1">
          <h3 className="text-xl font-black text-[#0d0f12] tracking-tight">
            Frequently Asked Questions
          </h3>
          <p className="text-xs text-neutral-500 font-mono">
            Everything you need to know about YouTube transcript generation
          </p>
        </div>

        <div className="space-y-2.5">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-black/8 overflow-hidden transition-all shadow-2xs"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-xs sm:text-sm text-[#0d0f12] hover:text-red-600 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-red-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-black/5 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Compliance, Copyright & Fair Use Statement for Google AdSense & Platform Policy Conformance */}
      <div className="rounded-3xl bg-neutral-50 border border-black/10 p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
            <h4 className="text-base font-bold text-[#0d0f12]">
              Educational Fair Use &amp; YouTube Platform Compliance Notice
            </h4>
          </div>
          <Link
            to="/copyright"
            className="inline-flex items-center gap-1 text-xs font-mono font-bold text-red-600 hover:text-red-700 underline"
          >
            Review Full DMCA &amp; Copyright Policy <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          TranscriptG operates strictly as an educational accessibility and study reading companion. Transcripts and closed captions generated through this interface are provided solely for non-commercial study, academic review, research quotations, and hearing accessibility under the Fair Use doctrine (Title 17 U.S. Code § 107). TranscriptG does not host, duplicate, re-stream, or download YouTube audiovisual streams. Video playback occurs directly via YouTube’s official embedded player in full accordance with the YouTube Developer Policies and Terms of Service. All rights to original video content remain the intellectual property of their respective creators.
        </p>
      </div>
    </div>
  );
};
