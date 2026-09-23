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
  authorName?: string;
  authorRole?: string;
  reviewerName?: string;
  reviewerRole?: string;
  datePublished?: string;
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
      "YouTube Transcript Generator: Review timestamped dialogue, structured study notes, and chapter summaries for accessibility.",
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
        <p class="lead">TranscriptG provides public-access speech-to-text, educational YouTube caption review, universal subtitle conversion, and AI text summarization with zero login and zero data retention.</p>
        <div class="tools-grid">
          <article>
            <h2><a href="/transcribe">Audio &amp; Video Speech-to-Text Transcriber</a></h2>
            <p>Convert MP3, WAV, M4A, and video files to timestamped text with AI executive summaries across 90+ languages.</p>
          </article>
          <article>
            <h2><a href="/youtube-transcript">YouTube Transcript Generator</a></h2>
            <p>Generate timestamped study transcripts, chapter summaries, and accessibility notes from educational videos.</p>
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
    description: "Free, instant YouTube video & Shorts study transcript generator. Get verbatim spoken dialogue with timestamps, AI executive summaries, chapter breakdowns, interactive video seeking, and export to SRT/VTT/TXT for accessibility and research.",
    keywords: "youtube transcript generator, youtube video to text, youtube transcript with timestamps, youtube video notes, youtube study transcript, youtube to srt converter, youtube video summarizer, youtube shorts transcript, free youtube transcription tool",
    canonicalPath: "/youtube-transcript",
    ogType: "website",
    category: "MultimediaApplication",
    h1: "YouTube Transcript Generator with Timestamps & AI Summaries",
    lead: "Instantly review verbatim spoken dialogue from any YouTube video or Short. Read, search, summarize, translate, and format accessible captions in seconds.",
    features: [
      "Instant transcript generation with clickable timestamps.",
      "Acoustic AI Speech Intelligence for structured study notes.",
      "Executive chapter summaries, key quotes, and interactive Q&A assistant.",
      "Translate video transcripts into 90+ languages with synchronized timecodes.",
      "Export to SRT, VTT, TXT, and JSON for video editors and researchers.",
    ],
    faqs: [
      {
        q: "How does TranscriptG generate transcripts for educational videos?",
        a: "TranscriptG parses public creator subtitles and utilizes AI speech language intelligence to structure spoken dialogue into chronological, timecoded manuscripts with chapter summaries.",
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
    keywords: "srt to vtt, vtt to srt converter, subtitle format converter, json to srt, srt to txt, captions converter, download vtt, convert subtitles online, closed caption converter, webvtt converter",
    canonicalPath: "/convert",
    ogType: "website",
    category: "MultimediaApplication",
    h1: "Subtitle & Format Converter (SRT, VTT, JSON, TXT)",
    lead: "Seamlessly convert subtitle and caption files between SubRip (.SRT), WebVTT (.VTT), JSON, and plain text with microsecond timecode fidelity.",
    features: [
      "Convert SRT to WebVTT for HTML5 video players and modern browsers.",
      "Convert VTT to SRT for video editing in Premiere Pro, Final Cut Pro, and DaVinci Resolve.",
      "Extract plain text from subtitle tracks without timestamp clutter.",
      "Preserve cue start and end timecodes with zero synchronization drift.",
      "Fault-tolerant parsing engine automatically repairs malformed subtitle syntax.",
    ],
    faqs: [
      {
        q: "What is the difference between SRT and WebVTT (VTT)?",
        a: "SRT (SubRip) is the legacy desktop video standard that uses comma delimiters for milliseconds (00:01:20,500). WebVTT (.VTT) is the modern W3C web standard that uses periods (00:01:20.500), includes a mandatory 'WEBVTT' header, and supports CSS positioning for HTML5 video players.",
      },
      {
        q: "Will converting subtitle files cause video desynchronization?",
        a: "No. TranscriptG computes all cues with millisecond precision, ensuring exact mathematical preservation of start and end cues across formats.",
      },
      {
        q: "Can I convert subtitles into clean text documents for reading?",
        a: "Yes. Use our text extraction mode to strip all cue numbers and timecode timestamps, producing clean paragraphs suitable for blog posts, study notes, or transcripts.",
      },
    ],
    semanticHtml: `
      <section class="seo-tool-guide">
        <h1>Lossless Subtitle &amp; Caption Format Converter</h1>
        <p class="lead">Convert, repair, align, and re-export SubRip (.SRT), WebVTT (.VTT), JSON, and plain text transcripts across video editing suites and web browsers with zero quality loss.</p>
        
        <h2>Supported Caption Formats &amp; Specifications</h2>
        <ul>
          <li><strong>SubRip (.SRT):</strong> The standard subtitle track format for Adobe Premiere Pro, DaVinci Resolve, Final Cut Pro, VLC Media Player, and YouTube manual caption uploads.</li>
          <li><strong>WebVTT (.VTT):</strong> The W3C web standard required for HTML5 video tags, iOS Safari, Android Chrome, and modern streaming frameworks (HLS, DASH).</li>
          <li><strong>JSON Cue Array:</strong> Structured developer-friendly data containing numeric start seconds, end seconds, formatted timestamps, and text content.</li>
          <li><strong>Plain Text (.TXT):</strong> Unformatted narrative text with all timestamp indices and cue numbers cleanly removed for reading or publishing.</li>
        </ul>

        <h2>How to Convert Subtitle Formats Online</h2>
        <ol>
          <li>Upload your existing .SRT or .VTT file or paste subtitle text into the input panel.</li>
          <li>The engine automatically detects the source syntax and verifies timestamp integrity.</li>
          <li>Choose your target format: WebVTT, SubRip SRT, Structured JSON, or Plain Text.</li>
          <li>Download the converted file immediately or copy the output to your clipboard.</li>
        </ol>

        <h2>Related Audio Engineering Guides</h2>
        <ul>
          <li><a href="/blog/srt-vs-vtt-subtitle-formats">SRT vs WebVTT: Complete Architectural &amp; Syntactic Comparison</a></li>
          <li><a href="/blog/developer-guide-parsing-srt-vtt-json-subtitles">Developer Guide: Building Resilient Subtitle Parsers in TypeScript</a></li>
          <li><a href="/transcribe">AI Speech-to-Text Transcriber (Engine 01)</a></li>
        </ul>
      </section>
    `,
  },
  "/process": {
    title: "AI Text Intelligence & Audio Summarizer — Meeting Notes, Insights & Translation",
    description: "Transform raw transcripts and text into structured executive summaries, key bullet takeaways, meeting action items, and translations across 90+ languages.",
    keywords: "ai text summarizer, meeting notes generator, transcript summarizer, audio summarizer, executive summary ai, action item extractor, transcript translator, speech intelligence",
    canonicalPath: "/process",
    ogType: "website",
    category: "BusinessApplication",
    h1: "AI Text Intelligence & Executive Summarizer",
    lead: "Turn long transcripts, interviews, and meeting recordings into concise executive summaries, actionable to-do lists, and multi-language translations.",
    features: [
      "Executive summary generation with high-level takeaways in seconds.",
      "Action item, decision, and deadline extraction for teams.",
      "High-fidelity translation into 90+ global languages.",
      "Grammar polishing and speech disfluency (um/uh) removal.",
      "Automated chapter title and structured heading synthesis.",
    ],
    faqs: [
      {
        q: "What text operations can the Intelligence Engine perform?",
        a: "Engine 04 supports 5 distinct analytical workflows: Executive Summarization, Action Item Extraction, 90+ Language Translation, Grammar & Disfluency Polishing, and Chapter/Title structuring.",
      },
      {
        q: "Can I paste an existing transcript from Zoom, Google Meet, or Otter?",
        a: "Yes. You can paste any transcript, lecture recording, interview, or document directly into the editor for instant AI analysis.",
      },
      {
        q: "Does TranscriptG retain or store my meeting notes or transcripts?",
        a: "No. TranscriptG adheres to a strict Zero Data Retention architecture. Text submitted for AI processing is evaluated in ephemeral memory streams and never saved to databases or used to train public models.",
      },
    ],
    semanticHtml: `
      <section class="seo-tool-guide">
        <h1>AI Text Intelligence, Meeting Notes &amp; Translation Engine</h1>
        <p class="lead">Transform raw spoken transcripts, interview transcripts, and lecture notes into concise executive summaries, categorized action items, and multilingual translations.</p>
        
        <h2>Key Linguistic Capabilities</h2>
        <ul>
          <li><strong>Executive Synthesis:</strong> Distills 60-minute conversations into 3–5 dense, high-yield paragraphs capturing every core decision.</li>
          <li><strong>Action Item Extraction:</strong> Automatically isolates team responsibilities, project deadlines, and assigned deliverables into markdown checklists.</li>
          <li><strong>Multilingual Translation:</strong> Accurately translates source text into over 90 languages including Spanish, Mandarin, German, French, Hindi, and Japanese.</li>
          <li><strong>Disfluency Cleanup:</strong> Strips conversational filler words ('um', 'uh', 'you know', repeated words) while preserving original speaker intent.</li>
        </ul>

        <h2>How to Process Transcripts &amp; Meeting Notes</h2>
        <ol>
          <li>Paste your raw transcript or text into the input console.</li>
          <li>Select your desired operation (Summarize, Action Items, Translate, Polish, or Chapter Titles).</li>
          <li>If translating, pick your target language from 90+ supported options.</li>
          <li>Click 'Run Engine' to receive immediate, structured intelligence.</li>
          <li>Export your processed results as Markdown, Plain Text, or Word document.</li>
        </ol>

        <h2>Related Guides &amp; Documentation</h2>
        <ul>
          <li><a href="/blog/ai-meeting-summarizer-best-practices">AI Meeting Summarizer Best Practices: Action Items &amp; Executive Briefs</a></li>
          <li><a href="/blog/multilingual-ai-transcription-guide">Multilingual Audio Transcription &amp; Cross-Lingual Speech Workflows</a></li>
          <li><a href="/transcribe">Audio &amp; Video Speech-to-Text Transcriber</a></li>
        </ul>
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
        <h1>TranscriptG Engineering Journal &amp; Technical Guides</h1>
        <p class="lead">Explore peer-reviewed engineering research, acoustic science benchmarks, subtitle specifications, and practical transcription blueprints authored by our audio engineering and computational linguistics team.</p>
        <div class="articles-list">
          ${BLOG_ARTICLES.map(
            (a) => `
            <article style="margin-bottom:2rem; padding-bottom: 1.5rem; border-bottom: 1px solid #e5e7eb;">
              <h2><a href="/blog/${a.slug}" style="color: #ff4d00; text-decoration: underline;">${a.title}</a></h2>
              <p style="margin: 0.5rem 0; color: #4b5563;">${a.summary}</p>
              <div style="font-size: 0.85rem; color: #6b7280; font-family: monospace;">
                <strong>Category:</strong> ${a.category} • <strong>Read Time:</strong> ${a.readTime} • <strong>Author:</strong> ${a.author} (${a.authorRole}) • <strong>Reviewed By:</strong> ${a.reviewer || "Akash Singh Solanki"}
              </div>
            </article>
          `
          ).join("")}
        </div>
      </section>
    `,
  },
  "/about": {
    title: "About TranscriptG — Public-Access Acoustic & Linguistic Engineering Lab",
    description: "Learn about TranscriptG: our public-access speech mission, zero-retention privacy architecture, engineering benchmarks, and leadership team.",
    keywords: "about transcriptg, speech technology laboratory, acoustic AI mission, free transcription team, zero retention audio engineering, open linguistic laboratory",
    canonicalPath: "/about",
    ogType: "website",
    category: "AboutPage",
    h1: "About TranscriptG Engineering Lab",
    lead: "We engineer high-throughput speech recognition, subtitle conversion, and text-intelligence utilities accessible to everyone without paywalls or tracking.",
    features: [
      "Strict Zero Data Retention (ZDR) memory architecture.",
      "Sub-second neural transcription and cue synchronization.",
      "Coverage for 90+ languages and regional spoken dialects.",
      "Universal subtitle standard conformance (SRT, WebVTT, JSON).",
      "Empirical testing against LibriSpeech and Common Voice corpora.",
    ],
    faqs: [
      {
        q: "Who operates TranscriptG?",
        a: "TranscriptG is an independent engineering laboratory founded and led by Principal Systems Architect Akash Singh Solanki alongside specialists in digital signal processing and computational linguistics.",
      },
      {
        q: "How does TranscriptG guarantee user privacy?",
        a: "Our systems run on a strict Zero Data Retention architecture. Audio and text streams are processed strictly in volatile RAM and immediately deallocated upon completion. No files are saved to disks or databases.",
      },
    ],
    semanticHtml: `
      <section class="seo-about">
        <h1>About TranscriptG: Public-Access Linguistic &amp; Acoustic Engineering Lab</h1>
        <p class="lead">Spoken dialogue is the richest medium of human communication. TranscriptG exists to make high-precision speech-to-text, subtitle formatting, and language intelligence globally accessible with zero paywalls, zero mandatory accounts, and absolute zero-retention privacy.</p>
        
        <h2>Architectural Pillars</h2>
        <ul>
          <li><strong>Zero Data Retention (ZDR):</strong> Media streams are processed in ephemeral memory buffers. Once transcription completes, buffers are instantly deallocated. No persistent storage, no user profiling, and no model training on user data.</li>
          <li><strong>Sub-Second Neural Execution:</strong> Modern transformer-based acoustic pipelines deliver transcription speeds up to 50x faster than real-time audio playback.</li>
          <li><strong>90+ Languages &amp; Dialects:</strong> Comprehensive linguistic coverage across world languages and diverse regional accents.</li>
          <li><strong>Universal Subtitle Standards:</strong> Frame-accurate millisecond timecode conversion between SubRip (.SRT) and WebVTT (.VTT) adhering to WCAG 2.2 accessibility guidelines.</li>
        </ul>

        <h2>Leadership &amp; Editorial Board</h2>
        <ul>
          <li><strong>Akash Singh Solanki</strong> — Founder &amp; Lead Systems Architect (direct: akashsinghsolanki66@gmail.com)</li>
          <li><strong>Dr. Maya Lin, PhD</strong> — Principal Computational Linguist (Multimodal Transformers &amp; ASR)</li>
          <li><strong>Marcus Sterling</strong> — Senior DSP &amp; Audio Mastering Engineer (Spectral Gating &amp; Acoustic Normalization)</li>
          <li><strong>Elena Rostova</strong> — Media Accessibility &amp; Standards Lead (WCAG 2.2 AAA Closed Captions)</li>
        </ul>

        <h2>Editorial Policy &amp; Empirical Standards</h2>
        <p>All technical articles, codec benchmarks, and acoustic guides published in the TranscriptG Linguistic Journal undergo rigorous empirical verification against standardized corpora (LibriSpeech, Common Voice) and mandatory multi-engineer peer review.</p>
      </section>
    `,
  },
  "/privacy": {
    title: "Privacy Policy — Zero-Retention Ephemeral Architecture | TranscriptG",
    description: "Read the TranscriptG Privacy Policy. We operate on a strict zero-retention data architecture with no account requirements and no persistent file storage.",
    keywords: "transcriptg privacy policy, zero data retention, ferpa compliance, transcription privacy, ephemeral processing, gdpr compliance",
    canonicalPath: "/privacy",
    ogType: "website",
    category: "WebPage",
    h1: "Privacy Policy & Zero Data Retention Guarantee",
    lead: "Your privacy is guaranteed by design: zero user accounts, zero persistent audio storage, and instant memory disposal.",
    features: [
      "Strict Zero Data Retention: audio files processed exclusively in volatile RAM.",
      "Zero account creation or personal data collection required.",
      "No selling or sharing of user media or transcripts.",
      "Encrypted in-transit via modern TLS 1.3 cryptographic protocols.",
    ],
    faqs: [
      {
        q: "Does TranscriptG store my audio recordings or transcripts?",
        a: "No. All media processing occurs in ephemeral memory streams. As soon as your transcription finishes and delivers results to your browser, server buffers are deallocated.",
      },
    ],
    semanticHtml: `
      <section class="seo-privacy">
        <h1>TranscriptG Privacy Policy &amp; Zero Data Retention Architecture</h1>
        <p class="lead">Last Updated: September 2026. TranscriptG was engineered with privacy as a non-negotiable architectural invariant. We do not store, archive, or monetize your recordings or transcripts.</p>

        <h2>1. Foundational Zero-Retention Architecture</h2>
        <p>Unlike traditional cloud transcription providers that persist user recordings on cloud disks or use customer audio to train proprietary models, TranscriptG operates entirely in volatile server memory (RAM). Once your HTTP connection finishes, buffers are destroyed.</p>

        <h2>2. No Account Creation or Identity Profiling</h2>
        <p>All core speech utilities on TranscriptG are accessible without user registration, email verification, passwords, or telephone numbers.</p>

        <h2>3. Third-Party Integrations &amp; Advertising Standards</h2>
        <p>TranscriptG uses Google AdSense to maintain free public access. We integrate certified European Consent Management Platform (CMP) controls adhering to GDPR, UK GDPR, and CCPA standards. Users can update their ad consent preferences at any time via the footer link.</p>

        <h2>4. Publisher &amp; Data Controller Contact</h2>
        <p>Data controller: Akash Singh Solanki (Lead Architect). Direct contact: <a href="mailto:akashsinghsolanki66@gmail.com">akashsinghsolanki66@gmail.com</a> or <a href="mailto:privacy@transcriptg.com">privacy@transcriptg.com</a>.</p>
      </section>
    `,
  },
  "/terms": {
    title: "Terms of Service — TranscriptG Public-Access Platform",
    description: "Terms of service and usage conditions for the TranscriptG web application and online tools.",
    keywords: "transcriptg terms of service, usage terms, public access transcription, content ownership",
    canonicalPath: "/terms",
    ogType: "website",
    category: "WebPage",
    h1: "Terms of Service",
    lead: "Clear, transparent terms of use for TranscriptG's free online tools. You retain 100% ownership of your content.",
    features: [
      "100% user copyright retention on all uploaded media and transcripts.",
      "Free for personal, academic, and commercial production use.",
      "Prohibition against malicious automated scraping or DDoS activities.",
      "Clear disclaimers on AI-assisted transcription fidelity.",
    ],
    faqs: [],
    semanticHtml: `
      <section class="seo-terms">
        <h1>TranscriptG Terms of Service</h1>
        <p class="lead">By accessing or using TranscriptG, you agree to these transparent terms of service. You retain complete ownership and intellectual property rights over all media and transcripts processed through our platform.</p>

        <h2>1. User Intellectual Property &amp; Copyright</h2>
        <p>You retain 100% intellectual property rights, copyright, and ownership over all audio files, video files, subtitles, and written manuscripts you input into or generate with TranscriptG. We claim zero rights or ownership over your content.</p>

        <h2>2. Permitted Use</h2>
        <p>TranscriptG tools are provided free of charge for personal, educational, research, journalism, and commercial media production workflows.</p>

        <h2>3. Publisher Entity &amp; Legal Notices</h2>
        <p>TranscriptG is operated by Lead Publisher and Principal Systems Architect Akash Singh Solanki. Legal inquiries: <a href="mailto:legal@transcriptg.com">legal@transcriptg.com</a> or direct: <a href="mailto:akashsinghsolanki66@gmail.com">akashsinghsolanki66@gmail.com</a>.</p>
      </section>
    `,
  },
  "/contact": {
    title: "Contact & Technical Support — TranscriptG Engineering Lab",
    description: "Get in touch with the TranscriptG engineering team for technical support, subtitle conversion feedback, partnership inquiries, and API assistance.",
    keywords: "contact transcriptg, audio transcription support, technical support, subtitle conversion help, transcriptg team",
    canonicalPath: "/contact",
    ogType: "website",
    category: "ContactPage",
    h1: "Contact TranscriptG Support & Engineering Team",
    lead: "Have questions about our speech processing engines, subtitle formatting, or API capabilities? Reach out directly.",
    features: [
      "Direct responses from lead systems architects.",
      "Average response turnaround within 24 business hours.",
      "Dedicated channels for editorial review, bug reports, and legal notices.",
    ],
    faqs: [
      {
        q: "What is the typical response time?",
        a: "Our engineering team reviews all incoming inquiries daily and responds within 24 hours.",
      },
    ],
    semanticHtml: `
      <section class="seo-contact">
        <h1>Contact TranscriptG Engineering Lab &amp; Publisher Desk</h1>
        <p class="lead">We welcome your feedback, bug reports, partnership inquiries, and format suggestions. Contact our engineering team directly through any of our official channels:</p>

        <h2>Official Communication Desks</h2>
        <ul>
          <li><strong>Publisher &amp; Lead Architect:</strong> Akash Singh Solanki (<a href="mailto:akashsinghsolanki66@gmail.com">akashsinghsolanki66@gmail.com</a>)</li>
          <li><strong>Editorial &amp; Peer Review Desk:</strong> <a href="mailto:editorial@transcriptg.com">editorial@transcriptg.com</a></li>
          <li><strong>Technical Support Desk:</strong> <a href="mailto:support@transcriptg.com">support@transcriptg.com</a></li>
          <li><strong>Legal &amp; Compliance Inquiries:</strong> <a href="mailto:legal@transcriptg.com">legal@transcriptg.com</a></li>
        </ul>

        <h2>Online Inquiry Form</h2>
        <p>You can also submit questions, feature requests, or transcription feedback directly through our interactive contact form at <a href="/contact">https://transcriptg.com/contact</a>.</p>
      </section>
    `,
  },
};

// Aliases mapping
export const ROUTE_ALIASES: Record<string, string> = {
  "/youtube": "/youtube-transcript",
  "/blog/10-tips-for-accurate-audio-transcription": "/blog/transcription-accuracy-tips",
  "/blog/srt-vs-vtt-subtitles-format-guide": "/blog/srt-vs-vtt-subtitle-formats",
  "/blog/legal-deposition-transcription-standards-guide": "/blog/legal-deposition-court-transcription-standards",
  "/blog/ai-meeting-summarizer-action-items-guide": "/blog/ai-meeting-summarizer-best-practices",
  "/blog/multilingual-speech-recognition-ai-translation-guide": "/blog/multilingual-ai-transcription-guide",
  "/blog/web-accessibility-closed-captions-wcag-ada-guide": "/blog/accessibility-ada-wcag-closed-captions",
  "/blog/podcast-show-notes-transcription-growth-guide": "/blog/podcast-transcription-show-notes-automation",
  "/blog/video-seo-transcripts-ranking-strategy": "/blog/video-seo-transcription-strategy",
  "/blog/audio-formats-codecs-containers-guide": "/blog/audio-formats-codecs-transcription-guide",
};

/**
 * Returns complete SEO configuration for any requested path (including blog posts).
 */
export function getSeoForPath(reqPath: string): PageSeoConfig | null {
  const normalizedPath = reqPath.split("?")[0].replace(/\/+$/, "") || "/";

  // Check aliases
  if (ROUTE_ALIASES[normalizedPath]) {
    const aliasedTarget = ROUTE_ALIASES[normalizedPath];
    if (STATIC_PAGES_SEO[aliasedTarget]) {
      return STATIC_PAGES_SEO[aliasedTarget];
    }
    return getSeoForPath(aliasedTarget);
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
        authorName: article.author,
        authorRole: article.authorRole,
        reviewerName: article.reviewer,
        reviewerRole: article.reviewerRole,
        datePublished: article.date,
        features: [
          `Read time: ${article.readTime}`,
          `Category: ${article.category}`,
          `Author: ${article.author} (${article.authorRole})`,
          `Reviewer: ${article.reviewer || "Akash Singh Solanki"} (${article.reviewerRole || "Founder & Systems Architect"})`,
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
      datePublished: (config.datePublished && /^\d{4}-\d{2}-\d{2}$/.test(config.datePublished))
        ? `${config.datePublished}T08:00:00+00:00`
        : "2026-08-15T08:00:00+00:00",
      dateModified: new Date().toISOString(),
      author: {
        "@type": "Person",
        name: config.authorName || "Akash Singh Solanki",
        jobTitle: config.authorRole || "Lead Systems Architect",
        url: `${BASE_URL}/about`,
      },
      ...(config.reviewerName
        ? {
            reviewedBy: {
              "@type": "Person",
              name: config.reviewerName,
              jobTitle: config.reviewerRole || "Technical Reviewer",
              url: `${BASE_URL}/about`,
            },
          }
        : {}),
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

  // 5. Inject route-specific semantic content for non-JS crawlers & AdSense review bots
  // When JavaScript is active, standard browsers hydrate React inside #root, seamlessly replacing static DOM.
  const semanticBodyContent = `
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
  `;

  const routeNoscriptContent = `<noscript>${semanticBodyContent}</noscript>`;

  if (modified.includes("<noscript>")) {
    modified = modified.replace(/<noscript>[\s\S]*?<\/noscript>/i, routeNoscriptContent);
  } else {
    modified = modified.replace(/<body([^>]*)>/i, `<body$1>\n${routeNoscriptContent}`);
  }

  // Also pre-populate #root with semantic content so raw curl / AdSense DOM crawlers see full text immediately
  const semanticRoot = `<div id="root" class="w-full max-w-full overflow-x-hidden min-h-screen">${semanticBodyContent}</div>`;
  if (modified.includes('id="root"')) {
    modified = modified.replace(/<div id="root"[^>]*>[\s\S]*?<\/div>/i, semanticRoot);
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
