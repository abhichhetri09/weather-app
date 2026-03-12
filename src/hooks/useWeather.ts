import { useCallback, useState } from "react";
import type { CurrentWeather, HourlyForecast, TemperatureUnit } from "../types/weather";
import { fetchCurrentWeather, fetchHourlyForecast } from "../services/weatherApi";

interface UseWeatherOptions {
  initialCity?: string;
  initialUnit?: TemperatureUnit;
}

interface UseWeatherResult {
  weather: CurrentWeather | null;
  isLoading: boolean;
  error: string | null;
  unit: TemperatureUnit;
  hourly: HourlyForecast | null;
  searchCity: (city: string) => Promise<void>;
  refresh: () => Promise<void>;
  setUnit: (unit: TemperatureUnit) => void;
}

export function useWeather(options: UseWeatherOptions = {}): UseWeatherResult {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>(options.initialUnit ?? "metric");
  const [lastCity, setLastCity] = useState<string | undefined>(options.initialCity);
  const [hourly, setHourly] = useState<HourlyForecast | null>(null);

  const load = useCallback(
    async (city?: string) => {
      const queryCity = city ?? lastCity;
      if (!queryCity) return;

      try {
        setIsLoading(true);
        setError(null);

        const [current, forecast] = await Promise.all([
          fetchCurrentWeather({ city: queryCity, units: unit }),
          fetchHourlyForecast({ city: queryCity, units: unit }),
        ]);
        setWeather(current);
        setHourly(forecast);
        setLastCity(queryCity);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Something went wrong while fetching weather.";
        setError(message);
      } finally {
        setIsLoading(false);
      }
    },
    [lastCity, unit],
  );

  const searchCity = useCallback(
    async (city: string) => {
      if (!city.trim()) return;
      await load(city.trim());
    },
    [load],
  );

  const refresh = useCallback(async () => {
    await load();
  }, [load]);

  return {
    weather,
    isLoading,
    error,
    unit,
    hourly,
    searchCity,
    refresh,
    setUnit,
  };
}

