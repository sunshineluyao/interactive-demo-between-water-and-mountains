import { ArrowRight, Download } from 'lucide-react'
import { useDraft, downloadText } from '../lib/drafts'
import { communityQuestionLenses, getQuestionLens, type QuestionLensId } from '../lib/communityQuestions'

const emptyNotes = { observation: '', interpretation: '', question: '' }

export function BridgeLab({ activeLens, onChangeLens }: { activeLens: QuestionLensId; onChangeLens: (lens: QuestionLensId) => void }) {
  const [notes, setNotes, saved] = useDraft('atlas-field-notes-v2', emptyNotes)
  const lens = getQuestionLens(activeLens)
  const change = (key: keyof typeof emptyNotes, value: string) => setNotes((current) => ({ ...current, [key]: value }))

  return (
    <section id="bridge" className="chapter bridge-chapter" data-chapter aria-labelledby="bridge-title">
      <div className="bridge-intro">
        <h2 id="bridge-title">What changed<br />after the evidence?</h2>
        <div><p className="bridge-chinese"><span lang="zh-Hant">知者樂水，仁者樂山。</span><span>“The wise delight in water; the humane delight in mountains.”</span></p><p>Revisit the lens you chose near the top. Keep it, change it, or make it more careful after inspecting the sources. The histories of Kunshan and Mandara remain their own.</p><a href="https://zh.wikisource.org/wiki/%E8%AB%96%E8%AA%9E/%E9%9B%8D%E4%B9%9F%E7%AC%AC%E5%85%AD" target="_blank" rel="noreferrer">Chinese source · Yong Ye (numbering varies by edition)</a></div>
      </div>
      <div className="lens-controls" role="group" aria-label="Revisit the community question lens">{communityQuestionLenses.map((item) => <button type="button" key={item.id} aria-pressed={activeLens === item.id} onClick={() => onChangeLens(item.id)}>{item.name}</button>)}</div>
      <div className="landscape-pair">
        <figure><img src="/images/zhouzhuang.webp" alt="Boats on the Zhouzhuang canal, photographed in 2006." width="1280" height="851" loading="lazy" /><figcaption><span>Kunshan · a question for the present</span><p key={`water-${activeLens}`} className="lens-question">{lens.water}</p></figcaption></figure>
        <figure><img src="/images/rhumsiki.webp" alt="Rhumsiki peak in the Mandara region. Regional context, not an excavation-site photograph." width="1800" height="475" loading="lazy" /><figcaption><span>Mandara · a question for the record</span><p key={`mountain-${activeLens}`} className="lens-question">{lens.mountain}</p></figcaption></figure>
      </div>
      <p className="lens-boundary">{lens.limit} <a href="#photo-credits">Photo credits</a></p>
      <div className="field-notebook">
        <div><h3>Leave space for<br />your own noticing.</h3><p>Bring a field encounter or one inspected source into the conversation. Write in Chinese, English, or both.</p><p className="draft-status">{saved ? 'Your notes stay in this browser. Nothing is submitted.' : 'This browser cannot save your draft. Download it before leaving.'}</p></div>
        <div className="notebook-pages">
          <label>What did you actually observe?<textarea rows={3} value={notes.observation} onChange={(event) => change('observation', event.target.value)} placeholder="Name a place or a source record. Describe one detail." /></label>
          <label>What is your interpretation?<textarea rows={2} value={notes.interpretation} onChange={(event) => change('interpretation', event.target.value)} placeholder="What might it mean? Keep the uncertainty visible." /></label>
          <label>What would you ask someone there?<textarea rows={2} value={notes.question} onChange={(event) => change('question', event.target.value)} placeholder="An open question that leaves room for them to disagree." /></label>
          <button onClick={() => downloadText(`# My field note\n\nQuestion lens: ${lens.name} / ${lens.nameZh}\n\nKunshan prompt: ${lens.water}\n\nMandara prompt: ${lens.mountain}\n\nEvidence boundary: ${lens.limit}\n\nObserved: ${notes.observation}\n\nInterpreted: ${notes.interpretation}\n\nQuestion to bring back: ${notes.question}\n`, 'atlas-field-note.md', 'text/markdown')}><Download aria-hidden="true" />Save my field note</button>
        </div>
      </div>
      <a className="chapter-forward" href="#validate">Check the claim you want to make <ArrowRight aria-hidden="true" /></a>
    </section>
  )
}
