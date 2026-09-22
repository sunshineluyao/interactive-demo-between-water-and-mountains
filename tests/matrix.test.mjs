import test from 'node:test'
import assert from 'node:assert/strict'
import { buildUploadedMatrix } from '../src/components/MountainAtlas.tsx'

test('import uses all usable site rows as denominator, with a common 0–100% scale', () => {
  const records = [
    { Site: 'A', 'Exterior Decoration': 'incised' },
    { Site: 'A', 'Exterior Decoration': 'incised' },
    { Site: 'A', 'Exterior Decoration': 'plain' },
    { Site: 'B', 'Exterior Decoration': 'plain' },
    { Site: 'B', 'Exterior Decoration': '' },
  ]
  const matrix = buildUploadedMatrix(records)
  assert.equal(matrix.recordCount, 4)
  const row = matrix.rows.find((entry) => entry.label === 'Site A')
  assert.equal(row.values[matrix.columns.indexOf('incised')], 2 / 3)
  assert.equal(row.values[matrix.columns.indexOf('plain')], 1 / 3)
})

test('omitted decoration categories do not silently change the denominator', () => {
  const records = Array.from({ length: 14 }, (_, index) => ({ Site: 'A', Decoration: `long decoration label ${index}` }))
  const matrix = buildUploadedMatrix(records)
  assert.equal(matrix.columns.length, 13)
  assert.ok(matrix.rows[0].values.every((value) => value === 1 / 14))
  assert.ok(Math.abs(matrix.rows[0].values.reduce((a, b) => a + b, 0) - 13 / 14) < 1e-10)
})

test('unrecognized columns and empty usable data produce actionable errors', () => {
  assert.throws(() => buildUploadedMatrix([{ unrelated: 1 }]), /site and exterior-decoration columns/)
  assert.throws(() => buildUploadedMatrix([{ Site: 'NaN', Decoration: 'x' }]), /No usable site and decoration pairs/)
})
