import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User, Share2, Check, Twitter, Linkedin, Facebook, ShieldCheck } from "lucide-react";

interface ContentLayoutProps {
  title: string;
  category?: string;
  date?: string;
  readTime?: string;
  author?: string;
  children: React.ReactNode;
}

export const ContentLayout: React.FC<ContentLayoutProps> = ({
  title,
  category = "Linguistic Engineering",
  date = "August 2026",
  readTime = "5 min read",
  author = "TranscriptG Engineering",
  children,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const encodedUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-500 hover:text-[#ff4d00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Journal
        </Link>

        {/* Social Share Bar */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono text-neutral-400 hidden sm:inline">Share:</span>
          <button
            onClick={handleCopyLink}
            className="p-2 rounded-xl bg-neutral-100 hover:bg-[#ff4d00]/10 hover:text-[#ff4d00] text-neutral-600 transition-colors"
            title="Copy Direct Link"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-neutral-100 hover:bg-sky-50 hover:text-sky-600 text-neutral-600 transition-colors"
            title="Share on Twitter / X"
          >
            <Twitter className="w-3.5 h-3.5" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl bg-neutral-100 hover:bg-blue-50 hover:text-blue-600 text-neutral-600 transition-colors"
            title="Share on LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <article className="glass-card p-6 sm:p-12 rounded-3xl border border-black/10 shadow-2xl space-y-8 bg-white">
        {/* Article Header */}
        <header className="space-y-4 pb-8 border-b border-black/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] text-xs font-mono font-bold uppercase tracking-wider">
            {category}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#0d0f12] tracking-tight leading-[1.15]">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-neutral-500 pt-2">
            <span className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-neutral-400" /> {author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-neutral-400" /> {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-neutral-400" /> {readTime}
            </span>
          </div>
        </header>

        {/* Article Body */}
        <div className="prose prose-neutral max-w-none text-neutral-800 space-y-6 text-base sm:text-lg leading-relaxed">
          {children}
        </div>

        {/* AUTHOR BIO & E-E-A-T CARD */}
        <div className="mt-12 pt-8 border-t border-black/10 bg-neutral-50/80 p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0d0f12] text-white flex items-center justify-center font-bold text-lg">
              TG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-[#0d0f12]">{author}</h4>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Publisher
                </span>
              </div>
              <p className="text-xs text-neutral-500">Acoustic Engineering & Natural Language Research Division</p>
            </div>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Written and reviewed by the TranscriptG Engineering Team. Our editorial guidelines mandate factual accuracy, reproducible benchmarks, and strict privacy standards across all published research and guides.
          </p>
        </div>
      </article>
    </div>
  );
};

