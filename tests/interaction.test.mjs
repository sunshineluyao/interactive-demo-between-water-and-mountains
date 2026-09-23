import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { JSDOM } from 'jsdom'

// DOM interaction tests. These do not render CSS or replace browser acceptance.
const dom = new JSDOM('<!doctype html><div id="root"></div>', { url: 'https://atlas.test', pretendToBeVisual: true })
const { window } = dom
for (const name of ['window', 'document', 'HTMLElement', 'SVGElement', 'Element', 'Node', 'Event', 'MouseEvent', 'KeyboardEvent', 'localStorage']) globalThis[name] = name === 'window' ? window : window[name]
Object.defineProperty(globalThis, 'navigator', { value: window.navigator, configurable: true })
globalThis.IS_REACT_ACT_ENVIRONMENT = true
window.matchMedia = () => ({ matches: true, addEventListener() {}, removeEventListener() {} })
globalThis.IntersectionObserver = class { observe() {} disconnect() {} }
const snapshots = Object.fromEntries(['kunshan-waterways.geojson', 'kunshan-precipitation.json', 'mandara-teaching.json'].map((name) => [`/data/${name}`, JSON.parse(readFileSync(new URL(`../public/data/${name}`, import.meta.url), 'utf8'))]))
window.__ATLAS_SNAPSHOTS__ = snapshots
let clipboard = ''
Object.defineProperty(navigator, 'clipboard', { value: { writeText: async (text) => { clipboard = text } }, configurable: true })
let downloadName = ''
window.HTMLAnchorElement.prototype.click = function () { downloadName = this.download }
globalThis.URL.createObjectURL = () => 'blob:test'
globalThis.URL.revokeObjectURL = () => {}

const { createElement, act } = await import('react')
const { createRoot } = await import('react-dom/client')
const { default: App } = await import('../src/App.tsx')
let root = createRoot(document.getElementById('root'))
const mount = async () => { await act(async () => root.render(createElement(App))) }
const textButton = (text, parent = document) => {
  const result = [...parent.querySelectorAll('button')].find((item) => item.textContent.trim().includes(text))
  assert.ok(result, `Button exists: ${text}`)
  return result
}
const click = async (element) => { await act(async () => element.dispatchEvent(new window.MouseEvent('click', { bubbles: true }))) }
const fill = async (element, value) => {
  assert.ok(element)
  const prototype = element.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : element.tagName === 'SELECT' ? window.HTMLSelectElement.prototype : window.HTMLInputElement.prototype
  await act(async () => {
    Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, value)
    element.dispatchEvent(new window.Event(element.tagName === 'SELECT' ? 'change' : 'input', { bubbles: true }))
  })
}

test('source inspection is intentional, and chapter navigation closes with Escape', async () => {
  await mount()
  await click(textButton('Explore'))
  assert.equal(document.querySelectorAll('#chapter-contents a').length, 10)
  await act(async () => document.querySelector('#chapter-contents').dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })))
  assert.equal(document.querySelector('#chapter-contents'), null)
  assert.match(document.activeElement.textContent.trim(), /^Explore/)
  const source = document.querySelector('#source-detail a')
  await click(source)
  assert.deepEqual(JSON.parse(localStorage.getItem('atlas-inspected-v2')), [])
  await click(textButton('I inspected this source'))
  assert.deepEqual(JSON.parse(localStorage.getItem('atlas-inspected-v2')), [0])
  await click(textButton('Archaeological ceramics', document.querySelector('.source-index')))
  assert.equal(document.querySelector('#source-detail a').href, 'https://core.tdar.org/dataset/400758/ceramic-dataset')
})

test('the opening orients both places, translates the quote, and makes source layers learnable', async () => {
  const orientation = document.querySelector('#orientation')
  const questions = document.querySelector('#questions')
  const tutorial = document.querySelector('#tutorial')
  assert.ok(orientation && questions && tutorial)
  assert.equal(orientation.compareDocumentPosition(questions) & window.Node.DOCUMENT_POSITION_FOLLOWING, window.Node.DOCUMENT_POSITION_FOLLOWING)
  assert.equal(questions.compareDocumentPosition(tutorial) & window.Node.DOCUMENT_POSITION_FOLLOWING, window.Node.DOCUMENT_POSITION_FOLLOWING)
  assert.match(orientation.textContent, /Kunshan.*昆山/s)
  assert.match(orientation.textContent, /Mandara Mountains.*曼达拉山脉/s)
  assert.match(orientation.textContent, /Zhì zhě yào shuǐ/)
  assert.match(orientation.textContent, /commonly numbered 6\.23.*六之二一/s)
  assert.match(orientation.textContent, /The wise delight in water/)
  assert.equal(orientation.querySelector('.bilingual-quote a').href, 'https://zh.wikisource.org/wiki/%E8%AB%96%E8%AA%9E/%E9%9B%8D%E4%B9%9F%E7%AC%AC%E5%85%AD')
  assert.equal(orientation.querySelectorAll('[aria-label^="Choose a place view"] button').length, 3)
  assert.equal(orientation.querySelectorAll('[aria-label^="Choose a data source layer"] button').length, 3)
  assert.equal(orientation.querySelectorAll('.globe-direct-controls button').length, 3)
  assert.equal(orientation.querySelectorAll('.tour-progress i').length, 5)
  await click(orientation.querySelector('button[aria-label^="Next guided step"]'))
  assert.match(orientation.querySelector('.globe-tour h2').textContent, /Read mapped context/)
  await click(textButton('Climate', orientation))
  assert.match(orientation.querySelector('.source-layer-reading').textContent, /300 monthly means/)
  await click(textButton('Material history', orientation))
  assert.match(orientation.querySelector('.source-layer-reading').textContent, /239,629 sherds.*14 primary inferred patterns/s)
})

test('the complete interface can switch among English, Chinese, and bilingual reading modes', async () => {
  await click(textButton('中文', document.querySelector('.language-control')))
  assert.equal(document.documentElement.lang, 'zh-CN')
  assert.match(document.querySelector('#orientation h1').textContent, /两个地方.*一个审慎的问题/s)
  assert.doesNotMatch(document.querySelector('#orientation h1').textContent, /Two places/)
  assert.match(document.querySelector('#questions').textContent, /从人出发/)

  await click(textButton('EN', document.querySelector('.language-control')))
  assert.equal(document.documentElement.lang, 'en')
  assert.match(document.querySelector('#orientation h1').textContent, /Two places.*One careful question/s)
  assert.doesNotMatch(document.querySelector('#orientation h1').textContent, /两个地方/)

  await click(textButton('双语', document.querySelector('.language-control')))
  assert.match(document.querySelector('#orientation h1').textContent, /Two places.*两个地方/s)
  assert.equal(localStorage.getItem('atlas-language-v1'), 'bilingual')
})

test('tutorial names each interaction and exposes an accessible before-and-after slider', async () => {
  const tutorial = document.querySelector('#tutorial')
  assert.ok(tutorial)
  assert.equal(tutorial.querySelectorAll('.pattern-index button').length, 6)
  const slider = tutorial.querySelector('.before-after input[type="range"]')
  assert.ok(slider)
  assert.equal(slider.getAttribute('min'), '0')
  assert.equal(slider.getAttribute('max'), '100')
  assert.deepEqual([...tutorial.querySelectorAll('.interaction-script dt')].map((item) => item.textContent.split(' · ')[0]), ['Action', 'System response', 'Evidence', 'Reset + access'])
  await click(textButton('Change parameters', tutorial))
  assert.match(tutorial.querySelector('.pattern-stage h3').textContent, /Change parameters without losing context/)
  assert.match(tutorial.querySelector('.comparison-captions').textContent, /A chosen month links the control, reading, and chart/)
  assert.equal(document.querySelectorAll('.textbook-rail figure').length, 5)
  assert.equal(document.querySelectorAll('.research-theatre>nav button').length, 6)
  await click(textButton('Data Formulator', document.querySelector('.research-theatre>nav')))
  assert.match(document.querySelector('.research-theatre>article').textContent, /mixed-initiative precedent/i)
})

test('the designer tree limits each layer to three choices and changes its recommendation', async () => {
  const tree = document.querySelector('.decision-tree')
  assert.ok(tree)
  assert.equal(tree.querySelectorAll('fieldset').length, 4)
  for (const layer of tree.querySelectorAll('fieldset')) assert.equal(layer.querySelectorAll('button').length, 3)
  await click(textButton('Filter + change', tree))
  assert.match(tree.querySelector('.decision-output h4').textContent, /Parameter change/)
  assert.match(tree.querySelector('.next-test').textContent, /what changed.*what stayed fixed/i)
  await click(textButton('Community + qualitative', tree))
  assert.match(tree.querySelector('.decision-output').textContent, /whose account is present/i)
})

test('the embedded Colab guide links to an executable, versioned notebook', async () => {
  const guide = document.querySelector('.colab-companion')
  assert.ok(guide)
  assert.equal(guide.querySelectorAll('.notebook-embed>nav button').length, 8)
  await click(textButton('Coordinate', guide))
  assert.match(guide.querySelector('.notebook-embed>article').textContent, /Brush an overview/)
  const colab = [...guide.querySelectorAll('a')].find((link) => link.textContent.includes('Open executable'))
  assert.match(colab.href, /colab\.research\.google\.com\/github\/sunshineluyao\/interactive-demo-between-water-and-mountains/)
  const download = [...guide.querySelectorAll('a')].find((link) => link.textContent.includes('Download .ipynb'))
  assert.equal(download.href, 'https://atlas.test/notebooks/INFOSCI301_Interaction_Design_Companion.ipynb')
  assert.equal(download.download, 'INFOSCI301_Interaction_Design_Companion.ipynb')
})

test('the color studio compares accessible palettes and links to its executable notebook', async () => {
  const studio = document.querySelector('.color-palette-studio')
  assert.ok(studio)
  assert.equal(studio.querySelectorAll('.family-buttons button').length, 3)
  assert.equal(studio.querySelectorAll('.palette-gallery-grid>a').length, 6)
  assert.equal(studio.querySelectorAll('.palette-integrations article').length, 3)
  assert.equal(studio.querySelectorAll('.standards-crosswalk tbody tr').length, 7)

  const tokensBefore = [...studio.querySelectorAll('.palette-token-row code')].map((token) => token.textContent)
  await click(textButton('Qualitative', studio))
  await fill(studio.querySelector('input[aria-label^="Base hue"]'), '318')
  const tokensAfter = [...studio.querySelectorAll('.palette-token-row code')].map((token) => token.textContent)
  assert.notDeepEqual(tokensAfter, tokensBefore)

  await fill(studio.querySelector('input[aria-label^="Compare before and after palettes"]'), '82')
  assert.match(studio.querySelector('.comparison-designed').getAttribute('style'), /18%/)
  await fill(studio.querySelector('select[aria-label^="Vision preview"]'), 'grayscale')
  assert.match(studio.querySelector('.vision-badge').textContent, /Grayscale/)

  const colab = [...studio.querySelectorAll('a')].find((link) => link.textContent.includes('Open color notebook'))
  assert.match(colab.href, /colab\.research\.google\.com\/github\/sunshineluyao\/interactive-demo-between-water-and-mountains/)
  const download = [...studio.querySelectorAll('a')].find((link) => link.textContent.includes('Download color'))
  assert.equal(download.href, 'https://atlas.test/notebooks/INFOSCI301_Color_Palette_Accessibility_Studio.ipynb')
  assert.equal(download.download, 'INFOSCI301_Color_Palette_Accessibility_Studio.ipynb')
})

test('the website carries complete APA-style references and data credits', async () => {
  const references = document.querySelector('#references')
  assert.ok(references)
  for (const authorLine of [
    'Satyanarayan, A., Moritz, D., Wongsuphasawat, K., & Heer, J.',
    'Kim, N. W., Henry Riche, N., Bach, B., Xu, G., Brehmer, M., Hinckley, K., Pahud, M., Xia, H., McGuffin, M. J., & Pfister, H.',
    'Wang, C., Feng, Y., Bodik, R., Dillig, I., Cheung, A., & Ko, A. J.',
    'O’Brien, J. D., Lin, K., & MacEachern, S.',
    'OpenStreetMap contributors.',
    'National Aeronautics and Space Administration Langley Research Center',
    'Harrower, M., & Brewer, C. A.',
    'Gramazio, C. C., Laidlaw, D. H., & Schloss, K. B.',
  ]) assert.ok(references.textContent.includes(authorLine), `Visible reference includes: ${authorLine}`)
  assert.equal(references.querySelectorAll('a[href^="https://doi.org/"]').length >= 6, true)
})

test('water controls update real records while channel geometry remains unchanged', async () => {
  const linesBefore = [...document.querySelectorAll('.water-line')].map((element) => element.getAttribute('d'))
  assert.equal(linesBefore.length, 420)
  assert.match(document.querySelector('.rain-reading').textContent, /11.24/)
  await click(document.querySelector('button[aria-label^="Next month"]'))
  const july = snapshots['/data/kunshan-precipitation.json'].records.find((record) => record.year === 2025 && record.month === 7)
  assert.match(document.querySelector('.rain-reading').textContent, new RegExp(july.mm_per_day.toFixed(2)))
  assert.deepEqual([...document.querySelectorAll('.water-line')].map((element) => element.getAttribute('d')), linesBefore)
  assert.equal(textButton('Play timeline').disabled, true)
  const feature = snapshots['/data/kunshan-waterways.geojson'].features[7]
  await fill(document.querySelector('#waterway-select'), String(feature.id))
  assert.equal(document.querySelector('.channel-select a').href, feature.properties.source_url)
})

test('qualitative matrix describes missing assertions without inventing zero counts', async () => {
  const cell = document.querySelector('.culture-matrix rect[aria-label*="not asserted"]')
  assert.ok(cell)
  await click(cell)
  assert.match(document.querySelector('.matrix-reading').textContent, /does not establish absence/)
  assert.match(document.querySelector('.culture-toolbar').textContent, /not sherd counts or probabilities/)
})

test('the culture-period book explains CP labels before the matrix and supports page turning', async () => {
  const explainer = document.querySelector('.cp-explainer')
  assert.ok(explainer)
  assert.match(explainer.textContent, /CP is a model pattern.*not a people/s)
  assert.equal(explainer.querySelectorAll('.cp-book-controls>div button').length, 6)
  assert.equal(explainer.querySelectorAll('.cp-picker>div button').length, 14)
  await click(textButton('Next page', explainer))
  assert.match(explainer.querySelector('.cp-page h4').textContent, /What does the model do/)
  await click(textButton('CP14', explainer))
  assert.match(explainer.querySelector('.cp-picker>article').textContent, /Neolithic sites 618 and 756/)
  await click(explainer.querySelector('.cp-glossary summary'))
  assert.equal(explainer.querySelectorAll('.cp-glossary dt').length, 12)
  assert.match(explainer.querySelector('.cp-glossary').textContent, /Taphonomy/)
})

test('comparison lenses and field notes carry into the team post', async () => {
  await click(textButton('Missing voices'))
  assert.match(document.querySelector('.landscape-pair').textContent, /Whose experience/)
  const fields = document.querySelectorAll('.notebook-pages textarea')
  await fill(fields[0], 'Observed: a named canal in Zhouzhuang.')
  await fill(fields[1], 'An interpretation to check with a resident.')
  await fill(fields[2], 'Which routes matter to you?')
  assert.equal(JSON.parse(localStorage.getItem('atlas-field-notes-v2')).question, 'Which routes matter to you?')
  await click(textButton('Bring in my field note'))
  assert.match(document.querySelector('.post-preview pre').textContent, /Which routes matter to you/)
  await click(textButton('Copy for Ed Discussion'))
  assert.match(clipboard, /Observed: a named canal/)
  assert.match(clipboard, /Data sources/)
})

test('validation notes persist on remount and clipboard failure has a download fallback', async () => {
  await fill(document.querySelector('.evidence-entry textarea'), 'A peer identified the missing community voice.')
  await click(textButton('Record as checked'))
  assert.deepEqual(JSON.parse(localStorage.getItem('atlas-validation-checks-v2')), ['domain'])
  await act(async () => root.unmount())
  root = createRoot(document.getElementById('root'))
  await mount()
  assert.equal(document.querySelector('.evidence-entry textarea').value, 'A peer identified the missing community voice.')
  assert.match(document.querySelector('.validation-export').textContent, /1\/4/)
  navigator.clipboard.writeText = async () => { throw new Error('Clipboard blocked') }
  await click(textButton('Copy for Ed Discussion'))
  assert.equal(downloadName, 'infosci301-team-claim.md')
  assert.match(document.querySelector('.claim-builder [role="status"]').textContent, /Clipboard unavailable/)
})

test('failed snapshot requests expose retry controls and recover', async () => {
  await act(async () => root.unmount())
  window.__ATLAS_SNAPSHOTS__ = {}
  globalThis.fetch = async () => ({ ok: false, status: 503 })
  root = createRoot(document.getElementById('root'))
  await mount()
  assert.equal(document.querySelectorAll('.load-error').length, 2)
  window.__ATLAS_SNAPSHOTS__ = snapshots
  await click(textButton('Try loading again', document.querySelector('#water')))
  await click(textButton('Try loading again', document.querySelector('#mountain')))
  assert.equal(document.querySelectorAll('.load-error').length, 0)
  assert.equal(document.querySelectorAll('.water-line').length, 420)
  await act(async () => root.unmount())
})

test('damaged saved drafts recover without blanking the application', async () => {
  localStorage.setItem('atlas-inspected-v2', 'null')
  localStorage.setItem('atlas-validation-checks-v2', '{}')
  localStorage.setItem('atlas-field-notes-v2', '{"observation":42}')
  localStorage.setItem('atlas-validation-notes-v2', '{"domain":false}')
  localStorage.setItem('atlas-team-claim-v2', '[]')
  root = createRoot(document.getElementById('root'))
  await mount()
  assert.equal(document.querySelectorAll('.water-line').length, 420)
  assert.equal(document.querySelector('.notebook-pages textarea').value, '')
  assert.equal(document.querySelector('.evidence-entry textarea').value, '')
  assert.deepEqual(JSON.parse(localStorage.getItem('atlas-inspected-v2')), [])
  assert.match(document.querySelector('.motion-control').getAttribute('aria-label'), /^Enable motion/)
  await act(async () => root.unmount())
  dom.window.close()
})
