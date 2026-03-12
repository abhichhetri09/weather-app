const AboutPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center py-8">
      <div className="flex w-full max-w-3xl flex-col gap-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">About Clima</h1>
          <p className="mt-2 text-sm text-slate-500">
            Clima is a simple, modern weather dashboard built as a frontend project using React,
            TypeScript, Vite, Tailwind, and the OpenWeather API.
          </p>
        </header>

        <section className="space-y-3 text-sm text-slate-600">
          <p>
            The goal of this app is to make checking the forecast feel fast and focused. You can
            search any city, see clear current conditions, look ahead to the next hours, and get
            useful context like air quality and nearby locations.
          </p>
          <p>
            Under the hood, the app uses typed API models, custom hooks for data fetching, and a
            small theming system to support light and dark modes. It is deployed on GitHub Pages and
            designed to be a solid portfolio piece as well as a base for experimenting with more
            advanced weather features.
          </p>
        </section>

        <section className="space-y-2 text-sm text-slate-600">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Stack
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>React 19 + TypeScript</li>
            <li>Vite build tooling</li>
            <li>Tailwind CSS v4 with CSS variable theme</li>
            <li>OpenWeather REST API</li>
            <li>GitHub Pages deployment</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export { AboutPage };

