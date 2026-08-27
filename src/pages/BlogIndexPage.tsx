import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import { BLOG_ARTICLES } from "../data/blogArticles";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Search,
  Tag,
  Sparkles,
  ShieldCheck,
  Zap,
  Code2
} from "lucide-react";

export const BlogIndexPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Architecture",
    "Best Practices",
    "Guides",
    "Workflows",
    "Acoustic Science",
    "SEO & Growth",
    "Legal & Standards",
    "Media Production",
    "Linguistics",
    "Healthcare & AI",
    "Academic & Research",
    "Tutorials",
    "Video Engineering",
    "Developer",
    "AI & Research",
  ];

  const filteredArticles = BLOG_ARTICLES.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.keywords.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || article.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-12">
      <Seo
        title="Speech Technology & Subtitle Engineering Journal — TranscriptG"
        description="Comprehensive technical breakdowns, acoustic engineering benchmarks, subtitle standards (SRT vs VTT), ADA compliance, and AI speech workflows."
        keywords={[
          "speech recognition blog",
          "audio transcription guides",
          "subtitle formats guide",
          "speech to text benchmarks",
          "acoustic engineering articles",
          "srt vs vtt comparison",
          "youtube captions workflow",
        ]}
        canonicalPath="/blog"
      />

      <PageHeader
        eyebrow="Knowledge Base · 18 Comprehensive Guides"
        title="Linguistic Journal & Audio Engineering Guides"
        description="Authoritative, peer-reviewed engineering breakdowns, acoustic standards, compliance blueprints, and modern AI transcription workflows."
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Search & Filter Controls */}
        <div className="glass-card p-6 rounded-3xl border border-black/10 shadow-lg space-y-4 bg-white">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across 18 guides (e.g. ADA, SRT vs VTT, Whisper, Podcasts, SOAP notes)..."
                className="w-full pl-11 pr-4 py-3 bg-neutral-50 rounded-2xl border border-neutral-200 text-sm text-[#0d0f12] focus:outline-none focus:border-[#ff4d00] font-sans"
              />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-500 whitespace-nowrap self-end sm:self-center">
              <span className="font-bold text-[#0d0f12]">{filteredArticles.length}</span> of{" "}
              {BLOG_ARTICLES.length} Guides
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-[#ff4d00] text-white shadow-md shadow-[#ff4d00]/20"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/70"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Article Banner if 'All' and no search */}
        {selectedCategory === "All" && !searchQuery && BLOG_ARTICLES.length > 0 && (
          <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 shadow-2xl bg-gradient-to-br from-neutral-900 to-[#0d0f12] text-white space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff4d00]/20 text-[#ff4d00] text-xs font-mono font-bold uppercase tracking-wider border border-[#ff4d00]/30">
              <Sparkles className="w-3.5 h-3.5" /> Featured Architecture Guide
            </div>

            <div className="space-y-3 max-w-3xl">
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                {BLOG_ARTICLES[0].title}
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                {BLOG_ARTICLES[0].summary}
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
              <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {BLOG_ARTICLES[0].readTime}
                </span>
                <span>By {BLOG_ARTICLES[0].author}</span>
              </div>
              <Link
                to={`/blog/${BLOG_ARTICLES[0].slug}`}
                className="px-6 py-2.5 rounded-xl bg-[#ff4d00] text-white text-xs font-mono font-bold hover:bg-[#e04400] transition-colors flex items-center gap-2"
              >
                Read Architectural Deep Dive <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        {filteredArticles.length === 0 ? (
          <div className="glass-card p-12 rounded-3xl border border-black/10 text-center space-y-3">
            <p className="text-neutral-500 text-sm font-mono">No articles found matching "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="text-xs font-mono font-bold text-[#ff4d00] underline"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((art) => (
              <Link
                key={art.slug}
                to={`/blog/${art.slug}`}
                className="glass-card glass-card-hover p-6 sm:p-8 rounded-3xl border border-black/10 flex flex-col justify-between group bg-white"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] text-[11px] font-mono font-bold uppercase">
                      <Tag className="w-3 h-3" /> {art.category}
                    </span>
                    <span className="text-[11px] font-mono text-neutral-400">
                      {art.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-[#0d0f12] group-hover:text-[#ff4d00] transition-colors leading-snug">
                    {art.title}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between text-xs font-mono text-neutral-500">
                  <span className="text-[11px]">{art.date}</span>
                  <span className="text-[#ff4d00] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                    Read Guide <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
