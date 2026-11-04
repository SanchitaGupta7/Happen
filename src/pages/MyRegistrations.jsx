
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Ticket,
  ArrowUpRight,
  Trash2,
  ClipboardList,
  CheckCircle2,
  UserRound,
  Mail,
  X
} from "lucide-react";

function MyRegistrations() {
  const [registrations, setRegistrations] = useState([]);

  // Load registrations from localStorage
  useEffect(() => {
    const savedRegistrations = JSON.parse(
      localStorage.getItem("happenRegistrations") || "[]"
    );

    setRegistrations(
      Array.isArray(savedRegistrations) ? savedRegistrations : []
    );
  }, []);

  // Format event date
  const formatDate = (date) => {
    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  // Format registration date
  const formatRegistrationDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  // Check whether event has passed
  const isEventCompleted = (date, time) => {
    if (!date || !time) return false;

    const [clock, period] = time.split(" ");
    let [hours, minutes] = clock.split(":").map(Number);

    if (period === "PM" && hours !== 12) hours += 12;
    if (period === "AM" && hours === 12) hours = 0;

    const eventDate = new Date(
      `${date}T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`
    );

    return eventDate.getTime() < Date.now();
  };

  // Cancel registration
  const handleCancel = (registrationId) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this registration?"
    );

    if (!confirmed) return;

    const updatedRegistrations = registrations.filter(
      (registration) => registration.registrationId !== registrationId
    );

    localStorage.setItem(
      "happenRegistrations",
      JSON.stringify(updatedRegistrations)
    );

    setRegistrations(updatedRegistrations);
  };

  const upcomingCount = registrations.filter(
    (registration) =>
      !isEventCompleted(registration.eventDate, registration.eventTime)
  ).length;

  const completedCount = registrations.length - upcomingCount;

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-5 pb-20 pt-28 text-[var(--color-primary)] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* PAGE HEADING */}
        <section className="mb-10">

          <h1 className="text-4xl font-black uppercase tracking-tight sm:text-5xl md:text-6xl">
            My <span className="text-[var(--color-accent)]"> Registrations.</span>
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--color-secondary)] sm:text-base">
            Keep track of the experiences you've signed up for. Your next
            unforgettable moment is just around the corner.
          </p>
        </section>

        {/* REGISTRATION STATS */}
        <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-secondary)]">
                Total Registrations
              </p>
              <ClipboardList size={20} className="text-[var(--color-accent)]" />
            </div>

            <p className="text-3xl font-black">{registrations.length}</p>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-secondary)]">
                Upcoming
              </p>
              <CalendarDays size={20} className="text-[var(--color-accent)]" />
            </div>

            <p className="text-3xl font-black">{upcomingCount}</p>
          </div>

          <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-secondary)]">
                Completed
              </p>
              <CheckCircle2 size={20} className="text-[var(--color-accent)]" />
            </div>

            <p className="text-3xl font-black">{completedCount}</p>
          </div>
        </section>

        {/* REGISTRATION LIST */}
        <section>
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-xl font-bold">
              Your Events
            </h2>

            <Link
              to="/events"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)] transition-all hover:gap-3"
            >
              Discover more events
              <ArrowUpRight size={17} />
            </Link>
          </div>

          {registrations.length === 0 ? (
            /* EMPTY STATE */
            <div className="rounded-2xl border border-dashed border-[var(--color-border)] bg-[var(--color-surface)] px-6 py-16 text-center sm:py-20">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-background)] text-[var(--color-accent)]">
                <Ticket size={30} />
              </div>

              <h3 className="text-2xl font-black">
                Nothing on your calendar yet.
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[var(--color-secondary)]">
                You haven't registered for any events. Explore what's
                happening and find something worth showing up for.
              </p>

              <Link
                to="/events"
                className="mt-7 inline-flex items-center gap-3 rounded-lg bg-[var(--color-accent)] px-6 py-4 text-xs font-bold uppercase tracking-wider text-black transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                Explore Events
                <ArrowUpRight size={17} />
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {registrations
                .slice()
                .sort(
                  (a, b) =>
                    new Date(a.eventDate) - new Date(b.eventDate)
                )
                .map((registration) => {
                  const completed = isEventCompleted(
                    registration.eventDate,
                    registration.eventTime
                  );

                  return (
                    <article
                      key={registration.registrationId}
                      className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] transition-all duration-300 hover:border-[var(--color-accent)]"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">

                        {/* EVENT IMAGE */}
                        <div className="relative h-52 overflow-hidden md:h-full">
                          <img
                            src={registration.eventImage}
                            alt={registration.eventName}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />

                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:bg-gradient-to-r" />

                          <span
                            className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${
                              completed
                                ? "bg-white/90 text-black"
                                : "bg-[#C5F467] text-black"
                            }`}
                          >
                            {completed ? "Completed" : "Upcoming"}
                          </span>
                        </div>

                        {/* EVENT DETAILS */}
                        <div className="p-5 sm:p-7">
                          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                            <div className="min-w-0 flex-1">
                              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[var(--color-accent)]">
                                {registration.eventType}
                              </p>

                              <h3 className="text-xl font-black sm:text-2xl">
                                {registration.eventName}
                              </h3>

                              <div className="mt-5 grid grid-cols-1 gap-3 text-sm text-[var(--color-secondary)] sm:grid-cols-2">
                                <p className="flex items-center gap-2">
                                  <CalendarDays size={16} className="shrink-0 text-[var(--color-accent)]" />
                                  {formatDate(registration.eventDate)}
                                </p>

                                <p className="flex items-center gap-2">
                                  <Clock3 size={16} className="shrink-0 text-[var(--color-accent)]" />
                                  {registration.eventTime}
                                </p>

                                <p className="flex items-center gap-2 sm:col-span-2">
                                  <MapPin size={16} className="shrink-0 text-[var(--color-accent)]" />
                                  {registration.eventVenue}, {registration.eventCity}
                                </p>
                              </div>
                            </div>

                            <div className="flex shrink-0 items-center justify-between gap-4 lg:flex-col lg:items-end">
                              <div className="text-left lg:text-right">
                                <p className="text-xs text-[var(--color-secondary)]">
                                  Entry Fee
                                </p>
                                <p className="mt-1 text-xl font-black">
                                  {registration.eventPrice === 0
                                    ? "Free"
                                    : `₹${registration.eventPrice}`}
                                </p>
                              </div>

                              {!completed && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleCancel(registration.registrationId)
                                  }
                                  className="flex items-center gap-2 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
                                >
                                  <Trash2 size={15} />
                                  Cancel
                                </button>
                              )}
                            </div>
                          </div>

                          {/* REGISTRATION DETAILS */}
                          <div className="mt-6 border-t border-[var(--color-border)] pt-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[var(--color-secondary)]">
                                  Registered by
                                </p>

                                <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-[var(--color-secondary)]">
                                  <span className="flex items-center gap-2">
                                    <UserRound size={14} />
                                    {registration.name}
                                  </span>

                                  <span className="flex items-center gap-2">
                                    <Mail size={14} />
                                    {registration.email}
                                  </span>
                                </div>
                              </div>

                              <p className="text-[10px] text-[var(--color-secondary)]">
                                Registered on{" "}
                                {formatRegistrationDate(registration.registeredAt)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default MyRegistrations;
