import { useState } from "react";

type Mood = "sad" | "neutral" | "happy" | "motivated" | "lazy" | "anxious" | "confident" | null;

const moods = [
  { key: "happy" as const, emoji: "😊", label: "Happy", color: "mood-happy" },
  { key: "motivated" as const, emoji: "🔥", label: "Motivated", color: "mood-motivated" },
  { key: "confident" as const, emoji: "💪", label: "Confident", color: "mood-confident" },
  { key: "neutral" as const, emoji: "😐", label: "Neutral", color: "mood-neutral" },
  { key: "anxious" as const, emoji: "😰", label: "Anxious", color: "mood-anxious" },
  { key: "lazy" as const, emoji: "😴", label: "Lazy", color: "mood-lazy" },
  { key: "sad" as const, emoji: "😢", label: "Sad", color: "mood-sad" },
];

const MoodSelector = () => {
  const [selectedMood, setSelectedMood] = useState<Mood>(null);
  const [reason, setReason] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!selectedMood) return;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    setSelectedMood(null);
    setReason("");
    setSaved(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            How are you feeling?
          </h1>
          <p className="text-muted-foreground">
            Take a moment to check in with yourself
          </p>
        </div>

        {/* Mood Card */}
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8 space-y-8">
          {/* Emoji Selection */}
          <div className="flex justify-center gap-6">
            {moods.map((mood) => {
              const isSelected = selectedMood === mood.key;
              return (
                <button
                  key={mood.key}
                  onClick={() => setSelectedMood(mood.key)}
                  className={`
                    flex flex-col items-center gap-2 p-4 rounded-2xl transition-all duration-200 cursor-pointer
                    ${isSelected
                      ? `bg-${mood.color}/20 ring-2 ring-${mood.color} scale-110`
                      : "hover:bg-secondary hover:scale-105"
                    }
                  `}
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

          {/* Reason Input */}
          <div className="space-y-3">
            <label htmlFor="reason" className="block text-sm font-medium text-foreground">
              What's on your mind?
            </label>
            <textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Tell me more about how you're feeling..."
              rows={4}
              className="w-full rounded-xl border border-input bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all duration-200 resize-none"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={!selectedMood}
              className={`
                flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-200
                ${selectedMood
                  ? "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98]"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
                }
              `}
            >
              {saved ? "✓ Saved!" : "Save Entry"}
            </button>
            {(selectedMood || reason) && (
              <button
                onClick={handleReset}
                className="py-3 px-5 rounded-xl font-medium border border-border text-muted-foreground hover:bg-secondary transition-all duration-200"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground">
          Your feelings are valid 💛
        </p>
      </div>
    </div>
  );
};

export default MoodSelector;
