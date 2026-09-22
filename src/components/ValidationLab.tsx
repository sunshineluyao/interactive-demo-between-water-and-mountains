import { Check, ChevronLeft, ChevronRight, Clipboard, Download, FlaskConical, Layers, Network, ScanSearch } from 'lucide-react'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ValidationStep } from '../types'
import { downloadText, useDraft } from '../lib/drafts'

const icons = [ScanSearch, Network, Layers, FlaskConical]

const steps: ValidationStep[] = [
  {
    id: 'domain',
    level: 'Level 1',
    title: 'Domain validity',
    question: 'Is this a question that the evidence and affected people recognize as meaningful?',
    water: 'Ask how mapped channels and precipitation help people notice a water-landscape question in Kunshan.',
    mountain: 'Ask how decoration patterns across place and depth can support—not settle—an archaeological interpretation.',
    test: 'A peer can name the intended audience, decision and one voice still missing.',
    carry: 'Write the final project’s audience + consequential decision in one sentence.',
  },
  {
    id: 'data',
    level: 'Level 2',
    title: 'Data / task validity',
    question: 'Do the fields, granularity and provenance support the task we are asking viewers to perform?',
    water: 'OSM supports locating mapped channels; NASA POWER supports comparing coarse monthly precipitation—not water quality or discharge.',
    mountain: 'tDAR rows support site / unit / level / decoration analysis; the paper-derived matrix supports only qualitative orientation.',
    test: 'A peer can identify one supported task, one unsupported task and the transformation used.',
    carry: 'Add a source URL, license, unit of analysis and evidence boundary to the project ledger.',
  },
  {
    id: 'idiom',
    level: 'Level 3',
    title: 'Idiom validity',
    question: 'Does the visual encoding reveal the relationship without introducing a stronger claim?',
    water: 'Linked map + temporal profile keeps spatial form distinct from time; animation encodes selection, not physical flow.',
    mountain: 'This teaching matrix aligns regional groups with reported culture periods. The imported view compares site and decoration; the paper’s depth analysis is separate.',
    test: 'A peer describes the intended pattern before reading the caption and does not infer a false causal story.',
    carry: 'Choose one basic idiom and one justified network or spatiotemporal addition for the MVP.',
  },
  {
    id: 'algorithm',
    level: 'Level 4',
    title: 'Algorithm validity',
    question: 'Are the transformation, parameters and uncertainty robust enough for the claim?',
    water: 'Test time range, missing months, projection and simplification; compare motion with the static line chart.',
    mountain: 'Test aggregation level and sensitivity; treat culture periods as model inference with posterior uncertainty.',
    test: 'The result survives a sensible parameter change—or the project explains why it does not.',
    carry: 'Record one robustness check, one fallback and one condition that would change the conclusion.',
  },
]

export function ValidationLab() {
  const [active, setActive] = useState(0)
  const [notes, setNotes, saved] = useDraft<Record<string, string>>('atlas-validation-notes-v2', {})
  const [checked, setChecked] = useDraft<string[]>('atlas-validation-checks-v2', [], (value) => Array.isArray(value) && value.every((id) => steps.some((item) => item.id === id)) && new Set(value).size === value.length)
  const completed = useMemo(() => new Set(checked), [checked])
  const [copyStatus, setCopyStatus] = useState('')
  const step = steps[active]
  const Icon = icons[active]

  const evidenceCard = useMemo(
    () => ({
      title: 'Between Water & Mountains · four-level validation card',
      generated: new Date().toISOString(),
      levels: steps.map((item) => ({
        level: item.title,
        validation_test: item.test,
        student_evidence: notes[item.id] || 'Not recorded',
        checked: completed.has(item.id),
        final_project_addition: item.carry,
      })),
    }),
    [notes, completed],
  )

  const toggleCompleted = () => {
    setChecked((current) => {
      const next = new Set(current)
      if (next.has(step.id)) next.delete(step.id)
      else next.add(step.id)
      return [...next]
    })
  }

  const copyCard = async () => {
    const text = steps.map((item) => `## ${item.title}\n- Evidence: ${notes[item.id] || 'Not recorded'}\n- Test: ${item.test}\n- Complete: ${completed.has(item.id) ? 'yes' : 'no'}`).join('\n\n')
    try {
      await navigator.clipboard.writeText(text)
      setCopyStatus('Copied')
    } catch {
      downloadText(text, 'infosci301-validation.md', 'text/markdown')
      setCopyStatus('Clipboard unavailable. Saved a Markdown file instead.')
    }
  }

  const downloadCard = () => {
    downloadText(JSON.stringify(evidenceCard, null, 2), 'infosci301-four-level-validation.json', 'application/json')
  }

  return (
    <section id="validate" className="chapter validation-chapter" data-chapter>
      <div className="chapter-heading split-heading">
        <div>
          <h2>Let someone else<br />question the picture.</h2>
        </div>
        <p>
          A beautiful result is not yet a trustworthy result. Move from the human question to the computation;
          record what you actually checked at each level.
        </p>
      </div>

      <div className="validation-shell">
        <nav className="validation-tabs" aria-label="Validation levels">
          {steps.map((item, index) => {
            const StepIcon = icons[index]
            return (
              <button key={item.id} type="button" aria-pressed={index === active} onClick={() => setActive(index)} className={index === active ? 'is-active' : ''}>
                <span>{item.level}</span>
                <StepIcon aria-hidden="true" />
                <strong>{item.title.replace(' validity', '')}</strong>
                {completed.has(item.id) ? <Check className="complete-check" aria-label="Checked" /> : null}
              </button>
            )
          })}
        </nav>

        <div className="validation-stage">
          <AnimatePresence mode="wait">
            <motion.div key={step.id} className="validation-step" initial={{ opacity: 0.8 }} animate={{ opacity: 1 }} exit={{ opacity: 0.8 }}>
              <div className="validation-question">
                <div className="level-icon"><Icon aria-hidden="true" /></div>
                <h3>{step.question}</h3>
              </div>

              <div className="paired-decisions">
                <article><span>水 · Water decision</span><p>{step.water}</p></article>
                <article><span>山 · Mountain decision</span><p>{step.mountain}</p></article>
              </div>

              <div className="validation-test">
                <span>Pass condition</span>
                <p>{step.test}</p>
              </div>

              <label className="evidence-entry">
                <span>Your evidence from a peer, source inspection or robustness check</span>
                <textarea
                  value={notes[step.id] ?? ''}
                  onChange={(event) => setNotes((current) => ({ ...current, [step.id]: event.target.value }))}
                  placeholder="Record what you observed—not what you hoped would happen."
                  rows={3}
                />
              </label>

              <div className="carry-forward">
                <span>Add to the final group project</span>
                <p>{step.carry}</p>
              </div>

              <div className="validation-actions">
                <button type="button" onClick={() => setActive((value) => Math.max(0, value - 1))} disabled={active === 0}><ChevronLeft /> Previous</button>
                <button type="button" aria-pressed={completed.has(step.id)} className={completed.has(step.id) ? 'is-complete' : ''} onClick={toggleCompleted}><Check aria-hidden="true" /> {completed.has(step.id) ? 'Recorded as checked' : 'Record as checked'}</button>
                <button type="button" onClick={() => setActive((value) => Math.min(steps.length - 1, value + 1))} disabled={active === steps.length - 1}>Next <ChevronRight /></button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <aside className="validation-export">
          <div><strong>{completed.size}/4</strong><span>levels checked</span></div>
          <p>Your notes become a portable evidence card for the Week 5 proposal and MVP.</p>
          <p className="draft-status">{saved ? 'Draft saved in this browser.' : 'Draft storage is unavailable. Download your notes.'}</p>
          <button type="button" onClick={copyCard}><Clipboard aria-hidden="true" /> Copy as Markdown</button>
          <button type="button" onClick={downloadCard}><Download /> Download JSON</button>
          <p role="status">{copyStatus}</p>
        </aside>
      </div>
      <div className="validation-progress" aria-label={`${completed.size} of 4 validation levels complete`}>
        <span style={{ width: `${(completed.size / steps.length) * 100}%` }} />
      </div>
      <a className="chapter-forward" href="#return">Carry this into the team project <ChevronRight aria-hidden="true" /></a>
    </section>
  )
}
