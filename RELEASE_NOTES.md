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
