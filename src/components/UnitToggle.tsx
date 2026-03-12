import type { TemperatureUnit } from "../types/weather";

interface UnitToggleProps {
  value: TemperatureUnit;
  onChange: (unit: TemperatureUnit) => void;
}

const UnitToggle = ({ value, onChange }: UnitToggleProps) => {
  return (
    <div className="inline-flex items-center rounded-full border surface-border surface-soft p-0.5 text-[11px] text-slate-500">
      <button
        type="button"
        onClick={() => onChange("metric")}
        className={`px-2 py-1 rounded-full ${
          value === "metric"
            ? "bg-sky-500 text-white"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        °C
      </button>
      <button
        type="button"
        onClick={() => onChange("imperial")}
        className={`px-2 py-1 rounded-full ${
          value === "imperial"
            ? "bg-sky-500 text-white"
            : "text-slate-500 hover:text-slate-700"
        }`}
      >
        °F
      </button>
    </div>
  );
};

export { UnitToggle };

