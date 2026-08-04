import { Link } from "react-router-dom";

export default function CaseStudyCard({ study }) {
  return (
    <div className="bg-gray-900 border border-castlepink rounded-lg p-6 hover:scale-[1.03] transform transition-transform duration-300">
      <p className="text-xs uppercase tracking-wide text-castlepink/70 mb-1">{study.category}</p>
      <h2 className="text-xl font-bold text-castlepink mb-2">{study.title}</h2>
      <p className="text-castlepurple">{study.summary}</p>
      <Link
        to={`/projects/${study.slug}`}
        className="inline-block mt-4 px-4 py-2 border border-castlepink text-castlepink rounded-lg hover-glow-small hover:bg-gray-900 hover:text-castlepurple transition-colors"
      >
        View case study
      </Link>
    </div>
  );
}
