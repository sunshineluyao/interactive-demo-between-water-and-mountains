import { geoMercator, geoPath, line as d3Line, max, scaleLinear } from 'd3'
import { ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { PrecipitationData, WaterwayCollection, WaterwayFeature } from '../types'
import { readData } from '../lib/data'

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const places = [
  { name: 'Kunshan 昆山', coordinates: [120.9764683, 31.3869323] as [number, number] },
  { name: 'Jinxi 锦溪', coordinates: [120.8971115, 31.1835479] as [number, number] },
  { name: 'Zhouzhuang 周庄', coordinates: [120.8355975, 31.1317907] as [number, number] },
]

export function WaterAtlas({ motionEnabled }: { motionEnabled: boolean }) {
  const [waterways, setWaterways] = useState<WaterwayCollection | null>(null)
  const [precipitation, setPrecipitation] = useState<PrecipitationData | null>(null)
  const [selected, setSelected] = useState<WaterwayFeature | null>(null)
  const [time, setTime] = useState(293)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(true)
  const [error, setError] = useState('')
  const [retry, setRetry] = useState(0)
  const section = useRef<HTMLElement>(null)
  const year = 2001 + Math.floor(time / 12)
  const month = time % 12 + 1

  useEffect(() => {
    let cancelled = false
    setError('')
    Promise.all([readData<WaterwayCollection>('/data/kunshan-waterways.geojson'), readData<PrecipitationData>('/data/kunshan-precipitation.json')])
      .then(([water, rain]) => {
        if (cancelled) return
        setWaterways(water); setPrecipitation(rain)
        setSelected(water.features.find((feature) => feature.properties.name !== 'Unnamed waterway') ?? water.features[0])
      }).catch(() => { if (!cancelled) setError('The water data could not load. Check your connection, then try again.') })
    return () => { cancelled = true }
  }, [retry])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 })
    if (section.current) observer.observe(section.current)
    const onVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibility)
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility) }
  }, [])
  useEffect(() => {
    if (!motionEnabled) setPlaying(false)
  }, [motionEnabled])
  useEffect(() => {
    if (!playing || !motionEnabled || !visible || !pageVisible) return
    if (time === 299) { setPlaying(false); return }
    const timer = window.setTimeout(() => setTime(time + 1), 1000)
    return () => window.clearTimeout(timer)
  }, [playing, motionEnabled, visible, pageVisible, time])

  const projection = useMemo(() => waterways ? geoMercator().fitExtent([[32, 30], [768, 510]], waterways) : null, [waterways])
  const path = useMemo(() => projection ? geoPath(projection) : null, [projection])
  const current = precipitation?.records.find((record) => record.year === year && record.month === month)
  const yearRecords = precipitation?.records.filter((record) => record.year === year) ?? []
  const yMax = Math.ceil(max(precipitation?.records ?? [], (record) => record.mm_per_day) ?? 15)
  const chartX = scaleLinear().domain([1, 12]).range([32, 368])
  const chartY = scaleLinear().domain([0, yMax]).range([150, 12])
  const chartPath = d3Line<(typeof yearRecords)[number]>().x((record) => chartX(record.month)).y((record) => chartY(record.mm_per_day))(yearRecords)
  const seek = (value: number) => { setPlaying(false); setTime(Math.min(299, Math.max(0, value))) }

  return (
    <section ref={section} id="water" className="chapter water-chapter" data-chapter aria-labelledby="water-title">
      <div className="chapter-heading"><h2 id="water-title">A place you can<br />return to.</h2><p>Follow the water around Kunshan, Jinxi and Zhouzhuang. Choose a month, then a channel you could visit. What would you ask someone who lives beside it?</p></div>
      {error ? <div className="load-error" role="alert"><p>{error}</p><button onClick={() => setRetry((value) => value + 1)}>Try loading again</button></div> : !waterways || !precipitation ? <p className="map-loading" role="status">Opening the Kunshan map and monthly rainfall record…</p> : (
        <div className="water-stage">
          <div className="water-map-wrap">
            <div className="map-topline"><span>Kunshan &amp; its waterways</span><span>North is up</span></div>
            {path && projection && <svg className="water-map" viewBox="0 0 800 540" role="group" aria-label="Map of 420 waterway segments. Use the channel selector below as a keyboard alternative.">
              <title>Mapped waterways around Kunshan</title>
              <g className="water-lines">
                {waterways.features.map((feature) => <path key={String(feature.id)} d={path(feature) ?? undefined} className={`water-line water-${feature.properties.waterway} ${selected?.id === feature.id ? 'is-selected' : ''}`} onClick={() => setSelected(feature)}><title>{feature.properties.name} ({feature.properties.waterway})</title></path>)}
              </g>
              {places.map((place) => {
                const point = projection(place.coordinates)
                return point ? <g className="place-marker" key={place.name} transform={`translate(${point[0]},${point[1]})`}><circle r="5" /><text x="11" y="5">{place.name}</text></g> : null
              })}
            </svg>}
            <div className="map-legend"><span><i className="legend-river" />River</span><span><i className="legend-canal" />Canal</span><span><i className="legend-stream" />Stream</span><span><i className="legend-selected" />Selected</span></div>
            <div className="channel-select"><label htmlFor="waterway-select">Select a channel</label><select id="waterway-select" value={String(selected?.id ?? '')} onChange={(event) => setSelected(waterways.features.find((feature) => String(feature.id) === event.target.value) ?? null)}>{waterways.features.map((feature) => <option key={String(feature.id)} value={String(feature.id)}>{feature.properties.name} · {feature.properties.waterway} · {feature.properties.osm_id}</option>)}</select>{selected && <a href={selected.properties.source_url} target="_blank" rel="noreferrer">Inspect this OSM record <ArrowUpRight aria-hidden="true" /></a>}</div>
            <p className="map-caption">© OpenStreetMap contributors · ODbL 1.0. Simplified snapshot; the channels stay fixed as you change the month.</p>
          </div>
          <aside className="water-console" aria-label="Rainfall controls">
            <h3>Listen to the seasons.</h3>
            <p>Monthly precipitation near Kunshan, from NASA POWER.</p>
            <div className="rain-reading"><span>{months[month - 1]} {year}</span><strong>{current?.mm_per_day.toFixed(2) ?? 'No data'} <small>mm/day</small></strong><p>Monthly mean · approximately {current?.approx_month_total_mm.toFixed(0) ?? 'no data'} mm that month</p></div>
            <div className="timeline-controls">
              <label htmlFor="rain-year">Year <output>{year}</output></label><input id="rain-year" type="range" min="2001" max="2025" value={year} onChange={(event) => seek((Number(event.target.value) - 2001) * 12 + month - 1)} />
              <label htmlFor="rain-month">Month <output>{months[month - 1]}</output></label><input id="rain-month" type="range" min="1" max="12" value={month} aria-valuetext={months[month - 1]} onChange={(event) => seek((year - 2001) * 12 + Number(event.target.value) - 1)} />
              <div className="play-controls"><button aria-label="Previous month" onClick={() => seek(time - 1)} disabled={time === 0}><ChevronLeft aria-hidden="true" /></button><button onClick={() => { if (time === 299) setTime(0); setPlaying(!playing) }} disabled={!motionEnabled} aria-pressed={playing}>{playing ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" />}{playing ? 'Pause timeline' : time === 299 ? 'Replay from 2001' : 'Play timeline'}</button><button aria-label="Next month" onClick={() => seek(time + 1)} disabled={time === 299}><ChevronRight aria-hidden="true" /></button></div>
              {!motionEnabled && <small>Motion is paused. The sliders still work.</small>}
            </div>
            <div className="mini-chart">
              <svg viewBox="0 0 388 180" role="img" aria-label={`Monthly precipitation in ${year}. Fixed scale 0 to ${yMax} mm/day across all years.`}>
                {[0, yMax / 2, yMax].map((value) => <g key={value}><line x1="32" x2="368" y1={chartY(value)} y2={chartY(value)} /><text x="24" y={chartY(value) + 4} textAnchor="end">{value}</text></g>)}
                <path d={chartPath ?? undefined} />
                {current && <circle cx={chartX(month)} cy={chartY(current.mm_per_day)} r="6" />}
                <text x="32" y="174">Jan</text><text x="185" y="174">Jun</text><text x="347" y="174">Dec</text>
              </svg>
              <small>Fixed scale in mm/day. The dot follows your selected month.</small>
            </div>
            <p className="evidence-note">One coarse modeled grid point. This record cannot tell us whether a street flooded or a river was clean.</p>
            <a href={precipitation.metadata.source_url} target="_blank" rel="noreferrer">Inspect the NASA source <ArrowUpRight aria-hidden="true" /></a>
            <details><summary>Read the values for {year}</summary><table><caption>Monthly mean precipitation (mm/day)</caption><thead><tr><th scope="col">Month</th><th scope="col">mm/day</th></tr></thead><tbody>{yearRecords.map((record) => <tr key={record.month}><th scope="row">{months[record.month - 1]}</th><td>{record.mm_per_day.toFixed(2)}</td></tr>)}</tbody></table></details>
          </aside>
        </div>
      )}
      <a className="chapter-forward" href="#mountain">Continue to the Mandara evidence <ArrowRight aria-hidden="true" /></a>
    </section>
  )
}
