import { useLocalStorage } from "../hooks/useLocalStorage";

interface NamedLocation {
  label: string;
  city: string;
}

interface NamedLocationsProps {
  onSelect: (city: string) => void | Promise<void>;
}

const defaultLocations: NamedLocation[] = [
  { label: "Home", city: "Helsinki" },
  { label: "Work", city: "London" },
];

const NamedLocations = ({ onSelect }: NamedLocationsProps) => {
  const [locations] = useLocalStorage<NamedLocation[]>("clima:namedLocations", defaultLocations);

  if (!locations.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="text-slate-500">Quick jump:</span>
      {locations.map((loc) => (
        <button
          key={loc.label}
          type="button"
          onClick={() => onSelect(loc.city)}
          className="rounded-full border surface-border surface-soft px-3 py-1 text-xs text-slate-600 hover:opacity-80 transition-colors"
        >
          {loc.label}
        </button>
      ))}
    </div>
  );
};

export { NamedLocations };

