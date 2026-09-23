# 水山之间 · Between Water & Mountains

A bilingual, interactive evidence atlas for INFOSCI 301. Every learning interface can be read in English, Chinese, or a side-by-side bilingual mode. It orients Kunshan and the Mandara Mountains on a guided 3D globe, connects each place to its evidence, and asks students to carry a community question through source inspection, visualization design and validation.

## Generate an offline application preview

Run `npm run preview:standalone`, then open `preview/Between_Water_and_Mountains_Interactive.html` in a browser. The generated file embeds the React application, photographs, tutorial excerpts, fonts and teaching snapshots. It is excluded from Git because it can be reproduced from the reviewed source. The core lesson does not require a network connection; source links still do. If clipboard access is unavailable, the export buttons save files instead.

## The journey

1. **Orient the journey:** follow a five-step 3D tour, drag and zoom the globe, focus Kunshan or the Mandara region, and switch among mapped, climate and material-history source layers.
2. **Choose a community question:** select Movement, Continuity or Missing voices before choosing a visualization control.
3. **Learn the interactions:** follow a max-three-choice-per-layer design tree, study six patterns, explore enlarged research animations, and open two executable Google Colab studios for interaction design and accessible color palettes.
4. **Meet the evidence:** inspect one real source record and mark it inspected yourself.
5. **Follow the water:** select a channel, explore 300 months of NASA POWER precipitation, or play the timeline. The channel geometry stays fixed.
6. **Read the mountain:** turn six explanatory pages, open a twelve-term glossary, inspect CP1–CP14 as model identifiers, explore the qualitative matrix, or load a tDAR spreadsheet locally.
7. **Build the bridge:** revisit the selected question after seeing both evidence families; write an observation, interpretation and question.
8. **Validate the claim:** record Domain/Community, Data/Task, Idiom and Algorithm checks.
9. **Return the question:** carry the selected lens and field note into the team claim, preview it and export to Ed Discussion.

Notes save in this browser when local storage is available. Imported spreadsheets stay in memory and are not uploaded. No community testimony or local impact is invented.

## Run and verify

Use Node.js 22.13+ and npm.

```bash
npm ci
npm run notebook:build
npm run dev
```

```bash
npm run check
npm audit --omit=dev
npm run preview:standalone
```

The check compiles TypeScript, builds the production bundle, validates all three teaching snapshots and both Colab notebooks, checks release assets and runs focused DOM and transformation tests. DOM tests do not render CSS and are not a visual audit. The standalone preview builder packages the same application into one HTML file.

Two versioned notebooks are generated reproducibly. `notebooks/INFOSCI301_Interaction_Design_Companion.ipynb`, built by `scripts/build-notebook.mjs`, uses Plotly, pydeck, Altair and ipywidgets for the bilingual globe, spatial layer, linked selection, time, decision and evidence-card exercises. `notebooks/INFOSCI301_Color_Palette_Accessibility_Studio.ipynb`, built by `scripts/build-color-notebook.mjs`, explains sRGB, CMYK/ICC and CIELAB/OKLCH; compares qualitative, sequential and diverging encodings; tests WCAG contrast and color-vision conditions; surveys research and global standards; and exports production-ready palette handoffs. The app embeds direct downloads and links to both Colab runtimes; no account or API key is required to read either embedded tutorial preview.

Versioned binary media lives as chunked Base64 source in `assets-base64/`. The `predev` and `prebuild` scripts reconstruct the exact ignored files before Vite runs; no network download is required during a Vercel build.

## Deploy through Vercel Git import

Follow [DEPLOYMENT.md](DEPLOYMENT.md). Import this folder as a repository, keep the Vite preset, use `npm run build`, and publish `dist`. No API key, backend or environment variable is required. The GitHub workflow runs the release checks.

## Design and provenance

The redesign applies the original Frontend Design, UI/UX Pro Max, Taste Skill and Impeccable instructions. [DESIGN_APPLICATION.md](DESIGN_APPLICATION.md) records sources, choices and verification limits; [DESIGN_BLUEPRINT_V3.md](DESIGN_BLUEPRINT_V3.md) records the visual sequence, recommendation ranking, evidence/reader-task map and release gate; DESIGN.md records the implemented tokens. The new story begins with geographic orientation and community questions, then shifts into evidence and design. Self-hosted Bodoni Moda and Source Sans 3 accompany Chinese serif typography; dark globe/tutorial stages and mineral-paper evidence chapters share one semantic palette.

The app’s on-page reference library lists every author for the books, papers and systems in APA style, alongside full data and media credits. Photographs and tutorial excerpts are also documented in [public/images/CREDITS.md](public/images/CREDITS.md). They provide geographic or teaching context, not documentation of the excavations or course fieldwork.

## Data

See [DATA_SOURCES.md](DATA_SOURCES.md). The official Mandara rows are not bundled. The default display is a paper-derived qualitative summary. The XLSX importer displays site × decoration frequencies; it does not reproduce the paper's Bayesian model. For 2001–2025 snapshot updates:

```bash
npm run data:refresh
npm run check
```

Review the data diff before committing.

## Licensing

Application code is MIT licensed. Data, photographs and fonts retain their separate source licenses. Never apply the code license to the OSM data, linked tDAR materials or photographs.
