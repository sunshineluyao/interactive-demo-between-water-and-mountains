import { ArrowRight, CheckCircle2, GitBranch, RotateCcw } from 'lucide-react'
import { useMemo, useState } from 'react'

type Choice = { id: string; label: string; note: string }
type Layer = { id: 'question' | 'evidence' | 'task' | 'interaction'; step: string; prompt: string; choices: Choice[] }

const layers: Layer[] = [
  {
    id: 'question',
    step: '01 · Question',
    prompt: 'What should a person learn?',
    choices: [
      { id: 'locate', label: 'Locate + orient', note: 'Understand where evidence belongs.' },
      { id: 'change', label: 'Trace change', note: 'See what varies across time or depth.' },
      { id: 'interpret', label: 'Invite interpretation', note: 'Form and revise a situated reading.' },
    ],
  },
  {
    id: 'evidence',
    step: '02 · Evidence',
    prompt: 'What structure does the evidence have?',
    choices: [
      { id: 'spatiotemporal', label: 'Space + time', note: 'Locations, dates, depth, or sequences.' },
      { id: 'relational', label: 'Relations', note: 'Links, co-occurrence, or shared membership.' },
      { id: 'community', label: 'Community + qualitative', note: 'Accounts, annotations, and missing voices.' },
    ],
  },
  {
    id: 'task',
    step: '03 · Reader task',
    prompt: 'What must the person do?',
    choices: [
      { id: 'explore', label: 'Explore', note: 'Move through possibilities without a fixed answer.' },
      { id: 'compare', label: 'Compare', note: 'Keep a stable basis for judging differences.' },
      { id: 'explain', label: 'Explain + communicate', note: 'Make reasoning visible to someone else.' },
    ],
  },
  {
    id: 'interaction',
    step: '04 · Interaction',
    prompt: 'What response best supports that task?',
    choices: [
      { id: 'select', label: 'Select + details', note: 'Reveal one record without losing the overview.' },
      { id: 'filter', label: 'Filter + change', note: 'Adjust a parameter while preserving context.' },
      { id: 'coordinate', label: 'Coordinate + annotate', note: 'Carry one choice across views and into a note.' },
    ],
  },
]

const defaults = { question: 'locate', evidence: 'spatiotemporal', task: 'explore', interaction: 'select' }

const interactionRecommendations = {
  select: { title: 'Selection + details on demand', pattern: 'Select a visible mark, keep it highlighted, and expose its source record beside the overview.', test: 'Can a keyboard user identify the selected record and return to the overview?', anchor: '#water' },
  filter: { title: 'Parameter change + stable comparison', pattern: 'Let the reader change one parameter while labels, scale, units, and the previous context remain legible.', test: 'Can someone say exactly what changed—and what stayed fixed—after one action?', anchor: '#water' },
  coordinate: { title: 'Coordinated views + accountable annotation', pattern: 'Carry a shared selection into a second view and a note so evidence and interpretation remain distinct.', test: 'Can another person trace the note back to the same selected evidence?', anchor: '#bridge' },
}

const evidenceBoundaries = {
  spatiotemporal: 'State coordinate, temporal/depth unit, resolution, and what the source does not measure.',
  relational: 'Define what a link or shared pattern means; do not let proximity imply causation.',
  community: 'Name whose account is present, whose is absent, and what permission is still needed.',
}

const taskSequences = {
  explore: 'overview → choose → inspect → reset',
  compare: 'stable baseline → change one thing → compare → record difference',
  explain: 'claim → evidence → limitation → next check',
}

export function DesignerDecisionTree() {
  const [choices, setChoices] = useState(defaults)
  const result = useMemo(() => {
    const interaction = interactionRecommendations[choices.interaction as keyof typeof interactionRecommendations]
    return {
      ...interaction,
      boundary: evidenceBoundaries[choices.evidence as keyof typeof evidenceBoundaries],
      sequence: taskSequences[choices.task as keyof typeof taskSequences],
      goal: layers[0].choices.find((choice) => choice.id === choices.question)?.note,
    }
  }, [choices])

  return (
    <section id="design-path" className="decision-tree" aria-labelledby="decision-tree-title">
      <div className="tutorial-section-heading decision-tree-heading"><div><GitBranch aria-hidden="true" /><span>02 · Choose a design path</span></div><h3 id="decision-tree-title">Four decisions. No layer has more than three choices.</h3><p>Use the path to connect a learning question to an evidence type, reader task, and interaction. Every choice rewrites the recommendation and its next test.</p></div>
      <div className="decision-tree-layout">
        <div className="decision-layers">
          {layers.map((layer) => <fieldset key={layer.id}><legend><span>{layer.step}</span>{layer.prompt}</legend><div>
            {layer.choices.map((choice) => <button key={choice.id} type="button" aria-pressed={choices[layer.id] === choice.id} onClick={() => setChoices((current) => ({ ...current, [layer.id]: choice.id }))}><strong>{choice.label}</strong><small>{choice.note}</small></button>)}
          </div></fieldset>)}
          <button className="decision-reset" type="button" onClick={() => setChoices(defaults)}><RotateCcw aria-hidden="true" /> Reset path</button>
        </div>
        <aside className="decision-output" aria-live="polite">
          <span>Recommended design</span><h4>{result.title}</h4><p>{result.pattern}</p>
          <dl><div><dt>Learning goal</dt><dd>{result.goal}</dd></div><div><dt>Reading sequence</dt><dd>{result.sequence}</dd></div><div><dt>Evidence boundary</dt><dd>{result.boundary}</dd></div></dl>
          <div className="validation-ladder"><span><CheckCircle2 /> Domain + community</span><span><CheckCircle2 /> Data + task</span><span><CheckCircle2 /> Idiom</span><span><CheckCircle2 /> Algorithm</span></div>
          <div className="next-test"><strong>One next test</strong><p>{result.test}</p></div>
          <a href={result.anchor}>Try this pattern in the atlas <ArrowRight aria-hidden="true" /></a>
        </aside>
      </div>
    </section>
  )
}
