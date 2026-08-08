import { useEffect, useState } from "react";

const PATH = "M0,40 L110,40 L110,14 L215,14 L215,66 L305,66 L305,40 L400,40";

// A thin, sharp circuit-trace line echoing the castle icon's own circuit-board
// motif, with a small point of light drifting along it. Kept static (no
// travelling dot) when the user prefers reduced motion.
export default function CircuitTrace({ className = "" }) {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
  }, []);

  return (
    <svg
      className={`absolute pointer-events-none w-full ${className}`}
      viewBox="0 0 400 80"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={PATH} fill="none" stroke="var(--castlepink)" strokeOpacity="0.16" strokeWidth="1" vectorEffect="non-scaling-stroke" />
      {!reduceMotion && (
        <circle r="2.5" fill="var(--castlepink)" fillOpacity="0.85">
          <animateMotion dur="7s" repeatCount="indefinite" path={PATH} />
        </circle>
      )}
    </svg>
  );
}
