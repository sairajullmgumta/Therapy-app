import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";

const PETAL_COUNT = 6;

export default function BreathingVisual({ phase }) {
  // phase: "inhale" | "hold" | "exhale" | "idle"

  const scale = phase === "inhale" ? 1.6 : phase === "hold" ? 1.6 : 0.7;
  const rotate = phase === "inhale" ? 60 : phase === "hold" ? 60 : 0;
  const duration = phase === "inhale" ? 4 : phase === "hold" ? 4 : 4;

  const colors = {
    inhale: ["#818cf8", "#a78bfa", "#c084fc"],
    hold:   ["#6366f1", "#8b5cf6", "#a855f7"],
    exhale: ["#38bdf8", "#818cf8", "#a78bfa"],
    idle:   ["#4f46e5", "#7c3aed", "#9333ea"],
  };
  const [c1, c2, c3] = colors[phase] || colors.idle;

  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      {Array.from({ length: PETAL_COUNT }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: 90,
            height: 90,
            background: `radial-gradient(circle at 40% 40%, ${c2}, ${c1}88)`,
            originX: "50%",
            originY: "50%",
            rotate: i * (360 / PETAL_COUNT),
            opacity: 0.75,
          }}
          animate={{
            scale,
            rotate: i * (360 / PETAL_COUNT) + rotate,
            x: phase === "idle" ? 0 : Math.cos((i * 2 * Math.PI) / PETAL_COUNT) * (scale > 1 ? 18 : 6),
            y: phase === "idle" ? 0 : Math.sin((i * 2 * Math.PI) / PETAL_COUNT) * (scale > 1 ? 18 : 6),
          }}
          transition={{ duration, ease: "easeInOut" }}
        />
      ))}

      {/* Center glow */}
      <motion.div
        className="absolute rounded-full z-10"
        style={{ background: `radial-gradient(circle, ${c3}cc, ${c1}44)` }}
        animate={{ width: scale * 56, height: scale * 56 }}
        transition={{ duration, ease: "easeInOut" }}
      />

      {/* Outer ring pulse */}
      <motion.div
        className="absolute rounded-full border"
        style={{ borderColor: `${c2}55` }}
        animate={{ width: scale * 160, height: scale * 160, opacity: phase === "idle" ? 0.2 : 0.5 }}
        transition={{ duration, ease: "easeInOut" }}
      />
    </div>
  );
}