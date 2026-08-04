import { useParams, Link } from "react-router-dom";
import { getCaseStudy } from "../content/case-studies";

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);

  if (!study) {
    return (
      <main className="min-h-screen bg-black text-white px-4 sm:px-10 py-16 font-fredoka text-center">
        <h1 className="text-3xl font-bold text-castlepink mb-4">Case study not found</h1>
        <p className="text-castlepurple mb-8">That project doesn't exist (yet).</p>
        <Link
          to="/projects"
          className="inline-block px-6 py-3 border border-castlepink text-castlepink rounded-lg hover-glow-small hover:bg-gray-900 hover:text-castlepurple transition-colors"
        >
          Back to Projects
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white px-4 sm:px-10 py-16 font-fredoka">
      <div className="max-w-[800px] mx-auto">
        <Link to="/projects" className="text-castlepurple hover:text-castlepink transition-colors">
          ← Back to Projects
        </Link>

        <p className="text-xs uppercase tracking-wide text-castlepink/70 mt-6 mb-1">{study.category}</p>
        <h1 className="text-4xl font-bold text-castlepink mb-4 tracking-wider">{study.title}</h1>
        <p className="text-lg text-castlepurple mb-10">{study.summary}</p>

        {study.image && (
          <img
            src={study.image}
            alt={study.title}
            className="w-full rounded-lg border border-castlepink mb-10"
          />
        )}

        {study.role && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-wide text-castlepink mb-2">Role</h2>
            <p className="text-castlepurple">{study.role}</p>
          </div>
        )}

        {study.stack?.length > 0 && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-wide text-castlepink mb-2">Stack</h2>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1 border border-castlepink/40 text-castlepurple rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {study.problem && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-wide text-castlepink mb-2">Problem</h2>
            <p className="text-castlepurple">{study.problem}</p>
          </div>
        )}

        {study.approach && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-wide text-castlepink mb-2">Approach</h2>
            <p className="text-castlepurple">{study.approach}</p>
          </div>
        )}

        {study.results && (
          <div className="mb-8">
            <h2 className="text-sm uppercase tracking-wide text-castlepink mb-2">Results</h2>
            <p className="text-castlepurple">{study.results}</p>
          </div>
        )}

        {study.links?.length > 0 && (
          <div className="flex flex-wrap gap-4 mt-10">
            {study.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-block px-4 py-2 border border-castlepink text-castlepink rounded-lg hover-glow-small hover:bg-gray-900 hover:text-castlepurple transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
