import { build } from 'vite'
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const root = process.cwd()
const temporary = resolve(root, '.preview-build')
await build({
  configFile: resolve(root, 'vite.config.ts'),
  publicDir: false,
  build: {
    outDir: temporary, emptyOutDir: true, sourcemap: false,
    lib: { entry: resolve(root, 'src/main.tsx'), name: 'WaterMountains', formats: ['iife'], fileName: () => 'atlas.js' },
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
})
let js = readFileSync(resolve(temporary, 'atlas.js'), 'utf8')
let css = readdirSync(temporary).filter((name) => name.endsWith('.css')).map((name) => readFileSync(resolve(temporary, name), 'utf8')).join('\n')
for (const name of ['zhouzhuang.webp', 'rhumsiki.webp']) {
  const data = `data:image/webp;base64,${readFileSync(resolve(root, 'public/images', name)).toString('base64')}`
  js = js.replaceAll(`/images/${name}`, data)
}
for (const name of readdirSync(resolve(root, 'public/images/tutorial'))) {
  const extension = name.split('.').pop()
  const mime = extension === 'jpg' ? 'image/jpeg' : extension === 'gif' ? 'image/gif' : 'image/png'
  const data = `data:${mime};base64,${readFileSync(resolve(root, 'public/images/tutorial', name)).toString('base64')}`
  js = js.replaceAll(`/images/tutorial/${name}`, data)
}
for (const name of ['bodoni-moda-500.ttf', 'source-sans-400.ttf', 'source-sans-600.ttf']) {
  const data = `data:font/ttf;base64,${readFileSync(resolve(root, 'public/fonts', name)).toString('base64')}`
  css = css.replaceAll(`/fonts/${name}`, data)
}
const notebookName = 'INFOSCI301_Interaction_Design_Companion.ipynb'
const notebookData = `data:application/x-ipynb+json;charset=utf-8,${encodeURIComponent(readFileSync(resolve(root, 'notebooks', notebookName), 'utf8'))}`
js = js.replaceAll(`/notebooks/${notebookName}`, notebookData)
const snapshots = Object.fromEntries(['kunshan-waterways.geojson', 'kunshan-precipitation.json', 'mandara-teaching.json'].map((name) => [`/data/${name}`, JSON.parse(readFileSync(resolve(root, 'public/data', name), 'utf8'))]))
const safe = (text) => text.replaceAll('</script', '<\\/script')
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>Between Water & Mountains · Interactive preview</title><style>${css}</style></head><body><div id="root"></div><script>window.__ATLAS_SNAPSHOTS__=${safe(JSON.stringify(snapshots))};</script><script>${safe(js)}</script></body></html>`
const destination = resolve(root, 'preview/Between_Water_and_Mountains_Interactive.html')
mkdirSync(resolve(root, 'preview'), { recursive: true })
writeFileSync(destination, html)
console.log(`Saved self-contained application: ${destination} (${(Buffer.byteLength(html) / 1e6).toFixed(2)} MB)`)
