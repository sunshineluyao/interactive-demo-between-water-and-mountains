import { useEffect, useId, useState, type CSSProperties } from 'react'
import rain from '../../public/data/kunshan-precipitation.json'
import paper from '../../public/data/mandara-teaching.json'
import type { LanguageMode } from '../lib/i18n'
import { copy, type Copy } from '../lib/synthesis'
import { effectExamples, evidenceLayers, type EffectKind } from '../lib/effectExamples'

export type ProjectPaletteFamily = 'qualitative' | 'sequential' | 'diverging'
const records = rain.records.filter((record) => record.year === 2025)
const groupNames: Copy[] = [['Western sites', '西部遗址'], ['Eastern sites', '东部遗址'], ['Neolithic signal', '新石器时代信号']]
const meanings: Copy[] = [['Not asserted', '未作陈述'], ['Smaller reported', '已报告的较小归属'], ['Dominant reported', '已报告的主要归属']]
const sequential = ['#e0edf2', '#b4d3df', '#7aafc4', '#4486a1', '#1d5a75', '#113e52']
const spectrum = ['#bd3833', '#e68821', '#cabf25', '#319974', '#457fc2', '#804bb0']
const qualitative = ['#e0e8e9', '#e3a961', '#316b87']
const diverging = ['#a34a24', '#cc8e55', '#ead5b9', '#f4f3ed', '#c4dfe6', '#6aa6ba', '#215b75']
const category = (value: number) => value === 1 ? 2 : value > 0 ? 1 : 0
const paletteAt = (palette: string[], position: number) => palette[Math.round(Math.max(0, Math.min(1, position)) * (palette.length - 1))]
const date = (month: number) => `2025-${String(month).padStart(2, '0')}`
const chapters: Array<{ title: Copy; content: Copy; href: string }> = [
  { title: ['Evidence', '证据'], content: ['Read the OSM, NASA POWER, and pottery sources.', '阅读 OSM、NASA POWER 与陶器资料来源。'], href: '#evidence' },
  { title: ['Water', '水'], content: ['Inspect Kunshan waterways and dated precipitation.', '查看昆山水道与带日期的降水记录。'], href: '#water' },
  { title: ['Mountains', '山'], content: ['Read the reported Mandara pottery patterns.', '阅读已报告的曼达拉陶器模式。'], href: '#mountain' },
  { title: ['Validation', '验证'], content: ['Check the interpretation with evidence and people.', '用证据与人的反馈检验解释。'], href: '#validate' },
]

function RainChart({ selected, retained, colors, deviations = false, language }: { selected?: number; retained?: number[]; colors?: string[]; deviations?: boolean; language: LanguageMode }) {
  const t = copy(language)
  const baseline = deviations ? 136 : 232
  const valueFor = (i: number) => deviations ? records[i].mm_per_day - rain.climatology[i].mean_mm_per_day : records[i].mm_per_day
  return <figure className="project-rain-chart">
    <figcaption>{t(deviations ? ['2025 minus 2001–2025 monthly mean · mm/day', '2025 年减去 2001–2025 年同月均值 · 毫米/日'] : ['2025 monthly mean precipitation · mm/day', '2025 年各月日均降水 · 毫米/日'])}</figcaption>
    <svg viewBox="0 0 420 275" role="img" aria-label={t(['Kunshan precipitation; exact records are available below.', '昆山降水；精确记录可在下方查看。'])}>
      {(deviations ? [-8, 0, 8] : [0, 8, 16]).map((tick) => <g key={tick}><line x1="34" x2="408" y1={baseline - tick * 12} y2={baseline - tick * 12} stroke="#cad6da" /><text x="28" y={baseline - tick * 12 + 4} textAnchor="end" fill="#294852" fontSize="13">{tick}</text></g>)}
      {records.map((record, i) => {
        const value = valueFor(i)
        const isSelected = selected === i || retained?.includes(i)
        const color = colors ? paletteAt(colors, deviations ? (value + 8) / 16 : record.mm_per_day / 16) : '#6d909e'
        return <g key={record.month} opacity={retained && !retained.includes(i) ? 0.25 : 1}>
          <rect x={41 + i * 30} y={Math.min(baseline, baseline - value * 12)} width="20" height={Math.max(1, Math.abs(value) * 12)} fill={color} stroke={isSelected ? '#152f3b' : '#6d909e'} strokeWidth={isSelected ? 3 : 0.7} />
          {isSelected && <path d={`M${46 + i * 30} 244 l5 -6 l5 6z`} fill="#152f3b" />}
          <text x={51 + i * 30} y="264" textAnchor="middle" fill="#294852" fontSize="13">{record.month}</text>
          <title>{date(record.month)}: {value.toFixed(2)} {t(['mm/day', '毫米/日'])}</title>
        </g>
      })}
    </svg>
    <small>{t(['Month 1–12 · fixed scale', '月份 1–12 · 固定尺度'])}</small>
  </figure>
}

function PatternGrid({ selected, group, assertion, colors, language }: { selected?: number; group?: number; assertion?: string; colors?: string[]; language: LanguageMode }) {
  const t = copy(language)
  const rows = paper.signatures.map((item, i) => ({ ...item, i })).filter(({ i }) => group === undefined || group < 0 || group === i)
  return <div className="project-pattern-grid">{rows.map((row) => <div key={row.i} className="project-pattern-row">
    <strong>{t(groupNames[row.i])}</strong><small>{row.sites}</small>
    <div className="project-pattern-cells">{row.values.map((value, i) => {
      const shown = !assertion || assertion === 'all' || (assertion === 'dominant' ? value === 1 : value > 0)
      return <span key={i} className={selected === i ? 'is-selected' : ''} style={{ opacity: shown ? 1 : 0.28 }} title={t(meanings[category(value)])}>
        <i style={{ background: colors ? colors[category(value) % colors.length] : ['#e0e8e9', '#80aabc', '#123f52'][category(value)] }} aria-hidden="true" />
        <b>{paper.culture_periods[i]}</b><small>{['—', '○', '●'][category(value)]}</small>
      </span>
    })}</div>
  </div>)}<p className="project-symbol-key">{t(['● dominant · ○ smaller · — not asserted', '● 主要 · ○ 较小 · — 未作陈述'])}</p></div>
}

function RecordsTable({ selected, retained, deviations, language }: { selected?: number; retained?: number[]; deviations?: boolean; language: LanguageMode }) {
  const t = copy(language)
  return <details className="project-records"><summary>{t(['Inspect the same 12 source records', '查看相同的 12 条来源记录'])}</summary><table><thead><tr><th>{t(['Date', '日期'])}</th><th>{deviations ? 'Δ ' : ''}{t(['mm/day', '毫米/日'])}</th><th>{t(['Focus', '焦点'])}</th></tr></thead><tbody>{records.map((record, i) => <tr key={i} className={selected === i || retained?.includes(i) ? 'is-selected' : ''}><td>{date(record.month)}</td><td>{(deviations ? record.mm_per_day - rain.climatology[i].mean_mm_per_day : record.mm_per_day).toFixed(2)}</td><td>{selected === i || retained?.includes(i) ? '●' : '—'}</td></tr>)}</tbody></table></details>
}

export function ProjectEffectExample({ kind, language = 'bilingual', motionEnabled = false, palette, paletteFamily, grayscale = false }: { kind: EffectKind; language?: LanguageMode; motionEnabled?: boolean; palette?: string[]; paletteFamily?: ProjectPaletteFamily; grayscale?: boolean }) {
  const t = copy(language)
  const id = useId()
  const [month, setMonth] = useState(5)
  const [cp, setCp] = useState(13)
  const [group, setGroup] = useState(-1)
  const [assertion, setAssertion] = useState('all')
  const [firstMonth, setFirstMonth] = useState(4)
  const [lastMonth, setLastMonth] = useState(8)
  const [minimum, setMinimum] = useState(5)
  const [chapter, setChapter] = useState(0)
  const [place, setPlace] = useState<'water' | 'mountain'>('water')
  const [angle, setAngle] = useState(12)
  const [family, setFamily] = useState<ProjectPaletteFamily>('sequential')
  const [gray, setGray] = useState(false)
  const [playing, setPlaying] = useState(false)
  const effect = effectExamples[kind]
  const activeFamily = paletteFamily ?? family
  const isColor = kind === 'color'
  const isRange = kind === 'brush' || kind === 'crossfilter'
  const isRain = ['time', 'coordinate', 'animation', 'brush', 'overview', 'crossfilter', 'suggest'].includes(kind) || (isColor && activeFamily !== 'qualitative')
  const deviations = isColor && activeFamily === 'diverging'
  const retained = isRange ? records.flatMap((record, i) => i >= firstMonth && i <= lastMonth && (kind !== 'crossfilter' || record.mm_per_day >= minimum) ? [i] : []) : undefined
  const chartColors = isColor ? palette ?? (deviations ? diverging : activeFamily === 'qualitative' ? qualitative : sequential) : kind === 'suggest' ? sequential : undefined
  const qualitativeColors = chartColors ? [chartColors[0], chartColors[Math.floor(chartColors.length / 2)], chartColors[chartColors.length - 1]] : qualitative
  const observation: Copy = ['June 2025: 11.24 mm/day; July: 11.64 mm/day in the bundled Kunshan series.', '昆山内置序列中：2025 年 6 月为 11.24 毫米/日，7 月为 11.64 毫米/日。']
  const boundary: Copy = ['This is modeled precipitation, not measured channel flow or a flood event.', '这是模型降水数据，不是实测水道流量或洪水事件。']
  const nextCheck: Copy = ['Ask which waterside routes need local observation, then compare dated field notes with the climate context.', '询问哪些滨水路线需要实地观察，再把带日期的田野笔记与气候背景比较。']

  useEffect(() => {
    if (!playing || !motionEnabled || kind !== 'animation') return
    const timer = window.setInterval(() => setMonth((value) => (value + 1) % records.length), 1100)
    return () => window.clearInterval(timer)
  }, [playing, motionEnabled, kind])
  useEffect(() => { if (!motionEnabled) setPlaying(false) }, [motionEnabled])
  const reset = () => { setMonth(5); setCp(13); setGroup(-1); setAssertion('all'); setFirstMonth(4); setLastMonth(8); setMinimum(5); setChapter(0); setPlace('water'); setAngle(12); setPlaying(false); setFamily('sequential'); setGray(false) }
  const download = () => {
    const content = `# ${t(['Kunshan worked evidence card', '昆山证据卡示范'])}\n\n${t(observation)}\n\n${t(boundary)}\n\n${t(nextCheck)}\n\nNASA POWER: ${rain.metadata.source_url}\n`
    const url = URL.createObjectURL(new Blob([content], { type: 'text/markdown;charset=utf-8' }))
    const link = document.createElement('a'); link.href = url; link.download = 'kunshan-worked-evidence-card.md'; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  function panel(after: boolean) {
    if (isRain) return <>
      <div className={isColor && (gray || grayscale) ? 'project-color-view is-grayscale' : 'project-color-view'}><RainChart language={language} selected={after && !isRange && !isColor && kind !== 'suggest' ? month : undefined} retained={after ? retained : undefined} deviations={deviations} colors={isColor ? after ? chartColors : spectrum : after ? chartColors : undefined} /></div>
      {after && !isColor && kind !== 'suggest' && <output className="project-record-reading" aria-live={playing ? 'off' : 'polite'}>{isRange ? t([`${retained?.length} / 12 months retained`, `保留 ${retained?.length} / 12 个月份`]) : `${date(month + 1)} · ${records[month].mm_per_day.toFixed(2)} ${t(['mm/day', '毫米/日'])}`}</output>}
      {isColor && <p className="project-scale-note">{t(deviations ? ['Zero = the 2001–2025 mean for that calendar month. Shared range: −8 to +8 mm/day.', '零点 = 2001–2025 年同一日历月份的均值。共同范围：−8 至 +8 毫米/日。'] : ['Shared range: 0–16 mm/day. Height and printed values carry magnitude in both views.', '共同范围：0–16 毫米/日。两个视图都用高度与打印数值表达大小。'])}</p>}
      <RecordsTable language={language} selected={after && !isRange && !isColor ? month : undefined} retained={after ? retained : undefined} deviations={deviations} />
    </>
    if (kind === 'select' || kind === 'reduce' || kind === 'storyboard' || (isColor && activeFamily === 'qualitative')) return <>
      <div className={isColor && (gray || grayscale) ? 'project-color-view is-grayscale' : 'project-color-view'}><PatternGrid language={language} selected={after && kind !== 'reduce' && !isColor ? cp : undefined} group={after && kind === 'reduce' ? group : undefined} assertion={after && kind === 'reduce' ? assertion : undefined} colors={isColor ? after ? qualitativeColors : [spectrum[1], spectrum[3], spectrum[5]] : undefined} /></div>
      {after && kind === 'select' && <ul className="project-selection-reading" aria-live="polite">{paper.signatures.map((row, i) => <li key={i}><strong>{paper.culture_periods[cp]} · {t(groupNames[i])}</strong><span>{t(meanings[category(row.values[cp])])}</span></li>)}</ul>}
      {after && kind === 'reduce' && <output>{t([`${paper.signatures.flatMap((row, i) => group < 0 || group === i ? row.values.filter((value) => assertion === 'all' || (assertion === 'dominant' ? value === 1 : value > 0)) : []).length} / 42 summary cells retained; faded cells remain as context.`, `保留 ${paper.signatures.flatMap((row, i) => group < 0 || group === i ? row.values.filter((value) => assertion === 'all' || (assertion === 'dominant' ? value === 1 : value > 0)) : []).length} / 42 个摘要单元格；淡化的单元格保留语境。`])}</output>}
      {after && kind === 'storyboard' && <ol className="project-story-panels"><li>{t(['Pattern: compare the CP14 column.', '模式：比较 CP14 列。'])}</li><li>{t(['Reading: Western smaller; Eastern and Neolithic dominant.', '解读：西部较小；东部与新石器时代信号为主要。'])}</li><li>{t(['Boundary: a reported model pattern does not establish identity or a migration route.', '边界：已报告的模型模式不能确立身份或迁徙路线。'])}</li></ol>}
    </>
    if (kind === 'three-d') return <><div className={'project-layer-diagram ' + (after ? 'has-depth' : '')} style={{ '--view-angle': `${angle}deg` } as CSSProperties} aria-hidden="true">{evidenceLayers.map((_, i) => <span key={i} style={{ '--plane': i } as CSSProperties}>{String(i + 1).padStart(2, '0')}</span>)}</div><ol className="project-layer-key">{evidenceLayers.map((layer, i) => <li key={i}><strong>{t(layer.title)}</strong><span>{t(layer[place])}</span></li>)}</ol><small>{t(['Layer spacing organizes an explanation; it is not a measurement.', '图层间距用于组织解释，不是测量值。'])}</small></>
    if (kind === 'navigate') return after ? <div className="project-chapter-preview"><strong>{t(chapters[chapter].title)}</strong><p>{t(chapters[chapter].content)}</p><a href={chapters[chapter].href}>{t(['Open this project chapter', '打开此项目章节'])} →</a></div> : <div className="project-chapter-preview">{chapters.map((item, i) => <p key={i}>{t(item.content)}</p>)}</div>
    return after ? <><dl className="project-evidence-card">{([['Observation', '观察'], ['Inference boundary', '推断边界'], ['Next check', '下一步验证']] as Copy[]).map((label, i) => <div key={i}><dt>{t(label)}</dt><dd>{t([observation, boundary, nextCheck][i])}</dd></div>)}</dl><button type="button" onClick={download}>{t(['Download worked evidence card', '下载证据卡示范'])}</button></> : <p className="project-paragraph">{t(observation)} {t(boundary)} {t(nextCheck)}</p>
  }

  return <section className="project-effect" data-effect={kind} data-no-translate aria-labelledby={id}>
    <header><span className="project-example-kicker">{t(['APPLY IT · BETWEEN WATER AND MOUNTAINS', '应用示范 · 水与山之间'])}</span><h4 id={id}>{t(effect.title)}</h4><p>{t(effect.task)}</p></header>
    <div className="project-effect-controls">
      {(kind === 'select') && <label>{t(['Select a CP', '选择 CP'])}<select value={cp} onChange={(e) => setCp(Number(e.target.value))}>{paper.culture_periods.map((name, i) => <option key={name} value={i}>{name}</option>)}</select></label>}
      {isRain && !isRange && !isColor && kind !== 'suggest' && <label>{t(['Selected month', '选定月份'])} · {date(month + 1)}<input type="range" min="0" max="11" value={month} onChange={(e) => { setMonth(Number(e.target.value)); setPlaying(false) }} /></label>}
      {kind === 'animation' && <div className="project-control-buttons"><button type="button" disabled={!motionEnabled} aria-pressed={playing} onClick={() => setPlaying(!playing)}>{t(playing ? ['Pause example', '暂停示例'] : ['Play example', '播放示例'])}</button><button type="button" onClick={() => { setPlaying(false); setMonth((month + 1) % 12) }}>{t(['Next month', '下一个月'])}</button>{!motionEnabled && <small>{t(['Motion is paused globally. You can still step through every month.', '全局动画已暂停。仍可逐月查看。'])}</small>}</div>}
      {isRange && <><label>{t(['Start month', '开始月份'])} · {firstMonth + 1}<input type="range" min="0" max="11" value={firstMonth} onChange={(e) => { const next = Number(e.target.value); setFirstMonth(next); setLastMonth(Math.max(next, lastMonth)) }} /></label><label>{t(['End month', '结束月份'])} · {lastMonth + 1}<input type="range" min="0" max="11" value={lastMonth} onChange={(e) => { const next = Number(e.target.value); setLastMonth(next); setFirstMonth(Math.min(next, firstMonth)) }} /></label></>}
      {kind === 'crossfilter' && <label>{t(['Minimum precipitation · mm/day', '降水下限 · 毫米/日'])} · {minimum}<input type="range" min="0" max="16" step="0.5" value={minimum} onChange={(e) => setMinimum(Number(e.target.value))} /></label>}
      {kind === 'reduce' && <><label>{t(['Site group', '遗址分组'])}<select value={group} onChange={(e) => setGroup(Number(e.target.value))}><option value="-1">{t(['All groups', '所有分组'])}</option>{groupNames.map((name, i) => <option value={i} key={i}>{t(name)}</option>)}</select></label><label>{t(['Assertion filter', '陈述筛选'])}<select value={assertion} onChange={(e) => setAssertion(e.target.value)}><option value="all">{t(['All cells', '所有单元格'])}</option><option value="reported">{t(['Any reported membership', '所有已报告归属'])}</option><option value="dominant">{t(['Dominant reported only', '仅已报告的主要归属'])}</option></select></label></>}
      {kind === 'navigate' && <nav aria-label={t(['Example chapter selection', '示例章节选择'])}>{chapters.map((item, i) => <button type="button" key={i} aria-pressed={chapter === i} onClick={() => setChapter(i)}>{t(item.title)}</button>)}</nav>}
      {kind === 'three-d' && <><label>{t(['Project case', '项目案例'])}<select value={place} onChange={(e) => setPlace(e.target.value as 'water' | 'mountain')}><option value="water">{t(['Kunshan', '昆山'])}</option><option value="mountain">{t(['Mandara', '曼达拉'])}</option></select></label><label>{t(['3D angle', '三维角度'])} · {angle}°<input type="range" min="0" max="22" value={angle} onChange={(e) => setAngle(Number(e.target.value))} /></label></>}
      {isColor && !paletteFamily && <label>{t(['Color relationship', '色彩关系'])}<select value={family} onChange={(e) => setFamily(e.target.value as ProjectPaletteFamily)}><option value="sequential">{t(['Magnitude · Kunshan rainfall', '数量 · 昆山降水'])}</option><option value="qualitative">{t(['Categories · Mandara assertions', '类别 · 曼达拉陈述'])}</option><option value="diverging">{t(['Deviation · Kunshan monthly reference', '偏差 · 昆山同月参考值'])}</option></select></label>}
      {isColor && !palette && <button type="button" aria-pressed={gray} onClick={() => setGray(!gray)}>{t(['Grayscale check', '灰度检查'])}</button>}
      <button type="button" className="project-example-reset" onClick={reset}>{t(['Reset example', '重置示例'])}</button>
    </div>
    <div className="project-comparison-pair">{[false, true].map((after) => <article key={String(after)} className={'project-comparison-panel ' + (after ? 'project-after' : 'project-before')}><h5>{t(after ? ['AFTER · apply the effect', '之后 · 应用效果'] : ['BEFORE · baseline', '之前 · 基线'])}</h5><p className="project-panel-caption">{t(after ? effect.after : effect.before)}</p>{panel(after)}</article>)}</div>
    <footer><p><strong>{t(['Try → adapt → evaluate', '尝试 → 改编 → 评价'])}</strong>{t(effect.transfer)}</p><p className="project-source">{isRain || kind === 'author' ? <>{t(['Source: bundled NASA POWER series, Kunshan (31.39° N, 120.98° E), retrieved 2026-09-20. Monthly modeled precipitation; not a rain gauge, flood record, or water-quality measure.', '来源：内置 NASA POWER 序列，昆山（北纬 31.39°，东经 120.98°），获取日期 2026-09-20。月度模型降水数据；不是雨量站、洪水记录或水质测量。'])} <a href={rain.metadata.source_url} target="_blank" rel="noreferrer">NASA POWER ↗</a></> : kind === 'navigate' || kind === 'three-d' ? <a href="#evidence">{t(['Inspect the original project sources and transformations', '查验项目原始来源与转换过程'])} →</a> : <>{t(['Source: paper-derived qualitative teaching layer. CPs are model identifiers; categories are assertions, not counts or probabilities. “Not asserted” does not establish absence.', '来源：论文衍生的定性教学层。CP 是模型标识；类别是陈述，不是计数或概率。“未作陈述”不能确立不存在。'])} <a href={paper.metadata.paper_url} target="_blank" rel="noreferrer">O’Brien et al. (2015) ↗</a></>}</p></footer>
  </section>
}
