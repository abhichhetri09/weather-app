import type { CurrentWeather } from "../types/weather";

interface MapViewProps {
  weather: CurrentWeather;
}

const MapView = ({ weather }: MapViewProps) => {
  if (weather.lat == null || weather.lon == null) return null;

  const lat = weather.lat;
  const lon = weather.lon;
  const marker = `${lat},${lon}`;
  const zoom = 10;

  const embedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.2},${
    lat - 0.2
  },${lon + 0.2},${lat + 0.2}&layer=mapnik&marker=${marker}`;
  const viewUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=${zoom}/${lat}/${lon}`;

  return (
    <section className="w-full h-full">
      <div className="h-full rounded-2xl border surface-border surface p-3 flex flex-col">
        <div className="flex items-center justify-between pb-2">
          <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-slate-500">
            Map view
          </h3>
          <a
            href={viewUrl}
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-sky-400 hover:text-sky-300"
          >
            Open in Maps
          </a>
        </div>
        <div className="mt-1 flex-1 overflow-hidden rounded-xl border surface-border surface-soft">
          <iframe
            title="Map"
            src={embedUrl}
            className="h-full w-full"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};

export { MapView };
