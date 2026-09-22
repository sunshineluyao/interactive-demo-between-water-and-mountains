import { ArrowRight, ArrowUpRight, Check, Database, Droplets, Mountain, ScrollText } from 'lucide-react'
import { useState } from 'react'
import { StatusTag } from './StatusTag'
import { useDraft } from '../lib/drafts'

const sources = [
  {
    icon: Droplets,
    eyebrow: 'Spatial · Kunshan',
    title: 'Mapped waterways',
    body: 'A dated, simplified extract of rivers, canals and streams in the Kunshan–Jinxi–Zhouzhuang area.',
    detail: '420 OSM ways · bundled teaching snapshot',
    source: 'Inspect OpenStreetMap',
    href: 'https://www.openstreetmap.org/#map=11/31.27/120.94',
    license: 'ODbL 1.0 · © OpenStreetMap contributors',
    sample: 'waterway = river · geometry = LineString · name / local name when mapped',
    boundary: 'Locates mapped channels. It does not measure flow, water quality, access or community meaning.',
    task: 'Open the map and identify one mapped feature you could verify locally.',
    status: 'observed' as const,
  },
  {
    icon: Database,
    eyebrow: 'Temporal · Kunshan',
    title: 'Monthly precipitation',
    body: 'NASA POWER corrected precipitation at a point near Kunshan, drawn from MERRA‑2 at native source resolution.',
    detail: '300 months · 2001–2025 · mm/day',
    source: 'Open the NASA API response',
    href: 'https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=PRECTOTCORR&community=AG&longitude=120.98&latitude=31.39&start=2001&end=2025&format=JSON',
    license: 'Free global access · cite NASA POWER',
    sample: 'year = 2025 · month = 06 · PRECTOTCORR = 11.24 mm/day',
    boundary: 'Supports coarse temporal comparison at one modeled grid point—not neighborhood flooding or river discharge.',
    task: 'Open the JSON and find the value, unit and coordinates used in the atlas.',
    status: 'observed' as const,
  },
  {
    icon: Mountain,
    eyebrow: 'Space + depth · Mandara',
    title: 'Archaeological ceramics',
    body: 'Cleaned pottery observations from the Mandara region south of Lake Chad, indexed by site, unit, level and decoration.',
    detail: '239,629 cleaned sherds · 11 sites · 34 levels',
    source: 'Inspect the tDAR record',
    href: 'https://core.tdar.org/dataset/400758/ceramic-dataset',
    license: 'Creative Commons, as stated in the paper. See the tDAR record for attribution and terms.',
    sample: 'site × excavation unit × 10 cm level × exterior decoration',
    boundary: 'Supports archaeological pattern analysis. It cannot stand in for living Mandara communities or contemporary identity.',
    task: 'Open the tDAR record and locate the data description, creator and downloadable file.',
    status: 'observed' as const,
  },
  {
    icon: ScrollText,
    eyebrow: 'Interpretation · course lens',
    title: '“Water / mountain” pairing',
    body: 'An instructor-created bridge inspired by the Analects. It frames questions; it does not assign cultural meaning to either community.',
    detail: '知者樂水，仁者樂山',
    source: 'Read the original passage',
    href: 'https://zh.wikisource.org/wiki/%E8%AB%96%E8%AA%9E/%E9%9B%8D%E4%B9%9F%E7%AC%AC%E5%85%AD',
    license: 'Interpretive prompt · not an empirical variable',
    sample: '知者樂水，仁者樂山 · Analects 6.23',
    boundary: 'A question-making lens only. It is not a label, measurement or causal explanation for either place.',
    task: 'Read the passage, then write one question it opens without turning the metaphor into evidence.',
    status: 'interpretive' as const,
  },
]

export function EvidenceShelf() {
  const [active, setActive] = useState(0)
  const [inspected, setInspected] = useDraft<number[]>('atlas-inspected-v2', [], (value) => Array.isArray(value) && value.every((item) => Number.isInteger(item) && item >= 0 && item < sources.length) && new Set(value).size === value.length)
  const source = sources[active]
  const Icon = source.icon

  const markInspected = () => {
    setInspected((current) => current.includes(active) ? current.filter((item) => item !== active) : [...current, active])
  }

  return (
    <section id="evidence" className="chapter evidence-chapter" data-chapter>
      <div className="chapter-heading">
        <h2>A record is only<br />a beginning.</h2>
        <p>
          Choose a source. Open one record. Notice what it describes, and what you would still need to ask.
        </p>
      </div>

      <div className="evidence-studio">
        <div className="source-index" role="group" aria-label="Choose an evidence source">
          <div className="source-progress">
            <span>Source inspection</span>
            <strong>{inspected.length} of {sources.length} inspected</strong>
          </div>
          {sources.map((item, index) => {
            const SourceIcon = item.icon
            return (
              <button
                key={item.title}
                type="button"
                aria-pressed={index === active}
                aria-controls="source-detail"
                className={index === active ? 'is-active' : ''}
                onClick={() => setActive(index)}
              >
                <SourceIcon aria-hidden="true" />
                <span><strong>{item.title}</strong><small>{item.eyebrow}</small></span>
                {inspected.includes(index) ? <Check className="source-check" aria-label="Inspected" /> : <ArrowRight aria-hidden="true" />}
              </button>
            )
          })}
        </div>

        <div className="source-stage" id="source-detail">
            <article key={source.title}>
              <div className="source-stage-topline">
                <div className="source-orbit"><Icon aria-hidden="true" /></div>
                <StatusTag status={source.status} />
              </div>
              <h3>{source.title}</h3>
              <p className="source-lead">{source.body}</p>

              <div className="source-record">
                <span>Example record / schema</span>
                <code>{source.sample}</code>
              </div>

              <div className="source-boundary">
                <span>Evidence boundary</span>
                <p>{source.boundary}</p>
              </div>

              <div className="source-task">
                <span>Do this now</span>
                <p>{source.task}</p>
              </div>

              <div className="source-stage-actions">
                <a href={source.href} target="_blank" rel="noreferrer">
                  {source.source} <ArrowUpRight aria-hidden="true" />
                </a>
                <button type="button" onClick={markInspected} aria-pressed={inspected.includes(active)} className={inspected.includes(active) ? 'is-inspected' : ''}>
                  <Check aria-hidden="true" /> {inspected.includes(active) ? 'Marked as inspected' : 'I inspected this source'}
                </button>
              </div>
              <small className="source-license">Rights / use · {source.license}</small>
            </article>
        </div>
      </div>

      <div className="evidence-rule" role="note">
        <span>Comparison rule</span>
        <p>
          Link questions and visual grammar; do not row-bind unrelated observations. A similarity in shape is a
          prompt to investigate, not evidence of a shared cause.
        </p>
      </div>
      <a className="chapter-forward chapter-forward-dark" href="#water">
        <span>Next chapter</span> Follow Kunshan’s water through space and time <ArrowRight aria-hidden="true" />
      </a>
    </section>
  )
}
