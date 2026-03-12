import type { AirQuality, UvIndex } from "../types/weather";

interface AirHealthCardsProps {
  airQuality: AirQuality | null;
  uv: UvIndex | null;
}

const AirHealthCards = ({ airQuality, uv }: AirHealthCardsProps) => {
  if (!airQuality && !uv) return null;

  return (
    <section className="mt-4 grid gap-3 md:grid-cols-2">
      {airQuality && (
        <div className="rounded-2xl border surface-border surface p-3 text-xs">
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Air quality
          </h3>
          <p className="mt-2 text-sm font-semibold">
            AQI {airQuality.aqi} · {airQuality.description}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">{airQuality.advice}</p>
        </div>
      )}

      {uv && (
        <div className="rounded-2xl border surface-border surface p-3 text-xs">
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">UV</h3>
          <p className="mt-2 text-sm font-semibold">
            Index {uv.value.toFixed(1)} · {uv.category}
          </p>
          <p className="mt-1 text-[11px] text-slate-400">{uv.advice}</p>
        </div>
      )}
    </section>
  );
};

export { AirHealthCards };

