import { useState } from "react";
import logo from "../assets/side-logo.png";
import { Link } from "react-router-dom";

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
          className="text-castlepink"
        >
          <div className="relative w-6 h-6">
                      <span
                        className={`absolute left-0 top-2 w-6 h-[2px] rounded-full bg-castlepink transition-all duration-300 ${
                          menuOpen
                            ? "top-3 rotate-45"
                            : ""
                        }`}
                      />

                      <span
                        className={`absolute left-0 top-4 w-6 h-[2px] rounded-full bg-castlepink origin-center transform transition-all duration-300 ${
                          menuOpen ? "opacity-0" : ""
                        }`}
                      />

                      <span
                        className={`absolute left-0 top-4 w-6 h-[2px] rounded-full bg-castlepink transition-all duration-300 ${
                          menuOpen
                            ? "top-3 -rotate-45"
                            : ""
                        }`}
                      />
                    </div>
        </button>

      </div>

    </header>
  );
}
