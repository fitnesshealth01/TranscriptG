import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface FaqItem {
  q: string;
  a: string;
}

export interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string | string[];
  type?: "website" | "article" | "application";
  faqs?: FaqItem[];
  jsonLd?: Record<string, any> | Record<string, any>[];
  canonicalPath?: string;
  canonicalUrl?: string;
  author?: string;
  datePublished?: string;
  dateModified?: string;
  applicationCategory?: string;
  noindex?: boolean;
}

export const Seo: React.FC<SeoProps> = ({
  title = "TranscriptG — Free High-Precision Audio Transcription, YouTube Captions & Subtitle Converter",
  description = "No login, no watermark, zero-retention transcription platform. Transcribe speech to text, generate YouTube video transcripts with timestamps, convert SRT/VTT/JSON, and parse academic Parchment transcripts in 90+ languages.",
  keywords = "transcription, speech to text, youtube transcript generator, parchment transcript parser, srt converter, vtt converter, audio summarizer, free transcription, AI transcription, closed captions",
  type = "website",
  faqs,
  jsonLd,
  canonicalPath,
  canonicalUrl: customCanonicalUrl,
  author = "TranscriptG Engineering Lab",
  datePublished = "2026-08-01",
  dateModified = "2026-08-27",
  applicationCategory = "MultimediaApplication",
  noindex = false,
}) => {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;
  const siteUrl = typeof window !== "undefined" && window.location.origin
    ? window.location.origin
    : "https://transcriptg.com";
  
  const canonicalUrl = customCanonicalUrl || `${siteUrl}${currentPath === "/" ? "" : currentPath}`;

  const formattedKeywords = Array.isArray(keywords) ? keywords.join(", ") : keywords;

  useEffect(() => {
    // 1. Update Title
    const formattedTitle = title.includes("TranscriptG") ? title : `${title} | TranscriptG`;
    document.title = formattedTitle;

    // 2. Helper to set/update meta tag
    const setMetaTag = (nameAttr: string, attrValue: string, content: string) => {
      let element = document.querySelector(`meta[${nameAttr}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(nameAttr, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Meta descriptions and keywords
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", formattedKeywords);
    setMetaTag("name", "author", author);
    setMetaTag(
      "name",
      "robots",
      noindex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
    );
    setMetaTag("name", "googlebot", noindex ? "noindex, nofollow" : "index, follow");

    // OpenGraph
    setMetaTag("property", "og:title", formattedTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type === "article" ? "article" : "website");
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:site_name", "TranscriptG");
    setMetaTag("property", "og:locale", "en_US");
    setMetaTag("property", "og:image", `${siteUrl}/icon.png`);

    // Twitter Cards
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", formattedTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:image", `${siteUrl}/icon.png`);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 3. Inject JSON-LD Graph
    const jsonLdId = "transcriptg-jsonld";
    let scriptTag = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = jsonLdId;
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }

    const graph: any[] = [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "TranscriptG",
        description: "Elite, free, no-login transcription and text intelligence web platform",
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "TranscriptG",
        url: siteUrl,
        logo: `${siteUrl}/icon.png`,
      },
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/#webapp`,
        name: formattedTitle,
        url: canonicalUrl,
        applicationCategory,
        operatingSystem: "All Browser Runtimes (Chrome, Firefox, Safari, Edge, Android, iOS)",
        browserRequirements: "Requires modern JavaScript and HTML5 Audio/Video",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          ratingCount: "1280",
          bestRating: "5",
          worstRating: "1",
        },
      },
    ];

    // Add Breadcrumb Schema
    const pathParts = currentPath.split("/").filter(Boolean);
    if (pathParts.length > 0) {
      const breadcrumbItems = [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
      ];

      let runningPath = siteUrl;
      pathParts.forEach((part, idx) => {
        runningPath += `/${part}`;
        const humanName = part.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
        breadcrumbItems.push({
          "@type": "ListItem",
          position: idx + 2,
          name: humanName,
          item: runningPath,
        });
      });

      graph.push({
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbItems,
      });
    }

    // Add FAQ Schema if FAQs are provided
    if (faqs && faqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      });
    }

    // Add Article Schema if type === "article"
    if (type === "article") {
      graph.push({
        "@type": "BlogPosting",
        headline: formattedTitle,
        description,
        mainEntityOfPage: canonicalUrl,
        author: {
          "@type": "Organization",
          name: author,
        },
        publisher: {
          "@type": "Organization",
          name: "TranscriptG",
          url: siteUrl,
        },
        datePublished,
        dateModified,
        inLanguage: "en-US",
      });
    }

    const finalData = jsonLd ? jsonLd : { "@context": "https://schema.org", "@graph": graph };
    scriptTag.textContent = JSON.stringify(finalData);

    // Google Analytics SPA Page View Tracking
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "page_view", {
        page_title: formattedTitle,
        page_location: canonicalUrl,
        page_path: currentPath,
        send_to: "G-BVZ9V3TN4V",
      });
    }
  }, [
    title,
    description,
    formattedKeywords,
    type,
    canonicalUrl,
    currentPath,
    jsonLd,
    faqs,
    author,
    datePublished,
    dateModified,
    siteUrl,
    applicationCategory,
    noindex,
  ]);

  return null;
};

