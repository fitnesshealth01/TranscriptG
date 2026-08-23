import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Seo } from "../components/Seo";
import { BLOG_ARTICLES } from "../data/blogArticles";
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Share2,
  Check,
  Twitter,
  Linkedin,
  ShieldCheck,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Sparkles,
  HelpCircle
} from "lucide-react";

export const BlogPostDynamic: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const encodedUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const encodedTitle = encodeURIComponent(article.title);

  // Helper to parse content markdown into rich JSX
  const renderFormattedContent = (content: string) => {
    const paragraphs = content.trim().split("\n\n");

    return paragraphs.map((block, idx) => {
      const trimmed = block.trim();

      // Heading 2
      if (trimmed.startsWith("## ")) {
        const text = trimmed.replace("## ", "");
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
        return (
          <h2
            key={idx}
            id={id}
            className="text-2xl sm:text-3xl font-black text-[#0d0f12] tracking-tight mt-10 mb-4 pt-4 border-t border-black/5"
          >
            {text}
          </h2>
        );
      }

      // Heading 3
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={idx} className="text-xl font-bold text-[#0d0f12] mt-6 mb-3">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }

      // Code blocks
      if (trimmed.startsWith("```")) {
        const codeText = trimmed.replace(/```[a-z]*\n?|```$/g, "");
        return (
          <div key={idx} className="my-6 rounded-2xl bg-[#0d0f12] text-neutral-100 p-5 font-mono text-xs overflow-x-auto shadow-lg border border-white/10">
            <pre>{codeText}</pre>
          </div>
        );
      }

      // Horizontal Rules
      if (trimmed === "---" || trimmed === "***") {
        return <hr key={idx} className="my-8 border-t border-black/10" />;
      }

      // Blockquotes / Warnings
      if (trimmed.startsWith("> ")) {
        return (
          <blockquote key={idx} className="my-5 pl-4 py-2 border-l-4 border-[#ff4d00] bg-[#ff4d00]/5 rounded-r-2xl text-neutral-800 italic text-base">
            {trimmed.replace(/^>\s*/, "")}
          </blockquote>
        );
      }

      // Ordered lists (1. , 2. )
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split("\n").filter((line) => line.trim().length > 0);
        return (
          <ol key={idx} className="list-decimal pl-6 space-y-2 text-neutral-700 text-base sm:text-lg leading-relaxed my-4">
            {items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item.replace(/^\d+\.\s*/, "")) }} />
            ))}
          </ol>
        );
      }

      // Unordered lists
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const items = trimmed.split("\n").filter((line) => line.trim().length > 0);
        return (
          <ul key={idx} className="list-disc pl-6 space-y-2 text-neutral-700 text-base sm:text-lg leading-relaxed my-4">
            {items.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(item.replace(/^[-*]\s*/, "")) }} />
            ))}
          </ul>
        );
      }

      // Tables
      if (trimmed.includes("|") && trimmed.includes("\n|")) {
        const rows = trimmed.split("\n").filter((r) => r.trim().startsWith("|"));
        if (rows.length >= 2) {
          const headerCols = rows[0].split("|").filter((c) => c.trim().length > 0);
          const dataRows = rows.slice(2);

          return (
            <div key={idx} className="my-6 overflow-x-auto rounded-2xl border border-black/10 shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm border-collapse bg-white">
                <thead>
                  <tr className="bg-neutral-100 border-b border-black/10">
                    {headerCols.map((h, i) => (
                      <th key={i} className="p-3.5 font-mono font-bold text-[#0d0f12]">
                        {h.trim().replace(/\*\*/g, "")}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {dataRows.map((row, rIdx) => {
                    const cols = row.split("|").filter((c) => c.trim().length > 0);
                    return (
                      <tr key={rIdx} className="hover:bg-neutral-50/50">
                        {cols.map((col, cIdx) => (
                          <td key={cIdx} className="p-3.5 text-neutral-700 font-normal" dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(col.trim()) }} />
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
      }

      // Default Paragraph
      return (
        <p
          key={idx}
          className="text-neutral-700 text-base sm:text-lg leading-relaxed mb-4"
          dangerouslySetInnerHTML={{ __html: formatInlineMarkdown(trimmed) }}
        />
      );
    });
  };

  // Helper for bold, italics, links, and inline code
  const formatInlineMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-[#0d0f12]">$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em class="italic text-neutral-800">$1</em>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-neutral-100 font-mono text-xs text-[#ff4d00] font-semibold">$1</code>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-[#ff4d00] font-bold underline hover:text-[#0d0f12] transition-colors">$1</a>');
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <Seo
        title={`${article.metaTitle} — TranscriptG`}
        description={article.metaDescription}
        keywords={article.keywords}
        type="article"
        author={article.author}
        datePublished="2026-08-23"
        faqs={article.faqs}
      />

      {/* Top Breadcrumb & Share */}
      <div className="flex items-center justify-between">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-500 hover:text-[#ff4d00] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Linguistic Journal
        </Link>

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

      {/* Main Article Container */}
      <article className="glass-card p-6 sm:p-12 rounded-3xl border border-black/10 shadow-2xl space-y-8 bg-white">
        {/* Article Header */}
        <header className="space-y-4 pb-8 border-b border-black/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] text-xs font-mono font-bold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" /> {article.category}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0d0f12] tracking-tight leading-[1.15]">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono text-neutral-500 pt-2">
            <span className="flex items-center gap-1.5 font-bold text-[#0d0f12]">
              <User className="w-4 h-4 text-[#ff4d00]" /> {article.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> {article.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> {article.readTime}
            </span>
          </div>

          {/* Executive Summary Box */}
          <div className="mt-6 p-5 rounded-2xl bg-neutral-50 border border-black/5 text-sm text-neutral-700 leading-relaxed space-y-2">
            <div className="flex items-center gap-2 font-mono font-bold text-xs text-[#0d0f12] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#ff4d00]" /> Executive Summary
            </div>
            <p>{article.summary}</p>
          </div>
        </header>

        {/* Table of Contents */}
        {article.tableOfContents && article.tableOfContents.length > 0 && (
          <div className="p-6 rounded-2xl bg-neutral-100/70 border border-black/5 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase text-neutral-500 tracking-wider">
              Table of Contents
            </h3>
            <ul className="space-y-1.5 text-sm">
              {article.tableOfContents.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={`#${item.id}`}
                    className="text-[#0d0f12] hover:text-[#ff4d00] transition-colors font-medium hover:underline"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Rendered Body */}
        <div className="prose prose-neutral max-w-none text-neutral-800 leading-relaxed">
          {renderFormattedContent(article.content)}
        </div>

        {/* FAQs Section if present */}
        {article.faqs && article.faqs.length > 0 && (
          <section id="faqs" className="mt-12 pt-8 border-t border-black/10 space-y-4">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#ff4d00]" />
              <h3 className="text-2xl font-bold text-[#0d0f12]">Frequently Asked Questions</h3>
            </div>
            <div className="space-y-3">
              {article.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl border border-black/10 bg-neutral-50/50 overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-4 text-left font-bold text-sm sm:text-base text-[#0d0f12] flex items-center justify-between gap-3 hover:bg-neutral-100/70 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-neutral-500 flex-shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="p-4 pt-0 text-sm text-neutral-600 leading-relaxed border-t border-black/5 bg-white">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* AUTHOR BIO & E-E-A-T TRUST CARD */}
        <div className="mt-12 pt-8 border-t border-black/10 bg-neutral-50 p-6 sm:p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#0d0f12] text-white flex items-center justify-center font-bold text-lg">
              TG
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-sm text-[#0d0f12]">{article.author}</h4>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Editorial Board
                </span>
              </div>
              <p className="text-xs text-neutral-500">{article.authorRole}</p>
            </div>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed">
            Written and technically peer-reviewed by the TranscriptG Engineering Team. Our editorial standards mandate reproducible audio benchmarks, empirical accuracy metrics, and zero retention of user-uploaded data.
          </p>
        </div>
      </article>

      {/* Explore More Articles Navigation */}
      <div className="pt-8 flex items-center justify-between border-t border-black/10">
        <Link
          to="/blog"
          className="text-xs font-mono font-bold text-[#0d0f12] hover:text-[#ff4d00] transition-colors"
        >
          ← Browse All 18 Technical Guides
        </Link>
        <Link
          to="/transcribe"
          className="px-4 py-2 rounded-xl bg-[#0d0f12] text-white text-xs font-mono font-bold hover:bg-[#ff4d00] transition-colors shadow-sm"
        >
          Launch Free Transcribe Engine →
        </Link>
      </div>
    </div>
  );
};
