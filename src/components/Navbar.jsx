import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon, UserRound, Menu, X } from "lucide-react";

function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") !== "light";
  });

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("light", !darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" }
  ];

  return (
    <header className="fixed top-0 z-50 w-full px-5 pt-5">
      <nav
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-6 py-3 transition-all duration-300 md:px-8 ${
          darkMode
            ? "border-white/10 bg-[#151713]/85 text-[#F4F4EB]"
            : "border-black/10 bg-[#F5F5EF]/90 text-[#191B17]"
        } ${
          scrolled
            ? "shadow-xl backdrop-blur-2xl"
            : "shadow-md backdrop-blur-lg"
        }`}
      >
        {/* Logo */}
        <Link to="/" className="text-2xl font-black tracking-tighter">
          HAPPEN<span className="text-accent">.</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              end={link.path === "/"}
              className={({ isActive }) =>
                `text-sm font-semibold transition-colors ${
                  isActive
                    ? "text-accent"
                    : "opacity-75 hover:opacity-100 hover:text-accent"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="rounded-full border border-current/15 p-2.5 transition hover:bg-accent hover:text-black"
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <Link
            to="/my-registrations"
            className="hidden rounded-full bg-accent p-2.5 text-[#10110F] transition hover:scale-105 sm:flex"
            title="My Registrations"
          >
            <UserRound size={19} />
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`mx-auto mt-2 max-w-7xl rounded-2xl border p-5 backdrop-blur-xl md:hidden ${
            darkMode
              ? "border-white/10 bg-[#151713]/95 text-[#F4F4EB]"
              : "border-black/10 bg-[#F5F5EF]/95 text-[#191B17]"
          }`}
        >
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-semibold ${
                    isActive ? "text-accent" : "opacity-80"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}

            <Link
              to="/my-registrations"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 text-sm font-semibold"
            >
              <UserRound size={18} />
              My Registrations
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
