import { useState, type FormEvent } from "react";

interface SearchBarProps {
  onSearch: (city: string) => void | Promise<void>;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [value, setValue] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    void onSearch(value.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-xl items-center gap-2 rounded-xl border surface-border surface-soft px-3 py-2 shadow-sm shadow-slate-950/10 backdrop-blur"
    >
      <input
        type="text"
        placeholder="Search city (e.g. London, Tokyo)"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        className="flex-1 bg-transparent text-sm placeholder:text-slate-500 outline-none"
      />
      <button
        type="submit"
        className="rounded-lg bg-sky-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-sky-400 active:bg-sky-300 transition-colors"
      >
        Search
      </button>
    </form>
  );
};

export { SearchBar };
