
import React, { useMemo, useState } from "react";
import { ArrowUpDown, CalendarDays, SlidersHorizontal } from "lucide-react";
import events from "../data/events";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";

function Events() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date-asc");

  const categories = [
    "All",
    ...new Set(events.map((event) => event.type))
  ];

  const filteredEvents = useMemo(() => {
    let result = events.filter((event) => {
      const searchTerm = search.toLowerCase();

      const matchesSearch =
        event.name.toLowerCase().includes(searchTerm) ||
        event.city.toLowerCase().includes(searchTerm) ||
        event.venue.toLowerCase().includes(searchTerm) ||
        event.type.toLowerCase().includes(searchTerm);

      const matchesCategory =
        selectedCategory === "All" ||
        event.type === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "date-asc":
        result.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "date-desc":
        result.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [search, selectedCategory, sortBy]);

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-5 pb-20 pt-32 text-[var(--color-primary)] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADING */}
        <div className="event-page-enter mb-10">

          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl">
                Discover
                <span className="text-[var(--color-accent)]"> Events.</span>
              </h1>

              <p className="mt-3 max-w-lg text-sm leading-relaxed text-[var(--color-secondary)] sm:text-base">
                Find experiences worth showing up for. From live music to
                creative gatherings, your next moment starts here.
              </p>
            </div>

            <p className="text-sm text-[var(--color-secondary)]">
              <span className="text-2xl font-bold text-[var(--color-primary)]">
                {events.length.toString().padStart(2, "0")}
              </span>{" "}
              experiences to explore
            </p>
          </div>
        </div>

        
{/* DISCOVERY BOX */}
<section className="mb-10 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 sm:p-7">
  <div className="mb-6 flex items-center gap-2">
    <SlidersHorizontal
      size={18}
      className="text-[var(--color-accent)]"
    />
    <h2 className="text-sm font-bold uppercase tracking-wider">
      What are you in the mood for?
    </h2>
  </div>

  {/* SEARCH - FULL WIDTH */}
  <div className="mb-6 w-full">
    <SearchBar search={search} setSearch={setSearch} />
  </div>

  {/* CATEGORY + SORT */}
  <div className="flex flex-col gap-5  pt-5 lg:flex-row lg:items-center lg:justify-between">

    {/* CATEGORY FILTERS */}
    <div className="min-w-0 flex-1">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[var(--color-secondary)]">
        Browse by category
      </p>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-300 ${
              selectedCategory === category
                ? "border-[var(--color-accent)] bg-[var(--color-accent)] text-black"
                : "border-[var(--color-border)] text-[var(--color-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-primary)]"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>

    {/* SORT BY */}
    <div className="w-full lg:w-56 lg:shrink-0">
      <label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-[var(--color-secondary)]">
        Sort by
      </label>

      <div className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3.5 transition-colors focus-within:border-[var(--color-accent)]">
        <ArrowUpDown
          size={17}
          className="shrink-0 text-[var(--color-secondary)]"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full cursor-pointer bg-transparent text-sm text-[var(--color-primary)] outline-none"
        >
          <option value="date-asc">Date: Earliest first</option>
          <option value="date-desc">Date: Latest first</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
    </div>

  </div>
</section>


        {/* RESULTS HEADING */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              {selectedCategory === "All" ? "All Events" : selectedCategory}
            </h2>
            <p className="mt-1 text-sm text-[var(--color-secondary)]">
              Showing {filteredEvents.length}{" "}
              {filteredEvents.length === 1 ? "event" : "events"}
            </p>
          </div>

          {(search || selectedCategory !== "All") && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="text-xs font-semibold text-[var(--color-accent)] transition hover:opacity-70"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* EVENT GRID */}
        {filteredEvents.length > 0 ? (
          <div
            key={`${selectedCategory}-${search}-${sortBy}`}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filteredEvents.map((event, index) => (
              <div
                key={event.id}
                className="event-card-enter"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--color-border)] px-6 text-center">
            <CalendarDays
              size={38}
              className="mb-4 text-[var(--color-secondary)]"
            />
            <h3 className="text-xl font-bold">No events found</h3>
            <p className="mt-2 max-w-sm text-sm text-[var(--color-secondary)]">
              We couldn't find anything matching your search. Try another
              keyword or category.
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-5 rounded-md bg-[var(--color-accent)] px-5 py-3 text-xs font-bold uppercase tracking-wider text-black transition hover:-translate-y-1"
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </main>
  );
}

export default Events;
