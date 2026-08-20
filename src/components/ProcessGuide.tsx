import React, { useState } from "react";
import {
  HelpCircle,
  Cpu,
  Sparkles,
  Zap,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Languages,
  ListChecks,
  Wand2,
  Heading,
  BookOpen,
  ArrowRight,
  Layers,
  FileText,
} from "lucide-react";

export const ProcessGuide: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "What intelligence operations can I perform with Engine 03?",
      a: "Engine 03 provides 5 powerful natural language processing modules: (1) Executive Summarize, (2) Multi-Lingual Translation across 90+ languages, (3) Key Points Bullet Extraction, (4) Polish & Grammar Fix (removes verbal filler like 'um' and 'uh'), and (5) Title & Chapter Marker Generation.",
    },
    {
      q: "Is my text data private and secure?",
      a: "Yes. All text submitted to Engine 03 is processed in ephemeral encrypted memory sessions and immediately erased once your output is generated. We do not log, retain, or train AI models on your input documents.",
    },
    {
      q: "Can I process raw audio transcripts directly from Engine 01?",
      a: "Absolutely! TranscriptG is designed as an integrated ecosystem. You can copy raw verbatim transcripts from Engine 01 and paste them directly into Engine 03 to instantly generate polished meeting notes, executive summaries, or translated manuscripts.",
    },
    {
      q: "What is the maximum word or character limit for text processing?",
      a: "Engine 03 comfortably handles up to 50,000 characters (approx. 10,000 words) per batch request. For longer documents, you can process sections in sequential batches.",
    },
    {
      q: "How accurate is the 90+ language translation engine?",
      a: "Engine 03 utilizes modern contextual LLM translation models that understand technical jargon, idioms, tone, and domain terminology, offering significantly higher nuance and fluency than standard literal machine translation tools.",
    },
    {
      q: "Can I export the processed intelligence result as a document?",
      a: "Yes! You can copy your formatted result with 1-click or export it directly into professional PDF, Microsoft Word (.DOCX), Markdown (.MD), or Plain Text (.TXT) documents.",
    },
  ];

  return (
    <section className="mt-16 pt-12 border-t border-black/10 text-[#0d0f12] space-y-12">
      {/* HEADER BANNER */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 bg-gradient-to-br from-white via-neutral-50 to-blue-50/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00d9ff]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d9ff]/10 text-[#0088cc] font-mono text-xs font-bold uppercase tracking-widest border border-[#00d9ff]/20">
            <BookOpen className="w-3.5 h-3.5" /> Text Intelligence Engine 03 Guide
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#0d0f12] tracking-tight leading-tight">
            AI Text Processing, Summarization & Multi-Lingual Translation
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-3xl">
            Welcome to the comprehensive user guide for <strong>TranscriptG Engine 03</strong>. Transform unorganized text, interview transcripts, meeting recordings, and lengthy articles into polished executive digests, key takeaways, and multi-lingual translations.
          </p>
        </div>
      </div>

      {/* 2-COLUMN OVERVIEW & FEATURES */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-black/10 space-y-4 bg-white">
            <h3 className="text-xl font-black text-[#0d0f12] flex items-center gap-2">
              <Cpu className="w-5 h-5 text-[#ff4d00]" /> What is TranscriptG Engine 03?
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              <strong>TranscriptG Engine 03</strong> is an advanced natural language intelligence engine designed to extract knowledge and value from written content. Raw text—whether transcribed from verbal speech or copied from lengthy PDF reports—is often filled with verbal filler, grammatical noise, run-on sentences, and disorganization.
            </p>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Engine 03 applies specialized neural transformation algorithms that analyze document semantics, extract key narrative themes, eliminate non-essential noise, and structure information for rapid human comprehension.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 space-y-1">
                <div className="text-xs font-mono font-bold text-[#ff4d00]">5 AI Modules</div>
                <p className="text-xs text-neutral-600">Summarize, Translate, Key Points, Polish, and Chapter Breakdown.</p>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 space-y-1">
                <div className="text-xs font-mono font-bold text-[#00d9ff]">90+ Languages</div>
                <p className="text-xs text-neutral-600">Contextually fluent translation preserving domain terminology.</p>
              </div>
            </div>
          </div>

          {/* THE 5 CORE OPERATIONS */}
          <div className="glass-card p-8 rounded-3xl border border-black/10 space-y-6 bg-white">
            <h3 className="text-xl font-black text-[#0d0f12] flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ff4d00]" /> The 5 Intelligence Operations
            </h3>

            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0d0f12]">1. Executive Summarizer</h4>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Distills lengthy articles, transcripts, or reports into a crisp 3–5 sentence high-impact executive summary. Perfect for briefing leadership or getting the main takeaway in 10 seconds.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Languages className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0d0f12]">2. Multi-Lingual Translator</h4>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Translates text into 90+ global languages including Spanish, French, German, Mandarin, Japanese, Portuguese, Hindi, Arabic, and Russian with high syntactic fluency.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <ListChecks className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0d0f12]">3. Key Takeaways & Bullet Points</h4>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Extracts 5–9 key action items, decision points, and salient facts into a clean, scannable markdown bullet list.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Wand2 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0d0f12]">4. Polish & Grammar Fix</h4>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Cleans up spoken transcripts by removing verbal fillers ("um", "uh", "you know"), fixing run-on sentences, and elevating grammatical structure for publication.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-neutral-50 border border-black/5 flex gap-3 items-start">
                <div className="w-8 h-8 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <Heading className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0d0f12]">5. Title & Chapter Marker Generation</h4>
                  <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                    Generates a compelling, professional main headline alongside 3–5 structured chapter section titles for organizing long-form content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SIDEBAR BENEFIT CARDS */}
        <div className="space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-black/10 space-y-4 bg-white">
            <h4 className="text-base font-bold text-[#0d0f12] flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#ff4d00]" /> How to Use Engine 03
            </h4>
            <ol className="space-y-3 text-xs text-neutral-600 font-sans">
              <li className="flex gap-2">
                <strong className="font-mono text-[#ff4d00]">1.</strong>
                <span>Paste or type your source text in the input box.</span>
              </li>
              <li className="flex gap-2">
                <strong className="font-mono text-[#ff4d00]">2.</strong>
                <span>Select your target intelligence operation card.</span>
              </li>
              <li className="flex gap-2">
                <strong className="font-mono text-[#ff4d00]">3.</strong>
                <span>If translating, choose your target language from the 90+ list.</span>
              </li>
              <li className="flex gap-2">
                <strong className="font-mono text-[#ff4d00]">4.</strong>
                <span>Click <strong>"Execute AI Intelligence"</strong> and receive instant results.</span>
              </li>
            </ol>
          </div>

          <div className="glass-card p-6 rounded-3xl border border-black/10 space-y-4 bg-gradient-to-br from-neutral-900 to-[#0d0f12] text-white">
            <h4 className="text-base font-bold flex items-center gap-2 text-[#00d9ff]">
              <ShieldCheck className="w-5 h-5 text-[#00d9ff]" /> Confidentiality Assured
            </h4>
            <p className="text-xs text-neutral-300 leading-relaxed">
              Your documents, business notes, and transcripts are protected under our zero-retention guarantee. Processing occurs in ephemeral server memory with no persistent logging.
            </p>
          </div>
        </div>
      </div>

      {/* FREQUENTLY ASKED QUESTIONS (FAQ) */}
      <div className="glass-card p-8 sm:p-12 rounded-3xl border border-black/10 bg-white space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#ff4d00]/10 text-[#ff4d00] flex items-center justify-center font-bold">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#0d0f12]">Frequently Asked Questions</h3>
            <p className="text-xs text-neutral-500 font-mono">Everything you need to know about Engine 03 text intelligence</p>
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-black/10 rounded-2xl overflow-hidden transition-all bg-neutral-50/50"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full p-5 text-left flex items-center justify-between font-bold text-sm sm:text-base text-[#0d0f12] hover:bg-neutral-100/50 transition-colors"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-[#ff4d00] shrink-0 ml-2" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0 ml-2" />
                )}
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-black/5 pt-3 bg-white">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
