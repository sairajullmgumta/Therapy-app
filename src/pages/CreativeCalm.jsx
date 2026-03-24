import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Play, Pause, Wind } from "lucide-react";
import { motion } from "framer-motion";

const exercises = [
  {
    title: "Breathing with Color",
    duration: "5 min",
    description: "Visualize colors as you breathe in calm and breathe out tension.",
    color: "from-blue-400 to-cyan-300",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    title: "Emotion Landscape",
    duration: "8 min",
    description: "Imagine your emotional state as a landscape and explore it.",
    color: "from-purple-400 to-pink-300",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
  {
    title: "Mindful Observation",
    duration: "3 min",
    description: "Study an image with full attention, noticing every detail.",
    color: "from-green-400 to-teal-300",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
  },
];

export default function CreativeCalm() {
  const navigate = useNavigate();
  const [playing, setPlaying] = useState(null);

  return (
    <div className="min-h-screen bg-gray-950 max-w-md mx-auto flex flex-col">
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <button onClick={() => navigate("/Home")} className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <span className="font-bold text-white">Creative Calm</span>
        <div className="w-9" />
      </div>

      <div className="flex-1 px-4 pb-4 space-y-4">
        <p className="text-sm text-white/40">Guided exercises to bring you back to calm and creativity.</p>

        {/* Breathing CTA */}
        <motion.button
          initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }}
          onClick={() => navigate("/BreathingSession")}
          className="w-full rounded-3xl overflow-hidden relative h-24 flex items-center px-5 gap-4 bg-gradient-to-r from-indigo-600/80 to-violet-700/80 border border-violet-500/30"
        >
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
            <Wind className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <p className="text-white font-bold text-base">Breathing Session</p>
            <p className="text-white/60 text-xs mt-0.5">Box · 4-7-8 · Energizing patterns</p>
          </div>
          <div className="ml-auto text-white/40 text-lg">→</div>
        </motion.button>

        {exercises.map((ex, i) => (
          <motion.div
            key={i}
            initial={{ opacity:0, y:14 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.08 }}
            className="relative rounded-3xl overflow-hidden h-48"
          >
            <img src={ex.image} alt={ex.title} className="w-full h-full object-cover" />
            <div className={`absolute inset-0 bg-gradient-to-br ${ex.color} opacity-80`} />
            <div className="absolute inset-0 p-5 flex flex-col justify-between">
              <div>
                <p className="text-white font-bold text-lg">{ex.title}</p>
                <p className="text-white/60 text-xs mt-1">{ex.duration}</p>
                <p className="text-white/80 text-sm mt-2">{ex.description}</p>
              </div>
              <button
                onClick={() => setPlaying(playing === i ? null : i)}
                className="self-end w-11 h-11 bg-white/25 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
              >
                {playing === i
                  ? <Pause className="w-5 h-5 text-white" />
                  : <Play className="w-5 h-5 text-white ml-0.5" />
                }
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}