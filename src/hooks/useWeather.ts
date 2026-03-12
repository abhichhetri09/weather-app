import { useCallback, useState } from "react";
import type {
  AirQuality,
  CurrentWeather,
  HourlyForecast,
  NearbyCities,
  TemperatureUnit,
} from "../types/weather";
import {
  fetchAirQuality,
  fetchCurrentWeather,
  fetchHourlyForecast,
  fetchNearbyCities,
} from "../services/weatherApi";

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
  airQuality: AirQuality | null;
  nearby: NearbyCities | null;
  searchCity: (city: string) => Promise<void>;
  refresh: () => Promise<void>;
  setUnit: (unit: TemperatureUnit) => Promise<void>;
}

export function useWeather(options: UseWeatherOptions = {}): UseWeatherResult {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unit, setUnit] = useState<TemperatureUnit>(
    options.initialUnit ?? "metric",
  );
  const [lastCity, setLastCity] = useState<string | undefined>(
    options.initialCity,
  );
  const [hourly, setHourly] = useState<HourlyForecast | null>(null);
  const [airQuality, setAirQuality] = useState<AirQuality | null>(null);
  const [nearby, setNearby] = useState<NearbyCities | null>(null);

  const load = useCallback(
    async (city?: string, overrideUnit?: TemperatureUnit) => {
      const queryCity = city ?? lastCity;
      if (!queryCity) return;

      try {
        setIsLoading(true);
        setError(null);

        const activeUnit = overrideUnit ?? unit;

        const [current, forecast] = await Promise.all([
          fetchCurrentWeather({ city: queryCity, units: activeUnit }),
          fetchHourlyForecast({ city: queryCity, units: activeUnit }),
        ]);
        setWeather(current);
        setHourly(forecast);

        if (current.lat != null && current.lon != null) {
          const [aqResult, nearbyResult] = await Promise.allSettled([
            fetchAirQuality(current.lat, current.lon),
            fetchNearbyCities(current.lat, current.lon, activeUnit),
          ]);
          setAirQuality(aqResult.status === "fulfilled" ? aqResult.value : null);
          setNearby(
            nearbyResult.status === "fulfilled" ? nearbyResult.value : null,
          );
        } else {
          setAirQuality(null);
          setNearby(null);
        }
        setLastCity(queryCity);
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : "Something went wrong while fetching weather.";
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

  const changeUnit = useCallback(
    async (next: TemperatureUnit) => {
      setUnit(next);
      await load(undefined, next);
    },
    [load],
  );

  return {
    weather,
    isLoading,
    error,
    unit,
    hourly,
    airQuality,
    nearby,
    searchCity,
    refresh,
    setUnit: changeUnit,
  };
}
