import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Play, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import BreathingVisual from "../components/BreathingVisual";

const PROGRAMS = [
  {
    name: "Box Breathing",
    subtitle: "Balance & Focus",
    description: "Used by Navy SEALs to stay calm under pressure.",
    color: "from-indigo-600 to-violet-700",
    pattern: [
      { phase: "inhale", label: "Inhale", duration: 4 },
      { phase: "hold",   label: "Hold",   duration: 4 },
      { phase: "exhale", label: "Exhale", duration: 4 },
      { phase: "hold",   label: "Hold",   duration: 4 },
    ],
  },
  {
    name: "4-7-8 Calm",
    subtitle: "Deep Relaxation",
    description: "Activates your parasympathetic nervous system.",
    color: "from-violet-600 to-fuchsia-700",
    pattern: [
      { phase: "inhale", label: "Inhale",    duration: 4 },
      { phase: "hold",   label: "Hold",      duration: 7 },
      { phase: "exhale", label: "Exhale",    duration: 8 },
    ],
  },
  {
    name: "Energizing",
    subtitle: "Wake Up & Flow",
    description: "Quick cycles to boost alertness and energy.",
    color: "from-sky-600 to-indigo-700",
    pattern: [
      { phase: "inhale", label: "Inhale", duration: 3 },
      { phase: "exhale", label: "Exhale", duration: 2 },
    ],
  },
];

export default function BreathingSession() {
  const navigate = useNavigate();
  const [selectedProgram, setSelectedProgram] = useState(0);
  const [running, setRunning] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  const program = PROGRAMS[selectedProgram];
  const currentStep = running ? program.pattern[stepIndex] : null;

  const startSession = () => {
    setRunning(true);
    setStepIndex(0);
    setCycleCount(0);
    setCountdown(program.pattern[0].duration);
  };

  const stopSession = () => {
    setRunning(false);
    clearTimeout(timerRef.current);
    clearInterval(countdownRef.current);
  };

  useEffect(() => {
    if (!running) return;

    const step = program.pattern[stepIndex];
    setCountdown(step.duration);

    countdownRef.current = setInterval(() => {
      setCountdown((c) => Math.max(0, c - 1));
    }, 1000);

    timerRef.current = setTimeout(() => {
      clearInterval(countdownRef.current);
      const next = (stepIndex + 1) % program.pattern.length;
      if (next === 0) setCycleCount((c) => c + 1);
      setStepIndex(next);
    }, step.duration * 1000);

    return () => {
      clearTimeout(timerRef.current);
      clearInterval(countdownRef.current);
    };
  }, [running, stepIndex, selectedProgram]);

  return (
    <div className="min-h-screen bg-gray-950 max-w-md mx-auto flex flex-col">
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <button onClick={() => navigate("/CreativeCalm")} className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <span className="font-bold text-white">Breathing</span>
        <div className="w-9" />
      </div>

      {!running ? (
        <div className="flex-1 flex flex-col px-4 pb-6 gap-4">
          <p className="text-white/40 text-sm px-1">Choose a breathing pattern to begin.</p>
          {PROGRAMS.map((p, i) => (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => setSelectedProgram(i)}
              className={`relative rounded-3xl overflow-hidden p-5 text-left border-2 transition-all ${
                selectedProgram === i ? "border-violet-500 shadow-lg shadow-violet-500/20" : "border-white/10"
              } bg-white/5`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${p.color} opacity-${selectedProgram === i ? "20" : "10"}`} />
              <p className="text-white font-bold text-base relative">{p.name}</p>
              <p className="text-violet-300 text-xs relative mt-0.5">{p.subtitle}</p>
              <p className="text-white/40 text-xs relative mt-2">{p.description}</p>
              <div className="flex gap-2 mt-3 relative">
                {p.pattern.map((s, j) => (
                  <div key={j} className="flex flex-col items-center gap-0.5">
                    <div className="bg-white/20 rounded-full px-2 py-0.5 text-xs text-white/70">{s.duration}s</div>
                    <span className="text-white/30 text-[10px]">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.button>
          ))}

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={startSession}
            className="mt-auto w-full py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-violet-500/30"
          >
            <Play className="w-5 h-5" /> Start Session
          </motion.button>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-between px-4 pb-8 pt-4">
          {/* Cycle counter */}
          <div className="flex gap-3">
            {[0,1,2].map(i => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all ${i < cycleCount % 3 + (cycleCount >= 3 ? 1 : 0) ? "bg-violet-400" : "bg-white/20"}`} />
            ))}
          </div>

          {/* Main visual */}
          <div className="flex flex-col items-center gap-6">
            <BreathingVisual phase={currentStep?.phase || "idle"} />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep?.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center gap-1"
              >
                <p className="text-white text-2xl font-bold tracking-wide">{currentStep?.label}</p>
                <p className="text-white/40 text-4xl font-light tabular-nums">{countdown}</p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Cycles */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-white/30 text-sm">Cycle {cycleCount + 1} · {program.name}</p>
            <button
              onClick={stopSession}
              className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/10 border border-white/10 text-white/60 text-sm font-medium"
            >
              <Square className="w-4 h-4" /> Stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
}