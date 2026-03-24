import { useNavigate } from "react-router-dom";
import { ChevronLeft, BookOpen, Brain, Heart, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const articles = [
  {
    title: "Understanding Your Emotions",
    subtitle: "Learn to identify and name what you feel",
    icon: Heart,
    color: "bg-red-50",
    iconColor: "text-red-400",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80",
  },
  {
    title: "The Science of Art Therapy",
    subtitle: "How visual expression heals the mind",
    icon: Brain,
    color: "bg-purple-50",
    iconColor: "text-purple-400",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80",
  },
  {
    title: "Mindfulness Through Creativity",
    subtitle: "Stay present with creative expression",
    icon: Sparkles,
    color: "bg-yellow-50",
    iconColor: "text-yellow-400",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
  },
  {
    title: "Building Emotional Resilience",
    subtitle: "Tools for navigating difficult feelings",
    icon: BookOpen,
    color: "bg-blue-50",
    iconColor: "text-blue-400",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&q=80",
  },
];

export default function Learn() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 max-w-md mx-auto flex flex-col">
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <button onClick={() => navigate("/Home")} className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <span className="font-bold text-white">Learn</span>
        <div className="w-9" />
      </div>

      <div className="flex-1 px-4 pb-4 space-y-3">
        <p className="text-sm text-white/40 mb-4">Explore resources to deepen your emotional awareness.</p>
        {articles.map((article, i) => (
          <motion.div
            key={i}
            initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ delay: i * 0.07 }}
            className="rounded-2xl overflow-hidden flex gap-3 p-4 bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
          >
            <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
              <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <article.icon className={`w-4 h-4 ${article.iconColor} mb-1`} />
              <p className="text-sm font-semibold text-white/80">{article.title}</p>
              <p className="text-xs text-white/40 mt-1">{article.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}