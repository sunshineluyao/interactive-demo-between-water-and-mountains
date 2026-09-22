import { ArrowUpRight, BookMarked, Database, Image as ImageIcon } from 'lucide-react'
import type { ReactNode } from 'react'

type Reference = {
  key: string
  citation: ReactNode
  note?: string
}

const theoryReferences: Reference[] = [
  {
    key: 'munzner-book',
    citation: <>Munzner, T. (2014). <cite>Visualization analysis and design</cite>. A K Peters/CRC Press. <a href="https://doi.org/10.1201/b17511" target="_blank" rel="noreferrer">https://doi.org/10.1201/b17511</a></>,
    note: 'Primary textbook source for change, select, navigate, facet, reduce, and the four levels of validation.',
  },
  {
    key: 'munzner-slides',
    citation: <>Munzner, T. (n.d.). <cite>Visualization analysis &amp; design: Interactive views (Chapters 11–12)</cite> [Lecture slides]. Department of Computer Science, University of British Columbia. Retrieved September 22, 2026, from <a href="https://www.cs.ubc.ca/~tmm/talks/vad/VAD-interact.pdf" target="_blank" rel="noreferrer">https://www.cs.ubc.ca/~tmm/talks/vad/VAD-interact.pdf</a></>,
    note: 'Source of the five credited teaching screenshots in the tutorial.',
  },
  {
    key: 'vega-lite',
    citation: <>Satyanarayan, A., Moritz, D., Wongsuphasawat, K., &amp; Heer, J. (2017). Vega-Lite: A grammar of interactive graphics. <cite>IEEE Transactions on Visualization and Computer Graphics, 23</cite>(1), 341–350. <a href="https://doi.org/10.1109/TVCG.2016.2599030" target="_blank" rel="noreferrer">https://doi.org/10.1109/TVCG.2016.2599030</a></>,
    note: 'The brushing/linking, overview/detail, and crossfilter animations were recorded from the official Vega-Lite example family for teaching.',
  },
  {
    key: 'datatoon',
    citation: <>Kim, N. W., Henry Riche, N., Bach, B., Xu, G., Brehmer, M., Hinckley, K., Pahud, M., Xia, H., McGuffin, M. J., &amp; Pfister, H. (2019). DataToon: Drawing dynamic network comics with pen + touch interaction. In <cite>Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems</cite> (Paper 105, pp. 1–12). Association for Computing Machinery. <a href="https://doi.org/10.1145/3290605.3300335" target="_blank" rel="noreferrer">https://doi.org/10.1145/3290605.3300335</a></>,
  },
  {
    key: 'falx',
    citation: <>Wang, C., Feng, Y., Bodik, R., Dillig, I., Cheung, A., &amp; Ko, A. J. (2021). Falx: Synthesis-powered visualization authoring. In <cite>Proceedings of the 2021 CHI Conference on Human Factors in Computing Systems</cite> (Article 106, pp. 1–15). Association for Computing Machinery. <a href="https://doi.org/10.1145/3411764.3445249" target="_blank" rel="noreferrer">https://doi.org/10.1145/3411764.3445249</a></>,
  },
  {
    key: 'data-formulator',
    citation: <>Wang, C., Thompson, J., &amp; Lee, B. (2024). Data Formulator: AI-powered concept-driven visualization authoring. <cite>IEEE Transactions on Visualization and Computer Graphics, 30</cite>(1), 1128–1138. <a href="https://doi.org/10.1109/TVCG.2023.3326585" target="_blank" rel="noreferrer">https://doi.org/10.1109/TVCG.2023.3326585</a></>,
  },
  {
    key: 'mandara-paper',
    citation: <>O’Brien, J. D., Lin, K., &amp; MacEachern, S. (2015). Mixture model of pottery distributions from Lake Chad Basin archaeological sites reveals ancient segregation patterns [Preprint]. <cite>arXiv</cite>. <a href="https://doi.org/10.48550/arXiv.1511.05185" target="_blank" rel="noreferrer">https://doi.org/10.48550/arXiv.1511.05185</a></>,
    note: 'The bundled Mandara teaching layer is a qualitative transcription of statements in this paper, not its model output.',
  },
]

const dataReferences: Reference[] = [
  {
    key: 'osm',
    citation: <>OpenStreetMap contributors. (2026). <cite>Kunshan-area waterways teaching snapshot</cite> (420 simplified river, canal, and stream ways; retrieved September 20, 2026) [Data set]. OpenStreetMap. <a href="https://www.openstreetmap.org/#map=11/31.27/120.94" target="_blank" rel="noreferrer">https://www.openstreetmap.org/</a></>,
    note: 'Licensed under the Open Data Commons Open Database License (ODbL) 1.0. Completeness and tagging vary.',
  },
  {
    key: 'nasa',
    citation: <>National Aeronautics and Space Administration Langley Research Center, Prediction Of Worldwide Energy Resources Project. (2026). <cite>Kunshan monthly corrected precipitation, 2001–2025</cite> (MERRA-2; PRECTOTCORR; 31.39° N, 120.98° E; retrieved September 20, 2026) [Data set]. POWER Monthly and Annual API. <a href="https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=PRECTOTCORR&amp;community=AG&amp;longitude=120.98&amp;latitude=31.39&amp;start=2001&amp;end=2025&amp;format=JSON" target="_blank" rel="noreferrer">API response</a></>,
    note: 'Monthly mean at the source model’s resolution; not a rain gauge, flood record, river-discharge series, or water-quality measure.',
  },
  {
    key: 'tdar',
    citation: <>O’Brien, J. D., Lin, K., &amp; MacEachern, S. (2015). <cite>Ceramic dataset</cite> [Data set]. The Digital Archaeological Record. <a href="https://doi.org/10.6067/XCV83F4R7D" target="_blank" rel="noreferrer">https://doi.org/10.6067/XCV83F4R7D</a></>,
    note: 'The official record is public. The paper states that scripts and cleaned data are available under a Creative Commons license; the current DataCite rights field does not identify the exact variant.',
  },
  {
    key: 'analects',
    citation: <>Confucius. (n.d.). The Analects, Book 6 (Yong Ye), commonly numbered passage 6.23 [Classical Chinese text]. <cite>Chinese Wikisource</cite>. Retrieved September 22, 2026, from <a href="https://zh.wikisource.org/wiki/%E8%AB%96%E8%AA%9E/%E9%9B%8D%E4%B9%9F%E7%AC%AC%E5%85%AD" target="_blank" rel="noreferrer">https://zh.wikisource.org/</a></>,
    note: 'The linked Wikisource edition labels the saying 六之二一; numbering varies across editions. Used as an instructor-created question-making lens, not as an empirical variable or a cultural label for either place.',
  },
]

const mediaReferences: Reference[] = [
  {
    key: 'zhouzhuang-photo',
    citation: <>ngader. (2006). <cite>Zhouzhuang 2</cite> [Photograph]. Wikimedia Commons. <a href="https://commons.wikimedia.org/wiki/File:Zhouzhuang_2.jpg" target="_blank" rel="noreferrer">Source file</a>. CC BY 2.0.</>,
    note: 'Converted to WebP and cropped in the layout; no scene content was generated.',
  },
  {
    key: 'rhumsiki-photo',
    citation: <>naudin, k. (2006). <cite>Rhumsiki peak, North Cameroon</cite> [Photograph]. Wikimedia Commons. <a href="https://commons.wikimedia.org/wiki/File:Rhumsiki_peak,_North_Cameroon_(25989204581).jpg" target="_blank" rel="noreferrer">Source file</a>. CC BY-SA 2.0.</>,
    note: 'Converted to WebP and cropped in the layout. The adaptation retains CC BY-SA 2.0. It provides regional context, not excavation documentation.',
  },
  {
    key: 'tutorial-excerpts',
    citation: <>Tutorial teaching excerpts from Munzner (lecture slides), Kim, Henry Riche, Bach, Xu, Brehmer, Hinckley, Pahud, Xia, McGuffin, and Pfister (DataToon), Wang, Feng, Bodik, Dillig, Cheung, and Ko (Falx), and Wang, Thompson, and Lee (Data Formulator) are reproduced at reduced resolution with direct source citations for classroom reference.</>,
    note: 'These excerpts retain their original copyright and are not relicensed under the application’s MIT code license.',
  },
]

function ReferenceGroup({ icon: Icon, title, intro, references }: { icon: typeof BookMarked; title: string; intro: string; references: Reference[] }) {
  return (
    <section className="reference-group">
      <header><Icon aria-hidden="true" /><div><h3>{title}</h3><p>{intro}</p></div></header>
      <ol>
        {references.map((reference) => <li key={reference.key}><p>{reference.citation}</p>{reference.note ? <small>{reference.note}</small> : null}</li>)}
      </ol>
    </section>
  )
}

export function ReferencesLibrary() {
  return (
    <section id="references" className="references-library" aria-labelledby="references-title">
      <div className="references-intro">
        <div><span>Credits · provenance · full APA style</span><h2 id="references-title">Every claim should lead<br />back to a source.</h2></div>
        <div><p>The tutorial, research precedents, data, primary text, and media are credited here with every author listed in APA style. The application code’s MIT license does not replace any source’s own license or terms.</p><a href="#photo-credits">Continue to photography credits <ArrowUpRight aria-hidden="true" /></a></div>
      </div>
      <div className="reference-columns">
        <ReferenceGroup icon={BookMarked} title="Books, papers, and interaction systems" intro="Theory, terminology, and research precedents used in the atlas and tutorial." references={theoryReferences} />
        <div>
          <ReferenceGroup icon={Database} title="Data and cultural sources" intro="Each data family keeps its own scale, transformation, rights, and evidence boundary." references={dataReferences} />
          <ReferenceGroup icon={ImageIcon} title="Photography and teaching excerpts" intro="Media establish context or teach an interaction pattern; they are not fieldwork evidence." references={mediaReferences} />
        </div>
      </div>
    </section>
  )
}
