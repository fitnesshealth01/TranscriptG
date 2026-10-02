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
  ShieldCheck,
  CheckCircle2,
  Sliders,
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
  confidence: number;
  audioFreq: number; // tone frequency for web audio synth
  segments: SpeakerSegment[];
}

const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: "legal",
    title: "Legal Deposition & Testimony",
    badge: "Evidentiary Verbatim",
    description: "Multi-speaker cross-examination with speaker diarization, sub-second timecodes, and 99.6% acoustic confidence.",
    duration: 18.5,
    averageWpm: 152,
    confidence: 99.6,
    audioFreq: 340,
    segments: [
      {
        speaker: "Counsel Arthur Vance",
        speakerRole: "Examining Attorney",
        avatarColor: "bg-blue-600 text-white",
        startTime: 0.0,
        endTime: 5.2,
        words: [
          { word: "Please", start: 0.1, end: 0.4 },
          { word: "state", start: 0.5, end: 0.8 },
          { word: "your", start: 0.9, end: 1.1 },
          { word: "full", start: 1.2, end: 1.5 },
          { word: "name", start: 1.6, end: 1.9 },
          { word: "and", start: 2.0, end: 2.2 },
          { word: "professional", start: 2.3, end: 2.9 },
          { word: "qualifications", start: 3.0, end: 3.8 },
          { word: "for", start: 3.9, end: 4.1 },
          { word: "the", start: 4.2, end: 4.4 },
          { word: "record.", start: 4.5, end: 5.2 },
        ],
      },
      {
        speaker: "Dr. Evelyn Vance",
        speakerRole: "Chief Acoustic Scientist",
        avatarColor: "bg-[#ff4d00] text-white",
        startTime: 5.8,
        endTime: 12.4,
        words: [
          { word: "My", start: 5.8, end: 6.0 },
          { word: "name", start: 6.1, end: 6.3 },
          { word: "is", start: 6.4, end: 6.6 },
          { word: "Dr.", start: 6.7, end: 7.0 },
          { word: "Evelyn", start: 7.1, end: 7.5 },
          { word: "Vance.", start: 7.6, end: 8.1 },
          { word: "I", start: 8.4, end: 8.6 },
          { word: "hold", start: 8.7, end: 9.0 },
          { word: "a", start: 9.1, end: 9.2 },
          { word: "Doctorate", start: 9.3, end: 9.9 },
          { word: "in", start: 10.0, end: 10.2 },
          { word: "Computational", start: 10.3, end: 11.1 },
          { word: "Acoustics", start: 11.2, end: 11.8 },
          { word: "from", start: 11.9, end: 12.1 },
          { word: "MIT.", start: 12.2, end: 12.4 },
        ],
      },
      {
        speaker: "Counsel Arthur Vance",
        speakerRole: "Examining Attorney",
        avatarColor: "bg-blue-600 text-white",
        startTime: 13.0,
        endTime: 18.5,
        words: [
          { word: "And", start: 13.0, end: 13.2 },
          { word: "did", start: 13.3, end: 13.5 },
          { word: "you", start: 13.6, end: 13.8 },
          { word: "conduct", start: 13.9, end: 14.4 },
          { word: "the", start: 14.5, end: 14.7 },
          { word: "spectral", start: 14.8, end: 15.3 },
          { word: "analysis", start: 15.4, end: 16.0 },
          { word: "on", start: 16.1, end: 16.3 },
          { word: "Exhibit", start: 16.4, end: 16.9 },
          { word: "Number", start: 17.0, end: 17.4 },
          { word: "Four?", start: 17.5, end: 18.5 },
        ],
      },
    ],
  },
  {
    id: "tech",
    title: "AI & Neural Speech Keynote",
    badge: "Technical Conference",
    description: "Rapid academic lecture with transformer architecture terminology and acoustic beamforming analysis.",
    duration: 16.0,
    averageWpm: 168,
    confidence: 99.2,
    audioFreq: 440,
    segments: [
      {
        speaker: "Maya Lin, M.Sc.",
        speakerRole: "Lead Linguistic Engineer",
        avatarColor: "bg-purple-600 text-white",
        startTime: 0.0,
        endTime: 7.8,
        words: [
          { word: "By", start: 0.1, end: 0.3 },
          { word: "coupling", start: 0.4, end: 0.8 },
          { word: "conformer", start: 0.9, end: 1.4 },
          { word: "encoder", start: 1.5, end: 2.0 },
          { word: "blocks", start: 2.1, end: 2.4 },
          { word: "with", start: 2.5, end: 2.7 },
          { word: "CTC", start: 2.8, end: 3.2 },
          { word: "loss", start: 3.3, end: 3.6 },
          { word: "penalties,", start: 3.7, end: 4.3 },
          { word: "we", start: 4.6, end: 4.8 },
          { word: "diminish", start: 4.9, end: 5.4 },
          { word: "reverberation", start: 5.5, end: 6.2 },
          { word: "artifacts", start: 6.3, end: 6.8 },
          { word: "substantially.", start: 6.9, end: 7.8 },
        ],
      },
      {
        speaker: "Audience Delegate",
        speakerRole: "Research Fellow",
        avatarColor: "bg-emerald-600 text-white",
        startTime: 8.5,
        endTime: 16.0,
        words: [
          { word: "Does", start: 8.5, end: 8.8 },
          { word: "that", start: 8.9, end: 9.1 },
          { word: "preserve", start: 9.2, end: 9.7 },
          { word: "millisecond", start: 9.8, end: 10.5 },
          { word: "timecode", start: 10.6, end: 11.2 },
          { word: "alignment", start: 11.3, end: 11.9 },
          { word: "during", start: 12.0, end: 12.4 },
          { word: "live", start: 12.5, end: 12.8 },
          { word: "multilingual", start: 12.9, end: 13.8 },
          { word: "streaming?", start: 13.9, end: 14.8 },
        ],
      },
    ],
  },
  {
    id: "clinical",
    title: "Clinical Telehealth Consultation",
    badge: "HIPAA Compliant Sample",
    description: "Doctor-patient diagnostic exchange with pharmaceutical terms and automated clinical disfluency cleaning.",
    duration: 17.0,
    averageWpm: 140,
    confidence: 99.8,
    audioFreq: 520,
    segments: [
      {
        speaker: "Elena Rostova, CHDS",
        speakerRole: "Clinical Documentation Lead",
        avatarColor: "bg-teal-600 text-white",
        startTime: 0.0,
        endTime: 7.5,
        words: [
          { word: "Good", start: 0.1, end: 0.4 },
          { word: "morning.", start: 0.5, end: 0.9 },
          { word: "We", start: 1.2, end: 1.4 },
          { word: "are", start: 1.5, end: 1.7 },
          { word: "reviewing", start: 1.8, end: 2.3 },
          { word: "the", start: 2.4, end: 2.6 },
          { word: "twenty-four", start: 2.7, end: 3.4 },
          { word: "hour", start: 3.5, end: 3.8 },
          { word: "ambulatory", start: 3.9, end: 4.6 },
          { word: "Holter", start: 4.7, end: 5.2 },
          { word: "monitor", start: 5.3, end: 5.8 },
          { word: "telemetry.", start: 5.9, end: 6.8 },
        ],
      },
      {
        speaker: "Patient",
        speakerRole: "Consultation Participant",
        avatarColor: "bg-amber-600 text-white",
        startTime: 8.0,
        endTime: 17.0,
        words: [
          { word: "Thank", start: 8.0, end: 8.3 },
          { word: "you,", start: 8.4, end: 8.7 },
          { word: "Doctor.", start: 8.8, end: 9.3 },
          { word: "The", start: 9.6, end: 9.8 },
          { word: "palpitations", start: 9.9, end: 10.7 },
          { word: "subsided", start: 10.8, end: 11.4 },
          { word: "after", start: 11.5, end: 11.9 },
          { word: "starting", start: 12.0, end: 12.5 },
          { word: "the", start: 12.6, end: 12.8 },
          { word: "prescribed", start: 12.9, end: 13.6 },
          { word: "metoprolol", start: 13.7, end: 14.5 },
          { word: "dosage.", start: 14.6, end: 15.5 },
        ],
      },
    ],
  },
];

export const InteractiveDemoPlayer: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>("legal");
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
      // Subtle acoustic frequency modulated to simulate human vocal formant fundamentals
      osc.frequency.setValueAtTime(scenario.audioFreq, ctx.currentTime);
      gain.gain.setValueAtTime(0.018, ctx.currentTime);

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

  // Seek timecode
  const handleSeek = (newTime: number) => {
    setCurrentTime(Math.max(0, Math.min(newTime, scenario.duration)));
  };

  // Timer animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    lastTickTimeRef.current = performance.now();

    const loop = (now: number) => {
      const deltaMs = now - lastTickTimeRef.current;
      lastTickTimeRef.current = now;

      setCurrentTime((prev) => {
        const nextTime = prev + (deltaMs / 1000) * playbackSpeed;
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

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopTone();
      if (audioContextRef.current && audioContextRef.current.state !== "closed") {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Format seconds to mm:ss.ms
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
              Interactive Acoustic Speech Sandbox
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white mt-1">
            Real-Time Multi-Speaker Diarization &amp; Timecode Sync
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            Test TranscriptG's verbatim word synchronization without uploading private media files.
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
              {sc.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Acoustic Telemetry Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-black/30 border-b border-white/5 text-xs font-mono">
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
          <span className="text-neutral-400 text-[10px] uppercase block">Scenario Domain</span>
          <span className="font-bold text-white text-xs truncate block mt-0.5">{scenario.title}</span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
          <span className="text-neutral-400 text-[10px] uppercase block">Acoustic Confidence</span>
          <span className="font-bold text-emerald-400 text-xs flex items-center gap-1 mt-0.5 tabular-nums">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {scenario.confidence}%
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
          <span className="text-neutral-400 text-[10px] uppercase block">Speaking Velocity</span>
          <span className="font-bold text-amber-400 text-xs flex items-center gap-1 mt-0.5 tabular-nums">
            <Gauge className="w-3.5 h-3.5" />
            {scenario.averageWpm} WPM
          </span>
        </div>
        <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
          <span className="text-neutral-400 text-[10px] uppercase block">Standard Protocol</span>
          <span className="font-bold text-[#00d9ff] text-xs truncate block mt-0.5">{scenario.badge}</span>
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
                  : "bg-white/5 border-white/5 opacity-85 hover:opacity-100"
              }`}
            >
              {/* Speaker Metadata Header */}
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold ${segment.avatarColor}`}
                  >
                    {segment.speaker}
                  </span>
                  <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline">
                    · {segment.speakerRole}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-neutral-400 tabular-nums">
                  [{formatTime(segment.startTime)} - {formatTime(segment.endTime)}]
                </span>
              </div>

              {/* Word-by-Word Active Karaoke Tokens */}
              <div className="flex flex-wrap gap-x-1.5 gap-y-1 text-sm sm:text-base">
                {segment.words.map((w, wIdx) => {
                  const isWordActive =
                    currentTime >= w.start && currentTime <= w.end;
                  const isWordPast = currentTime > w.end;
                  return (
                    <button
                      key={wIdx}
                      type="button"
                      onClick={() => handleSeek(w.start)}
                      title={`Jump to ${formatTime(w.start)}`}
                      className={`px-1 py-0.5 rounded transition-all cursor-pointer text-left ${
                        isWordActive
                          ? "bg-[#ff4d00] text-white font-bold scale-105 shadow-md"
                          : isWordPast
                          ? "text-neutral-200 font-medium"
                          : "text-neutral-500 hover:text-white"
                      }`}
                    >
                      {w.word}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Controls & Scrub Bar */}
      <div className="p-4 sm:p-6 bg-[#161a22] border-t border-white/10 space-y-4">
        {/* Progress Timeline Scrubber */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-mono text-neutral-400 tabular-nums">
            <span className="text-white font-bold">{formatTime(currentTime)}</span>
            <span>Target Length: {formatTime(scenario.duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max={scenario.duration}
            step="0.05"
            value={currentTime}
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
            className="w-full h-2 rounded-lg bg-neutral-700 accent-[#ff4d00] cursor-pointer"
            aria-label="Seek timecode in audio demo"
          />
        </div>

        {/* Buttons Row */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff4d00] hover:bg-[#e04400] text-white font-mono font-bold text-xs shadow-lg transition-transform hover:scale-[1.02] cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isPlaying ? "Pause Acoustic Stream" : "Play Interactive Audio"}</span>
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
              <span>Convert this Demo to SRT</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
