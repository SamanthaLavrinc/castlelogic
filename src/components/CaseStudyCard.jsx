import { Link } from "react-router-dom";

export default function CaseStudyCard({ study }) {
  return (
    <Link
      to={`/projects/${study.slug}`}
      className="project-card block bg-gray-900 border rounded-lg p-6 cursor-pointer"
    >
      <p className="text-xs uppercase tracking-wide text-castlepink/70 mb-1">{study.category}</p>
      <h2 className="text-xl font-semibold uppercase tracking-wide text-castlepink mb-2">{study.title}</h2>
      <p className="text-castlepurple">{study.summary}</p>
    </Link>
  );
}
