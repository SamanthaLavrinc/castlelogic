import { useState } from "react";
import logo from "../assets/side-logo.png";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const pages = [
  { name: "HOME", path: "/home" },
  { name: "PROJECTS", path: "/projects" },
  { name: "RESUME", path: "/resume" },
  { name: "ABOUT", path: "/about" },
  { name: "CONTACT", path: "/contact" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-black border-b border-castlepink">

      {/* Desktop Header */}
      <div className="hidden md:flex w-full max-w-[1200px] mx-auto py-4 px-[10px] lg:px-0 justify-between items-center gap-4">

        {/* Logo */}
        <div>
          <img src={logo} alt="Castle Logic Logo" className="max-h-20 w-auto" />
        </div>

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
      <div className="flex md:hidden w-full px-4 py-4 justify-between items-center">

        {/* Logo */}
        <img
          src={logo}
          alt="Castle Logic Logo"
          className="max-h-16 w-auto"
        />

        {/* Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center text-castlepink transition-transform duration-300"
          aria-label="Toggle menu"
        >
          <div className="relative h-6 w-6">
            <Menu
              size={26}
              strokeWidth={2.5}
              className={`absolute inset-0 transition-all duration-300 ${
                menuOpen ? "scale-75 opacity-0 rotate-90" : "scale-100 opacity-100 rotate-0"
              }`}
            />

            <X
              size={26}
              strokeWidth={2.5}
              className={`absolute inset-0 transition-all duration-300 ${
                menuOpen ? "scale-100 opacity-100 rotate-0" : "scale-75 opacity-0 -rotate-90"
              }`}
            />
          </div>
        </button>

      </div>

    </header>
  );
}
