import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Gauge,
  Sparkles,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface WordTimestamp {
  word: string;
  start: number;
  end: number;
}

interface SpeakerSegment {
  speaker: string;
  speakerRole: string;
  avatarColor: string;
  startTime: number;
  endTime: number;
  words: WordTimestamp[];
}

interface DemoScenario {
  id: string;
  title: string;
  badge: string;
  description: string;
  duration: number;
  averageWpm: number;
  audioFreq: number; // tone frequency for web audio synth
  segments: SpeakerSegment[];
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "interview",
    title: "Podcast Interview",
    badge: "Illustrative Example",
    description: "Two-speaker interview showing synchronized word timecodes and speaker attribution.",
    duration: 17.5,
    averageWpm: 145,
    audioFreq: 340,
    segments: [
      {
        speaker: "Host (Alex)",
        speakerRole: "Interviewer",
        avatarColor: "bg-blue-600 text-white",
        startTime: 0.0,
        endTime: 5.2,
        words: [
          { word: "Welcome", start: 0.1, end: 0.5 },
          { word: "to", start: 0.6, end: 0.7 },
          { word: "the", start: 0.8, end: 1.0 },
          { word: "show.", start: 1.1, end: 1.5 },
          { word: "Today", start: 1.8, end: 2.2 },
          { word: "we", start: 2.3, end: 2.5 },
          { word: "discuss", start: 2.6, end: 3.1 },
          { word: "audio", start: 3.2, end: 3.6 },
          { word: "accessibility", start: 3.7, end: 4.5 },
          { word: "workflows.", start: 4.6, end: 5.2 },
        ],
      },
      {
        speaker: "Guest (Sarah)",
        speakerRole: "Video Creator",
        avatarColor: "bg-[#ff4d00] text-white",
        startTime: 5.8,
        endTime: 12.0,
        words: [
          { word: "Thanks", start: 5.8, end: 6.2 },
          { word: "for", start: 6.3, end: 6.5 },
          { word: "having", start: 6.6, end: 7.0 },
          { word: "me.", start: 7.1, end: 7.5 },
          { word: "Adding", start: 7.8, end: 8.2 },
          { word: "accurate", start: 8.3, end: 8.8 },
          { word: "subtitles", start: 8.9, end: 9.5 },
          { word: "helps", start: 9.6, end: 10.0 },
          { word: "reach", start: 10.1, end: 10.5 },
          { word: "international", start: 10.6, end: 11.3 },
          { word: "audiences.", start: 11.4, end: 12.0 },
        ],
      },
      {
        speaker: "Host (Alex)",
        speakerRole: "Interviewer",
        avatarColor: "bg-blue-600 text-white",
        startTime: 12.6,
        endTime: 17.5,
        words: [
          { word: "It", start: 12.6, end: 12.8 },
          { word: "also", start: 12.9, end: 13.2 },
          { word: "makes", start: 13.3, end: 13.6 },
          { word: "recordings", start: 13.7, end: 14.3 },
          { word: "easy", start: 14.4, end: 14.7 },
          { word: "to", start: 14.8, end: 15.0 },
          { word: "search", start: 15.1, end: 15.6 },
          { word: "and", start: 15.7, end: 16.0 },
          { word: "summarize.", start: 16.1, end: 17.5 },
        ],
      },
    ],
  },
  {
    id: "tech",
    title: "Team Standup",
    badge: "Illustrative Example",
    description: "Meeting dialogue demonstrating timestamped note taking and discussion tracking.",
    duration: 15.0,
    averageWpm: 150,
    audioFreq: 440,
    segments: [
      {
        speaker: "Team Lead",
        speakerRole: "Meeting Lead",
        avatarColor: "bg-purple-600 text-white",
        startTime: 0.0,
        endTime: 7.2,
        words: [
          { word: "Let's", start: 0.1, end: 0.4 },
          { word: "review", start: 0.5, end: 0.9 },
          { word: "progress", start: 1.0, end: 1.5 },
          { word: "on", start: 1.6, end: 1.8 },
          { word: "the", start: 1.9, end: 2.1 },
          { word: "subtitle", start: 2.2, end: 2.7 },
          { word: "converter", start: 2.8, end: 3.4 },
          { word: "and", start: 3.5, end: 3.8 },
          { word: "export", start: 3.9, end: 4.4 },
          { word: "features.", start: 4.5, end: 5.2 },
          { word: "Any", start: 5.5, end: 5.8 },
          { word: "blockers?", start: 5.9, end: 7.2 },
        ],
      },
      {
        speaker: "Developer",
        speakerRole: "Frontend Lead",
        avatarColor: "bg-emerald-600 text-white",
        startTime: 7.8,
        endTime: 15.0,
        words: [
          { word: "The", start: 7.8, end: 8.0 },
          { word: "WebVTT", start: 8.1, end: 8.7 },
          { word: "and", start: 8.8, end: 9.0 },
          { word: "SRT", start: 9.1, end: 9.6 },
          { word: "parsers", start: 9.7, end: 10.2 },
          { word: "are", start: 10.3, end: 10.5 },
          { word: "tested", start: 10.6, end: 11.1 },
          { word: "and", start: 11.2, end: 11.4 },
          { word: "timing", start: 11.5, end: 12.0 },
          { word: "preservation", start: 12.1, end: 13.0 },
          { word: "is", start: 13.1, end: 13.3 },
          { word: "verified.", start: 13.4, end: 15.0 },
        ],
      },
    ],
  },
  {
    id: "lecture",
    title: "Class Lecture",
    badge: "Illustrative Example",
    description: "Lecture excerpt demonstrating educational video transcription with clear timestamps.",
    duration: 16.0,
    averageWpm: 138,
    audioFreq: 520,
    segments: [
      {
        speaker: "Instructor",
        speakerRole: "Presenter",
        avatarColor: "bg-teal-600 text-white",
        startTime: 0.0,
        endTime: 7.5,
        words: [
          { word: "Welcome", start: 0.1, end: 0.6 },
          { word: "to", start: 0.7, end: 0.9 },
          { word: "class.", start: 1.0, end: 1.5 },
          { word: "Today", start: 1.8, end: 2.2 },
          { word: "we", start: 2.3, end: 2.5 },
          { word: "explore", start: 2.6, end: 3.1 },
          { word: "how", start: 3.2, end: 3.5 },
          { word: "subtitle", start: 3.6, end: 4.2 },
          { word: "files", start: 4.3, end: 4.8 },
          { word: "store", start: 4.9, end: 5.3 },
          { word: "cue", start: 5.4, end: 5.7 },
          { word: "timecodes.", start: 5.8, end: 7.5 },
        ],
      },
      {
        speaker: "Student",
        speakerRole: "Attendee",
        avatarColor: "bg-amber-600 text-white",
        startTime: 8.0,
        endTime: 16.0,
        words: [
          { word: "Does", start: 8.0, end: 8.3 },
          { word: "the", start: 8.4, end: 8.6 },
          { word: "SRT", start: 8.7, end: 9.1 },
          { word: "format", start: 9.2, end: 9.6 },
          { word: "support", start: 9.7, end: 10.2 },
          { word: "styling", start: 10.3, end: 10.8 },
          { word: "tags", start: 10.9, end: 11.3 },
          { word: "like", start: 11.4, end: 11.7 },
          { word: "WebVTT", start: 11.8, end: 12.4 },
          { word: "does", start: 12.5, end: 12.8 },
          { word: "natively?", start: 12.9, end: 14.5 },
        ],
      },
    ],
  },
];

export const InteractiveDemoPlayer: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("interview");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const scenario = DEMO_SCENARIOS.find((s) => s.id === activeScenarioId) || DEMO_SCENARIOS[0];
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastTickTimeRef = useRef<number>(0);

  // Initialize or resume Web Audio synthesizer
  const setupAudioSynth = () => {
    if (typeof window === "undefined") return;
    try {
      if (!audioContextRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContextClass();
      }
      if (audioContextRef.current.state === "suspended") {
        audioContextRef.current.resume();
      }
    } catch (e) {
      console.warn("Web Audio not supported or blocked:", e);
    }
  };

  const startTone = () => {
    if (isMuted || !audioContextRef.current) return;
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      const ctx = audioContextRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(scenario.audioFreq, ctx.currentTime);
      gain.gain.setValueAtTime(0.015, ctx.currentTime);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();

      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch (err) {
      // Audio autoplay policy fallback
    }
  };

  const stopTone = () => {
    try {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
    } catch (err) {
      // ignore
    }
  };

  // Toggle playback
  const handleTogglePlay = () => {
    setupAudioSynth();
    if (isPlaying) {
      setIsPlaying(false);
      stopTone();
    } else {
      if (currentTime >= scenario.duration) {
        setCurrentTime(0);
      }
      setIsPlaying(true);
      startTone();
    }
  };

  // Switch scenario
  const handleSelectScenario = (id: string) => {
    stopTone();
    setIsPlaying(false);
    setCurrentTime(0);
    setActiveScenarioId(id);
  };

  // Seek to explicit second
  const handleSeek = (newTime: number) => {
    setCurrentTime(Math.min(scenario.duration, Math.max(0, newTime)));
  };

  // Animation frame clock for smooth high-frame-rate word highlighting
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      stopTone();
      return;
    }

    lastTickTimeRef.current = performance.now();

    const loop = (now: number) => {
      const deltaSec = ((now - lastTickTimeRef.current) / 1000) * playbackSpeed;
      lastTickTimeRef.current = now;

      setCurrentTime((prev) => {
        const nextTime = prev + deltaSec;
        if (nextTime >= scenario.duration) {
          setIsPlaying(false);
          stopTone();
          return scenario.duration;
        }
        return nextTime;
      });

      animationFrameRef.current = requestAnimationFrame(loop);
    };

    animationFrameRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, playbackSpeed, scenario.duration]);

  // Clean up Web Audio on unmount
  useEffect(() => {
    return () => {
      stopTone();
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    const ms = Math.floor((seconds % 1) * 10);
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}.${ms}`;
  };

  return (
    <div className="w-full rounded-3xl bg-[#0f1218] text-white border border-white/10 shadow-2xl overflow-hidden">
      {/* Top Console Bar */}
      <div className="p-4 sm:p-6 border-b border-white/10 bg-[#161a22] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d00] animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest uppercase text-[#ff4d00]">
              Interactive Sample Transcript
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white mt-1">
            Synchronized Transcript &amp; Audio Demo
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Test how TranscriptG displays timestamped words without uploading a file.
          </p>
        </div>

        {/* Scenario Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-black/40 rounded-xl border border-white/10">
          {DEMO_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                sc.id === activeScenarioId
                  ? "bg-[#ff4d00] text-white shadow-md"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {sc.title}
            </button>
          ))}
        </div>
      </div>

      {/* Telemetry Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-black/30 border-b border-white/5 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
          <span className="text-neutral-400 text-[10px] uppercase block">Sample Audio</span>
          <span className="font-bold text-white text-xs truncate block mt-0.5">{scenario.title}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
          <span className="text-neutral-400 text-[10px] uppercase block">Sample Status</span>
          <span className="font-bold text-emerald-400 text-xs flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {scenario.badge}
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
          <span className="text-neutral-400 text-[10px] uppercase block">Sample Pace</span>
          <span className="font-bold text-amber-400 text-xs flex items-center gap-1 mt-0.5 tabular-nums">
            <Gauge className="w-3.5 h-3.5" />
            ~{scenario.averageWpm} WPM
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
          <span className="text-neutral-400 text-[10px] uppercase block">Format</span>
          <span className="font-bold text-[#00d9ff] text-xs truncate block mt-0.5">Timestamped Cues</span>
        </div>
      </div>

      {/* Synchronized Transcript Viewport */}
      <div className="p-5 sm:p-7 space-y-6 max-h-[380px] overflow-y-auto font-sans leading-relaxed">
        {scenario.segments.map((segment, segIdx) => {
          const isSegmentActive =
            currentTime >= segment.startTime && currentTime <= segment.endTime;

          return (
            <div
              key={segIdx}
              className={`p-4 rounded-2xl transition-all duration-200 border ${
                isSegmentActive
                  ? "bg-white/10 border-[#ff4d00]/50 shadow-lg"
                  : "bg-white/[0.02] border-white/5 opacity-80"
              }`}
            >
              <div className="flex items-center justify-between gap-3 mb-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${segment.avatarColor}`}>
                    {segment.speaker}
                  </span>
                  <span className="text-neutral-400 text-[11px]">{segment.speakerRole}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleSeek(segment.startTime)}
                  className="text-neutral-400 hover:text-[#ff4d00] transition-colors tabular-nums hover:underline"
                >
                  [{formatTime(segment.startTime)} → {formatTime(segment.endTime)}]
                </button>
              </div>

              <div className="text-sm sm:text-base leading-relaxed tracking-wide flex flex-wrap gap-x-1.5 gap-y-1">
                {segment.words.map((w, wIdx) => {
                  const isWordActive =
                    currentTime >= w.start && currentTime < w.end;

                  return (
                    <span
                      key={wIdx}
                      onClick={() => handleSeek(w.start)}
                      className={`cursor-pointer px-1 py-0.5 rounded transition-all duration-100 ${
                        isWordActive
                          ? "bg-[#ff4d00] text-white font-bold shadow-md scale-105"
                          : currentTime > w.end
                          ? "text-neutral-300 hover:text-white"
                          : "text-neutral-500 hover:text-neutral-300"
                      }`}
                    >
                      {w.word}
                    </span>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Media Controller Bar */}
      <div className="p-4 sm:p-6 bg-[#161a22] border-t border-white/10 space-y-4">
        {/* Progress Scrubber */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
            <span className="text-[#ff4d00] font-bold tabular-nums">{formatTime(currentTime)}</span>
            <span className="tabular-nums">{formatTime(scenario.duration)}</span>
          </div>
          <div
            className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden cursor-pointer relative"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickFraction = (e.clientX - rect.left) / rect.width;
              handleSeek(clickFraction * scenario.duration);
            }}
          >
            <div
              className="h-full bg-gradient-to-r from-[#ff4d00] to-amber-500 transition-all duration-100"
              style={{ width: `${(currentTime / scenario.duration) * 100}%` }}
            />
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff4d00] hover:bg-[#e04400] text-white font-mono font-bold text-xs shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? "Pause Demo Audio" : "Play Demo Audio"}</span>
            </button>

            <button
              type="button"
              onClick={() => handleSeek(0)}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Reset to 00:00"
              aria-label="Restart audio from beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setIsMuted(!isMuted);
                if (!isMuted) stopTone();
                else if (isPlaying) startTone();
              }}
              className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title={isMuted ? "Unmute audio synth" : "Mute audio synth"}
              aria-label="Toggle mute"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          <div className="flex items-center gap-3">
            {/* Speed Toggle */}
            <div className="flex items-center gap-1 p-1 bg-black/40 rounded-xl border border-white/10 text-xs font-mono">
              {[0.75, 1.0, 1.25, 1.5].map((spd) => (
                <button
                  key={spd}
                  type="button"
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-1 rounded-md transition-all ${
                    playbackSpeed === spd
                      ? "bg-white text-black font-bold"
                      : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {spd}x
                </button>
              ))}
            </div>

            {/* Launch Converter Link */}
            <Link
              to="/convert"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono font-bold text-white transition-colors border border-white/10"
            >
              <span>Format Converter</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
