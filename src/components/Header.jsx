import { useState } from "react";
import castleIcon from "../assets/castle.png";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const pages = [
  { name: "HOME", path: "/" },
  { name: "PROJECTS", path: "/projects" },
  { name: "RESUME", path: "/resume" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACT", path: "/contact" },
];

// 8-point star, a semi-cheesy nod to car-lot "SALE" starbursts, kept quiet at
// low opacity and slowed way down so it reads as a wink rather than an ad.
const STAR_POINTS =
  "polygon(50% 0%, 58.4% 29.7%, 85.4% 14.6%, 70.3% 41.6%, 100% 50%, 70.3% 58.4%, 85.4% 85.4%, 58.4% 70.3%, 50% 100%, 41.6% 70.3%, 14.6% 85.4%, 29.7% 58.4%, 0% 50%, 29.7% 41.6%, 14.6% 14.6%, 41.6% 29.7%)";

function ContactStarburst({ size = "w-10 h-10" }) {
  return (
    <span
      className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none"
      aria-hidden="true"
    >
      <span
        className={`contact-starburst ${size} shrink-0 bg-gray-900 opacity-50 animate-spin [animation-duration:13s]`}
        style={{ clipPath: STAR_POINTS }}
      />
    </span>
  );
}

// Small 4-point sparkle shape, distinct from the 8-point starburst above.
const SPARKLE_POINTS =
  "polygon(50% 0%, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0% 50%, 35% 35%)";

function ContactSparkles() {
  return (
    <span
      className="absolute inset-0 z-10 pointer-events-none"
      aria-hidden="true"
    >
      <span
        className="sparkle-twinkle absolute -top-1.5 left-1 w-2 h-2 bg-white"
        style={{ clipPath: SPARKLE_POINTS, animationDelay: "0s", animationDuration: "2.4s" }}
      />
      <span
        className="sparkle-twinkle absolute top-0 right-0 w-1.5 h-1.5 bg-white"
        style={{ clipPath: SPARKLE_POINTS, animationDelay: "0.9s", animationDuration: "3.1s" }}
      />
      <span
        className="sparkle-twinkle absolute -bottom-1.5 left-1/2 w-1.5 h-1.5 bg-white"
        style={{ clipPath: SPARKLE_POINTS, animationDelay: "1.7s", animationDuration: "2.8s" }}
      />

      {/* Static sparkles, scattered the same way as the twinkling ones but
          not animated — without these the twinkles read as three pulsing
          dots rather than a glitter/sparkle texture. */}
      <span
        className="absolute top-1/2 -left-2 -translate-y-1/2 w-1 h-1 bg-white opacity-40"
        style={{ clipPath: SPARKLE_POINTS }}
      />
      <span
        className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-white opacity-50"
        style={{ clipPath: SPARKLE_POINTS }}
      />
      <span
        className="absolute -bottom-1 -right-2 w-1.5 h-1.5 bg-white opacity-35"
        style={{ clipPath: SPARKLE_POINTS }}
      />
    </span>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-black relative sticky top-0 z-50 overflow-hidden">
      {/* Desktop Header */}
      <div className="hidden lg:flex w-full max-w-[1200px] mx-auto px-4 py-4 justify-between items-center gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img src={castleIcon} alt="" className="h-12 w-auto" aria-hidden="true" />
          <span className="font-fredoka font-bold text-3xl text-castlepink tracking-wide">
            CASTLE LOGIC
          </span>
        </Link>

        {/* Pretty full-time navigation */}
        <nav className="flex space-x-6 font-fredoka font-bold tracking-wide">
          {pages.map((page) => (
            <Link
              key={page.name}
              to={page.path}
              className="relative group text-castlepurple hover:text-castlepink transition-colors"
            >
              {page.name === "CONTACT" && <ContactStarburst size="w-36 h-36" />}
              {page.name === "CONTACT" && <ContactSparkles />}
              {page.name}

              <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-castlepink transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

      </div>

      {/* Mobile Header */}
      <div className="flex lg:hidden w-full px-5 py-3 justify-between items-center gap-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0 py-2 sm:py-0">
          <img src={castleIcon} alt="" className="h-7 w-auto" aria-hidden="true" />
          <span className="font-fredoka font-bold text-lg text-castlepink tracking-wide">
            CASTLE LOGIC
          </span>
        </Link>

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 shrink-0 items-center justify-center text-castlepink transition-transform duration-300"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <div className="relative h-6 w-6">
            <Menu
              size={24}
              strokeWidth={2.5}
              className={`absolute inset-0 transition-all duration-300 ${
                menuOpen ? "scale-75 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0"
              }`}
            />

            <X
              size={24}
              strokeWidth={2.5}
              className={`absolute inset-0 transition-all duration-300 ${
                menuOpen ? "scale-100 opacity-100 rotate-0" : "scale-75 opacity-0 -rotate-90"
              }`}
            />
          </div>
        </button>

      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-80" : "max-h-0"
        }`}
        aria-hidden={!menuOpen}
      >
        <nav className="flex flex-col px-4 pb-4 font-fredoka font-bold tracking-wide">
          {pages.map((page) => (
            <Link
              key={page.name}
              to={page.path}
              tabIndex={menuOpen ? 0 : -1}
              onClick={() => setMenuOpen(false)}
              className="py-3 border-t border-castlepink/30 text-castlepurple hover:text-castlepink transition-colors"
            >
              {page.name}
            </Link>
          ))}
        </nav>
      </div>

    </header>
  );
}
