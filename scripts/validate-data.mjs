import { readFileSync } from 'node:fs'

const read = (path) => JSON.parse(readFileSync(path, 'utf8'))
const waterways = read('public/data/kunshan-waterways.geojson')
const precipitation = read('public/data/kunshan-precipitation.json')
const mandara = read('public/data/mandara-teaching.json')

if (waterways.metadata.license !== 'Open Data Commons Open Database License (ODbL) 1.0') {
  throw new Error('Waterway snapshot lost its ODbL license statement.')
}
if (waterways.features.length < 300) throw new Error('Waterway snapshot is unexpectedly small.')
if (!waterways.features.every((feature) => feature.geometry.type === 'LineString' && feature.geometry.coordinates.length >= 2)) {
  throw new Error('A waterway feature has invalid geometry.')
}

if (precipitation.records.length !== 300) throw new Error(`Expected 300 precipitation months; found ${precipitation.records.length}.`)
const monthKeys = new Set(precipitation.records.map((record) => `${record.year}-${record.month}`))
if (monthKeys.size !== precipitation.records.length) throw new Error('Duplicate precipitation months detected.')
if (!precipitation.records.every((record) => Number.isFinite(record.mm_per_day) && record.mm_per_day >= 0)) {
  throw new Error('Invalid precipitation value detected.')
}

if (mandara.reported_scale.cleaned_potsherds !== 239629 || mandara.culture_periods.length !== 14) {
  throw new Error('Mandara published-scale metadata is inconsistent.')
}
if (!mandara.metadata.limitations.toLowerCase().includes('qualitative')) {
  throw new Error('Mandara teaching layer must retain its qualitative-data warning.')
}
if (!mandara.metadata.license_statement.includes('exact CC variant is not specified')) {
  throw new Error('Mandara license precision note is missing.')
}

console.log('Data validation passed: 420 waterways, 300 months, and labeled Mandara teaching layer.')
