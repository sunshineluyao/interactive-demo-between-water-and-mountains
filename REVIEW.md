disposition: recapture

## verdict

This follow-up scores only the six previously reported source findings against the current files. It is a source review, not visual approval. No browser workaround, additional defect hunt, or independent test rerun was performed.

1. **Resolved — mobile motion-control name.** `src/App.tsx:79` now supplies a dynamic `aria-label` identifying Pause motion or Enable motion. The accessible name no longer depends on the text hidden by the mobile stylesheet.
2. **Resolved — invalid saved-draft recovery.** `src/lib/drafts.ts:8` validates restored JSON, rejects null, arrays and non-string object fields, and merges accepted string fields with defaults. `src/components/EvidenceShelf.tsx:67` validates inspected-source indices; `src/components/ValidationLab.tsx:55` validates checked-level identifiers. Both array validators reject duplicate entries and invalid members.
3. **Resolved — matrix teaching description.** `src/components/ValidationLab.tsx:36` now distinguishes regional-group/culture-period teaching data, the imported site/decoration view, and the paper's separate depth analysis.
4. **Resolved — imported-data denominator.** `DATA_SOURCES.md:56` documents division by all usable imported rows for the relevant site, omitted decoration mass, and the fixed 0–100% scale. This matches the implementation's site-total denominator.
5. **Resolved — reported decorative eyebrows.** `src/components/FieldReturn.tsx:90` and `src/components/FieldReturn.tsx:128` now present the headings directly, without the two reported labels.
6. **Resolved at source level — arbitrary imported column labels.** `src/components/MountainAtlas.tsx:160` uses compact D1–D13 display codes. The full decoration/site key at line 194, SVG titles, and cell accessible names retain the complete values. Long site names receive a shortened display. The original unbounded column-label placement has been removed; rendered spacing remains subject to capture review.

## remaining

The six source findings are closed. Desktop and mobile visual verification remains open: `.impeccable/review/desktop.png` and `.impeccable/review/mobile.png` are absent. Valid captures must show the actual running application at their named viewports. The self-contained HTML artifact is not a screenshot.

The formal disposition remains **recapture**. This review does not establish whole-surface visual fidelity, typography, cropping, responsive geometry, or a visual ship verdict.

disposition: recapture
