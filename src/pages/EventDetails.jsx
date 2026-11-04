
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowUpRight,
  CalendarDays,
  Clock3,
  MapPin,
  Ticket,
  UserRound,
  Mail,
  Phone,
  CheckCircle2,
  Timer
} from "lucide-react";
import events from "../data/events";

// Convert 12-hour time to 24-hour format
function convertTo24Hour(time) {
  const [clock, period] = time.split(" ");
  let [hours, minutes] = clock.split(":").map(Number);

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

function EventDetails() {
  const { id } = useParams();

  const event = events.find((item) => String(item.id) === id);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventId: id
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(undefined);

  // Keep the form synced when navigating between event pages
  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventId: id
    });
    setErrors({});
    setSubmitted(false);
  }, [id]);

  // Live event countdown
  useEffect(() => {
    if (!event) return;

    const calculateTimeLeft = () => {
      const eventDate = new Date(
        `${event.date}T${convertTo24Hour(event.time)}:00`
      );

      const difference = eventDate.getTime() - Date.now();

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTimeLeft();

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [event]);

  // Format event date
  const formatDate = (date) => {
    return new Date(date + "T00:00:00").toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: ""
    }));
  };

  // Validate registration form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters.";
    } else if (/\d/.test(formData.name)) {
      newErrors.name = "Name cannot contain numbers.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!phoneRegex.test(formData.phone.trim())) {
      newErrors.phone = "Enter a valid 10-digit Indian phone number.";
    }

    if (!events.some((item) => String(item.id) === formData.eventId)) {
      newErrors.eventId = "Please select a valid event.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const email = formData.email.trim().toLowerCase();

    // Get existing registrations from localStorage
    let registrations = [];

    try {
      registrations = JSON.parse(
        localStorage.getItem("happenRegistrations") || "[]"
      );

      if (!Array.isArray(registrations)) {
        registrations = [];
      }
    } catch {
      registrations = [];
    }

    // Prevent duplicate registration for the same event
    const alreadyRegistered = registrations.some(
      (registration) =>
        String(registration.eventId) === formData.eventId &&
        registration.email?.toLowerCase() === email
    );

    if (alreadyRegistered) {
      setErrors({
        email: "You have already registered for this event with this email."
      });
      return;
    }

    // Find the selected event
    const selectedEvent = events.find(
      (item) => String(item.id) === formData.eventId
    );

    if (!selectedEvent) {
      setErrors({
        eventId: "Please select a valid event."
      });
      return;
    }

    // Create registration record
    const newRegistration = {
      registrationId: Date.now(),
      eventId: String(selectedEvent.id),
      eventName: selectedEvent.name,
      eventDate: selectedEvent.date,
      eventTime: selectedEvent.time,
      eventVenue: selectedEvent.venue,
      eventCity: selectedEvent.city,
      eventState: selectedEvent.state,
      eventImage: selectedEvent.image,
      eventType: selectedEvent.type,
      eventPrice: selectedEvent.price,
      name: formData.name.trim(),
      email,
      phone: formData.phone.trim(),
      registeredAt: new Date().toISOString()
    };

    // Save registration to localStorage
    try {
      registrations.push(newRegistration);

      localStorage.setItem(
        "happenRegistrations",
        JSON.stringify(registrations)
      );

      setSubmitted(true);
      setErrors({});
    } catch (error) {
      console.error("Registration could not be saved:", error);

      setErrors({
        general: "Something went wrong while saving your registration. Please try again."
      });
    }
  };

  // Event not found
  if (!event) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-[var(--color-background)] px-5 text-center text-[var(--color-primary)]">
        <h1 className="text-4xl font-black uppercase">
          Event Not Found<span className="text-[var(--color-accent)]">.</span>
        </h1>

        <p className="mt-4 text-[var(--color-secondary)]">
          Sorry, we couldn't find the event you're looking for.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--color-background)] px-5 pb-20 pt-28 text-[var(--color-primary)] sm:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* EVENT HERO */}
        <section className="relative mb-12 overflow-hidden rounded-2xl">
          <div className="relative h-[350px] sm:h-[450px]">
            <img
              src={event.image}
              alt={event.name}
              className="h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-10">
              <div className="mb-4 flex flex-wrap gap-2">
                {event.featured && (
                  <span className="rounded-full bg-[#C5F467] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-black">
                    Featured Event
                  </span>
                )}

                <span className="rounded-full border border-white/30 bg-black/40 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                  {event.type}
                </span>
              </div>

              <h1 className="max-w-4xl text-4xl font-black uppercase leading-tight tracking-tight text-white sm:text-5xl md:text-6xl">
                {event.name}
                <span className="text-[#C5F467]">.</span>
              </h1>

              <p className="mt-4 flex items-center gap-2 text-sm text-white/80 sm:text-base">
                <MapPin size={17} />
                {event.venue}, {event.city}, {event.state}
              </p>
            </div>
          </div>
        </section>

        {/* EVENT DETAILS + REGISTRATION */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-3">

          {/* LEFT: EVENT INFORMATION */}
          <div className="space-y-8 lg:col-span-2">

            {/* EVENT INFORMATION */}
            <section>
              <h2 className="mb-5 text-xl font-bold">
                Event Information
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                <div className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                  <div className="rounded-lg bg-[var(--color-background)] p-3 text-[var(--color-accent)]">
                    <CalendarDays size={22} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                      Date
                    </p>
                    <p className="mt-2 text-sm font-semibold">
                      {formatDate(event.date)}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                  <div className="rounded-lg bg-[var(--color-background)] p-3 text-[var(--color-accent)]">
                    <Clock3 size={22} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                      Time
                    </p>
                    <p className="mt-2 text-sm font-semibold">
                      {event.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                  <div className="rounded-lg bg-[var(--color-background)] p-3 text-[var(--color-accent)]">
                    <MapPin size={22} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                      Venue
                    </p>
                    <p className="mt-2 text-sm font-semibold">
                      {event.venue}
                    </p>
                    <p className="mt-1 text-xs text-[var(--color-secondary)]">
                      {event.city}, {event.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                  <div className="rounded-lg bg-[var(--color-background)] p-3 text-[var(--color-accent)]">
                    <Ticket size={22} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                      Entry Fee
                    </p>
                    <p className="mt-2 text-xl font-bold">
                      {event.price === 0 ? "Free" : `₹${event.price}`}
                    </p>
                  </div>
                </div>

              </div>
            </section>

            {/* ORGANIZER */}
            <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
              <p className="text-xs font-bold uppercase tracking-wider text-[var(--color-secondary)]">
                Organized by
              </p>
              <h3 className="mt-2 text-xl font-bold">
                {event.organizer}
              </h3>
            </section>

            {/* EVENT COUNTDOWN */}
            <section className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[var(--color-accent)] opacity-[0.07] blur-3xl" />

              <div className="relative z-10">
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-lg bg-[var(--color-accent)] p-3 text-black">
                    <Timer size={22} />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                      Save the date
                    </p>
                    <h2 className="mt-1 text-xl font-bold sm:text-2xl">
                      The countdown is on.
                    </h2>
                  </div>
                </div>

                {timeLeft === undefined ? (
                  <p className="text-sm text-[var(--color-secondary)]">
                    Calculating countdown...
                  </p>
                ) : timeLeft !== null ? (
                  <div className="grid grid-cols-4 gap-2 sm:gap-4">
                    {[
                      { label: "Days", value: timeLeft.days },
                      { label: "Hours", value: timeLeft.hours },
                      { label: "Minutes", value: timeLeft.minutes },
                      { label: "Seconds", value: timeLeft.seconds }
                    ].map((unit) => (
                      <div
                        key={unit.label}
                        className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] px-2 py-5 text-center sm:px-4 sm:py-6"
                      >
                        <p className="text-2xl font-black tabular-nums text-[var(--color-accent)] sm:text-4xl">
                          {String(unit.value).padStart(2, "0")}
                        </p>

                        <p className="mt-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-secondary)] sm:text-xs">
                          {unit.label}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 text-center">
                    <h3 className="text-xl font-bold">
                      The event has started!
                    </h3>
                    <p className="mt-2 text-sm text-[var(--color-secondary)]">
                      It's time to make some memories.
                    </p>
                  </div>
                )}
              </div>
            </section>

          </div>

          {/* RIGHT: REGISTRATION FORM */}
          <aside id="registration">
            <div className="sticky top-24 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-7">

              {!submitted ? (
                <>
                  <div className="mb-6">
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                      Save your spot
                    </p>

                    <h2 className="text-2xl font-black">
                      Register Now<span className="text-[var(--color-accent)]">.</span>
                    </h2>

                    <p className="mt-2 text-sm text-[var(--color-secondary)]">
                      Fill in your details to register for this experience.
                    </p>
                  </div>

                  {/* SELECTED EVENT */}
                  <div className="mb-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4">
                    <p className="text-xs uppercase tracking-wider text-[var(--color-secondary)]">
                      Selected Event
                    </p>

                    <p className="mt-2 font-bold">
                      {event.name}
                    </p>

                    <p className="mt-1 text-sm text-[var(--color-secondary)]">
                      {event.price === 0 ? "Free entry" : `₹${event.price}`}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">

                    {/* NAME */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Full Name
                      </label>

                      <div className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 focus-within:border-[var(--color-accent)]">
                        <UserRound size={18} className="text-[var(--color-secondary)]" />

                        <input
                          type="text"
                          name="name"
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-secondary)]"
                        />
                      </div>

                      {errors.name && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Email Address
                      </label>

                      <div className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 focus-within:border-[var(--color-accent)]">
                        <Mail size={18} className="text-[var(--color-secondary)]" />

                        <input
                          type="email"
                          name="email"
                          placeholder="you@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-secondary)]"
                        />
                      </div>

                      {errors.email && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* PHONE */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold">
                        Phone Number
                      </label>

                      <div className="flex items-center gap-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 py-3 focus-within:border-[var(--color-accent)]">
                        <Phone size={18} className="text-[var(--color-secondary)]" />

                        <input
                          type="tel"
                          name="phone"
                          placeholder="10-digit phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          maxLength={10}
                          className="w-full bg-transparent text-sm outline-none placeholder:text-[var(--color-secondary)]"
                        />
                      </div>

                      {errors.phone && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      {errors.eventId && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.eventId}
                        </p>
                      )}

                      {errors.general && (
                        <p className="mt-2 text-xs text-red-500">
                          {errors.general}
                        </p>
                      )}
                    </div>

                    {/* SUBMIT BUTTON */}
                    <button
                      type="submit"
                      className="flex w-full items-center justify-center gap-3 rounded-lg bg-[var(--color-accent)] px-6 py-4 text-sm font-bold uppercase tracking-wider text-black transition-all duration-300 hover:-translate-y-1 hover:bg-white"
                    >
                      Complete Registration
                      <ArrowUpRight size={18} />
                    </button>

                    <p className="text-center text-xs leading-relaxed text-[var(--color-secondary)]">
                      Please ensure your details are correct before submitting.
                    </p>

                  </form>
                </>
              ) : (
                /* SUCCESS MESSAGE */
                <div className="py-8 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--color-accent)] text-black">
                    <CheckCircle2 size={34} />
                  </div>

                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--color-accent)]">
                    Registration Successful
                  </p>

                  <h2 className="text-2xl font-black">
                    You're on the list!
                  </h2>

                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-secondary)]">
                    Thank you, {formData.name}! Your registration for{" "}
                    <span className="font-semibold text-[var(--color-primary)]">
                      {event.name}
                    </span>{" "}
                    has been submitted successfully.
                  </p>

                  <div className="mt-6 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-left">
                    <p className="text-xs text-[var(--color-secondary)]">
                      Registered email
                    </p>
                    <p className="mt-1 break-all text-sm font-semibold">
                      {formData.email}
                    </p>

                    <p className="mt-4 text-xs text-[var(--color-secondary)]">
                      Phone number
                    </p>
                    <p className="mt-1 text-sm font-semibold">
                      {formData.phone}
                    </p>
                  </div>

                  <Link
                    to="/events"
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--color-accent)] px-5 py-4 text-sm font-bold uppercase tracking-wider text-black transition hover:-translate-y-1"
                  >
                    Explore More Events
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              )}

            </div>
          </aside>

        </div>
      </div>
    </main>
  );
}

export default EventDetails;
