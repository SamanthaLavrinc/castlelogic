import { Link } from "react-router-dom";

// Three status states, differentiated by label + border/fill weight only —
// this codebase has exactly two custom color tokens (castlepink/castlepurple),
// so no new hues get introduced here.
const STATUS_LABELS = {
  live: "Live",
  "in-progress": "In Progress",
  concept: "Concept",
};

const STATUS_CLASSES = {
  live: "border-castlepink bg-castlepink/10 text-castlepink",
  "in-progress": "border-castlepink/40 text-castlepurple",
  concept: "border-castlepink/20 text-castlepurple/60",
};

export default function CaseStudyCard({ study }) {
  const statusLabel = STATUS_LABELS[study.status];
  const statusClasses = STATUS_CLASSES[study.status] ?? STATUS_CLASSES.concept;

  return (
    <Link
      to={`/projects/${study.slug}`}
      className="project-card flex h-full flex-col justify-between bg-gray-900 border rounded-lg p-6 cursor-pointer"
    >
      <div>
        {study.heroImageUrl && (
          <div className="mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-lg border-b border-castlepink/20">
            <img
              src={study.heroImageUrl}
              alt=""
              loading="lazy"
              className="h-40 w-full object-cover"
            />
          </div>
        )}

        <div className="flex items-center justify-between gap-2 mb-1">
          <p className="text-xs uppercase tracking-wide text-castlepink/70">{study.category}</p>
          {statusLabel && (
            <span
              className={`shrink-0 px-3 py-0.5 border rounded-full text-xs font-semibold ${statusClasses}`}
            >
              {statusLabel}
            </span>
          )}
        </div>
        <h2 className="text-xl font-semibold uppercase tracking-wide text-castlepink mb-2">{study.title}</h2>
        <p className="text-castlepurple">{study.summary}</p>
      </div>
      <span className="mt-4 text-sm font-semibold text-castlepink">View Project →</span>
    </Link>
  );
}
