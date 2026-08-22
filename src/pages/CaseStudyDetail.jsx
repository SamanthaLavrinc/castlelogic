import { useParams, Link } from "react-router-dom";
import { getCaseStudy } from "../content/case-studies";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import ImageGallery from "../components/ImageGallery";

// Renders `**bold**` spans within a line of section-body text as <strong>.
// Small, general helper: lets bulleted list items (see renderSectionBlocks)
// keep an emphasized lead-in term without hand-rolling markup in the JSON.
function renderInlineBold(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );
}

// A section's `body` is one string; blocks are separated by a blank line.
// Two lightweight markdown-lite conventions on top of plain paragraphs:
//   - a block where every line starts with "- " renders as a real <ul>
//   - a block that's a single paragraph fully wrapped in **double asterisks**
//     renders as a bold, standalone, visually emphasized line
// Kept intentionally small rather than pulling in a markdown dependency.
function renderSectionBlocks(body) {
  if (!body) return null;

  return body.split(/\n\s*\n/).map((block, index) => {
    const trimmed = block.trim();
    const lines = trimmed.split("\n").map((line) => line.trim());

    if (lines.length > 0 && lines.every((line) => line.startsWith("- "))) {
      return (
        <ul key={index} className="list-disc pl-6 space-y-2 mb-4 last:mb-0 text-castlepurple">
          {lines.map((line, lineIndex) => (
            <li key={lineIndex}>{renderInlineBold(line.slice(2))}</li>
          ))}
        </ul>
      );
    }

    const boldMatch = trimmed.match(/^\*\*([\s\S]+)\*\*$/);
    if (boldMatch) {
      return (
        <p key={index} className="text-castlepink font-bold text-lg mb-6 last:mb-0">
          {boldMatch[1]}
        </p>
      );
    }

    return (
      <p key={index} className="text-castlepurple mb-4 last:mb-0">
        {renderInlineBold(trimmed)}
      </p>
    );
  });
}

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);

  if (!study) {
    return (
      <main className="min-h-screen bg-black text-white px-4 sm:px-10 py-10 sm:py-16 font-fredoka text-center">
        <SEO
          title="Case Study Not Found"
          description="That project doesn't exist on Castle Logic (yet)."
          path={`/projects/${slug}`}
        />
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
    <main className="min-h-screen bg-black text-white font-fredoka">
      <SEO
        title={study.title}
        description={study.summary}
        path={`/projects/${study.slug}`}
        image={study.heroImageUrl ? `https://castlelogic.dev${study.heroImageUrl}` : undefined}
      />

      {/* Decorative header band: blurred, scaled-up hero behind the title.
          Purely visual — the title/summary underneath carry the real content,
          so the image layer itself is aria-hidden. */}
      <div className="relative overflow-hidden border-b border-castlepink/20">
        {study.heroImageUrl && (
          <div aria-hidden="true" className="absolute inset-0">
            <img
              src={study.heroImageUrl}
              alt=""
              className="w-full h-full object-cover scale-125 blur-2xl opacity-70"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
        )}

        <div className="relative px-4 sm:px-10 pt-10 sm:pt-16 pb-8">
          <div className="max-w-[800px] mx-auto">
            <Link to="/projects" className="text-castlepurple hover:text-castlepink transition-colors">
              ← Back to Projects
            </Link>

            <p className="text-xs uppercase tracking-wide text-castlepink/70 mt-6 mb-1">{study.category}</p>
            <h1 className="text-4xl font-semibold uppercase text-castlepink mb-4 tracking-wider">{study.title}</h1>
            <p className="text-lg text-castlepurple">{study.summary}</p>
          </div>
        </div>
      </div>

      <div className="max-w-[800px] mx-auto px-4 sm:px-10 py-10 sm:py-16">
        {study.heroImageUrl && (
          <img
            src={study.heroImageUrl}
            alt={study.title}
            loading="lazy"
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

        {study.sections?.length > 0 ? (
          <div className="mb-8">
            {study.sections.map((section, index) => (
              <Reveal key={section.heading ?? index} className="mb-12 last:mb-0">
                <h2 className="text-sm uppercase tracking-wide text-castlepink mb-3">{section.heading}</h2>
                {section.imageUrl && (
                  <div className="mb-4">
                    <ImageGallery
                      layout="inline"
                      images={[
                        {
                          id: `${study.slug}-section-${index}`,
                          title: section.heading ?? study.title,
                          img: section.imageUrl,
                        },
                      ]}
                    />
                  </div>
                )}
                {renderSectionBlocks(section.body)}
              </Reveal>
            ))}
          </div>
        ) : (
          <>
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
          </>
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

        {study.galleryGroups?.length > 0 && (
          <div className="mt-10">
            <h2 className="text-sm uppercase tracking-wide text-castlepink mb-6">Gallery</h2>
            {study.galleryGroups.map((group, index) => (
              <Reveal key={group.label ?? index} className="mb-10 last:mb-0">
                <ImageGallery
                  images={group.images}
                  groupLabel={group.label}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4"
                />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
