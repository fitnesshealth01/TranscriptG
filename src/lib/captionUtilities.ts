/**
 * Caption & Speech Utility Algorithms
 * Pure client-side calculations for subtitle validation, speech pacing, and audio telemetry.
 */

export interface SubtitleCue {
  index: number;
  rawTimecode: string;
  startTimeSec: number;
  endTimeSec: number;
  durationSec: number;
  text: string;
  charCount: number;
  cps: number; // Characters per second
  lines: string[];
  issues: string[];
}

export interface ValidationReport {
  format: "SRT" | "VTT" | "UNKNOWN";
  totalCues: number;
  totalDurationSec: number;
  cues: SubtitleCue[];
  errorsCount: number;
  warningsCount: number;
  highCpsCuesCount: number;
  overlapCuesCount: number;
  longLinesCount: number;
  averageCps: number;
}

/**
 * Convert time string "HH:MM:SS,mmm" or "HH:MM:SS.mmm" or "MM:SS.mmm" to seconds
 */
export function timecodeToSeconds(timeStr: string): number {
  const clean = timeStr.trim().replace(",", ".");
  const parts = clean.split(":");
  if (parts.length === 3) {
    const hours = parseFloat(parts[0]) || 0;
    const minutes = parseFloat(parts[1]) || 0;
    const seconds = parseFloat(parts[2]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  }
  if (parts.length === 2) {
    const minutes = parseFloat(parts[0]) || 0;
    const seconds = parseFloat(parts[1]) || 0;
    return minutes * 60 + seconds;
  }
  return 0;
}

/**
 * Convert seconds to standard SRT timecode (00:00:00,000)
 */
export function secondsToSrtTimecode(sec: number): string {
  const safeSec = Math.max(0, sec);
  const hours = Math.floor(safeSec / 3600);
  const minutes = Math.floor((safeSec % 3600) / 60);
  const seconds = Math.floor(safeSec % 60);
  const milliseconds = Math.floor((safeSec % 1) * 1000);

  const pad = (num: number, size: number) => String(num).padStart(size, "0");
  return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)},${pad(milliseconds, 3)}`;
}

/**
 * Validate subtitle text (SRT or VTT) against broadcast and WCAG standards
 */
export function validateSubtitles(rawText: string): ValidationReport {
  const text = rawText.trim();
  const isVtt = text.startsWith("WEBVTT");
  const format: "SRT" | "VTT" | "UNKNOWN" = isVtt ? "VTT" : text.includes("-->") ? "SRT" : "UNKNOWN";

  const lines = text.split(/\r?\n/);
  const cues: SubtitleCue[] = [];
  let currentCueIndex = 1;
  let currentRawTimecode = "";
  let currentTextLines: string[] = [];
  let previousEndSec = 0;

  let errorsCount = 0;
  let warningsCount = 0;
  let highCpsCuesCount = 0;
  let overlapCuesCount = 0;
  let longLinesCount = 0;

  const pushCue = () => {
    if (!currentRawTimecode && currentTextLines.length === 0) return;

    const timeParts = currentRawTimecode.split("-->");
    const issues: string[] = [];

    if (timeParts.length !== 2) {
      issues.push("Invalid timecode delimiter. Must contain '-->'");
      errorsCount++;
    }

    const startSec = timeParts[0] ? timecodeToSeconds(timeParts[0]) : 0;
    const endSec = timeParts[1] ? timecodeToSeconds(timeParts[1]) : 0;
    const duration = Math.max(0.001, endSec - startSec);

    if (endSec <= startSec) {
      issues.push(`End time (${endSec.toFixed(2)}s) must be after start time (${startSec.toFixed(2)}s).`);
      errorsCount++;
    }

    // Check overlap with previous cue
    if (cues.length > 0 && startSec < previousEndSec - 0.05) {
      const diff = (previousEndSec - startSec).toFixed(3);
      issues.push(`Overlaps previous cue by ${diff}s (Start: ${startSec.toFixed(2)}s, Prev End: ${previousEndSec.toFixed(2)}s).`);
      overlapCuesCount++;
      warningsCount++;
    }

    const fullCueText = currentTextLines.join(" ").trim();
    const cleanChars = fullCueText.replace(/<[^>]*>/g, "").length;
    const cps = duration > 0 ? cleanChars / duration : 0;

    // WCAG / BBC Subtitle Standards: Recommended max 20-25 CPS
    if (cps > 25) {
      issues.push(`High reading speed: ${cps.toFixed(1)} CPS (Recommended max: 20-25 CPS).`);
      highCpsCuesCount++;
      warningsCount++;
    }

    // Check line length (Broadcast standard: max 37-42 characters per line)
    currentTextLines.forEach((l, idx) => {
      const lineLen = l.trim().length;
      if (lineLen > 42) {
        issues.push(`Line ${idx + 1} exceeds broadcast limit (${lineLen} chars > 42 chars).`);
        longLinesCount++;
        warningsCount++;
      }
    });

    if (currentTextLines.length > 2) {
      issues.push(`Contains ${currentTextLines.length} lines. Standard practice recommends max 2 lines per subtitle cue.`);
      warningsCount++;
    }

    cues.push({
      index: currentCueIndex,
      rawTimecode: currentRawTimecode,
      startTimeSec: startSec,
      endTimeSec: endSec,
      durationSec: duration,
      text: fullCueText,
      charCount: cleanChars,
      cps,
      lines: currentTextLines,
      issues,
    });

    previousEndSec = endSec;
    currentCueIndex++;
    currentRawTimecode = "";
    currentTextLines = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === "" || (isVtt && line.startsWith("NOTE"))) {
      if (currentRawTimecode) {
        pushCue();
      }
      continue;
    }

    // Check if line is a timecode arrow
    if (line.includes("-->")) {
      currentRawTimecode = line;
      continue;
    }

    // Check if line is a numeric cue counter
    if (/^\d+$/.test(line) && !currentRawTimecode) {
      continue;
    }

    if (line.startsWith("WEBVTT")) {
      continue;
    }

    // Otherwise, text payload
    if (currentRawTimecode) {
      currentTextLines.push(line);
    }
  }

  // Push final cue if pending
  if (currentRawTimecode || currentTextLines.length > 0) {
    pushCue();
  }

  const totalDurationSec = cues.length > 0 ? cues[cues.length - 1].endTimeSec : 0;
  const averageCps =
    cues.length > 0 ? cues.reduce((acc, c) => acc + c.cps, 0) / cues.length : 0;

  return {
    format,
    totalCues: cues.length,
    totalDurationSec,
    cues,
    errorsCount,
    warningsCount,
    highCpsCuesCount,
    overlapCuesCount,
    longLinesCount,
    averageCps,
  };
}

/**
 * Auto-format and clean raw subtitles:
 * - Fixes timecodes to standard 00:00:00,000
 * - Resolves overlapping cues by capping start times
 * - Wraps lines at max 40 characters
 * - Renumbers cues sequentially
 */
export function autoFixSubtitles(rawText: string): string {
  const report = validateSubtitles(rawText);
  if (report.cues.length === 0) return rawText;

  const fixedBlocks: string[] = [];
  let lastEnd = 0;

  report.cues.forEach((cue, idx) => {
    let start = cue.startTimeSec;
    let end = cue.endTimeSec;

    // Fix overlap
    if (start < lastEnd) {
      start = lastEnd + 0.05;
      if (end <= start) {
        end = start + Math.max(1.2, cue.charCount * 0.05);
      }
    }

    // Wrap lines cleanly at ~40 chars
    const words = cue.text.split(/\s+/);
    const lines: string[] = [];
    let currentLine = "";

    words.forEach((w) => {
      if ((currentLine + " " + w).trim().length <= 40) {
        currentLine = (currentLine + " " + w).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = w;
      }
    });
    if (currentLine) lines.push(currentLine);

    // Keep max 2 lines per cue
    const finalLines = lines.slice(0, 2);

    const srtTime = `${secondsToSrtTimecode(start)} --> ${secondsToSrtTimecode(end)}`;
    fixedBlocks.push(`${idx + 1}\n${srtTime}\n${finalLines.join("\n")}`);

    lastEnd = end;
  });

  return fixedBlocks.join("\n\n") + "\n";
}

/**
 * Speech Rate & Word Count Metrics
 */
export interface SpeechRateMetrics {
  wordCount: number;
  characterCount: number;
  characterNoSpaces: number;
  sentenceCount: number;
  syllableCount: number;
  readingEaseScore: number;
  readingGradeLevel: string;
  durationMinutes: {
    slowSpeech: number; // 100 WPM (lectures / accessibility)
    conversationalSpeech: number; // 145 WPM (standard discussion)
    rapidSpeech: number; // 180 WPM (fast podcast / auctioneer)
    silentReading: number; // 240 WPM (average silent reading speed)
  };
}

export function calculateSpeechMetrics(text: string): SpeechRateMetrics {
  const clean = text.trim();
  if (!clean) {
    return {
      wordCount: 0,
      characterCount: 0,
      characterNoSpaces: 0,
      sentenceCount: 0,
      syllableCount: 0,
      readingEaseScore: 100,
      readingGradeLevel: "Elementary",
      durationMinutes: {
        slowSpeech: 0,
        conversationalSpeech: 0,
        rapidSpeech: 0,
        silentReading: 0,
      },
    };
  }

  const words = clean.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const characterCount = clean.length;
  const characterNoSpaces = clean.replace(/\s+/g, "").length;

  const sentences = clean.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const sentenceCount = Math.max(1, sentences.length);

  // Approximate syllable count
  let syllableCount = 0;
  words.forEach((w) => {
    const word = w.toLowerCase().replace(/[^a-z]/g, "");
    if (word.length <= 3) {
      syllableCount += 1;
      return;
    }
    const matches = word.match(/[aeiouy]{1,2}/g);
    let count = matches ? matches.length : 1;
    if (word.endsWith("e") && !word.endsWith("le")) {
      count = Math.max(1, count - 1);
    }
    syllableCount += count;
  });

  // Flesch Reading Ease Formula: 206.835 - 1.015*(words/sentences) - 84.6*(syllables/words)
  const wordsPerSentence = wordCount / sentenceCount;
  const syllablesPerWord = syllableCount / Math.max(1, wordCount);
  const rawEase = 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;
  const readingEaseScore = Math.min(100, Math.max(0, Math.round(rawEase * 10) / 10));

  let readingGradeLevel = "College Level (Specialized)";
  if (readingEaseScore >= 90) readingGradeLevel = "5th Grade (Very Easy)";
  else if (readingEaseScore >= 80) readingGradeLevel = "6th Grade (Easy)";
  else if (readingEaseScore >= 70) readingGradeLevel = "7th Grade (Fairly Easy)";
  else if (readingEaseScore >= 60) readingGradeLevel = "8th-9th Grade (Standard)";
  else if (readingEaseScore >= 50) readingGradeLevel = "10th-12th Grade (Fairly Difficult)";
  else if (readingEaseScore >= 30) readingGradeLevel = "College (Difficult)";

  return {
    wordCount,
    characterCount,
    characterNoSpaces,
    sentenceCount,
    syllableCount,
    readingEaseScore,
    readingGradeLevel,
    durationMinutes: {
      slowSpeech: wordCount / 100,
      conversationalSpeech: wordCount / 145,
      rapidSpeech: wordCount / 180,
      silentReading: wordCount / 240,
    },
  };
}

/**
 * Audio Bitrate, File Size & Memory Telemetry
 */
export interface AudioTelemetryParams {
  durationSeconds: number;
  sampleRateHz: number; // e.g. 16000, 44100, 48000, 96000
  bitDepth: 16 | 24 | 32;
  channels: 1 | 2 | 6; // Mono, Stereo, 5.1
  codec: "WAV" | "FLAC" | "MP3_128" | "MP3_192" | "MP3_320" | "AAC_128" | "AAC_256" | "OPUS_64" | "OPUS_96";
}

export interface AudioTelemetryResult {
  uncompressedSizeBytes: number;
  uncompressedSizeMB: number;
  compressedSizeBytes: number;
  compressedSizeMB: number;
  effectiveBitrateKbps: number;
  compressionRatio: number;
  monthlyBandwidthPer1000PlaysGB: number;
  sttRecommendation: string;
}

export function calculateAudioTelemetry(params: AudioTelemetryParams): AudioTelemetryResult {
  const { durationSeconds, sampleRateHz, bitDepth, channels, codec } = params;

  // Uncompressed PCM byte count: SampleRate * (BitDepth / 8) * Channels * Seconds
  const bytesPerSecUncompressed = sampleRateHz * (bitDepth / 8) * channels;
  const uncompressedSizeBytes = bytesPerSecUncompressed * durationSeconds;

  let effectiveBitrateKbps = 0;
  let compressedSizeBytes = 0;

  switch (codec) {
    case "WAV":
      effectiveBitrateKbps = (bytesPerSecUncompressed * 8) / 1000;
      compressedSizeBytes = uncompressedSizeBytes + 44; // WAV header
      break;
    case "FLAC":
      // Lossless compression typically yields ~55-60% of original PCM
      effectiveBitrateKbps = ((bytesPerSecUncompressed * 8) / 1000) * 0.58;
      compressedSizeBytes = uncompressedSizeBytes * 0.58;
      break;
    case "MP3_128":
      effectiveBitrateKbps = 128;
      compressedSizeBytes = (128 * 1000 * durationSeconds) / 8;
      break;
    case "MP3_192":
      effectiveBitrateKbps = 192;
      compressedSizeBytes = (192 * 1000 * durationSeconds) / 8;
      break;
    case "MP3_320":
      effectiveBitrateKbps = 320;
      compressedSizeBytes = (320 * 1000 * durationSeconds) / 8;
      break;
    case "AAC_128":
      effectiveBitrateKbps = 128;
      compressedSizeBytes = (128 * 1000 * durationSeconds) / 8;
      break;
    case "AAC_256":
      effectiveBitrateKbps = 256;
      compressedSizeBytes = (256 * 1000 * durationSeconds) / 8;
      break;
    case "OPUS_64":
      effectiveBitrateKbps = 64;
      compressedSizeBytes = (64 * 1000 * durationSeconds) / 8;
      break;
    case "OPUS_96":
      effectiveBitrateKbps = 96;
      compressedSizeBytes = (96 * 1000 * durationSeconds) / 8;
      break;
  }

  const uncompressedSizeMB = Math.round((uncompressedSizeBytes / (1024 * 1024)) * 100) / 100;
  const compressedSizeMB = Math.round((compressedSizeBytes / (1024 * 1024)) * 100) / 100;
  const compressionRatio =
    uncompressedSizeBytes > 0 ? Math.round((1 - compressedSizeBytes / uncompressedSizeBytes) * 100) : 0;

  // Monthly bandwidth for 1,000 listener downloads
  const monthlyBandwidthPer1000PlaysGB =
    Math.round(((compressedSizeBytes * 1000) / (1024 * 1024 * 1024)) * 100) / 100;

  let sttRecommendation = "Optimal for Neural STT: 16kHz Mono FLAC or WAV preserves acoustic phonetics with minimal upload payload.";
  if (channels > 1) {
    sttRecommendation = "Notice: Multi-channel audio should be downmixed to Mono for speech recognition to eliminate stereo phase cancellation.";
  } else if (sampleRateHz > 48000) {
    sttRecommendation = "Note: Frequencies above 24kHz do not contain human speech formants. Downsampling to 16kHz-48kHz reduces memory load without accuracy loss.";
  } else if (codec === "OPUS_64" || codec === "OPUS_96") {
    sttRecommendation = "Excellent Choice: Opus voice codec delivers crystal-clear speech recognition fidelity at ultra-low bandwidth.";
  }

  return {
    uncompressedSizeBytes,
    uncompressedSizeMB,
    compressedSizeBytes,
    compressedSizeMB,
    effectiveBitrateKbps: Math.round(effectiveBitrateKbps),
    compressionRatio,
    monthlyBandwidthPer1000PlaysGB,
    sttRecommendation,
  };
}
