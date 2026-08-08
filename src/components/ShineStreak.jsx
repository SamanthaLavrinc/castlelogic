// A single hard-edged diagonal band of light behind the header/footer —
// subtle and static, no blur, no motion.
export default function ShineStreak({ className = "" }) {
  return (
    <div
      className={`absolute pointer-events-none overflow-hidden w-full ${className}`}
      aria-hidden="true"
      style={{
        background:
          "linear-gradient(115deg, transparent 46%, rgba(255,70,162,0.14) 49.5%, rgba(255,70,162,0.14) 50.5%, transparent 54%)",
      }}
    />
  );
}
