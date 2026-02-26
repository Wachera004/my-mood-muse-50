import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuth();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8 pt-8">
      <div className="text-center space-y-3">
        <span className="text-5xl">🌤️</span>
        <h1 className="text-2xl font-bold text-foreground">{greeting}!</h1>
        <p className="text-muted-foreground">How are you feeling today?</p>
      </div>

      <Link
        to="/log"
        className="block bg-card rounded-2xl shadow-lg border border-border p-6 text-center hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        <span className="text-4xl block mb-3">✏️</span>
        <h2 className="font-semibold text-foreground">Log Your Mood</h2>
        <p className="text-sm text-muted-foreground mt-1">Take a moment to check in</p>
      </Link>

      <div className="grid grid-cols-2 gap-4">
        <Link
          to="/history"
          className="bg-card rounded-2xl shadow border border-border p-5 text-center hover:shadow-lg transition-all hover:scale-[1.02]"
        >
          <span className="text-2xl block mb-2">📋</span>
          <h3 className="text-sm font-medium text-foreground">History</h3>
        </Link>
        <Link
          to="/insights"
          className="bg-card rounded-2xl shadow border border-border p-5 text-center hover:shadow-lg transition-all hover:scale-[1.02]"
        >
          <span className="text-2xl block mb-2">📊</span>
          <h3 className="text-sm font-medium text-foreground">Insights</h3>
        </Link>
      </div>

      <p className="text-center text-xs text-muted-foreground">
        Your feelings are valid 💛
      </p>
    </div>
  );
};

export default Home;
