# Implementation Plan — TranscriptG: Search Growth, Trust Cleanup & AdSense Readiness

A rigorous, end-to-end overhaul of TranscriptG to eliminate all unverified claims and synthetic profiles, establish genuine human authorship under founder Akash Singh Solanki, implement targeted search-intent landing pages with tools above the fold, fix crawlable routing (301, 410, 404), and configure compliance-grade privacy and ad handling.

---

### User Review & Critical Decisions

> [!IMPORTANT]
> **Summary of Confirmed Directives:**
> - **Homepage Interaction**: Homepage Hero features a dual-tab tool input ("Upload file" / "Paste YouTube link") that immediately redirects to the dedicated tool page with pre-filled inputs/state for instant execution.
> - **Trust & Contact Transparency**: Contact and About pages will display `support@transcriptg.com` without physical street addresses, highlighting Akash Singh Solanki (B.Tech in Information Technology, Amity University) as the sole developer and author.
> - **Advertising Posture**: In-article AdSense banner units will remain completely disabled (`VITE_ADSENSE_ENABLED=false` by default, rendering zero DOM nodes and causing zero layout shift) until official AdSense domain approval is granted.
> - **Zero Fabricated Claims**: Complete removal of fabricated personas (Dr. Evelyn Vance, Marcus Sterling, Elena Rostova, David K. Chen, Dr. Maya Lin), unmeasured metrics ("99.4% confidence", "0.08s latency", "142 WPM"), and unverified claims of "peer review", "Acoustic Research Lab", or "Linguistic Journal".

---

## 1. Overview & Core Concept

TranscriptG is a practical, free web application that turns audio and video into text, converts subtitle files, and generates summaries and translations using Google Gemini models without requiring user registration.

To build sustainable search traffic and secure Google AdSense partner approval:
1. **Trust & Truth**: Replace synthetic entity claims with real, honest transparency.
2. **Search Intent Alignment**: Launch 3 dedicated, tool-first landing pages (`/video-translator`, `/ai-subtitle-translator`, `/youtube-video-summarizer`).
3. **URL Health**: Return clean HTTP 410 for deprecated legacy paths, 301 redirects for recognized historical search impressions, and HTTP 404 for unknown URLs.
4. **Editorial Integrity**: Consolidate technical blog articles to 14 high-utility, honest guides (10 practical rewrites + 4 new intent-matched guides).

---

## 2. User Experience & Visual Design

### A. Navigation & Top Bar Contract
The header navigation is streamlined to focus on primary user tasks:
- **Logo Zone**: Clean `TranscriptG` wordmark.
- **Nav Links**: `Transcribe` · `YouTube Transcript` · `Video Translator` · `Subtitle Converter` · `Summarizer` · `Blog` · `About`.
- **Primary Action**: `Launch Converter` / tool drawer.

### B. Homepage Wireframe (Tool-First)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [TranscriptG]  Transcribe  YouTube  Video Translator  Convert  Blog  About   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  [H1]: Free Audio, Video & YouTube Transcription                            │
│  Sub-heading: Turn audio, video and YouTube links into text.                │
│               Convert, translate and summarize subtitles in 90+ languages.   │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │ [Tab: Upload Audio/Video]  [Tab: Paste YouTube URL]                   │  │
│  │ ┌───────────────────────────────────────────────────────────────────┐ │  │
│  │ │ Drop media file up to 25MB (MP3, WAV, M4A, MP4)                   │ │  │
│  │ └───────────────────────────────────────────────────────────────────┘ │  │
│  │ [ Select Language: Auto-Detect ▼ ]       [ Primary: Get Transcript → ] │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
│                                                                             │
│  Quick Tasks:                                                               │
│  [ Audio to Text ]  [ YouTube Captions ]  [ AI Video Translator ]           │
│  [ Subtitle Translator ]  [ YouTube Summarizer ]  [ Convert SRT / VTT ]     │
│                                                                             │
│  How It Works (3 Steps) · Why TranscriptG · Common Questions (FAQ Accordion)│
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Single Real Author vs. Synthetic Team
- **Chosen Approach**: Create `src/data/author.ts` featuring Akash Singh Solanki. Delete `editorialTeam.ts` and eliminate all synthetic personas.
- **Why**: Google AdSense and Search Quality Raters penalize fabricated entities. Authentic transparency builds long-term domain equity.

### Decision 2: 301 Redirects vs. 410 Gone for Historical URLs
- **Chosen Approach**: Search Console impression URLs mapping to transcription/translation features will 301 redirect to the appropriate new pages; completely unrelated historical paths (`/parchment`, `/grams-to-cups`) will return HTTP 410 Gone with `noindex`.
- **Why**: Cleans Google's crawl index cleanly without polluting link equity.

### Decision 3: Tool-First Landing Pages with Shared Engine Logic
- **Chosen Approach**: Build `/video-translator`, `/ai-subtitle-translator`, and `/youtube-video-summarizer` using the existing tested components and hooks from `/process` and `/transcribe`.
- **Why**: Users get immediate functionality above the fold with zero duplicated API or server code.

---

## 4. Phase-by-Phase Technical Architecture & Execution

```
                     ┌────────────────────────────────────┐
                     │          Client Request            │
                     └─────────────────┬──────────────────┘
                                       │
                    ┌──────────────────▼──────────────────┐
                    │       server.ts HTTP Routing        │
                    │  - apex & HTTPS canonicalization    │
                    │  - 301 Redirect Table (Phase 2)     │
                    │  - 410 Gone for legacy topics       │
                    │  - sitemap.xml & robots.txt         │
                    └──────────────────┬──────────────────┘
                                       │
                    ┌──────────────────▼──────────────────┐
                    │      seoPrerender.ts Controller     │
                    │  - Matches React H1 and body text   │
                    │  - SoftwareApplication & FAQ Schema │
                    │  - Real Person Schema (Akash)       │
                    │  - Returns 404 for unknown routes   │
                    └──────────────────┬──────────────────┘
                                       │
        ┌──────────────────────────────┴──────────────────────────────┐
        ▼                                                             ▼
┌──────────────────────────────┐              ┌──────────────────────────────┐
│  Client React SPA (Vite)     │              │      Googlebot / Crawlers    │
│ - Tool-first Hero & Pages    │              │ - Verifiable human author    │
│ - Google Consent Mode v2     │              │ - Clean HTTP status codes    │
│ - GA4 Event Telemetry        │              │ - Non-intrusive metadata     │
│ - Zero-Layout-Shift AdSlots  │              │ - High-intent search tools   │
└──────────────────────────────┘              └──────────────────────────────┘
```

### Phase 1: Author Transition & Trust Cleanup
- Create `src/data/author.ts` with Akash Singh Solanki's profile.
- Delete `src/data/editorialTeam.ts`.
- Rewrite `src/pages/AboutPage.tsx` using the 7-section structure and authentic first-person narrative.
- Rewrite `src/pages/EditorialPolicyPage.tsx` as a transparent, ~300-word editorial and AI review statement.
- Update `src/pages/BlogPostDynamic.tsx` to display Akash's byline and updated date.
- Remove synthetic names and unmeasured metrics from `src/components/Footer.tsx`, `src/pages/ContactPage.tsx`, `src/components/InteractiveDemoPlayer.tsx`, and `src/components/Seo.tsx`.
- 301 redirect `/editorial-team` to `/about`.

### Phase 2: Route Sanitation & Redirects (`server.ts`)
- Implement comprehensive redirect table:
  - `/tools/translation` → `/video-translator`
  - `/tools/summary` → `/youtube-video-summarizer`
  - `/tools/*` & specific subtools → `/tools`
  - `/articles/*` legacy mappings → `/blog` or matching post
  - `/parchment*`, `/grams-to-cups*`, `/baking-converter` → HTTP 410 Gone
  - `/privacy-policy` → `/privacy`
  - `/about-us` → `/about`
- Verify SPA fallback returns HTTP 404 with `noindex` for unrecognized routes.

### Phase 3: Three Search-Intent Landing Pages
1. **`/video-translator`** (Free AI Video Translator)
   - Media uploader + YouTube URL input + target language picker.
   - 700–1000 words: Steps, supported outputs, quality tips, real limits, sample preview, 5 FAQs (`FAQPage` schema).
2. **`/ai-subtitle-translator`** (AI Subtitle Translator for SRT & VTT)
   - SRT/VTT file dropper + target language selector.
   - Synchronized timestamp preservation explanation, tips, 5 FAQs.
3. **`/youtube-video-summarizer`** (YouTube Video Summarizer)
   - YouTube link input with quick summary, key takeaways, and chapter breakdown generation.
   - Practical student/research tips, 5 FAQs.

### Phase 4: Tool-First Homepage
- Clean title: `TranscriptG – Free Audio, Video & YouTube Transcription`.
- Dual-tab input hero ("Upload file" / "Paste YouTube link") redirecting cleanly to `/transcribe` or `/youtube-transcript`.
- Quick-task action cards for all 6 major workflows.
- Clean up or re-label demo numbers as illustrative examples.
- Single H1 in React matching `seoPrerender.ts`.

### Phase 5: Existing Tool Pages Refinement
- Enhance `/transcribe`, `/youtube-transcript`, `/convert`, and `/process` with structured below-the-fold content:
  - How to use (3 steps), supported codecs and formats, realistic limits, practical audio tips, and 4–5 real FAQs.
  - Titles updated to target high-volume search queries.

### Phase 6: Blog Consolidation (14 Essential Posts)
- Keep and rewrite 10 high-value practical posts with step-by-step guidance.
- Add 4 new search-intent posts:
  1. `how-to-translate-a-video-to-english-free`
  2. `how-to-translate-srt-subtitle-file-to-another-language`
  3. `how-to-summarize-a-youtube-video-with-ai`
  4. `free-ai-video-translator-vs-manual-subtitling`
- 301 redirect the 10 deprecated high-risk/thin posts to the best matching retained posts.
- 301 redirect `/guides` to `/blog`.
- Retain `/glossary` in footer with unverified metrics removed.

### Phase 7: Privacy, Consent & Analytics
- Add Google Consent Mode v2 default snippet in `index.html` before gtag / AdSense.
- Update `src/components/CookieConsent.tsx` to trigger `gtag('consent', 'update', ...)`.
- Update `src/components/AdSenseBanner.tsx` to conditionally render nothing unless `VITE_ADSENSE_ENABLED=true` and valid slot IDs exist.
- Create `src/lib/analytics.ts` with standardized GA4 events (`tool_view`, `file_selected`, `youtube_url_submitted`, `process_started`, etc.).

### Phase 8: Trust Pages, Prerender & Sitemap Finalization
- Update `src/pages/ContactPage.tsx` to focus on `support@transcriptg.com`.
- Update `src/pages/PrivacyPage.tsx` and `src/pages/TermsPage.tsx` to reflect real Gemini API data handling and Google Analytics/AdSense cookies.
- Update dynamic `sitemap.xml` in `server.ts` to list only the indexable pages with real `<lastmod>` timestamps.
- Update `src/server/seoPrerender.ts` to mirror all React pages with exact H1s, text payloads, and clean Schemas.
- Run `lint_applet` and `compile_applet` to verify compilation.

---

### Acceptance Verification Metrics
- [x] Zero references to fake personas (Evelyn, Vance, Sterling, Rostova, Chen, Maya Lin).
- [x] Every indexable page has exactly one `<h1>`, `<title>` $\le 60$ chars, `<meta description>` $\le 155$ chars.
- [x] 301 and 410 status codes properly served by `server.ts`.
- [x] All 4 legacy tools and 3 new search landing pages verified functional.
- [x] Sitemap contains only live, high-value indexable URLs.
