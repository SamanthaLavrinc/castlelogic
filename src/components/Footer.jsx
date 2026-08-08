import ShineStreak from "./ShineStreak";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-6 relative">
      <ShineStreak className="inset-0" />
      <div
        className="absolute top-0 left-0 w-full h-[1px] bg-[linear-gradient(to_right,transparent,var(--castlepink)_20%,var(--castlepink)_80%,transparent)]"
        aria-hidden="true"
      />
      <div className="relative z-10 max-w-[1200px] mx-auto text-center text-sm space-y-2">

        <p className="font-fredoka tracking-wide text-castlepurple">
          &copy; {new Date().getFullYear()} Castle Logic LLC. All rights reserved.
        </p>

        <p className="text-castlepurple/70">
          Design & Development Studio - Pittsburgh, PA
        </p>

        <a
          href="mailto:contact@castlelogic.dev"
          className="text-castlepink hover:text-castlepurple transition-colors"
        >
          contact@castlelogic.dev
        </a>

      </div>
    </footer>
  );
}
