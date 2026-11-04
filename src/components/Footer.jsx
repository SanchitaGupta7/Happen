
import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, ArrowRight } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-primary)]">

      {/* TOP FOOTER */}
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10 sm:px-10 md:px-16 lg:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <Link to="/" className="inline-block">
              <h2 className="text-3xl font-black uppercase tracking-tighter">
                HAPPEN<span className="text-[var(--color-accent)]">.</span>
              </h2>
            </Link>

            <p className="mt-5 max-w-xs text-sm leading-7 text-[var(--color-secondary)]">
              Life is made of moments. Discover exciting events,
              meet amazing people and create memories worth
              remembering. Your next experience starts here.
            </p>

            {/* SOCIAL LINKS */}
            <div className="mt-7 flex items-center gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="rounded-full border border-[var(--color-border)] px-4 py-3 text-xs font-semibold transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black"
              >
                Instagram
              </a>

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="rounded-full border border-[var(--color-border)] px-4 py-3 text-sm font-bold transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black"
              >
                in
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
                aria-label="Twitter"
                className="rounded-full border border-[var(--color-border)] px-4 py-3 text-xs font-semibold transition hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-black"
              >
                X
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest">
              Explore
            </h3>

            <ul className="space-y-4 text-sm text-[var(--color-secondary)]">
              <li>
                <Link to="/" className="transition hover:text-[var(--color-accent)]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="transition hover:text-[var(--color-accent)]">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/my-registrations" className="transition hover:text-[var(--color-accent)]">
                  Your Registrations
                </Link>
              </li>
            </ul>
          </div>

          {/* EVENT CATEGORIES */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest">
              Categories
            </h3>

            <ul className="space-y-4 text-sm text-[var(--color-secondary)]">
              <li>Music & Festivals</li>
              <li>Technology</li>
              <li>Art & Design</li>
              <li>Literature</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="mb-6 text-sm font-bold uppercase tracking-widest">
              Get in Touch
            </h3>

            <p className="mb-5 text-sm leading-7 text-[var(--color-secondary)]">
              Have a question or want to collaborate?
              We'd love to hear from you.
            </p>

            <a
              href="mailto:hello@momento.in"
              className="flex items-center gap-3 text-sm transition hover:text-[var(--color-accent)]"
            >
              <Mail size={17} className="text-[var(--color-accent)]" />
              contact@happen.in
            </a>

            <div className="mt-5 flex items-center gap-3 text-sm text-[var(--color-secondary)]">
              <MapPin size={17} className="text-[var(--color-accent)]" />
              India
            </div>
          </div>
        </div>

        {/* NEWSLETTER */}
        <div className="mt-16 flex flex-col justify-between gap-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-7 sm:p-10 lg:flex-row lg:items-center">

          <div className="max-w-lg">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[var(--color-accent)]">
              Stay in the loop
            </p>

            <h3 className="text-2xl font-black uppercase sm:text-3xl">
              Don't miss a moment.
            </h3>

            <p className="mt-3 text-sm leading-6 text-[var(--color-secondary)]">
              Get updates about upcoming events, exclusive experiences
              and exciting things happening around you.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for subscribing!");
              e.target.reset();
            }}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-primary)] outline-none placeholder:text-[var(--color-secondary)] focus:border-[var(--color-accent)]"
            />

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-md bg-[#C5F467] px-5 py-3 text-sm font-bold text-black transition hover:bg-white cursor-pointer"
            >
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* BOTTOM FOOTER */}
      <div className="">
        <div className="mx-auto flex max-w-7xl flex-col px-6 py-6 text-xs text-[var(--color-secondary)] sm:px-10 md:flex-row md:items-center md:justify-between md:px-16">

          <p>
            © {new Date().getFullYear()} Happen. All rights reserved.
          </p>
          
        </div>
      </div>

    </footer>
  );
}

export default Footer;
