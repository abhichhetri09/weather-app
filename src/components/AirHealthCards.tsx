import type { AirQuality } from "../types/weather";

interface AirHealthCardsProps {
  airQuality: AirQuality | null;
}

const AirHealthCards = ({ airQuality }: AirHealthCardsProps) => {
  if (!airQuality) return null;

  return (
    <section className="mt-4 grid gap-3 md:grid-cols-2">
      <div className="rounded-2xl border surface-border surface p-3 text-xs">
        <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
          Air quality
        </h3>
        <p className="mt-2 text-sm font-semibold">
          AQI {airQuality.aqi} · {airQuality.description}
        </p>
        <p className="mt-1 text-[11px] text-slate-400">{airQuality.advice}</p>
      </div>
    </section>
  );
};

export { AirHealthCards };

