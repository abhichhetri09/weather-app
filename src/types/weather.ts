export type TemperatureUnit = "metric" | "imperial";

export type WeatherCondition =
  | "clear"
  | "clouds"
  | "rain"
  | "drizzle"
  | "thunderstorm"
  | "snow"
  | "mist"
  | "fog"
  | "haze"
  | "smoke"
  | "dust"
  | "sand"
  | "ash"
  | "squall"
  | "tornado";

export interface CurrentWeather {
  locationName: string;
  countryCode?: string;
  lat?: number;
  lon?: number;
  temperature: number;
  feelsLike: number;
  tempMin: number;
  tempMax: number;
  condition: WeatherCondition;
  description: string;
  iconCode: string;
  humidity: number;
  pressure: number;
  windSpeed: number;
   windDeg?: number;
   windGust?: number;
  visibility?: number;
  cloudiness?: number;
  sunrise?: number;
  sunset?: number;
  timezoneOffset?: number;
}

export interface HourlyForecastPoint {
  timestamp: number;
  temperature: number;
  iconCode: string;
}

export interface HourlyForecast {
  locationName: string;
  points: HourlyForecastPoint[];
}

export interface AirQuality {
  aqi: number; // 1-5 in OpenWeather
  description: string;
  advice: string;
}

export interface NearbyCitySummary {
  id: number;
  name: string;
  country?: string;
  temperature: number;
  iconCode: string;
}

export interface NearbyCities {
  baseName: string;
  cities: NearbyCitySummary[];
}

export interface WeatherQuery {
  city?: string;
  lat?: number;
  lon?: number;
  units?: TemperatureUnit;
}

