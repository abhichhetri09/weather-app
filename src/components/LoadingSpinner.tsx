const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center gap-3 text-sm text-slate-300">
      <span className="inline-flex h-4 w-4 animate-spin rounded-full border-2 border-sky-400 border-t-transparent" />
      Loading weather...
    </div>
  );
};

export { LoadingSpinner };

