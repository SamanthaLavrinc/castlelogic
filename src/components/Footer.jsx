export default function Footer() {
  return (
    <footer className="w-full bg-black border-t border-castlepink text-white py-6">
      <div className="max-w-[1200px] mx-auto text-center text-sm space-y-2">

        <p className="font-fredoka tracking-wide text-castlepurple">
          &copy; {new Date().getFullYear()} Castle Logic LLC. All rights reserved.
        </p>

        <p className="text-castlepurple/70">
          Design & Development Studio - United States
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
