import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface MoodEntry {
  mood_type: string;
  created_at: string;
}

const Insights = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetch = async () => {
      const { data } = await supabase
        .from("mood_entries")
        .select("mood_type, created_at")
        .order("created_at", { ascending: false });
      setEntries((data as MoodEntry[]) || []);
      setLoading(false);
    };
    fetch();
  }, [user]);

  if (loading) {
    return <div className="pt-12 text-center text-muted-foreground">Loading...</div>;
  }

  const total = entries.length;
  const counts: Record<string, number> = { happy: 0, motivated: 0, confident: 0, neutral: 0, anxious: 0, lazy: 0, sad: 0 };
  entries.forEach((e) => {
    if (e.mood_type in counts) counts[e.mood_type]++;
  });

  const moodData = [
    { key: "happy", emoji: "😊", label: "Happy", count: counts.happy, color: "bg-accent" },
    { key: "motivated", emoji: "🔥", label: "Motivated", count: counts.motivated, color: "bg-orange-400" },
    { key: "confident", emoji: "💪", label: "Confident", count: counts.confident, color: "bg-emerald-400" },
    { key: "neutral", emoji: "😐", label: "Neutral", count: counts.neutral, color: "bg-muted-foreground/30" },
    { key: "anxious", emoji: "😰", label: "Anxious", count: counts.anxious, color: "bg-yellow-400" },
    { key: "lazy", emoji: "😴", label: "Lazy", count: counts.lazy, color: "bg-indigo-300" },
    { key: "sad", emoji: "😢", label: "Sad", count: counts.sad, color: "bg-primary/40" },
  ];

  // Last 7 entries as a simple streak
  const recent = entries.slice(0, 7);

  return (
    <div className="space-y-6 pt-4">
      <h1 className="text-2xl font-bold text-foreground">Insights</h1>

      {total === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          <span className="text-3xl block mb-2">📊</span>
          <p className="text-muted-foreground">Log some moods to see your insights!</p>
        </div>
      ) : (
        <>
          {/* Summary */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-semibold text-foreground">Mood Breakdown</h2>
            <p className="text-sm text-muted-foreground">{total} total entries</p>
            <div className="space-y-3">
              {moodData.map((m) => {
                const pct = total > 0 ? Math.round((m.count / total) * 100) : 0;
                return (
                  <div key={m.key} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        {m.emoji} {m.label}
                      </span>
                      <span className="text-muted-foreground">
                        {m.count} ({pct}%)
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={`h-full rounded-full ${m.color} transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent streak */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
            <h2 className="font-semibold text-foreground">Recent Moods</h2>
            <div className="flex gap-2 justify-center">
              {recent.map((e, i) => (
                <div key={i} className="flex flex-col items-center gap-1">
                  <span className="text-2xl">
                    {{ happy: "😊", sad: "😢", neutral: "😐", motivated: "🔥", lazy: "😴", anxious: "😰", confident: "💪" }[e.mood_type] || "😐"}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(e.created_at).toLocaleDateString("en", { weekday: "short" })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Insights;
