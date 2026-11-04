
import React from "react";
import { Search } from "lucide-react";

function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-6 flex w-full items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3">
      <Search size={19} className="text-[var(--color-secondary)]" />

      <input
        type="text"
        placeholder="Search by event, city or venue..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-transparent text-sm text-[var(--color-primary)] outline-none placeholder:text-[var(--color-secondary)]"
      />
    </div>
  );
}

export default SearchBar;
