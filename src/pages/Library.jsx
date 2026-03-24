import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { base44 } from "@/api/base44Client";

export default function Library() {
  const navigate = useNavigate();
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Reflection.list("-created_date", 50).then((data) => {
      setReflections(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 max-w-md mx-auto flex flex-col">
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-violet-400 via-fuchsia-500 to-rose-400 flex items-center justify-center shadow-lg shadow-fuchsia-500/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-white text-base">My Library</span>
            <p className="text-white/40 text-xs">Your reflections</p>
          </div>
        </div>
        <button className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
          <Menu className="w-4 h-4 text-white/60" />
        </button>
      </div>

      <div className="flex-1 px-4 pb-4">
        {loading ? (
          <div className="grid grid-cols-2 gap-3">
            {[1,2,3,4].map(i => (
              <div key={i} className="rounded-2xl bg-white/10 animate-pulse aspect-square" />
            ))}
          </div>
        ) : reflections.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-white/30">
            <BookOpen className="w-12 h-12 mb-3 opacity-40" />
            <p className="text-sm font-medium">No reflections yet</p>
            <p className="text-xs mt-1">Start creating to build your library</p>
            <button
              onClick={() => navigate("/Create")}
              className="mt-4 px-6 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl text-sm font-semibold"
            >
              Create Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {reflections.map((r, i) => (
              <motion.button
                key={r.id}
                initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }} transition={{ delay: i * 0.04 }}
                onClick={() => navigate("/ReflectionDetail", { state: { reflection: r } })}
                className="relative rounded-2xl overflow-hidden aspect-square bg-white/10"
              >
                {r.image_url ? (
                  <img src={r.image_url} alt="reflection" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-violet-900 to-fuchsia-900" />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                  <p className="text-white text-xs line-clamp-2">{r.prompt}</p>
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-white/10 px-8 py-3 flex justify-around">
        <button onClick={() => navigate("/Home")} className="text-xs text-white/40 flex flex-col items-center gap-1">
          <div className="w-5 h-5 rounded bg-white/20" />
          Home
        </button>
        <button className="text-xs text-violet-400 flex flex-col items-center gap-1">
          <BookOpen className="w-5 h-5" />
          Library
        </button>
        <button onClick={() => navigate("/Create")} className="text-xs text-white/40 flex flex-col items-center gap-1">
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 flex items-center justify-center">
            <span className="text-white text-xs">+</span>
          </div>
          Create
        </button>
      </div>
    </div>
  );
}