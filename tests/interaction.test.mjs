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
  assert.equal(document.querySelectorAll('#chapter-contents a').length, 8)
  await act(async () => document.querySelector('#chapter-contents').dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })))
  assert.equal(document.querySelector('#chapter-contents'), null)
  assert.equal(document.activeElement.textContent.trim(), 'Explore')
  const source = document.querySelector('#source-detail a')
  await click(source)
  assert.deepEqual(JSON.parse(localStorage.getItem('atlas-inspected-v2')), [])
  await click(textButton('I inspected this source'))
  assert.deepEqual(JSON.parse(localStorage.getItem('atlas-inspected-v2')), [0])
  await click(textButton('Archaeological ceramics', document.querySelector('.source-index')))
  assert.equal(document.querySelector('#source-detail a').href, 'https://core.tdar.org/dataset/400758/ceramic-dataset')
})

test('tutorial names each interaction and exposes an accessible before-and-after slider', async () => {
  const tutorial = document.querySelector('#tutorial')
  assert.ok(tutorial)
  assert.equal(tutorial.querySelectorAll('.pattern-index button').length, 6)
  const slider = tutorial.querySelector('.before-after input[type="range"]')
  assert.ok(slider)
  assert.equal(slider.getAttribute('min'), '0')
  assert.equal(slider.getAttribute('max'), '100')
  assert.deepEqual([...tutorial.querySelectorAll('.interaction-script dt')].map((item) => item.textContent), ['Action', 'System response', 'Evidence', 'Reset + access'])
  await click(textButton('Change parameters', tutorial))
  assert.match(tutorial.querySelector('.pattern-stage h3').textContent, /Change parameters without losing context/)
  assert.match(tutorial.querySelector('.comparison-captions').textContent, /A chosen month links the control, reading, and chart/)
  assert.equal(document.querySelectorAll('.textbook-rail figure').length, 5)
  assert.equal(document.querySelectorAll('.research-grid article').length, 6)
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
  ]) assert.ok(references.textContent.includes(authorLine), `Visible reference includes: ${authorLine}`)
  assert.equal(references.querySelectorAll('a[href^="https://doi.org/"]').length >= 6, true)
})

test('water controls update real records while channel geometry remains unchanged', async () => {
  const linesBefore = [...document.querySelectorAll('.water-line')].map((element) => element.getAttribute('d'))
  assert.equal(linesBefore.length, 420)
  assert.match(document.querySelector('.rain-reading').textContent, /11.24/)
  await click(document.querySelector('button[aria-label="Next month"]'))
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
  assert.equal(document.querySelector('.motion-control').getAttribute('aria-label'), 'Enable motion')
  await act(async () => root.unmount())
  dom.window.close()
})
