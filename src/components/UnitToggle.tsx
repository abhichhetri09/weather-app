import type { TemperatureUnit } from "../types/weather";

interface UnitToggleProps {
  value: TemperatureUnit;
  onChange: (unit: TemperatureUnit) => void;
}

const UnitToggle = ({ value, onChange }: UnitToggleProps) => {
  return (
    <div className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 p-0.5 text-[11px] text-slate-300">
      <button
        type="button"
        onClick={() => onChange("metric")}
        className={`px-2 py-1 rounded-full ${
          value === "metric" ? "bg-slate-100 text-slate-900" : "hover:text-slate-100"
        }`}
      >
        °C
      </button>
      <button
        type="button"
        onClick={() => onChange("imperial")}
        className={`px-2 py-1 rounded-full ${
          value === "imperial" ? "bg-slate-100 text-slate-900" : "hover:text-slate-100"
        }`}
      >
        °F
      </button>
    </div>
  );
};

export { UnitToggle };

