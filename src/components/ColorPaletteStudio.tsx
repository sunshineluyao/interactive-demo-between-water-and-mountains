import {
  Accessibility,
  ArrowUpRight,
  Box,
  CheckCircle2,
  CloudDownload,
  Code2,
  Eye,
  Palette,
  Play,
  SlidersHorizontal,
} from 'lucide-react'
import { useMemo, useState } from 'react'

const colabUrl = 'https://colab.research.google.com/github/sunshineluyao/interactive-demo-between-water-and-mountains/blob/main/notebooks/INFOSCI301_Color_Palette_Accessibility_Studio.ipynb'
const notebookDownloadUrl = '/notebooks/INFOSCI301_Color_Palette_Accessibility_Studio.ipynb'

type PaletteFamily = 'qualitative' | 'sequential' | 'diverging'
type VisionMode = 'normal' | 'protanopia' | 'deuteranopia' | 'grayscale'
type Rgb = { r: number; g: number; b: number }

const clamp = (value: number, minimum = 0, maximum = 1) => Math.min(maximum, Math.max(minimum, value))
const channelToHex = (value: number) => Math.round(clamp(value, 0, 255)).toString(16).padStart(2, '0')
const rgbToHex = ({ r, g, b }: Rgb) => `#${channelToHex(r)}${channelToHex(g)}${channelToHex(b)}`.toUpperCase()

function oklchToRgb(lightness: number, chroma: number, hue: number): Rgb {
  const radians = hue * Math.PI / 180
  const a = chroma * Math.cos(radians)
  const b = chroma * Math.sin(radians)
  const lPrime = lightness + 0.3963377774 * a + 0.2158037573 * b
  const mPrime = lightness - 0.1055613458 * a - 0.0638541728 * b
  const sPrime = lightness - 0.0894841775 * a - 1.291485548 * b
  const l = lPrime ** 3
  const m = mPrime ** 3
  const s = sPrime ** 3
  const linear = {
    r: 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    g: -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    b: -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  }
  const encode = (value: number) => 255 * (value <= 0.0031308 ? 12.92 * value : 1.055 * Math.max(value, 0) ** (1 / 2.4) - 0.055)
  return { r: encode(linear.r), g: encode(linear.g), b: encode(linear.b) }
}

function oklchToGamutRgb(lightness: number, chroma: number, hue: number): Rgb {
  let fittedChroma = chroma
  let rgb = oklchToRgb(lightness, fittedChroma, hue)
  for (let attempt = 0; attempt < 28; attempt += 1) {
    if ([rgb.r, rgb.g, rgb.b].every((value) => value >= 0 && value <= 255)) return rgb
    fittedChroma *= 0.92
    rgb = oklchToRgb(lightness, fittedChroma, hue)
  }
  return { r: clamp(rgb.r, 0, 255), g: clamp(rgb.g, 0, 255), b: clamp(rgb.b, 0, 255) }
}

function hexToRgb(hex: string): Rgb {
  return {
    r: Number.parseInt(hex.slice(1, 3), 16),
    g: Number.parseInt(hex.slice(3, 5), 16),
    b: Number.parseInt(hex.slice(5, 7), 16),
  }
}

function relativeLuminance(rgb: Rgb) {
  const linearize = (channel: number) => {
    const value = channel / 255
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * linearize(rgb.r) + 0.7152 * linearize(rgb.g) + 0.0722 * linearize(rgb.b)
}

function contrastRatio(first: Rgb, second: Rgb) {
  const values = [relativeLuminance(first), relativeLuminance(second)].sort((a, b) => b - a)
  return (values[0] + 0.05) / (values[1] + 0.05)
}

function simulateVision(rgb: Rgb, mode: VisionMode): Rgb {
  if (mode === 'normal') return rgb
  if (mode === 'grayscale') {
    const value = 255 * relativeLuminance(rgb) ** (1 / 2.2)
    return { r: value, g: value, b: value }
  }
  const matrix = mode === 'protanopia'
    ? [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]]
    : [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.01182, 0.04294, 0.968881]]
  return {
    r: clamp(matrix[0][0] * rgb.r + matrix[0][1] * rgb.g + matrix[0][2] * rgb.b, 0, 255),
    g: clamp(matrix[1][0] * rgb.r + matrix[1][1] * rgb.g + matrix[1][2] * rgb.b, 0, 255),
    b: clamp(matrix[2][0] * rgb.r + matrix[2][1] * rgb.g + matrix[2][2] * rgb.b, 0, 255),
  }
}

function hslToHex(hue: number, saturation = 0.78, lightness = 0.55) {
  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation
  const section = ((hue % 360) + 360) % 360 / 60
  const x = chroma * (1 - Math.abs(section % 2 - 1))
  const [red, green, blue] = section < 1 ? [chroma, x, 0] : section < 2 ? [x, chroma, 0] : section < 3 ? [0, chroma, x] : section < 4 ? [0, x, chroma] : section < 5 ? [x, 0, chroma] : [chroma, 0, x]
  const match = lightness - chroma / 2
  return rgbToHex({ r: (red + match) * 255, g: (green + match) * 255, b: (blue + match) * 255 })
}

export function makePalette(family: PaletteFamily, count: number, hue: number, chroma: number, span: number) {
  return Array.from({ length: count }, (_, index) => {
    const position = count === 1 ? 0.5 : index / (count - 1)
    if (family === 'qualitative') {
      const lightness = 0.7 + (index % 2 ? -0.045 : 0.025)
      return rgbToHex(oklchToGamutRgb(lightness, chroma, hue + index * (360 / count)))
    }
    if (family === 'sequential') {
      const lightness = 0.94 - position * (span / 100)
      return rgbToHex(oklchToGamutRgb(lightness, chroma * (0.38 + 0.62 * position), hue))
    }
    const distance = Math.abs(position - 0.5) * 2
    const directionHue = position <= 0.5 ? hue : hue + 180
    return rgbToHex(oklchToGamutRgb(0.94 - distance * (span / 100), Math.max(0.012, chroma * distance), directionHue))
  })
}

const families: Array<{ id: PaletteFamily; name: string; prompt: string }> = [
  { id: 'qualitative', name: 'Qualitative', prompt: 'Different hues for unordered categories' },
  { id: 'sequential', name: 'Sequential', prompt: 'Ordered lightness for low-to-high values' },
  { id: 'diverging', name: 'Diverging', prompt: 'Two directions around a meaningful midpoint' },
]

const visionModes: Array<{ id: VisionMode; name: string }> = [
  { id: 'normal', name: 'Standard view' },
  { id: 'protanopia', name: 'Protanopia preview' },
  { id: 'deuteranopia', name: 'Deuteranopia preview' },
  { id: 'grayscale', name: 'Grayscale preview' },
]

const gallery = [
  { venue: 'Nature Methods', title: 'Color coding', year: '2010', note: 'Use hue deliberately; keep the mapping legible and consistent.', colors: ['#4477AA', '#66CCEE', '#228833', '#CCBB44', '#EE6677', '#AA3377'], href: 'https://doi.org/10.1038/nmeth0810-573' },
  { venue: 'Nature Methods', title: 'Color blindness', year: '2011', note: 'Check distinguishability and never ask color to carry the message alone.', colors: ['#000000', '#E69F00', '#56B4E9', '#009E73', '#F0E442', '#0072B2'], href: 'https://doi.org/10.1038/nmeth.1618' },
  { venue: 'The Cartographic Journal', title: 'ColorBrewer', year: '2003', note: 'Choose the palette family from the data relationship before styling it.', colors: ['#EFF3FF', '#BDD7E7', '#6BAED6', '#3182BD', '#08519C'], href: 'https://doi.org/10.1179/000870403235002042' },
  { venue: 'IEEE VIS · TVCG', title: 'Colorgorical', year: '2017', note: 'Balance discriminability, aesthetic preference, and semantic constraints.', colors: ['#006D2C', '#D95F0E', '#756BB1', '#2B8CBE', '#E7298A', '#A6761D'], href: 'https://doi.org/10.1109/TVCG.2016.2598918' },
  { venue: 'ACM CHI', title: 'ColorMaker', year: '2024', note: 'Treat palette creation as a guided, inspectable design process.', colors: ['#253494', '#2C7FB8', '#41B6C4', '#A1DAB4', '#FFFFCC'], href: 'https://doi.org/10.1145/3613904.3642265' },
  { venue: 'ACM CHI · Best Paper', title: 'ColorCheck', year: '2016', note: 'Test palettes with the reader’s display conditions and visual abilities in mind.', colors: ['#1B9E77', '#D95F02', '#7570B3', '#E7298A', '#66A61E'], href: 'https://doi.org/10.1145/2858036.2858077' },
]

const standards = [
  ['IEC 61966-2-1', 'sRGB interchange', 'Encode screen RGB; do not treat channel values as perceptual distances.'],
  ['CIE 015 + ISO/CIE 11664-4', 'Colorimetry + CIELAB', 'Measure color and compare approximately perceptual coordinates.'],
  ['ICC.1:2022', 'ICC color profiles', 'Carry source and destination profiles across devices.'],
  ['ISO 12647-2', 'Print process control', 'Proof and validate press conditions rather than converting to CMYK blindly.'],
  ['WCAG 2.2', 'Use of color + contrast', 'Use redundant cues; target 4.5:1 text and 3:1 large or non-text elements.'],
  ['ISO 9241-171', 'Software accessibility', 'Design color choices as part of an accessible software system.'],
  ['CSS Color 4', 'Modern web color', 'Use color() and OKLCH with a tested sRGB fallback.'],
]

const integrations = [
  { icon: SlidersHorizontal, title: 'Figma variables', copy: 'Export semantic tokens, then map collections and modes to light, dark, print, or accessibility contexts.', href: 'https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma' },
  { icon: Code2, title: 'Adobe workflow', copy: 'Export ASE swatches from Colab, preserve profiles, and soft-proof against the intended output condition.', href: 'https://helpx.adobe.com/creative-cloud/adobe-color.html' },
  { icon: Box, title: '3D + Three.js', copy: 'Convert color textures to linear working space, then evaluate the palette again under lights, materials, and tone mapping.', href: 'https://threejs.org/manual/en/color-management.html' },
]

function PaletteStrip({ colors, label }: { colors: string[]; label: string }) {
  return <div className="palette-strip" role="img" aria-label={label}>{colors.map((color, index) => <i key={`${color}-${index}`} style={{ background: color }} />)}</div>
}

export function ColorPaletteStudio() {
  const [family, setFamily] = useState<PaletteFamily>('sequential')
  const [hue, setHue] = useState(205)
  const [chroma, setChroma] = useState(16)
  const [span, setSpan] = useState(48)
  const [count, setCount] = useState(7)
  const [vision, setVision] = useState<VisionMode>('normal')
  const [reveal, setReveal] = useState(56)
  const [sceneLight, setSceneLight] = useState(62)

  const palette = useMemo(() => makePalette(family, count, hue, chroma / 100, span), [family, count, hue, chroma, span])
  const previewPalette = useMemo(() => palette.map((color) => rgbToHex(simulateVision(hexToRgb(color), vision))), [palette, vision])
  const uncontrolled = useMemo(() => Array.from({ length: count }, (_, index) => hslToHex(index * (240 / Math.max(1, count - 1)))), [count])
  const aaLabels = palette.filter((color) => Math.max(contrastRatio(hexToRgb(color), { r: 255, g: 255, b: 255 }), contrastRatio(hexToRgb(color), { r: 0, g: 0, b: 0 })) >= 4.5).length
  const activeFamily = families.find((item) => item.id === family) ?? families[0]
  const chartValues = [78, 44, 91, 61, 35, 70, 53, 83, 48]

  return (
    <section id="color-studio" className="color-palette-studio" aria-labelledby="color-studio-title">
      <div className="tutorial-section-heading color-studio-heading">
        <div><Palette aria-hidden="true" /><span>07 · Test color and 3D</span></div>
        <h3 id="color-studio-title">Encode meaning before choosing a beautiful color.</h3>
        <p>This companion separates color representation—sRGB, CMYK/ICC, and CIELAB/OKLCH—from the three major data-encoding families: qualitative, sequential, and diverging. Change the controls, inspect accessibility, then open the same workflow as executable Python.</p>
      </div>

      <div className="color-model-map" aria-label="Two complementary color triples">
        <article><span>Representation · how a color is specified</span><strong>sRGB</strong><p>Screen interchange</p><strong>CMYK + ICC</strong><p>Device-aware print</p><strong>CIELAB / OKLCH</strong><p>Perceptual design</p></article>
        <article><span>Encoding · what a color means in data</span><strong>Qualitative</strong><p>Difference without order</p><strong>Sequential</strong><p>Low-to-high magnitude</p><strong>Diverging</strong><p>Distance from a midpoint</p></article>
      </div>

      <div className="palette-workbench">
        <aside className="palette-controls" aria-label="Color palette controls">
          <div className="control-heading"><SlidersHorizontal aria-hidden="true" /><div><span>Palette controls</span><strong>{activeFamily.prompt}</strong></div></div>
          <fieldset><legend>Encoding family</legend><div className="family-buttons">{families.map((item) => <button type="button" key={item.id} aria-pressed={family === item.id} onClick={() => setFamily(item.id)}>{item.name}</button>)}</div></fieldset>
          <label>Base hue <output>{hue}°</output><input aria-label="Base hue" type="range" min="0" max="360" value={hue} onChange={(event) => setHue(Number(event.target.value))} /></label>
          <label>Chroma <output>{(chroma / 100).toFixed(2)}</output><input aria-label="Chroma" type="range" min="3" max="28" value={chroma} onChange={(event) => setChroma(Number(event.target.value))} /></label>
          <label>Lightness span <output>{span}%</output><input aria-label="Lightness span" type="range" min="24" max="66" value={span} onChange={(event) => setSpan(Number(event.target.value))} /></label>
          <label>Number of colors <output>{count}</output><input aria-label="Number of colors" type="range" min="3" max="9" value={count} onChange={(event) => setCount(Number(event.target.value))} /></label>
          <label>Vision preview<select aria-label="Vision preview" value={vision} onChange={(event) => setVision(event.target.value as VisionMode)}>{visionModes.map((mode) => <option value={mode.id} key={mode.id}>{mode.name}</option>)}</select></label>
          <div className="accessibility-reading" role="status"><Accessibility aria-hidden="true" /><div><strong>{aaLabels}/{count} swatches support an AA text label</strong><p>The preview is an approximation, not a clinical diagnosis. Shape and labels remain visible because color alone is not enough.</p></div></div>
        </aside>

        <div className="palette-stage">
          <header><div><span>Live comparison</span><strong>Uncontrolled spectrum → designed {family} palette</strong></div><div className="vision-badge"><Eye aria-hidden="true" />{visionModes.find((mode) => mode.id === vision)?.name}</div></header>
          <div className="palette-comparison">
            <div className="comparison-palette-layer comparison-uncontrolled" aria-hidden="true">
              <PaletteStrip colors={uncontrolled} label="Uncontrolled spectrum palette" />
              <div className="palette-bars">{chartValues.slice(0, count).map((value, index) => <i key={index} style={{ height: `${value}%`, background: uncontrolled[index] }} />)}</div>
              <span>Before · equal hue steps, untested meaning</span>
            </div>
            <div className="comparison-palette-layer comparison-designed" style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}>
              <PaletteStrip colors={previewPalette} label={`Designed ${family} palette in ${vision} preview`} />
              <div className="palette-bars">{chartValues.slice(0, count).map((value, index) => <i key={index} style={{ height: `${value}%`, background: previewPalette[index] }}><b>{String.fromCharCode(65 + index)}</b></i>)}</div>
              <span>After · perceptual structure + redundant labels</span>
            </div>
            <i className="palette-divider" style={{ left: `${reveal}%` }} aria-hidden="true" />
          </div>
          <label className="compare-control">Compare before and after <output>{reveal}% after</output><input aria-label="Compare before and after palettes" type="range" min="0" max="100" value={reveal} onChange={(event) => setReveal(Number(event.target.value))} /></label>
          <div className="palette-token-row" aria-label="Generated palette values">{palette.map((color, index) => {
            const rgb = hexToRgb(color)
            const white = contrastRatio(rgb, { r: 255, g: 255, b: 255 })
            const black = contrastRatio(rgb, { r: 0, g: 0, b: 0 })
            return <span key={`${color}-${index}`} style={{ background: previewPalette[index], color: black >= white ? '#000' : '#FFF' }}><b>{String.fromCharCode(65 + index)}</b><code>{color}</code></span>
          })}</div>
        </div>
      </div>

      <div className="color-context-grid">
        <article className="terrain-preview">
          <header><Box aria-hidden="true" /><div><span>3D lighting check</span><strong>A palette is not a material.</strong></div></header>
          <svg viewBox="0 0 640 290" role="img" aria-label="Palette applied to a stylized three-dimensional terrain under adjustable light" style={{ filter: `brightness(${0.58 + sceneLight / 145})` }}>
            <polygon points="45,220 164,108 276,213 382,74 595,220" fill={previewPalette[0]} />
            <polygon points="45,220 164,108 212,220" fill={previewPalette[Math.min(1, count - 1)]} />
            <polygon points="212,220 276,213 382,74 443,220" fill={previewPalette[Math.min(3, count - 1)]} />
            <polygon points="443,220 382,74 595,220" fill={previewPalette[count - 1]} />
            <ellipse cx="320" cy="232" rx="285" ry="28" fill="#06171E" opacity=".36" />
            <path d="M45 220 L164 108 L276 213 L382 74 L595 220" fill="none" stroke="#FFF" strokeOpacity=".55" strokeWidth="2" />
          </svg>
          <label>Scene light <output>{sceneLight}%</output><input aria-label="3D scene light" type="range" min="10" max="100" value={sceneLight} onChange={(event) => setSceneLight(Number(event.target.value))} /></label>
          <p>Lighting, tone mapping, and material roughness can change apparent color. Three.js assets should declare color space; data meaning still needs a legend and non-color cues.</p>
        </article>

        <article className="standards-crosswalk">
          <header><CheckCircle2 aria-hidden="true" /><div><span>Global standards crosswalk</span><strong>One palette, seven checkpoints.</strong></div></header>
          <div className="standards-scroll"><table><thead><tr><th>Standard</th><th>Role</th><th>Design check</th></tr></thead><tbody>{standards.map(([standard, role, check]) => <tr key={standard}><th scope="row">{standard}</th><td>{role}</td><td>{check}</td></tr>)}</tbody></table></div>
        </article>
      </div>

      <section className="palette-gallery" aria-labelledby="palette-gallery-title">
        <div className="palette-subheading"><span>Credited design gallery</span><h4 id="palette-gallery-title">Six research patterns, reconstructed as swatches.</h4><p>These are compact teaching reconstructions—not reproduced figures. Follow each primary source for its complete method, evaluation, and context.</p></div>
        <div className="palette-gallery-grid">{gallery.map((item) => <a key={item.title} href={item.href} target="_blank" rel="noreferrer"><span>{item.venue} · {item.year}</span><strong>{item.title}</strong><PaletteStrip colors={item.colors} label={`${item.title} teaching reconstruction`} /><p>{item.note}</p><small>Open primary source <ArrowUpRight aria-hidden="true" /></small></a>)}</div>
      </section>

      <section className="palette-integrations" aria-labelledby="palette-integrations-title">
        <div className="palette-subheading"><span>From notebook to production</span><h4 id="palette-integrations-title">Export tokens, preserve profiles, test the rendered result.</h4></div>
        <div>{integrations.map(({ icon: Icon, title, copy, href }) => <article key={title}><Icon aria-hidden="true" /><strong>{title}</strong><p>{copy}</p><a href={href} target="_blank" rel="noreferrer">Read official guidance <ArrowUpRight aria-hidden="true" /></a></article>)}</div>
      </section>

      <div className="color-notebook-callout">
        <div><span>20 executable cells · bilingual explanations</span><h4>Continue in the full Google Colab studio.</h4><p>Rebuild the palette, calculate WCAG contrast and ΔE, preview color-vision conditions, compare research designs, export Figma-ready JSON and Adobe ASE, and render a 3D surface.</p></div>
        <div className="colab-actions"><a className="colab-primary" href={colabUrl} target="_blank" rel="noreferrer"><Play aria-hidden="true" /> Open color notebook in Colab <ArrowUpRight aria-hidden="true" /></a><a href={notebookDownloadUrl} download="INFOSCI301_Color_Palette_Accessibility_Studio.ipynb"><CloudDownload aria-hidden="true" /> Download color .ipynb</a></div>
      </div>
    </section>
  )
}
