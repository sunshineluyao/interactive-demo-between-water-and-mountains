import { ArrowRight, Download } from 'lucide-react'
import { useState } from 'react'
import { useDraft, downloadText } from '../lib/drafts'

const lenses = [
  { name: 'Movement', water: 'Who uses this waterway, and how might their routes change with the seasons?', mountain: 'What might a changing decoration pattern suggest about exchange?', limit: 'A mapped route and a pottery pattern offer different kinds of evidence. Neither tells us why people moved.' },
  { name: 'Continuity', water: 'What remains familiar to someone returning to the same canal?', mountain: 'Which reported decoration patterns recur across places or layers?', limit: 'A recurring pattern might reflect continuity, aggregation or incomplete observation. It needs another check.' },
  { name: 'Missing voices', water: 'Whose experience of this waterway is absent from the map?', mountain: 'What can a pottery record leave out about the people who made and used it?', limit: 'Public datasets carry partial views. People and communities can challenge the questions we bring to them.' },
]
const emptyNotes = { observation: '', interpretation: '', question: '' }

export function BridgeLab() {
  const [active, setActive] = useState(0)
  const [notes, setNotes, saved] = useDraft('atlas-field-notes-v2', emptyNotes)
  const lens = lenses[active]
  const change = (key: keyof typeof emptyNotes, value: string) => setNotes((current) => ({ ...current, [key]: value }))

  return (
    <section id="bridge" className="chapter bridge-chapter" data-chapter aria-labelledby="bridge-title">
      <div className="bridge-intro">
        <h2 id="bridge-title">What travels<br />between two places?</h2>
        <div><p lang="zh-CN" className="bridge-chinese">智者乐水，仁者乐山。</p><p>Let the Analects open a conversation about movement and persistence. The histories of Kunshan and Mandara remain their own.</p><a href="https://zh.wikisource.org/wiki/%E8%AB%96%E8%AA%9E/%E9%9B%8D%E4%B9%9F%E7%AC%AC%E5%85%AD" target="_blank" rel="noreferrer">Read the passage, Analects 6.23</a></div>
      </div>
      <div className="lens-controls" role="group" aria-label="Choose a question lens">{lenses.map((item, index) => <button type="button" key={item.name} aria-pressed={active === index} onClick={() => setActive(index)}>{item.name}</button>)}</div>
      <div className="landscape-pair">
        <figure><img src="/images/zhouzhuang.webp" alt="Boats on the Zhouzhuang canal, photographed in 2006." width="1280" height="851" loading="lazy" /><figcaption><span>Kunshan · a question for the present</span><p key={`water-${active}`} className="lens-question">{lens.water}</p></figcaption></figure>
        <figure><img src="/images/rhumsiki.webp" alt="Rhumsiki peak in the Mandara region. Regional context, not an excavation-site photograph." width="1800" height="475" loading="lazy" /><figcaption><span>Mandara · a question for the record</span><p key={`mountain-${active}`} className="lens-question">{lens.mountain}</p></figcaption></figure>
      </div>
      <p className="lens-boundary">{lens.limit} <a href="#photo-credits">Photo credits</a></p>
      <div className="field-notebook">
        <div><h3>Leave space for<br />your own noticing.</h3><p>Bring a field encounter or one inspected source into the conversation. Write in Chinese, English, or both.</p><p className="draft-status">{saved ? 'Your notes stay in this browser. Nothing is submitted.' : 'This browser cannot save your draft. Download it before leaving.'}</p></div>
        <div className="notebook-pages">
          <label>What did you actually observe?<textarea rows={3} value={notes.observation} onChange={(event) => change('observation', event.target.value)} placeholder="Name a place or a source record. Describe one detail." /></label>
          <label>What is your interpretation?<textarea rows={2} value={notes.interpretation} onChange={(event) => change('interpretation', event.target.value)} placeholder="What might it mean? Keep the uncertainty visible." /></label>
          <label>What would you ask someone there?<textarea rows={2} value={notes.question} onChange={(event) => change('question', event.target.value)} placeholder="An open question that leaves room for them to disagree." /></label>
          <button onClick={() => downloadText(`# My field note\n\nObserved: ${notes.observation}\n\nInterpreted: ${notes.interpretation}\n\nQuestion to bring back: ${notes.question}\n`, 'atlas-field-note.md', 'text/markdown')}><Download aria-hidden="true" />Save my field note</button>
        </div>
      </div>
      <a className="chapter-forward" href="#validate">Check the claim you want to make <ArrowRight aria-hidden="true" /></a>
    </section>
  )
}
