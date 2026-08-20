import { Link } from "react-router-dom";

export default function CaseStudyCard({ study }) {
  return (
    <Link
      to={`/projects/${study.slug}`}
      className="project-card flex h-full flex-col justify-between bg-gray-900 border rounded-lg p-6 cursor-pointer"
    >
      <div>
        <p className="text-xs uppercase tracking-wide text-castlepink/70 mb-1">{study.category}</p>
        <h2 className="text-xl font-semibold uppercase tracking-wide text-castlepink mb-2">{study.title}</h2>
        <p className="text-castlepurple">{study.summary}</p>
      </div>
      <span className="mt-4 text-sm font-semibold text-castlepink">View Project →</span>
    </Link>
  );
}
