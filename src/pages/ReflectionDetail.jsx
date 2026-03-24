import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ReflectionDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const reflection = location.state?.reflection;

  if (!reflection) {
    navigate("/Library");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-950 max-w-md mx-auto flex flex-col">
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <button onClick={() => navigate("/Library")} className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <span className="font-bold text-white">Reflection</span>
        <button className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
          <Share2 className="w-4 h-4 text-white/60" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        {reflection.image_url && (
          <motion.div initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }} className="rounded-3xl overflow-hidden aspect-video">
            <img src={reflection.image_url} alt="reflection" className="w-full h-full object-cover" />
          </motion.div>
        )}

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-xs font-semibold text-white/40 mb-1">Prompt</p>
          <p className="text-sm text-white/60">{reflection.prompt}</p>
        </div>

        {reflection.insights && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs font-semibold text-white/40 mb-2">Insights</p>
            <p className="text-sm text-white/60 leading-relaxed">{reflection.insights}</p>
          </div>
        )}

        {reflection.reflection_text && (
          <div className="bg-violet-900/30 border border-violet-500/20 rounded-2xl p-4">
            <p className="text-xs font-semibold text-violet-300 mb-1">Your Reflection</p>
            {reflection.reflection_question && (
              <p className="text-xs text-violet-400/60 mb-2 italic">"{reflection.reflection_question}"</p>
            )}
            <p className="text-sm text-white/60 leading-relaxed">{reflection.reflection_text}</p>
          </div>
        )}
      </div>

      <div className="p-4 space-y-2">
        <Button
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white py-3 rounded-2xl font-semibold border-0"
          onClick={() => navigate("/Reflect", { state: reflection })}
        >
          Reflect Again
        </Button>
        <Button
          variant="outline"
          className="w-full rounded-2xl bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
          onClick={() => navigate("/Response", { state: { prompt: reflection.prompt } })}
        >
          Regenerate Image
        </Button>
      </div>
    </div>
  );
}