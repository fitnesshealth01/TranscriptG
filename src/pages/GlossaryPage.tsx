import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { FormatComparisonMatrix } from "../components/FormatComparisonMatrix";
import { GLOSSARY_TERMS, GLOSSARY_CATEGORIES, GlossaryTerm } from "../data/glossaryData";
import {
  Search,
  BookOpen,
  SlidersHorizontal,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Code2,
  FileText,
} from "lucide-react";

export const GlossaryPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [copiedTermId, setCopiedTermId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"terms" | "matrix">("terms");

  // Filtered terms
  const filteredTerms = useMemo(() => {
    return GLOSSARY_TERMS.filter((term) => {
      const matchesCategory =
        selectedCategory === "All Categories" || term.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        term.term.toLowerCase().includes(q) ||
        term.shortDef.toLowerCase().includes(q) ||
        term.fullExplanation.toLowerCase().includes(q) ||
        (term.standardOrFormula && term.standardOrFormula.toLowerCase().includes(q)) ||
        term.relatedTerms.some((t) => t.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedCategory]);

  // Alphabet letters available
  const availableLetters = useMemo(() => {
    const letters = new Set<string>();
    GLOSSARY_TERMS.forEach((t) => {
      letters.add(t.term.charAt(0).toUpperCase());
    });
    return Array.from(letters).sort();
  }, []);

  const handleCopyLink = (id: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}/glossary#${id}`;
      navigator.clipboard.writeText(url).then(() => {
        setCopiedTermId(id);
        setTimeout(() => setCopiedTermId(null), 2000);
      });
    }
  };

  const scrollToLetter = (letter: string) => {
    const target = filteredTerms.find((t) => t.term.toUpperCase().startsWith(letter));
    if (target) {
      const el = document.getElementById(target.id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Seo
        title="Audio & Subtitle Glossary – TranscriptG"
        description="Definitions for speech recognition, audio and subtitle terms including WER, sample rates, SRT, WebVTT and closed captioning standards."
        keywords={[
          "audio engineering glossary",
          "speech recognition terminology",
          "wer word error rate definition",
          "webvtt vs srt specifications",
          "subtitle characters per second",
        ]}
        canonicalPath="/glossary"
      />

      {/* Hero Header */}
      <div className="space-y-4 text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4d00]/10 text-[#ff4d00] font-mono text-xs font-bold border border-[#ff4d00]/20">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Reference Guide</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-[#0d0f12] tracking-tight">
          Audio &amp; Subtitle Glossary
        </h1>
        <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
          Clear explanations of common audio signal terms, speech recognition concepts, and subtitle format standards.
        </p>

        {/* View Switcher Tabs */}
        <div className="inline-flex items-center gap-1 p-1.5 bg-neutral-200/70 rounded-2xl border border-black/5 mt-4">
          <button
            type="button"
            onClick={() => setActiveTab("terms")}
            className={`px-5 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
              activeTab === "terms"
                ? "bg-white text-black shadow-md"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Terminology Directory ({GLOSSARY_TERMS.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("matrix")}
            className={`px-5 py-2 rounded-xl font-mono text-xs font-bold transition-all ${
              activeTab === "matrix"
                ? "bg-white text-black shadow-md"
                : "text-neutral-600 hover:text-black"
            }`}
          >
            Format Comparison Matrix
          </button>
        </div>
      </div>

      {activeTab === "matrix" ? (
        <div className="pt-4">
          <FormatComparisonMatrix />
        </div>
      ) : (
        <div className="space-y-8">
          {/* Search & Filter Toolbar */}
          <div className="p-4 sm:p-6 rounded-3xl bg-white border border-black/10 shadow-sm space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search terms, formulas, acronyms (e.g. WER, Nyquist, CEA-608, WebVTT)..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#ff4d00] text-sm text-[#0d0f12] placeholder-neutral-400 font-sans"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-neutral-400 hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-mono text-neutral-500 mr-1 hidden sm:inline">Category:</span>
              {GLOSSARY_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-[#0d0f12] text-white shadow-sm"
                      : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Quick A-Z Alphabet Bar */}
            <div className="flex items-center gap-1 overflow-x-auto pt-2 border-t border-black/5 pb-1">
              <span className="text-[11px] font-mono text-neutral-400 mr-2 shrink-0">Jump:</span>
              {availableLetters.map((letter) => (
                <button
                  key={letter}
                  type="button"
                  onClick={() => scrollToLetter(letter)}
                  className="w-7 h-7 rounded-lg bg-neutral-100 hover:bg-[#ff4d00] hover:text-white font-mono text-xs font-bold text-neutral-600 transition-colors shrink-0 flex items-center justify-center"
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          {/* Results Summary */}
          <div className="flex items-center justify-between text-xs font-mono text-neutral-500 px-2">
            <span>
              Showing {filteredTerms.length} of {GLOSSARY_TERMS.length} terms
            </span>
            {searchQuery && (
              <span>
                Filtered by "<span className="text-black font-bold">{searchQuery}</span>"
              </span>
            )}
          </div>

          {/* Terms Grid */}
          {filteredTerms.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-3xl border border-black/10 space-y-3">
              <BookOpen className="w-10 h-10 text-neutral-300 mx-auto" />
              <h3 className="text-lg font-bold text-neutral-800">No matching technical terms found</h3>
              <p className="text-xs text-neutral-500 max-w-md mx-auto">
                Try searching for related keywords like "sample rate", "error rate", "subtitles", or reset your category filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All Categories");
                }}
                className="px-4 py-2 rounded-xl bg-[#0d0f12] text-white text-xs font-mono font-bold mt-2"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTerms.map((term) => (
                <article
                  key={term.id}
                  id={term.id}
                  className="p-6 rounded-3xl bg-white border border-black/10 shadow-sm flex flex-col justify-between hover:border-[#ff4d00]/40 transition-all group"
                >
                  <div className="space-y-3">
                    {/* Category & Permlink Row */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700">
                        {term.category}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(term.id)}
                        className="text-neutral-400 hover:text-[#ff4d00] transition-colors p-1.5 rounded-lg hover:bg-neutral-100 flex items-center gap-1 text-[11px] font-mono"
                        title="Copy direct permalink"
                      >
                        {copiedTermId === term.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span className="text-emerald-600 font-bold">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Link</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Term Name */}
                    <h2 className="text-xl font-black text-[#0d0f12] group-hover:text-[#ff4d00] transition-colors tracking-tight">
                      {term.term}
                    </h2>

                    {/* Short definition */}
                    <p className="text-xs font-semibold text-neutral-800 leading-snug">
                      {term.shortDef}
                    </p>

                    {/* Full Explanation */}
                    <p className="text-xs text-neutral-600 leading-relaxed font-sans">
                      {term.fullExplanation}
                    </p>

                    {/* Formula / Standards Box */}
                    {term.standardOrFormula && (
                      <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200/80 font-mono text-[11px] text-neutral-800 space-y-1">
                        <span className="text-[9px] uppercase tracking-wider text-neutral-400 font-bold block">
                          Formula / Standard Spec
                        </span>
                        <code className="text-[#ff4d00] font-bold block overflow-x-auto">
                          {term.standardOrFormula}
                        </code>
                      </div>
                    )}

                    {/* Practical Application */}
                    <div className="text-[11px] text-neutral-600 pt-1">
                      <strong className="text-neutral-900 font-mono">Industry Practice:</strong>{" "}
                      {term.practicalApplication}
                    </div>
                  </div>

                  {/* Related Terms Row */}
                  <div className="mt-5 pt-3 border-t border-black/5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono text-neutral-400 mr-1">Related:</span>
                    {term.relatedTerms.map((rt) => (
                      <button
                        key={rt}
                        type="button"
                        onClick={() => setSearchQuery(rt)}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 hover:bg-[#ff4d00] hover:text-white transition-colors"
                      >
                        {rt}
                      </button>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Reference & Cross-Links */}
          <div className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-6 border border-white/10 shadow-xl mt-12">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff4d00]/20 text-[#ff4d00] font-mono text-xs font-bold">
                <BookOpen className="w-3.5 h-3.5" /> Technical Reference
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                Audio &amp; Subtitle Standards Reference
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Compiled to help video creators, podcasters, and developers understand subtitle formatting, speech recognition terms, and audio specifications.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <Link
                to="/tools"
                className="px-4 py-2.5 rounded-xl bg-[#ff4d00] hover:bg-[#e04400] text-white font-mono text-xs font-bold transition-all shadow-md"
              >
                Interactive Utilities →
              </Link>
              <Link
                to="/about"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold transition-all"
              >
                About TranscriptG
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GlossaryPage;
