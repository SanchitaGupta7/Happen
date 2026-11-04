
import React from "react";
import { ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="group overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] transition duration-300 hover:-translate-y-1">

      {/* Event Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={event.image}
          alt={event.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {event.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-[#C5F467] px-3 py-1 text-xs font-bold uppercase text-black">
            Featured
          </span>
        )}

        <span className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs text-white">
          {event.type}
        </span>
      </div>

      {/* Event Details */}
      <div className="p-5">

        <div className="mb-3 flex items-center gap-2 text-sm text-[var(--color-secondary)]">
          <CalendarDays size={15} />
          {new Date(event.date + "T00:00:00").toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric"
          })}
        </div>

        <h3 className="mb-2 text-xl font-bold text-[var(--color-primary)]">
          {event.name}
        </h3>

        <div className="mb-3 flex items-center gap-2 text-sm text-[var(--color-secondary)]">
          <MapPin size={15} />
          {event.venue}, {event.city}, {event.state}
        </div>

        <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-[var(--color-secondary)]">
          {event.description}
        </p>

        <div className="flex items-center justify-between border-t border-[var(--color-border)] pt-4">

          <p className="font-bold text-[var(--color-primary)]">
            {event.price === 0 ? "Free" : `₹${event.price}`}
          </p>

          <Link
          to={`/events/${event.id}`}
          className="flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-all hover:gap-3"
          >
            Explore <ArrowUpRight size={16} />
          </Link>

        </div>
      </div>
    </div>
  );
}

export default EventCard;
