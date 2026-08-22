import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCaseStudy } from "../content/case-studies";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import ImageGallery from "../components/ImageGallery";
import GradientWash from "../components/GradientWash";

// Renders `**bold**` spans within a line of section-body text as <strong>.
// Small, general helper: lets bulleted list items (see renderSectionBlocks)
// keep an emphasized lead-in term without hand-rolling markup in the JSON.
// Lead-in terms written in ALL CAPS (e.g. "COMPOSITIONAL CONCEPT MODEL:") are
// emphasized with color + letter-spacing instead of font-weight: the body
// font here is Fredoka, a rounded/bubbly face whose letterforms smush
// together at bold weight, especially combined with uppercase + tracking.
// `font-normal` overrides the browser's default bold styling of <strong>.
// This matches the tracking-wide + color convention used elsewhere for small
// uppercase labels (see CaseStudyCard's category label). Mixed-case bold
// spans are left alone (still browser-default bold; none currently appear
// in case-study content).
function renderInlineBold(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (!part.startsWith("**") || !part.endsWith("**")) return part;

    const content = part.slice(2, -2);
    const isUppercase = content === content.toUpperCase() && content !== content.toLowerCase();

    return (
      <strong
        key={i}
        className={isUppercase ? "font-normal text-castlepink tracking-wide" : undefined}
      >
        {content}
      </strong>
    );
  });
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
        <ul key={index} className="list-disc pl-6 space-y-2 mb-4 last:mb-0 text-castlepurple font-light">
          {lines.map((line, lineIndex) => (
            <li key={lineIndex}>{renderInlineBold(line.slice(2))}</li>
          ))}
        </ul>
      );
    }

    const boldMatch = trimmed.match(/^\*\*([\s\S]+)\*\*$/);
    if (boldMatch) {
      // Standalone pull-quote line: same no-font-weight rule as the bullet
      // lead-ins above (Fredoka reads cramped at bold). Size and tracking
      // carry the "this is a standalone, important statement" weight instead.
      return (
        <p key={index} className="text-castlepink text-xl tracking-wide mb-6 last:mb-0">
          {boldMatch[1]}
        </p>
      );
    }

    return (
      <p key={index} className="text-castlepurple font-light mb-4 last:mb-0">
        {renderInlineBold(trimmed)}
      </p>
    );
  });
}

export default function CaseStudyDetail() {
  const { slug } = useParams();
  const study = getCaseStudy(slug);

  // Scroll-docking header behavior (see GradientWash + headerImage rendering
  // path below) only applies to case studies with a custom baked-in header
  // image. Computed up front so the hooks below can no-op cleanly for every
  // other case study without changing hook call order between renders.
  const hasHeaderImage = Boolean(study?.headerImageUrl);

  const headerSentinelRef = useRef(null);
  const headerMidSentinelRef = useRef(null);
  const barRef = useRef(null);
  const [docked, setDocked] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [barHeight, setBarHeight] = useState(0);

  // Measure the site's sticky main nav (see Header.jsx: `sticky top-0`) so the
  // docked bar and pinned gradient below sit directly beneath it rather than
  // hardcoding a height that would drift if the nav's own padding/logo size
  // changes, or differ between the desktop and mobile nav layouts.
  useEffect(() => {
    if (!hasHeaderImage) return undefined;
    const headerEl = document.querySelector("header");
    if (!headerEl) return undefined;

    const updateNavHeight = () => setNavHeight(headerEl.getBoundingClientRect().height);
    updateNavHeight();

    const resizeObserver = new ResizeObserver(updateNavHeight);
    resizeObserver.observe(headerEl);
    return () => resizeObserver.disconnect();
  }, [hasHeaderImage]);

  // Measure the permanent back-link dock bar itself (see the `hasHeaderImage`
  // block further down) the same way, since it now sits in normal document
  // flow (`position: sticky`, not `fixed`) directly beneath the nav — the
  // header image starts below both of them, not underneath either. Both
  // heights together are what the sentinel thresholds below and
  // GradientWash's fixed-mode `top` offset need to clear.
  useEffect(() => {
    if (!hasHeaderImage) return undefined;
    const barEl = barRef.current;
    if (!barEl) return undefined;

    const updateBarHeight = () => setBarHeight(barEl.getBoundingClientRect().height);
    updateBarHeight();

    const resizeObserver = new ResizeObserver(updateBarHeight);
    resizeObserver.observe(barEl);
    return () => resizeObserver.disconnect();
  }, [hasHeaderImage]);

  // Docks the compact back-link/title bar and pins the gradient background
  // once the header image block has scrolled fully out of view above the
  // viewport. Watches a 1px sentinel at the bottom of the header image block
  // via IntersectionObserver rather than a scroll-position pixel threshold,
  // which would need re-tuning per viewport size and break if header image
  // content changes height. `rootMargin`'s negative top offset shrinks the
  // effective viewport by the sticky nav's and dock bar's combined height, so
  // the sentinel counts as "out of view" exactly when it passes behind both
  // — not when it crosses the literal top edge of the browser window. Fires
  // in both scroll directions since IntersectionObserver reports every
  // crossing of the threshold, not just the first one.
  useEffect(() => {
    if (!hasHeaderImage) return undefined;
    const sentinel = headerSentinelRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setDocked(!entry.isIntersecting),
      { rootMargin: `-${navHeight + barHeight}px 0px 0px 0px`, threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasHeaderImage, navHeight, barHeight]);

  // Reveals the project title inside the permanent dock bar (see the
  // `hasHeaderImage` block below) earlier than the full-dock threshold above
  // — once the user has scrolled about halfway through the header image,
  // rather than waiting for it to scroll completely out of view. Same
  // sentinel/IntersectionObserver technique as the bottom sentinel, just
  // watching a mid-height sentinel instead of a bottom one.
  useEffect(() => {
    if (!hasHeaderImage) return undefined;
    const sentinel = headerMidSentinelRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setTitleVisible(!entry.isIntersecting),
      { rootMargin: `-${navHeight + barHeight}px 0px 0px 0px`, threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasHeaderImage, navHeight, barHeight]);

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

      {/* Permanent back-link dock: for headerImage case studies this bar is
          always mounted, always solid (it's the one and only "back to
          projects" affordance for these pages, replacing the link that used
          to be baked into the header image overlay below), so it's on
          screen — and already opaque — from first paint, not just after
          scrolling. Its title fades in once the user has scrolled about
          halfway through the header image (see the mid-sentinel
          IntersectionObserver effect above), well before the full-dock
          threshold that pins the gradient background further down.
          Rendered *before* the header image in the DOM and given
          `position: sticky` rather than `fixed`: a sticky element still
          reserves its own height in normal flow, so the header image below
          it starts right after the bar instead of the bar floating on top
          of the image's own top edge. Its static (pre-scroll) position is
          already exactly `top: navHeight` — right below the nav — so it
          reads as pinned from the very first frame, same as `fixed` did,
          just without the overlap. `dock-bar-in` plays once on initial page
          load. */}
      {hasHeaderImage && (
        <div
          ref={barRef}
          className="dock-bar-in sticky z-40 bg-black/95 backdrop-blur-sm border-b border-castlepink/20"
          style={{ top: navHeight }}
        >
          <div className="flex items-center gap-4 py-3" style={{ paddingLeft: "1%", paddingRight: "4%" }}>
            <Link
              to="/projects"
              className="shrink-0 text-sm text-castlepurple hover:text-castlepink transition-colors"
            >
              ← Back to Projects
            </Link>
            <span
              className={`truncate text-sm font-semibold uppercase tracking-wide text-white transition-opacity duration-300 ${
                titleVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {study.title}
            </span>
          </div>
        </div>
      )}

      {study.headerImageUrl ? (
        /* Baked-in header: the image itself already contains the title and
           subtitle as part of its design, so this is the header, full stop —
           no blurred band, no separate crisp copy, no second visible title.
           The <h1> stays in the DOM for SEO/accessibility but is visually
           hidden since its text is already rendered inside the image. The
           back link and category label are thin overlays positioned (in %
           of the image's own box) to land in the empty black space the
           image was designed with, above and below its baked-in text. The
           back link itself now lives only in the permanent dock bar above
           (see the `hasHeaderImage` block just before this one) rather than
           also being baked in here, so there's a single back-link element
           instead of two stacked at the same spot pre-scroll. */
        <div className="relative w-full overflow-hidden border-b border-castlepink/20">
          <img src={study.headerImageUrl} alt="" className="block w-full h-auto min-h-[220px] object-cover object-left" />
          <h1 className="sr-only">{study.title}</h1>

          {/* top offset nudged 10px below the 76% baseline so the label
              clears the baked-in subtitle text sitting just above it in the
              image — a plain % value put them too close together. */}
          <p className="absolute left-[4.3%] top-[calc(76%+10px)] text-xs uppercase tracking-wide text-castlepink/70">
            {study.category}
          </p>

          {/* 1px sentinel at the vertical midpoint of the header image,
              watched by the IntersectionObserver above to reveal the dock
              bar's title once the user has scrolled about halfway through
              the image. */}
          <div ref={headerMidSentinelRef} aria-hidden="true" className="absolute top-1/2 left-0 h-px w-full" />

          {/* 1px sentinel marking the bottom edge of the header image block,
              watched by the IntersectionObserver above to trigger the docked
              bar + pinned gradient once this scrolls out of view. */}
          <div ref={headerSentinelRef} aria-hidden="true" className="absolute bottom-0 left-0 h-px w-full" />
        </div>
      ) : (
        /* Decorative header band: blurred, scaled-up hero behind the title.
            Purely visual — the title/summary underneath carry the real content,
            so the image layer itself is aria-hidden. */
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
      )}

      {/* Gradient wash + body content. For non-headerImage case studies this
          renders as a bare fragment — identical DOM to before this change —
          so their pages are byte-for-byte unaffected. For headerImage case
          studies it's wrapped in a `relative` box so the normal-flow
          GradientWash has something to size against, with the real content
          lifted to `relative z-10` above it. GradientWash itself swaps to a
          viewport-pinned background once `docked` is true — the header image
          has scrolled fully out of view — so page content scrolls over a
          static backdrop from that point on; it reverts the instant the user
          scrolls back up past the header image. (The dock bar's title fade
          above is driven by a separate, earlier `titleVisible` threshold —
          the two no longer flip at the same scroll position.) Its pinned
          `top` offset clears both the nav and the sticky dock bar above,
          since both now occupy real space at the top of the viewport. */}
      {hasHeaderImage ? (
        <div className="relative">
          <GradientWash fixed={docked} top={navHeight + barHeight} />
          <div className="relative z-10">
            <CaseStudyBody study={study} />
          </div>
        </div>
      ) : (
        <CaseStudyBody study={study} />
      )}
    </main>
  );
}

// Summary paragraph (headerImage studies only) + the shared body content
// (hero image, role, stack, sections/problem-approach-results, links,
// gallery) that renders identically regardless of which header variant a
// case study uses. Split out so CaseStudyDetail can render it either bare
// (every case study except headerImage ones, unchanged from before) or
// wrapped in the gradient-wash positioning box (headerImage ones) without
// duplicating this block in both branches.
function CaseStudyBody({ study }) {
  return (
    <>
      {study.headerImageUrl && (
        <div className="max-w-[800px] mx-auto px-4 sm:px-10 pt-10 sm:pt-16">
          <p className="text-lg text-castlepurple">{study.summary}</p>
        </div>
      )}

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
              <Reveal key={section.heading ?? index} className="mb-8 last:mb-0">
                {/* Same dark-grey card treatment as the site's other cards
                    (see Timeline.jsx's `.timeline-card` and the rounded-2xl
                    panels on About/Contact): bg-gray-900, rounded, no
                    border — at 80% opacity here so the GradientWash glow
                    behind the page shows through faintly. Extra vertical
                    padding (vs. the site's usual
                    p-6/p-8 cards) gives these more breathing room since
                    they're holding full prose sections, not a short card
                    blurb. Section images (see ImageGallery's inline layout)
                    keep their own pink border/rounding as a nested element,
                    unaffected by this outer card. Body copy below is
                    `font-light`, matching Timeline.jsx's card body text —
                    Fredoka's default weight reads heavy at paragraph length. */}
                <div className="bg-gray-900/80 rounded-2xl px-6 py-10 sm:px-8 sm:py-12">
                  {section.heading && (
                    <h2 className="text-sm uppercase tracking-wide text-castlepink mb-3">{section.heading}</h2>
                  )}
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
                </div>
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
    </>
  );
}
