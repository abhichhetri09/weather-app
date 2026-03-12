import type { CurrentWeather, TemperatureUnit } from "../types/weather";

export function formatVisibility(value?: number): string {
  if (value == null) return "–";
  if (value >= 10000) return "> 10 km";
  if (value >= 5000) return "5–10 km";
  if (value >= 1000) return "1–5 km";
  return "< 1 km";
}

export function describeHumidity(value?: number): string {
  if (value == null) return "Unknown";
  if (value < 30) return "Dry";
  if (value < 60) return "Comfortable";
  if (value < 80) return "Humid";
  return "Very humid";
}

export function describeWind(value?: number): string {
  if (value == null) return "Unknown";
  if (value < 5) return "Calm";
  if (value < 15) return "Light breeze";
  if (value < 30) return "Breezy";
  if (value < 50) return "Windy";
  return "Very windy";
}

export function describePressure(value?: number): string {
  if (value == null) return "Unknown";
  if (value < 1005) return "Low";
  if (value <= 1015) return "Normal";
  return "High";
}

export function computeComfortIndex(weather: CurrentWeather, unit: TemperatureUnit): string {
  const { feelsLike, humidity } = weather;

  if (feelsLike == null || humidity == null) return "Typical for this time of year";

  if (unit === "metric") {
    if (feelsLike > 30 && humidity > 60) return "Hot and humid";
    if (feelsLike > 30 && humidity <= 60) return "Hot but fairly dry";
    if (feelsLike < 5 && humidity > 70) return "Cold and damp";
    if (feelsLike < 5) return "Cold, dress warm";
    if (feelsLike >= 18 && feelsLike <= 24 && humidity >= 30 && humidity <= 60) {
      return "Very comfortable";
    }
  } else {
    if (feelsLike > 86 && humidity > 60) return "Hot and humid";
    if (feelsLike > 86 && humidity <= 60) return "Hot but fairly dry";
    if (feelsLike < 41 && humidity > 70) return "Cold and damp";
    if (feelsLike < 41) return "Cold, dress warm";
    if (feelsLike >= 64 && feelsLike <= 75 && humidity >= 30 && humidity <= 60) {
      return "Very comfortable";
    }
  }

  return "Generally comfortable";
}

