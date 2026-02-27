import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

type Mood = "sad" | "neutral" | "happy" | "motivated" | "lazy" | "anxious" | "confident";

const moods = [
  { key: "happy" as const, emoji: "😊", label: "Happy" },
  { key: "motivated" as const, emoji: "🔥", label: "Motivated" },
  { key: "confident" as const, emoji: "💪", label: "Confident" },
  { key: "neutral" as const, emoji: "😐", label: "Neutral" },
  { key: "anxious" as const, emoji: "😰", label: "Anxious" },
  { key: "lazy" as const, emoji: "😴", label: "Lazy" },
  { key: "sad" as const, emoji: "😢", label: "Sad" },
];

const LogMood = () => {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [reason, setReason] = useState("");
  const [saving, setSaving] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSave = async () => {
    if (!selectedMood || !user) return;
    setSaving(true);

    const { error } = await supabase.from("mood_entries").insert({
      user_id: user.id,
      mood_type: selectedMood,
      reason: reason.trim() || null,
    });

    setSaving(false);
    if (!error) {
      navigate("/history");
    }
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-bold text-foreground">How are you feeling?</h1>
        <p className="text-sm text-muted-foreground">Take a moment to check in</p>
      </div>

      <div className="bg-card rounded-2xl shadow-lg border border-border p-6 space-y-6">
        {/* Emoji Selection */}
        <div className="grid grid-cols-4 gap-3 justify-items-center">
          {moods.map((mood) => {
            const isSelected = selectedMood === mood.key;
            return (
              <button
                key={mood.key}
                onClick={() => setSelectedMood(mood.key)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-primary/10 ring-2 ring-primary scale-110"
                    : "hover:bg-secondary hover:scale-105"
                }`}
              >
                <span className={`text-5xl ${isSelected ? "animate-bounce-soft" : ""}`}>
                  {mood.emoji}
                </span>
                <span className={`text-sm font-medium ${isSelected ? "text-foreground" : "text-muted-foreground"}`}>
                  {mood.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Reason */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">What's on your mind?</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Tell me more about how you're feeling..."
            rows={4}
            className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all resize-none"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!selectedMood || saving}
          className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
            selectedMood
              ? "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]"
              : "bg-muted text-muted-foreground cursor-not-allowed"
          }`}
        >
          {saving ? "Saving..." : "Save Entry"}
        </button>
      </div>
    </div>
  );
};

export default LogMood;
