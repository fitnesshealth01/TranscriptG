import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface SeoProps {
  title?: string;
  description?: string;
  type?: "website" | "article" | "application";
  jsonLd?: Record<string, any> | Record<string, any>[];
  canonicalPath?: string;
}

export const Seo: React.FC<SeoProps> = ({
  title = "TranscriptG — Free High-Precision Transcription & Text Intelligence",
  description = "No login, no watermark, privacy-first transcription platform. Transcribe speech to text, convert SRT/VTT/JSON, and summarize audio in 90+ languages.",
  type = "website",
  jsonLd,
  canonicalPath,
}) => {
  const location = useLocation();
  const currentPath = canonicalPath || location.pathname;
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "https://transcriptg.com";
  const canonicalUrl = `${siteUrl}${currentPath}`;

  useEffect(() => {
    // 1. Update Title
    document.title = title.includes("TranscriptG") ? title : `${title} | TranscriptG`;

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

    // Meta descriptions
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", title);
    setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", type === "article" ? "article" : "website");
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("name", "twitter:title", title);
    setMetaTag("name", "twitter:description", description);

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 3. Inject JSON-LD
    const jsonLdId = "transcriptg-jsonld";
    let scriptTag = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = jsonLdId;
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }

    const defaultSiteLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${siteUrl}/#website`,
          "url": siteUrl,
          "name": "TranscriptG",
          "description": "Elite, free, no-login transcription and text intelligence web platform",
          "inLanguage": "en",
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
          "name": "TranscriptG Engine",
          "url": siteUrl,
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "All",
          "browserRequirements": "Requires JavaScript. Requires HTML5.",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD",
          },
        },
      ],
    };

    const finalData = jsonLd ? jsonLd : defaultSiteLd;
    scriptTag.textContent = JSON.stringify(finalData);

    return () => {
      // Optional cleanup if unmounting
    };
  }, [title, description, type, canonicalUrl, jsonLd]);

  return null;
};
