import { ArrowRight, MessageCircleQuestion } from 'lucide-react'
import { communityQuestionLenses, type QuestionLensId } from '../lib/communityQuestions'

export function QuestionLensIntro({ activeLens, onChange }: { activeLens: QuestionLensId; onChange: (lens: QuestionLensId) => void }) {
  const lens = communityQuestionLenses.find((item) => item.id === activeLens) ?? communityQuestionLenses[0]
  return (
    <section id="questions" className="chapter questions-chapter" data-chapter aria-labelledby="questions-title">
      <div className="questions-heading"><div><span>Start with people, not controls</span><h2 id="questions-title">Choose the question<br />you will carry.</h2></div><p>A useful interaction begins with something a person needs to notice, compare, challenge, or explain. Choose one lens now; the atlas will bring it back after you inspect the evidence.</p></div>
      <div className="question-lens-controls" role="group" aria-label="Choose a community question lens">{communityQuestionLenses.map((item) => <button type="button" key={item.id} aria-pressed={activeLens === item.id} onClick={() => onChange(item.id)}><span lang="zh-CN">{item.nameZh}</span><strong>{item.name}</strong></button>)}</div>
      <div className="question-stage" key={lens.id}>
        <div className="question-purpose"><MessageCircleQuestion aria-hidden="true" /><span>{lens.name} lens · {lens.nameZh}</span><p>{lens.purpose}</p></div>
        <div className="question-place-grid">
          <figure><img src="/images/zhouzhuang.webp" alt="Boats and homes along a canal in Zhouzhuang, Kunshan." width="1280" height="851" fetchPriority="high" /><figcaption><span>Kunshan · question for the present</span><p>{lens.water}</p></figcaption></figure>
          <figure><img src="/images/rhumsiki.webp" alt="Rhumsiki peak in the wider Mandara region of Cameroon; this is regional context, not an excavation site." width="1800" height="475" /><figcaption><span>Mandara · Rhumsiki regional view, not an excavation site</span><p>{lens.mountain}</p></figcaption></figure>
        </div>
        <div className="question-boundary"><strong>Evidence boundary</strong><p>{lens.limit}</p><span>Suggested interaction lenses: {lens.recommendedPatterns.join(' + ')}</span></div>
      </div>
      <a className="chapter-forward" href="#tutorial"><span>Your lens stays selected</span> Learn which interaction can answer it <ArrowRight aria-hidden="true" /></a>
    </section>
  )
}
