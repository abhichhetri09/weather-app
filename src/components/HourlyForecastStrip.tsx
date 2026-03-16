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

function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toDateString();
}

function iconUrl(code: string) {
  return `https://openweathermap.org/img/wn/${code}@2x.png`;
}

const HourlyForecastStrip = ({ forecast, unit }: HourlyForecastStripProps) => {
  const symbol = unitSymbol[unit];
  console.log(forecast);

  if (!forecast.points.length) return null;

  return (
    <section className="mt-6 surface-border surface-soft rounded-2xl p-3">
      <h3 className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
        Next hours
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {forecast.points.map((point) => (
          <div
            key={point.timestamp}
            className="min-w-[96px] rounded-2xl border surface-border surface-soft px-3 py-3 text-center text-xs shadow-sm"
          >
            <p className="text-[11px] text-slate-500">
              {formatHour(point.timestamp)}
            </p>
            <p className="text-[11px] text-slate-500">
              {formatDate(point.timestamp)}
            </p>
            <div className="mt-1 flex items-center justify-center">
              <img
                src={iconUrl(point.iconCode)}
                alt=""
                className="h-8 w-8"
                loading="lazy"
              />
            </div>
            <p className="mt-1 text-sm font-semibold">
              {Math.round(point.temperature)}
              <span className="ml-0.5 text-[11px] text-slate-500">
                {symbol}
              </span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export { HourlyForecastStrip };
