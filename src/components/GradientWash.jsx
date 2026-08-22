// Centered ambient background motif for case-study pages: a soft, glowy,
// star-scattered bloom of the brand's dual accent colors. Built as inline
// SVG rather than a generated raster image: it's brand-colored, crisp at
// any size, and trivial to re-tune (star positions, glow strength) without
// regenerating an asset.
//
// The viewBox is tall (640x980) on purpose: once this is pinned full-height
// behind the docked page (see the `fixed` mode below), the motif should be
// able to read all the way down the visible viewport rather than looking
// capped to a small band under the header. No SVG width/height attributes
// are set, so it sizes by intrinsic aspect ratio from the `max-w-[640px]`
// CSS width alone — if the pinned viewport is shorter than that renders
// tall, the parent's `overflow-hidden` simply crops the excess (which is
// already faded near-black there anyway); if it's taller, empty space below
// is just the page's own black. Horizontally, capping real pixel width to
// 640 and centering it means the motif resolves to solid black well inside
// the page's ~800px-wide centered content column, regardless of viewport
// width — narrower than the column itself, not just narrower than the
// viewport. The `edgeMask` radial gradient fades the box's own edges (sides
// most tightly, bottom more gradually to suit the taller canvas) so it
// never reads as a hard-edged rectangle.
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

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none z-0 overflow-hidden ${fixed ? "fixed left-0 right-0 bottom-0" : "absolute inset-0"} ${className}`}
      style={{ top: fixed ? top : undefined }}
    >
      <svg
        viewBox="0 0 640 980"
        className="block w-full max-w-[640px] mx-auto"
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
          <rect x="160" y="10" width="160" height="560" rx="80" ry="80" fill="#CB90FF" opacity="0.23" />
          <rect x="345" y="70" width="185" height="640" rx="92.5" ry="92.5" fill="#FF46A2" opacity="0.22" />
          <rect x="258" y="480" width="135" height="460" rx="67.5" ry="67.5" fill="#CB90FF" opacity="0.17" />
        </g>

        {/* Star-riddled points, each with a small soft glow, spread down
            through most of the taller canvas rather than bunched at top. */}
        <g filter="url(#gw-star-glow)">
          <circle cx="93.5" cy="89" r="2.8" fill="#FF46A2" opacity="0.98" />
          <circle cx="163.7" cy="139" r="2.0" fill="#CB90FF" opacity="0.9" />
          <circle cx="233.9" cy="114" r="3.3" fill="#FF46A2" opacity="0.98" />
          <circle cx="320" cy="190" r="3.8" fill="#FF46A2" opacity="0.98" />
          <circle cx="405.7" cy="152" r="2.3" fill="#CB90FF" opacity="0.9" />
          <circle cx="483.9" cy="215" r="2.5" fill="#FF46A2" opacity="0.94" />
          <circle cx="374.2" cy="291" r="2.0" fill="#CB90FF" opacity="0.83" />
          <circle cx="116.9" cy="253" r="1.8" fill="#CB90FF" opacity="0.78" />
          <circle cx="514.5" cy="114" r="1.9" fill="#FF46A2" opacity="0.83" />
          <circle cx="546.0" cy="291" r="2.3" fill="#CB90FF" opacity="0.78" />
          <circle cx="46.8" cy="190" r="1.6" fill="#FF46A2" opacity="0.71" />
          <circle cx="296.0" cy="329" r="1.9" fill="#CB90FF" opacity="0.71" />
          <circle cx="195.1" cy="354" r="1.6" fill="#FF46A2" opacity="0.67" />
          <circle cx="452.3" cy="342" r="1.8" fill="#FF46A2" opacity="0.67" />
          <circle cx="561.2" cy="177" r="2.0" fill="#CB90FF" opacity="0.71" />
          <circle cx="265.3" cy="51" r="1.6" fill="#CB90FF" opacity="0.67" />
          <circle cx="584.6" cy="80" r="2.0" fill="#FF46A2" opacity="0.81" />
          <circle cx="603.1" cy="300" r="1.6" fill="#CB90FF" opacity="0.69" />
          <circle cx="24.6" cy="320" r="1.4" fill="#FF46A2" opacity="0.63" />
          <circle cx="554.0" cy="400" r="1.8" fill="#CB90FF" opacity="0.63" />
          <circle cx="430.8" cy="60" r="1.7" fill="#FF46A2" opacity="0.75" />
          <circle cx="184.6" cy="180" r="1.4" fill="#CB90FF" opacity="0.69" />
          <circle cx="332.3" cy="420" r="1.7" fill="#FF46A2" opacity="0.63" />
          <circle cx="474.0" cy="480" r="1.5" fill="#CB90FF" opacity="0.58" />
          <circle cx="135.4" cy="470" r="1.6" fill="#FF46A2" opacity="0.6" />
          <circle cx="277.0" cy="560" r="1.4" fill="#CB90FF" opacity="0.55" />
          <circle cx="393.9" cy="600" r="1.8" fill="#FF46A2" opacity="0.58" />
          <circle cx="523.1" cy="600" r="1.4" fill="#CB90FF" opacity="0.52" />
          <circle cx="233.9" cy="680" r="1.5" fill="#FF46A2" opacity="0.48" />
          <circle cx="73.8" cy="560" r="1.3" fill="#CB90FF" opacity="0.48" />
        </g>
      </svg>
    </div>
  );
}
