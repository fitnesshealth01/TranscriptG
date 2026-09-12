import React, { Suspense, Component, ErrorInfo, ReactNode } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Loader2, RefreshCw, AlertCircle } from "lucide-react";
import { Home } from "./pages/Home";

// Resilient dynamic importer that retries on transient network/Vite reload hiccups
function lazyWithRetry<T extends React.ComponentType<any>>(
  factory: () => Promise<{ default?: T; [key: string]: any }>,
  namedExport?: string
) {
  return React.lazy(async () => {
    try {
      const module = await factory();
      if (module.default) return { default: module.default };
      if (namedExport && module[namedExport]) return { default: module[namedExport] };
      const fallback = Object.values(module)[0];
      return { default: fallback };
    } catch (firstError) {
      console.warn("Retrying dynamic module load...", firstError);
      try {
        // Wait 500ms and try once more
        await new Promise((res) => setTimeout(res, 500));
        const module = await factory();
        if (module.default) return { default: module.default };
        if (namedExport && module[namedExport]) return { default: module[namedExport] };
        const fallback = Object.values(module)[0];
        return { default: fallback };
      } catch (secondError) {
        console.error("Module import failed on retry:", secondError);
        throw secondError;
      }
    }
  });
}

// Lazy-loaded sub-pages with automatic retry
const TranscribePage = lazyWithRetry(() => import("./pages/TranscribePage"), "TranscribePage");
const ConvertPage = lazyWithRetry(() => import("./pages/ConvertPage"), "ConvertPage");
const ProcessPage = lazyWithRetry(() => import("./pages/ProcessPage"), "ProcessPage");
const YouTubeTranscriptPage = lazyWithRetry(() => import("./pages/YouTubeTranscriptPage"), "YouTubeTranscriptPage");
const AboutPage = lazyWithRetry(() => import("./pages/AboutPage"), "AboutPage");
const PrivacyPage = lazyWithRetry(() => import("./pages/PrivacyPage"), "PrivacyPage");
const TermsPage = lazyWithRetry(() => import("./pages/TermsPage"), "TermsPage");
const ContactPage = lazyWithRetry(() => import("./pages/ContactPage"), "ContactPage");
const BlogIndexPage = lazyWithRetry(() => import("./pages/BlogIndexPage"), "BlogIndexPage");
const BlogPostDynamic = lazyWithRetry(() => import("./pages/BlogPostDynamic"), "BlogPostDynamic");
const NotFoundPage = lazyWithRetry(() => import("./pages/NotFoundPage"), "NotFoundPage");

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class AppErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, errorMessage: error.message || "An unexpected error occurred." };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Caught error in AppErrorBoundary:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-md w-full p-8 rounded-3xl bg-white shadow-2xl border border-black/10 space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-[#ff4d00]/10 text-[#ff4d00] flex items-center justify-center mx-auto">
              <AlertCircle className="w-7 h-7" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-[#0d0f12]">Module Loading Notice</h2>
              <p className="text-sm text-neutral-600">
                A newer version or updated module was loaded. Click below to refresh and load the latest view.
              </p>
            </div>
            <button
              onClick={this.handleReload}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#0d0f12] hover:bg-[#ff4d00] text-white font-mono font-bold text-sm transition-colors shadow-lg"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh &amp; Reload</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const PageFallbackLoader: React.FC = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
    <div className="p-4 rounded-2xl bg-white shadow-xl border border-black/10 flex items-center gap-3">
      <Loader2 className="w-5 h-5 text-[#ff4d00] animate-spin" />
      <span className="text-xs font-mono font-bold text-[#0d0f12]">Loading Engine View...</span>
    </div>
  </div>
);

export default function App() {
  return (
    <AppErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageFallbackLoader />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="transcribe" element={<TranscribePage />} />
              <Route path="youtube-transcript" element={<YouTubeTranscriptPage />} />
              <Route path="youtube" element={<YouTubeTranscriptPage />} />
              <Route path="convert" element={<ConvertPage />} />
              <Route path="process" element={<ProcessPage />} />
              <Route path="about" element={<AboutPage />} />
              <Route path="privacy" element={<PrivacyPage />} />
              <Route path="terms" element={<TermsPage />} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="blog" element={<BlogIndexPage />} />
              <Route path="blog/:slug" element={<BlogPostDynamic />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AppErrorBoundary>
  );
}
