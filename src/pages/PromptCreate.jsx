import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronDown, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const STYLE_OPTIONS = ["Abstract", "Photorealistic", "Painterly", "Minimalist", "Surreal", "Watercolor"];

export default function PromptCreate() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("");
  const [styleOpen, setStyleOpen] = useState(false);
  const [additionalPrompt, setAdditionalPrompt] = useState("");

  return (
    <div className="min-h-screen bg-gray-950 max-w-md mx-auto flex flex-col">
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <button onClick={() => navigate("/Create")} className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <div className="relative">
          <button
            onClick={() => setStyleOpen(!styleOpen)}
            className="flex items-center gap-1 px-3 py-1.5 border border-white/20 rounded-full text-sm text-white/80 bg-white/10 backdrop-blur-sm"
          >
            {style || "Style"} <ChevronDown className="w-3 h-3" />
          </button>
          {styleOpen && (
            <div className="absolute z-10 top-9 right-0 bg-gray-900 border border-white/10 rounded-xl shadow-2xl p-1 min-w-[140px]">
              {STYLE_OPTIONS.map((o) => (
                <button key={o} onClick={() => { setStyle(o); setStyleOpen(false); }}
                  className="w-full text-left px-3 py-2 text-sm text-white/80 hover:bg-white/10 rounded-lg">{o}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 p-5 flex flex-col">
        <p className="text-white/50 text-sm text-center mb-8">
          Type any emotions, symbols, or feelings that come to mind.
        </p>

        <div className="mt-auto space-y-4">
          <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} className="relative">
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="a lion defending his land, teeth bared, wind blowing his proud mane"
              className="resize-none text-sm min-h-[100px] pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-2xl"
            />
            <button
              onClick={() => prompt && navigate("/Response", { state: { prompt } })}
              className="absolute right-3 bottom-3 w-8 h-8 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full flex items-center justify-center shadow-lg"
            >
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </motion.div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-3">
            <p className="text-sm font-semibold text-white/70">Preview</p>
            <p className="text-sm text-white/40">{prompt || "a lion defending his land, teeth bared, wind blowing his proud mane"}</p>

            <p className="text-sm font-semibold text-white/70 mt-3">Additional Prompt</p>
            <div className="relative">
              <Textarea
                value={additionalPrompt}
                onChange={(e) => setAdditionalPrompt(e.target.value)}
                placeholder="Modify the existing image by typing in what changes to make."
                className="resize-none text-sm min-h-[60px] bg-white/10 border-white/20 text-white placeholder:text-white/30 rounded-xl"
              />
            </div>
          </div>

          <Button
            onClick={() => navigate("/Response", { state: { prompt } })}
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white py-3 rounded-2xl font-semibold border-0"
          >
            Generate
          </Button>
        </div>
      </div>
    </div>
  );
}