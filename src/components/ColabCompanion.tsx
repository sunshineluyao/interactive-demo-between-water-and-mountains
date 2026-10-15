import { NotebookOutput } from './NotebookOutput'
import { notebookSourceRef } from '../notebookSource'
import { ArrowUpRight, BookOpenCheck, CloudDownload, Play } from 'lucide-react'
import { useState } from 'react'

const colabUrl = `https://colab.research.google.com/github/sunshineluyao/interactive-demo-between-water-and-mountains/blob/${encodeURIComponent(notebookSourceRef)}/notebooks/INFOSCI301_Interaction_Design_Companion.ipynb`
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

export function ColabCompanion() {
  const [active, setActive] = useState(0)
  const step = notebookSteps[active]
  const anchors = ['interaction-original-07','interaction-original-09','interaction-original-11','interaction-original-13','interaction-original-15','interaction-original-17','interaction-original-19','interaction-original-22']
  return (
    <section id="colab-companion" className="colab-companion" aria-labelledby="colab-title">
      <div className="tutorial-section-heading"><div><BookOpenCheck aria-hidden="true" /><span>06 · Rebuild in Colab</span></div><h3 id="colab-title">Rebuild every pattern with the real teaching snapshots.</h3><p>The redesigned notebook is a bilingual interactive studio—not a static code appendix. Its four complementary libraries make location, selection, change, coordination, authorship, and validation directly testable.</p></div>
      <div className="notebook-stack" aria-label="Interactive notebook package stack"><span><b>Plotly</b> animated globe + time</span><span><b>pydeck</b> GPU spatial layers</span><span><b>Altair</b> linked selections</span><span><b>ipywidgets</b> decisions + authoring</span></div>
      <div className="notebook-embed">
        <nav aria-label="Notebook tutorial steps">{notebookSteps.map((item, index) => <button key={item.number} type="button" aria-pressed={active === index} onClick={() => setActive(index)}><span>{item.number}</span><strong>{item.label}</strong></button>)}</nav>
        <article key={step.number}>
          <header><span>Learning cell {step.number}</span><h4>{step.title}</h4><strong lang="zh-CN">{step.titleZh}</strong><p>{step.objective}</p><div className="notebook-packages">{step.packages.map((item) => <i key={item}>{item}</i>)}</div></header>
          <NotebookOutput kind="interaction" anchor={anchors[active]} />
          <div className="notebook-code"><span><i /><i /><i /> Python</span><pre><code>{step.code}</code></pre></div>
          <div className="notebook-output"><Play aria-hidden="true" /><div><strong>What the output should teach</strong><p>{step.output}</p></div></div>
        </article>
      </div>
      <div className="colab-actions"><a className="colab-primary" href={colabUrl} target="_blank" rel="noreferrer"><Play aria-hidden="true" /> Open executable notebook in Colab <ArrowUpRight aria-hidden="true" /></a><a href={notebookDownloadUrl} download="INFOSCI301_Interaction_Design_Companion.ipynb"><CloudDownload aria-hidden="true" /> Download .ipynb</a></div>
      <p className="colab-boundary">The notebook uses the same checksum-verified bundled OpenStreetMap, NASA POWER, and Mandara teaching snapshots used here. It labels schematic, observed, derived, inferred, and interpretive content separately; no result is uploaded automatically.</p>
    </section>
  )
}
