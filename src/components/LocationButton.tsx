interface LocationButtonProps {
  onUseLocation: () => void | Promise<void>;
  disabled?: boolean;
}

const LocationButton = ({ onUseLocation, disabled }: LocationButtonProps) => {
  const handleClick = () => {
    if (disabled) return;
    void onUseLocation();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-xl border surface-border surface-soft px-3 py-1.5 text-xs font-medium hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
      Use my location
    </button>
  );
};

export { LocationButton };

