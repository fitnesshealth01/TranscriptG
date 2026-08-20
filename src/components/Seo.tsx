import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export interface FaqItem {
  q: string;
  a: string;
}

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  type?: "website" | "article" | "application";
  faqs?: FaqItem[];
  jsonLd?: Record<string, any> | Record<string, any>[];
  canonicalPath?: string;
  author?: string;
  datePublished?: string;
}

export const Seo: React.FC<SeoProps> = ({
  title = "TranscriptG — Free High-Precision Transcription & Text Intelligence",
  description = "No login, no watermark, privacy-first transcription platform. Transcribe speech to text, convert SRT/VTT/JSON, and summarize audio in 90+ languages.",
  keywords = "transcription, speech to text, srt converter, vtt converter, audio summarizer, free transcription, AI transcription, closed captions",
  type = "website",
  faqs,
  jsonLd,
  canonicalPath,
  author = "TranscriptG Engineering",
  datePublished = "2026-08-01",
}) => {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://transcriptg.com";
  const canonicalUrl = `${siteUrl}${currentPath}`;

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

    // Meta descriptions and OpenGraph
    setMetaTag("name", "description", description);
    setMetaTag("name", "keywords", keywords);
    setMetaTag("property", "og:title", formattedTitle);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type === "article" ? "article" : "website");
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:site_name", "TranscriptG");
    setMetaTag("name", "twitter:title", formattedTitle);
    setMetaTag("name", "twitter:description", description);
    setMetaTag("name", "twitter:card", "summary_large_image");

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
        "url": siteUrl,
        "name": "TranscriptG",
        "description": "Elite, free, no-login transcription and text intelligence web platform",
        "inLanguage": "en-US",
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "TranscriptG",
        "url": siteUrl,
        "logo": `${siteUrl}/icon.png`,
      },
      {
        "@type": "WebApplication",
        "@id": `${siteUrl}/#webapp`,
        "name": "TranscriptG Engine Suite",
        "url": siteUrl,
        "applicationCategory": "UtilitiesApplication",
        "operatingSystem": "All Browser Runtimes",
        "browserRequirements": "Requires JavaScript and HTML5",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD",
        },
      },
    ];

    // Add Breadcrumb Schema
    const pathParts = currentPath.split("/").filter(Boolean);
    if (pathParts.length > 0) {
      const breadcrumbItems = [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": siteUrl,
        },
      ];

      let runningPath = siteUrl;
      pathParts.forEach((part, idx) => {
        runningPath += `/${part}`;
        const humanName = part.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
        breadcrumbItems.push({
          "@type": "ListItem",
          "position": idx + 2,
          "name": humanName,
          "item": runningPath,
        });
      });

      graph.push({
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbItems,
      });
    }

    // Add FAQ Schema if FAQs are provided
    if (faqs && faqs.length > 0) {
      graph.push({
        "@type": "FAQPage",
        "mainEntity": faqs.map((f) => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a,
          },
        })),
      });
    }

    // Add Article Schema if type === "article"
    if (type === "article") {
      graph.push({
        "@type": "BlogPosting",
        "headline": formattedTitle,
        "description": description,
        "mainEntityOfPage": canonicalUrl,
        "author": {
          "@type": "Organization",
          "name": author,
        },
        "publisher": {
          "@type": "Organization",
          "name": "TranscriptG",
          "url": siteUrl,
        },
        "datePublished": datePublished,
        "inLanguage": "en-US",
      });
    }

    const finalData = jsonLd ? jsonLd : { "@context": "https://schema.org", "@graph": graph };
    scriptTag.textContent = JSON.stringify(finalData);
  }, [title, description, type, canonicalUrl, jsonLd, faqs, author, datePublished, siteUrl]);

  return null;
};

