# 水山之间 · Between Water & Mountains

A photographic, interactive evidence atlas for INFOSCI 301. It connects Kunshan's waterways and rainfall records with questions raised by Mandara archaeological evidence. Students inspect sources, compare representations and bring a question back to their own community.

## Open the actual application preview

Open `preview/Between_Water_and_Mountains_Interactive.html` in a browser. This is the compiled React application with its photographs, tutorial excerpts, fonts and teaching snapshots embedded. It is not a drawing or a screenshot, and the core lesson does not require a network connection. Source links still require internet access. If clipboard access is unavailable, the export buttons save files instead.

## The journey

1. **Learn the interactions:** study six patterns through action/response scripts and accessible before-and-after sliders; compare applied patterns with credited textbook and research examples.
2. **Meet the evidence:** inspect one real source record and mark it inspected yourself.
3. **Follow the water:** select a channel, explore 300 months of NASA POWER precipitation, or play the timeline. The channel geometry stays fixed.
4. **Read the mountain:** inspect the qualitative teaching matrix or load a tDAR spreadsheet locally.
5. **Build the bridge:** choose Movement, Continuity or Missing voices; write an observation, interpretation and question.
6. **Validate the claim:** record Domain, Data/Task, Idiom and Algorithm checks.
7. **Return the question:** bring the field note into the team claim, preview it and export to Ed Discussion.

Notes save in this browser when local storage is available. Imported spreadsheets stay in memory and are not uploaded. No community testimony or local impact is invented.

## Run and verify

Use Node.js 22.13+ and npm.

```bash
npm ci
npm run dev
```

```bash
npm run check
npm audit --omit=dev
npm run preview:standalone
```

The check compiles TypeScript, builds the production bundle, validates all three teaching snapshots, checks release assets and runs focused DOM and transformation tests. DOM tests do not render CSS and are not a visual audit. The standalone preview builder packages the same application into one HTML file.

## Deploy through Vercel Git import

Follow [DEPLOYMENT.md](DEPLOYMENT.md). Import this folder as a repository, keep the Vite preset, use `npm run build`, and publish `dist`. No API key, backend or environment variable is required. The GitHub workflow runs the release checks.

## Design and provenance

The redesign applies the original Frontend Design, UI/UX Pro Max, Taste Skill and Impeccable instructions. [DESIGN_APPLICATION.md](DESIGN_APPLICATION.md) records sources, choices and verification limits; DESIGN.md records the implemented tokens. Photography leads the exhibition. Self-hosted Bodoni Moda and Source Sans 3 accompany Chinese serif typography. The single light system uses mineral paper, lake blue and readable controls.

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
