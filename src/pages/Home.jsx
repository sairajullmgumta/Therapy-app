import { Link } from "react-router-dom";
import { Menu, Sparkles, Wind } from "lucide-react";
import { motion } from "framer-motion";

const sections = [
  {
    title: "Create",
    subtitle: "Express through imagery",
    path: "/Create",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80",
    accent: "from-violet-600/70 to-indigo-800/60",
  },
  {
    title: "Learn",
    subtitle: "Deepen your awareness",
    path: "/Learn",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80",
    accent: "from-emerald-600/70 to-teal-800/60",
  },
  {
    title: "Reflect",
    subtitle: "Revisit your journey",
    path: "/Library",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    accent: "from-rose-600/70 to-pink-800/60",
  },
  {
    title: "Creative Calm",
    subtitle: "Find your center",
    path: "/CreativeCalm",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    accent: "from-amber-500/70 to-orange-700/60",
  },
  {
    title: "Analytics",
    subtitle: "Track your emotional journey",
    path: "/Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    accent: "from-sky-600/70 to-indigo-800/60",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 max-w-md mx-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-400 via-fuchsia-500 to-rose-400 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-white text-base tracking-tight">Reflect XR</span>
            <p className="text-gray-400 text-xs">Your emotional space</p>
          </div>
        </div>
        <button className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
          <Menu className="w-4 h-4 text-gray-300" />
        </button>
      </div>

      {/* Breathing Session Quick Access */}
      <div className="px-4 pb-2">
        <Link to="/BreathingSession">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full rounded-3xl overflow-hidden relative h-20 flex items-center px-5 gap-4 bg-gradient-to-r from-indigo-600/80 to-violet-700/80 border border-violet-500/30"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <Wind className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-sm">Breathing Session</p>
              <p className="text-white/60 text-xs mt-0.5">Box · 4-7-8 · Energizing</p>
            </div>
            <div className="ml-auto text-white/50 text-base">→</div>
          </motion.div>
        </Link>
      </div>

      {/* Cards */}
      <div className="flex-1 flex flex-col gap-2.5 px-4 pb-6 pt-2">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
            className="flex-1 min-h-[130px]"
          >
            <Link
              to={section.path}
              className="relative flex-1 rounded-3xl overflow-hidden min-h-[130px] block h-full group"
            >
              <img
                src={section.image}
                alt={section.title}
                className="w-full h-full object-cover absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${section.accent}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <span className="text-white text-2xl font-bold tracking-tight drop-shadow">{section.title}</span>
                <p className="text-white/70 text-xs mt-0.5">{section.subtitle}</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-lg">→</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}