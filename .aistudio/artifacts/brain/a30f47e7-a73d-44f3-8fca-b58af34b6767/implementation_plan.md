# Google AdSense Full Approval & Zero-Risk Compliance Plan

## Executive Summary
This implementation plan establishes a **zero-risk Google AdSense compliance state** for TranscriptG. It systematically addresses all reasons historically responsible for AdSense rejections:
1. **Low Value Content & Replicated Personas**: Eradicates fake identities, replaces them with truthful founder attribution (Akash Singh Solanki), and delivers 20 detailed, practical guides and real web tools.
2. **Policy Violation (EU User Consent)**: Implements Google Consent Mode v2 default denial prior to tag execution with real-time update handling.
3. **No Inventory / Thin Content**: Complete gating of AdSense units until formal approval (`VITE_ADSENSE_ENABLED=true`), preventing empty gray boxes and layout shifts during bot crawls.
4. **Site Under Construction & Navigation**: Dedicated high-intent landing pages (`/video-translator`, `/ai-subtitle-translator`, `/youtube-video-summarizer`), permanent 301 redirects for legacy routes, and 410 Gone for non-audio paths.
5. **Private Admin Verification**: Retains `/seo-checklist` with strict `noindex, nofollow` exclusion from `sitemap.xml` for webmaster monitoring without exposing internal audit tools to public search engines.

---

## Architecture & Policy Compliance Modules

```
                        [ User / AdSense Review Bot ]
                                      │
                                      ▼
                      [ Express SSR Prerenderer (server.ts) ]
                                      │
     ┌────────────────────────────────┼────────────────────────────────┐
     ▼                                ▼                                ▼
[ 301 Redirects & 410s ]      [ Static HTML Injection ]        [ Dynamic sitemap.xml ]
- /guides -> /blog            - Single <h1> match              - 16 Core Tools & Pages
- /editorial-team -> /about   - Title <= 60 chars              - 20 Practical Blog Posts
- /parchment -> 410 Gone      - Description <= 155 chars       - Excludes /seo-checklist
                              - JSON-LD FAQPage & WebApp
                                      │
                                      ▼
                      [ React 19 Client SPA (App.tsx) ]
                                      │
     ┌────────────────────────────────┼────────────────────────────────┐
     ▼                                ▼                                ▼
[ AdSense Safe Gating ]      [ Consent Mode v2 ]              [ 20 Founder Guides ]
- Zero empty containers       - Default denied in <head>       - Author: Akash Singh Solanki
- Zero premature ad calls     - Real-time consent updates      - Verifiable contact info
- Controlled via env var      - Revocation support             - Practical technical steps
```

---

## Detailed Action Plan by Phase

### Phase 1: Zero-Risk AdSense Gating & Inventory Hygiene
- **Ensure Zero Blank Ad Units**: In `src/components/AdSenseBanner.tsx`, ensure no DOM nodes, empty rectangles, or `adsbygoogle.push()` invocations render unless `VITE_ADSENSE_ENABLED === "true"` and active in production.
- **Prevent Crawler Inventory Penalty**: Reviewers and automated bots see a clean, blazingly fast utility without layout shifts or unfilled inventory spaces.

### Phase 2: Author & Editorial Transparency (E-E-A-T)
- **Founder Identity**: Attribute all platform tools and 20 articles directly to **Akash Singh Solanki** (Software Engineer & Creator of TranscriptG).
- **Public Contact Channel**: Provide verified contact routing via `support@transcriptg.com` with working webform backend at `/api/contact`.
- **Editorial & Fact-Checking Policy**: Dedicated page at `/editorial-policy` detailing real testing methods, audio quality evaluation, corrections policy, and commercial independence.

### Phase 3: The 20 Practical Guides Inventory
- Retain all 20 existing technical articles under `/blog/:slug`:
  1. `how-transcriptg-engine-works`
  2. `10-tips-for-accurate-audio-transcription`
  3. `srt-vs-vtt-complete-format-comparison`
  4. `how-to-summarize-long-meetings-with-ai`
  5. `audio-formats-codecs-guide`
  6. `video-seo-transcription-strategy`
  7. `accessibility-ada-wcag-compliance`
  8. `multilingual-audio-transcription-guide`
  9. `podcast-show-notes-workflow`
  10. `legal-deposition-transcription-standards`
  11. `medical-clinical-audio-transcription-hipaa`
  12. `academic-qualitative-interview-transcription`
  13. `developer-guide-parsing-subtitles-regex-ast`
  14. `zero-data-retention-security-architecture`
  15. `complete-youtube-captioning-workflow`
  16. `multilingual-subtitling-localization`
  17. `building-searchable-audio-archives-json`
  18. `evolution-of-asr-whisper-to-gemini`
  19. `youtube-transcription-no-captions-workflow`
  20. `convert-m4a-to-srt-guide`
- Ensure each article contains structured metadata, clear code or process steps, and links to the relevant TranscriptG interactive tools.

### Phase 4: High-Intent Tool Pages & Below-the-Fold Depth
- **`/video-translator`**: Interactive video/audio translation into 90+ languages with file dropper, YouTube ingestion, dual transcript comparison, and 5 detailed FAQs.
- **`/ai-subtitle-translator`**: Timestamp-preserving SRT/VTT translator with format validation, millisecond timecode locking, and 5 detailed FAQs.
- **`/youtube-video-summarizer`**: Direct YouTube URL extractor with executive briefs, bulleted key takeaways, chapter breakdown, and 5 detailed FAQs.
- **Existing Tools (`/transcribe`, `/youtube-transcript`, `/convert`, `/process`, `/tools`)**: Verify each has 3-step usage guides, supported audio codecs, performance limits, and contextual FAQs.

### Phase 5: Privacy, Consent Mode v2 & Legal Disclosures
- **Google Consent Mode v2**: In `index.html`, default `ad_storage`, `ad_user_data`, `ad_personalization`, and `analytics_storage` to `denied` with `wait_for_update: 500`.
- **Consent Banner (`CookieConsent.tsx`)**: Allow users to grant or keep essential cookies, dispatching `gtag('consent', 'update', ...)` upon user choice.
- **Privacy Policy (`/privacy`)**: Disclose ephemeral memory processing, zero permanent data retention, Google AdSense cookie usage, and GDPR/CCPA user rights.
- **Terms of Service (`/terms`)**: Outline public utility terms, 100% user copyright ownership, and acceptable use.

### Phase 6: Internal SEO Checklist & Crawler Management
- **Keep `/seo-checklist` Internal**: Mark with `noindex, nofollow` in `Seo.tsx`.
- **Exclude from `sitemap.xml`**: Ensure the sitemap only serves public, indexable tool and content pages.
- **Server Redirection Validation**: Ensure `/parchment` serves HTTP 410 Gone, `/editorial-team` 301 redirects to `/about`, and `/guides` 301 redirects to `/blog`.

---

## Verification & Acceptance Checklist

| Checkpoint | Target Standard | Verification Method |
| :--- | :--- | :--- |
| **Fake Personas** | 0 mentions of Vance, Sterling, Rostova, Chen across all pages | `grep -rniE "rostova\|vance\|sterling\|chen" src/` |
| **Consent Mode v2** | Defaults to `denied` before gtag.js loads | Inspect `<head>` in `index.html` |
| **AdSense Gating** | 0 ads rendered when `VITE_ADSENSE_ENABLED` is false | Inspect DOM on `/transcribe`, `/blog`, `/convert` |
| **Sitemap Integrity** | Exact match with 16 static URLs + 20 blog URLs | Fetch `/sitemap.xml` via local server test |
| **Redirect Status Codes** | HTTP 301 for legacy paths; HTTP 410 for deleted paths | Verify Express routes in `server.ts` |
| **TypeScript / Build** | 0 compiler or bundler errors | `npm run lint` and `npm run build` |
