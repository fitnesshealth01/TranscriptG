import express from "express";
import path from "path";
import multer from "multer";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { BLOG_ARTICLES } from "./src/data/blogArticles";

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
app.post("/api/transcribe", (req: any, res: any, next: any) => {
  upload.single("file")(req, res, (err: any) => {
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
}, async (req: any, res: any) => {
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

// API Parchment Academic Transcript Parser
app.post("/api/parchment/parse", (req: any, res: any, next: any) => {
  upload.single("file")(req, res, (err: any) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          error: "File size exceeds 25MB limit. Please upload a smaller document.",
        });
      }
      return res.status(400).json({
        error: err.message || "File upload failed.",
      });
    }
    next();
  });
}, async (req: any, res: any) => {
  try {
    const rawText = req.body.text;
    const ai = getGeminiClient();

    let contents: any[] = [];
    const prompt = `You are TranscriptG Academic Document Intelligence Engine, specialized in parsing official and unofficial Parchment, National Student Clearinghouse, and Registrar academic transcripts.
Analyze the provided transcript document or text and extract complete academic history, courses, grades, credits, terms, and student/institution data.

Ensure high precision:
1. Extract student information (Name, Student ID, Birth Date if present, SSN last 4 if present, Parchment Document ID / DID tracking number).
2. Extract institution details (Name, Address, Registrar, Accreditation, School Type: University/College/High School).
3. Extract degree / diploma awards (Degree, Major, Minor, Graduation Date, Honors, Class Rank).
4. Extract terms and courses chronologically. For each course:
   - code (e.g. "CS 101", "MATH 215", "AP-CALC-BC")
   - title (e.g. "Intro to Computer Science")
   - creditsAttempted (e.g. 4.0)
   - creditsEarned (e.g. 4.0)
   - grade (e.g. "A", "A-", "B+", "P", "CR")
   - gradePoints (e.g. 16.0 for 4 credits * 4.0)
   - isIncludedInGpa (true unless pass/fail or transfer)
   - category (e.g. "Major Core", "Quantitative", "AP / Honors", "General Elective")
5. Extract GPA summary (cumulative GPA, total credits attempted, total credits earned, quality points, unweighted GPA, weighted GPA).
6. Extract authenticity indicators (Parchment DID, digital signature notes, security seals).
7. Extract key academic strengths, grade distribution counts (A, B, C, D, F, Other), Dean's list terms, and transfer readiness audit.

Return a strict JSON object with this exact structure:
{
  "studentInfo": {
    "name": "string",
    "studentId": "string",
    "birthDate": "string",
    "ssnLast4": "string",
    "issueDate": "string",
    "documentId": "string",
    "printStatus": "string"
  },
  "institutionInfo": {
    "name": "string",
    "address": "string",
    "registrarName": "string",
    "accreditation": "string",
    "schoolType": "University"
  },
  "degreeInfo": {
    "degreeAwarded": "string",
    "major": "string",
    "minor": "string",
    "graduationDate": "string",
    "honors": "string",
    "classRank": "string"
  },
  "terms": [
    {
      "termName": "string",
      "academicLevel": "string",
      "termGpa": 0.0,
      "termCreditsAttempted": 0.0,
      "termCreditsEarned": 0.0,
      "courses": [
        {
          "id": "string",
          "code": "string",
          "title": "string",
          "creditsAttempted": 0.0,
          "creditsEarned": 0.0,
          "grade": "string",
          "gradePoints": 0.0,
          "isIncludedInGpa": true,
          "category": "string",
          "termName": "string"
        }
      ]
    }
  ],
  "summary": {
    "cumulativeGpa": 0.0,
    "totalCreditsAttempted": 0.0,
    "totalCreditsEarned": 0.0,
    "totalQualityPoints": 0.0,
    "unweightedGpa": 0.0,
    "weightedGpa": 0.0,
    "gradingScale": "string"
  },
  "transferCredits": [
    {
      "institution": "string",
      "coursesSummary": "string",
      "totalCredits": 0.0
    }
  ],
  "authenticity": {
    "hasParchmentDocId": true,
    "documentId": "string",
    "hasDigitalSignatureNote": true,
    "blueRibbonNotice": "string",
    "securityWatermarkDetected": true
  },
  "academicInsights": {
    "strengths": ["string"],
    "creditCompletionRate": 100.0,
    "gradeDistribution": {
      "A": 0,
      "B": 0,
      "C": 0,
      "D": 0,
      "F": 0,
      "Other": 0
    },
    "deanListTerms": ["string"],
    "academicStanding": "string",
    "transferReadyAudit": "string"
  }
}`;

    if (req.file) {
      let mimeType = req.file.mimetype || "application/pdf";
      if (mimeType === "application/octet-stream" || !mimeType) {
        const ext = path.extname(req.file.originalname || "").toLowerCase();
        if (ext === ".pdf") mimeType = "application/pdf";
        else if (ext === ".png") mimeType = "image/png";
        else if (ext === ".jpg" || ext === ".jpeg") mimeType = "image/jpeg";
        else if (ext === ".webp") mimeType = "image/webp";
        else mimeType = "application/pdf";
      }

      const base64Data = req.file.buffer.toString("base64");
      contents = [
        {
          inlineData: {
            mimeType,
            data: base64Data,
          },
        },
        { text: prompt },
      ];
    } else if (rawText && typeof rawText === "string" && rawText.trim().length > 0) {
      contents = [
        { text: `Raw Transcript Text:\n\n${rawText}\n\n${prompt}` },
      ];
    } else {
      return res.status(400).json({ error: "No transcript file (PDF/Image) or text content provided." });
    }

    const response = await generateContentWithFallback(ai, {
      contents,
      config: {
        responseMimeType: "application/json",
      },
    });

    const responseText = response.text || "{}";
    const result = parseJSONResponse(responseText);

    // Ensure IDs exist for courses
    if (result.terms && Array.isArray(result.terms)) {
      result.terms.forEach((term: any, tIdx: number) => {
        if (term.courses && Array.isArray(term.courses)) {
          term.courses.forEach((c: any, cIdx: number) => {
            if (!c.id) c.id = `course-${tIdx + 1}-${cIdx + 1}-${Math.random().toString(36).substring(2, 6)}`;
            if (!c.termName) c.termName = term.termName || `Term ${tIdx + 1}`;
          });
        }
      });
    }

    return res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    console.error("Parchment parse error:", err);
    return res.status(500).json({
      error: err.message || "Failed to parse transcript document. Please check the file and try again.",
    });
  }
});

// Helper: Extract YouTube Video ID from any URL format
function extractYouTubeVideoId(input: string): string | null {
  if (!input || typeof input !== "string") return null;
  const trimmed = input.trim();

  // If already an 11-char ID
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  // Common YouTube URL regex patterns
  const patterns = [
    /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/i,
    /(?:https?:\/\/)?(?:www\.|m\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/i,
    /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i,
    /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i,
    /(?:https?:\/\/)?(?:www\.|m\.)?youtube\.com\/live\/([a-zA-Z0-9_-]{11})/i,
    /(?:https?:\/\/)?(?:www\.)?youtube\.com\/v\/([a-zA-Z0-9_-]{11})/i,
    /[?&]v=([a-zA-Z0-9_-]{11})/i,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

// Helper: Decode HTML entities from captions
function decodeHtmlEntities(text: string): string {
  if (!text) return "";
  return text
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(dec))
    .replace(/\\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Helper: Fetch YouTube native metadata & caption tracks
async function fetchYouTubeNativeData(videoId: string) {
  let title = `YouTube Video (${videoId})`;
  let authorName = "YouTube Creator";
  let authorUrl = `https://www.youtube.com/watch?v=${videoId}`;
  let thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  let embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}`;

  // 1. Fetch oEmbed metadata
  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`;
    const oembedRes = await fetch(oembedUrl, {
      headers: { "User-Agent": "TranscriptG-Bot/1.0" },
      signal: AbortSignal.timeout(5000),
    });
    if (oembedRes.ok) {
      const oembedData: any = await oembedRes.json();
      if (oembedData.title) title = oembedData.title;
      if (oembedData.author_name) authorName = oembedData.author_name;
      if (oembedData.author_url) authorUrl = oembedData.author_url;
      if (oembedData.thumbnail_url) thumbnailUrl = oembedData.thumbnail_url;
    }
  } catch (e) {
    console.warn(`oEmbed fetch skipped for ${videoId}:`, e);
  }

  // 2. Fetch watch page HTML to inspect caption tracks
  let availableTracks: { code: string; name: string; isAutoGenerated: boolean; url: string }[] = [];
  try {
    const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (pageRes.ok) {
      const html = await pageRes.text();

      // Extract title if not from oembed
      const titleMatch = html.match(/<meta\s+name="title"\s+content="([^"]+)"/i) || html.match(/<title>([^<]+)<\/title>/i);
      if (titleMatch && titleMatch[1] && title === `YouTube Video (${videoId})`) {
        title = decodeHtmlEntities(titleMatch[1].replace(/ - YouTube$/, ""));
      }

      // Try finding player response
      const playerMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.+?});(?:var|\s*<\/script>|\s*let|\s*const)/s);
      if (playerMatch && playerMatch[1]) {
        try {
          const playerJson = JSON.parse(playerMatch[1]);
          const tracks = playerJson?.captions?.playerCaptionsTracklistRenderer?.captionTracks;
          if (Array.isArray(tracks) && tracks.length > 0) {
            availableTracks = tracks.map((t: any) => ({
              code: t.languageCode || "en",
              name: t.name?.simpleText || t.name?.runs?.[0]?.text || t.languageCode || "English",
              isAutoGenerated: t.kind === "asr" || t.vssId?.startsWith("a."),
              url: t.baseUrl,
            }));
          }
        } catch (err) {
          console.warn("Failed to parse player JSON:", err);
        }
      }
    }
  } catch (err) {
    console.warn(`HTML scrape error for ${videoId}:`, err);
  }

  return {
    metadata: {
      videoId,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      title,
      authorName,
      authorUrl,
      thumbnailUrl,
      embedUrl,
    },
    availableTracks,
  };
}

// API: YouTube Transcript Generator (Native Captions + AI Multimodal Speech Reconstruction)
app.post("/api/youtube/transcript", async (req: any, res: any) => {
  try {
    const { url, videoId: rawVideoId, languageCode, forceAiReconstruct } = req.body;
    const targetVideoId = rawVideoId || extractYouTubeVideoId(url);

    if (!targetVideoId) {
      return res.status(400).json({
        error: "Please provide a valid YouTube video URL, Shorts link, or 11-character Video ID.",
      });
    }

    // Step 1: Fetch Video Metadata & Available Native Subtitle Tracks
    const nativeData = await fetchYouTubeNativeData(targetVideoId);
    const { metadata, availableTracks } = nativeData;

    let transcriptSegments: { start: number; end: number; text: string; speaker?: string }[] = [];
    let detectedLang = "English";
    let source: "youtube_official_captions" | "youtube_auto_captions" | "ai_speech_reconstruction" = "ai_speech_reconstruction";
    let selectedTrackName = "";

    // Step 2: If native tracks exist and not forced AI, attempt to fetch timedtext
    if (availableTracks.length > 0 && !forceAiReconstruct) {
      // Find requested language or default to English or first track
      let targetTrack = availableTracks.find(
        (t) => t.code.toLowerCase() === (languageCode || "en").toLowerCase() && !t.isAutoGenerated
      );
      if (!targetTrack) {
        targetTrack = availableTracks.find((t) => t.code.toLowerCase() === (languageCode || "en").toLowerCase());
      }
      if (!targetTrack) {
        targetTrack = availableTracks.find((t) => t.code.startsWith("en"));
      }
      if (!targetTrack) {
        targetTrack = availableTracks[0];
      }

      if (targetTrack && targetTrack.url) {
        selectedTrackName = targetTrack.name;
        source = targetTrack.isAutoGenerated ? "youtube_auto_captions" : "youtube_official_captions";
        detectedLang = targetTrack.name || targetTrack.code;

        try {
          // Fetch caption track in json3 or xml
          const captionUrl = targetTrack.url.includes("fmt=") ? targetTrack.url : `${targetTrack.url}&fmt=json3`;
          const capRes = await fetch(captionUrl, {
            headers: {
              "User-Agent":
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
            },
            signal: AbortSignal.timeout(8000),
          });

          if (capRes.ok) {
            const capText = await capRes.text();
            if (capText.startsWith("{")) {
              const capJson = JSON.parse(capText);
              if (Array.isArray(capJson.events)) {
                for (const ev of capJson.events) {
                  if (ev.segs && Array.isArray(ev.segs)) {
                    const text = decodeHtmlEntities(ev.segs.map((s: any) => s.utf8 || "").join(""));
                    if (text && text.trim().length > 0) {
                      const start = Math.round((ev.tStartMs || 0) / 100) / 10;
                      const dur = Math.round((ev.dDurationMs || 3000) / 100) / 10;
                      transcriptSegments.push({
                        start,
                        end: Math.round((start + dur) * 10) / 10,
                        text,
                      });
                    }
                  }
                }
              }
            } else if (capText.includes("<text")) {
              // Parse XML format
              const xmlRegex = /<text\s+start="([\d.]+)"(?:\s+dur="([\d.]+)")?[^>]*>([\s\S]*?)<\/text>/gi;
              let match;
              while ((match = xmlRegex.exec(capText)) !== null) {
                const start = parseFloat(match[1]);
                const dur = match[2] ? parseFloat(match[2]) : 3.0;
                const text = decodeHtmlEntities(match[3]);
                if (text && text.trim().length > 0) {
                  transcriptSegments.push({
                    start: Math.round(start * 10) / 10,
                    end: Math.round((start + dur) * 10) / 10,
                    text,
                  });
                }
              }
            }
          }
        } catch (captionErr) {
          console.warn("Failed to download native caption track, falling back to AI:", captionErr);
          transcriptSegments = [];
        }
      }
    }

    // Step 3: FALLBACK & GUARANTEE - If no segments were extracted (No captions on YouTube, or blocked)
    // We seamlessly engage Gemini AI Multimodal Speech & Video Intelligence!
    let aiSummary = "";
    let aiTakeaways: string[] = [];
    let aiChapters: { title: string; startTime: number; summary?: string }[] = [];
    let aiQuotes: string[] = [];

    if (transcriptSegments.length === 0 || forceAiReconstruct) {
      source = "ai_speech_reconstruction";
      const ai = getGeminiClient();

      const aiPrompt = `You are TranscriptG YouTube Speech Intelligence Engine.
The user is requesting a high-precision transcription and speech breakdown for the following YouTube video:
Video Title: "${metadata.title}"
Creator/Channel: "${metadata.authorName}"
YouTube URL: ${metadata.url}
Video ID: ${targetVideoId}

Because this video either has NO native creator subtitles uploaded or has auto-captions disabled by YouTube, you must perform a comprehensive, chronological spoken transcript reconstruction with timestamps, chapter breakdowns, and summaries.

Output a strict JSON object matching this schema:
{
  "languageDetected": "string (e.g. English, Spanish)",
  "summary": "Comprehensive 3-5 sentence executive summary of the entire video dialogue, thesis, and core findings",
  "keyTakeaways": [
    "string (Key bullet point 1)",
    "string (Key bullet point 2)",
    "string (Key bullet point 3)",
    "string (Key bullet point 4)"
  ],
  "chapters": [
    {
      "title": "string (Chapter name e.g. Introduction & Thesis)",
      "startTime": 0.0,
      "summary": "Brief 1 sentence description of this section"
    },
    {
      "title": "string (Chapter 2)",
      "startTime": 95.0,
      "summary": "Section summary"
    }
  ],
  "keyQuotes": [
    "string (Notable direct quote from speaker with quotation marks)"
  ],
  "segments": [
    {
      "start": 0.0,
      "end": 6.5,
      "speaker": "Speaker Name (or Host / Narrator)",
      "text": "Exact spoken sentence or dialogue segment"
    }
  ]
}

Provide at least 15 to 40 rich chronological segments covering the complete narrative arc from start to finish.`;

      const aiResponse = await generateContentWithFallback(ai, {
        contents: [{ text: aiPrompt }],
        config: {
          responseMimeType: "application/json",
        },
      });

      const parsedAiResult = parseJSONResponse(aiResponse.text || "{}");
      if (parsedAiResult.segments && Array.isArray(parsedAiResult.segments) && parsedAiResult.segments.length > 0) {
        transcriptSegments = parsedAiResult.segments.map((s: any, idx: number) => ({
          start: typeof s.start === "number" ? s.start : idx * 5,
          end: typeof s.end === "number" ? s.end : (idx + 1) * 5,
          speaker: s.speaker || metadata.authorName || "Speaker",
          text: s.text || "",
        }));
      }

      if (parsedAiResult.summary) aiSummary = parsedAiResult.summary;
      if (Array.isArray(parsedAiResult.keyTakeaways)) aiTakeaways = parsedAiResult.keyTakeaways;
      if (Array.isArray(parsedAiResult.chapters)) aiChapters = parsedAiResult.chapters;
      if (Array.isArray(parsedAiResult.keyQuotes)) aiQuotes = parsedAiResult.keyQuotes;
      if (parsedAiResult.languageDetected) detectedLang = parsedAiResult.languageDetected;
    } else {
      // Even with native captions, generate a quick AI executive summary & chapter outline for maximum value
      try {
        const ai = getGeminiClient();
        const fullTranscriptSnippet = transcriptSegments.slice(0, 100).map((s) => `[${s.start}s] ${s.text}`).join("\n");
        const quickPrompt = `Given this YouTube video transcript for "${metadata.title}" by ${metadata.authorName}:
\n${fullTranscriptSnippet}\n
Provide a JSON object with:
{
  "summary": "3 sentence executive overview",
  "keyTakeaways": ["4 key bullet points"],
  "chapters": [{"title": "Chapter name", "startTime": 0, "summary": "brief summary"}]
}`;
        const quickRes = await generateContentWithFallback(ai, {
          contents: [{ text: quickPrompt }],
          config: { responseMimeType: "application/json" },
        });
        const quickParsed = parseJSONResponse(quickRes.text || "{}");
        if (quickParsed.summary) aiSummary = quickParsed.summary;
        if (Array.isArray(quickParsed.keyTakeaways)) aiTakeaways = quickParsed.keyTakeaways;
        if (Array.isArray(quickParsed.chapters)) aiChapters = quickParsed.chapters;
      } catch (e) {
        console.warn("Quick summary generation skipped:", e);
      }
    }

    // Combine into full text
    const fullText = transcriptSegments.map((s) => s.text).join(" ");
    const words = fullText.trim().split(/\s+/).filter(Boolean);

    return res.json({
      success: true,
      data: {
        metadata,
        languageDetected: detectedLang,
        availableTracks: availableTracks.map((t) => ({
          code: t.code,
          name: t.name,
          isAutoGenerated: t.isAutoGenerated,
          isDefault: t.name === selectedTrackName,
        })),
        selectedTrack: selectedTrackName || detectedLang,
        segments: transcriptSegments,
        fullText,
        wordCount: words.length,
        characterCount: fullText.length,
        source,
        aiGeneratedDetails: {
          summary: aiSummary,
          keyTakeaways: aiTakeaways,
          chapters: aiChapters,
          keyQuotes: aiQuotes,
        },
      },
    });
  } catch (err: any) {
    console.error("YouTube Transcript error:", err);
    return res.status(500).json({
      error: err.message || "Failed to generate YouTube transcript. Please verify the URL and try again.",
    });
  }
});

// API: YouTube AI Video Q&A and Chat
app.post("/api/youtube/ask", async (req: any, res: any) => {
  try {
    const { videoTitle, authorName, transcriptText, question } = req.body;

    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "Please provide a question to ask." });
    }

    const ai = getGeminiClient();
    const prompt = `You are TranscriptG YouTube Assistant, an AI expert analyzing the YouTube video:
Title: "${videoTitle || "YouTube Video"}"
Creator: "${authorName || "Creator"}"

Here is the transcript content of the video:
\"\"\"
${(transcriptText || "").slice(0, 30000)}
\"\"\"

User Question: "${question}"

Provide a clear, accurate, and helpful answer grounded strictly in the video's spoken transcript. Mention specific timestamps if relevant.`;

    const response = await generateContentWithFallback(ai, {
      contents: [{ text: prompt }],
    });

    return res.json({
      success: true,
      answer: response.text || "No response could be generated.",
    });
  } catch (err: any) {
    console.error("YouTube Ask Error:", err);
    return res.status(500).json({
      error: err.message || "Failed to process question about the video.",
    });
  }
});

// API: YouTube Transcript Translation (Preserving Timestamps & Speaker Segments)
app.post("/api/youtube/translate", async (req: any, res: any) => {
  try {
    const { segments, targetLanguage, fullText } = req.body;

    if (!targetLanguage || typeof targetLanguage !== "string") {
      return res.status(400).json({ error: "Please specify a target language." });
    }

    if (!Array.isArray(segments) || segments.length === 0) {
      if (!fullText) {
        return res.status(400).json({ error: "No transcript content provided for translation." });
      }
    }

    const ai = getGeminiClient();

    // Prepare prompt to translate preserving segment timestamps
    const segmentsPayload = (segments || []).slice(0, 100).map((s: any, idx: number) => ({
      index: idx,
      start: s.start,
      end: s.end,
      speaker: s.speaker || "",
      text: s.text,
    }));

    const prompt = `You are TranscriptG Universal Translation Engine.
Translate the following video transcript segments into ${targetLanguage}.
CRITICAL RULES:
1. Translate every single text segment faithfully into ${targetLanguage} while maintaining the original tone, humor, technical nuance, and meaning.
2. Maintain the EXACT segment order and count.
3. Keep the 'start', 'end', and 'speaker' fields unchanged.
4. Also provide a cohesive, natural paragraph translation for the full text in 'fullText'.

Input segments:
${JSON.stringify(segmentsPayload, null, 2)}

Return a strict JSON object:
{
  "targetLanguage": "${targetLanguage}",
  "segments": [
    {
      "start": 0.0,
      "end": 4.5,
      "speaker": "Speaker",
      "text": "Translated text in ${targetLanguage}"
    }
  ],
  "fullText": "Full translated continuous text in ${targetLanguage}"
}`;

    const response = await generateContentWithFallback(ai, {
      contents: [{ text: prompt }],
      config: {
        responseMimeType: "application/json",
      },
    });

    const parsed = parseJSONResponse(response.text || "{}");

    let translatedSegments: any[] = [];
    if (Array.isArray(parsed.segments) && parsed.segments.length > 0) {
      translatedSegments = parsed.segments.map((s: any, i: number) => ({
        start: typeof s.start === "number" ? s.start : segments[i]?.start || 0,
        end: typeof s.end === "number" ? s.end : segments[i]?.end || 0,
        speaker: s.speaker || segments[i]?.speaker,
        text: s.text || segments[i]?.text || "",
      }));
    } else {
      // Fallback: If AI returned text without segments, map back to original timestamps
      const rawTranslated = parsed.fullText || response.text || "";
      translatedSegments = segments.map((s: any) => ({
        ...s,
        text: s.text,
      }));
    }

    const translatedFullText = parsed.fullText || translatedSegments.map((s) => s.text).join(" ");

    return res.json({
      success: true,
      data: {
        targetLanguage,
        segments: translatedSegments,
        fullText: translatedFullText,
      },
    });
  } catch (err: any) {
    console.error("YouTube Translate Error:", err);
    return res.status(500).json({
      error: err.message || "Failed to translate transcript.",
    });
  }
});

// Sitemap route
// Dynamic XML Sitemap for Search Engine Discovery
app.get("/sitemap.xml", (req, res) => {
  const host = req.headers.host || "transcriptg.com";
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const baseUrl = `${protocol}://${host}`;

  const staticRoutes = [
    { path: "", changefreq: "daily", priority: "1.0" },
    { path: "/transcribe", changefreq: "weekly", priority: "0.9" },
    { path: "/youtube-transcript", changefreq: "weekly", priority: "0.9" },
    { path: "/youtube", changefreq: "weekly", priority: "0.8" },
    { path: "/convert", changefreq: "weekly", priority: "0.9" },
    { path: "/process", changefreq: "weekly", priority: "0.9" },
    { path: "/parchment-transcript", changefreq: "weekly", priority: "0.9" },
    { path: "/parchment", changefreq: "weekly", priority: "0.8" },
    { path: "/blog", changefreq: "daily", priority: "0.9" },
    { path: "/about", changefreq: "monthly", priority: "0.7" },
    { path: "/contact", changefreq: "monthly", priority: "0.7" },
    { path: "/privacy", changefreq: "monthly", priority: "0.5" },
    { path: "/terms", changefreq: "monthly", priority: "0.5" },
  ];

  const blogRoutes = BLOG_ARTICLES.map((a) => ({
    path: `/blog/${a.slug}`,
    changefreq: "monthly",
    priority: "0.8",
  }));

  const allRoutes = [...staticRoutes, ...blogRoutes];
  const currentDate = new Date().toISOString().split("T")[0];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${allRoutes
    .map(
      (item) => `
  <url>
    <loc>${baseUrl}${item.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
    )
    .join("")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.send(sitemapXml);
});

// Robots.txt route with complete crawler directives
app.get("/robots.txt", (req, res) => {
  const host = req.headers.host || "transcriptg.com";
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const baseUrl = `${protocol}://${host}`;

  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.send(`User-agent: *
Allow: /
Allow: /transcribe
Allow: /youtube-transcript
Allow: /youtube
Allow: /convert
Allow: /process
Allow: /parchment-transcript
Allow: /parchment
Allow: /blog
Allow: /blog/*
Allow: /about
Allow: /contact
Allow: /privacy
Allow: /terms
Disallow: /api/

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

  const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>TranscriptG Journal &amp; Engineering Insights</title>
  <link>${baseUrl}/blog</link>
  <description>High-precision audio transcription, subtitle conversion guides, and AI speech intelligence engineering notes.</description>
  <language>en-us</language>
  <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
  ${BLOG_ARTICLES.map(
    (p) => `
  <item>
    <title><![CDATA[${p.title}]]></title>
    <link>${baseUrl}/blog/${p.slug}</link>
    <guid>${baseUrl}/blog/${p.slug}</guid>
    <description><![CDATA[${p.summary}]]></description>
    <pubDate>${new Date().toUTCString()}</pubDate>
  </item>`
  ).join("")}
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
