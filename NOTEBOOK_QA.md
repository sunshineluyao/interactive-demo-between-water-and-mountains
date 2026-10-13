# Notebook revision acceptance · 14 October 2026

Five notebook routes are revised across the companion repositories. This repository owns interaction and color.

- Authoritative `.ipynb` sources preserve the existing demonstrations and source citations.
- 25 code cells executed locally, with initial Python widget callbacks and rich display outputs captured. No saved code errors.
- OSM/NASA/Mandara snapshots are bundled; a core run does not silently refresh their data.
- January/July compare the same 25 years on a common mm/day scale. CP cells carry categorical D/s/— cues and explicit status text.
- Color-vision conversion follows the Colorspacious documentation. Black/white contrast returns 21:1. Imported colors update the builder, surface and matching JSON/CSS/ASE/figure outputs; reset restores builder controls.
- Saved views are generated from these recorded outputs. They are distinct from the browser app's current state. Python controls require a Colab/Jupyter kernel; saved JS chart interactions require their script dependencies.
- Figure PNG/SVG/PDF, source dictionaries, audit data and blank design records are in the download ZIPs.
- `NOTEBOOK_RELEASE.json` binds source and served HTML through SHA-256. Vercel builds select the exact commit for Colab.
- R and specialist extensions in the companion Atlas repo are retained reference routes and were not rerun.

Checks: TypeScript + Vite production build; data/build integrity; 29 app/release tests; real palette callback checks. Figure exports inspected visually. Hosted/mobile browser acceptance is recorded separately after preview deployment. Remote student-account Colab execution has not been claimed.

Regenerate with `python3 -m pip install -r scripts/notebook-requirements.txt` then `npm run notebook:build`. Python rich-output capture is an in-process runner; it does not claim to emulate all kernel or browser widget behavior.
