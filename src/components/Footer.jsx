export default function Footer() {
  return (
    <footer className="w-full bg-black text-white relative">
      {/* Top rule, capped to the same 1200px content width as the copy
          below rather than running full-bleed edge to edge. Solid
          castlepink, no opacity — a separate element (rather than a border
          on the footer itself) since a border on a full-width element can't
          be width-capped and centered independently of the element's own
          box. Vertical padding moved off `<footer>` onto the wrapper below
          so this rule sits flush at the very top edge, not inset by it. */}
      <div className="max-w-[1200px] mx-auto border-t border-castlepink" />

      <div className="py-6">
        <div className="max-w-[1200px] mx-auto text-center text-sm space-y-2">

          <p className="font-fredoka tracking-wide text-castlepurple">
            &copy; {new Date().getFullYear()} Castle Logic LLC. All rights reserved.
          </p>

          <p className="text-castlepurple/70">
            Design & Development Studio - Pittsburgh, PA
          </p>

          <a
            href="mailto:contact@castlelogic.dev"
            className="py-3.5 sm:py-0 text-castlepink hover:text-castlepurple transition-colors"
          >
            contact@castlelogic.dev
          </a>

        </div>
      </div>
    </footer>
  );
}
