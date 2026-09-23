import { ArrowUpRight, BookMarked, Database, Image as ImageIcon, Palette } from 'lucide-react'
import type { ReactNode } from 'react'
import { goals } from '../lib/synthesis'

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

const colorReferences: Reference[] = [
  {
    key: 'wong-color-coding',
    citation: <>Wong, B. (2010). Color coding. <cite>Nature Methods, 7</cite>, 573. <a href="https://doi.org/10.1038/nmeth0810-573" target="_blank" rel="noreferrer">https://doi.org/10.1038/nmeth0810-573</a></>,
    note: 'A concise Nature Methods guide to using hue as a deliberate, consistent visual code.',
  },
  {
    key: 'wong-color-blindness',
    citation: <>Wong, B. (2011). Color blindness. <cite>Nature Methods, 8</cite>, 441. <a href="https://doi.org/10.1038/nmeth.1618" target="_blank" rel="noreferrer">https://doi.org/10.1038/nmeth.1618</a></>,
    note: 'Motivates checking discriminability and adding cues that do not depend on hue alone.',
  },
  {
    key: 'colorbrewer',
    citation: <>Harrower, M., &amp; Brewer, C. A. (2003). ColorBrewer.org: An online tool for selecting colour schemes for maps. <cite>The Cartographic Journal, 40</cite>(1), 27–37. <a href="https://doi.org/10.1179/000870403235002042" target="_blank" rel="noreferrer">https://doi.org/10.1179/000870403235002042</a></>,
  },
  {
    key: 'colorgorical',
    citation: <>Gramazio, C. C., Laidlaw, D. H., &amp; Schloss, K. B. (2017). Colorgorical: Creating discriminable and preferable color palettes for information visualization. <cite>IEEE Transactions on Visualization and Computer Graphics, 23</cite>(1), 521–530. <a href="https://doi.org/10.1109/TVCG.2016.2598918" target="_blank" rel="noreferrer">https://doi.org/10.1109/TVCG.2016.2598918</a></>,
  },
  {
    key: 'colormaker',
    citation: <>Salvi, A., Lu, K., Papka, M. E., Wang, Y., &amp; Reda, K. (2024). Color Maker: A mixed-initiative approach to creating accessible color maps. In <cite>Proceedings of the 2024 CHI Conference on Human Factors in Computing Systems</cite> (pp. 1–17). Association for Computing Machinery. <a href="https://doi.org/10.1145/3613904.3642265" target="_blank" rel="noreferrer">https://doi.org/10.1145/3613904.3642265</a></>,
  },
  {
    key: 'colorcheck',
    citation: <>Reinecke, K., Flatla, D. R., &amp; Brooks, C. (2016). Enabling designers to foresee which colors users cannot see. In <cite>Proceedings of the 2016 CHI Conference on Human Factors in Computing Systems</cite> (pp. 2693–2704). Association for Computing Machinery. <a href="https://doi.org/10.1145/2858036.2858077" target="_blank" rel="noreferrer">https://doi.org/10.1145/2858036.2858077</a></>,
  },
  {
    key: 'cie-015',
    citation: <>International Commission on Illumination. (2018). <cite>CIE 015:2018 Colorimetry</cite> (4th ed.). <a href="https://cie.co.at/publications/colorimetry-4th-edition" target="_blank" rel="noreferrer">Official standard record</a>.</>,
  },
  {
    key: 'iec-srgb',
    citation: <>International Electrotechnical Commission. (1999). <cite>IEC 61966-2-1: Multimedia systems and equipment—Colour measurement and management—Part 2-1: Default RGB colour space—sRGB</cite>. <a href="https://webstore.iec.ch/en/publication/6169" target="_blank" rel="noreferrer">Official standard record</a>.</>,
  },
  {
    key: 'icc-profile',
    citation: <>International Color Consortium. (2022). <cite>ICC.1:2022 Image technology colour management—Architecture, profile format, and data structure</cite>. <a href="https://www.color.org/specification/ICC.1-2022-05.pdf" target="_blank" rel="noreferrer">Specification</a>.</>,
  },
  {
    key: 'wcag-22',
    citation: <>World Wide Web Consortium. (2023). <cite>Web Content Accessibility Guidelines (WCAG) 2.2</cite>. <a href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="noreferrer">https://www.w3.org/TR/WCAG22/</a></>,
  },
  {
    key: 'iso-9241-171',
    citation: <>International Organization for Standardization. (2025). <cite>ISO 9241-171:2025 Ergonomics of human-system interaction—Part 171: Software accessibility</cite>. <a href="https://www.iso.org/standard/86308.html" target="_blank" rel="noreferrer">Official standard record</a>.</>,
  },
  {
    key: 'iso-12647-2',
    citation: <>International Organization for Standardization. (2013). <cite>ISO 12647-2:2013 Graphic technology—Process control for the production of half-tone colour separations, proof and production prints—Part 2: Offset lithographic processes</cite>. <a href="https://www.iso.org/standard/57833.html" target="_blank" rel="noreferrer">Official standard record</a>.</>,
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
        <div>
          <ReferenceGroup icon={BookMarked} title="Books, papers, and interaction systems" intro="Theory, terminology, and research precedents used in the atlas and tutorial." references={theoryReferences} />
          <ReferenceGroup icon={Palette} title="Color research and global standards" intro="Primary research and official standards behind the palette studio, accessibility checks, and production guidance." references={colorReferences} />
        </div>
        <div>
          <ReferenceGroup icon={Database} title="Data and cultural sources" intro="Each data family keeps its own scale, transformation, rights, and evidence boundary." references={dataReferences} />
          <ReferenceGroup icon={ImageIcon} title="Photography and teaching excerpts" intro="Media establish context or teach an interaction pattern; they are not fieldwork evidence." references={mediaReferences} />
        </div>
      </div>
      <section id="sdg-references" className="sdg-references" data-no-translate>
        <h3>SDGs and course synthesis / SDG 与课程综合</h3>
        <ol>
          {goals.map((goal) => <li key={goal.id}>United Nations Department of Economic and Social Affairs. (n.d.). <cite>Goal {goal.id}: {goal.name[0]}</cite>. Retrieved September 23, 2026, from <a href={'https://sdgs.un.org/goals/goal' + goal.id} target="_blank" rel="noreferrer">{'https://sdgs.un.org/goals/goal' + goal.id}</a>. Target / 具体目标 {goal.target}.</li>)}
          <li>United Nations. (n.d.). <cite>Communications materials</cite> [SDG icons and usage guidelines]. <a href="https://www.un.org/sustainabledevelopment/news/communications-material/" target="_blank" rel="noreferrer">https://www.un.org/sustainabledevelopment/news/communications-material/</a>. Official icon files / 官方图标：<a href="https://sdgs.un.org/goals" target="_blank" rel="noreferrer">https://sdgs.un.org/goals</a>.</li>
          <li>Zhang, L. (2026). <cite>INFOSCI 301: Learning and innovation pathway, Weeks 1–7 + final</cite> [Course learning briefing, pp. 1–4]. Duke Kunshan University. Instructor-provided course document / 教师提供的课程文件.</li>
        </ol>
      </section>
    </section>
  )
}
