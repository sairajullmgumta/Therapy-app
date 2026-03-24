import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronDown, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const EMOTION_OPTIONS = ["Joy", "Sadness", "Anger", "Fear", "Surprise", "Disgust", "Calm", "Anxiety", "Hope", "Grief"];
const INTENSITY_OPTIONS = ["Low", "Medium", "High", "Intense"];
const CONTEXT_OPTIONS = ["Personal", "Work", "Relationship", "Health", "Loss", "Achievement"];
const STYLE_OPTIONS = ["Abstract", "Photorealistic", "Painterly", "Minimalist", "Surreal", "Watercolor"];

function DropdownChip({ label, options, value, onChange }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-3 py-1.5 border border-white/20 rounded-full text-sm text-white/80 bg-white/10 hover:bg-white/20 backdrop-blur-sm"
      >
        {value || label} <ChevronDown className="w-3 h-3" />
      </button>
      {open && (
        <div className="absolute z-10 top-9 left-0 bg-gray-900 border border-white/10 rounded-xl shadow-2xl p-1 min-w-[140px]">
          {options.map((o) => (
            <button
              key={o}
              onClick={() => { onChange(o); setOpen(false); }}
              className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/10 rounded-lg"
            >
              {o}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Create() {
  const navigate = useNavigate();
  const [step, setStep] = useState("main"); // main | emotions
  const [prompt, setPrompt] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [emotion, setEmotion] = useState("");
  const [intensity, setIntensity] = useState("");
  const [context, setContext] = useState("");
  const [style, setStyle] = useState("");

  if (step === "emotions") {
    return (
      <div className="min-h-screen bg-gray-950 max-w-md mx-auto flex flex-col">
        <div className="flex items-center justify-between px-5 pt-10 pb-4">
          <button onClick={() => setStep("main")} className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <span className="font-bold text-white">Emotions</span>
          <div className="w-9" />
        </div>
        <div className="flex-1 p-5">
          <p className="text-white/50 text-sm mb-6">Describe any emotional attributes, background information, and style.</p>
          <div className="flex flex-wrap gap-2 mb-8">
            <DropdownChip label="Emotions" options={EMOTION_OPTIONS} value={emotion} onChange={setEmotion} />
            <DropdownChip label="Intensity" options={INTENSITY_OPTIONS} value={intensity} onChange={setIntensity} />
            <DropdownChip label="Context" options={CONTEXT_OPTIONS} value={context} onChange={setContext} />
            <DropdownChip label="Style" options={STYLE_OPTIONS} value={style} onChange={setStyle} />
          </div>
          <button className="flex items-center justify-center w-8 h-8 border border-white/20 rounded-full mx-auto">
            <Plus className="w-4 h-4 text-white/50" />
          </button>
        </div>
        <div className="p-5">
          <Button
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white py-3 rounded-2xl font-semibold border-0"
            onClick={() => {
              const builtPrompt = [emotion, intensity, context, style].filter(Boolean).join(", ");
              navigate("/Response", { state: { prompt: builtPrompt || "emotional abstract art" } });
            }}
          >
            Create
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 max-w-md mx-auto flex flex-col">
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <button onClick={() => navigate("/Home")} className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <span className="font-bold text-white">Create</span>
        <div className="w-9" />
      </div>
      <div className="flex-1 p-5 flex flex-col gap-4">
        <p className="text-center text-white/60 text-sm">How would you like to create today?</p>

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.05 }}
          className="relative rounded-3xl overflow-hidden h-36 cursor-pointer"
          onClick={() => navigate("/PromptCreate")}>
          <img src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&q=80" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/60 to-indigo-900/70" />
          <div className="absolute inset-0 flex items-end p-4">
            <div className="w-full">
              <p className="text-white font-bold text-base mb-2">Enter a Prompt</p>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-3 py-2 text-white/60 text-sm">Type your feelings here...</div>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
          className="relative rounded-3xl overflow-hidden h-28 cursor-pointer"
          onClick={() => setStep("emotions")}>
          <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-fuchsia-600/60 to-rose-900/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl text-white font-semibold text-sm">
              Select from Options <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}
          className="relative rounded-3xl overflow-hidden h-28 cursor-pointer"
          onClick={() => navigate("/EmotionSelect")}>
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/60 to-orange-900/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-white font-bold text-base">Select from Images</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}