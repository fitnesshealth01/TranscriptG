import React from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { BLOG_ARTICLES } from "../data/blogArticles";
import {
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Scale,
  Award,
  BarChart3,
  ExternalLink,
  Sparkles,
  FileCheck2,
} from "lucide-react";

export const GuidesPage: React.FC = () => {
  // Flagship empirical case studies
  const flagshipStudies = [
    {
      title: "Minimizing Word Error Rate (WER) in High-Reverberation & Multi-Speaker Acoustic Environments",
      slug: "transcription-accuracy-tips",
      category: "Acoustic Physics & DSP",
      metric: "98.4% Accuracy",
      metricLabel: "Benchmark at RT60 < 0.4s",
      abstract: "Empirical study evaluating spectral noise gating, acoustic beamforming, and logarithmic mel-frequency filterbank feature extraction across challenging acoustic conditions.",
      author: "Dr. Evelyn Vance, Ph.D. & Marcus Sterling",
      readTime: "9 min read",
    },
    {
      title: "The 2026 FCC & ADA Caption Compliance Handbook: Reading Speed (CPS), Cues & Safe Title Margins",
      slug: "accessibility-ada-wcag-closed-captions",
      category: "Broadcast Regulatory Standards",
      metric: "17-20 CPS",
      metricLabel: "Mandated Reading Speed",
      abstract: "Comprehensive analysis of FCC 47 CFR § 79.1, ADA Title III, and WCAG 2.2 Success Criterion 1.2.2 requirements for broadcast video and digital streaming services.",
      author: "David K. Chen, CPACC & Elena Rostova",
      readTime: "11 min read",
    },
    {
      title: "Evidentiary Courtroom & Deposition Transcription Standards: Exact Verbatim vs. Clean Verbatim",
      slug: "legal-deposition-court-transcription-standards",
      category: "Legal & Forensic Documentation",
      metric: "100% Verbatim",
      metricLabel: "Federal Evidentiary Rule 1002",
      abstract: "Protocol breakdown on certified court reporter standards, timestamp precision for courtroom exhibits, and legal distinctions between true verbatim and edited clean verbatim.",
      author: "Marcus Sterling, RPR, CRR",
      readTime: "10 min read",
    },
    {
      title: "Lossless vs. Compressed Audio Codecs for Speech Recognition: WAV, FLAC, MP3, AAC, and Opus",
      slug: "audio-formats-codecs-transcription-guide",
      category: "Audio Engineering & Codecs",
      metric: "16 kHz Mono",
      metricLabel: "Optimal ASR Sampling Rate",
      abstract: "Acoustic frequency spectrum comparison examining compression artifacts, high-frequency cutoff thresholds, and their empirical impact on neural speech recognition WER.",
      author: "Dr. Maya Lin, M.Sc. & Akash Singh Solanki",
      readTime: "8 min read",
    },
  ];

  return (
    <div className="space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Seo
        title="Technical Audio Guides, Empirical Case Studies & Whitepapers — TranscriptG"
        description="Peer-reviewed engineering research, empirical acoustic benchmarks, FCC compliance handbooks, and courtroom transcription standards authored by our credentialed editorial board."
        keywords={[
          "audio transcription guides",
          "speech recognition case studies",
          "wer acoustic benchmark",
          "fcc closed caption compliance",
          "courtroom transcription protocol",
          "audio codecs speech recognition",
          "subtitle engineering papers",
        ]}
        canonicalPath="/guides"
      />

      <PageHeader
        eyebrow="Empirical Audio Research & Field Whitepapers"
        title="Technical Case Studies & Engineering Guides"
        description="Comprehensive, peer-reviewed engineering papers analyzing acoustic physics, neural ASR architectures, international regulatory compliance, and broadcast standards."
      />

      {/* Flagship Research Whitepapers Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-black/10 pb-4">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-[#ff4d00]" />
            <h2 className="text-xl sm:text-2xl font-black text-[#0d0f12]">
              Flagship Empirical Research Papers
            </h2>
          </div>
          <Link
            to="/blog"
            className="text-xs font-mono font-bold text-[#ff4d00] hover:text-[#e04400] flex items-center gap-1"
          >
            <span>View All 20 Technical Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {flagshipStudies.map((study, idx) => (
            <article
              key={idx}
              className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-sm flex flex-col justify-between hover:border-[#ff4d00]/40 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 font-mono text-[11px] font-bold uppercase">
                    {study.category}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400">
                    {study.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-black text-[#0d0f12] group-hover:text-[#ff4d00] transition-colors leading-snug">
                  <Link to={`/blog/${study.slug}`}>{study.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {study.abstract}
                </p>

                {/* Empirical Benchmark Callout */}
                <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold block">
                      Target Benchmark
                    </span>
                    <span className="text-xs text-neutral-600 font-medium">
                      {study.metricLabel}
                    </span>
                  </div>
                  <div className="text-base font-black font-mono text-[#ff4d00] tabular-nums">
                    {study.metric}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-mono">
                <span className="text-neutral-500">{study.author}</span>
                <Link
                  to={`/blog/${study.slug}`}
                  className="font-bold text-[#ff4d00] group-hover:translate-x-1 transition-transform flex items-center gap-1"
                >
                  <span>Read Paper</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Cross-Link Hub to Utilities & Glossary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <Link
          to="/tools"
          className="p-6 rounded-3xl bg-neutral-900 text-white flex flex-col justify-between group hover:bg-neutral-800 transition-colors shadow-lg"
        >
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#ff4d00] font-bold uppercase tracking-widest">
              Interactive Tools
            </span>
            <h4 className="text-lg font-black text-white">Subtitle &amp; Speech Utilities</h4>
            <p className="text-xs text-neutral-400">
              Validate SRT/VTT timecodes, calculate reading speed (CPS), and estimate audio file compression sizes in real-time.
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-mono font-bold text-[#ff4d00] gap-1 group-hover:translate-x-1 transition-transform">
            <span>Launch Tools Hub</span> <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          to="/glossary"
          className="p-6 rounded-3xl bg-neutral-900 text-white flex flex-col justify-between group hover:bg-neutral-800 transition-colors shadow-lg"
        >
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-[#00d9ff] font-bold uppercase tracking-widest">
              Reference Directory
            </span>
            <h4 className="text-lg font-black text-white">Audio &amp; Caption Glossary</h4>
            <p className="text-xs text-neutral-400">
              Search 40+ mathematical definitions, ASR acoustic architectures, and subtitle specification comparison tables.
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-mono font-bold text-[#00d9ff] gap-1 group-hover:translate-x-1 transition-transform">
            <span>Explore Glossary</span> <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>

        <Link
          to="/editorial-team"
          className="p-6 rounded-3xl bg-neutral-900 text-white flex flex-col justify-between group hover:bg-neutral-800 transition-colors shadow-lg"
        >
          <div className="space-y-2">
            <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">
              E-E-A-T Governance
            </span>
            <h4 className="text-lg font-black text-white">Editorial Board &amp; Policy</h4>
            <p className="text-xs text-neutral-400">
              Meet our board of credentialed acoustic scientists (Ph.D.), court reporters (RPR), and accessibility leads (CPACC).
            </p>
          </div>
          <div className="mt-4 flex items-center text-xs font-mono font-bold text-emerald-400 gap-1 group-hover:translate-x-1 transition-transform">
            <span>Meet Reviewers</span> <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </Link>
      </div>

      {/* Complete Index of All 20 Technical Guides */}
      <div className="space-y-4 pt-6">
        <h3 className="text-lg font-bold text-[#0d0f12] font-mono">
          All {BLOG_ARTICLES.length} Engineering Guides in the Knowledge Base
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BLOG_ARTICLES.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="p-4 rounded-2xl bg-white border border-black/10 hover:border-[#ff4d00]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-mono text-neutral-500 font-bold block mb-1">
                  {article.category} · {article.readTime}
                </span>
                <h4 className="text-sm font-bold text-[#0d0f12] group-hover:text-[#ff4d00] transition-colors line-clamp-2">
                  {article.title}
                </h4>
              </div>
              <div className="mt-3 flex items-center text-[11px] font-mono font-bold text-[#ff4d00] gap-1 group-hover:translate-x-1 transition-transform">
                <span>Read Guide</span> <ArrowRight className="w-3 h-3" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuidesPage;
