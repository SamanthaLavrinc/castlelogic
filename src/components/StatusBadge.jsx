// A literal neon-sign badge (glowing border + glowing uppercase text, like
// a diner "OPEN" sign). Soft red rather than brand pink or purple: the one
// deliberate exception to the site's usual pink/purple-only rule, since a
// status flag reads more naturally in a caution color, and the neon-sign
// framing sells "status" as something lit up/flagged rather than just
// another emphasized line. `.neon-sign-flicker` (see global.css) flickers
// it to life once on mount, like a tube warming up, then settles into a
// steady glow — it doesn't loop, so it reads as a nice one-time detail
// rather than a distracting animation every time this scrolls past.
//
// Extracted from CaseStudyDetail.jsx so it can also badge blurred
// "under construction" images on in-progress case studies (see
// CaseStudyCard.jsx and ImageGallery.jsx), not just the intro-card
// statusNote it was originally built for. `size="sm"` shrinks it to fit
// inside small gallery thumbnails.
export default function StatusBadge({ text, size = "default" }) {
  const neonRed = "#FF5A5A";
  const sizeClasses =
    size === "sm" ? "px-3 py-1 text-[10px] sm:text-xs" : "px-6 py-2 text-base sm:text-lg";

  return (
    <span
      className={`neon-sign-flicker inline-block rounded-full border-2 uppercase tracking-wide ${sizeClasses}`}
      style={{
        color: neonRed,
        borderColor: neonRed,
        textShadow: "0 0 6px rgba(255,90,90,0.9), 0 0 14px rgba(255,90,90,0.7), 0 0 28px rgba(255,90,90,0.5)",
        boxShadow: "0 0 8px rgba(255,90,90,0.6), 0 0 20px rgba(255,90,90,0.4), inset 0 0 12px rgba(255,90,90,0.15)",
      }}
    >
      {text}
    </span>
  );
}
