import { ArrowUpRight, BookOpenCheck, CloudDownload, Play } from 'lucide-react'
import { useState } from 'react'

const colabUrl = 'https://colab.research.google.com/github/sunshineluyao/interactive-demo-between-water-and-mountains/blob/main/notebooks/INFOSCI301_Interaction_Design_Companion.ipynb'
const notebookDownloadUrl = '/notebooks/INFOSCI301_Interaction_Design_Companion.ipynb'

const notebookSteps = [
  {
    number: '01',
    label: 'Orient',
    title: 'Put both places on an interactive globe',
    objective: 'Rotate the globe, inspect exact coordinates, and distinguish regional orientation from excavation-site location.',
    code: `places = pd.DataFrame([
  {"place": "Kunshan", "lat": 31.39, "lon": 120.98},
  {"place": "Mandara study region", "lat": 11.0, "lon": 14.0}
])

fig.update_geos(projection_type="orthographic")`,
    output: 'Changing the globe view teaches location; it does not imply a historical connection.',
  },
  {
    number: '02',
    label: 'Select',
    title: 'Select a CP label and expose its meaning',
    objective: 'Use an Altair point selection to highlight a model identifier while keeping the evidence boundary visible.',
    code: `pick = alt.selection_point(fields=["CP"])
chart = base.add_params(pick).encode(
  opacity=alt.condition(pick, alt.value(1), alt.value(.18)),
  tooltip=["group", "CP", "status"]
)`,
    output: 'Selection reveals a record and its status; CP numbers remain identifiers, not names or chronology.',
  },
  {
    number: '03',
    label: 'Change',
    title: 'Change time without moving the baseline',
    objective: 'Bind a month parameter to the real NASA POWER snapshot and preserve stable units and scale.',
    code: `month = alt.param(value=1, bind=alt.binding_range(min=1, max=12, step=1))
detail = rainfall.add_params(month).transform_filter(
  alt.datum.month == month
)`,
    output: 'The chosen month changes; units, source, and the wider time series stay available for comparison.',
  },
  {
    number: '04',
    label: 'Coordinate',
    title: 'Brush an overview and update a detail view',
    objective: 'Link an interval selection across views and compare it with a simple filter or aggregation.',
    code: `brush = alt.selection_interval(encodings=["x"])
overview = series.add_params(brush)
detail = series.transform_filter(brush)
overview & detail`,
    output: 'One shared state coordinates two views; the reader can still clear the selection and recover.',
  },
  {
    number: '05',
    label: 'Author',
    title: 'Keep observation, interpretation, and limitation separate',
    objective: 'Use an evidence-card widget inspired by authoring research while keeping every field inspectable and editable.',
    code: `observed = widgets.Textarea(description="Observed:")
interpreted = widgets.Textarea(description="Interpreted:")
boundary = widgets.Textarea(description="Boundary:")

display(widgets.VBox([
  observed, interpreted, boundary, make_card
]))`,
    output: 'Authoring preserves a reasoning trace; it does not make the interpretation true or submit anything automatically.',
  },
  {
    number: '06',
    label: 'Validate',
    title: 'Turn a visual idea into a testable design path',
    objective: 'Use the same three-choice decision layers as the embedded design tree, then write one falsifiable next test.',
    code: `design_path(
  question="trace change",
  evidence="space + time",
  task="compare",
  interaction="filter + change"
)`,
    output: 'The notebook returns a recommended idiom, evidence boundary, and a test—not a decorative effect list.',
  },
]

export function ColabCompanion() {
  const [active, setActive] = useState(0)
  const step = notebookSteps[active]
  return (
    <section className="colab-companion" aria-labelledby="colab-title">
      <div className="tutorial-section-heading"><div><BookOpenCheck aria-hidden="true" /><span>Embedded Colab companion</span></div><h3 id="colab-title">Rebuild every pattern with the real teaching snapshots.</h3><p>The guide below previews the executable notebook inside the story. Open it in Google Colab for live Python outputs, or download the versioned notebook and run it elsewhere.</p></div>
      <div className="notebook-embed">
        <nav aria-label="Notebook tutorial steps">{notebookSteps.map((item, index) => <button key={item.number} type="button" aria-pressed={active === index} onClick={() => setActive(index)}><span>{item.number}</span><strong>{item.label}</strong></button>)}</nav>
        <article key={step.number}>
          <header><span>Learning cell {step.number}</span><h4>{step.title}</h4><p>{step.objective}</p></header>
          <div className="notebook-code"><span><i /><i /><i /> Python</span><pre><code>{step.code}</code></pre></div>
          <div className="notebook-output"><Play aria-hidden="true" /><div><strong>What the output should teach</strong><p>{step.output}</p></div></div>
        </article>
      </div>
      <div className="colab-actions"><a className="colab-primary" href={colabUrl} target="_blank" rel="noreferrer"><Play aria-hidden="true" /> Open executable notebook in Colab <ArrowUpRight aria-hidden="true" /></a><a href={notebookDownloadUrl} download="INFOSCI301_Interaction_Design_Companion.ipynb"><CloudDownload aria-hidden="true" /> Download .ipynb</a></div>
      <p className="colab-boundary">The notebook loads the same OpenStreetMap, NASA POWER, and Mandara teaching snapshots used here. It labels schematic, observed, derived, and inferred content separately.</p>
    </section>
  )
}
