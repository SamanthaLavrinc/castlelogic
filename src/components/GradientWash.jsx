// Centered ambient background motif for case-study pages: a soft, glowy,
// star-riddled echo of the same node/constellation motif used in the
// project's own header art (see src/assets/projects/*/images/header-image.png
// and the layout conventions in docs/design-brief.md), just dialed way down
// so it reads as atmosphere rather than a second illustration. Built as
// inline SVG rather than a generated raster image: it's brand-colored,
// crisp at any size, and trivial to re-tune (star positions, glow strength)
// without regenerating an asset.
//
// Deliberately capped to a fixed-size box (`max-w-[820px]`, viewBox height
// 440) rather than sized as a percentage of its container. A percentage-based
// glow would stretch to fill whatever tall section it's dropped into; capping
// the box in real pixels and centering it means the motif always resolves
// back to solid black well inside a ~1200px-wide centered content column and
// well before the halfway point of typical viewport heights, regardless of
// how long the page underneath is. The `edgeMask` radial gradient then fades
// the box's own edges to transparent so even that capped box doesn't read as
// a hard-edged rectangle.
//
// Two positioning modes, chosen by the caller:
//   - normal flow (default, `fixed={false}`): absolutely fills its nearest
//     positioned ancestor (which must have `position: relative` and a real
//     height), so it scrolls with the page like an ordinary background. The
//     motif itself still only occupies the top of that box (no vertical
//     stretch), so it sits just below the page content that precedes it.
//   - `fixed`: pinned to the viewport via `position: fixed`, offset from the
//     top by the `top` prop (in px). Callers that flip between the two modes
//     — e.g. on an IntersectionObserver threshold — get a background that
//     scrolls normally up to a point, then "docks" in place so page content
//     visually scrolls over a static backdrop from then on.
//
// Purely decorative: aria-hidden and pointer-events-none so it never
// intercepts clicks or gets announced to screen readers.
export default function GradientWash({ fixed = false, top = 0, className = "" }) {
  const edgeMask = "radial-gradient(65% 62% at 50% 26%, #000 0%, #000 38%, transparent 82%)";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none z-0 overflow-hidden ${fixed ? "fixed left-0 right-0 bottom-0" : "absolute inset-0"} ${className}`}
      style={{ top: fixed ? top : undefined }}
    >
      <svg
        viewBox="0 0 820 440"
        className="block w-full max-w-[820px] mx-auto"
        style={{ WebkitMaskImage: edgeMask, maskImage: edgeMask }}
      >
        <defs>
          <filter id="gw-star-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="1.3" />
          </filter>
          <filter id="gw-nebula-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="55" />
          </filter>
        </defs>

        {/* Soft ambient haze — the "very glowy" layer. Two large heavily
            blurred blobs in the brand's 55/45 pink/purple mix. */}
        <circle cx="300" cy="120" r="170" fill="#CB90FF" opacity="0.15" filter="url(#gw-nebula-glow)" />
        <circle cx="560" cy="180" r="200" fill="#FF46A2" opacity="0.14" filter="url(#gw-nebula-glow)" />

        {/* Sparse constellation lines, nearest-neighbor only — same
            restrained-connection rule as the header art motif. */}
        <g stroke="#FF46A2" strokeOpacity="0.22" strokeWidth="1">
          <line x1="120" y1="70" x2="210" y2="110" />
          <line x1="210" y1="110" x2="300" y2="90" />
          <line x1="300" y1="90" x2="410" y2="150" />
        </g>
        <g stroke="#CB90FF" strokeOpacity="0.2" strokeWidth="1">
          <line x1="410" y1="150" x2="520" y2="120" />
          <line x1="520" y1="120" x2="620" y2="170" />
          <line x1="480" y1="230" x2="410" y2="150" />
        </g>

        {/* Star-riddled points, each with a small soft glow. */}
        <g filter="url(#gw-star-glow)">
          <circle cx="120" cy="70" r="2.2" fill="#FF46A2" opacity="0.8" />
          <circle cx="210" cy="110" r="1.6" fill="#CB90FF" opacity="0.7" />
          <circle cx="300" cy="90" r="2.6" fill="#FF46A2" opacity="0.85" />
          <circle cx="410" cy="150" r="3" fill="#FF46A2" opacity="0.9" />
          <circle cx="520" cy="120" r="1.8" fill="#CB90FF" opacity="0.7" />
          <circle cx="620" cy="170" r="2" fill="#FF46A2" opacity="0.75" />
          <circle cx="480" cy="230" r="1.6" fill="#CB90FF" opacity="0.65" />
          <circle cx="150" cy="200" r="1.4" fill="#CB90FF" opacity="0.6" />
          <circle cx="660" cy="90" r="1.5" fill="#FF46A2" opacity="0.65" />
          <circle cx="700" cy="230" r="1.8" fill="#CB90FF" opacity="0.6" />
          <circle cx="60" cy="150" r="1.3" fill="#FF46A2" opacity="0.55" />
          <circle cx="380" cy="260" r="1.5" fill="#CB90FF" opacity="0.55" />
          <circle cx="250" cy="280" r="1.3" fill="#FF46A2" opacity="0.5" />
          <circle cx="580" cy="270" r="1.4" fill="#FF46A2" opacity="0.5" />
          <circle cx="720" cy="140" r="1.6" fill="#CB90FF" opacity="0.55" />
          <circle cx="340" cy="40" r="1.3" fill="#CB90FF" opacity="0.5" />
        </g>
      </svg>
    </div>
  );
}
