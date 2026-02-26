import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const navItems = [
  { path: "/", label: "Home", emoji: "🏠" },
  { path: "/log", label: "Log", emoji: "✏️" },
  { path: "/history", label: "History", emoji: "📋" },
  { path: "/insights", label: "Insights", emoji: "📊" },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const { signOut, user } = useAuth();
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-bold text-foreground flex items-center gap-2">
            🌤️ MoodFlow
          </span>
          <button
            onClick={signOut}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="border-t border-border bg-card/80 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-lg mx-auto flex">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex-1 flex flex-col items-center gap-1 py-3 text-xs transition-colors ${
                  isActive ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="text-lg">{item.emoji}</span>
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default AppLayout;
