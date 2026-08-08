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

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-black relative">
      <div
        className="absolute bottom-0 left-0 w-full h-[1px] bg-[linear-gradient(to_right,transparent,var(--castlepink)_20%,var(--castlepink)_80%,transparent)]"
        aria-hidden="true"
      />

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
              {page.name}

              <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-castlepink transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

      </div>

      {/* Mobile Header */}
      <div className="flex lg:hidden w-full px-5 py-3 justify-between items-center gap-3">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
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
      >
        <nav className="flex flex-col px-4 pb-4 font-fredoka font-bold tracking-wide">
          {pages.map((page) => (
            <Link
              key={page.name}
              to={page.path}
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
