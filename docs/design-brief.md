# Castle Logic — Design Brief

*Compiled from the hero visual style spec, the header/card image style guide, and the current site-audit ticket board. Reference doc, not a spec to build against literally — check the live board before starting new work in case status has moved.*

---

## 1. Brand identity

**What Castle Logic is:** a solo software engineering / design portfolio (Samantha Lavrinc), positioned as a creative-technology studio identity rather than a generic dev portfolio or a cyberpunk poster.

**Core statement:** *Castle Logic builds things that are beautiful on the surface, powerful underneath, and supported by solid engineering foundations.* This is the literal brief for the hero graphic, but it's also the site's organizing idea — design and engineering treated as one discipline, not two departments.

**Tone/voice (from copy-voice rules):** direct, plain, first-person. No AI vendor names in copy. No cocky flourishes. No stale year-counts ("X+ years of experience"-style claims that age out). No em or en dashes anywhere in prose — this extends to UI copy generally; date ranges in components like [Timeline.jsx](../src/components/Timeline.jsx) currently use en dashes (`–`) and should be swept if that file is touched again.

---

## 2. Brand tokens (confirmed from code, not the placeholder values in either style doc)

| Token | Hex | CSS var | Use |
|---|---|---|---|
| Background | `#000000` | — | Full-bleed canvas/page background, always |
| Text | `#FFFFFF` | — | Titles, primary text |
| Accent pink | `#FF46A2` | `--castlepink` | Primary accent — ~55% weighting |
| Accent purple | `#CB90FF` | `--castlepurple` | Secondary accent — ~45% weighting |

**Fonts (real, loaded via Google Fonts in `index.html`):**
- **Fredoka** (`font-fredoka`) — headings/titles
- **Nunito Sans** (`font-nunito`) — body/subtitle text

Note: the header/card image-generation pass used Poppins/Carlito as offline stand-ins for these two fonts because the generation environment had no net access. Any *new* generated art should target the real fonts, or ship as motif-only art with text set live in HTML/CSS on top (recommended — see §4).

Glow treatment sitewide is layered box-shadow bloom off `--castlepurple` (see `global.css` `.timeline-card` / expanded-state rules) — soft, multi-level, not one blurry halo. This matches the hero spec's "restrained neon lighting" instruction.

---

## 3. Visual system: black + neon dual-accent

Both the hero spec and the image style guide converge on the same system independently, which makes it the site's real visual language, not a one-off:

- **Pure black canvas**, no gradients/textures/photographic backgrounds/particle effects
- **Pink primary / purple secondary**, roughly 55/45, never introducing a third hue
- **Glow radiates evenly from elements** — no drop-shadow offset, no excessive bloom that blurs edges
- **Typography-driven, not illustration-driven** — imagery supports text, never competes with it
- **Sophisticated, not gamer/cyberpunk** — avoid stock tech imagery, laptops, code screenshots, 3D renders, rainbow/blue/green neon, sci-fi landscapes

This system should be treated as the default for *any* new generated art (hero graphics, header art, card art, future OG images) — motif changes per project, but canvas/color/glow rules don't.

---

## 4. Layout conventions for generated art

From the header/card image style guide — these are load-bearing specs, reuse them rather than re-deriving per asset:

**Page header:** 2000×626px (~3.2:1). Text lives in the left 51% (0–1020px), art motif confined to the right 49% (1020–2000px). Title at (82, 112), max-width 900px, up to 3 lines, white, ~52px. Subtitle at (82, 445), purple, 1 line, ~24px. 80px safe margin all sides.

**Card header:** 355×160px (~2.22:1). Text left 56% (0–200px), art right 44% (200–355px). Title at (18, 28), max-width 195px, 2 lines, white, ~18px. Subtitle at (18, 110), purple, 1 line, ~9px. 18px safe margin.

**Recommended practice going forward:** generate motif-only background art (no baked-in text) and set text live in HTML/CSS at the fixed offsets above — this was already the lesson learned from the Fredoka/Nunito substitution issue, and it keeps every image swappable without regenerating art. Never bake status/date tags ("WIP," "2026") into the art itself — those are code-controlled overlays.

**Motif choice is per-project**, not fixed — the constellation/node-graph motif (used for clinical_etl) is one example, evoking knowledge-graph/circuit-board character, not a mandatory default. Whatever motif is chosen: sparse (nearest-neighbor connections only, not a full mesh), color-mixed 55/45 pink/purple, confined entirely to the art zone so it never needs a scrim over text.

---

## 5. Hero graphic — current ask

Full spec lives in the attached `castle-logic-hero-visual-style.md`; summary of the parts that matter most for build:

- Exact copy, five lines, do not alter: **BUILDING / BEAUTIFUL / EXPERIENCES ON / POWERFUL / FOUNDATIONS**
- Centered, vertically stacked, poster-like — reads as one identity mark, not five separate text elements
- **POWERFUL** is the dominant visual element: massive, bold, electric, pink, with restrained lightning/arc treatment integrated into the letterforms (not pasted behind them)
- **BEAUTIFUL** is the second focal point: expressive script/flowing typography, pink, readable — elegant rather than wedding-invitation-cursive
- **FOUNDATIONS** should read as structurally stable/grounded — plain uppercase, purple, generous tracking — the deliberate visual contrast to BEAUTIFUL's expressiveness
- Small castle/circuit emblem above the headline — a software-circuit diagram integrated into a castle silhouette, thin-to-medium line weight, pink, subtle glow — brand signature, not a hero-sized illustration
- 16:9 landscape, safe internal margins, must degrade gracefully to mobile scale without cropping — ships as a plain responsive `<img>`, no `background-size: cover` dependency

This asset sits squarely inside the black/pink/purple/neon system in §3 — it's the most concentrated expression of it, not a new direction.

---

## 6. Constraints and open questions, inferred from the live ticket board

*(Board: https://claude.ai/code/artifact/b4f96e58-fb02-44e2-93c9-40212fd72959 — check it directly before starting build work; this section is a snapshot as of 2026-08-21/22.)*

- **BUILD-1 is fixed** — the Tailwind v3/v4 mixed-import bug that broke prod is resolved and confirmed live. The CDN Tailwind `<script>` in `index.html` is an intentional safety net, not leftover cruft — don't remove it without sign-off.
- **POLISH-5 is a live incident scar** — a prior repo-cleanup attempt (removing `tailwind.config.js`) broke production. Do not touch build/Tailwind config without explicit permission, regardless of how unrelated a task seems.
- **Home hero has a real sizing constraint (POLISH-30):** hero text alone fits one viewport on every tested size, but adding the 3 featured-project cards overflows by 454–793px depending on viewport. Tried and ruled out: tightening spacing (recovers ~250px, not enough), shrinking the hero image (helps desktop, barely touches mobile), forcing cards into 2–3 mobile columns (makes it worse, since `CaseStudyCard.jsx` is text-only with no thumbnail and narrow columns force taller wrapping). **Any new hero graphic should be evaluated against this constraint before assuming it drops in cleanly** — a large poster-style hero image (per the spec's 16:9 landscape treatment) adds vertical weight to a section that's already over budget once cards are included. Worth explicitly deciding whether the new hero replaces the current hero treatment or displaces the featured-card layout.
- **POLISH-23** (scroll-driven "docking" sections) and the smaller POLISH-30 concept are both intentionally parked on the backlog per Samantha's own call — not urgent, don't resolve the open scoping question preemptively.
- **Page-narrative principle** (board's own guiding note, not a numbered ticket): Home introduces the brand → About explains the philosophy → Resume provides evidence/credibility → Projects demonstrates values in practice → Contact invites collaboration. A hero graphic this concentrated ("beautiful/powerful/foundations") is doing Home's "introduce the brand" job — it shouldn't try to also carry About's or Projects' jobs.
- **Case-study visual work (CASE-1/2/3/5)** already shipped real Figma/dev screenshots and a shared `ImageGallery.jsx` lightbox for myOrbit and the clinical-ETL write-up — those are photographic/screenshot-based, deliberately outside the black/neon poster system in §3. The hero/header/card art system and the case-study screenshot system are two different visual registers by design; don't conflate them.
- **CASE-4** (Agentic Workflow/Process card) is still blocked — asset folder exists but empty. Worth checking before assuming it's still stalled.
- Two unconfirmed copy items sitting on the board that touch this brief's voice rules: the "myOrbit: Mobile" title (spec'd with an em dash, shipped without one, not yet confirmed with Samantha) and `ux-lab.json`'s default `status: "concept"`.

---

## 7. What this brief does *not* cover

- Copy/microcopy for the hero or any new page sections — pull from `castlelogic_copy_voice` rules and confirm literal wording with Samantha rather than inferring it here.
- A final decision on where the new hero graphic displaces existing Home-page layout — flagged as open in §6, needs a call before implementation.
- Case-study visual treatment — that system already has its own established pattern (real screenshots + `ImageGallery.jsx`), separate from this neon/poster system.
