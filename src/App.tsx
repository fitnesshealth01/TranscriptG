import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { TranscribePage } from "./pages/TranscribePage";
import { ConvertPage } from "./pages/ConvertPage";
import { ProcessPage } from "./pages/ProcessPage";
import { AboutPage } from "./pages/AboutPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { ContactPage } from "./pages/ContactPage";
import { BlogIndexPage } from "./pages/BlogIndexPage";
import { BlogPost1 } from "./pages/BlogPost1";
import { BlogPost2 } from "./pages/BlogPost2";
import { BlogPost3 } from "./pages/BlogPost3";
import { NotFoundPage } from "./pages/NotFoundPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="transcribe" element={<TranscribePage />} />
          <Route path="convert" element={<ConvertPage />} />
          <Route path="process" element={<ProcessPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogIndexPage />} />
          <Route path="blog/how-transcriptg-works" element={<BlogPost1 />} />
          <Route path="blog/transcription-tips" element={<BlogPost2 />} />
          <Route path="blog/srt-vs-vtt" element={<BlogPost3 />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
