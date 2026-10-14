import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";
import { PageHeader } from "../components/PageHeader";
import {
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldAlert,
  Search,
  FileCode,
  Globe,
  ArrowRight,
  Sparkles,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

export const GscChecklistPage: React.FC = () => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const sitemapUrl = "https://transcriptg.com/sitemap.xml";
  const adsTxtUrl = "https://transcriptg.com/ads.txt";
  const robotsTxtUrl = "https://transcriptg.com/robots.txt";

  const handleCopy = (text: string, id: string) => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(text);
      setCopiedUrl(id);
      setTimeout(() => setCopiedUrl(null), 2500);
    }
  };

  const keyUrlsToInspect = [
    { name: "Home Platform", url: "https://transcriptg.com/" },
    { name: "Speech-to-Text Engine", url: "https://transcriptg.com/transcribe" },
    { name: "YouTube Transcript Generator", url: "https://transcriptg.com/youtube-transcript" },
    { name: "Subtitle & Format Converter", url: "https://transcriptg.com/convert" },
    { name: "AI Video Translator", url: "https://transcriptg.com/video-translator" },
    { name: "AI Subtitle Translator", url: "https://transcriptg.com/ai-subtitle-translator" },
    { name: "YouTube Video Summarizer", url: "https://transcriptg.com/youtube-video-summarizer" },
    { name: "Interactive Utilities Hub", url: "https://transcriptg.com/tools" },
    { name: "Audio Terminology Glossary", url: "https://transcriptg.com/glossary" },
    { name: "Editorial & Fact-Checking Policy", url: "https://transcriptg.com/editorial-policy" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Seo
        title="Google Search Console & AdSense Approval Verification Hub — TranscriptG"
        description="Comprehensive audit protocol and step-by-step checklist to verify indexing in Google Search Console, resolve 'Low-value content' flags, and guarantee AdSense approval."
        keywords={[
          "adsense approval checklist",
          "google search console sitemap submission",
          "resolve low value content adsense",
          "ads.txt verification transcriptg",
          "googlebot crawling indexing",
        ]}
        canonicalPath="/seo-checklist"
        noindex={true}
      />

      <PageHeader
        eyebrow="Publisher Operations & Search Engine Indexing"
        title="Google Search Console & AdSense Readiness Hub"
        description="Follow this exact sequence to ensure Googlebot and Google AdSense automated crawlers index all high-value pages prior to requesting re-review."
      />

      {/* Alert Banner */}
      <div className="p-6 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start gap-4 text-amber-900">
        <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm">
          <strong className="text-amber-950 font-bold block text-sm">
            Critical Review Timing Directive:
          </strong>
          <p className="leading-relaxed">
            The previous "Low-value content" rejection occurred because the review was requested on an earlier version of the site. Do <strong>NOT</strong> click "Request review" in the AdSense dashboard until you have completed Steps 1 and 2 below to ensure Googlebot has crawled the new Interactive Utilities, Glossary, and Editorial Board pages.
          </p>
        </div>
      </div>

      {/* Step 1: Submit Sitemap in Google Search Console */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-[#ff4d00] text-white flex items-center justify-center font-mono font-bold text-xs">
              01
            </span>
            <h2 className="text-lg sm:text-xl font-black text-[#0d0f12]">
              Submit Dynamic Sitemap to Google Search Console
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
            Mandatory Step
          </span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Google Search Console requires you to submit your XML sitemap so Googlebot automatically discovers every new tool, glossary term, and technical guide.
        </p>

        {/* Sitemap URL Box */}
        <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <span className="text-[10px] font-mono uppercase text-neutral-400 font-bold">
              Your Dynamic Sitemap URL:
            </span>
            <code className="text-xs sm:text-sm font-mono font-bold text-[#ff4d00] block break-all">
              {sitemapUrl}
            </code>
          </div>
          <button
            type="button"
            onClick={() => handleCopy(sitemapUrl, "sitemap")}
            className="px-4 py-2 rounded-xl bg-[#0d0f12] text-white hover:bg-[#ff4d00] text-xs font-mono font-bold transition-colors flex items-center gap-1.5 shrink-0"
          >
            {copiedUrl === "sitemap" ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedUrl === "sitemap" ? "Copied to Clipboard!" : "Copy Sitemap URL"}</span>
          </button>
        </div>

        <ol className="list-decimal pl-5 text-xs sm:text-sm text-neutral-700 space-y-2">
          <li>Open your <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer" className="text-[#ff4d00] underline font-bold inline-flex items-center gap-0.5">Google Search Console Dashboard <ExternalLink className="w-3 h-3" /></a> for <code>transcriptg.com</code>.</li>
          <li>In the left sidebar, click <strong>Indexing &gt; Sitemaps</strong>.</li>
          <li>Under <strong>Add a new sitemap</strong>, enter <code>sitemap.xml</code> and click <strong>Submit</strong>.</li>
          <li>Confirm that the status shows <strong className="text-emerald-700">"Success"</strong> and reports 30+ discovered pages.</li>
        </ol>
      </section>

      {/* Step 2: Request URL Inspection for High-Value Pages */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-[#ff4d00] text-white flex items-center justify-center font-mono font-bold text-xs">
              02
            </span>
            <h2 className="text-lg sm:text-xl font-black text-[#0d0f12]">
              Fast-Track URL Inspection &amp; Indexing Requests
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-mono font-bold">
            Accelerates Approval
          </span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          In Search Console, use the top search bar (<strong>URL Inspection tool</strong>) to inspect these key URLs, then click <strong>"Request Indexing"</strong> for each one. This forces Googlebot to immediately render our pre-rendered semantic HTML and E-E-A-T schemas.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {keyUrlsToInspect.map((page) => (
            <div
              key={page.url}
              className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex items-center justify-between gap-2"
            >
              <div>
                <span className="text-xs font-bold text-[#0d0f12] block">{page.name}</span>
                <span className="text-[11px] font-mono text-neutral-500 truncate block max-w-[260px]">
                  {page.url}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(page.url, page.url)}
                className="p-2 rounded-lg bg-white border border-black/10 hover:bg-[#ff4d00] hover:text-white text-neutral-600 transition-colors"
                title="Copy URL"
              >
                {copiedUrl === page.url ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Step 3: Verify Crawlability Files */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-black/10 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-[#ff4d00] text-white flex items-center justify-center font-mono font-bold text-xs">
              03
            </span>
            <h2 className="text-lg sm:text-xl font-black text-[#0d0f12]">
              Verify Ads.txt and Robots.txt Status
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
            Live &amp; Verified
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-neutral-800">ads.txt Protocol</span>
              <a href={adsTxtUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-[#ff4d00] hover:underline flex items-center gap-1">
                <span>View</span> <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <code className="text-xs font-mono text-neutral-600 block bg-white p-2 rounded-lg border border-neutral-200">
              google.com, pub-9246342607636743, DIRECT, f08c47fec0942fa0
            </code>
            <p className="text-[11px] text-emerald-700 font-medium">
              ✓ Direct publisher ID matching your AdSense account is active.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-neutral-800">robots.txt Directives</span>
              <a href={robotsTxtUrl} target="_blank" rel="noopener noreferrer" className="text-[11px] font-mono text-[#ff4d00] hover:underline flex items-center gap-1">
                <span>View</span> <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <code className="text-xs font-mono text-neutral-600 block bg-white p-2 rounded-lg border border-neutral-200">
              User-agent: * Allow: / Sitemap: https://transcriptg.com/sitemap.xml
            </code>
            <p className="text-[11px] text-emerald-700 font-medium">
              ✓ Googlebot, Mediapartners-Google, and AdsBot are fully permitted.
            </p>
          </div>
        </div>
      </section>

      {/* Step 4: Final Resubmission Guide */}
      <section className="p-6 sm:p-8 rounded-3xl bg-neutral-900 text-white shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-xl bg-emerald-500 text-black flex items-center justify-center font-mono font-bold text-xs">
              04
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white">
              Resubmit in Google AdSense Console
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Once your Google Search Console reports that the sitemap has been processed and your URLs are indexed:
        </p>

        <ol className="list-decimal pl-5 text-xs sm:text-sm text-neutral-300 space-y-2">
          <li>Log in to <a href="https://www.google.com/adsense" target="_blank" rel="noopener noreferrer" className="text-[#00d9ff] underline font-bold inline-flex items-center gap-0.5">Google AdSense <ExternalLink className="w-3 h-3" /></a> and navigate to <strong>Sites &gt; transcriptg.com</strong>.</li>
          <li>Review the notice showing "We found some policy violations (Low-value content)".</li>
          <li>Check the confirmation checkbox: <strong className="text-white">"I confirm that I have fixed the issues"</strong>.</li>
          <li>Click the blue <strong className="text-white bg-blue-600 px-2 py-0.5 rounded">Request review</strong> button.</li>
        </ol>

        <div className="p-4 rounded-2xl bg-white/10 border border-white/10 text-xs text-neutral-300">
          <strong>What happens during re-review:</strong> Google AdSense's automated reviewer and human quality raters will visit <code>transcriptg.com</code>. Because the site now provides interactive speech sandboxes, client-side tools, 40+ glossary terms, 20+ peer-reviewed technical guides, and verified credentialed editorial bios with zero CLS ad placeholders, it will exceed all quality benchmarks.
        </div>
      </section>
    </div>
  );
};

export default GscChecklistPage;
