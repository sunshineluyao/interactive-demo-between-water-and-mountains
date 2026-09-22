import { ArrowUpRight, CheckCircle2, Clipboard, Download, Globe2, HeartHandshake, Send } from 'lucide-react'
import { useMemo, useState } from 'react'
import { downloadText, useDraft } from '../lib/drafts'
import { getQuestionLens, type QuestionLensId } from '../lib/communityQuestions'

type Claim = {
  title: string
  members: string
  strengths: string
  localRelationship: string
  sdg: string
  openScience: string
  observation: string
  inference: string
  sources: string
  idioms: string
  permission: string
  nextCheck: string
}

const initialClaim: Claim = {
  title: '', members: '', strengths: '', localRelationship: '', sdg: '', openScience: '', observation: '', inference: '',
  sources: 'OpenStreetMap waterways; NASA POWER precipitation; tDAR Ceramic dataset / paper-derived teaching layer',
  idioms: 'Basic: ______. Network addition: ______. Spatiotemporal addition: ______.',
  permission: '', nextCheck: '',
}

export function FieldReturn({ activeLens }: { activeLens: QuestionLensId }) {
  const [claim, setClaim, saved] = useDraft('atlas-team-claim-v2', initialClaim)
  const [status, setStatus] = useState('')
  const lens = getQuestionLens(activeLens)

  const post = useMemo(() => `# ${claim.title || '[Project title]'}

**Team members:** ${claim.members || '[names]'}  
**Strengths each member contributes:** ${claim.strengths || '[member → strength]'}

## Contribution
- **SDG contribution:** ${claim.sdg || '[specific goal and contribution]'}
- **Potential local community relationship:** ${claim.localRelationship || '[who might care, pending validation]'}
- **Open-science contribution:** ${claim.openScience || '[data / code / documentation / accessibility commitment]'}

## Evidence boundary
- **Question lens:** ${lens.name} / ${lens.nameZh}
- **Kunshan question:** ${lens.water}
- **Mandara question:** ${lens.mountain}
- **Comparison boundary:** ${lens.limit}
- **Observed:** ${claim.observation || '[what the source or field encounter actually shows]'}
- **Interpreted:** ${claim.inference || '[your provisional interpretation]'}
- **Data sources:** ${claim.sources}
- **Permission / voice still needed:** ${claim.permission || '[whose view or consent is missing]'}

## Design
${claim.idioms}

## Next validation
${claim.nextCheck || '[one test, one person or group, and what could change]'}
`, [claim, lens])

  const update = (key: keyof Claim, value: string) => setClaim((current) => ({ ...current, [key]: value }))
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(post)
      setStatus('Copied. You can now paste this into Ed Discussion.')
    } catch {
      downloadText(post, 'infosci301-team-claim.md', 'text/markdown')
      setStatus('Clipboard unavailable. Your post was saved as a Markdown file instead.')
    }
  }
  const download = () => {
    downloadText(post, 'infosci301-team-claim.md', 'text/markdown')
    setStatus('Post saved as a Markdown file.')
  }
  const bringNotes = () => {
    try {
      const raw = localStorage.getItem('atlas-field-notes-v2')
      const notes = raw ? JSON.parse(raw) : null
      if (!notes || !(notes.observation || notes.interpretation || notes.question)) { setStatus('Write a field note in “Build the bridge” first.'); return }
      setClaim((current) => ({ ...current, observation: current.observation || notes.observation || '', inference: current.inference || notes.interpretation || '', nextCheck: current.nextCheck || notes.question || '' }))
      setStatus('Your field note filled the empty evidence fields. Existing writing was kept.')
    } catch { setStatus('The field note could not be read. You can enter your observations here.') }
  }

  return (
    <section id="return" className="chapter return-chapter" data-chapter>
      <div className="chapter-heading return-heading">
        <h2>Bring the question<br />back to Kunshan.</h2>
        <p>
          Community-based learning begins with a potential relationship, not a promised impact. Separate what you
          noticed from what you inferred; seek permission; test usefulness; revise with people rather than for them.
        </p>
      </div>

      <div className="return-layout">
        <div className="claim-builder">
          <div className="claim-header"><Send aria-hidden="true" /><h3>Prepare the team-claim post</h3></div>
          <p className="draft-status">{saved ? 'Draft saved on this device. Copy or download when you are ready to share.' : 'Draft storage is unavailable. Download before leaving this page.'}</p>

          <fieldset>
            <legend>01 · Team identity</legend>
            <label>Project title<input value={claim.title} onChange={(event) => update('title', event.target.value)} placeholder="A question, not a slogan" /></label>
            <label>Team members<input value={claim.members} onChange={(event) => update('members', event.target.value)} placeholder="Names" /></label>
            <label className="wide">Strength each member contributes<textarea value={claim.strengths} onChange={(event) => update('strengths', event.target.value)} rows={2} placeholder="Name → domain, data, design, coding, community listening…" /></label>
          </fieldset>

          <fieldset>
            <legend>02 · Contribution</legend>
            <label>SDG contribution<input value={claim.sdg} onChange={(event) => update('sdg', event.target.value)} placeholder="Which goal, for whom, and how?" /></label>
            <label>Potential local relationship<input value={claim.localRelationship} onChange={(event) => update('localRelationship', event.target.value)} placeholder="Community / museum / learner / practitioner" /></label>
            <label className="wide">Open-science contribution<textarea value={claim.openScience} onChange={(event) => update('openScience', event.target.value)} rows={2} placeholder="What can be shared responsibly, in what format, under what license?" /></label>
          </fieldset>

          <fieldset>
            <legend>03 · Evidence + design</legend>
            <button className="wide" type="button" onClick={bringNotes}>Bring in my field note</button>
            <label>Observed<textarea value={claim.observation} onChange={(event) => update('observation', event.target.value)} rows={2} placeholder="A field note, source record or measured pattern" /></label>
            <label>Interpreted<textarea value={claim.inference} onChange={(event) => update('inference', event.target.value)} rows={2} placeholder="A provisional meaning—not yet a fact" /></label>
            <label className="wide">Data sources and URLs<textarea value={claim.sources} onChange={(event) => update('sources', event.target.value)} rows={2} /></label>
            <label className="wide">Basic, network and spatiotemporal ideas<textarea value={claim.idioms} onChange={(event) => update('idioms', event.target.value)} rows={3} /></label>
            <label>Permission / voice missing<textarea value={claim.permission} onChange={(event) => update('permission', event.target.value)} rows={2} /></label>
            <label>Next validation<textarea value={claim.nextCheck} onChange={(event) => update('nextCheck', event.target.value)} rows={2} /></label>
          </fieldset>

          <div className="claim-actions">
            <button type="button" onClick={copy}><Clipboard aria-hidden="true" /> Copy for Ed Discussion</button>
            <button type="button" onClick={download}><Download /> Download .md</button>
          </div>
          <p role="status">{status}</p>
          <details className="post-preview"><summary>Preview the post</summary><pre>{post}</pre></details>
        </div>

        <aside className="return-manifesto">
          <Globe2 aria-hidden="true" />
          <h3>Evidence stewards, visual translators and responsible collaborators.</h3>
          <ul>
            <li><CheckCircle2 /> They can trace a public claim to a source and transformation.</li>
            <li><CheckCircle2 /> They can design motion that explains rather than decorates.</li>
            <li><CheckCircle2 /> They can name uncertainty, absence and limits without hiding them.</li>
            <li><CheckCircle2 /> They can invite local knowledge without extracting or speaking for others.</li>
          </ul>
          <div className="return-commitment">
            <HeartHandshake aria-hidden="true" />
            <p>Return a bilingual prototype or evidence card for review. Ask what is useful, what is wrong and what should not be public.</p>
          </div>
        </aside>
      </div>

      <footer className="source-ledger">
        <div><span>Mandara paper</span><a href="https://arxiv.org/abs/1511.05185" target="_blank" rel="noreferrer">arXiv 1511.05185 <ArrowUpRight /></a></div>
        <div><span>Mandara data</span><a href="https://doi.org/10.6067/XCV83F4R7D" target="_blank" rel="noreferrer">tDAR DOI <ArrowUpRight /></a></div>
        <div><span>Kunshan waterways</span><a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OSM / ODbL <ArrowUpRight /></a></div>
        <div><span>Kunshan precipitation</span><a href="https://power.larc.nasa.gov/docs/services/api/temporal/monthly/" target="_blank" rel="noreferrer">NASA POWER docs <ArrowUpRight /></a></div>
      </footer>
    </section>
  )
}
