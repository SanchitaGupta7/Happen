
import React, { useMemo, useState } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import events from "../data/events";
import EventCard from "../components/EventCard";
import SearchBar from "../components/SearchBar";

function Home() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique event categories
  const categories = [
    "All",
    ...new Set(events.map((event) => event.type))
  ];

  // Get featured events
  const featuredEvents = events.filter((event) => event.featured);

  // Get the next 3 upcoming events sorted by date
  const upcomingEvents = [...events]
    .filter((event) => new Date(event.date + "T23:59:59") >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  // Search and filter events
  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        event.name.toLowerCase().includes(search.toLowerCase()) ||
        event.city.toLowerCase().includes(search.toLowerCase()) ||
        event.venue.toLowerCase().includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        event.type === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory]);

  return (
    <main className="bg-[var(--color-background)]">

      {/* HERO SECTION */}
      <section className="relative flex min-h-screen w-full items-end overflow-hidden bg-black text-white pb-4">

        {/* Background Video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/heroVideo.mp4" type="video/mp4" />
        </video>

        {/* Video Overlays */}
        <div className="absolute inset-0 bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/20" />

        {/* Hero Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col px-6 pt-32 sm:px-10 sm:pb-16 md:px-16">

          {/* Main Heading */}
          <h1 className="text-[clamp(3.5rem,11vw,10rem)] font-black uppercase leading-[0.82] tracking-[-0.075em]">
            MAKE
            <br />
            <span className="text-[#C5F467]">MOMENTS</span>
            <br />
            MATTER<span className="text-[#C5F467]">.</span>
          </h1>

          {/* Bottom Content */}
          <div className="flex flex-col gap-7 border-white/30 sm:mt-10 sm:flex-row sm:items-end sm:justify-between md:pl-2.5">

            <div className="max-w-sm">
              <p className="text-sm leading-relaxed text-white/75 sm:text-base">
                Your new story awaits you.
              </p>

              <Link
                to="/events"
                className="mt-6 inline-flex items-center gap-3 rounded-md bg-[#C5F467] px-6 py-4 text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Explore Events
                <ArrowUpRight size={17} />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* FEATURED EVENTS SECTION */}
      <section className="px-6 py-20 sm:px-10 md:px-16">
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-accent)]">
                Handpicked for you
              </p>

              <h2 className="text-4xl font-black uppercase tracking-tight text-[var(--color-primary)] sm:text-5xl">
                Featured <span className="text-[var(--color-accent)]">Events.</span>
              </h2>

              <p className="mt-3 text-sm text-[var(--color-secondary)]">
                Experiences you don't want to miss.
              </p>
            </div>

            <Link
              to="/events"
              className="flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent)]"
            >
              View all events <ArrowRight size={17} />
            </Link>
          </div>

          {/* Featured Event Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

        </div>
      </section>

      {/* UPCOMING EVENTS SECTION */}
      <section
        id="upcoming"
        className="border-t border-[var(--color-border)] px-6 py-20 sm:px-10 md:px-16"
      >
        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-accent)]">
                Find your next experience
              </p>

              <h2 className="text-4xl font-black uppercase tracking-tight text-[var(--color-primary)] sm:text-5xl">
                Upcoming <span className="text-[var(--color-accent)]">Events.</span>
              </h2>

              <p className="mt-3 text-sm text-[var(--color-secondary)]">
                Explore what's happening around India.
              </p>
            </div>

            <Link
              to="/events"
              className="flex items-center gap-2 text-sm font-semibold text-[var(--color-primary)] transition hover:text-[var(--color-accent)]"
            >
              View all events <ArrowRight size={17} />
            </Link>
          </div>

          {/* UPCOMING EVENT CARDS */}
          {upcomingEvents.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <h3 className="text-xl font-bold text-[var(--color-primary)]">
                No upcoming events
              </h3>

              <p className="mt-2 text-sm text-[var(--color-secondary)]">
                Check back later for new experiences.
              </p>
            </div>
          )}

        </div>
      </section>

    </main>
  );
}

export default Home;
