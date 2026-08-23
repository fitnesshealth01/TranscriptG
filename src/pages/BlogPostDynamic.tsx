import React, { useState } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { Seo } from "../components/Seo";
import { BLOG_ARTICLES, getRelatedArticles, getAdjacentArticles } from "../data/blogArticles";
import {
  ArrowLeft,
  ArrowRight,
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
  HelpCircle,
  Compass,
  FileText
} from "lucide-react";

export const BlogPostDynamic: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const article = BLOG_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedArticles = getRelatedArticles(article, 3);
  const { previous, next } = getAdjacentArticles(article.slug);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const encodedUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const encodedTitle = encodeURIComponent(article.title);

  // Handle clicks inside article HTML for client-side navigation of internal links
  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = (e.target as HTMLElement).closest("a");
    if (!target) return;

    const href = target.getAttribute("href");
    if (!href) return;

    // If it's a hash anchor on the same page, let normal smooth scroll handle it
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetElement = document.getElementById(href.substring(1));
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    // If it's an internal relative link (e.g. /blog/xyz or /transcribe)
    if (href.startsWith("/") && !href.startsWith("//")) {
      e.preventDefault();
      navigate(href);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Process HTML content to ensure headings have valid IDs for TOC anchor jumping
  const processArticleHtml = (htmlContent: string) => {
    let processed = htmlContent;

    // Match headings to TOC IDs
    if (article.tableOfContents && article.tableOfContents.length > 0) {
      article.tableOfContents.forEach((tocItem) => {
        const plainTitle = tocItem.title.replace(/<[^>]*>/g, "").trim();
        const escapedTitle = plainTitle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        
        // Match <h2> tags containing the TOC title text
        const h2Regex = new RegExp(`<h2>([\\s\\S]*?${escapedTitle}[\\s\\S]*?)<\\/h2>`, "gi");
        processed = processed.replace(h2Regex, `<h2 id="${tocItem.id}">$1</h2>`);
      });
    }

    // Auto-generate IDs for any remaining <h2> without an id
    processed = processed.replace(/<h2(?![^>]*\bid=)([^>]*)>(.*?)<\/h2>/gi, (_match, attrs, content) => {
      const cleanText = content.replace(/<[^>]*>/g, "");
      const generatedId = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return `<h2 id="${generatedId}"${attrs}>${content}</h2>`;
    });

    // Auto-generate IDs for any remaining <h3> without an id
    processed = processed.replace(/<h3(?![^>]*\bid=)([^>]*)>(.*?)<\/h3>/gi, (_match, attrs, content) => {
      const cleanText = content.replace(/<[^>]*>/g, "");
      const generatedId = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      return `<h3 id="${generatedId}"${attrs}>${content}</h3>`;
    });

    return processed;
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

        {/* Rendered Body with Internal Link Interception */}
        <div
          className="article-content"
          onClick={handleContentClick}
          dangerouslySetInnerHTML={{ __html: processArticleHtml(article.content) }}
        />

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

      {/* SEQUENTIAL PREVIOUS / NEXT NAVIGATION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {previous ? (
          <Link
            to={`/blog/${previous.slug}`}
            className="group p-5 rounded-2xl bg-white border border-black/10 hover:border-[#ff4d00]/40 transition-all shadow-sm flex flex-col justify-between"
          >
            <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1.5 group-hover:text-[#ff4d00] transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Previous Article
            </span>
            <h4 className="font-bold text-sm text-[#0d0f12] group-hover:text-[#ff4d00] transition-colors line-clamp-2 mt-2">
              {previous.title}
            </h4>
          </Link>
        ) : (
          <div className="hidden sm:block" />
        )}

        {next ? (
          <Link
            to={`/blog/${next.slug}`}
            className="group p-5 rounded-2xl bg-white border border-black/10 hover:border-[#ff4d00]/40 transition-all shadow-sm flex flex-col justify-between text-left sm:text-right"
          >
            <span className="text-[11px] font-mono text-neutral-400 flex items-center justify-start sm:justify-end gap-1.5 group-hover:text-[#ff4d00] transition-colors">
              Next Article <ArrowRight className="w-3.5 h-3.5" />
            </span>
            <h4 className="font-bold text-sm text-[#0d0f12] group-hover:text-[#ff4d00] transition-colors line-clamp-2 mt-2">
              {next.title}
            </h4>
          </Link>
        ) : null}
      </div>

      {/* 3 RELATED ARTICLES SECTION */}
      {relatedArticles.length > 0 && (
        <section className="pt-8 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#ff4d00]" />
              <h3 className="text-xl sm:text-2xl font-black text-[#0d0f12]">Related Technical Guides</h3>
            </div>
            <Link
              to="/blog"
              className="text-xs font-mono font-bold text-neutral-500 hover:text-[#ff4d00] transition-colors"
            >
              View all 18 articles →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.slug}
                to={`/blog/${rel.slug}`}
                className="group flex flex-col justify-between p-5 rounded-2xl bg-white border border-black/10 hover:border-[#ff4d00]/50 hover:shadow-xl transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] font-bold">
                      {rel.category}
                    </span>
                    <span className="text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {rel.readTime}
                    </span>
                  </div>

                  <h4 className="font-bold text-base text-[#0d0f12] group-hover:text-[#ff4d00] transition-colors line-clamp-2 leading-snug">
                    {rel.title}
                  </h4>

                  <p className="text-xs text-neutral-600 line-clamp-3 leading-relaxed">
                    {rel.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-black/5 flex items-center justify-between text-xs font-mono font-bold text-[#0d0f12] group-hover:text-[#ff4d00] transition-colors">
                  <span className="flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#ff4d00]" />
                    Read Guide
                  </span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Bottom CTA / Engine Launch Bar */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-black/10">
        <Link
          to="/blog"
          className="text-xs font-mono font-bold text-[#0d0f12] hover:text-[#ff4d00] transition-colors"
        >
          ← Browse All 18 Technical Guides
        </Link>
        <Link
          to="/transcribe"
          className="w-full sm:w-auto text-center px-5 py-2.5 rounded-xl bg-[#0d0f12] text-white text-xs font-mono font-bold hover:bg-[#ff4d00] transition-colors shadow-md"
        >
          Launch Free Transcribe Engine →
        </Link>
      </div>
    </div>
  );
};

