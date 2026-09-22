---
name: "水山之间 · Between Water & Mountains"
description: "A place-based cultural exhibition with a field notebook and inspectable data."
colors:
  paper: "#f3f5f3"
  surface: "#fbfcfa"
  ink: "#20343b"
  muted: "#50636b"
  lake: "#245c70"
  lake-dark: "#153f51"
  mist: "#dce8eb"
  line: "#b8c8cc"
  input-line: "#81959d"
  error: "#943a2d"
  waterway: "#38768e"
  river: "#346e85"
  canal: "#497889"
  stream: "#5a7d84"
  channel-selected: "#163c4f"
  matrix-0: "#e0e8e9"
  matrix-1: "#c1d6dd"
  matrix-2: "#9ebfce"
  matrix-3: "#7eaabc"
  matrix-4: "#5d91a7"
  matrix-5: "#417e96"
  matrix-6: "#306f88"
  matrix-7: "#246279"
  matrix-8: "#185267"
  matrix-9: "#123f52"
typography:
  display:
    fontFamily: "Bodoni Moda, Songti SC, Noto Serif CJK SC, serif"
    fontSize: "clamp(3rem, 5.9vw, 5.3rem)"
    fontWeight: 500
    lineHeight: 1.07
    letterSpacing: "-.025em"
  headline:
    fontFamily: "Bodoni Moda, Songti SC, Noto Serif CJK SC, serif"
    fontSize: "clamp(2.25rem, 4.4vw, 3.65rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-.025em"
  title:
    fontFamily: "Bodoni Moda, Songti SC, Noto Serif CJK SC, serif"
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1.15
  body:
    fontFamily: "Source Sans 3, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Source Sans 3, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: ".95rem"
    fontWeight: 600
    lineHeight: 1.55
  status:
    fontFamily: "Source Sans 3, PingFang SC, Microsoft YaHei, sans-serif"
    fontSize: ".79rem"
    fontWeight: 400
    lineHeight: 1.3
  chinese-quotation:
    fontFamily: "Songti SC, Noto Serif CJK SC, SimSun, serif"
    fontSize: "clamp(1.5rem, 2.5vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: ".07em"
rounded:
  control: "4px"
  matrix-cell: "3px"
  status-dot: "50%"
spacing:
  space-1: "8px"
  space-2: "16px"
  space-3: "24px"
  space-4: "32px"
  space-6: "48px"
  space-8: "64px"
  space-12: "96px"
components:
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 18px"
  button-outline-hover:
    backgroundColor: "{colors.mist}"
  button-pressed:
    backgroundColor: "{colors.lake}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "10px 18px"
  action-primary:
    backgroundColor: "{colors.lake}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "15px 24px"
  action-primary-hover:
    backgroundColor: "{colors.lake-dark}"
    textColor: "{colors.surface}"
  field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
    width: "100%"
  source-record:
    backgroundColor: "{colors.mist}"
    padding: "24px"
  status-tag:
    textColor: "{colors.lake}"
    typography: "{typography.status}"
  chapter-menu:
    backgroundColor: "{colors.surface}"
    padding: "20px 28px"
    width: "min(430px, calc(100vw - 32px))"
  validation-level:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "20px 24px"
  validation-level-selected:
    backgroundColor: "{colors.mist}"
    textColor: "{colors.ink}"
---

# Design System: 水山之间 · Between Water & Mountains

## Overview

**Creative North Star: "Place before pattern"**

Cool mineral paper, lake-blue controls and credited place photography form a humane cultural exhibition. Generous unboxed compositions introduce the places; familiar controls support source inspection, comparison and a field notebook.

Bodoni Moda gives English headings their editorial voice. Source Sans 3 carries reading and operation; real Chinese text uses the dedicated Chinese serif stack. Dark orientation/tutorial stages frame geography and design learning; a light mineral ground keeps photographs and evidence legible.

**Key Characteristics:**

- Dark geographic/tutorial stages followed by a light mineral-paper evidence ground, using the same semantic lake-blue actions.
- Local display and reading fonts; a distinct Chinese serif stack.
- Credited place photography, open layouts and inspectable evidence.
- Visible focus, native controls and meaningful static states.

This record is extracted from `src/styles.css` and the components imported by `src/App.tsx`. It is not a claim of visual verification: managed-browser access to local HTTP and file pages was blocked; desktop/mobile screenshots remain unavailable and formal visual review is **recapture**. The build and ten DOM/transformation tests passed; source-review fixes are resolved. Unmounted legacy navigation/scene components are outside this record.

## Colors

### Primary

**Lake** marks actions, focus, links and readings; **Lake dark** is the stronger link/primary-action hover. **Mist** creates quiet source, map, comparison and export surfaces. The frontmatter preserves the actual CSS values.

### Neutral

**Mineral paper** is the page and sticky-header ground; **Surface** carries controls and operating panels. **Ink** is primary text, **Muted** is supporting text, **Line** divides content and **Input line** outlines fields. Photo labels reverse surface text on ink.

### Data and feedback

Waterway, river, canal, stream and selected-channel colors are exact SVG/legend values. Rivers use thicker solid strokes; streams use dashes. The ten matrix colors are the actual light-to-dark scale from `MountainAtlas.tsx`. Qualitative mode uses steps 0, 3 and 9 for “not asserted,” “smaller reported” and “dominant reported”; imported mode maps site proportions across the scale. **Error** is reserved for load-error text.

**The Evidence Color Rule.** Use the lake family for controls and data; preserve labels, line patterns and explicit evidence meanings alongside color.

Sidecar tonal strips for individual swatches are synthesized preview metadata, not additional shipped palette tokens. The matrix scale remains the observed scale.

## Typography

Local files load Bodoni Moda (500) and Source Sans 3 (400/600), all with `font-display: swap`; `font-synthesis: none` is active. Chinese glyphs use the documented system fallback stacks. The root size is 18px, becoming 17px at 480px and below; frontmatter rem values follow that root.

Display and headline roles belong to the orientation and chapter headings. Title is the base h3 role; individual reading stages use 1.8–2.3rem. Body paragraphs normally stop at 70ch; chapter introductions at 48ch. Labels use reading type, not all-caps display lettering. Numerical tables and rainfall/metric readings use tabular figures.

**The Two Reading Voices Rule.** Use the display face for English headings and Source Sans 3 for reading and controls; use the Chinese serif stack for Chinese display text.

## Layout

Main chapters have a 1376px outer maximum, normally with 48px horizontal padding (1280px inner width). The full-width orientation, tutorial and comparison chapters align their contents to the same 1280px measure. The globe pairs a flexible WebGL stage with a source console; the designer tree pairs four bounded choice layers with one live recommendation; the CP explainer pairs a page book with a fourteen-label guide. Source inspection uses .8fr/1.4fr columns; the water map uses 1.6fr/1fr; the matrix pairs a flexible plot with a 320px console. All nine chapter anchors stay available from Explore.

| Query | Actual changes |
| --- | --- |
| max-width: 1100px | Main gutters become 32px; the globe and console tighten; decision recommendation moves below its four layers; matrix console becomes 270px. |
| max-width: 800px | Header becomes 76px and main gutters 24px. Orientation heading, globe console, place cards, bilingual quote, CP book, evidence, water, notebook, validation and return stack. Globe controls retain three choices in a row. |
| max-width: 480px | Main gutters become 20px and chapters 64px. Globe controls and question lenses become single columns; question photographs, decision choices, glossary and forms stack; notebook navigation scrolls horizontally; the matrix console becomes a block. |

The sticky header is normally 88px; in-page scrolling uses 112px padding/margins. The matrix preserves its readable intrinsic width inside a focusable horizontal scroller. The body minimum width is 320px. Print removes navigation and operating controls, replaces dark stages with white, and turns major layouts into blocks.

## Elevation & Depth

Surfaces are flat and separated by whitespace, fine rules and tonal changes. The floating contents menu uses `0 16px 48px #20343b26`; the page-turning CP sheet uses a lighter depth cue so it reads as a page rather than a dashboard card.

**The Quiet Ground Rule.** Keep content flat; reserve the existing soft shadow for the floating contents menu.

## Shapes

Buttons and fields use the control radius; photographic frames and major panels remain square. Globe/CP orbit markers and page selectors are circular. Matrix cells use their smaller radius and evidence-status dots are circular. Dividers and field outlines are normally 1px; selected validation levels use a 2px bottom border. Outline SVG icons are normally 20px with 1.6 stroke width.

## Components

- **Actions:** outline buttons have a 44px minimum height, mist hover and line active fill. Pressed choices use lake/surface; dark-stage controls reverse to a light pressed state. Disabled buttons use .48 opacity. Generic button state transitions are 180ms.
- **Fields:** native input/select fields are at least 48px high; textareas at least 80px with vertical resize. Ranges have a 44px interaction height and lake accent. Focus is a 3px lake outline offset 4px; matrix cells use 2px/2px. File-control wrappers expose the same focus treatment through `:focus-within`.
- **Navigation:** Explore opens the sole raised panel with all nine chapter links and the reference library. The current link is underlined; Escape closes the panel and returns focus to its trigger. At 800px the English wordmark and motion-control text hide, while accessible labels remain. Chapter-forward links are flat ruled rows.
- **Source containers and status:** source records, selected-cell explanations and export panels use mist and space rather than generic card chrome. Provenance tags use a small dot plus explicit wording; they are functional evidence labels.
- **Data controls:** a native channel selector mirrors map selection; the monthly plot has a values table and fixed vertical scale. Matrix cells expose labels and Enter/Space activation; full imported decoration/site labels remain available in a disclosure. Color meaning is stated beside the matrix.
- **Photography:** Zhouzhuang and Rhumsiki images use authored crops with alt text and reachable credits. They sit under the selected community questions; the Rhumsiki label states that it is wider regional context, not an excavation site. Credits identify ngader / CC BY 2.0 and krishna naudin / CC BY-SA 2.0, including resizing, WebP conversion and layout cropping.
- **Motion:** the globe interpolates only between labeled views, pulses source symbols and moves one explicitly schematic question marker. CP pages turn in 380ms; content and question changes reveal in 250–300ms. GIFs play in one large theatre and can be replayed. Map highlight transitions take 150ms. Validation opacity changes use a 240ms Framer Motion default. Timeline playback is manually started, advances one month every 1000ms, pauses outside the viewport or in a hidden page, and stops at December 2025. Seeking stops playback.
- **Reduced motion:** OS preference initially disables motion; a later reduced-motion preference change also disables it. The header control sets `data-motion="off"`; CSS animations/transitions and smooth scrolling stop, Three.js source marks become static, and Framer Motion duration becomes zero. Animated research examples swap to representative stills. Timeline playback is disabled while motion is off; all buttons, sliders and static readings remain usable.

## Do's and Don'ts

### Do:

- Do retain the local font files and established fallback stacks.
- Do keep photo author, source, license and crop/adaptation credits reachable.
- Do provide text labels and keyboard alternatives beside data graphics.
- Do preserve focus treatment and usable slider, selector and reading states when motion is off.

### Don't:

- Don’t add decorative dashboard cards, background grids or ornamental rain to exhibition surfaces.
- Don’t animate map channels as if they measure physical flow.
- Don’t treat qualitative matrix colors as counts, probabilities or evidence of absence.
- Don’t substitute generic imagery for credited place photography or invent community testimony.
