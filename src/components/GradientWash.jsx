// Centered ambient background motif for case-study pages: a soft, glowy
// bloom of the brand's dual accent colors, scattered with faint stars and a
// few small soft electric arcs — a dialed-way-down echo of the same
// glow/constellation/lightning language used in the project's own header
// art and the site's hero graphic spec (see docs/design-brief.md's
// "restrained lightning/arc treatment" note). Built as inline SVG rather
// than a generated raster image: it's brand-colored, crisp at any size, and
// trivial to re-tune (star/bolt positions, glow strength) without
// regenerating an asset.
//
// The viewBox is tall (1040x980) on purpose: once this is pinned full-height
// behind the docked page (see the `fixed` mode below), the motif should be
// able to read all the way down the visible viewport rather than looking
// capped to a small band under the header. No SVG width/height attributes
// are set, so it sizes by intrinsic aspect ratio from the `max-w-[1040px]`
// CSS width alone — if the pinned viewport is shorter than that renders
// tall, the parent's `overflow-hidden` simply crops the excess (which is
// already faded near-black there anyway); if it's taller, empty space below
// is just the page's own black. Horizontally, capping real pixel width to
// 1040 and centering it means the motif still always resolves to solid
// black well inside a ~1200px-wide centered content column, regardless of
// viewport width. The `edgeMask` radial gradient fades the box's own edges
// (sides most tightly, bottom more gradually to suit the taller canvas) so
// it never reads as a hard-edged rectangle.
//
// The ambient haze is built from tall rounded-rect "capsules" rather than
// circles: a lightly blurred vertical pill reads as a soft glowing cylinder
// of light rather than a round bloom, which suits the tall canvas far
// better than a ball of light would.
//
// Two positioning modes, chosen by the caller:
//   - normal flow (default, `fixed={false}`): absolutely fills its nearest
//     positioned ancestor (which must have `position: relative` and a real
//     height), so it scrolls with the page like an ordinary background.
//   - `fixed`: pinned to the viewport via `position: fixed`, offset from the
//     top by the `top` prop (in px). Callers that flip between the two modes
//     — e.g. on an IntersectionObserver threshold — get a background that
//     scrolls normally up to a point, then "docks" in place so page content
//     visually scrolls over a static backdrop from then on.
//
// Purely decorative: aria-hidden and pointer-events-none so it never
// intercepts clicks or gets announced to screen readers.
export default function GradientWash({ fixed = false, top = 0, className = "" }) {
  const edgeMask = "radial-gradient(65% 78% at 50% 24%, #000 0%, #000 36%, transparent 86%)";

  // A jagged, branching electric-arc shape (main stroke + a shorter fork
  // partway down) rather than a symmetric "flash icon" glyph — reused at a
  // few positions/rotations/colors below.
  const bolt = (transform, stroke, opacity) => (
    <g transform={transform}>
      <path
        d="M 0 0 L 8 20 L -6 26 L 14 52 L 4 58 L 18 84 L 6 90 L 16 118 L 2 130"
        stroke={stroke}
        strokeOpacity={opacity}
        strokeWidth="1.6"
      />
      <path
        d="M 14 52 L 30 66 L 20 72 L 34 92"
        stroke={stroke}
        strokeOpacity={opacity * 0.85}
        strokeWidth="1.3"
      />
    </g>
  );

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none z-0 overflow-hidden ${fixed ? "fixed left-0 right-0 bottom-0" : "absolute inset-0"} ${className}`}
      style={{ top: fixed ? top : undefined }}
    >
      <svg
        viewBox="0 0 1040 980"
        className="block w-full max-w-[1040px] mx-auto"
        style={{ WebkitMaskImage: edgeMask, maskImage: edgeMask }}
      >
        <defs>
          <filter id="gw-star-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
          <filter id="gw-nebula-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="54" />
          </filter>
        </defs>

        {/* Soft ambient haze — tall rounded-rect "capsules" in the brand's
            55/45 pink/purple mix, read as glowing vertical cylinders of
            light rather than round blobs once blurred, chained down the
            taller canvas so the glow has presence well past the top third. */}
        <g filter="url(#gw-nebula-glow)">
          <rect x="260" y="10" width="260" height="560" rx="130" ry="130" fill="#CB90FF" opacity="0.23" />
          <rect x="560" y="70" width="300" height="640" rx="150" ry="150" fill="#FF46A2" opacity="0.22" />
          <rect x="420" y="480" width="220" height="460" rx="110" ry="110" fill="#CB90FF" opacity="0.17" />
        </g>

        {/* Small soft electric arcs — the same restrained "arc" motif as
            the hero graphic's POWERFUL treatment, shrunk to a faint
            background accent rather than a foreground illustration. Jagged
            multi-segment paths with a short branch fork, not a symmetric
            flash-icon glyph. */}
        <g fill="none" strokeLinecap="round" strokeLinejoin="round" filter="url(#gw-star-glow)">
          {bolt("translate(150,210) rotate(-10) scale(0.9)", "#FF46A2", 0.52)}
          {bolt("translate(860,110) rotate(16) scale(1.05)", "#CB90FF", 0.46)}
          {bolt("translate(600,440) rotate(-18) scale(0.85)", "#FF46A2", 0.46)}
          {bolt("translate(320,590) rotate(9) scale(0.95)", "#CB90FF", 0.44)}
        </g>

        {/* Star-riddled points, each with a small soft glow, spread down
            through most of the taller canvas rather than bunched at top. */}
        <g filter="url(#gw-star-glow)">
          <circle cx="152" cy="89" r="2.8" fill="#FF46A2" opacity="0.98" />
          <circle cx="266" cy="139" r="2.0" fill="#CB90FF" opacity="0.9" />
          <circle cx="380" cy="114" r="3.3" fill="#FF46A2" opacity="0.98" />
          <circle cx="520" cy="190" r="3.8" fill="#FF46A2" opacity="0.98" />
          <circle cx="659" cy="152" r="2.3" fill="#CB90FF" opacity="0.9" />
          <circle cx="786" cy="215" r="2.5" fill="#FF46A2" opacity="0.94" />
          <circle cx="608" cy="291" r="2.0" fill="#CB90FF" opacity="0.83" />
          <circle cx="190" cy="253" r="1.8" fill="#CB90FF" opacity="0.78" />
          <circle cx="836" cy="114" r="1.9" fill="#FF46A2" opacity="0.83" />
          <circle cx="887" cy="291" r="2.3" fill="#CB90FF" opacity="0.78" />
          <circle cx="76" cy="190" r="1.6" fill="#FF46A2" opacity="0.71" />
          <circle cx="481" cy="329" r="1.9" fill="#CB90FF" opacity="0.71" />
          <circle cx="317" cy="354" r="1.6" fill="#FF46A2" opacity="0.67" />
          <circle cx="735" cy="342" r="1.8" fill="#FF46A2" opacity="0.67" />
          <circle cx="912" cy="177" r="2.0" fill="#CB90FF" opacity="0.71" />
          <circle cx="431" cy="51" r="1.6" fill="#CB90FF" opacity="0.67" />
          <circle cx="950" cy="80" r="2.0" fill="#FF46A2" opacity="0.81" />
          <circle cx="980" cy="300" r="1.6" fill="#CB90FF" opacity="0.69" />
          <circle cx="40" cy="320" r="1.4" fill="#FF46A2" opacity="0.63" />
          <circle cx="900" cy="400" r="1.8" fill="#CB90FF" opacity="0.63" />
          <circle cx="700" cy="60" r="1.7" fill="#FF46A2" opacity="0.75" />
          <circle cx="300" cy="180" r="1.4" fill="#CB90FF" opacity="0.69" />
          <circle cx="540" cy="420" r="1.7" fill="#FF46A2" opacity="0.63" />
          <circle cx="770" cy="480" r="1.5" fill="#CB90FF" opacity="0.58" />
          <circle cx="220" cy="470" r="1.6" fill="#FF46A2" opacity="0.6" />
          <circle cx="450" cy="560" r="1.4" fill="#CB90FF" opacity="0.55" />
          <circle cx="640" cy="600" r="1.8" fill="#FF46A2" opacity="0.58" />
          <circle cx="850" cy="600" r="1.4" fill="#CB90FF" opacity="0.52" />
          <circle cx="380" cy="680" r="1.5" fill="#FF46A2" opacity="0.48" />
          <circle cx="120" cy="560" r="1.3" fill="#CB90FF" opacity="0.48" />
        </g>
      </svg>
    </div>
  );
}
