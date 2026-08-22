// Centered ambient background motif for case-study pages: a soft, glowy,
// star-riddled echo of the same node/constellation motif used in the
// project's own header art (see src/assets/projects/*/images/header-image.png
// and the layout conventions in docs/design-brief.md), just dialed way down
// so it reads as atmosphere rather than a second illustration. Built as
// inline SVG rather than a generated raster image: it's brand-colored,
// crisp at any size, and trivial to re-tune (star positions, glow strength)
// without regenerating an asset.
//
// Deliberately capped to a fixed-size box (`max-w-[1040px]`, viewBox height
// 560) rather than sized as a percentage of its container. A percentage-based
// glow would stretch to fill whatever tall section it's dropped into; capping
// the box in real pixels and centering it means the motif always resolves
// back to solid black well inside a ~1200px-wide centered content column and
// well before the halfway point of typical viewport heights, regardless of
// how long the page underneath is. This box is intentionally sized up close
// to that 1200px ceiling (bigger/bolder per design feedback) while still
// leaving a clear black margin on either side at that width. The `edgeMask`
// radial gradient then fades the box's own edges to transparent so even
// that capped box doesn't read as a hard-edged rectangle.
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
        viewBox="0 0 1040 560"
        className="block w-full max-w-[1040px] mx-auto"
        style={{ WebkitMaskImage: edgeMask, maskImage: edgeMask }}
      >
        <defs>
          <filter id="gw-star-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="1.6" />
          </filter>
          <filter id="gw-nebula-glow" x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="68" />
          </filter>
        </defs>

        {/* Soft ambient haze — the "very glowy" layer. Two large heavily
            blurred blobs in the brand's 55/45 pink/purple mix. */}
        <circle cx="380" cy="152" r="215" fill="#CB90FF" opacity="0.2" filter="url(#gw-nebula-glow)" />
        <circle cx="710" cy="228" r="254" fill="#FF46A2" opacity="0.19" filter="url(#gw-nebula-glow)" />

        {/* Sparse constellation lines, nearest-neighbor only — same
            restrained-connection rule as the header art motif. */}
        <g stroke="#FF46A2" strokeOpacity="0.26" strokeWidth="1.2">
          <line x1="152" y1="89" x2="266" y2="139" />
          <line x1="266" y1="139" x2="380" y2="114" />
          <line x1="380" y1="114" x2="520" y2="190" />
        </g>
        <g stroke="#CB90FF" strokeOpacity="0.24" strokeWidth="1.2">
          <line x1="520" y1="190" x2="659" y2="152" />
          <line x1="659" y1="152" x2="786" y2="215" />
          <line x1="608" y1="291" x2="520" y2="190" />
          <line x1="786" y1="215" x2="912" y2="177" />
          <line x1="300" y1="180" x2="190" y2="253" />
        </g>

        {/* Star-riddled points, each with a small soft glow. */}
        <g filter="url(#gw-star-glow)">
          <circle cx="152" cy="89" r="2.8" fill="#FF46A2" opacity="0.85" />
          <circle cx="266" cy="139" r="2.0" fill="#CB90FF" opacity="0.78" />
          <circle cx="380" cy="114" r="3.3" fill="#FF46A2" opacity="0.92" />
          <circle cx="520" cy="190" r="3.8" fill="#FF46A2" opacity="0.95" />
          <circle cx="659" cy="152" r="2.3" fill="#CB90FF" opacity="0.78" />
          <circle cx="786" cy="215" r="2.5" fill="#FF46A2" opacity="0.82" />
          <circle cx="608" cy="291" r="2.0" fill="#CB90FF" opacity="0.72" />
          <circle cx="190" cy="253" r="1.8" fill="#CB90FF" opacity="0.68" />
          <circle cx="836" cy="114" r="1.9" fill="#FF46A2" opacity="0.72" />
          <circle cx="887" cy="291" r="2.3" fill="#CB90FF" opacity="0.68" />
          <circle cx="76" cy="190" r="1.6" fill="#FF46A2" opacity="0.62" />
          <circle cx="481" cy="329" r="1.9" fill="#CB90FF" opacity="0.62" />
          <circle cx="317" cy="354" r="1.6" fill="#FF46A2" opacity="0.58" />
          <circle cx="735" cy="342" r="1.8" fill="#FF46A2" opacity="0.58" />
          <circle cx="912" cy="177" r="2.0" fill="#CB90FF" opacity="0.62" />
          <circle cx="431" cy="51" r="1.6" fill="#CB90FF" opacity="0.58" />
          <circle cx="950" cy="80" r="2.0" fill="#FF46A2" opacity="0.7" />
          <circle cx="980" cy="300" r="1.6" fill="#CB90FF" opacity="0.6" />
          <circle cx="40" cy="320" r="1.4" fill="#FF46A2" opacity="0.55" />
          <circle cx="900" cy="400" r="1.8" fill="#CB90FF" opacity="0.55" />
          <circle cx="500" cy="470" r="1.5" fill="#FF46A2" opacity="0.5" />
          <circle cx="150" cy="450" r="1.3" fill="#CB90FF" opacity="0.5" />
          <circle cx="700" cy="60" r="1.7" fill="#FF46A2" opacity="0.65" />
          <circle cx="300" cy="180" r="1.4" fill="#CB90FF" opacity="0.6" />
        </g>
      </svg>
    </div>
  );
}
