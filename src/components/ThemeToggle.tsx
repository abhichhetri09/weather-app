import { useTheme } from "../hooks/useTheme";

const ThemeToggle = () => {
  const { mode, setMode } = useTheme();

  return (
    <div className="inline-flex items-center rounded-full border surface-border surface-soft p-0.5 text-[11px] text-slate-500">
      <button
        type="button"
        onClick={() => setMode("light")}
        className={`px-2 py-1 rounded-full ${
          mode === "light" ? "bg-slate-100 text-slate-900" : "hover:text-slate-100"
        }`}
      >
        Light
      </button>
      <button
        type="button"
        onClick={() => setMode("dark")}
        className={`px-2 py-1 rounded-full ${
          mode === "dark" ? "bg-slate-100 text-slate-900" : "hover:text-slate-100"
        }`}
      >
        Dark
      </button>
      <button
        type="button"
        onClick={() => setMode("system")}
        className={`px-2 py-1 rounded-full ${
          mode === "system" ? "bg-slate-100 text-slate-900" : "hover:text-slate-100"
        }`}
      >
        Auto
      </button>
    </div>
  );
};

export { ThemeToggle };

