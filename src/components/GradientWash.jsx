// Reusable brand-color background treatment: a soft blend of castlepurple
// and castlepink (see src/styles/global.css for the hex values) plus a
// faint diagonal hairline motif, meant for separating a page section from
// flat black without a hard block of color. Intentionally built as a
// standalone component (rather than a one-off inline style) so it can be
// dropped behind other sections of the site later, not just the case-study
// page it was first built for.
//
// The whole stack is vignette-masked back to fully transparent along the
// sides and bottom (see `maskImage` below). The page underneath is always
// pure black, so "transparent" reads as "fades to black" — that's what
// smooths the visual snap when this element flips from scrolling normally
// to pinned-fixed at the dock threshold: both positioning modes render the
// same soft vignette, so there's no hard-edged rectangle whose position
// visibly jumps, just a glow that's already fading out near the edges.
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
  // Single ellipse mask anchored to the top-center: opaque through the
  // middle (where the glow needs to read clearly), fading to fully
  // transparent toward the left/right edges and the bottom. A lone
  // radial-gradient mask (no mask-composite layering) keeps this working
  // the same way in every evergreen browser, Safari included.
  const vignetteMask = "radial-gradient(140% 130% at 50% 0%, #000 45%, #000 60%, transparent 100%)";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none z-0 ${fixed ? "fixed left-0 right-0 bottom-0" : "absolute inset-0"} ${className}`}
      style={{
        top: fixed ? top : undefined,
        WebkitMaskImage: vignetteMask,
        maskImage: vignetteMask,
        background:
          "repeating-linear-gradient(135deg, rgba(203,144,255,0.035) 0px, rgba(203,144,255,0.035) 1px, transparent 1px, transparent 64px)," +
          "radial-gradient(120% 90% at 12% 0%, rgba(203,144,255,0.16) 0%, rgba(203,144,255,0) 55%)," +
          "radial-gradient(120% 90% at 100% 100%, rgba(255,70,162,0.14) 0%, rgba(255,70,162,0) 55%)," +
          "linear-gradient(160deg, rgba(203,144,255,0.10) 0%, rgba(255,70,162,0.08) 100%)",
      }}
    />
  );
}
