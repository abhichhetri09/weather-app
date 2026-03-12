interface FavoritesBarProps {
  favorites: string[];
  onSelect: (city: string) => void | Promise<void>;
}

const FavoritesBar = ({ favorites, onSelect }: FavoritesBarProps) => {
  if (!favorites.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-slate-500">Recent:</span>
      {favorites.map((city) => (
        <button
          key={city}
          type="button"
          onClick={() => onSelect(city)}
          className="rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1 text-slate-200 hover:bg-slate-800 transition-colors"
        >
          {city}
        </button>
      ))}
    </div>
  );
};

export { FavoritesBar };

