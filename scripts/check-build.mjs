import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

const required = [
  'dist/index.html',
  'dist/favicon.svg',
  'dist/data/kunshan-waterways.geojson',
  'dist/data/kunshan-precipitation.json',
  'dist/images/tutorial/munzner-taxonomy.jpg',
  'dist/images/tutorial/vega-brush-link.gif',
  'dist/notebooks/INFOSCI301_Interaction_Design_Companion.ipynb',
]

for (const path of required) {
  if (!existsSync(resolve(path))) throw new Error(`Missing build artifact: ${path}`)
}

const html = readFileSync(resolve('dist/index.html'), 'utf8')
for (const token of ['Between Water', 'favicon.svg', 'assets/']) {
  if (!html.includes(token)) throw new Error(`Build index is missing: ${token}`)
}

const source = readFileSync(resolve('src/App.tsx'), 'utf8')
for (const chapter of ['orientation', 'questions', 'tutorial', 'evidence', 'water', 'mountain', 'bridge', 'validate', 'return']) {
  if (!source.includes(`id: '${chapter}'`)) throw new Error(`Missing sequential chapter: ${chapter}`)
}

const jsBytes = readdirSync(resolve('dist/assets'))
  .filter((name) => name.endsWith('.js'))
  .reduce((sum, name) => sum + statSync(resolve('dist/assets', name)).size, 0)
if (jsBytes > 2_000_000) throw new Error(`JavaScript budget exceeded: ${jsBytes} bytes`)

console.log(`Build integrity check passed (${required.length} required artifacts; ${(jsBytes / 1_000_000).toFixed(2)} MB JavaScript).`)
