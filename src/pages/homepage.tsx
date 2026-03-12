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
import { MapView } from "../components/MapView";
import { NearbyCities as NearbyCitiesList } from "../components/NearbyCities";
import { AirHealthCards } from "../components/AirHealthCards";
import { NamedLocations } from "../components/NamedLocations";
import {
  SkeletonCurrentWeatherCard,
  SkeletonHourlyStrip,
  SkeletonSidebarCard,
} from "../components/Skeletons";

const Homepage = () => {
  const {
    weather,
    isLoading,
    error,
    unit,
    hourly,
    airQuality,
    nearby,
    searchCity,
    refresh,
    setUnit,
  } = useWeather({
    initialUnit: "metric",
  });
  const [favorites, setFavorites] = useLocalStorage<string[]>(
    "clima:favorites",
    [],
  );

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center py-8">
      <div className="flex w-full flex-col gap-6">
        <header className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">
              Simple, modern weather.
            </h1>
            <p className="max-w-md text-sm text-slate-400">
              Search for any city to see the current conditions at a glance.
              Clean, focused, and built for everyday use.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={async () => {
                await refresh();
              }}
              disabled={isLoading}
              className="inline-flex items-center gap-1 rounded-full border surface-border surface-soft px-3 py-1.5 text-[11px] font-medium text-slate-600 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="inline-block">↻</span>
              <span>Refresh</span>
            </button>
            <button
              type="button"
              onClick={async () => {
                await searchCity("helsinki");
              }}
              disabled={isLoading}
              className="inline-flex items-center gap-1 rounded-full border surface-border surface-soft px-3 py-1.5 text-[11px] font-medium text-slate-600 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span className="inline-block">⟳</span>
              <span>Reset location</span>
            </button>
            <UnitToggle
              value={unit}
              onChange={async (next) => {
                await setUnit(next);
              }}
            />
          </div>
        </header>

        <div className="flex w-full flex-col gap-3">
          <div className="flex w-full flex-col items-stretch gap-3 md:flex-row md:items-center md:justify-between">
            <SearchBar
              onSearch={async (city) => {
                await searchCity(city);
                setFavorites((prev) => {
                  const next = [
                    city,
                    ...prev.filter(
                      (c) => c.toLowerCase() !== city.toLowerCase(),
                    ),
                  ];
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
          <NamedLocations
            onSelect={async (city) => {
              await searchCity(city);
            }}
          />
        </div>

        {isLoading && <LoadingSpinner />}

        {error && !isLoading && <ErrorMessage message={error} />}

        {/* Content area: always render layout, swap in skeletons when needed */}
        {!error && (
          <>
            <div className="flex flex-row gap-4 justify-between items-stretch w-full">
              {weather ? (
                <>
                  <div className="flex-1 flex">
                    <CurrentWeatherCard weather={weather} unit={unit} />
                  </div>
                  <div className="flex-1 flex">
                    <MapView weather={weather} />
                  </div>
                </>
              ) : (
                <>
                  <div className="flex-1 flex">
                    <SkeletonCurrentWeatherCard />
                  </div>
                  <div className="flex-1 flex">
                    <SkeletonSidebarCard />
                  </div>
                </>
              )}
            </div>

            {hourly ? (
              <HourlyForecastStrip forecast={hourly} unit={unit} />
            ) : (
              <SkeletonHourlyStrip />
            )}

            {airQuality && <AirHealthCards airQuality={airQuality} />}

            <div className="grid gap-4 md:grid-cols-[minmax(0,2.1fr)_minmax(0,1.2fr)]">
              {nearby ? (
                <NearbyCitiesList
                  nearby={nearby}
                  unit={unit}
                  onSelect={async (city) => {
                    await searchCity(city);
                  }}
                />
              ) : (
                <SkeletonSidebarCard />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export { Homepage };
