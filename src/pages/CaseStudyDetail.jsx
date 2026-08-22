import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Zap, ChevronDown } from "lucide-react";
import { caseStudies, getCaseStudy } from "../content/case-studies";
import SEO from "../components/SEO";
import Reveal from "../components/Reveal";
import ImageGallery from "../components/ImageGallery";
import GradientWash from "../components/GradientWash";

// Projects grouped by category, in first-seen order (same categories
// Projects.jsx's filter chips use — nothing hardcoded here, so a new
// category in a case-study JSON file shows up automatically). Computed once
// at module scope since `caseStudies` is static build-time content, not
// per-render state.
const projectsByCategory = caseStudies.reduce((groups, study) => {
  (groups[study.category] ??= []).push(study);
  return groups;
}, {});

// Renders `**bold**` spans within a line of section-body text as <strong>.
// Small, general helper: lets bulleted list items (see renderSectionBlocks)
// keep an emphasized lead-in term without hand-rolling markup in the JSON.
// Every `**...**` span — ALL-CAPS lead-ins (e.g. "HIERARCHY:") and ordinary
// mixed-case emphasis alike (e.g. "left breast") — gets color instead of
// font-weight: the body font here is Fredoka, a rounded/bubbly face whose
// letterforms smush together at bold weight. `font-normal` overrides the
// browser's default bold styling of <strong>, and `text-castlepink` supplies
// the emphasis instead. ALL-CAPS spans additionally get `tracking-wide`,
// since that letter-spacing convention is specifically for short label-style
// tokens (matches CaseStudyCard's category label), not for longer mixed-case
// phrases sitting inline in running prose.
function renderInlineBold(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (!part.startsWith("**") || !part.endsWith("**")) return part;

    const content = part.slice(2, -2);
    const isUppercase = content === content.toUpperCase() && content !== content.toLowerCase();

    return (
      <strong
        key={i}
        className={`font-normal text-castlepink ${isUppercase ? "tracking-wide" : ""}`}
      >
        {content}
      </strong>
    );
  });
}

// A section's `body` is one string; blocks are separated by a blank line.
// Lightweight markdown-lite conventions on top of plain paragraphs:
//   - a block where every line starts with "- " renders as a real <ul>
//   - a single-line block starting with "### " renders as a small sub-heading
//     (one level below the section's own heading — see the h2 rendered
//     alongside this function's output)
//   - a block that's a single paragraph fully wrapped in **double asterisks**
//     renders as a bold, standalone, visually emphasized line
// Kept intentionally small rather than pulling in a markdown dependency.
function renderSectionBlocks(body) {
  if (!body) return null;

  return body.split(/\n\s*\n/).map((block, index) => {
    const trimmed = block.trim();
    const lines = trimmed.split("\n").map((line) => line.trim());

    if (lines.length === 1 && lines[0].startsWith("### ")) {
      return (
        <h3 key={index} className="text-xs uppercase tracking-wide text-gray-200 mb-2 mt-6 first:mt-0">
          {lines[0].slice(4)}
        </h3>
      );
    }

    if (lines.length > 0 && lines.every((line) => line.startsWith("> "))) {
      // Quoted source excerpt (a snippet of the clinical note text itself,
      // not the surrounding explanatory prose) — set apart like a codeblock
      // so it reads as quoted raw material rather than another paragraph.
      return (
        <blockquote
          key={index}
          className="border-l-2 border-castlepurple bg-black/40 rounded-r-lg px-4 py-3 mb-4 last:mb-0 font-mono text-sm text-castlepurple"
        >
          {lines.map((line, lineIndex) => (
            <p key={lineIndex} className="last:mb-0">
              {line.slice(2)}
            </p>
          ))}
        </blockquote>
      );
    }

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
      // A "Current status: ..." callout is a status flag, not a thematic
      // pull-quote (see the plain pink version below) — centered, and in a
      // soft neon red. The one deliberate exception to the site's usual
      // pink/purple-only rule: a status flag reads more naturally in a
      // caution color than as more brand pink, and it's a narrow, specific
      // match rather than a general restyle of every bold pull-quote.
      if (/^current status:/i.test(boldMatch[1])) {
        return (
          <p
            key={index}
            className="text-center text-xl tracking-wide mb-6 last:mb-0"
            style={{ color: "#FF5A5A", textShadow: "0 0 12px rgba(255,90,90,0.55)" }}
          >
            {boldMatch[1]}
          </p>
        );
      }

      // A quoted rhetorical/example question (starts and ends with curly
      // quotes, e.g. "Which labs occurred within 90 days of surgery?") is a
      // different kind of pull-quote than a plain declarative statement —
      // smaller and italic, reading as an illustrative example rather than
      // a thematic claim the page is asserting.
      if (/^[“"]/.test(boldMatch[1]) && /[”"]$/.test(boldMatch[1])) {
        return (
          <p key={index} className="text-castlepink text-lg italic tracking-wide mb-6 last:mb-0">
            {boldMatch[1]}
          </p>
        );
      }

      // Standalone pull-quote line: same no-font-weight rule as the bullet
      // lead-ins above (Fredoka reads cramped at bold). Size, tracking, and
      // centering carry the "this is a standalone, important statement"
      // weight instead.
      return (
        <p key={index} className="text-castlepink text-xl tracking-wide text-center mb-6 last:mb-0">
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
  const projectMenuRef = useRef(null);
  const [docked, setDocked] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const [barHeight, setBarHeight] = useState(0);
  const [projectMenuOpen, setProjectMenuOpen] = useState(false);

  // Closes the docked title's project-switcher dropdown (see the
  // `hasHeaderImage` bar below) on an outside click or Escape — the two
  // standard ways to dismiss a floating menu that isn't a native <select>.
  useEffect(() => {
    if (!projectMenuOpen) return undefined;

    const onPointerDown = (e) => {
      if (!projectMenuRef.current?.contains(e.target)) setProjectMenuOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setProjectMenuOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [projectMenuOpen]);

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
  // watching a mid-height sentinel instead of a bottom one. Also closes the
  // title's project-switcher dropdown the instant the title fades back out
  // on scrolling back up — done right here rather than in a second effect
  // watching `titleVisible`, since setting state from an effect just to
  // react to another state change is redundant with setting it directly
  // where the source state itself changes.
  useEffect(() => {
    if (!hasHeaderImage) return undefined;
    const sentinel = headerMidSentinelRef.current;
    if (!sentinel) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = !entry.isIntersecting;
        setTitleVisible(visible);
        if (!visible) setProjectMenuOpen(false);
      },
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
          <div className="flex items-center gap-4 py-1.5" style={{ paddingLeft: "1%", paddingRight: "4%" }}>
            <Link
              to="/projects"
              className="shrink-0 text-sm text-castlepurple hover:text-castlepink transition-colors"
            >
              ← Back to Projects
            </Link>
            {/* Project switcher: the docked title doubles as a dropdown
                trigger revealing every other project, grouped by category
                (same categories Projects.jsx's filter chips use). `relative`
                wrapper + `absolute` panel — a floating menu, not something
                that pushes the bar's own height (which navHeight/barHeight
                math elsewhere depends on staying stable). Disabled via
                pointer-events while the title itself is still faded out
                (pre-dock) so an invisible trigger can't be clicked. Panel is
                anchored `right-0` (grows down-and-left) on mobile only —
                the title sits well over toward the right side of the bar
                already, after the back link, so on narrow screens a
                `left-0`-anchored panel growing rightward overflows past the
                viewport edge. `sm:left-0` reverts to the original
                down-and-right growth at the `sm` breakpoint and up, where
                there's enough room either way and left-anchored reads more
                naturally under the title. */}
            <div ref={projectMenuRef} className="relative min-w-0">
              <button
                type="button"
                onClick={() => setProjectMenuOpen((open) => !open)}
                aria-haspopup="menu"
                aria-expanded={projectMenuOpen}
                className={`flex items-center gap-1.5 min-w-0 max-w-full text-sm font-semibold uppercase tracking-wide text-white transition-opacity duration-300 ${
                  titleVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
              >
                <span className="truncate">{study.title}</span>
                <ChevronDown
                  size={14}
                  className={`shrink-0 transition-transform duration-200 ${projectMenuOpen ? "rotate-180" : ""}`}
                />
              </button>

              {projectMenuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 sm:left-0 sm:right-auto top-full mt-2 w-64 max-h-[70vh] overflow-y-auto rounded-xl bg-gray-900/95 backdrop-blur-sm border border-castlepink/20 shadow-xl py-3 z-50"
                >
                  {Object.entries(projectsByCategory).map(([category, projects]) => (
                    <div key={category} className="px-4 py-2">
                      <p className="text-xs uppercase tracking-wide text-castlepink mb-1.5">{category}</p>
                      <ul>
                        {projects.map((project) => (
                          <li key={project.slug}>
                            <Link
                              to={`/projects/${project.slug}`}
                              role="menuitem"
                              onClick={() => setProjectMenuOpen(false)}
                              className={`block py-1 text-sm font-semibold uppercase tracking-wide transition-colors ${
                                project.slug === study.slug
                                  ? "text-white"
                                  : "text-castlepurple hover:text-castlepink"
                              }`}
                            >
                              {project.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
              image — a plain % value put them too close together. Left
              offset is wider on mobile (8% vs. 4.3% from `sm:` up): the
              baked-in category label sits closer to the image's own left
              margin on narrow crops, so 4.3% reads misaligned there. */}
          <p className="absolute left-[8%] sm:left-[4.3%] top-[calc(76%+10px)] text-xs uppercase tracking-wide text-castlepink/70">
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
        <div className="max-w-[800px] mx-auto px-4 sm:px-10 pt-6 sm:pt-8">
          {/* Summary + intro image + role share one card (same dark-grey,
              borderless, rounded-2xl treatment as the section cards below),
              since together they're the page's single "about this project"
              unit rather than separate blocks. `renderSectionBlocks` (not a
              raw `{study.summary}` string) so a summary written as multiple
              blank-line-separated paragraphs in the JSON actually renders as
              multiple <p> tags — plain JSX text collapses "\n\n" to nothing,
              which was silently mashing two-paragraph summaries into one. */}
          <div className="bg-gray-900/70 rounded-2xl px-6 pt-6 pb-10 sm:px-8 sm:pt-8 sm:pb-12">
            <div className="text-lg">{renderSectionBlocks(study.summary)}</div>

            {study.heroImageUrl && (
              <div className="mt-2 mb-8">
                <ImageGallery
                  layout="inline"
                  images={[
                    {
                      id: `${study.slug}-intro`,
                      title: study.title,
                      img: study.heroImageUrl,
                    },
                  ]}
                />
              </div>
            )}

            {study.role && (
              <div>
                <h2 className="text-sm uppercase tracking-wide text-castlepink mb-2">Role</h2>
                <p className="text-castlepurple font-light">{study.role}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Same lightning-bolt divider used between sections on Contact.jsx
          and Resume.jsx (Zap icon + `.spark-ignite` glow keyframe, see
          global.css) — reused here to separate the intro card above from
          the first section card below, instead of introducing a new
          divider style. Its own `py-9 sm:py-12` carries the *entire* gap
          between the two cards, split evenly — the intro card above has no
          trailing margin, and the sections div below has its leading
          padding suppressed (see `pt-0` there) specifically when this
          divider is present, so the divider sits truly centered in the gap
          rather than hugging whichever neighbor doesn't also add padding. */}
      {study.headerImageUrl && (
        <div className="max-w-[800px] mx-auto px-4 sm:px-10 flex items-center gap-4 py-9 sm:py-12" aria-hidden="true">
          <div className="flex-1 h-px bg-castlepink opacity-40" />
          <Zap size={16} className="shrink-0 text-castlepink spark-ignite" />
          <div className="flex-1 h-px bg-castlepink opacity-40" />
        </div>
      )}

      <div
        className={`max-w-[800px] mx-auto px-4 sm:px-10 pb-10 sm:pb-16 ${
          study.headerImageUrl ? "pt-0" : "pt-10 sm:pt-16"
        }`}
      >
        {!study.headerImageUrl && study.heroImageUrl && (
          <img
            src={study.heroImageUrl}
            alt={study.title}
            loading="lazy"
            className="w-full rounded-lg border border-castlepink mb-10"
          />
        )}

        {!study.headerImageUrl && study.role && (
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
                    border — at 70% opacity here so the GradientWash glow
                    behind the page shows through faintly. Extra *bottom*
                    padding (vs. the site's usual p-6/p-8 cards) gives these
                    more breathing room since they're holding full prose
                    sections, not a short card blurb — top padding stays
                    tighter since a heading (or the section image) usually
                    sits right at the top of the card already, needing less
                    clearance than the card's own bottom edge does. Section
                    images (see ImageGallery's inline layout) keep their own
                    pink border/rounding as a nested element, unaffected by
                    this outer card. Body copy below is `font-light`,
                    matching Timeline.jsx's card body text — Fredoka's
                    default weight reads heavy at paragraph length. */}
                <div className="bg-gray-900/70 rounded-2xl px-6 pt-6 pb-10 sm:px-8 sm:pt-8 sm:pb-12">
                  {section.heading && (
                    <h2 className="text-lg sm:text-xl uppercase tracking-wide text-castlepink mb-3">{section.heading}</h2>
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
