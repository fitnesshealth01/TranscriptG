import express from "express";
import path from "path";
import multer from "multer";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

// Process level safety to prevent crashes from unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("[Server Warning] Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("[Server Warning] Uncaught Exception:", err);
});

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Multer memory storage for uploads up to 25MB
const upload = multer({
  limits: { fileSize: 25 * 1024 * 1024 },
  storage: multer.memoryStorage(),
});

// Lazy Gemini AI getter
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not set.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// Helper for calling Gemini with instant multi-model failover and backoff
async function generateContentWithFallback(ai: GoogleGenAI, params: {
  contents: any;
  config?: any;
}) {
  const modelsToTry = [
    "gemini-2.5-flash",
    "gemini-3.7-flash",
    "gemini-2.0-flash",
    "gemini-1.5-flash",
    "gemini-3.1-flash-lite",
  ];

  let lastError: any = null;

  for (const model of modelsToTry) {
    // Up to 2 attempts per model before switching
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        console.log(`[Gemini API] Executing request with model '${model}' (attempt ${attempt}/2)...`);
        const response = await ai.models.generateContent({
          ...params,
          model,
        });

        if (response && response.text) {
          console.log(`[Gemini API] Request succeeded with model '${model}'`);
          return response;
        }
      } catch (err: any) {
        lastError = err;
        const errCode = err?.status || err?.code || err?.statusCode;
        const errMsg = err?.message || String(err);

        const isHighDemandOr503 =
          errCode === 503 ||
          errMsg.includes("503") ||
          errMsg.includes("UNAVAILABLE") ||
          errMsg.includes("high demand") ||
          errMsg.includes("overloaded");

        if (isHighDemandOr503) {
          // Immediately fall back to the next model in the pool on high demand
          console.warn(`[Gemini API] Model '${model}' is experiencing high demand (503). Switching to fallback model immediately...`);
          break; // Exit attempt loop to try next model instantly
        }

        const isTransient =
          errCode === 429 ||
          errCode === 500 ||
          errCode === 502 ||
          errCode === 504 ||
          errMsg.includes("429") ||
          errMsg.includes("quota") ||
          errMsg.includes("rate");

        if (attempt < 2 && isTransient) {
          const delayMs = 300 + Math.floor(Math.random() * 200);
          console.log(`[Gemini API] Retrying '${model}' in ${delayMs}ms...`);
          await new Promise((r) => setTimeout(r, delayMs));
        } else {
          break;
        }
      }
    }
  }

  throw lastError || new Error("All AI models are currently busy. Automatic failover retried all available models.");
}

function parseJSONResponse(rawText: string) {
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
  }
  try {
    return JSON.parse(cleaned);
  } catch (err) {
    // Attempt fallback repair for truncated JSON or missing brackets
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Unable to parse structured transcription data from AI output.");
  }
}

// API Health
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "TranscriptG" });
});

// API Transcribe
app.post("/api/transcribe", (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          error: "File size exceeds 25MB limit. Please upload a smaller audio or video file.",
        });
      }
      return res.status(400).json({
        error: err.message || "File upload failed. Please verify the media file and try again.",
      });
    }
    next();
  });
}, async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No audio or video file was provided." });
    }

    const generateSummary = req.body.generateSummary === "true" || req.body.generateSummary === true;
    
    // Normalize MIME type
    let mimeType = req.file.mimetype || "audio/mp3";
    if (mimeType === "application/octet-stream" || !mimeType) {
      const ext = path.extname(req.file.originalname || "").toLowerCase();
      if (ext === ".mp3") mimeType = "audio/mp3";
      else if (ext === ".wav") mimeType = "audio/wav";
      else if (ext === ".m4a") mimeType = "audio/mp3";
      else if (ext === ".ogg") mimeType = "audio/ogg";
      else if (ext === ".mp4") mimeType = "video/mp4";
      else if (ext === ".mov") mimeType = "video/mp4";
      else mimeType = "audio/mp3";
    }

    const base64Data = req.file.buffer.toString("base64");
    const ai = getGeminiClient();

    const prompt = `You are TranscriptG, an expert audio/video transcription model.
Transcribe the provided media content accurately with start and end timestamps in seconds.
Break down the transcription into natural sentence or thought segments.
${generateSummary ? "Also provide a brief 2-4 sentence executive summary of the content." : ""}

Return the result as a strict JSON object matching this structure:
{
  "languageDetected": "string (e.g. English, Spanish, French)",
  "summary": "string (optional summary if requested, else empty string)",
  "segments": [
    {
      "start": 0.0,
      "end": 3.5,
      "text": "Transcribed spoken text"
    }
  ]
}`;

    const response = await generateContentWithFallback(ai, {
      contents: [
        {
          inlineData: {
            mimeType,
            data: base64Data,
          },
        },
        { text: prompt },
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            languageDetected: { type: Type.STRING },
            summary: { type: Type.STRING },
            segments: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  start: { type: Type.NUMBER, description: "Start time in seconds" },
                  end: { type: Type.NUMBER, description: "End time in seconds" },
                  text: { type: Type.STRING, description: "Text segment spoken" },
                },
                required: ["start", "end", "text"],
              },
            },
          },
          required: ["segments"],
        },
      },
    });

    const responseText = response.text || "{}";
    const result = parseJSONResponse(responseText);

    return res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    console.error("Transcription error:", err);
    return res.status(500).json({
      error: err.message || "Failed to transcribe audio/video file. Please try again.",
    });
  }
});

// API Process Text Intelligence
app.post("/api/process", async (req, res) => {
  try {
    const { text, operation, targetLanguage } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text content is required." });
    }

    const ai = getGeminiClient();
    let prompt = "";

    switch (operation) {
      case "summarize":
        prompt = `Provide a concise 3 to 5 sentence summary of the following text:\n\n${text}`;
        break;
      case "translate":
        prompt = `Translate the following text accurately into ${targetLanguage || "English"}. Retain the original tone and context:\n\n${text}`;
        break;
      case "key_points":
        prompt = `Extract 5 to 9 key takeaways and bullet points from the following text in clear markdown bullet points:\n\n${text}`;
        break;
      case "polish":
        prompt = `Polish and refine the following text. Fix grammar, remove filler words, improve clarity, and smooth transitions while preserving the exact original core meaning:\n\n${text}`;
        break;
      case "title":
        prompt = `Generate a compelling main title and 3 to 5 clear chapter headings with short 1-2 sentence descriptions for the following text in markdown format:\n\n${text}`;
        break;
      default:
        prompt = `Analyze and format the following text clearly:\n\n${text}`;
    }

    const response = await generateContentWithFallback(ai, {
      contents: prompt,
    });

    return res.json({
      success: true,
      result: response.text || "",
    });
  } catch (err: any) {
    console.error("Text process error:", err);
    return res.status(500).json({
      error: err.message || "Failed to process text intelligence request.",
    });
  }
});

// Sitemap route
app.get("/sitemap.xml", (req, res) => {
  const host = req.headers.host || "transcriptg.com";
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const baseUrl = `${protocol}://${host}`;

  const routes = [
    "",
    "/transcribe",
    "/convert",
    "/process",
    "/about",
    "/privacy",
    "/terms",
    "/contact",
    "/blog",
    "/blog/how-transcriptg-works",
    "/blog/transcription-tips",
    "/blog/srt-vs-vtt",
    "/blog/ai-meeting-summarizer-guide",
  ];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(
      (route) => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${new Date().toISOString().split("T")[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === "" ? "1.0" : route.startsWith("/blog") ? "0.8" : "0.9"}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.send(sitemapXml);
});

// Robots.txt route
app.get("/robots.txt", (req, res) => {
  const host = req.headers.host || "transcriptg.com";
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const baseUrl = `${protocol}://${host}`;

  res.setHeader("Content-Type", "text/plain");
  res.send(`User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`);
});

// Ads.txt route for Google AdSense compliance
app.get("/ads.txt", (_req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.send(`google.com, pub-9246342607636743, DIRECT, f08c47fec0942fa0
`);
});

// RSS 2.0 Feed Route for Off-Page Syndication & News Search Indexing
app.get(["/rss.xml", "/feed.xml"], (req, res) => {
  const host = req.headers.host || "transcriptg.com";
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const baseUrl = `${protocol}://${host}`;

  const posts = [
    {
      slug: "how-transcriptg-works",
      title: "How TranscriptG Works: Inside Our Privacy-First Acoustic Engine",
      description: "An architectural overview of sub-second speech processing, acoustic timecode generation, and session-private data handling.",
      pubDate: "Fri, 01 Aug 2026 00:00:00 GMT",
    },
    {
      slug: "transcription-tips",
      title: "10 Proven Tips for Achieving 99%+ Speech Transcription Accuracy",
      description: "Learn how microphone placement, sample rate normalization, and background noise isolation drastically elevate transcript quality.",
      pubDate: "Sat, 02 Aug 2026 00:00:00 GMT",
    },
    {
      slug: "srt-vs-vtt",
      title: "SRT vs. VTT: Which Subtitle Format Should You Use in 2026?",
      description: "A definitive comparison between SubRip (SRT) and Web Video Text Tracks (VTT) for YouTube, HTML5 video, and video editing suites.",
      pubDate: "Sun, 03 Aug 2026 00:00:00 GMT",
    },
    {
      slug: "ai-meeting-summarizer-guide",
      title: "How to Convert Zoom & Teams Meeting Audio into Actionable AI Digests",
      description: "A practical guide for executives and remote teams to extract decision logs, action items, and executive summaries from recordings.",
      pubDate: "Mon, 04 Aug 2026 00:00:00 GMT",
    },
  ];

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>TranscriptG Journal & Engineering Insights</title>
  <link>${baseUrl}/blog</link>
  <description>High-precision audio transcription, subtitle conversion guides, and AI speech intelligence engineering notes.</description>
  <language>en-us</language>
  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
  ${posts
    .map(
      (p) => `
  <item>
    <title>${p.title}</title>
    <link>${baseUrl}/blog/${p.slug}</link>
    <guid>${baseUrl}/blog/${p.slug}</guid>
    <description>${p.description}</description>
    <pubDate>${p.pubDate}</pubDate>
  </item>`
    )
    .join("")}
</channel>
</rss>`;

  res.setHeader("Content-Type", "application/xml");
  res.send(rssXml);
});

// Global Express Error Handler (returns JSON instead of default HTML)
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Global Express Error Handler:", err);
  if (res.headersSent) {
    return;
  }
  return res.status(err.status || err.statusCode || 500).json({
    error: err.message || "An unexpected server error occurred.",
  });
});

// Vite Middleware for dev / Static file serving for production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TranscriptG server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
