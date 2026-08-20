import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";

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
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Back button */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-500 hover:text-[#ff4d00] transition-colors mb-8"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Journal
      </Link>

      <article className="glass-card p-6 sm:p-12 rounded-3xl border border-black/10 shadow-2xl space-y-8">
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
      </article>
    </div>
  );
};
