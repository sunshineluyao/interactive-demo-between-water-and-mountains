# Release 4.3 · coherent 3D tutorial route

- Replaced the fragile three-column community-lens summary with a responsive bilingual card that keeps the selected question, purpose, recommended interactions, and change action readable at every supported width.
- Reorganized the tutorial into eight visibly numbered stages: vocabulary, design path, guided practice, textbook comparison, research comparison, Colab reconstruction, color/3D testing, and explanation.
- Added an interactive four-stage 3D learning route that connects community question, evidence boundary, interaction choice, and validation; it includes manual controls, optional autoplay, a static fallback, and reduced-motion behavior.
- Expanded the globe’s source-specific 3D motion with flowing mapped-water particles, falling climate marks, and rotating material-pattern facets while preserving the stated evidence boundaries.
- Restyled the global-standards crosswalk as a higher-contrast editorial table with clearer row grouping and scan paths.
- Extended bilingual copy and interaction tests to cover the rebuilt lens card and the new logic navigator.

# Release 4.2 · accessible color palette studio

- Added a twenty-cell bilingual Google Colab notebook that distinguishes the three major color representations—sRGB, CMYK with ICC profiles, and CIELAB/OKLCH—from qualitative, sequential, and diverging data encodings.
- Embedded a live color workbench with hue, chroma, lightness, class-count, color-vision, before/after, and 3D-lighting sliders so readers can compare designed palettes in context.
- Added WCAG-aware contrast checks, redundant labels, approximate color-vision previews, seven global standards checkpoints, and clear limits on what simulation can establish.
- Added a credited gallery spanning Nature Methods, ColorBrewer, IEEE VIS, and ACM CHI, plus Figma, Adobe, CSS token, and Three.js production guidance.
- Extended the reference library, build pipeline, notebook validation, release checks, and interaction tests to cover both executable teaching companions.

# Release 4.0 · full bilingual interface, guided 3D story and Colab studio

## Added

- Added persistent English, 中文 and side-by-side bilingual reading modes across the complete learning interface, including navigation, evidence boundaries, controls, validation prompts and export guidance. APA citations, code, dataset identifiers and user-authored notes remain in their source language.
- Added a five-step guided 3D orientation story, direct drag/zoom/reset controls, place-marker ripples, atmospheric depth, moving source glyphs and a multi-point schematic question arc. Reduced-motion mode stops autoplay while preserving every control.
- Rebuilt the Colab companion as a nineteen-cell bilingual studio using Plotly, pydeck, Altair, ipywidgets and versioned teaching snapshots.
- Added eight in-app notebook previews with styled result miniatures for globe orientation, spatial inspection, CP selection, temporal change, linked brushing, design decisions, evidence-card authorship and four-level validation.
- Added a reproducible `npm run notebook:build` command and strengthened notebook-content validation.

## Changed

- Reorganized the orientation controls around “locate → inspect source → read boundary → return to question.”
- Improved compact desktop and mobile layouts for the language switcher, globe console and notebook package/result views.
- Expanded the focused test suite to seventeen checks, including all three language modes, five guided-tour steps and the eight-cell embedded notebook route.

## Verification target

Run `npm run check`, `npm audit --omit=dev`, and `npm run preview:standalone`; then complete English/中文/bilingual desktop and mobile acceptance on the Git-linked Vercel deployment.

# Release 3.0 · global orientation, question-first design and CP literacy

## Added

- Added an interactive 3D globe that locates Kunshan and the wider Mandara study region, supports three place views, and introduces three source layers with explicit evidence boundaries.
- Added bilingual place labels and a Chinese–pinyin–English presentation of *Analects* 6.23 with a direct source URL and a warning that the quotation is a question-making lens, not evidence.
- Moved Movement, Continuity and Missing voices to the top of the journey and persisted the selected lens through the tutorial, comparison chapter and exported team claim.
- Added a four-layer designer decision tree with no more than three choices per layer and a live recommendation, evidence boundary and validation test.
- Rebuilt the research-example gallery as a large replayable animation theatre with reduced-motion stills.
- Added an embedded notebook tutorial and an executable Google Colab companion covering globe orientation, selection, parameter change, overview + detail, brushing/linking, filtering, aggregation and design validation.
- Added a six-page culture-period explainer, twelve-term archaeology/model glossary, and interactive CP1–CP14 identifier guide before the Mandara matrix.

## Changed

- Reframed “Every control should change what you can learn” as an operational test: each control must support noticing, comparing, testing, explaining, or exposing an evidence limit.
- Clarified that CP labels are latent decoration-distribution identifiers, not peoples, named cultures, chapters, ranks, dates, or an ordered timeline.
- Expanded source, notebook, navigation, decision-tree and CP-explainer tests and added notebook JSON/content validation to the release check.

## Verification target

Run `npm run check`, `npm audit --omit=dev`, and `npm run preview:standalone`; then complete desktop/mobile/WebGL acceptance on the Git-linked Vercel deployment.

# Release 2.1 · interaction tutorial and complete citation surface

## Added

- Added a guided six-pattern interaction studio using Munzner’s manipulate, facet and reduce terminology.
- Added a keyboard-operable before-and-after comparison slider for every pattern.
- Added five credited textbook-slide excerpts and six research-system examples, explicitly labeled as applied, reference or extension patterns.
- Added an on-page APA-style reference library covering the textbook, lecture slides, papers, data, primary text, photography and teaching excerpts, with every author listed.
- Added reduced-motion still frames for animated research examples and embedded all tutorial media in the standalone preview.
- Expanded build integrity and DOM tests to cover the tutorial, comparison control, navigation count, citations and deployed tutorial assets.

## Verification target

Run `npm run check`, `npm audit --omit=dev`, and `npm run preview:standalone`; then complete desktop/mobile browser acceptance on the Git-linked Vercel deployment.

# Release candidate 2.0 · place before pattern

## Changed

- Replaced the abstract WebGL entrance, decorative metrics, chapter rail and bottom dock with a photographic exhibition and one Explore menu.
- Added credited Zhouzhuang and Rhumsiki images, local fonts and a unified light visual system.
- Preserved all six chapter destinations and teaching functions.
- Source inspection now requires a deliberate mark; opening a link does not claim inspection.
- Removed implied river-flow animation. Rainfall playback is opt-in, pauses offscreen/in a hidden tab, stops at the final month, and uses a fixed chart scale.
- Added a native channel selector and a rainfall data table.
- Clarified the qualitative Mandara cells: “not asserted” never means proven absence.
- Local spreadsheet cells now show share of all usable site records on a common 0–100% scale. Full arbitrary labels have a readable key.
- Added Movement, Continuity and Missing voices lenses and a bilingual-ready field notebook.
- Field notes, source marks, validation notes and team claims save locally, with recovery from malformed stored drafts.
- Added explicit transfer of field notes into empty team-claim fields, editable source URLs and post preview.
- Clipboard failures produce a downloadable file.
- Added a reproducible self-contained application preview builder.

## Verification

TypeScript build, bundled data validation, release integrity and 10 focused DOM/transformation tests pass. Production dependency audit reports zero known vulnerabilities at this build. The production JavaScript is approximately 0.52 MB before compression; the spreadsheet parser remains a separate chunk.

Impeccable's local context and detector ran. The detector's sole warning was a false positive for SVG stroke-width as CSS layout width. Its online concept catalogue was unavailable on both attempts. An independent source review found six material issues; their code and documentation fixes are recorded in DESIGN_APPLICATION.md.

The formal visual-review disposition remains **recapture**: valid desktop/mobile screenshots were unavailable under the managed browser policy. This is a source-verified release candidate, not a visually certified release. Nothing has been published.
# 4.1 · Bilingual motion studio

- Strengthens the complete English, Chinese, and bilingual reading modes.
- Gives mapped water, seasonal climate, and inferred material patterns distinct 3D visual grammars and evidence-boundary cues.
- Adds an animated, pausable globe orbit to the Colab studio and clarifies its high-quality interactive package stack.
