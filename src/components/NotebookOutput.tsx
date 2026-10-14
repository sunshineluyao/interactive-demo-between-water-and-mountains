import { ArrowUpRight, CloudDownload, Play } from 'lucide-react'
import manifest from '../../public/notebooks/manifest.json'

declare global {
  interface Window {
    __ATLAS_NOTEBOOK_PREVIEWS__?: Record<string, string>
    __ATLAS_NOTEBOOK_FILES__?: Record<string, string>
  }
}

const names = { interaction: 'INFOSCI301_Interaction_Design_Companion.ipynb', color: 'INFOSCI301_Color_Palette_Accessibility_Studio.ipynb' }
export function NotebookOutput({ kind, anchor = '' }: { kind: 'interaction' | 'color'; anchor?: string }) {
  const notebook = names[kind]
  const lesson = manifest.lessons.find(item => item.notebook === notebook)
  if (!lesson) return <p role="status">Saved result unavailable. Run the notebook in Colab.</p>
  const preview = window.__ATLAS_NOTEBOOK_PREVIEWS__?.[lesson.preview] ?? `/notebooks/${lesson.preview}`
  const fileUrl = (path: string) => window.__ATLAS_NOTEBOOK_FILES__?.[path] ?? path
  const colab = `https://colab.research.google.com/github/sunshineluyao/interactive-demo-between-water-and-mountains/blob/main/notebooks/${notebook}`
  return <section className="saved-notebook-output" aria-label={`Saved ${kind} notebook output`}>
    <header><div><span>Saved execution · 13 October 2026</span><strong>{lesson.code_cells} Python cells · {lesson.figures} saved figures</strong></div><a href={preview} target="_blank" rel="noreferrer">Read full output <ArrowUpRight aria-hidden="true" /></a></header>
    <p>Generated from the matching notebook. Python widgets require Colab. Browser renderers may need internet; the static counterparts retain the same evidence.</p>
    <iframe key={`${kind}-${anchor}`} title={`Executed ${kind} notebook results`} src={`${preview}${anchor ? '#' + anchor : ''}`} loading="lazy" sandbox="allow-scripts allow-downloads allow-popups" />
    <div className="colab-actions"><a href={colab} target="_blank" rel="noreferrer"><Play aria-hidden="true" /> Open in Colab</a><a href={fileUrl(`/notebooks/${notebook}`)} download={notebook}><CloudDownload aria-hidden="true" /> Download matching notebook</a><a href={fileUrl(`/notebooks/${lesson.bundle}`)} download={`INFOSCI301_${kind}_saved_assets.zip`}><CloudDownload aria-hidden="true" /> Figures and source records</a></div>
    <details><summary>Source and execution record</summary><p>SHA-256: <code>{lesson.sha256}</code></p><p>{lesson.execution.method}. Optional packages and end-to-end Colab gestures retain their stated limits.</p></details>
  </section>
}
