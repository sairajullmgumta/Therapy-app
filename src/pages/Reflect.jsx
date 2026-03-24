import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { base44 } from "@/api/base44Client";

const REFLECTION_QUESTIONS = [
  "What sticks out to you most about your artwork?",
  "What emotions come up when you look at this image?",
  "What does this image say about how you're feeling right now?",
  "If this image could speak, what would it say?",
  "How does this artwork connect to your life right now?",
];

export default function Reflect() {
  const navigate = useNavigate();
  const location = useLocation();
  const { prompt, image_url, insights } = location.state || {};

  const [questionIndex, setQuestionIndex] = useState(0);
  const [reflectionText, setReflectionText] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await base44.entities.Reflection.create({
      prompt,
      image_url,
      insights,
      reflection_text: reflectionText,
      reflection_question: REFLECTION_QUESTIONS[questionIndex],
      saved_to_library: true,
    });
    setSaving(false);
    navigate("/Library");
  };

  return (
    <div className="min-h-screen bg-gray-950 max-w-md mx-auto flex flex-col">
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <span className="font-bold text-white">Reflect</span>
        <div className="w-9" />
      </div>

      <div className="flex-1 flex flex-col px-5 pb-5 gap-4">
        {image_url && (
          <motion.div initial={{ opacity:0, scale:0.97 }} animate={{ opacity:1, scale:1 }} className="rounded-3xl overflow-hidden aspect-video">
            <img src={image_url} alt="artwork" className="w-full h-full object-cover" />
          </motion.div>
        )}

        <p className="text-sm text-white/50 font-medium">Reflect on your artwork</p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
          <div className="flex items-center justify-between gap-3">
            <button
              onClick={() => setQuestionIndex((i) => (i - 1 + REFLECTION_QUESTIONS.length) % REFLECTION_QUESTIONS.length)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 flex-shrink-0"
            >
              <ChevronLeft className="w-4 h-4 text-white/70" />
            </button>
            <p className="text-sm font-medium text-white/80 text-center leading-relaxed">
              {REFLECTION_QUESTIONS[questionIndex]}
            </p>
            <button
              onClick={() => setQuestionIndex((i) => (i + 1) % REFLECTION_QUESTIONS.length)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 flex-shrink-0"
            >
              <ChevronRight className="w-4 h-4 text-white/70" />
            </button>
          </div>
        </div>

        <div className="relative">
          <Textarea
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="Feeling connected, feeling love..."
            className="resize-none min-h-[90px] pr-12 rounded-2xl bg-white/10 border-white/20 text-white placeholder:text-white/30"
          />
          <button
            onClick={handleSave}
            className="absolute right-3 bottom-3 w-8 h-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg"
          >
            <ArrowRight className="w-4 h-4 text-white" />
          </button>
        </div>

        {insights && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="text-xs font-semibold text-white/40 mb-2">AI Insights</p>
            <p className="text-sm text-white/50 leading-relaxed line-clamp-4">{insights}</p>
          </div>
        )}
      </div>

      <div className="p-4">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white py-3 rounded-2xl font-semibold border-0"
        >
          {saving ? "Saving..." : "Save Reflection"}
        </Button>
      </div>
    </div>
  );
}