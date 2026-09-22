# Deploying the atlas to Vercel with Git import

The app is a static Vite build. It needs no server, database, API key or Vercel environment variable.

Fonts, photographs, screenshots and teaching animations are versioned as chunked Base64 source. The `prebuild` hook reconstructs them locally before Vite runs, so Vercel does not fetch media from third-party hosts.

## 1. Verify the release locally

```bash
npm install
npm run check
npm audit --omit=dev
npm run preview:standalone
```

Expected results:

- TypeScript and Vite build successfully.
- The data validator reports 420 waterways, 300 precipitation months and a valid Colab companion.
- The build validator finds the data snapshots and stays below the JavaScript budget.
- Sixteen focused DOM and transformation tests pass. These do not verify CSS layout or WebGL rendering.
- The dependency audit reports zero vulnerabilities.

## 2. Create a Git repository

Create an empty repository in GitHub, GitLab or Bitbucket. Do not initialize it with another README if you want to paste the commands below unchanged.

From this project folder:

```bash
git init
git add .
git commit -m "Release Between Water and Mountains atlas"
git branch -M main
git remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git
git push -u origin main
```

The included GitHub Actions workflow runs `npm run check` on pushes and pull requests. If you use GitLab or Bitbucket, the Vercel build still works; translate the small check workflow to your CI service if desired.

## 3. Import into Vercel

1. Sign in at [vercel.com](https://vercel.com/).
2. Select **Add New → Project**.
3. Under **Import Git Repository**, connect the Git provider and select the atlas repository.
4. Confirm these settings:

| Setting | Value |
|---|---|
| Framework Preset | Vite |
| Root Directory | `./` |
| Install Command | `npm install` (default) |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment Variables | None |

5. Select **Deploy**.

`vercel.json` already declares the Vite framework, `dist` output and conservative security headers.

## 4. Run the deployed acceptance check

Use the preview URL before assigning a custom domain.

### Experience

- The opening 3D globe locates Kunshan and the wider Mandara region; three place controls and three source-layer controls all change the visible explanation.
- Kunshan and Mandara have bilingual labels, “where/why” introductions and separate evidence boundaries. The comparison arc is identified as a course question, not a historical route.
- The *Analects* passage shows Chinese, pinyin, an English teaching translation and a direct source URL.
- Community questions appear before the tutorial and the selected lens persists into the later comparison and exported claim.
- The tutorial exposes a four-layer decision tree with at most three choices per layer, six named interaction patterns, a keyboard-operable before-and-after slider, five credited Munzner slide excerpts and a large six-example research theatre.
- The embedded Colab preview changes across six learning cells; the bundled notebook downloads, and the external Colab link resolves after the release commit reaches GitHub.
- **Pause motion** suppresses entrances and timeline playback. The rain timeline is opt-in; map geometry never changes with rain.
- The **Explore** menu reaches all nine chapters plus the full reference library. Escape closes it and returns focus to its trigger.
- At 200% zoom, controls remain usable and no horizontal page scroll appears (the culture matrix may scroll inside its labeled container).

### Data and links

- Every source link opens a real source or documentation page.
- The reference library lists all authors for every cited paper and supplies DOI or source links for the textbook, research examples, data, primary text and media.
- Selecting a map line reveals its individual OSM object link.
- The year/month controls change the precipitation reading and line chart.
- The Mandara download reaches the translated tDAR `.xlsx` endpoint.
- Loading that file changes the matrix badge to **Derived from your local file** and displays a usable row count.
- The six-page CP explainer works by button and Left/Right Arrow; the glossary defines twelve terms and all fourteen CP chips explicitly remain model identifiers.

### Learning interactions

- The three comparison lenses change both place-specific questions near the top and again after evidence inspection.
- A field note survives refresh. **Bring in my field note** fills only empty team-claim evidence fields.
- Each of the four validation tabs accepts a note and can be marked checked.
- The validation JSON downloads.
- The team-claim builder copies a Markdown post and downloads a `.md` file.
- When clipboard access is denied, a file is downloaded with a visible explanation.

### Responsive and accessibility

- Check widths near 1440, 1024, 768 and 390 px.
- Check keyboard focus on globe controls, question lenses, decision-tree choices, notebook steps, CP pages/chips, channel selector, matrix cells, sliders, level buttons and form controls. The native channel selector provides the keyboard alternative to thin map lines.
- Enable operating-system reduced motion and reload; no continuous motion should remain.
- Verify readable captions, focus indicators and control boundaries across the dark orientation/tutorial stages and light evidence chapters. Check that the mobile motion control retains its accessible label.

The HTML generated in `preview/` is the compiled application, but it is not proof that visual/device checks passed. Record acceptance against the public Vercel URL associated with the exact release commit.

## 5. Git-based updates

Push reviewed changes to `main` to update production:

```bash
git add .
git commit -m "Describe the atlas update"
git push
```

Use a branch and pull request for data refreshes or substantial interpretive changes. Vercel will create a preview deployment for review before merge.

## 6. Optional custom domain

In the Vercel project, open **Settings → Domains**, add the domain and follow Vercel’s DNS instructions. No code change is required.

## 7. Rollback

Use the Vercel **Deployments** view to promote a previously successful deployment, or revert the Git commit and push. Never edit a bundled data snapshot directly in the Vercel dashboard; preserve a reviewable provenance trail in Git.
