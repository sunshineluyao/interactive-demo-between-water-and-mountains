# Versioned binary assets

Vercel and local builds reconstruct the exact fonts, photographs, tutorial screenshots, and teaching animations from the chunked Base64 files in this directory. `scripts/materialize-assets.mjs` joins each ordered `.b64.part-NNN` family and writes the decoded bytes to the corresponding project-relative path before Vite runs.

The decoded files are ignored because they are deterministic build products. Their authors, source links, changes, and licenses are recorded in `public/images/CREDITS.md` and in the application’s on-page APA reference library.
