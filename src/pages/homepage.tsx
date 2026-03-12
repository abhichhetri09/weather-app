import { useWeather } from "../hooks/useWeather";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { SearchBar } from "../components/SearchBar";
import { LocationButton } from "../components/LocationButton";
import { CurrentWeatherCard } from "../components/CurrentWeatherCard";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { ErrorMessage } from "../components/ErrorMessage";
import { HourlyForecastStrip } from "../components/HourlyForecastStrip";
import { FavoritesBar } from "../components/FavoritesBar";
import { UnitToggle } from "../components/UnitToggle";

const Homepage = () => {
  const { weather, isLoading, error, unit, hourly, searchCity, refresh, setUnit } = useWeather({
    initialCity: "helsinki",
    initialUnit: "metric",
  });
  const [favorites, setFavorites] = useLocalStorage<string[]>("clima:favorites", []);

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center py-8 text-slate-50">
      <div className="flex w-full flex-col gap-6">
        <header className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-50">
              Simple, modern weather.
            </h1>
            <p className="max-w-md text-sm text-slate-400">
              Search for any city to see the current conditions at a glance. Clean, focused, and
              built for everyday use.
            </p>
          </div>
          <UnitToggle
            value={unit}
            onChange={async (next) => {
              setUnit(next);
              await refresh();
            }}
          />
        </header>

        <div className="flex w-full flex-col gap-3">
          <div className="flex w-full flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
            <SearchBar
              onSearch={async (city) => {
                await searchCity(city);
                setFavorites((prev) => {
                  const next = [city, ...prev.filter((c) => c.toLowerCase() !== city.toLowerCase())];
                  return next.slice(0, 5);
                });
              }}
            />
            <LocationButton
              onUseLocation={async () => {
                if (!navigator.geolocation) return;
                navigator.geolocation.getCurrentPosition(
                  async (position) => {
                    const { latitude, longitude } = position.coords;
                    await searchCity(`${latitude},${longitude}`);
                  },
                  () => {
                    // ignore errors for now
                  },
                );
              }}
              disabled={isLoading}
            />
          </div>

          <FavoritesBar
            favorites={favorites}
            onSelect={async (city) => {
              await searchCity(city);
            }}
          />
        </div>

        {isLoading && <LoadingSpinner />}

        {error && !isLoading && <ErrorMessage message={error} />}

        {!isLoading && !error && weather && (
          <>
            <CurrentWeatherCard weather={weather} unit={unit} />
            {hourly && <HourlyForecastStrip forecast={hourly} unit={unit} />}
          </>
        )}

        {!isLoading && !error && !weather && (
          <p className="mt-4 text-sm text-slate-500">
            Start by searching for a city to see the current weather.
          </p>
        )}
      </div>
    </div>
  );
};

export { Homepage };
