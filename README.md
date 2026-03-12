# Clima – Modern Weather Dashboard

Clima is a clean, modern weather dashboard built with React, TypeScript, Vite, Tailwind (v4) and the OpenWeather API.  
It focuses on a simple UX: quick city search, clear current conditions, and useful insights at a glance.

## Features

- **City search** with debounced-style input
- **Current weather card**
  - Temperature, feels like, high/low
  - Humidity, wind, pressure, visibility
  - Human‑readable comfort insights (e.g. “Hot and humid”)
- **Hourly forecast strip** – next few hours with temperatures
- **Air quality** card – AQI category + health advice
- **Nearby cities** – quick‑glance temps and jump navigation
- **Favorites & named locations**
  - Recent cities (localStorage)
  - Quick “Home” / “Work” style shortcuts
- **Unit toggle** – °C / °F
- **Theme toggle** – Light / Dark / System
- **Responsive layout** – works well on desktop and mobile
- **Map view** – embedded OpenStreetMap centered on the current city

## Tech Stack

- **Frontend**: React 19 + TypeScript + React Router
- **Build**: Vite
- **Styling**: Tailwind CSS v4 + a small theme system (CSS variables)
- **API**: [OpenWeather](https://openweathermap.org/api)
- **Deployment**: GitHub Pages

## Getting Started

### 1. Clone & install

```bash
git clone https://github.com/abhichhetri09/weather-app.git
cd weather-app
npm install
```

### 2. Configure environment

In the project root, create a `.env` file:

```env
VITE_WEATHER_API_KEY=your_openweather_key_here
VITE_WEATHER_API_URL=https://api.openweathermap.org/data/2.5
```

> Note: This is a client‑side app. Your key is embedded in the built bundle; use a key with limited permissions/quotas.

### 3. Run locally

```bash
npm run dev
```

Then open:

```text
http://localhost:5173/
```

## Deployment (GitHub Pages)

This project is configured to deploy to  
`https://abhichhetri09.github.io/weather-app/`.

1. Ensure `vite.config.ts` has:

   ```ts
   import { defineConfig } from "vite";
   import tailwindcss from "@tailwindcss/vite";

   export default defineConfig({
     base: "/weather-app/",
     plugins: [tailwindcss()],
   });
   ```

2. Build & deploy (using `gh-pages`):

   ```bash
   npm run build
   npm run deploy
   ```

3. In your GitHub repo settings (`Settings → Pages`):

   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages`, folder `/ (root)`

Updates are just:

```bash
npm run deploy
```

## Project Structure (key files)

- `src/main.tsx` – React entrypoint with `BrowserRouter` and `basename`
- `src/App.tsx` – Routes
- `src/pages/homepage.tsx` – Main dashboard layout
- `src/hooks/useWeather.ts` – Fetches current, hourly, AQ, nearby cities
- `src/services/weatherApi.ts` – OpenWeather API wrappers
- `src/components/`
  - `CurrentWeatherCard.tsx`
  - `SearchBar.tsx`, `LocationButton.tsx`
  - `HourlyForecastStrip.tsx`
  - `AirHealthCards.tsx`
  - `NearbyCities.tsx`, `MapView.tsx`
  - `FavoritesBar.tsx`, `NamedLocations.tsx`
  - `UnitToggle.tsx`, `ThemeToggle.tsx`, `NavBar.tsx`, `Layout.tsx`
- `src/utils/weatherInsights.ts` – Human‑readable weather insights
- `src/index.css` – Tailwind import + light/dark theme variables

## Future Improvements

- Daily forecast grid (3–7 days)
- Simple charts for temperature trends
- Better error/empty states and loading skeletons

---

Feel free to fork and adapt Clima for your own portfolio or as a starter for richer weather‑based projects.

