import { ArrowDownToLine, ArrowUpRight, FileSpreadsheet, Layers3, MountainSnow, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import type { MandaraData } from '../types'
import { CulturePeriodBook } from './CulturePeriodBook'
import { StatusTag } from './StatusTag'
import { readData } from '../lib/data'

type MatrixRow = { label: string; detail: string; values: number[] }
type Matrix = { columns: string[]; rows: MatrixRow[]; mode: 'qualitative' | 'uploaded'; recordCount: number }

const colors = ['#e0e8e9', '#c1d6dd', '#9ebfce', '#7eaabc', '#5d91a7', '#417e96', '#306f88', '#246279', '#185267', '#123f52']

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '')
}

function findColumn(keys: string[], candidates: string[]) {
  const normalized = keys.map((key) => ({ key, normalized: normalize(key) }))
  return normalized.find(({ normalized: name }) => candidates.some((candidate) => name.includes(candidate)))?.key
}

export function buildUploadedMatrix(records: Record<string, unknown>[]): Matrix {
  const keys = Object.keys(records[0] ?? {})
  const siteKey = findColumn(keys, ['sitenumber', 'siteid', 'site'])
  const decorationKey = findColumn(keys, ['exteriordecoration', 'decorationtype', 'decoration'])
  if (!siteKey || !decorationKey) {
    throw new Error(`Could not identify site and exterior-decoration columns. Found: ${keys.join(', ')}`)
  }

  const cleaned = records
    .map((record) => ({ site: String(record[siteKey] ?? '').trim(), decoration: String(record[decorationKey] ?? '').trim() }))
    .filter((record) => record.site && record.decoration && record.site.toLowerCase() !== 'nan' && record.decoration.toLowerCase() !== 'nan')
  if (!cleaned.length) throw new Error('No usable site and decoration pairs were found. Check the spreadsheet headers and values, then select the file again.')

  const decorationCounts = new Map<string, number>()
  const siteCounts = new Map<string, number>()
  const jointCounts = new Map<string, number>()
  for (const record of cleaned) {
    decorationCounts.set(record.decoration, (decorationCounts.get(record.decoration) ?? 0) + 1)
    siteCounts.set(record.site, (siteCounts.get(record.site) ?? 0) + 1)
    const key = `${record.site}\u0000${record.decoration}`
    jointCounts.set(key, (jointCounts.get(key) ?? 0) + 1)
  }
  const columns = [...decorationCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 13).map(([name]) => name)
  const sites = [...siteCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 11)
  const rows = sites.map(([site, total]) => {
    const values = columns.map((decoration) => (jointCounts.get(`${site}\u0000${decoration}`) ?? 0) / total)
    return { label: `Site ${site}`, detail: `${total.toLocaleString()} imported rows`, values }
  })
  return { columns, rows, mode: 'uploaded', recordCount: cleaned.length }
}

export function MountainAtlas() {
  const [data, setData] = useState<MandaraData | null>(null)
  const [matrix, setMatrix] = useState<Matrix | null>(null)
  const [selectedCell, setSelectedCell] = useState<{ row: string; column: string; value: number } | null>(null)
  const [uploadStatus, setUploadStatus] = useState('')
  const [loadError, setLoadError] = useState('')
  const [retry, setRetry] = useState(0)
  const [importing, setImporting] = useState(false)

  useEffect(() => {
    setLoadError('')
    readData<MandaraData>('/data/mandara-teaching.json')
      .then((result: MandaraData) => {
        setData(result)
        setMatrix({
          columns: result.culture_periods,
          rows: result.signatures.map((signature) => ({ label: signature.group, detail: signature.sites, values: signature.values })),
          mode: 'qualitative',
          recordCount: result.reported_scale.cleaned_potsherds,
        })
      })
      .catch(() => setLoadError('The Mandara teaching layer could not load. Try again to reopen the bundled data.'))
  }, [retry])

  const handleUpload = async (file?: File) => {
    if (!file) return
    setImporting(true)
    setUploadStatus('Reading the spreadsheet locally…')
    try {
      const { readSheet } = await import('read-excel-file/browser')
      const rows = await readSheet(file)
      const [headers, ...body] = rows
      const records = body.map((row) => Object.fromEntries(headers.map((header, index) => [String(header ?? ''), row[index] ?? ''])))
      const uploaded = buildUploadedMatrix(records)
      setMatrix(uploaded)
      setSelectedCell(null)
      setUploadStatus(`${uploaded.recordCount.toLocaleString()} usable rows loaded. Nothing left this browser.`)
    } catch (error) {
      setUploadStatus(error instanceof Error ? error.message : 'The spreadsheet could not be read.')
    } finally {
      setImporting(false)
    }
  }

  const resetTeachingView = () => {
    if (!data) return
    setMatrix({
      columns: data.culture_periods,
      rows: data.signatures.map((signature) => ({ label: signature.group, detail: signature.sites, values: signature.values })),
      mode: 'qualitative',
      recordCount: data.reported_scale.cleaned_potsherds,
    })
    setSelectedCell(null)
    setUploadStatus('Restored the paper-derived teaching layer.')
  }

  const maxLabels = matrix?.columns.length ?? 1
  const cellWidth = Math.max(38, 660 / maxLabels)
  const viewWidth = 178 + cellWidth * maxLabels
  const viewHeight = 78 + (matrix?.rows.length ?? 1) * 54
  const metrics = useMemo(() => {
    if (!data) return []
    return [
      ['Cleaned sherds', data.reported_scale.cleaned_potsherds],
      ['Sites', data.reported_scale.sites],
      ['Levels', data.reported_scale.levels],
      ['Decorations', data.reported_scale.decoration_types],
    ]
  }, [data])

  return (
    <section id="mountain" className="chapter mountain-chapter" data-chapter>
      <div className="chapter-heading split-heading">
        <div>
          <h2>What remains<br />in the fragments?</h2>
        </div>
        <p>
          The default matrix visualizes only claims reported in the paper. To inspect the row-level record, download
          the official tDAR file and drop it here; parsing stays inside your browser.
        </p>
      </div>

      <figure className="mountain-panorama"><img src="/images/rhumsiki.webp" alt="A panorama of Rhumsiki peak and the surrounding Mandara landscape." width="1800" height="475" loading="lazy" /><figcaption>Rhumsiki, Cameroon. A view of the wider region, not an excavated site. <a href="#photo-credits">Photo credit</a></figcaption></figure>
      {loadError && <div className="load-error" role="alert"><p>{loadError}</p><button onClick={() => setRetry((value) => value + 1)}>Try loading again</button></div>}
      <CulturePeriodBook data={data} />

      <div className="mountain-stage">
        <div className="culture-panel">
          <div className="culture-toolbar">
            <div>
              <StatusTag status={matrix?.mode === 'uploaded' ? 'derived' : 'interpretive'}>
                {matrix?.mode === 'uploaded' ? 'Derived from your local file' : 'Paper-derived teaching layer'}
              </StatusTag>
              <p>{matrix?.mode === 'uploaded' ? 'Share of imported records within each site. Up to 13 decorations and 11 sites, ranked by count.' : 'A qualitative summary of reported latent pattern signatures. CP labels are identifiers; these colors are not sherd counts or probabilities.'}</p>
            </div>
            <button type="button" className="reset-matrix" onClick={resetTeachingView} disabled={matrix?.mode !== 'uploaded'}>
              Reset teaching view
            </button>
          </div>

          {matrix ? (
            <div className="matrix-scroll" tabIndex={0} aria-label="Scrollable culture signature matrix">
              <svg className="culture-matrix" viewBox={`0 0 ${viewWidth} ${viewHeight}`} style={{ minWidth: `${viewWidth}px` }} role="group" aria-label={matrix.mode === 'uploaded' ? 'Site by exterior decoration, proportions of imported rows' : 'Qualitative culture-period signature matrix'}>
                <defs>
                  <linearGradient id="matrixLegend">
                    {colors.map((color, index) => <stop key={color} offset={`${(index / (colors.length - 1)) * 100}%`} stopColor={color} />)}
                  </linearGradient>
                </defs>
                {matrix.columns.map((column, index) => (
                  <text key={column} x={178 + index * cellWidth + cellWidth / 2} y="42" textAnchor="middle" className="matrix-column"><title>{matrix.mode === 'uploaded' ? column : `Culture-period model pattern ${column}; identifier, not chronology`}</title>{matrix.mode === 'uploaded' ? `D${index + 1}` : column}</text>
                ))}
                {matrix.rows.map((row, rowIndex) => (
                  <g key={row.label} transform={`translate(0, ${62 + rowIndex * 54})`}>
                    <text x="0" y="15" className="matrix-row-label"><title>{row.label}</title>{row.label.length > 20 ? `${row.label.slice(0, 18)}…` : row.label}</text>
                    <text x="0" y="35" className="matrix-row-detail">{row.detail}</text>
                    {row.values.map((value, columnIndex) => {
                      const colorIndex = Math.round(value * (colors.length - 1))
                      const column = matrix.columns[columnIndex]
                      return (
                        <rect
                          key={column}
                          x={178 + columnIndex * cellWidth + 2}
                          y="0"
                          width={cellWidth - 4}
                          height="42"
                          rx="3"
                          fill={value === 0 ? '#e0e8e9' : colors[colorIndex]}
                          tabIndex={0}
                          role="button"
                          aria-label={`${row.label}, ${matrix.mode === 'uploaded' ? column : `culture-period model pattern ${column}`}: ${matrix.mode === 'uploaded' ? `${(value * 100).toFixed(1)} percent of imported site records` : value === 1 ? 'dominant reported' : value > 0 ? 'smaller reported' : 'not asserted in this summary'}`}
                          onClick={() => setSelectedCell({ row: row.label, column, value })}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setSelectedCell({ row: row.label, column, value }) }
                          }}
                        />
                      )
                    })}
                  </g>
                ))}
              </svg>
            </div>
          ) : !loadError && <div className="matrix-loading" role="status">Preparing the culture painting…</div>}
          <div className="matrix-legend">{matrix?.mode === 'uploaded' ? <><span>0%</span><i className="proportion-scale" /><span>100% of a site’s imported records</span></> : <><span><i style={{ background: colors[9] }} />Dominant reported</span><span><i style={{ background: colors[3] }} />Smaller reported</span><span><i style={{ background: colors[0] }} />Not asserted</span></>}</div>
          {matrix?.mode === 'uploaded' && <details className="decoration-key"><summary>Full decoration and site labels</summary><dl>{matrix.columns.map((column, index) => <div key={column}><dt>D{index + 1}</dt><dd>{column}</dd></div>)}</dl><ul>{matrix.rows.map((row) => <li key={row.label}>{row.label} · {row.detail}</li>)}</ul></details>}

          <div className="matrix-reading">
            <Layers3 aria-hidden="true" />
            {selectedCell ? (
              <p><strong>{selectedCell.row} · {selectedCell.column}</strong><br />{matrix?.mode === 'uploaded' ? `${(selectedCell.value * 100).toFixed(1)}% of this site's usable imported rows. This is a frequency, not a model probability.` : `${selectedCell.column} is an inferred decoration-pattern identifier—not a people, date, rank, or chapter. ${selectedCell.value === 1 ? 'It is reported as dominant in the paper-derived summary.' : selectedCell.value > 0 ? 'It is reported as a smaller signature in the paper-derived summary.' : 'This teaching summary makes no positive assertion here. It does not establish absence.'}`}</p>
            ) : (
              <p><strong>Select a cell.</strong><br />The matrix will explain what the color is—and what it is not.</p>
            )}
          </div>
        </div>

        <aside className="mountain-console">
          <p className="data-caption">Scale reported in the paper</p><div className="metric-grid">
            {metrics.map(([label, value]) => (
              <div key={String(label)}><strong>{Number(value).toLocaleString()}</strong><span>{label}</span></div>
            ))}
          </div>

          <div className="import-panel">
            <div className="console-title"><FileSpreadsheet aria-hidden="true" /><span>Open the official record</span></div>
          <p>Download the translated XLSX from tDAR, then load it here. The app aggregates site × exterior decoration locally.</p>
            <div className="import-actions">
              <a href={data?.metadata.download_xlsx} target="_blank" rel="noreferrer">
                <ArrowDownToLine aria-hidden="true" /> Download data
              </a>
              <label>
                <FileSpreadsheet aria-hidden="true" /> Load local file
                <input type="file" accept=".xlsx" disabled={importing} onChange={(event) => { handleUpload(event.target.files?.[0]); event.target.value = '' }} />
              </label>
            </div>
            {uploadStatus ? <output className="upload-status" role="status">{uploadStatus}</output> : null}
            <small><ShieldCheck aria-hidden="true" /> Client-side only. No upload endpoint exists.</small>
          </div>

          <div className="source-links">
            <a href={data?.metadata.paper_url} target="_blank" rel="noreferrer">Read the paper <ArrowUpRight aria-hidden="true" /></a>
            <a href={data?.metadata.dataset_doi} target="_blank" rel="noreferrer">Open dataset DOI <ArrowUpRight aria-hidden="true" /></a>
            <a href={data?.metadata.code_url} target="_blank" rel="noreferrer">Inspect R code record <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </aside>
      </div>

      <details className="stratigraphy-story"><summary>Read five excavation sequences from the paper</summary>
        <div className="story-intro">
          <MountainSnow aria-hidden="true" />
          <span>Site 642 · reported sequences</span>
          <p>Five excavation-unit stories from the paper, kept qualitative where the publication is qualitative.</p>
        </div>
        <div className="sequence-river">
          {data?.site_642_sequences.map((item, index) => (
            <article key={item.units}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.units}</h3>
              <p>{item.sequence.join(' → ')}</p>
            </article>
          ))}
        </div>
      </details>

      <div className="method-strip mountain-method">
        <span>Data</span><p>site × unit × 10 cm level × decoration</p>
        <span>Idiom</span><p>culture painting + sequence annotation</p>
        <span>Check</span><p>Can a viewer distinguish observed rows, model output and our summary?</p>
      </div>
      <a className="chapter-forward" href="#bridge">Bring the two places into conversation <ArrowUpRight aria-hidden="true" /></a>
    </section>
  )
}
