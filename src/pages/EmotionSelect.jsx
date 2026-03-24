import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronDown, ImageIcon, Type, Palette, Smile } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const EMOTION_IMAGES = [];

const CATEGORIES = ["All", "Joy", "Sadness", "Anger", "Fear", "Calm", "Hope"];

export default function EmotionSelect() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);
  const [category, setCategory] = useState("All");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Images");

  const tabs = [
    { name: "Images", icon: ImageIcon },
    { name: "Stickers", icon: Smile },
    { name: "Words", icon: Type },
    { name: "Colors", icon: Palette },
  ];

  return (
    <div className="min-h-screen bg-gray-950 max-w-md mx-auto flex flex-col">
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <button onClick={() => navigate("/Create")} className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <span className="font-bold text-white">Emotions</span>
        <div className="relative">
          <button
            onClick={() => setCategoryOpen(!categoryOpen)}
            className="flex items-center gap-1 px-3 py-1.5 border border-white/20 rounded-full text-sm text-white/70 bg-white/10"
          >
            {category} <ChevronDown className="w-3 h-3" />
          </button>
          {categoryOpen && (
            <div className="absolute z-10 top-9 right-0 bg-gray-900 border border-white/10 rounded-xl shadow-2xl p-1 min-w-[130px]">
              {CATEGORIES.map((c) => (
                <button key={c} onClick={() => { setCategory(c); setCategoryOpen(false); }}
                  className="w-full text-left px-3 py-2 text-sm text-white/70 hover:bg-white/10 rounded-lg">{c}</button>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="px-5 py-2 text-sm text-white/40">Select an image that resonates with how you are feeling.</p>

      <div className="flex-1 px-4 pb-4">
        <div className="flex flex-col items-center justify-center h-48 text-white/20">
          <ImageIcon className="w-12 h-12 mb-3 opacity-40" />
          <p className="text-sm">No images available</p>
          <p className="text-xs mt-1">Use options or prompt instead</p>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-2 flex justify-around">
        {tabs.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => setActiveTab(name)}
            className={`flex flex-col items-center gap-1 px-3 py-1 text-xs ${
              activeTab === name ? "text-violet-400" : "text-white/30"
            }`}
          >
            <Icon className="w-5 h-5" />
            {name}
          </button>
        ))}
      </div>

      <div className="px-4 pb-4 flex gap-2">
        <Button variant="outline" className="flex-1 rounded-2xl bg-white/5 border-white/10 text-white/70">Add</Button>
        <Button variant="outline" className="flex-1 rounded-2xl bg-white/5 border-white/10 text-white/70">Generate</Button>
        <Button
          className="flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-2xl border-0"
          onClick={() => navigate("/Response", { state: { prompt: "emotional artwork", fromImage: true } })}
        >
          Reflect
        </Button>
      </div>
    </div>
  );
}