import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

interface MoodEntry {
  id: string;
  mood_type: string;
  reason: string | null;
  created_at: string;
}

const moodEmoji: Record<string, string> = {
  happy: "😊",
  neutral: "😐",
  sad: "😢",
  motivated: "🔥",
  lazy: "😴",
  anxious: "😰",
  confident: "💪",
};

const History = () => {
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const fetchEntries = async () => {
      const { data } = await supabase
        .from("mood_entries")
        .select("*")
        .order("created_at", { ascending: false });
      setEntries((data as MoodEntry[]) || []);
      setLoading(false);
    };
    fetchEntries();
  }, [user]);

  const handleDelete = async (id: string) => {
    await supabase.from("mood_entries").delete().eq("id", id);
    setEntries((prev) => prev.filter((e) => e.id !== id));
  };

  if (loading) {
    return <div className="pt-12 text-center text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="space-y-4 pt-4">
      <h1 className="text-2xl font-bold text-foreground">Your Entries</h1>

      {entries.length === 0 ? (
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          <span className="text-3xl block mb-2">📝</span>
          <p className="text-muted-foreground">No entries yet. Start logging your mood!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="bg-card rounded-xl border border-border p-4 flex items-start gap-3"
            >
              <span className="text-3xl">{moodEmoji[entry.mood_type] || "😐"}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground capitalize">{entry.mood_type}</span>
                  <span className="text-xs text-muted-foreground">
                    {format(new Date(entry.created_at), "MMM d, h:mm a")}
                  </span>
                </div>
                {entry.reason && (
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{entry.reason}</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(entry.id)}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors shrink-0"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
