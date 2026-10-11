/**
 * Standardized Google Analytics 4 (GA4) event dispatcher.
 * Safely checks for window.gtag before triggering telemetry.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    try {
      window.gtag("event", eventName, params);
    } catch (e) {
      // Ignore telemetry errors
    }
  }
}

export const Analytics = {
  toolView: (toolName: string) => {
    trackEvent("tool_view", { tool_name: toolName });
  },
  fileSelected: (fileType: string, fileSizeMb: number) => {
    trackEvent("file_selected", { file_type: fileType, file_size_mb: fileSizeMb });
  },
  youtubeUrlSubmitted: (urlDomain: string) => {
    trackEvent("youtube_url_submitted", { domain: urlDomain });
  },
  processStarted: (operation: string, targetLanguage?: string) => {
    trackEvent("process_started", { operation, target_language: targetLanguage });
  },
  exportDownloaded: (format: string, tool: string) => {
    trackEvent("export_downloaded", { format, tool });
  },
};
