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
import { useState } from 'react'
import type { LanguageMode } from '../lib/i18n'
import type { EffectKind } from '../lib/effectExamples'
import { copy } from '../lib/synthesis'
import { ProjectEffectExample } from './ProjectEffectExample'
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

function PatternMedia({ item, motionEnabled, replay }: { item: (typeof researchExamples)[number]; motionEnabled: boolean; replay: number }) {
  const src = !motionEnabled && item.still ? item.still : item.image
  return <img key={`${src}-${replay}`} src={src} alt={item.alt} width="1200" height="675" loading="lazy" />
}

export function InteractionTutorial({ motionEnabled, activeLens, language }: { motionEnabled: boolean; activeLens: QuestionLensId; language: LanguageMode }) {
  const [active, setActive] = useState(0)
  const t = copy(language)
  const [activeTextbook, setActiveTextbook] = useState(0)
  const textbookKinds: EffectKind[] = ['select', 'time', 'select', 'brush', 'overview']
  const researchKinds: EffectKind[] = ['brush', 'overview', 'crossfilter', 'storyboard', 'suggest', 'suggest']
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

        <div className="tutorial-section-heading studio-heading"><div><MousePointer2 aria-hidden="true" /><span>03 · Practice the interaction</span></div><h3>Move one control, then explain what changed.</h3><p>Each studio step follows the same logic: intent → action → response → evidence → reset. The project examples compare the same evidence before and after each effect, before students try the live chapter.</p></div>
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
            <ProjectEffectExample key={pattern.kind} kind={pattern.kind} language={language} motionEnabled={motionEnabled} />
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
          <nav className="textbook-example-tabs" aria-label={t(['Choose a textbook effect', '选择教材效果'])}>{textbookExamples.map((example, i) => <button type="button" key={example.title} aria-pressed={activeTextbook === i} onClick={() => setActiveTextbook(i)}>{example.title}</button>)}</nav>
          <div className="textbook-rail">
            {textbookExamples.map((example, i) => (
              <figure key={example.title} hidden={activeTextbook !== i}>
                <a href="https://www.cs.ubc.ca/~tmm/talks/vad/VAD-interact.pdf" target="_blank" rel="noreferrer"><img src={example.image} alt={`${example.title}, ${example.slide}, from Tamara Munzner's Interactive Views lecture slides.`} width="960" height="540" loading="lazy" /></a>
                <figcaption><span>{example.slide}</span><strong>{example.title}</strong><p>{example.description}</p></figcaption>
              </figure>
            ))}
          </div>
          <ProjectEffectExample key={'textbook-' + activeTextbook} kind={textbookKinds[activeTextbook]} language={language} motionEnabled={motionEnabled} />
          <p className="full-inline-reference">Full source: Munzner, T. (n.d.). <cite>Visualization analysis &amp; design: Interactive views (Chapters 11–12)</cite> [Lecture slides]. Department of Computer Science, University of British Columbia. Retrieved September 22, 2026, from <a href="https://www.cs.ubc.ca/~tmm/talks/vad/VAD-interact.pdf" target="_blank" rel="noreferrer">https://www.cs.ubc.ca/~tmm/talks/vad/VAD-interact.pdf</a></p>
        </section>

        <section id="research-examples" className="research-gallery" aria-labelledby="research-patterns-title">
          <div className="tutorial-section-heading"><div><SlidersHorizontal aria-hidden="true" /><span>05 · Compare with research</span></div><h3 id="research-patterns-title">Separate what is applied from what is an extension.</h3><p>Use these systems as precedents for interaction quality. The labels below say whether the pattern is already present, a reference, or an explicit next step—so the atlas never overstates its functionality.</p></div>
          <div className="research-theatre">
            <nav aria-label="Choose a research interaction example">{researchExamples.map((example, index) => <button type="button" key={example.title} aria-pressed={activeResearch === index} onClick={() => { setActiveResearch(index); setReplay((value) => value + 1) }}><span>{String(index + 1).padStart(2, '0')}</span><strong>{example.title}</strong><small>{example.role}</small></button>)}</nav>
            <article key={researchExample.title}>
              <div className="research-media"><PatternMedia item={researchExample} motionEnabled={motionEnabled} replay={replay} /><div className="research-media-label"><span>{researchExample.role}</span>{researchExample.still && motionEnabled ? <button type="button" onClick={() => setReplay((value) => value + 1)}><RotateCcw aria-hidden="true" /> Replay animation</button> : null}</div></div>
              <div className="research-copy"><span>Interaction precedent {String(activeResearch + 1).padStart(2, '0')}</span><h4>{researchExample.title}</h4><p>{researchExample.application}</p><small>{researchExample.citation}</small></div>
              <ProjectEffectExample key={'research-' + activeResearch} kind={researchKinds[activeResearch]} language={language} motionEnabled={motionEnabled} />
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
