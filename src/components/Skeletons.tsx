const baseCard =
  "rounded-2xl border surface-border surface-soft p-4 animate-pulse flex flex-col gap-3";

const SkeletonCurrentWeatherCard = () => (
  <section className={`${baseCard} w-full max-w-2xl`}>
    <div className="flex items-start justify-between gap-4">
      <div className="space-y-2">
        <div className="h-3 w-24 rounded bg-slate-300/40" />
        <div className="h-5 w-40 rounded bg-slate-300/40" />
        <div className="h-3 w-32 rounded bg-slate-300/30" />
      </div>
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-slate-300/40" />
        <div className="h-8 w-16 rounded bg-slate-300/40" />
      </div>
    </div>
    <div className="mt-2 h-3 w-32 rounded bg-slate-300/30" />
    <div className="mt-3 grid grid-cols-2 gap-3 text-xs md:grid-cols-4">
      {[0, 1, 2, 3].map((key) => (
        <div
          key={key}
          className="rounded-xl border surface-border surface px-3 py-3 space-y-2"
        >
          <div className="h-2 w-16 rounded bg-slate-300/30" />
          <div className="h-4 w-10 rounded bg-slate-300/50" />
          <div className="h-2 w-20 rounded bg-slate-300/30" />
        </div>
      ))}
    </div>
  </section>
);

const SkeletonHourlyStrip = () => (
  <section className="mt-6">
    <div className="mb-3 h-3 w-24 rounded bg-slate-300/40" />
    <div className="flex gap-3 overflow-x-auto pb-1">
      {[0, 1, 2, 3, 4].map((key) => (
        <div
          key={key}
          className="min-w-[96px] rounded-2xl border surface-border surface-soft px-3 py-3 text-center animate-pulse space-y-2"
        >
          <div className="h-2 w-10 mx-auto rounded bg-slate-300/40" />
          <div className="h-8 w-8 mx-auto rounded-full bg-slate-300/40" />
          <div className="h-3 w-12 mx-auto rounded bg-slate-300/40" />
        </div>
      ))}
    </div>
  </section>
);

const SkeletonSidebarCard = () => (
  <div className="rounded-2xl border surface-border surface-soft p-3 animate-pulse space-y-3">
    <div className="h-3 w-24 rounded bg-slate-300/40" />
    {[0, 1, 2].map((key) => (
      <div key={key} className="flex items-center justify-between gap-2">
        <div className="h-3 w-20 rounded bg-slate-300/40" />
        <div className="h-3 w-10 rounded bg-slate-300/40" />
      </div>
    ))}
  </div>
);

export { SkeletonCurrentWeatherCard, SkeletonHourlyStrip, SkeletonSidebarCard };
