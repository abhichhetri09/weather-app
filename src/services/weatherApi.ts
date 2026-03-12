import type {
  CurrentWeather,
  HourlyForecast,
  HourlyForecastPoint,
  WeatherQuery,
  TemperatureUnit,
} from "../types/weather";

const DEFAULT_UNIT: TemperatureUnit = "metric";

const API_BASE_URL =
  import.meta.env.VITE_WEATHER_API_URL ?? "https://api.openweathermap.org/data/2.5";
const API_KEY = import.meta.env.VITE_WEATHER_API_KEY ?? "";

function buildQueryString(query: WeatherQuery): string {
  const params = new URLSearchParams();

  if (query.city) {
    params.set("q", query.city);
  }
  if (query.lat != null && query.lon != null) {
    params.set("lat", String(query.lat));
    params.set("lon", String(query.lon));
  }

  params.set("units", query.units ?? DEFAULT_UNIT);
  params.set("appid", API_KEY);

  return params.toString();
}

export async function fetchCurrentWeather(query: WeatherQuery): Promise<CurrentWeather> {
  if (!API_KEY) {
    throw new Error(
      "Missing VITE_WEATHER_API_KEY. Please add it to your .env file at the project root.",
    );
  }

  const qs = buildQueryString(query);
  const response = await fetch(`${API_BASE_URL}/weather?${qs}`);

  if (!response.ok) {
    throw new Error("Failed to fetch weather data. Please try a different city.");
  }

  const data = await response.json();

  const conditionId: number | undefined = data.weather?.[0]?.id;
  const mainCondition: string | undefined = data.weather?.[0]?.main;

  return {
    locationName: data.name,
    countryCode: data.sys?.country,
    temperature: data.main?.temp,
    feelsLike: data.main?.feels_like,
    tempMin: data.main?.temp_min,
    tempMax: data.main?.temp_max,
    condition: mapCondition(mainCondition, conditionId),
    description: data.weather?.[0]?.description ?? "Unknown",
    iconCode: data.weather?.[0]?.icon ?? "01d",
    humidity: data.main?.humidity,
    pressure: data.main?.pressure,
    windSpeed: data.wind?.speed,
    visibility: data.visibility,
    cloudiness: data.clouds?.all,
    sunrise: data.sys?.sunrise,
    sunset: data.sys?.sunset,
    timezoneOffset: data.timezone,
  };
}

export async function fetchHourlyForecast(query: WeatherQuery): Promise<HourlyForecast> {
  if (!API_KEY) {
    throw new Error(
      "Missing VITE_WEATHER_API_KEY. Please add it to your .env file at the project root.",
    );
  }

  const qs = buildQueryString(query);
  const response = await fetch(`${API_BASE_URL}/forecast?${qs}`);

  if (!response.ok) {
    throw new Error("Failed to fetch forecast data. Please try a different city.");
  }

  const data = await response.json();

  const points: HourlyForecastPoint[] = (data.list ?? [])
    .slice(0, 8)
    .map((entry: any): HourlyForecastPoint => ({
      timestamp: entry.dt,
      temperature: entry.main?.temp,
      iconCode: entry.weather?.[0]?.icon ?? "01d",
    }));

  return {
    locationName: data.city?.name ?? query.city ?? "Unknown",
    points,
  };
}

function mapCondition(main: string | undefined, id?: number) {
  const normalized = (main ?? "").toLowerCase();

  if (normalized === "clear") return "clear";
  if (normalized === "clouds") return "clouds";
  if (normalized === "rain") return "rain";
  if (normalized === "drizzle") return "drizzle";
  if (normalized === "thunderstorm") return "thunderstorm";
  if (normalized === "snow") return "snow";
  if (normalized === "mist" || normalized === "fog") return "mist";
  if (normalized === "haze") return "haze";
  if (normalized === "smoke") return "smoke";
  if (normalized === "dust") return "dust";
  if (normalized === "sand") return "sand";
  if (normalized === "ash") return "ash";
  if (normalized === "squall") return "squall";
  if (normalized === "tornado") return "tornado";

  if (id != null) {
    if (id >= 200 && id < 300) return "thunderstorm";
    if (id >= 300 && id < 400) return "drizzle";
    if (id >= 500 && id < 600) return "rain";
    if (id >= 600 && id < 700) return "snow";
    if (id >= 700 && id < 800) return "mist";
    if (id === 800) return "clear";
    if (id > 800 && id < 900) return "clouds";
  }

  return "clear";
}

