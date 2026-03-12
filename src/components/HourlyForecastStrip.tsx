import type { HourlyForecast, TemperatureUnit } from "../types/weather";

const unitSymbol: Record<TemperatureUnit, string> = {
  metric: "°C",
  imperial: "°F",
};

interface HourlyForecastStripProps {
  forecast: HourlyForecast;
  unit: TemperatureUnit;
}

function formatHour(timestamp: number, timezoneOffsetSeconds?: number) {
  const offsetMs = (timezoneOffsetSeconds ?? 0) * 1000;
  const date = new Date(timestamp * 1000 + offsetMs);
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

const HourlyForecastStrip = ({ forecast, unit }: HourlyForecastStripProps) => {
  const symbol = unitSymbol[unit];

  if (!forecast.points.length) return null;

  return (
    <section className="mt-6">
      <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
        Next hours
      </h3>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {forecast.points.map((point) => (
          <div
            key={point.timestamp}
            className="min-w-[80px] rounded-xl border surface-border surface-soft px-3 py-2 text-center text-xs"
          >
            <p className="text-[11px] text-slate-500">{formatHour(point.timestamp)}</p>
            <p className="mt-1 text-sm font-semibold">
              {Math.round(point.temperature)}
              <span className="ml-0.5 text-[11px] text-slate-500">{symbol}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { HourlyForecastStrip };

