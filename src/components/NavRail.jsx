import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Home, LayoutGrid, FileText, User, Mail, Menu, X } from "lucide-react";
import castleIcon from "../assets/castle.png";

const links = [
  { name: "Home", path: "/home", icon: Home },
  { name: "Projects", path: "/projects", icon: LayoutGrid },
  { name: "Resume", path: "/resume", icon: FileText },
  { name: "About", path: "/about", icon: User },
  { name: "Contact", path: "/contact", icon: Mail },
];

export default function NavRail() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop icon rail: expands on hover or keyboard focus, never hover-only */}
      <nav
        className="hidden lg:flex group fixed right-0 top-0 h-screen z-40 w-16 hover:w-56 focus-within:w-56 flex-col items-start pt-6 px-3 bg-black border-l border-castlepink overflow-hidden transition-all duration-300"
        aria-label="Primary"
      >
        <Link to="/home" className="flex items-center gap-3 w-full py-2 mb-4 shrink-0">
          <img src={castleIcon} alt="" className="h-13 w-13 shrink-0 object-contain" />
          <span className="whitespace-nowrap overflow-hidden max-w-0 opacity-0 group-hover:max-w-[140px] group-hover:opacity-100 group-focus-within:max-w-[140px] group-focus-within:opacity-100 transition-all duration-200 font-fredoka font-bold text-castlepink tracking-wide">
            CASTLE LOGIC
          </span>
        </Link>

        <div className="w-full border-t border-castlepink/30 mb-2 shrink-0" />

        <div className="flex flex-col gap-1 w-full">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className="flex items-center gap-3 w-full font-fredoka font-bold tracking-wide"
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`flex items-center justify-center h-10 w-10 shrink-0 rounded-lg transition-colors ${
                        isActive
                          ? "text-castlepink bg-gray-900"
                          : "text-castlepurple hover:text-castlepink"
                      }`}
                    >
                      <Icon size={22} />
                    </span>
                    <span
                      className={`whitespace-nowrap overflow-hidden max-w-0 opacity-0 group-hover:max-w-[140px] group-hover:opacity-100 group-focus-within:max-w-[140px] group-focus-within:opacity-100 transition-all duration-200 ${
                        isActive ? "text-castlepink" : "text-castlepurple hover:text-castlepink"
                      }`}
                    >
                      {link.name}
                    </span>
                  </>
                )}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Mobile trigger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 right-5 z-50 flex h-11 w-11 items-center justify-center text-castlepink"
        aria-label="Open menu"
      >
        <Menu size={26} strokeWidth={2.5} />
      </button>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="absolute inset-0 bg-black/70" onClick={() => setMobileOpen(false)} />

        <div
          className={`absolute top-0 right-0 h-full w-72 max-w-[80vw] bg-black border-l border-castlepink p-6 flex flex-col gap-2 transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <button
            onClick={() => setMobileOpen(false)}
            className="self-end mb-4 flex h-11 w-11 items-center justify-center text-castlepink"
            aria-label="Close menu"
          >
            <X size={26} strokeWidth={2.5} />
          </button>

          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-3 rounded-lg font-fredoka font-bold tracking-wide transition-colors ${
                    isActive
                      ? "text-castlepink bg-gray-900"
                      : "text-castlepurple hover:text-castlepink"
                  }`
                }
              >
                <Icon size={22} />
                {link.name}
              </NavLink>
            );
          })}
        </div>
      </div>
    </>
  );
}
