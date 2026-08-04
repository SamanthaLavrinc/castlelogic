import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Home, LayoutGrid, FileText, User, Mail, Menu, X } from "lucide-react";

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
        className="hidden lg:flex group fixed right-0 top-0 h-screen z-40 w-16 hover:w-56 focus-within:w-56 flex-col items-start justify-center gap-2 py-6 px-3 bg-black border-l border-castlepink overflow-hidden transition-all duration-300"
        aria-label="Primary"
      >
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full px-3 py-3 rounded-lg font-fredoka font-bold tracking-wide transition-colors ${
                  isActive
                    ? "text-castlepink bg-gray-900"
                    : "text-castlepurple hover:text-castlepink"
                }`
              }
            >
              <Icon size={22} className="shrink-0" />
              <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
                {link.name}
              </span>
            </NavLink>
          );
        })}
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
