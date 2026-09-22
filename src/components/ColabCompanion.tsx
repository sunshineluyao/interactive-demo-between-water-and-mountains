import { ArrowUpRight, BookOpenCheck, CloudDownload, Play, Sparkles } from 'lucide-react'
import { useState } from 'react'

const colabUrl = 'https://colab.research.google.com/github/sunshineluyao/interactive-demo-between-water-and-mountains/blob/main/notebooks/INFOSCI301_Interaction_Design_Companion.ipynb'
const notebookDownloadUrl = '/notebooks/INFOSCI301_Interaction_Design_Companion.ipynb'

type VisualKind = 'globe' | 'map' | 'matrix' | 'timeline' | 'brush' | 'decision' | 'card' | 'validation'

const notebookSteps: Array<{
  number: string
  label: string
  title: string
  titleZh: string
  objective: string
  packages: string[]
  code: string
  output: string
  visual: VisualKind
}> = [
  {
    number: '01', label: 'Orient', title: 'Put both places on an interactive globe', titleZh: '在交互式地球仪上定位两地',
    objective: 'Rotate, zoom, hover, and switch projections while keeping the comparison arc explicitly schematic.',
    packages: ['Plotly', 'Pandas'], visual: 'globe',
    code: `go.Scattergeo(
  lon=places.lon, lat=places.lat,
  mode="markers+text",
  hovertemplate="%{customdata}"
)
globe.update_geos(
  projection_type="orthographic"
)`,
    output: 'Location becomes inspectable; the dotted arc remains a course question, not a historical route.',
  },
  {
    number: '02', label: 'Inspect', title: 'Tilt through the mapped waterway layer', titleZh: '倾斜查看真实水系图层',
    objective: 'Pan, rotate, zoom, and hover over the bundled OpenStreetMap geometries in a pitched spatial view.',
    packages: ['pydeck', 'GeoJSON'], visual: 'map',
    code: `pdk.Layer(
  "PathLayer", paths,
  get_path="path",
  get_color="color",
  pickable=True,
  auto_highlight=True
)`,
    output: 'The 3D view reveals mapped spatial density; color still describes tags—not flow or water quality.',
  },
  {
    number: '03', label: 'Select', title: 'Select a CP label and reveal its context', titleZh: '选择 CP 标识并揭示其语境',
    objective: 'Use linked selection to highlight a model identifier without turning CP numbers into names or chronology.',
    packages: ['Altair', 'Vega-Lite'], visual: 'matrix',
    code: `pick = alt.selection_point(
  fields=["CP"], on="click",
  clear="dblclick"
)
matrix.add_params(pick)
detail.transform_filter(pick)`,
    output: 'One selection updates both the matrix and its contextual detail while the evidence boundary stays visible.',
  },
  {
    number: '04', label: 'Change', title: 'Change time without moving the baseline', titleZh: '改变时间，但保持比较基准',
    objective: 'Use a bilingual month control with a responsive chart while keeping units, source, and y-scale stable.',
    packages: ['Plotly', 'ipywidgets'], visual: 'timeline',
    code: `month = widgets.SelectionSlider(
  options=month_names,
  description="Month / 月份"
)
month.observe(draw_month,
              names="value")`,
    output: 'The result changes one parameter at a time, making before/after readings directly comparable.',
  },
  {
    number: '05', label: 'Coordinate', title: 'Brush an overview and update its detail', titleZh: '框选概览并联动更新详情',
    objective: 'Drag an interval across the overview; a shared selection filters the larger detail view and can be cleared.',
    packages: ['Altair', 'Vega-Lite'], visual: 'brush',
    code: `brush = alt.selection_interval(
  encodings=["x"]
)
overview.add_params(brush)
detail.transform_filter(brush)`,
    output: 'Overview and detail share state, so the reader keeps context while inspecting a smaller time window.',
  },
  {
    number: '06', label: 'Decide', title: 'Navigate four bounded design decisions', titleZh: '导航四层有限设计决策',
    objective: 'Choose among three options at each layer and receive an interaction recommendation plus a falsifiable test.',
    packages: ['ipywidgets', 'HTML'], visual: 'decision',
    code: `widgets.ToggleButtons(
  options=three_choices,
  description="Task / 任务"
)
render_decision(path,
                next_test)`,
    output: 'The navigator returns a reasoned design path—not a decorative menu of effects.',
  },
  {
    number: '07', label: 'Author', title: 'Build an inspectable evidence card', titleZh: '生成可检查的证据卡',
    objective: 'Keep observation, interpretation, evidence boundary, and next check separate and editable.',
    packages: ['ipywidgets', 'JSON'], visual: 'card',
    code: `fields = widgets.VBox([
  observed, interpreted,
  boundary, next_check
])
make_card.on_click(render_card)`,
    output: 'The result preserves a bilingual reasoning trace without uploading or automatically submitting anything.',
  },
  {
    number: '08', label: 'Validate', title: 'Test the result at four levels', titleZh: '在四个层级检验结果',
    objective: 'Move from domain and community through data, idiom, and algorithm before making a public claim.',
    packages: ['Munzner', 'Studio test'], visual: 'validation',
    code: `validation = [
  "domain + community",
  "data + task", "idiom",
  "algorithm"
]
record(next_test)`,
    output: 'A peer can see what was checked, what remains uncertain, and what could change the conclusion.',
  },
]

function MiniResult({ kind }: { kind: VisualKind }) {
  if (kind === 'globe') return <svg className="mini-globe" viewBox="0 0 460 230" role="img" aria-label="Preview of an interactive globe with Kunshan and the Mandara region"><defs><radialGradient id="miniEarth" cx="35%" cy="30%"><stop offset="0" stopColor="#2e7180" /><stop offset="1" stopColor="#0b2b35" /></radialGradient></defs><circle cx="230" cy="116" r="83" fill="url(#miniEarth)" stroke="#69d9df" strokeOpacity=".55" /><ellipse cx="230" cy="116" rx="83" ry="24" fill="none" stroke="#d8f3f4" strokeOpacity=".25" /><ellipse cx="230" cy="116" rx="32" ry="83" fill="none" stroke="#d8f3f4" strokeOpacity=".23" /><path d="M180 95 Q232 31 292 123" fill="none" stroke="#f2c078" strokeWidth="2" strokeDasharray="5 5" /><circle cx="180" cy="95" r="8" fill="#69d9df" /><circle cx="292" cy="123" r="8" fill="#ff8a5c" /><text x="71" y="89">Kunshan · 昆山</text><text x="310" y="143">Mandara</text></svg>
  if (kind === 'map') return <svg className="mini-map" viewBox="0 0 460 230" role="img" aria-label="Preview of a tilted interactive waterway map"><path d="M38 170 C92 138 125 159 174 91 S254 55 296 119 S374 170 425 74" /><path d="M44 135 C103 97 138 126 196 63 S294 99 331 54 S393 51 432 91" /><path d="M70 194 C125 160 166 192 218 139 S325 140 395 99" /><circle cx="286" cy="116" r="9" /><text x="300" y="112">Kunshan · 昆山</text></svg>
  if (kind === 'matrix') return <div className="mini-matrix" role="img" aria-label="Preview of a selectable CP matrix">{Array.from({ length: 40 }, (_, index) => <i key={index} className={index % 9 === 0 || index === 22 ? 'is-strong' : index % 5 === 0 ? 'is-mid' : undefined} />)}<span className="matrix-cursor">CP8</span></div>
  if (kind === 'timeline') return <div className="mini-timeline" role="img" aria-label="Preview of a month-controlled rainfall chart"><svg viewBox="0 0 460 180"><path d="M22 149 L54 125 L86 139 L118 93 L150 112 L182 52 L214 82 L246 39 L278 71 L310 58 L342 105 L374 79 L438 128" /><circle cx="246" cy="39" r="7" /></svg><div><span>Jan / 1月</span><i /><strong>Jul / 7月</strong></div></div>
  if (kind === 'brush') return <div className="mini-brush" role="img" aria-label="Preview of linked overview and detail charts"><svg viewBox="0 0 460 115"><polyline points="12,86 48,74 84,89 120,43 156,57 192,28 228,69 264,39 300,54 336,31 372,75 448,46" /><rect x="152" y="12" width="164" height="88" /></svg><svg viewBox="0 0 460 70"><polyline points="12,57 48,52 84,61 120,37 156,44 192,21 228,49 264,29 300,41 336,25 372,54 448,38" /><rect x="152" y="8" width="164" height="54" /></svg></div>
  if (kind === 'decision') return <div className="mini-decision" role="img" aria-label="Preview of a four-layer design decision path"><span>Question<br />问题</span><b>→</b><span>Evidence<br />证据</span><b>→</b><span>Task<br />任务</span><b>→</b><span>Interaction<br />交互</span></div>
  if (kind === 'card') return <div className="mini-card-grid" role="img" aria-label="Preview of a four-part evidence card"><span>Observed<br /><b>观察</b></span><span>Interpretation<br /><b>解释</b></span><span>Boundary<br /><b>边界</b></span><span>Next test<br /><b>检验</b></span></div>
  return <div className="mini-validation" role="img" aria-label="Preview of four validation levels">{['Domain + community\n领域与社区', 'Data + task\n数据与任务', 'Idiom\n视觉表达', 'Algorithm\n算法'].map((label, index) => <span key={label}><i>{index + 1}</i>{label}</span>)}</div>
}

export function ColabCompanion() {
  const [active, setActive] = useState(0)
  const step = notebookSteps[active]
  return (
    <section className="colab-companion" aria-labelledby="colab-title">
      <div className="tutorial-section-heading"><div><BookOpenCheck aria-hidden="true" /><span>Embedded Colab companion</span></div><h3 id="colab-title">Rebuild every pattern with the real teaching snapshots.</h3><p>The redesigned notebook is a bilingual interactive studio—not a static code appendix. Its four complementary libraries make location, selection, change, coordination, authorship, and validation directly testable.</p></div>
      <div className="notebook-stack" aria-label="Interactive notebook package stack"><span><b>Plotly</b> animated globe + time</span><span><b>pydeck</b> GPU spatial layers</span><span><b>Altair</b> linked selections</span><span><b>ipywidgets</b> decisions + authoring</span></div>
      <div className="notebook-embed">
        <nav aria-label="Notebook tutorial steps">{notebookSteps.map((item, index) => <button key={item.number} type="button" aria-pressed={active === index} onClick={() => setActive(index)}><span>{item.number}</span><strong>{item.label}</strong></button>)}</nav>
        <article key={step.number}>
          <header><span>Learning cell {step.number}</span><h4>{step.title}</h4><strong lang="zh-CN">{step.titleZh}</strong><p>{step.objective}</p><div className="notebook-packages">{step.packages.map((item) => <i key={item}>{item}</i>)}</div></header>
          <div className="notebook-result"><div><Sparkles aria-hidden="true" /><span>Live result preview · 实时结果预览</span></div><MiniResult kind={step.visual} /></div>
          <div className="notebook-code"><span><i /><i /><i /> Python</span><pre><code>{step.code}</code></pre></div>
          <div className="notebook-output"><Play aria-hidden="true" /><div><strong>What the output should teach</strong><p>{step.output}</p></div></div>
        </article>
      </div>
      <div className="colab-actions"><a className="colab-primary" href={colabUrl} target="_blank" rel="noreferrer"><Play aria-hidden="true" /> Open executable notebook in Colab <ArrowUpRight aria-hidden="true" /></a><a href={notebookDownloadUrl} download="INFOSCI301_Interaction_Design_Companion.ipynb"><CloudDownload aria-hidden="true" /> Download .ipynb</a></div>
      <p className="colab-boundary">The notebook loads the same versioned OpenStreetMap, NASA POWER, and Mandara teaching snapshots used here. It labels schematic, observed, derived, inferred, and interpretive content separately; no result is uploaded automatically.</p>
    </section>
  )
}
