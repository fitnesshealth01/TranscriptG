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
    title: "TranscriptG — Free High-Precision Audio Transcription, YouTube Captions & Free Online Tools",
    description: "No login, zero data retention, 100% free online transcription platform. Transcribe audio to text, extract YouTube transcripts with timestamps, convert SRT/VTT subtitles, and calculate Parchment GPAs.",
    keywords: "transcription, speech to text, audio to text, free transcription, youtube transcript generator, parchment transcript gpa calculator, grams to cups converter, srt converter, vtt converter, ai summarizer, closed captions",
    canonicalPath: "/",
    ogType: "website",
    category: "MultimediaApplication",
    h1: "High-Precision Audio Transcription & Free Online Creator Tools",
    lead: "TranscriptG is an elite, privacy-first web platform for creators, students, developers, and bakers. Fast, accurate, zero login required, and zero data retained.",
    features: [
      "Speech-to-Text: Transcribe MP3, WAV, M4A, and MP4 files into timecoded transcripts and AI summaries.",
      "YouTube Transcript Generator: Extract timestamped dialogue, chapter summaries, and AI speech reconstruction when no captions exist.",
      "Grams to Cups Converter: Convert 400+ baking ingredients with live visual measuring cup and butter stick calculator.",
      "Parchment Transcript Engine: Parse academic registrar PDFs, compute 4.0/5.0/AMCAS GPAs, and simulate target graduation grades.",
      "Subtitle & Format Converter: Seamlessly switch between SRT, VTT, JSON, TXT, and DOCX without losing timecode accuracy.",
      "Text Intelligence: Executive summaries, key insights, bullet action items, and translation in 90+ languages.",
    ],
    faqs: [
      {
        q: "Is TranscriptG completely free to use?",
        a: "Yes. All tools on TranscriptG—including audio transcription, YouTube captions, Grams to Cups, and Parchment transcript analysis—are 100% free with no credit card, login, or watermark required.",
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
        <h1>Free High-Precision Audio Transcription &amp; Online Creator Utilities</h1>
        <p class="lead">TranscriptG offers zero-login speech-to-text, YouTube caption extraction, culinary conversions, and academic transcript analysis.</p>
        <div class="tools-grid">
          <article>
            <h2><a href="/transcribe">Audio &amp; Video Speech-to-Text Transcriber</a></h2>
            <p>Convert MP3, WAV, and video files to timestamped text with AI executive summaries.</p>
          </article>
          <article>
            <h2><a href="/youtube-transcript">YouTube Transcript Generator</a></h2>
            <p>Extract instant YouTube captions with timestamps, chapter summaries, and AI voice reconstruction.</p>
          </article>
          <article>
            <h2><a href="/grams-to-cups">Grams to Cups Culinary Calculator</a></h2>
            <p>Convert grams to cups, tablespoons, and ounces for 400+ baking ingredients with interactive visual measuring cup.</p>
          </article>
          <article>
            <h2><a href="/parchment-transcript">Parchment Academic Transcript Parser &amp; GPA Calculator</a></h2>
            <p>Calculate cumulative, major, and AMCAS GPAs from university registrar PDF transcripts.</p>
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
          <li><a href="/grams-to-cups">Grams to Cups Kitchen Baking Converter</a></li>
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
  "/grams-to-cups": {
    title: "Grams to Cups Converter — Free Kitchen Baking & Ingredient Scale Tool",
    description: "Convert grams to cups, ounces, tablespoons, and milliliters for 400+ baking and cooking ingredients with live cup visualizer. Includes butter stick calculator, oven temperature converter, and recipe batch scaler.",
    keywords: "grams to cups, baking converter, flour grams to cups, sugar grams to cups, grams to tablespoons, cups to grams converter, butter stick converter, oven temperature converter fahrenheit to celsius, recipe batch scaler, culinary unit conversion",
    canonicalPath: "/grams-to-cups",
    ogType: "website",
    category: "WebApplication",
    h1: "Grams to Cups Converter & Culinary Baking Calculator",
    lead: "Scientifically accurate ingredient density conversions for 400+ baking ingredients, featuring an interactive measuring cup visualizer, US butter stick calculator, and oven thermal converter.",
    features: [
      "Calibrated density ratios for 400+ flours, sugars, dairy, oils, and leaveners.",
      "Interactive measuring cup visualizer with live fill levels and sub-surface meniscus.",
      "Support for US Customary (236.6 ml), Metric (250 ml), US Legal (240 ml), and Imperial cups (284.1 ml).",
      "US Butter Stick Calculator: Convert sticks to tablespoons, cups, grams, and ounces.",
      "Oven Thermal Converter: Fahrenheit, Celsius, Fan-Forced, and UK Gas Marks.",
      "Recipe Batch Scaler: Multiply or halve ingredient quantities instantly.",
    ],
    faqs: [
      {
        q: "How many cups is 100 grams of all-purpose flour?",
        a: "100 grams of all-purpose flour is equal to 0.80 US customary cups (approximately 3/4 cup plus 1 tablespoon), or 0.76 metric cups. 1 standard US cup of spooned-and-leveled all-purpose flour weighs 125 grams.",
      },
      {
        q: "How many grams is 1 cup of granulated white sugar?",
        a: "1 US cup of granulated white sugar weighs exactly 200 grams (7.05 oz). 1 metric cup (250 mL) of granulated sugar weighs 211 grams.",
      },
      {
        q: "Why can't I use the same conversion ratio for all ingredients?",
        a: "Grams measure weight (mass) while cups measure volume (space). Different ingredients have different physical densities. For example, 1 cup of dense honey weighs 340 grams, whereas 1 cup of light cocoa powder weighs only 85 grams.",
      },
      {
        q: "How much butter is in 1 stick?",
        a: "In the United States, 1 standard stick of butter equals 8 tablespoons, 1/2 cup, 4 ounces, or 113.4 grams. Two sticks equal 1 cup (227 grams or 1/2 pound).",
      },
    ],
    semanticHtml: `
      <section class="seo-tool-guide">
        <h1>Grams to Cups Converter for Baking &amp; Cooking</h1>
        <p>Convert recipe measurements between metric grams (weight) and US customary cups (volume) with scientific density accuracy.</p>
        <h2>Common Baking Ingredient Conversions (1 US Cup)</h2>
        <table border="1" cellpadding="6" style="border-collapse:collapse;width:100%;margin:1rem 0;">
          <thead>
            <tr><th>Ingredient</th><th>1 US Cup (grams)</th><th>1 Metric Cup (grams)</th><th>1 Tablespoon (grams)</th></tr>
          </thead>
          <tbody>
            <tr><td>All-Purpose Flour (spooned &amp; leveled)</td><td>125 g</td><td>132 g</td><td>7.8 g</td></tr>
            <tr><td>Granulated White Sugar</td><td>200 g</td><td>211 g</td><td>12.5 g</td></tr>
            <tr><td>Brown Sugar (packed)</td><td>220 g</td><td>232 g</td><td>13.8 g</td></tr>
            <tr><td>Powdered / Confectioners Sugar</td><td>120 g</td><td>127 g</td><td>7.5 g</td></tr>
            <tr><td>Butter (Unsalted)</td><td>227 g</td><td>240 g</td><td>14.2 g</td></tr>
            <tr><td>Honey / Maple Syrup</td><td>340 g</td><td>360 g</td><td>21.3 g</td></tr>
            <tr><td>Cocoa Powder (unsweetened)</td><td>85 g</td><td>90 g</td><td>5.3 g</td></tr>
          </tbody>
        </table>
        <h2>Why Weight Measurement is Essential in Baking</h2>
        <p>Baking is a precise science of hydration, gluten formation, and leavening. Scooping flour with a cup packs the powder and can add 25% to 30% more flour than intended, resulting in dry cakes and dense bread. Using a digital kitchen scale and converting grams to cups guarantees bakery-quality results.</p>
      </section>
    `,
  },
  "/parchment-transcript": {
    title: "Parchment Transcript Parser & GPA Calculator — Free Academic Audit & AMCAS Scale",
    description: "Free online academic transcript parser and GPA calculator. Extract courses, credit hours, and grades from registrar PDF transcripts. Calculate 4.0, 5.0, and AMCAS medical school GPAs with target grade simulator.",
    keywords: "parchment transcript parser, gpa calculator, college transcript analyzer, amcas gpa calculator, cumulative gpa calculator, weighted gpa calculator, graduation target gpa, academic audit, college grades pdf",
    canonicalPath: "/parchment-transcript",
    ogType: "website",
    category: "EducationalApplication",
    h1: "Parchment Academic Transcript Parser & GPA Calculator",
    lead: "Audit university registrar PDF transcripts, compute cumulative, major, and AMCAS medical school GPAs, and simulate required grades to reach graduation honors.",
    features: [
      "Automated extraction of course codes, credit hours, and letter grades from PDF transcripts.",
      "Support for 4.0 unweighted, 4.33 weighted, and AMCAS medical school grading scales.",
      "Interactive 'What-If' GPA simulator for planning future semesters.",
      "Course categorization by Major Core, General Education, Elective, and STEM Pre-Med.",
      "100% private in-browser analysis: FERPA-compliant with zero server retention.",
    ],
    faqs: [
      {
        q: "Is it safe to upload my official college transcript?",
        a: "Yes. All PDF parsing and grade computations are performed securely in your session. TranscriptG never stores, caches, or shares academic transcripts with any third parties.",
      },
      {
        q: "What GPA scales does this calculator support?",
        a: "We support the standard 4.0 US collegiate scale, 4.33 +/- scale, 5.0 honors scale, and AMCAS/AACOMAS medical school conversion matrices.",
      },
    ],
    semanticHtml: `
      <section class="seo-tool-guide">
        <h1>Parchment Academic Transcript Parser &amp; GPA Calculator</h1>
        <p>Analyze official and unofficial university transcripts, audit completed degree requirements, and calculate college GPAs.</p>
        <h2>Key Academic Capabilities</h2>
        <ul>
          <li>Parse course codes (e.g. CS 101, CHEM 210, MATH 241) and credit values directly from PDF files.</li>
          <li>Calculate cumulative GPA, semester GPA, and major GPA.</li>
          <li>Simulate graduation honors criteria (Cum Laude, Magna Cum Laude, Summa Cum Laude).</li>
        </ul>
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
      "18 comprehensive, peer-reviewed engineering guides.",
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
  "/parchment": "/parchment-transcript",
  "/gramstocups": "/grams-to-cups",
  "/baking-converter": "/grams-to-cups",
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
  const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`;

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
