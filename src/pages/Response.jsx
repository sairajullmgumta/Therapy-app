import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ChevronLeft, RefreshCw, Edit2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

const GENERATED_IMAGES = [
  "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
  "https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=800&q=80",
  "https://images.unsplash.com/photo-1504700610630-ac6aba3536d3?w=800&q=80",
  "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
];

export default function Response() {
  const navigate = useNavigate();
  const location = useLocation();
  const prompt = location.state?.prompt || "emotional abstract art";

  const [selectedImage, setSelectedImage] = useState(0);
  const [images, setImages] = useState(GENERATED_IMAGES);
  const [insights, setInsights] = useState("");
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(false);
  const [editedPrompt, setEditedPrompt] = useState(prompt);

  useEffect(() => {
    generateInsights();
  }, []);

  const generateInsights = async () => {
    setLoadingInsights(true);
    const res = await base44.integrations.Core.InvokeLLM({
      prompt: `An AI image was generated based on this emotional prompt: "${prompt}". Write 3-4 sentences of psychological and emotional insight about what this imagery might symbolize for the person who created it. Be empathetic, reflective, and insightful.`
    });
    setInsights(res);
    setLoadingInsights(false);
  };

  const handleSave = async () => {
    setSaving(true);
    await base44.entities.Reflection.create({
      prompt: editedPrompt,
      image_url: images[selectedImage],
      insights,
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
        <span className="font-bold text-white">Response</span>
        <button onClick={generateInsights} className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
          <RefreshCw className="w-4 h-4 text-white/70" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-white/50">Select an image</p>
            <button onClick={generateInsights} className="text-xs text-violet-400 border border-violet-400/30 rounded-full px-3 py-1">Regenerate</button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`rounded-2xl overflow-hidden aspect-square border-2 transition-all ${
                  selectedImage === i ? "border-violet-500 shadow-lg shadow-violet-500/20" : "border-transparent"
                }`}
              >
                <img src={img} alt="generated" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="rounded-3xl overflow-hidden">
          <img src={images[selectedImage]} className="w-full aspect-video object-cover" />
        </motion.div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm font-semibold text-white/70">Prompt</p>
            <button onClick={() => setEditingPrompt(!editingPrompt)} className="text-violet-400 text-xs flex items-center gap-1">
              <Edit2 className="w-3 h-3" /> Edit
            </button>
          </div>
          {editingPrompt ? (
            <input
              value={editedPrompt}
              onChange={(e) => setEditedPrompt(e.target.value)}
              className="w-full text-sm text-white bg-white/10 border border-white/20 rounded-xl px-3 py-2 outline-none"
            />
          ) : (
            <p className="text-sm text-white/40">{editedPrompt}</p>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-sm font-semibold text-white/70 mb-2">Insights</p>
          {loadingInsights ? (
            <div className="space-y-2">
              {[1,2,3].map(i => <div key={i} className="h-3 bg-white/10 rounded animate-pulse" />)}
            </div>
          ) : (
            <p className="text-sm text-white/50 leading-relaxed">{insights}</p>
          )}
        </div>
      </div>

      <div className="p-4 space-y-2">
        <Button
          className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white py-3 rounded-2xl font-semibold border-0"
          onClick={() => navigate("/Reflect", { state: { prompt: editedPrompt, image_url: images[selectedImage], insights } })}
        >
          Reflect
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" className="rounded-2xl bg-white/5 border-white/10 text-white/70 hover:bg-white/10" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
          <Button variant="outline" className="rounded-2xl bg-white/5 border-white/10 text-white/70 hover:bg-white/10" onClick={generateInsights}>Regenerate</Button>
        </div>
      </div>
    </div>
  );
}