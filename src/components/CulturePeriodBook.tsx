import { ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Layers3 } from 'lucide-react'
import { useState } from 'react'
import type { MandaraData } from '../types'

const pages = [
  {
    status: 'Observed',
    title: 'What enters the analysis?',
    lead: 'Decorated pottery fragments—not complete people, communities, or histories.',
    body: 'The dataset records exterior decoration categories for ceramic sherds from archaeological sites. Material is organized by excavation unit and recording unit, including 10 cm depth increments called unit-levels.',
    takeaway: 'Start with the measured record: where a sherd was recorded and which decoration category was assigned.',
  },
  {
    status: 'Inferred',
    title: 'What does the model do?',
    lead: 'It looks for recurring distributions of decoration types.',
    body: 'A Dirichlet-process mixture model groups unit-level observations into latent components. Each component represents a distribution across decoration types; posterior inference expresses uncertainty about membership.',
    takeaway: 'The model adds an interpretation layer. It does not turn a decorative pattern into a known social group.',
  },
  {
    status: 'Identifier',
    title: 'What are CP1–CP14?',
    lead: 'Fourteen primary latent pattern labels used by the paper.',
    body: 'CP means “culture period” in the authors’ model. CP1, CP2, … CP14 are identifiers—not chapter numbers, named cultures, ethnic groups, ranks, dates, or an ordered timeline. The paper pools additional clusters as CP15.',
    takeaway: 'Read “CP8” as “inferred decoration-distribution pattern 8,” then inspect its context.',
  },
  {
    status: 'Visualization',
    title: 'What is a culture painting?',
    lead: 'A view of inferred component membership across archaeological context.',
    body: 'The paper arranges model results by site, excavation unit, and level so spatial and depth-related patterns can be compared. The word “culture” belongs to the method’s terminology; the graphic does not directly depict identity.',
    takeaway: 'Ask what is observed, what is inferred, and which ordering the painting uses before reading a pattern.',
  },
  {
    status: 'Interpretation',
    title: 'What can the result suggest?',
    lead: 'Spatial separation, recurrence, transition, and questions for other evidence.',
    body: 'A changing CP mixture can motivate hypotheses about migration, marriage, trade, social interaction, technological diffusion, or archaeological mixing. These are alternatives to investigate—not conclusions produced by the model alone.',
    takeaway: 'Use radiocarbon dates, other artifact classes, site context, taphonomy, and community knowledge to test an interpretation.',
  },
  {
    status: 'Boundary',
    title: 'How should depth and sequence be read?',
    lead: 'Deeper is context, not an automatic clock.',
    body: 'Site 642 contains reported sequences across excavation units, but “switchbacks” can reflect shifts, movement of sherds, aggregation, or low-count uncertainty. Radiocarbon dates and taphonomic assessment help evaluate chronology.',
    takeaway: 'A page turn is a reading aid—not proof that CP numbers or rows form one simple timeline.',
  },
]

const glossary = [
  ['Sherd', 'A fragment of pottery. The paper analyzes cleaned ceramic sherd records.'],
  ['Exterior decoration', 'A coded treatment or mark on the outside surface of a sherd; one observed variable in the analysis.'],
  ['Site', 'An archaeological location included in the study; the paper analyzes eleven sites.'],
  ['Excavation unit (EU)', 'A defined area excavated and recorded within a site.'],
  ['Recording unit (RU)', 'A unit used to organize archaeological observations within the excavation record.'],
  ['Unit-level', 'Material from one excavation/recording context at a 10 cm depth increment.'],
  ['Culture period (CP)', 'The paper’s name for a latent component: a consistent distribution of decoration types.'],
  ['Dirichlet-process mixture (DPM)', 'A probabilistic clustering model that can infer how many recurring components the observations support.'],
  ['Posterior', 'The model’s updated uncertainty after combining assumptions with the observed data.'],
  ['Culture painting', 'The paper’s visualization of inferred CP membership by site, unit, and level.'],
  ['Taphonomy', 'Processes that move, preserve, mix, or alter archaeological material after deposition.'],
  ['Radiocarbon date (RCD)', 'An independent dating estimate used to help evaluate chronology; it is not supplied by the CP label.'],
]

export function CulturePeriodBook({ data }: { data: MandaraData | null }) {
  const [page, setPage] = useState(0)
  const [direction, setDirection] = useState<'forward' | 'back'>('forward')
  const [selectedCp, setSelectedCp] = useState('CP14')
  const current = pages[page]
  const groups = data?.signatures.filter((signature) => {
    const index = data.culture_periods.indexOf(selectedCp)
    return index >= 0 && signature.values[index] > 0
  }).map((signature) => signature.group) ?? []

  const goTo = (next: number) => {
    const clamped = Math.max(0, Math.min(pages.length - 1, next))
    setDirection(clamped >= page ? 'forward' : 'back')
    setPage(clamped)
  }

  return (
    <section className="cp-explainer" aria-labelledby="cp-explainer-title">
      <div className="cp-explainer-heading"><div><span>Read this before the matrix</span><h3 id="cp-explainer-title">CP is a model pattern,<br />not a people.</h3></div><p>The paper calls its inferred components “culture periods.” That term can sound more definite than the evidence allows. Turn the pages to follow the transformation from observed fragments to cautious interpretation.</p></div>
      <div className="cp-book-shell">
        <div className="cp-book" tabIndex={0} onKeyDown={(event) => { if (event.key === 'ArrowRight') goTo(page + 1); if (event.key === 'ArrowLeft') goTo(page - 1) }} aria-label={`Culture-period explainer, page ${page + 1} of ${pages.length}`}>
          <article key={page} className={`cp-page turn-${direction}`}>
            <header><span>{String(page + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}</span><strong>{current.status}</strong></header>
            <BookOpen aria-hidden="true" /><h4>{current.title}</h4><p className="cp-page-lead">{current.lead}</p><p>{current.body}</p><footer><Layers3 aria-hidden="true" /><p><strong>Reading move</strong>{current.takeaway}</p></footer>
          </article>
          <div className="cp-book-controls"><button type="button" onClick={() => goTo(page - 1)} disabled={page === 0}><ChevronLeft aria-hidden="true" /> Previous page</button><div aria-label="Explainer pages">{pages.map((item, index) => <button key={item.title} type="button" aria-label={`Open page ${index + 1}: ${item.title}`} aria-pressed={page === index} onClick={() => goTo(index)}>{index + 1}</button>)}</div><button type="button" onClick={() => goTo(page + 1)} disabled={page === pages.length - 1}>Next page <ChevronRight aria-hidden="true" /></button></div>
        </div>

        <aside className="cp-picker"><span>Inspect the identifiers</span><h4>CP1 through CP14</h4><p>Select any label to see where the paper-derived teaching summary mentions it. This is context, not a definition.</p><div role="group" aria-label="Choose a culture-period pattern">{data?.culture_periods.map((cp) => <button type="button" key={cp} aria-pressed={selectedCp === cp} onClick={() => setSelectedCp(cp)}>{cp}</button>)}</div><article aria-live="polite"><strong>{selectedCp} · inferred pattern identifier</strong><p>{groups.length ? `Mentioned in this qualitative teaching summary: ${groups.join(', ')}.` : 'Not positively asserted in the bundled qualitative teaching summary.'}</p>{selectedCp === 'CP14' ? <p>The paper associates CP14 predominantly with Neolithic sites 618 and 756 and often with greater depths elsewhere; exceptions and mixed deposits require caution.</p> : <p>The number alone supplies no name, date, rank, or social identity. Read it through decoration distribution, site context, depth, uncertainty, and independent evidence.</p>}</article></aside>
      </div>

      <details className="cp-glossary"><summary>Open the plain-language archaeology + model glossary</summary><dl>{glossary.map(([term, definition]) => <div key={term}><dt>{term}</dt><dd>{definition}</dd></div>)}</dl></details>
      <div className="cp-source-note"><p><strong>Trace the explanation.</strong> The definitions above paraphrase the paper’s data and model sections. The app’s matrix is a qualitative teaching transcription, not the posterior model output.</p><div><a href="https://arxiv.org/abs/1511.05185" target="_blank" rel="noreferrer">Read the paper <ArrowUpRight aria-hidden="true" /></a><a href="https://doi.org/10.6067/XCV83F4R7D" target="_blank" rel="noreferrer">Open the official dataset <ArrowUpRight aria-hidden="true" /></a></div></div>
    </section>
  )
}
