# Data sources, rights and evidence boundaries

The atlas is a **federated comparison**. It never merges the Kunshan and Mandara records into one analytical table. Every layer retains its own source, scale, transformation and rights statement.

## 1. Kunshan-area waterways

- **Source:** OpenStreetMap contributors, requested through the Overpass API.
- **Inspection URL:** https://www.openstreetmap.org/#map=11/31.27/120.94
- **License:** Open Data Commons Open Database License (ODbL) 1.0.
- **License URL:** https://opendatacommons.org/licenses/odbl/1-0/
- **Bundled file:** `public/data/kunshan-waterways.geojson`
- **Snapshot extent:** south 31.08, west 120.78, north 31.43, east 121.10.
- **Transformation:** waterways tagged river/canal/stream were ranked to prioritize named features, rivers and longer geometries; 420 ways were retained; coordinates were simplified for interactive rendering.
- **Use supported:** locate and inspect mapped waterways; compare spatial form and tagging.
- **Not supported:** water quality, measured flow, flooding, community priorities or completeness claims.

Attribution shown in the app: **© OpenStreetMap contributors**.

## 2. Kunshan precipitation

- **Source:** NASA POWER Monthly and Annual API.
- **Documentation:** https://power.larc.nasa.gov/docs/services/api/temporal/monthly/
- **API response:** https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=PRECTOTCORR&community=AG&longitude=120.98&latitude=31.39&start=2001&end=2025&format=JSON
- **Bundled file:** `public/data/kunshan-precipitation.json`
- **Point:** 31.39° N, 120.98° E.
- **Period:** 2001–2025 (300 months).
- **Variable:** corrected precipitation, monthly mean in mm/day; the app also calculates an approximate monthly total using calendar days.
- **Underlying source reported by the API:** MERRA‑2.
- **Access statement:** NASA POWER describes the data as free and globally available. Cite NASA POWER and follow its current guidance.
- **Use supported:** compare seasonal and interannual precipitation at the dataset’s native resolution.
- **Not supported:** a gauge reading, localized storm record, river discharge, flood depth or water quality.

## 3. Mandara ceramics

- **Paper:** John D. O’Brien, Kathryn Lin and Scott MacEachern, “Mixture model of pottery distributions from Lake Chad Basin archaeological sites reveals ancient segregation patterns.”
- **Paper URL:** https://arxiv.org/abs/1511.05185
- **tDAR dataset:** https://core.tdar.org/dataset/400758/ceramic-dataset
- **Dataset DOI:** https://doi.org/10.6067/XCV83F4R7D
- **Translated XLSX:** https://core.tdar.org/filestore/download/400758/500728
- **R code record:** https://core.tdar.org/document/400759/analysis-files-for-mixture-model-of-pottery-distributions-from-lake-chad-basin-archaeological-sites-reveals-ancient-segregation-patterns
- **Access:** the tDAR record labels the resource public.
- **License wording used here:** the paper states that the scripts and cleaned data are freely available under a Creative Commons license. The exact Creative Commons variant is not present in the current DataCite rights metadata, so the app does not invent one.

### Bundled teaching layer

`public/data/mandara-teaching.json` is not the official row-level dataset. It encodes published textual claims with a transparent rule:

- dominant cultural-period membership → `1.0`;
- smaller reported contribution → `0.35`;
- no positive assertion in this teaching summary → display code `0.0`; this does not establish absence.

It also transcribes the five qualitative Site 642 sequence descriptions stated in the paper. The app labels this layer **Interpretive** and links directly to the paper and official record.

### Meaning of CP1–CP14

The paper defines a **culture period (CP)** as a consistent distribution of pottery-decoration types inferred as a latent component in a Dirichlet-process mixture model. CP1 through CP14 are the fourteen primary component identifiers reported by the paper. The numerals are not chapter numbers, names of cultures or peoples, ranks, dates, or a simple chronological order. The paper aggregates additional components as CP15; the teaching matrix intentionally displays only the fourteen primary labels represented in its qualitative transcription.

The page-turning explainer and glossary distinguish sherd, exterior decoration, site, excavation unit, recording unit, unit-level, culture period, Dirichlet-process mixture, posterior, culture painting, taphonomy and radiocarbon date. These explanations paraphrase the paper; they do not rename or extend its inferred components.

### Local import

The official translated `.xlsx` can be loaded into the app. Parsing happens in the browser; there is no upload route. The app identifies site and exterior-decoration columns, counts usable records, and displays up to 13 decorations and 11 sites, ranked by count. Each cell divides the number of matching site/decoration rows by **all usable imported rows for that site**. Omitted decoration categories can make displayed rows sum to less than 100%. The color scale is fixed from 0% to 100%. Column codes D1, D2, etc. link to full labels in the adjacent key. This is a frequency view, not the paper’s Bayesian mixture model.

## 4. Analects passage

- **Source passage:** https://zh.wikisource.org/wiki/%E8%AB%96%E8%AA%9E/%E9%9B%8D%E4%B9%9F%E7%AC%AC%E5%85%AD
- **Text used:** 知者樂水，仁者樂山。
- **Reading shown:** Zhì zhě yào shuǐ, rén zhě yào shān. Here 樂 is read *yào* (“to delight in / love”).
- **Numbering note:** the saying is commonly cited as 6.23; the linked Wikisource edition labels it 六之二一. The app names the book section (Yong Ye) and states the variation.
- **Role:** instructor-created interpretive prompt about movement and persistence.
- **Boundary:** the phrase is not an empirical feature, a causal hypothesis or a label assigned to either Kunshan or Mandara communities.

## 5. Community-based learning boundary

The app can help students propose a relationship with a Kunshan-area community, museum, practitioner or learner. It cannot establish that relationship or a community need. Students must separate observation from inference, identify missing voices, seek permission before public sharing, test usefulness and return a bilingual prototype or evidence card for revision.

## 6. Citation display

The deployed application includes a dedicated reference library after the nine learning chapters. It gives complete APA-style entries—with every author listed—for the interaction textbook, lecture slides, visualization research systems, Mandara paper and dataset, Kunshan data, primary text, photographs and teaching excerpts. DOI and inspection links remain visible beside the relevant entries. This ledger documents transformations and evidence boundaries; the website is the public-facing citation surface.

## 7. Executable teaching notebook

- **File:** `notebooks/INFOSCI301_Interaction_Design_Companion.ipynb`
- **Runtime:** Google Colab or any compatible Python/Jupyter environment.
- **Inputs:** the same versioned OpenStreetMap, NASA POWER and Mandara JSON/GeoJSON snapshots used by the app, loaded from this repository.
- **Interactions:** globe orientation, selection/highlighting, parameter change, overview + detail, interval brushing, linked filtering, aggregation and a bounded designer decision helper.
- **Boundary:** notebook globe arcs and teaching symbols are schematic. Every quantitative example displays its source, unit or denominator; no notebook cell recreates the paper's Bayesian posterior from the qualitative teaching layer.

## SDG educational connections and artwork (v4.4)

Official targets: United Nations Department of Economic and Social Affairs, Goals 4 (4.7), 6 (6.6), 11 (11.4), 16 (16.7), and 17 (17.16), accessed September 23, 2026. Primary URLs: https://sdgs.un.org/goals/goal4, https://sdgs.un.org/goals/goal6, https://sdgs.un.org/goals/goal11, https://sdgs.un.org/goals/goal16, https://sdgs.un.org/goals/goal17.

The application supplies course interpretations and proposed evaluation tasks, not official indicator values. Goal 6 concerns a Kunshan environmental inquiry extension; the Mandara pottery data do not measure hydrology. Goal 17 does not imply an existing international partnership.

Official unaltered icons were downloaded from https://sdgs.un.org/goals using its published image URLs. Their URLs and SHA-256 hashes are recorded in `public/images/sdg/credits.json`. Versioned base64 objects reproduce the original bytes. Informational educational use, no UN emblem or endorsement; see https://www.un.org/sustainabledevelopment/news/communications-material/. SDG icon colors remain identity colors and are not used as a numerical palette.

Course alignment source: Zhang, L. (2026). *INFOSCI 301: Learning and innovation pathway, Weeks 1–7 + final* [Course briefing, pp. 1–4]. Duke Kunshan University. The supplied course PDF was consulted; its student photographs are not republished in the repository.
