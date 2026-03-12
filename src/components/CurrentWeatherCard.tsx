import type { CurrentWeather, TemperatureUnit } from "../types/weather";
import {
  computeComfortIndex,
  describeHumidity,
  describePressure,
  describeWind,
  formatVisibility,
} from "../utils/weatherInsights";

interface CurrentWeatherCardProps {
  weather: CurrentWeather;
  unit: TemperatureUnit;
}

const unitSymbol: Record<TemperatureUnit, string> = {
  metric: "°C",
  imperial: "°F",
};

const CurrentWeatherCard = ({ weather, unit }: CurrentWeatherCardProps) => {
  const symbol = unitSymbol[unit];
  const comfort = computeComfortIndex(weather, unit);

  return (
    <section className="w-full max-w-2xl rounded-2xl border surface-border surface p-5 shadow-sm shadow-slate-950/10 backdrop-blur">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.25em] text-slate-500">
            Current
          </p>
          <h2 className="mt-1 text-xl font-semibold">
            {weather.locationName}
            {weather.countryCode ? (
              <span className="ml-1 text-sm font-normal text-slate-400">
                {weather.countryCode}
              </span>
            ) : null}
          </h2>
          <p className="mt-0.5 text-xs capitalize text-slate-400">
            {weather.description}
          </p>
        </div>

        <div className="flex flex-col items-end">
          <div className="flex items-baseline gap-1">
            <p className="text-4xl font-semibold leading-none">
              {Math.round(weather.temperature)}
            </p>
            <span className="text-sm text-slate-400">{symbol}</span>
          </div>
          <p className="mt-1 text-[11px] text-slate-400">
            Feels like {Math.round(weather.feelsLike)}
            {symbol}
          </p>
          <p className="mt-1 text-[11px] text-slate-500">
            H: {Math.round(weather.tempMax)}
            {symbol} • L: {Math.round(weather.tempMin)}
            {symbol}
          </p>
        </div>
      </header>

      <p className="mt-4 text-xs text-slate-500">{comfort}</p>

      <dl className="mt-4 grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
        <div className="rounded-xl border surface-border surface-soft px-3 py-2.5">
          <dt className="text-[11px] text-slate-400">Humidity</dt>
          <dd className="mt-1 text-sm font-semibold">
            {Math.round(weather.humidity)}%
          </dd>
          <dd className="mt-0.5 text-[11px] text-slate-500">{describeHumidity(weather.humidity)}</dd>
        </div>

        <div className="rounded-xl border surface-border surface-soft px-3 py-2.5">
          <dt className="text-[11px] text-slate-400">Wind</dt>
          <dd className="mt-1 text-sm font-semibold">
            {Math.round(weather.windSpeed)} km/h
          </dd>
          <dd className="mt-0.5 text-[11px] text-slate-500">{describeWind(weather.windSpeed)}</dd>
        </div>

        <div className="rounded-xl border surface-border surface-soft px-3 py-2.5">
          <dt className="text-[11px] text-slate-400">Pressure</dt>
          <dd className="mt-1 text-sm font-semibold">
            {Math.round(weather.pressure)} hPa
          </dd>
          <dd className="mt-0.5 text-[11px] text-slate-500">
            {describePressure(weather.pressure)}
          </dd>
        </div>

        <div className="rounded-xl border surface-border surface-soft px-3 py-2.5">
          <dt className="text-[11px] text-slate-400">Visibility</dt>
          <dd className="mt-1 text-sm font-semibold">
            {formatVisibility(weather.visibility)}
          </dd>
          <dd className="mt-0.5 text-[11px] text-slate-500 capitalize">
            {weather.condition}
          </dd>
        </div>
      </dl>
    </section>
  );
};

export { CurrentWeatherCard };

