import { Moon, Sun } from "lucide-react";
import useThemeStore from "../store/themeStore";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="w-full flex items-center justify-center gap-3 px-4 py-2 rounded-xl message-bar text-main transition-all hover:opacity-90"
      aria-label="Toggle dark mode"
    >
      <span className="text-sm font-medium">
        Dark Mode: {isDark ? "ON" : "OFF"}
      </span>

      <div
        className={`relative w-12 h-6 rounded-full transition-colors duration-300
          ${isDark ? "bg-primary" : "bg-(--text-faint)"}`}
      >
        <div
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white flex items-center justify-center transition-transform duration-300 cursor-pointer shadow-sm
            ${isDark ? "translate-x-6" : "translate-x-0"}`}
        >
          <div className="text-(--primary-color)">
            {isDark ? <Moon size={12} /> : <Sun size={12} />}
          </div>
        </div>
      </div>
    </button>
  );
}
