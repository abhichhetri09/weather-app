import type { NearbyCities as NearbyCitiesModel, TemperatureUnit } from "../types/weather";

const unitSymbol: Record<TemperatureUnit, string> = {
  metric: "°C",
  imperial: "°F",
};

interface NearbyCitiesProps {
  nearby: NearbyCitiesModel;
  unit: TemperatureUnit;
  onSelect: (city: string) => void | Promise<void>;
}

const NearbyCities = ({ nearby, unit, onSelect }: NearbyCitiesProps) => {
  if (!nearby.cities.length) return null;

  const symbol = unitSymbol[unit];

  return (
    <section className="rounded-2xl border surface-border surface p-3">
      <h3 className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
        Nearby cities
      </h3>
      <div className="grid gap-2 text-xs md:grid-cols-2">
        {nearby.cities.map((city) => (
          <button
            key={city.id}
            type="button"
            onClick={() => onSelect(city.name)}
            className="flex items-center justify-between rounded-xl border surface-border surface-soft px-3 py-2 text-left hover:opacity-80 transition-colors"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium">{city.name}</span>
              {city.country && (
                <span className="text-[11px] text-slate-500">{city.country}</span>
              )}
            </div>
            <div className="text-right">
              <span className="text-sm font-semibold">
                {Math.round(city.temperature)}
                <span className="ml-0.5 text-[11px] text-slate-400">{symbol}</span>
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export { NearbyCities };

