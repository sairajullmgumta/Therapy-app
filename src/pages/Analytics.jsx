import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, TrendingUp, Calendar, BarChart2 } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { base44 } from "@/api/base44Client";
import { format, subDays, parseISO, startOfWeek, getDay } from "date-fns";

const EMOTION_COLORS = {
  joy: "#facc15",
  calm: "#38bdf8",
  anxiety: "#f87171",
  sadness: "#818cf8",
  anger: "#fb923c",
  hope: "#34d399",
  love: "#f472b6",
  fear: "#a78bfa",
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEKS = 10;

function buildHeatmap(reflections) {
  // Count reflections per day for last 10 weeks
  const counts = {};
  reflections.forEach((r) => {
    const d = format(new Date(r.created_date), "yyyy-MM-dd");
    counts[d] = (counts[d] || 0) + 1;
  });

  const today = new Date();
  const cells = [];
  for (let w = WEEKS - 1; w >= 0; w--) {
    const week = [];
    for (let d = 0; d < 7; d++) {
      const date = subDays(today, w * 7 + (6 - d));
      const key = format(date, "yyyy-MM-dd");
      week.push({ date: key, count: counts[key] || 0 });
    }
    cells.push(week);
  }
  return cells;
}

function buildTrend(reflections) {
  // Group emotion tags by week, count occurrences
  const byDate = {};
  reflections.forEach((r) => {
    const d = format(new Date(r.created_date), "MMM d");
    if (!byDate[d]) byDate[d] = { date: d };
    (r.emotion_tags || []).forEach((tag) => {
      const key = tag.toLowerCase();
      byDate[d][key] = (byDate[d][key] || 0) + 1;
    });
  });
  return Object.values(byDate).slice(-14);
}

function buildTopEmotions(reflections) {
  const counts = {};
  reflections.forEach((r) => {
    (r.emotion_tags || []).forEach((tag) => {
      const k = tag.toLowerCase();
      counts[k] = (counts[k] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);
}

const heatColor = (count) => {
  if (count === 0) return "bg-white/5";
  if (count === 1) return "bg-violet-800/60";
  if (count === 2) return "bg-violet-600/80";
  return "bg-violet-400";
};

export default function Analytics() {
  const navigate = useNavigate();
  const [reflections, setReflections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Reflection.list("-created_date", 200).then((data) => {
      setReflections(data);
      setLoading(false);
    });
  }, []);

  const heatmap = buildHeatmap(reflections);
  const trendData = buildTrend(reflections);
  const topEmotions = buildTopEmotions(reflections);

  // Pick top 3 emotions for trend lines
  const trendEmotions = topEmotions.slice(0, 3).map(([e]) => e);

  return (
    <div className="min-h-screen bg-gray-950 max-w-md mx-auto flex flex-col">
      <div className="flex items-center justify-between px-5 pt-10 pb-4">
        <button onClick={() => navigate("/Home")} className="w-9 h-9 rounded-2xl bg-white/10 flex items-center justify-center">
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <span className="font-bold text-white">Emotional Analytics</span>
        <div className="w-9" />
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-violet-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : reflections.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-white/30 px-6 text-center">
          <BarChart2 className="w-12 h-12 mb-3 opacity-40" />
          <p className="font-medium">No data yet</p>
          <p className="text-xs mt-1">Start creating reflections to see your emotional trends.</p>
        </div>
      ) : (
        <div className="flex-1 px-4 pb-8 space-y-6">

          {/* Summary pills */}
          <motion.div initial={{ opacity:0,y:10 }} animate={{ opacity:1,y:0 }} className="flex gap-2 flex-wrap">
            {topEmotions.map(([emotion, count]) => (
              <div key={emotion} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/10">
                <div className="w-2 h-2 rounded-full" style={{ background: EMOTION_COLORS[emotion] || "#a78bfa" }} />
                <span className="text-white/70 text-xs capitalize">{emotion}</span>
                <span className="text-white/30 text-xs">×{count}</span>
              </div>
            ))}
          </motion.div>

          {/* Trend Line Chart */}
          <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.08 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-4 h-4 text-violet-400" />
              <p className="text-white/80 font-semibold text-sm">Emotion Trend</p>
              <span className="text-white/30 text-xs ml-auto">Last 14 entries</span>
            </div>
            {trendData.length > 1 ? (
              <>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={trendData} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff0a" />
                    <XAxis dataKey="date" tick={{ fill: "#ffffff33", fontSize: 10 }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fill: "#ffffff33", fontSize: 10 }} tickLine={false} axisLine={false} />
                    <Tooltip
                      contentStyle={{ background: "#1a1a2e", border: "1px solid #ffffff20", borderRadius: 12, fontSize: 12 }}
                      labelStyle={{ color: "#ffffff80" }}
                    />
                    {trendEmotions.map((emotion) => (
                      <Line
                        key={emotion}
                        type="monotone"
                        dataKey={emotion}
                        stroke={EMOTION_COLORS[emotion] || "#a78bfa"}
                        strokeWidth={2}
                        dot={{ r: 3, fill: EMOTION_COLORS[emotion] || "#a78bfa" }}
                        activeDot={{ r: 5 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
                <div className="flex gap-3 mt-2 flex-wrap">
                  {trendEmotions.map((e) => (
                    <div key={e} className="flex items-center gap-1">
                      <div className="w-3 h-0.5 rounded" style={{ background: EMOTION_COLORS[e] || "#a78bfa" }} />
                      <span className="text-white/40 text-xs capitalize">{e}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-white/30 text-xs text-center py-8">Add more reflections to see trends.</p>
            )}
          </motion.div>

          {/* Activity Heatmap */}
          <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.16 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-4">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-4 h-4 text-fuchsia-400" />
              <p className="text-white/80 font-semibold text-sm">Activity Heatmap</p>
              <span className="text-white/30 text-xs ml-auto">Last 10 weeks</span>
            </div>

            {/* Day labels */}
            <div className="flex gap-1.5 mb-1 pl-0">
              <div className="w-5" />
              {DAYS.map((d) => (
                <div key={d} className="flex-1 text-center text-white/20 text-[9px]">{d[0]}</div>
              ))}
            </div>

            {/* Grid — rotated: columns = weeks, rows = days */}
            <div className="flex gap-1.5">
              {heatmap.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1.5 flex-1">
                  {week.map((cell, di) => (
                    <div
                      key={di}
                      title={`${cell.date}: ${cell.count} reflection${cell.count !== 1 ? "s" : ""}`}
                      className={`w-full aspect-square rounded-sm ${heatColor(cell.count)}`}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-1.5 mt-3">
              <span className="text-white/20 text-[10px]">Less</span>
              {[0, 1, 2, 3].map((v) => (
                <div key={v} className={`w-3 h-3 rounded-sm ${heatColor(v)}`} />
              ))}
              <span className="text-white/20 text-[10px]">More</span>
            </div>
          </motion.div>

          {/* Total count */}
          <motion.div initial={{ opacity:0,y:12 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.22 }}
            className="flex gap-3">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-white">{reflections.length}</p>
              <p className="text-white/40 text-xs mt-1">Total Reflections</p>
            </div>
            <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-violet-300">{topEmotions.length}</p>
              <p className="text-white/40 text-xs mt-1">Emotions Tracked</p>
            </div>
          </motion.div>

        </div>
      )}
    </div>
  );
}