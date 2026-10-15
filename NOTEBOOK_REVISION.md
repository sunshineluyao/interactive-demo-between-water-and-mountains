# Notebook revision · 13 October 2026

The GitHub notebook is the canonical lesson. Its downloadable `.ipynb`, saved HTML result, source checksum, and figure/data bundle now travel together. The Vercel interface embeds this actual saved output instead of a simulated notebook result. No Hugging Face source or deployment was inspected or changed.

## Teaching and execution contract

- Preserve the existing demonstrations, references, bilingual explanations, and human authorship. Each executable idiom gains a task, named method, data/unit note, evidence boundary, and adaptation prompt.
- Run the bundled-data core first. `RUN_PACKAGE_EXTENSIONS=False` keeps specialist libraries optional, with explicit not-run status. A printed skip is not an executed algorithm. Package installation may require internet; the default lesson data do not require a live API, account, or key.
- Compare the same records and fixed scales. Source hashes accompany snapshots; paper/topic assignments are not citations, heritage dates are designations, rainfall is modeled monthly mean precipitation, and archaeological teaching assertions are categorical rather than counts/probabilities.
- Export editable SVG/PDF/PNG, relevant CSV dictionaries, parameter state, and a student design record. Actual peer feedback stays blank until collected. The saved bundle is the reference run; students edit and export their own record in Colab.
- Widget controls require Colab. The web result supports readable static outputs and saved Plotly/Altair inspection where the browser and supporting libraries permit it. The record verifies Python execution, not end-to-end Colab gestures, R, every optional package, touch operation, screen-reader conformance, or community validation.

## Rebuild and maintain

Use Python 3.12 with `requirements-notebooks.txt` and Node 22.12+ (checked with Node 24.19).

```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements-notebooks.txt
npm run notebook:build
.venv/bin/python scripts/publish_notebooks.py
npm test
```

`notebook:build` modifies editable sources; `notebook:publish` executes each in a fresh IPython process and generates matching HTML, bundles, and `public/notebooks/manifest.json`. A failed core cell stops publication. Execution uses no Jupyter kernel sockets. `--render-only` refreshes HTML from already executed notebooks and existing run assets; it does not verify a new run. Generated source cells have stable IDs; original code is retained in cell metadata so repeated source generation is idempotent. Saved output files are stored as compressed text parts; a pinned external Plotly renderer supports browser inspection so ordinary Vercel builds need no Python runtime.

Run `npm test` after any notebook or embedding change. Regression checks compare the exact notebook SHA-256, every embedded SVG/PNG, recorded figure totals, cell anchors, optional status, and local download destinations. A source edit without republishing will fail the checksum check.

## Applied design tools

| Checklist skill/tool | Applied decision | Source |
|---|---|---|
| Frontend Design | Full-width readable results, clear output/source/download hierarchy | https://github.com/anthropics/skills/tree/main/skills/frontend-design |
| UI UX Pro Max | Responsive spacing, clear control and status treatment, readable notebook framing | https://github.com/nextlevelbuilder/ui-ux-pro-max-skill |
| Impeccable | Remove simulated result UI, clarify saved execution versus runnable controls, repair overflow | https://github.com/pbakaus/impeccable |
| Scientific visualization / scientific-data-figures | Real-data comparisons, fixed baselines, explicit units, editable vectors | https://github.com/K-Dense-AI/scientific-agent-skills/tree/main/scientific-skills/scientific-visualization |
| figure-reviewer | Separate figure inspection, label/collision repairs, grayscale and source review | https://research-figure-guide.nature.com/ |

These are the tools relevant to this revision, not a claim that every tool in the AI Design Tools Checklist was executed. Generated illustrations were unnecessary: all quantitative and relationship figures are reproducible code-driven outputs.

## Revised lessons

Interaction Design now bundles checksum-verified OSM geometry, NASA POWER months, and categorical Mandara teaching assertions. The linked matrix uses categorical colors and context instead of quantitative strength bars. Temporal axes retain a fixed all-years scale. Static map, rainfall, and text-supported categorical counterparts retain the evidence when widgets are unavailable.

Color Palette Studio matches the app's OKLCH gamut reduction, rounding, and default. An exported app palette loads before figures and handoff files. CVD matrices run in linear sRGB and the notebook uses the corrected Colorspacious conversion direction. Sequential 2025 precipitation and zero-centered deviations from the 2001–2025 same-month mean explain palette choice on real project data.

The app embeds authentic cell outputs, removes the simulated miniature result, exposes exact source and SVG/PDF/PNG/data downloads, and exports a palette-state JSON for upload to Colab. Source notebooks remain under notebooks/; the existing Vite plugin emits their downloads.

## Validation

Twenty-five Python cells completed in fresh processes: 13 color, 12 interaction. Thirty-two automated tests include source/HTML hash and figure parity, downloads, actual cell anchors, 243 palette parameter combinations, and ten Colorspacious reference conversions. TypeScript, Vite, data and build-integrity checks pass. Optional browser libraries, Colab gestures, R, and actual student/community usability retain their documented limits. Inspect the source execution record before making a stronger claim.

## Publication format

GitHub stores readable, editable notebook source. Saved cell outputs live in the verified HTML companion. The publisher executes the same source in a fresh process, then clears the runtime output payload in the download to keep editing lightweight. The HTML includes the exact source and receipt; the manifest binds the source checksum, output checksum and figure count. Compressed text parts in public/notebooks/packed are assembled by scripts/materialize-notebook-outputs.mjs during npm build/test/dev, with checksums checked before writing HTML and ZIP assets. Colab runs need no build step; the source already contains the lesson data.

Automated review repairs: render-only refuses missing or changed execution sources; inner optional fallbacks retain an incomplete status; every generated PNG is included; Plotly exports have unique filenames; the standalone Water & Mountains file embeds both notebook outputs and their downloads. These paths have regression checks.

Live verification repair: the publisher explicitly emits rich implicit results, renders Markdown MIME output, and isolates each native Altair view in its own iframe. The affected setup/dependent cells were re-executed with unchanged Python source; their refresh receipt accompanies the original full execution record. Regression checks cover the metric table, recipes/tool table and native selection/brush views.

## Review and conflict resolution · 14 October 2026

The earlier notebook PR overlapped with the newer releases already on main. The merge preserves those lessons, native Altair views, link contrast, exports and canonical manifest pipeline, and replaces the superseded duplicate runner and stale parallel receipts. Every notebook now runs in its own process with an absolute source path. Setup checks installed package versions against explicit minimum constraints and upgrades outdated packages as well as missing ones. Vercel Colab links use the build commit instead of a moving main branch. Execution dates come from the actual UTC run.

Both notebooks were fully rerun (25 Python cells). All 33 tests, TypeScript, Vite, data validation and build-integrity checks passed. Regression coverage includes outdated/missing/compatible package environments and publishing multiple notebooks from an unrelated directory. Source/HTML hashes and PNG/SVG/PDF/CSV bundles were verified. Copilot reported a review quota limit; the actionable automated findings were from Codex.
