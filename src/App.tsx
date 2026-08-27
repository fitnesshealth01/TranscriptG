import React, { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Loader2 } from "lucide-react";

// Lazy-loaded page components for bundle-size optimization
const Home = React.lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })));
const TranscribePage = React.lazy(() => import("./pages/TranscribePage").then((m) => ({ default: m.TranscribePage })));
const ConvertPage = React.lazy(() => import("./pages/ConvertPage").then((m) => ({ default: m.ConvertPage })));
const ProcessPage = React.lazy(() => import("./pages/ProcessPage").then((m) => ({ default: m.ProcessPage })));
const ParchmentPage = React.lazy(() => import("./pages/ParchmentPage").then((m) => ({ default: m.ParchmentPage })));
const YouTubeTranscriptPage = React.lazy(() => import("./pages/YouTubeTranscriptPage").then((m) => ({ default: m.YouTubeTranscriptPage })));
const GramsToCupsPage = React.lazy(() => import("./pages/GramsToCupsPage").then((m) => ({ default: m.GramsToCupsPage })));
const AboutPage = React.lazy(() => import("./pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const PrivacyPage = React.lazy(() => import("./pages/PrivacyPage").then((m) => ({ default: m.PrivacyPage })));
const TermsPage = React.lazy(() => import("./pages/TermsPage").then((m) => ({ default: m.TermsPage })));
const ContactPage = React.lazy(() => import("./pages/ContactPage").then((m) => ({ default: m.ContactPage })));
const BlogIndexPage = React.lazy(() => import("./pages/BlogIndexPage").then((m) => ({ default: m.BlogIndexPage })));
const BlogPostDynamic = React.lazy(() => import("./pages/BlogPostDynamic").then((m) => ({ default: m.BlogPostDynamic })));
const NotFoundPage = React.lazy(() => import("./pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })));

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
            <Route path="parchment-transcript" element={<ParchmentPage />} />
            <Route path="parchment" element={<ParchmentPage />} />
            <Route path="grams-to-cups" element={<GramsToCupsPage />} />
            <Route path="gramstocups" element={<GramsToCupsPage />} />
            <Route path="baking-converter" element={<GramsToCupsPage />} />
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
  );
}
