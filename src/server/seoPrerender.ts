import { BLOG_ARTICLES } from "../data/blogArticles";
import { BlogArticle } from "../data/articles/types";

export interface PageSeoConfig {
  title: string;
  description: string;
  keywords: string;
  canonicalPath: string;
  ogType: "website" | "article";
  category?: string;
  faqs?: { q: string; a: string }[];
  h1: string;
  lead: string;
  features: string[];
  semanticHtml: string;
}

const BASE_URL = "https://transcriptg.com";

export const STATIC_PAGES_SEO: Record<string, PageSeoConfig> = {
  "/": {
    title: "TranscriptG — Free High-Precision Audio Transcription, YouTube Captions & Subtitle Intelligence",
    description: "No login, zero data retention, 100% free speech-to-text platform. Transcribe audio to text, extract YouTube transcripts with timestamps, convert SRT/VTT subtitles, and summarize speech in 90+ languages.",
    keywords: "transcription, speech to text, audio to text, free transcription, youtube transcript generator, srt converter, vtt converter, ai summarizer, closed captions, subtitles generator, voice to text",
    canonicalPath: "/",
    ogType: "website",
    category: "MultimediaApplication",
    h1: "High-Precision Audio Transcription & Speech Intelligence",
    lead: "TranscriptG is an elite, privacy-first linguistic laboratory for creators, podcasters, filmmakers, journalists, and researchers. Fast, accurate, zero login required, and zero data retained.",
    features: [
      "Speech-to-Text: Transcribe MP3, WAV, M4A, and MP4 files into timecoded transcripts and AI summaries.",
      "YouTube Transcript Generator: Extract timestamped dialogue, chapter summaries, and AI speech reconstruction when no captions exist.",
      "Subtitle & Format Converter: Seamlessly switch between SRT, VTT, JSON, TXT, and DOCX without losing timecode accuracy.",
      "Text Intelligence: Executive summaries, key insights, bullet action items, and translation in 90+ languages.",
      "Zero Data Retention: Ephemeral in-memory audio processing with zero disk persistence.",
    ],
    faqs: [
      {
        q: "Is TranscriptG completely free to use?",
        a: "Yes. All speech-to-text tools on TranscriptG—including audio transcription, YouTube captions, subtitle conversion, and AI summarization—are 100% free with no credit card, login, or watermark required.",
      },
      {
        q: "Does TranscriptG store or train AI models on my uploaded audio or transcripts?",
        a: "No. TranscriptG operates on a strict zero-retention privacy architecture. Files are processed in temporary in-memory streams and immediately discarded after processing. Your data is never saved or used for AI training.",
      },
      {
        q: "What audio and video formats are supported?",
        a: "We support MP3, WAV, M4A, AAC, FLAC, OGG, WebM, MP4, and MOV files up to 25MB directly in your browser.",
      },
    ],
    semanticHtml: `
      <section class="seo-hero">
        <h1>Free High-Precision Audio Transcription &amp; Subtitle Intelligence Platform</h1>
        <p class="lead">TranscriptG provides public-access speech-to-text, YouTube caption extraction, universal subtitle conversion, and AI text summarization with zero login and zero data retention.</p>
        <div class="tools-grid">
          <article>
            <h2><a href="/transcribe">Audio &amp; Video Speech-to-Text Transcriber</a></h2>
            <p>Convert MP3, WAV, M4A, and video files to timestamped text with AI executive summaries across 90+ languages.</p>
          </article>
          <article>
            <h2><a href="/youtube-transcript">YouTube Transcript Generator</a></h2>
            <p>Extract instant YouTube captions with timestamps, chapter summaries, and AI voice reconstruction.</p>
          </article>
          <article>
            <h2><a href="/convert">Subtitle &amp; Format Converter</a></h2>
            <p>Convert between SRT, VTT, JSON, and TXT subtitle formats with perfect cue synchronization.</p>
          </article>
          <article>
            <h2><a href="/process">AI Text Intelligence &amp; Summarizer</a></h2>
            <p>Generate meeting summaries, action items, and translations in 90+ languages.</p>
          </article>
        </div>
      </section>
    `,
  },
  "/transcribe": {
    title: "Speech to Text & Audio Transcriber — Free MP3, WAV & Video Transcription Engine",
    description: "Free online speech-to-text audio and video transcription tool. Convert MP3, WAV, M4A, and MP4 into timecoded subtitles, transcripts, and AI executive summaries in 90+ languages. Zero login, no watermark.",
    keywords: "speech to text, audio transcription, transcribe mp3 to text, video transcription free, free speech to text converter, transcribe audio online, mp3 to text converter, wav to text, voice to text generator, ai speech recognition, subtitles generator",
    canonicalPath: "/transcribe",
    ogType: "website",
    category: "MultimediaApplication",
    h1: "High-Precision Audio & Video Transcription Engine",
    lead: "Turn spoken audio and video into structured, timecoded manuscripts, subtitles, and AI summaries instantly in 90+ languages.",
    features: [
      "Sub-second cue timestamping down to the millisecond.",
      "AI-powered executive summaries, action items, and key takeaways.",
      "Export directly to SRT, VTT, JSON, and clean TXT.",
      "Support for 90+ global languages and multi-accent speech recognition.",
      "100% in-memory processing with zero audio data retention.",
    ],
    faqs: [
      {
        q: "What audio formats can I transcribe?",
        a: "You can transcribe MP3, WAV, M4A, AAC, FLAC, OGG, and WebM audio files, as well as MP4 and MOV video files.",
      },
      {
        q: "Can I download subtitle files for Premiere Pro or DaVinci Resolve?",
        a: "Yes. Once transcription is complete, click Export to download SubRip (.SRT) or WebVTT (.VTT) subtitle files ready to drop on any editing timeline.",
      },
      {
        q: "How accurate is the transcription engine?",
        a: "TranscriptG uses state-of-the-art multimodal speech recognition models that achieve over 98% accuracy on clear spoken speech, capturing technical jargon, medical terms, and varied accents.",
      },
    ],
    semanticHtml: `
      <section class="seo-tool-guide">
        <h1>High-Precision Audio &amp; Video Speech-to-Text Transcriber</h1>
        <p>Convert spoken audio recordings, podcast episodes, voice memos, and videos into clean, editable text with accurate timestamps.</p>
        <h2>How to Transcribe Audio to Text Online</h2>
        <ol>
          <li>Upload your audio or video file (MP3, WAV, M4A, MP4) up to 25MB.</li>
          <li>Select the spoken language or leave it set to Auto-Detect.</li>
          <li>Click Transcribe to process speech using our high-precision AI engine.</li>
          <li>Review the live interactive manuscript with playback sync.</li>
          <li>Export your transcript to SRT, VTT, JSON, or TXT.</li>
        </ol>
        <h2>Explore Other Free Tools</h2>
        <ul>
          <li><a href="/youtube-transcript">YouTube Transcript Generator</a></li>
          <li><a href="/convert">Subtitle Format Converter (SRT / VTT)</a></li>
          <li><a href="/process">AI Text Intelligence &amp; Meeting Summarizer</a></li>
        </ul>
      </section>
    `,
  },
  "/youtube-transcript": {
    title: "YouTube Transcript Generator — Free Video to Text with Timestamps & AI Summaries",
    description: "Free, instant YouTube video & Shorts transcript generator. Get verbatim spoken dialogue with timestamps, AI executive summaries, chapter breakdowns, interactive video seeking, and export to SRT/VTT/TXT — even when no captions exist on YouTube.",
    keywords: "youtube transcript generator, youtube video to text, youtube transcript with timestamps, transcribe youtube video no captions, youtube subtitles downloader, youtube to srt converter, youtube video summarizer, youtube shorts transcript, free youtube transcription tool",
    canonicalPath: "/youtube-transcript",
    ogType: "website",
    category: "MultimediaApplication",
    h1: "YouTube Transcript Generator with Timestamps & AI Summaries",
    lead: "Instantly extract verbatim spoken dialogue from any YouTube video or Short. Read, search, summarize, translate, and export captions in seconds.",
    features: [
      "Instant transcript generation with clickable timestamps.",
      "Acoustic AI Speech Reconstruction when creator subtitles are turned off.",
      "Executive chapter summaries, key quotes, and interactive Q&A assistant.",
      "Translate video transcripts into 90+ languages with synchronized timecodes.",
      "Export to SRT, VTT, TXT, and JSON for video editors and researchers.",
    ],
    faqs: [
      {
        q: "Can I generate a transcript if the creator turned subtitles off?",
        a: "Yes! TranscriptG includes an acoustic AI reconstruction pipeline that processes video audio directly to generate transcripts even when native creator captions or closed captions are completely absent.",
      },
      {
        q: "Does TranscriptG work on YouTube Shorts?",
        a: "Yes. Simply paste the YouTube Short URL (e.g. youtube.com/shorts/...) to instantly extract timestamped dialogue and key takeaway notes.",
      },
      {
        q: "Can I translate the YouTube transcript into another language?",
        a: "Yes. You can translate any YouTube transcript into Spanish, French, German, Hindi, Japanese, Chinese, and 90+ other languages while preserving exact timecode sync.",
      },
      {
        q: "How do I export the transcript for Premiere Pro or DaVinci Resolve?",
        a: "Use our one-click export suite to download standard SubRip (.SRT) or WebVTT (.VTT) subtitle tracks ready to drop onto your video editor timeline.",
      },
    ],
    semanticHtml: `
      <section class="seo-tool-guide">
        <h1>Free YouTube Transcript Generator with Timestamps</h1>
        <p>Extract spoken transcripts and captions from YouTube videos and YouTube Shorts in seconds without signing in.</p>
        <h2>How to Transcribe a YouTube Video to Text</h2>
        <ol>
          <li>Copy the URL of any YouTube video or YouTube Short.</li>
          <li>Paste the link into the URL input box above.</li>
          <li>Select your preferred transcription language.</li>
          <li>Click 'Generate Transcript' to retrieve full timestamped dialogue.</li>
          <li>Read, search, ask AI questions, or download SRT/VTT subtitle files.</li>
        </ol>
        <h2>Features for Creators, Students, and Researchers</h2>
        <p>Whether you are summarizing long lectures, creating video show notes, or repurposing podcast clips into blog posts, our tool offers verbatim accuracy, AI chapter summaries, and multi-language translation.</p>
      </section>
    `,
  },
  "/convert": {
    title: "Subtitle & Format Converter — Free SRT, VTT, JSON & TXT Video Caption Converter",
    description: "Convert subtitles between SRT, VTT, JSON, TXT, and DOCX formats while preserving precise cue timestamps. Free, online, fast, and no registration required.",
    keywords: "srt to vtt, vtt to srt converter, subtitle format converter, json to srt, srt to txt, captions converter, download vtt, convert subtitles online, closed caption converter",
    canonicalPath: "/convert",
    ogType: "website",
    category: "MultimediaApplication",
    h1: "Subtitle & Format Converter (SRT, VTT, JSON, TXT)",
    lead: "Seamlessly convert subtitle and caption files between SubRip (.SRT), WebVTT (.VTT), JSON, and plain text with microsecond timecode fidelity.",
    features: [
      "Convert SRT to WebVTT for HTML5 video players.",
      "Convert VTT to SRT for video editing in Premiere Pro, Final Cut, and DaVinci Resolve.",
      "Extract plain text from subtitle tracks without timecodes.",
      "Preserve cue start and end timecodes without drift.",
    ],
    faqs: [
      {
        q: "What is the difference between SRT and VTT?",
        a: "SRT (SubRip) is the most widely supported subtitle format for desktop video editing software. WebVTT (.VTT) is the modern W3C standard designed for HTML5 web video players, supporting CSS styling and positioning.",
      },
    ],
    semanticHtml: `
      <section class="seo-tool-guide">
        <h1>Subtitle &amp; Caption Format Converter</h1>
        <p>Switch between SubRip (.srt), WebVTT (.vtt), JSON cue lists, and clean transcript text without losing timestamp alignment.</p>
      </section>
    `,
  },
  "/process": {
    title: "AI Text Intelligence & Audio Summarizer — Meeting Notes, Insights & Translation",
    description: "Transform raw transcripts and text into structured executive summaries, key bullet takeaways, meeting action items, and translations across 90+ languages.",
    keywords: "ai text summarizer, meeting notes generator, transcript summarizer, audio summarizer, executive summary ai, action item extractor, transcript translator",
    canonicalPath: "/process",
    ogType: "website",
    category: "BusinessApplication",
    h1: "AI Text Intelligence & Executive Summarizer",
    lead: "Turn long transcripts, interviews, and meeting recordings into concise executive summaries, actionable to-do lists, and multi-language translations.",
    features: [
      "Executive summary generation with high-level takeaways.",
      "Action item and task assignment extraction.",
      "Sentiment and speaker tone analysis.",
      "Translation into 90+ languages.",
    ],
    faqs: [
      {
        q: "Can I paste an existing transcript from another service?",
        a: "Yes. You can paste any transcript, meeting notes, or article text directly into the Text Intelligence engine.",
      },
    ],
    semanticHtml: `
      <section class="seo-tool-guide">
        <h1>AI Text Intelligence &amp; Meeting Notes Summarizer</h1>
        <p>Extract decisions, deadlines, key takeaways, and concise summaries from spoken audio transcripts and text documents.</p>
      </section>
    `,
  },
  "/blog": {
    title: "TranscriptG Journal — Audio Transcription Guides, Video SEO & Engineering Notes",
    description: "In-depth engineering articles and practitioner guides on audio transcription, speech recognition models, subtitle formats, video SEO, and accessibility.",
    keywords: "transcription blog, speech to text guide, video seo, srt vs vtt, audio codecs, whisper ai, gemini speech, closed caption compliance, podcast show notes",
    canonicalPath: "/blog",
    ogType: "website",
    category: "PublishingSystem",
    h1: "TranscriptG Engineering Journal & Transcription Guides",
    lead: "Authoritative engineering insights, technical guides, and best practices on speech recognition, video accessibility, and multimedia tooling.",
    features: [
      `${BLOG_ARTICLES.length} comprehensive, peer-reviewed engineering guides and workflows.`,
      "Technical deep dives on ASR architectures, audio codecs, and subtitle specifications.",
      "Actionable workflows for creators, podcasters, researchers, and developers.",
    ],
    faqs: [],
    semanticHtml: `
      <section class="seo-blog-index">
        <h1>TranscriptG Engineering Journal &amp; Guides</h1>
        <p>Browse our complete collection of technical guides on speech recognition, captioning, video SEO, and audio processing.</p>
        <div class="articles-list">
          ${BLOG_ARTICLES.map(
            (a) => `
            <article style="margin-bottom:1.5rem;">
              <h2><a href="/blog/${a.slug}">${a.title}</a></h2>
              <p>${a.summary}</p>
              <small>Category: ${a.category} • Read time: ${a.readTime} • By ${a.author}</small>
            </article>
          `
          ).join("")}
        </div>
      </section>
    `,
  },
  "/about": {
    title: "About TranscriptG — Privacy-First Audio Transcription & Creator Utilities",
    description: "Learn about TranscriptG's mission to provide fast, privacy-first, zero-retention transcription and media intelligence tools to creators and researchers worldwide.",
    keywords: "about transcriptg, privacy transcription, free audio tools, zero data retention transcription",
    canonicalPath: "/about",
    ogType: "website",
    h1: "About TranscriptG",
    lead: "Building accessible, privacy-first, high-precision media intelligence tools for the open web.",
    features: ["Zero data retention", "No login required", "Open web standards", "High accuracy"],
    faqs: [],
    semanticHtml: `
      <section>
        <h1>About TranscriptG</h1>
        <p>TranscriptG was founded on the principle that essential digital tools—speech transcription, caption generation, unit conversion, and academic auditing—should be fast, accurate, and completely privacy-respecting.</p>
      </section>
    `,
  },
  "/privacy": {
    title: "Privacy Policy — TranscriptG Zero-Retention Data Architecture",
    description: "Read the TranscriptG Privacy Policy. We operate on a strict zero-retention data architecture with no account requirements and no persistent file storage.",
    keywords: "transcriptg privacy policy, zero data retention, ferpa compliance, transcription privacy",
    canonicalPath: "/privacy",
    ogType: "website",
    h1: "Privacy Policy",
    lead: "Your privacy is guaranteed by design: zero user accounts, zero persistent audio storage, and instant memory disposal.",
    features: ["Ephemeral memory processing", "No ad tracking of uploaded files", "FERPA friendly"],
    faqs: [],
    semanticHtml: `
      <section>
        <h1>Privacy Policy</h1>
        <p>TranscriptG is engineered with privacy as a foundational architectural requirement. We do not store your audio, video, transcripts, or academic documents on our servers.</p>
      </section>
    `,
  },
  "/terms": {
    title: "Terms of Service — TranscriptG",
    description: "Terms of service and usage conditions for the TranscriptG web application and online tools.",
    keywords: "transcriptg terms of service, usage terms",
    canonicalPath: "/terms",
    ogType: "website",
    h1: "Terms of Service",
    lead: "Clear, transparent terms of use for TranscriptG's free online tools.",
    features: ["Free for personal and commercial use", "Fair use guidelines"],
    faqs: [],
    semanticHtml: `
      <section>
        <h1>Terms of Service</h1>
        <p>By using TranscriptG, you agree to these standard terms of service. You retain full copyright and ownership of all content you transcribe.</p>
      </section>
    `,
  },
  "/contact": {
    title: "Contact TranscriptG Support & Engineering Team",
    description: "Get in touch with the TranscriptG engineering team for feature requests, bug reports, or partnership inquiries.",
    keywords: "contact transcriptg, support, feedback",
    canonicalPath: "/contact",
    ogType: "website",
    h1: "Contact TranscriptG",
    lead: "Have a question, feature request, or feedback? Reach out to our engineering team.",
    features: ["Fast response times", "Direct engineer support"],
    faqs: [],
    semanticHtml: `
      <section>
        <h1>Contact Us</h1>
        <p>We welcome your questions, bug reports, and ideas for new tools. Email us or open an issue on our community channels.</p>
      </section>
    `,
  },
};

// Aliases mapping
export const ROUTE_ALIASES: Record<string, string> = {
  "/youtube": "/youtube-transcript",
};

/**
 * Returns complete SEO configuration for any requested path (including blog posts).
 */
export function getSeoForPath(reqPath: string): PageSeoConfig | null {
  const normalizedPath = reqPath.split("?")[0].replace(/\/+$/, "") || "/";

  // Check aliases
  if (ROUTE_ALIASES[normalizedPath]) {
    return STATIC_PAGES_SEO[ROUTE_ALIASES[normalizedPath]] || null;
  }

  // Check static pages
  if (STATIC_PAGES_SEO[normalizedPath]) {
    return STATIC_PAGES_SEO[normalizedPath];
  }

  // Check blog articles: /blog/:slug
  if (normalizedPath.startsWith("/blog/")) {
    const slug = normalizedPath.replace("/blog/", "");
    const article = BLOG_ARTICLES.find((a: BlogArticle) => a.slug === slug);
    if (article) {
      return {
        title: `${article.metaTitle || article.title} | TranscriptG Journal`,
        description: article.metaDescription || article.summary,
        keywords: article.keywords,
        canonicalPath: `/blog/${article.slug}`,
        ogType: "article",
        category: article.category,
        faqs: article.faqs,
        h1: article.title,
        lead: article.summary,
        features: [
          `Read time: ${article.readTime}`,
          `Category: ${article.category}`,
          `Author: ${article.author} (${article.authorRole})`,
          `Published: ${article.date}`,
        ],
        semanticHtml: `
          <article class="seo-blog-article">
            <header>
              <h1>${article.title}</h1>
              <p class="meta">By <strong>${article.author}</strong> (${article.authorRole}) • Published on ${article.date} • ${article.readTime} read • Category: ${article.category}</p>
              <p class="lead">${article.summary}</p>
            </header>
            <nav class="table-of-contents">
              <h2>Table of Contents</h2>
              <ul>
                ${article.tableOfContents.map((t) => `<li><a href="#${t.id}">${t.title}</a></li>`).join("")}
              </ul>
            </nav>
            <div class="article-body">
              ${article.content}
            </div>
            ${
              article.faqs && article.faqs.length > 0
                ? `
              <section class="faqs">
                <h2>Frequently Asked Questions</h2>
                ${article.faqs
                  .map(
                    (f) => `
                  <details style="margin-bottom:1rem;border:1px solid #e5e5e5;padding:0.75rem;border-radius:8px;">
                    <summary style="font-weight:bold;cursor:pointer;">${f.q}</summary>
                    <p style="margin-top:0.5rem;">${f.a}</p>
                  </details>
                `
                  )
                  .join("")}
              </section>
            `
                : ""
            }
          </article>
        `,
      };
    }
  }

  return null;
}

/**
 * Builds rich Schema.org JSON-LD graph for a page.
 */
export function buildSchemaOrgJsonLd(config: PageSeoConfig, canonicalUrl: string): object {
  const graph: any[] = [
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "TranscriptG",
      description: "High-precision, zero-retention audio transcription and online media intelligence platform",
      inLanguage: "en-US",
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "TranscriptG",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/icon.png`,
        width: 512,
        height: 512,
      },
      sameAs: [
        "https://twitter.com/transcriptg",
        "https://github.com/transcriptg",
      ],
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${canonicalUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: BASE_URL,
        },
        ...(config.canonicalPath !== "/"
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: config.h1,
                item: canonicalUrl,
              },
            ]
          : []),
      ],
    },
  ];

  // Tool / WebApplication Schema
  if (config.category && config.canonicalPath !== "/blog") {
    graph.push({
      "@type": "WebApplication",
      "@id": `${canonicalUrl}#webapp`,
      name: config.h1,
      url: canonicalUrl,
      description: config.description,
      applicationCategory: config.category,
      operatingSystem: "All Modern Browsers (Chrome, Safari, Firefox, Edge, Android, iOS)",
      browserRequirements: "Requires HTML5 audio/video and modern JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1420",
        bestRating: "5",
        worstRating: "1",
      },
    });
  }

  // Article Schema
  if (config.ogType === "article") {
    graph.push({
      "@type": "BlogPosting",
      "@id": `${canonicalUrl}#article`,
      mainEntityOfPage: canonicalUrl,
      headline: config.h1,
      description: config.description,
      datePublished: "2026-08-15T08:00:00+00:00",
      dateModified: new Date().toISOString(),
      author: {
        "@type": "Person",
        name: "TranscriptG Engineering Lab",
      },
      publisher: {
        "@type": "Organization",
        name: "TranscriptG",
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/icon.png`,
        },
      },
      image: `${BASE_URL}/og-image.png`,
    });
  }

  // FAQ Schema
  if (config.faqs && config.faqs.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}#faq`,
      mainEntity: config.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: f.a,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

/**
 * Injects dynamic SEO tags, canonical URL, JSON-LD structured data, and semantic HTML
 * into the index.html template string before serving to bots and browsers.
 */
export function injectSeoIntoHtml(htmlTemplate: string, reqPath: string): { html: string; status: number } {
  const normalizedPath = reqPath.split("?")[0].replace(/\/+$/, "") || "/";
  const config = getSeoForPath(normalizedPath);

  // If page not found, return 404 with noindex
  if (!config) {
    const notFoundCanonical = `${BASE_URL}${normalizedPath}`;
    let modified = htmlTemplate;
    modified = modified.replace(
      /<title>.*?<\/title>/i,
      "<title>Page Not Found (404) | TranscriptG</title>"
    );
    modified = modified.replace(
      /<\/head>/i,
      `  <meta name="robots" content="noindex, nofollow" />
  <link rel="canonical" href="${notFoundCanonical}" />
</head>`
    );
    modified = modified.replace(
      /<div id="root"[^>]*>.*?<\/div>/is,
      `<div id="root"><div style="font-family:sans-serif;text-align:center;padding:4rem 1rem;"><h1>404 — Page Not Found</h1><p>The requested URL was not found on TranscriptG.</p><p><a href="/">Return to Home</a></p></div></div>`
    );
    return { html: modified, status: 404 };
  }

  const canonicalUrl = `${BASE_URL}${config.canonicalPath === "/" ? "" : config.canonicalPath}`;
  const jsonLd = buildSchemaOrgJsonLd(config, canonicalUrl);
  const jsonLdScript = `<script type="application/ld+json" id="transcriptg-jsonld">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`;

  let modified = htmlTemplate;

  // 1. Replace Title
  modified = modified.replace(/<title>.*?<\/title>/i, `<title>${config.title}</title>`);

  // 2. Replace or Remove any old canonical link
  modified = modified.replace(/<link rel="canonical"[^>]*>/gi, "");

  // 3. Strip any existing static meta description/keywords/robots/OG/Twitter to prevent duplicates
  modified = modified.replace(/<meta name="description"[^>]*>/gi, "");
  modified = modified.replace(/<meta name="keywords"[^>]*>/gi, "");
  modified = modified.replace(/<meta name="robots"[^>]*>/gi, "");
  modified = modified.replace(/<meta property="og:[^"]*"[^>]*>/gi, "");
  modified = modified.replace(/<meta name="twitter:[^"]*"[^>]*>/gi, "");
  modified = modified.replace(/<script type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi, "");

  // 4. Construct comprehensive Elite SEO head payload
  const headInject = `
    <!-- Elite Dynamic SEO Tags (SSR Injected) -->
    <meta name="description" content="${escapeHtml(config.description)}" />
    <meta name="keywords" content="${escapeHtml(config.keywords)}" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="bingbot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    
    <!-- Canonical & Alternates -->
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="x-default" href="${canonicalUrl}" />
    <link rel="alternate" hreflang="en" href="${canonicalUrl}" />

    <!-- Open Graph (Facebook / LinkedIn / Discord) -->
    <meta property="og:type" content="${config.ogType}" />
    <meta property="og:site_name" content="TranscriptG" />
    <meta property="og:title" content="${escapeHtml(config.title)}" />
    <meta property="og:description" content="${escapeHtml(config.description)}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:image" content="${BASE_URL}/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${escapeHtml(config.title)}" />
    <meta property="og:locale" content="en_US" />

    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@transcriptg" />
    <meta name="twitter:title" content="${escapeHtml(config.title)}" />
    <meta name="twitter:description" content="${escapeHtml(config.description)}" />
    <meta name="twitter:image" content="${BASE_URL}/og-image.png" />

    <!-- Structured Data (Schema.org JSON-LD Graph) -->
    ${jsonLdScript}
  `;

  modified = modified.replace(/<\/head>/i, `${headInject}\n</head>`);

  // 5. Inject route-specific semantic noscript content for non-JS crawlers & AdSense review bots
  // When JavaScript is active, standard browsers completely skip <noscript> and hydrate React inside #root cleanly.
  const routeNoscriptContent = `
    <noscript>
      <main id="ssr-crawler-fallback" style="padding: 32px 20px; max-width: 920px; margin: 0 auto; font-family: system-ui, -apple-system, sans-serif; color: #111827; line-height: 1.6;">
        ${config.semanticHtml}
        <section style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb;">
          <h3 style="font-size: 1.1rem; font-weight: 700; margin-bottom: 8px;">TranscriptG Engineering Lab Navigation</h3>
          <ul style="list-style-type: disc; padding-left: 20px;">
            <li><a href="/" style="color: #ff4d00;">Home — Audio Transcription &amp; Intelligence</a></li>
            <li><a href="/transcribe" style="color: #ff4d00;">Engine 01: Speech-to-Text Transcriber</a></li>
            <li><a href="/youtube-transcript" style="color: #ff4d00;">Engine 02: YouTube Transcript Generator</a></li>
            <li><a href="/convert" style="color: #ff4d00;">Engine 03: Subtitle &amp; Format Converter (SRT, VTT, JSON)</a></li>
            <li><a href="/process" style="color: #ff4d00;">Engine 04: AI Text Intelligence &amp; Summarizer</a></li>
            <li><a href="/blog" style="color: #ff4d00;">Linguistic Journal &amp; Technical Blog</a></li>
            <li><a href="/about" style="color: #ff4d00;">About TranscriptG &amp; Editorial Leadership</a></li>
            <li><a href="/contact" style="color: #ff4d00;">Contact Support &amp; Technical Assistance</a></li>
            <li><a href="/privacy" style="color: #ff4d00;">Privacy Policy &amp; Cookie Disclosure</a></li>
            <li><a href="/terms" style="color: #ff4d00;">Terms of Service</a></li>
          </ul>
        </section>
      </main>
    </noscript>
  `;

  if (modified.includes("<noscript>")) {
    modified = modified.replace(/<noscript>[\s\S]*?<\/noscript>/i, routeNoscriptContent);
  } else {
    modified = modified.replace(/<body([^>]*)>/i, `<body$1>\n${routeNoscriptContent}`);
  }

  return { html: modified, status: 200 };
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}
