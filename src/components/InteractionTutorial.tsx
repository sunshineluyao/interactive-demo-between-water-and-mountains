import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Hand,
  Layers3,
  MousePointer2,
  PauseCircle,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react'
import { useEffect, useId, useState, type CSSProperties } from 'react'
import { getQuestionLens, type QuestionLensId } from '../lib/communityQuestions'
import { ColabCompanion } from './ColabCompanion'
import { DesignerDecisionTree } from './DesignerDecisionTree'
import { TutorialLogicScene } from './TutorialLogicScene'

type PatternKind = 'select' | 'time' | 'navigate' | 'coordinate' | 'reduce' | 'author'

type Pattern = {
  id: string
  family: string
  title: string
  short: string
  summary: string
  action: string
  response: string
  evidence: string
  reset: string
  where: string
  href: string
  before: string
  after: string
  kind: PatternKind
}

const patterns: Pattern[] = [
  {
    id: 'select-highlight',
    family: 'Manipulate · Select',
    title: 'Select, then highlight',
    short: 'Select + highlight',
    summary: 'Selection records the item of interest; highlighting changes its visual treatment so the chosen item remains perceptible.',
    action: 'Click a mapped channel or a matrix cell.',
    response: 'The selected mark gains a stronger outline and a nearby panel exposes its record.',
    evidence: 'The record name, type, value, and source remain visible instead of relying on color alone.',
    reset: 'Choose another item; keyboard users can use the channel selector or focus a matrix cell and press Enter.',
    where: 'Water map and Mandara matrix',
    href: '#water',
    before: 'Many marks; no focal item or explanation.',
    after: 'One item is selected, highlighted, and explained.',
    kind: 'select',
  },
  {
    id: 'change-time',
    family: 'Manipulate · Change over time',
    title: 'Change parameters without losing context',
    short: 'Change parameters',
    summary: 'A slider, button, or timeline changes a parameter while stable scales and labels preserve a basis for comparison.',
    action: 'Move the year or month slider, step one month, or play the sequence.',
    response: 'The date, precipitation reading, line-chart point, and table update from one shared state.',
    evidence: 'The fixed y-scale and displayed units make before/after values comparable.',
    reset: 'Pause at any moment; the global motion control disables autoplay while leaving sliders usable.',
    where: 'Kunshan rainfall console',
    href: '#water',
    before: 'A static series with no chosen moment.',
    after: 'A chosen month links the control, reading, and chart.',
    kind: 'time',
  },
  {
    id: 'navigate',
    family: 'Manipulate · Navigate',
    title: 'Navigate a long story with landmarks',
    short: 'Navigate',
    summary: 'Scrolling changes the visible viewpoint. Direct chapter links restore random access so the experience is guided, not scroll-jacked.',
    action: 'Scroll normally, open Explore, or follow a chapter-forward link.',
    response: 'The menu marks the current chapter and every chapter retains a stable anchor.',
    evidence: 'Location is communicated through names and aria-current, not motion alone.',
    reset: 'The browser Back action and “Back to the beginning” link remain available.',
    where: 'Whole atlas journey',
    href: '#evidence',
    before: 'A long page without visible landmarks.',
    after: 'Named chapters and active location support orientation.',
    kind: 'navigate',
  },
  {
    id: 'coordinate',
    family: 'Facet · Juxtapose + coordinate',
    title: 'Coordinate views through shared state',
    short: 'Coordinate views',
    summary: 'Side-by-side views reduce memory load when the same selection is carried into a reading, chart, or detail panel.',
    action: 'Choose one month or one evidence item.',
    response: 'Multiple visible components reflect that choice at the same time.',
    evidence: 'The relationship is explicit in labels; the water map itself stays fixed because rainfall does not measure channel flow.',
    reset: 'Move the control again. No hidden hover-only state is required.',
    where: 'Rainfall console and evidence shelf',
    href: '#evidence',
    before: 'Views demand a mental comparison across separate states.',
    after: 'Shared state aligns the control, value, and detail.',
    kind: 'coordinate',
  },
  {
    id: 'reduce-reencode',
    family: 'Reduce + Manipulate · Aggregate / re-encode',
    title: 'Reduce records, then state the transformation',
    short: 'Reduce + re-encode',
    summary: 'Filtering and aggregation can make patterns visible, but the denominator, omitted categories, and semantic change must remain inspectable.',
    action: 'Load the official tDAR spreadsheet locally or reset to the teaching layer.',
    response: 'The atlas aggregates usable rows by site × decoration and re-encodes them as within-site proportions.',
    evidence: 'Status, denominator, legend, omitted-category note, and full label key distinguish the two views.',
    reset: 'Reset restores the paper-derived qualitative layer without uploading or altering the local file.',
    where: 'Mandara evidence chapter',
    href: '#mountain',
    before: 'Many rows are difficult to compare directly.',
    after: 'A documented aggregation reveals a pattern and its limits.',
    kind: 'reduce',
  },
  {
    id: 'author-export',
    family: 'Course extension · Author, persist, export',
    title: 'Turn interaction into accountable authorship',
    short: 'Author + export',
    summary: 'The atlas extends view manipulation into a learning workflow: students record an observation, separate interpretation, validate it, and export a traceable claim.',
    action: 'Write a field note, record four validation checks, then prepare the team claim.',
    response: 'Drafts stay on the device and can be copied or downloaded as Markdown or JSON.',
    evidence: 'Observation, inference, permission, local relationship, SDG contribution, and next check remain separate fields.',
    reset: 'Edit any field before sharing. Nothing is submitted automatically.',
    where: 'Bridge, validation, and return chapters',
    href: '#bridge',
    before: 'A visual impression disappears without a record.',
    after: 'A portable evidence card preserves reasoning and responsibility.',
    kind: 'author',
  },
]

const textbookExamples = [
  {
    image: '/images/tutorial/munzner-taxonomy.jpg',
    title: 'Interaction design space',
    slide: 'Slide 3',
    description: 'Change, select, and navigate sit within manipulate; juxtapose, partition, and superimpose sit within facet.',
  },
  {
    image: '/images/tutorial/munzner-parameters.jpg',
    title: 'Change parameters',
    slide: 'Slide 8',
    description: 'Widgets need clear labels, visible effects, and enough stable context for comparison.',
  },
  {
    image: '/images/tutorial/munzner-highlight.jpg',
    title: 'Selection and highlighting',
    slide: 'Slide 17',
    description: 'Selection is state; highlighting is the visual feedback used to reveal that state.',
  },
  {
    image: '/images/tutorial/munzner-linked-views.jpg',
    title: 'Linked highlighting',
    slide: 'Slide 34',
    description: 'True brushing and linking shares items across views; this is stronger than placing two views side by side.',
  },
  {
    image: '/images/tutorial/munzner-detail-on-demand.jpg',
    title: 'Details on demand',
    slide: 'Slide 38',
    description: 'A tooltip or detail view should supplement—never hide—the information needed for an overview.',
  },
]

const researchExamples = [
  {
    title: 'Brush and link',
    image: '/images/tutorial/vega-brush-link.gif',
    still: '/images/tutorial/vega-brush-link-still.png',
    alt: 'Animated scatterplot in which a selection highlights related marks.',
    role: 'Reference pattern',
    application: 'Use this when the same items appear in two views. The current atlas uses selection + detail; it does not claim full cross-view brushing.',
    citation: 'Satyanarayan, Moritz, Wongsuphasawat, and Heer (2017)',
  },
  {
    title: 'Overview + detail',
    image: '/images/tutorial/vega-overview-detail.gif',
    still: '/images/tutorial/vega-overview-detail-still.png',
    alt: 'Animated time-series overview controlling a larger detail view.',
    role: 'Applied pattern',
    application: 'The atlas pairs an overview with a selected record or month-specific detail while retaining the wider context.',
    citation: 'Vega-Lite example gallery; Satyanarayan, Moritz, Wongsuphasawat, and Heer (2017)',
  },
  {
    title: 'Crossfilter',
    image: '/images/tutorial/vega-crossfilter.gif',
    still: '/images/tutorial/vega-crossfilter-still.png',
    alt: 'Animated coordinated histograms responding to a shared filter.',
    role: 'Extension pattern',
    application: 'A useful next step for a final project. The atlas aggregates imported records, but deliberately does not label that operation crossfiltering.',
    citation: 'Vega-Lite example gallery; Satyanarayan, Moritz, Wongsuphasawat, and Heer (2017)',
  },
  {
    title: 'DataToon',
    image: '/images/tutorial/datatoon-interface.png',
    alt: 'DataToon workflow showing creation, filtering, layout, annotation, and panel sequencing.',
    role: 'CHI authoring precedent',
    application: 'A model for turning network evidence into a visible sequence of authoring decisions.',
    citation: 'Kim, Henry Riche, Bach, Xu, Brehmer, Hinckley, Pahud, Xia, McGuffin, and Pfister (2019)',
  },
  {
    title: 'Falx',
    image: '/images/tutorial/falx-interface.png',
    alt: 'Falx interface with input data, examples, synthesized visualization candidates, and post-processing.',
    role: 'CHI authoring precedent',
    application: 'A demonstration-by-example precedent. The atlas importer is deterministic and local; it does not synthesize code.',
    citation: 'Wang, Feng, Bodik, Dillig, Cheung, and Ko (2021)',
  },
  {
    title: 'Data Formulator',
    image: '/images/tutorial/data-formulator.gif',
    still: '/images/tutorial/data-formulator-still.png',
    alt: 'Animated Data Formulator interface with concept controls and candidate visualizations.',
    role: 'VIS mixed-initiative precedent',
    application: 'A model for inspectable suggestions and revision. No AI agent runs in this atlas.',
    citation: 'Wang, Thompson, and Lee (2024)',
  },
]

function Scene({ kind, after }: { kind: PatternKind; after: boolean }) {
  const ink = '#20343b'
  const muted = after ? '#78939c' : '#9cacb0'
  const lake = after ? '#245c70' : '#82979e'
  const coral = '#c66e42'
  const paper = after ? '#f9fbf8' : '#eef2f0'

  if (kind === 'select') {
    return (
      <svg viewBox="0 0 720 360" aria-hidden="true">
        <rect width="720" height="360" rx="18" fill={paper} />
        <text x="34" y="46" fill={ink} fontSize="18" fontWeight="600">Mapped channels</text>
        {[0, 1, 2, 3, 4, 5].map((line) => <path key={line} d={`M38 ${95 + line * 34} C150 ${54 + line * 38}, 235 ${150 + line * 17}, 430 ${82 + line * 38}`} fill="none" stroke={after && line === 2 ? coral : muted} strokeWidth={after && line === 2 ? 10 : 4} strokeLinecap="round" />)}
        <circle cx="152" cy="195" r={after ? 11 : 7} fill={after ? coral : muted} stroke={paper} strokeWidth="4" />
        <rect x="474" y="74" width="212" height="218" rx="10" fill={after ? '#dce8eb' : '#e5e9e7'} stroke={after ? lake : muted} />
        <text x="500" y="112" fill={lake} fontSize="14" fontWeight="600">{after ? 'SELECTED RECORD' : 'NO SELECTION'}</text>
        <rect x="500" y="136" width={after ? 142 : 112} height="13" rx="6" fill={after ? ink : muted} />
        <rect x="500" y="166" width="158" height="8" rx="4" fill={muted} />
        <rect x="500" y="186" width="128" height="8" rx="4" fill={muted} />
        <rect x="500" y="226" width={after ? 152 : 92} height="40" rx="4" fill={after ? lake : '#cbd4d4'} />
      </svg>
    )
  }

  if (kind === 'time') {
    const path = 'M58 242 C110 198, 142 220, 190 153 S284 118, 326 181 S414 242, 466 141 S558 104, 652 178'
    return (
      <svg viewBox="0 0 720 360" aria-hidden="true">
        <rect width="720" height="360" rx="18" fill={paper} />
        <text x="38" y="48" fill={ink} fontSize="18" fontWeight="600">Monthly precipitation</text>
        <text x="682" y="48" fill={lake} fontSize="15" textAnchor="end">{after ? 'Jul 2025 · 8.14 mm/day' : 'Choose a month'}</text>
        {[110, 176, 242].map((y) => <line key={y} x1="58" x2="662" y1={y} y2={y} stroke="#c8d4d5" />)}
        <path d={path} fill="none" stroke={lake} strokeWidth="5" strokeLinecap="round" />
        {after ? <><circle cx="510" cy="125" r="11" fill={coral} stroke={paper} strokeWidth="4" /><line x1="510" x2="510" y1="125" y2="277" stroke={coral} strokeDasharray="6 5" /></> : null}
        <line x1="58" x2="662" y1="303" y2="303" stroke={ink} strokeWidth="5" strokeLinecap="round" />
        <circle cx={after ? 510 : 58} cy="303" r="13" fill={after ? coral : muted} />
        <text x="58" y="336" fill={muted} fontSize="13">2001</text><text x="662" y="336" fill={muted} fontSize="13" textAnchor="end">2025</text>
      </svg>
    )
  }

  if (kind === 'navigate') {
    return (
      <svg viewBox="0 0 720 360" aria-hidden="true">
        <rect width="720" height="360" rx="18" fill={paper} />
        <rect x="40" y="28" width="640" height="50" rx="8" fill={after ? '#dce8eb' : '#dfe5e4'} />
        <text x="66" y="60" fill={ink} fontSize="16" fontWeight="600">Between Water &amp; Mountains</text>
        {[0, 1, 2].map((card) => <rect key={card} x="92" y={104 + card * 73} width="546" height="52" rx="8" fill={after && card === 1 ? '#ffffff' : '#e0e7e6'} stroke={after && card === 1 ? lake : 'none'} strokeWidth="3" />)}
        {after ? <>
          <line x1="58" x2="58" y1="116" y2="300" stroke={lake} strokeWidth="3" />
          {[0, 1, 2].map((dot) => <circle key={dot} cx="58" cy={130 + dot * 73} r={dot === 1 ? 11 : 7} fill={dot === 1 ? coral : lake} />)}
          <text x="116" y="136" fill={muted} fontSize="13">01 · EVIDENCE</text><text x="116" y="209" fill={lake} fontSize="13" fontWeight="600">02 · WATER · CURRENT</text><text x="116" y="282" fill={muted} fontSize="13">03 · MOUNTAIN</text>
        </> : <text x="360" y="337" fill={muted} fontSize="14" textAnchor="middle">Where am I?</text>}
      </svg>
    )
  }

  if (kind === 'coordinate') {
    return (
      <svg viewBox="0 0 720 360" aria-hidden="true">
        <rect width="720" height="360" rx="18" fill={paper} />
        <text x="40" y="48" fill={ink} fontSize="18" fontWeight="600">One temporal selection</text>
        <rect x="40" y="78" width="172" height="224" rx="10" fill="#e1e8e7" stroke={after ? lake : 'none'} />
        <rect x="274" y="78" width="172" height="224" rx="10" fill="#e1e8e7" stroke={after ? lake : 'none'} />
        <rect x="508" y="78" width="172" height="224" rx="10" fill="#e1e8e7" stroke={after ? lake : 'none'} />
        <text x="126" y="112" fill={muted} fontSize="13" textAnchor="middle">CONTROL</text><text x="360" y="112" fill={muted} fontSize="13" textAnchor="middle">READING</text><text x="594" y="112" fill={muted} fontSize="13" textAnchor="middle">CHART</text>
        <line x1="70" x2="182" y1="186" y2="186" stroke={ink} strokeWidth="5" strokeLinecap="round" /><circle cx={after ? 145 : 72} cy="186" r="11" fill={after ? coral : muted} />
        <text x="360" y="191" fill={after ? coral : muted} fontSize="28" textAnchor="middle" fontWeight="600">{after ? '8.14' : '—'}</text>
        <path d="M530 234 C550 191, 570 217, 589 167 S628 137, 656 194" fill="none" stroke={lake} strokeWidth="4" />
        {after ? <circle cx="628" cy="145" r="9" fill={coral} stroke={paper} strokeWidth="3" /> : null}
        {after ? <><path d="M218 190 H264" stroke={coral} strokeWidth="3" /><path d="M452 190 H498" stroke={coral} strokeWidth="3" /></> : null}
      </svg>
    )
  }

  if (kind === 'reduce') {
    const cells = Array.from({ length: 48 }, (_, index) => ({ x: 44 + (index % 12) * 26, y: 82 + Math.floor(index / 12) * 38 }))
    return (
      <svg viewBox="0 0 720 360" aria-hidden="true">
        <rect width="720" height="360" rx="18" fill={paper} />
        <text x="40" y="48" fill={ink} fontSize="18" fontWeight="600">{after ? 'Site × decoration proportions' : 'Imported observation rows'}</text>
        {!after ? cells.map((cell, index) => <circle key={index} cx={cell.x} cy={cell.y} r="8" fill={index % 5 === 0 ? lake : muted} opacity={0.8} />) : null}
        {after ? Array.from({ length: 32 }, (_, index) => <rect key={index} x={44 + (index % 8) * 42} y={82 + Math.floor(index / 8) * 45} width="34" height="34" rx="3" fill={`rgba(36,92,112,${0.15 + ((index * 3) % 8) * 0.1})`} />) : null}
        <rect x="418" y="74" width="262" height="220" rx="10" fill="#dce8eb" />
        <text x="444" y="110" fill={lake} fontSize="13" fontWeight="600">{after ? 'TRANSFORMATION LEDGER' : 'RAW FIELDS'}</text>
        {[0, 1, 2, 3].map((row) => <rect key={row} x="444" y={136 + row * 32} width={after ? 188 - row * 11 : 150 + row * 13} height="10" rx="5" fill={row === 0 && after ? coral : muted} />)}
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 720 360" aria-hidden="true">
      <rect width="720" height="360" rx="18" fill={paper} />
      <text x="40" y="48" fill={ink} fontSize="18" fontWeight="600">Field note → validation → team claim</text>
      {[0, 1, 2].map((field) => <rect key={field} x="42" y={82 + field * 72} width="374" height="52" rx="7" fill="#ffffff" stroke={after ? lake : muted} />)}
      {after ? <>
        <rect x="60" y="101" width="288" height="9" rx="4" fill={ink} /><rect x="60" y="173" width="224" height="9" rx="4" fill={lake} /><rect x="60" y="245" width="310" height="9" rx="4" fill={coral} />
      </> : <>
        <text x="60" y="113" fill={muted} fontSize="13">Observed…</text><text x="60" y="185" fill={muted} fontSize="13">Interpreted…</text><text x="60" y="257" fill={muted} fontSize="13">Next check…</text>
      </>}
      <rect x="468" y="82" width="210" height="198" rx="10" fill={after ? '#dce8eb' : '#e2e8e7'} />
      <text x="492" y="118" fill={lake} fontSize="13" fontWeight="600">{after ? 'EVIDENCE CARD' : 'NO SAVED TRACE'}</text>
      {[0, 1, 2, 3].map((row) => <rect key={row} x="492" y={143 + row * 27} width={after ? 146 - row * 8 : 96} height="8" rx="4" fill={after && row === 3 ? coral : muted} />)}
      <rect x="492" y="245" width="160" height="36" rx="4" fill={after ? lake : '#cbd4d4'} />
    </svg>
  )
}

function BeforeAfterComparison({ pattern }: { pattern: Pattern }) {
  const [reveal, setReveal] = useState(56)
  const labelId = useId()
  useEffect(() => setReveal(56), [pattern.id])

  return (
    <div className="before-after-block">
      <div className="before-after" style={{ '--reveal': `${reveal}%` } as CSSProperties}>
        <div className="comparison-state comparison-before"><Scene kind={pattern.kind} after={false} /></div>
        <div className="comparison-state comparison-after"><Scene kind={pattern.kind} after /></div>
        <div className="comparison-divider" aria-hidden="true"><span><ChevronLeft /><ChevronRight /></span></div>
        <input
          type="range"
          min="0"
          max="100"
          value={reveal}
          onChange={(event) => setReveal(Number(event.target.value))}
          aria-labelledby={labelId}
        />
        <span className="comparison-label comparison-label-before">Before</span>
        <span className="comparison-label comparison-label-after">After</span>
      </div>
      <p id={labelId} className="comparison-instruction">Drag the divider or use the arrow keys to reveal the interaction’s before and after states.</p>
      <div className="comparison-captions"><p><strong>Before:</strong> {pattern.before}</p><p><strong>After:</strong> {pattern.after}</p></div>
    </div>
  )
}

function PatternMedia({ item, motionEnabled, replay }: { item: (typeof researchExamples)[number]; motionEnabled: boolean; replay: number }) {
  const src = !motionEnabled && item.still ? item.still : item.image
  return <img key={`${src}-${replay}`} src={src} alt={item.alt} width="1200" height="675" loading="lazy" />
}

export function InteractionTutorial({ motionEnabled, activeLens }: { motionEnabled: boolean; activeLens: QuestionLensId }) {
  const [active, setActive] = useState(0)
  const [activeResearch, setActiveResearch] = useState(0)
  const [replay, setReplay] = useState(0)
  const pattern = patterns[active]
  const lens = getQuestionLens(activeLens)
  const researchExample = researchExamples[activeResearch]

  return (
    <section id="tutorial" className="chapter tutorial-chapter" data-chapter aria-labelledby="tutorial-title">
      <div className="tutorial-inner">
        <div className="tutorial-heading">
          <div>
            <span className="tutorial-kicker">Week 5 · interactive idioms and MVP</span>
            <h2 id="tutorial-title">Interaction is a way<br />of thinking with evidence.</h2>
          </div>
          <div>
            <p>A control earns its place when it helps someone notice a pattern, compare evidence, test an interpretation, or expose what the data cannot answer. Name the intent, action, response, evidence, and reset—not only the widget.</p>
            <a href="#tutorial-studio">Start the guided studio <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>

        <aside className="lens-recommendation" aria-label="Selected community question and suggested interactions">
          <div className="lens-recommendation-title"><span>Your selected community lens</span><strong>{lens.name}</strong></div>
          <p>{lens.purpose}</p>
          <div className="lens-recommendation-footer"><span>Start with:</span><div>{lens.recommendedPatterns.map((item) => <strong key={item}>{item}</strong>)}</div><a href="#questions">Change the question lens <ArrowRight aria-hidden="true" /></a></div>
        </aside>

        <TutorialLogicScene motionEnabled={motionEnabled} lensName={lens.name} />

        <div className="tutorial-module-intro"><span>01 · Name the vocabulary</span><strong>Begin with the analytical intent—not the visual effect.</strong><p>Munzner’s terms give the class a shared language. The same word should describe the same relationship in the app, the notebook, and the final presentation.</p></div>
        <div id="interaction-vocabulary" className="interaction-taxonomy" aria-label="Munzner interaction vocabulary used in the atlas">
          <div><span>Manipulate</span><strong>Change · Select · Navigate</strong></div>
          <div><span>Facet</span><strong>Juxtapose · Coordinate</strong></div>
          <div><span>Reduce</span><strong>Filter · Aggregate</strong></div>
          <a href="https://www.cs.ubc.ca/~tmm/talks/vad/VAD-interact.pdf" target="_blank" rel="noreferrer">Open Munzner’s Ch. 11–12 slides <ExternalLink aria-hidden="true" /></a>
        </div>

        <DesignerDecisionTree />

        <div className="tutorial-section-heading studio-heading"><div><MousePointer2 aria-hidden="true" /><span>03 · Practice the interaction</span></div><h3>Move one control, then explain what changed.</h3><p>Each studio step follows the same logic: intent → action → response → evidence → reset. The before/after slider makes the consequence visible before students try the live chapter.</p></div>
        <div id="tutorial-studio" className="tutorial-studio">
          <nav className="pattern-index" aria-label="Interaction tutorial steps">
            <div><span>Studio route</span><strong>{String(active + 1).padStart(2, '0')} / {String(patterns.length).padStart(2, '0')}</strong></div>
            {patterns.map((item, index) => (
              <button key={item.id} type="button" aria-pressed={active === index} onClick={() => setActive(index)}>
                <span>{String(index + 1).padStart(2, '0')}</span><strong>{item.short}</strong>
              </button>
            ))}
          </nav>

          <article className="pattern-stage" key={pattern.id}>
            <header><span>{pattern.family}</span><h3>{pattern.title}</h3><p>{pattern.summary}</p></header>
            <BeforeAfterComparison pattern={pattern} />
            <dl className="interaction-script">
              <div><dt><MousePointer2 aria-hidden="true" />Action</dt><dd>{pattern.action}</dd></div>
              <div><dt><Layers3 aria-hidden="true" />System response</dt><dd>{pattern.response}</dd></div>
              <div><dt><BookOpen aria-hidden="true" />Evidence</dt><dd>{pattern.evidence}</dd></div>
              <div><dt><PauseCircle aria-hidden="true" />Reset + access</dt><dd>{pattern.reset}</dd></div>
            </dl>
            <footer>
              <div className="pattern-pager"><button type="button" onClick={() => setActive((value) => Math.max(0, value - 1))} disabled={active === 0}><ChevronLeft /> Previous</button><button type="button" onClick={() => setActive((value) => Math.min(patterns.length - 1, value + 1))} disabled={active === patterns.length - 1}>Next <ChevronRight /></button></div>
              <a href={pattern.href}>Try it live · {pattern.where} <ArrowRight aria-hidden="true" /></a>
            </footer>
          </article>
        </div>

        <section id="textbook-examples" className="textbook-gallery" aria-labelledby="textbook-title">
          <div className="tutorial-section-heading"><div><BookOpen aria-hidden="true" /><span>04 · Compare with the textbook</span></div><h3 id="textbook-title">See the vocabulary in Munzner’s own examples.</h3><p>These small teaching excerpts come from the author’s publicly accessible interaction slides. Each is paired with the place where the same design question appears in this atlas.</p></div>
          <div className="textbook-rail">
            {textbookExamples.map((example) => (
              <figure key={example.title}>
                <a href="https://www.cs.ubc.ca/~tmm/talks/vad/VAD-interact.pdf" target="_blank" rel="noreferrer"><img src={example.image} alt={`${example.title}, ${example.slide}, from Tamara Munzner's Interactive Views lecture slides.`} width="960" height="540" loading="lazy" /></a>
                <figcaption><span>{example.slide}</span><strong>{example.title}</strong><p>{example.description}</p></figcaption>
              </figure>
            ))}
          </div>
          <p className="full-inline-reference">Full source: Munzner, T. (n.d.). <cite>Visualization analysis &amp; design: Interactive views (Chapters 11–12)</cite> [Lecture slides]. Department of Computer Science, University of British Columbia. Retrieved September 22, 2026, from <a href="https://www.cs.ubc.ca/~tmm/talks/vad/VAD-interact.pdf" target="_blank" rel="noreferrer">https://www.cs.ubc.ca/~tmm/talks/vad/VAD-interact.pdf</a></p>
        </section>

        <section id="research-examples" className="research-gallery" aria-labelledby="research-patterns-title">
          <div className="tutorial-section-heading"><div><SlidersHorizontal aria-hidden="true" /><span>05 · Compare with research</span></div><h3 id="research-patterns-title">Separate what is applied from what is an extension.</h3><p>Use these systems as precedents for interaction quality. The labels below say whether the pattern is already present, a reference, or an explicit next step—so the atlas never overstates its functionality.</p></div>
          <div className="research-theatre">
            <nav aria-label="Choose a research interaction example">{researchExamples.map((example, index) => <button type="button" key={example.title} aria-pressed={activeResearch === index} onClick={() => { setActiveResearch(index); setReplay((value) => value + 1) }}><span>{String(index + 1).padStart(2, '0')}</span><strong>{example.title}</strong><small>{example.role}</small></button>)}</nav>
            <article key={researchExample.title}>
              <div className="research-media"><PatternMedia item={researchExample} motionEnabled={motionEnabled} replay={replay} /><div className="research-media-label"><span>{researchExample.role}</span>{researchExample.still && motionEnabled ? <button type="button" onClick={() => setReplay((value) => value + 1)}><RotateCcw aria-hidden="true" /> Replay animation</button> : null}</div></div>
              <div className="research-copy"><span>Interaction precedent {String(activeResearch + 1).padStart(2, '0')}</span><h4>{researchExample.title}</h4><p>{researchExample.application}</p><small>{researchExample.citation}</small></div>
            </article>
          </div>
          {!motionEnabled ? <p className="motion-note"><PauseCircle aria-hidden="true" /> Motion is paused, so animated examples show a representative frame. Enable motion in the header to play them.</p> : null}
          <a className="full-references-link" href="#references">Open every full APA-style source and data credit <ArrowRight aria-hidden="true" /></a>
        </section>

        <ColabCompanion />

        <div id="tutorial-takeaway" className="tutorial-takeaway" role="note"><Hand aria-hidden="true" /><div><span>07 · Explain and return</span><strong>Your five-line demo script</strong><p>“The user needs to ___. They ___ the control. The system responds by ___. This reveals ___. They can reset or recover by ___.”</p><a href="#advanced">Week 6: animation, 3D, and Chapter 10 color <ArrowRight aria-hidden="true" /></a></div></div>
      </div>
      <a className="chapter-forward tutorial-forward" href="#evidence"><span>Now inspect the evidence</span> Use the vocabulary on the live atlas <ArrowRight aria-hidden="true" /></a>
    </section>
  )
}
