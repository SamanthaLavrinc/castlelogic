import logo from "../assets/side-logo.png";

export default function Header() {
  return (
    <header className="w-full bg-black border-b border-castlepink">
      <div className="w-full max-w-[1200px] mx-auto py-4 px-[10px] lg:px-0 flex justify-between items-center gap-4">

        {/* Logo */}
        <div>
          <img src={logo} alt="Castle Logic Logo" className="max-h-20 w-auto" />
        </div>

        {/* Pretty full-time navigation */}
        <nav className="flex space-x-6 font-fredoka font-bold tracking-wide">
          {["HOME", "PROJECTS", "RESUME", "ABOUT", "CONTACT"].map((item) => (
            <a
              key={item}
              href={`/${item.toLowerCase()}`}
              className="relative group text-castlepurple hover:text-castlepink transition-colors"
            >
              {item}

              {/* Pretty underline hover animation */}
              <span className="absolute left-0 bottom-[-4px] h-[2px] w-0 bg-castlepink transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

      </div>
    </header>
  );
}
