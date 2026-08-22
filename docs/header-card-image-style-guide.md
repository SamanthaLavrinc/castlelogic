# Header & Card Image Style Guide
### castlelogic.dev — dark neon system
*Reference doc for generating future header/card images with consistent dimensions and text-safe zones*

*Note: the constellation motif described below was used for one project's images (clinical_etl). Motif is project-dependent, not a fixed site-wide default — pick whatever motif fits the project when generating new header/card art. The canvas dimensions, text-safe zones, and color/font tokens in this guide still apply regardless of motif.*

---

## 1. Brand tokens

**Colors**
| Token | Hex | Use |
|---|---|---|
| Background | `#000000` | Full-bleed canvas background, always |
| Text | `#FFFFFF` | Titles, primary text |
| Accent pink | `#FF46A2` (`--castlepink`) | Primary accent — titles/highlights, ~55% of glow nodes |
| Accent purple | `#CB90FF` (`--castlepurple`) | Secondary accent — subtitles/structure, ~45% of glow nodes |

**Fonts**
| Token | Family | Use |
|---|---|---|
| `fredoka` | Fredoka | Headings/titles |
| `nunito` | Nunito Sans | Body/subtitle text |

*Note: images generated in this project used Poppins and Carlito as offline stand-ins for Fredoka and Nunito Sans (no network access to fetch Google Fonts in the generation environment). Same weight/rounding character, not pixel-identical. If exact typography match matters, regenerate with the real fonts installed, or treat these as placeholder art and set real text in HTML/CSS on top instead.*

**Motif**
Motif choice is project-dependent — pick whatever visual motif fits the project rather than reusing the same one everywhere. One example used so far: a glowing "constellation" of small circles (nodes) connected by thin lines, in pink and purple, with soft outer-glow on every node and line — evokes a knowledge graph / circuit-board / retro-electric feel (used for clinical_etl). Whatever motif is chosen, keep decoration otherwise minimal (no grids, gradients, or background textures) — pure black canvas plus the motif's own glow/color.

---

## 2. Image types

### Page header
- **Canvas size: 2000 × 626 px** (ratio ≈ 3.2 : 1)
- **Layout split:** Start zone (text) = left 0–1020px (51%). End zone (art) = right 1020–2000px (49%).

| Element | X | Y | Max width | Notes |
|---|---|---|---|---|
| Title | 82px | 112px | 900px | Up to 3 lines, bold, white, ~52px equivalent size |
| Subtitle | 82px | 445px | 900px | 1 line, purple, ~24px equivalent size |
| Art motif | 1020px | 0px | 980px (full height) | Constellation, ~16 nodes |

Outer safe margin: 80px on all sides — keep any future overlay text inside this margin.

### Card header
- **Canvas size: 355 × 160 px** (ratio ≈ 2.22 : 1)
- **Layout split:** Start zone (text) = left 0–200px (56%). End zone (art) = right 200–355px (44%).

| Element | X | Y | Max width | Notes |
|---|---|---|---|---|
| Title | 18px | 28px | 195px | Up to 2 lines, bold, white, ~18px equivalent size |
| Subtitle | 18px | 110px | 195px | 1 line, purple, ~9px equivalent size |
| Art motif | 218px | 12px | 137px (full height) | Constellation, ~10 nodes |

Outer safe margin: 18px on all sides.

**Do not include** status/date tags ("WIP," "2026," delivery-stage language) baked into either image — keep that kind of metadata as a separate overlay element you control in code, not burned into the art.

---

## 3. Choosing/regenerating a motif per project

Motif is decided per project — don't default to the constellation motif automatically. When asking Claude (or anyone) to generate a new header/card image, first decide what motif fits the project, then specify:
- Canvas size from the tables above (or new size, same start/end split logic)
- Color mix: roughly 55% pink / 45% purple across whatever motif elements carry color
- Art motif confined to the "end zone" only — never overlapping the text start-zone, so text stays legible without needing a background scrim
- Glow: soft outer glow on motif elements, color-matched, no offset (glow radiates evenly, not a drop shadow) — keeps the neon feel consistent across projects even when the motif itself differs

If the constellation motif specifically is what's wanted again (e.g. for another data/graph-flavored project), these parameters reproduced it:
- Node count: ~14–18 for header, ~8–11 for card (fewer nodes for the smaller card so it doesn't feel cluttered)
- Node color mix: roughly 55% pink / 45% purple, chosen per-node
- Node radius: small variation, roughly 4–11px range at header scale (scale proportionally for other sizes)
- Each node connects to its 1–2 nearest neighbors only (not a fully connected mesh) — keeps it reading as a sparse constellation, not a dense web

---

## 4. Using these images with overlay text in code

Since the start-zone margins are fixed (82px/112px for header, 18px/28px for card), any future HTML/CSS text layer placed on top of a *plain background-art-only* version of these images (no baked-in text) can use the same offsets every time:

```css
/* Header */
.header-title   { position: absolute; left: 82px; top: 112px; max-width: 900px; }
.header-subtitle{ position: absolute; left: 82px; top: 445px; max-width: 900px; }

/* Card */
.card-title    { position: absolute; left: 18px; top: 28px; max-width: 195px; }
.card-subtitle { position: absolute; left: 18px; top: 110px; max-width: 195px; }
```

If you want fully text-free background art going forward (recommended for maximum layout flexibility), just ask for the motif alone at the canvas size you need — the same start/end split and node parameters above still apply, minus the title/subtitle text.
