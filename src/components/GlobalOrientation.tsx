import { Canvas, useFrame } from '@react-three/fiber'
import { ArrowDown, ArrowUpRight, Database, Globe2, Layers3, MapPin } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

type PlaceId = 'both' | 'kunshan' | 'mandara'
type SourceLayerId = 'mapped' | 'climate' | 'material'

const places = {
  kunshan: {
    name: 'Kunshan',
    nameZh: '昆山',
    region: 'Jiangsu, China · 中国江苏',
    coordinates: '31.39° N, 120.98° E',
    why: 'A lower-Yangtze-delta city where canals, changing weather, heritage, and everyday mobility make water a community question—not just a line on a map.',
    boundary: 'The atlas uses mapped waterways and modeled precipitation. It does not measure canal flow, flooding, water quality, or residents’ experience.',
    mapUrl: 'https://www.openstreetmap.org/?mlat=31.39&mlon=120.98#map=9/31.39/120.98',
    evidenceUrl: 'https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=PRECTOTCORR&community=AG&longitude=120.98&latitude=31.39&start=2001&end=2025&format=JSON',
    evidenceLabel: 'Open Kunshan climate record',
  },
  mandara: {
    name: 'Mandara Mountains',
    nameZh: '曼达拉山脉',
    region: 'Cameroon–Nigeria border · 喀麦隆—尼日利亚边境',
    coordinates: 'about 11° N, 14° E · regional orientation',
    why: 'A highly diverse borderland where archaeological ceramics help researchers ask how material patterns varied across sites and excavation levels.',
    boundary: 'The marker locates the wider study region, not an excavation. Statistical pottery patterns are not names for peoples or present-day communities.',
    mapUrl: 'https://www.openstreetmap.org/?mlat=11.0&mlon=14.0#map=7/11.0/14.0',
    evidenceUrl: 'https://arxiv.org/abs/1511.05185',
    evidenceLabel: 'Read the archaeological study',
  },
}

const sourceLayers = {
  mapped: {
    eyebrow: 'Mapped context · OpenStreetMap',
    metric: '420 waterway ways',
    body: 'Rivers, canals, and streams provide spatial context around Kunshan. The pulsing rings are a schematic source symbol; actual channel geometry appears in the water chapter.',
    boundary: 'Map completeness and tagging vary. A mapped line is not flow, water quality, or lived meaning.',
    href: 'https://www.openstreetmap.org/#map=11/31.27/120.94',
  },
  climate: {
    eyebrow: 'Environmental context · NASA POWER',
    metric: '300 monthly means · 2001–2025',
    body: 'The twelve orbiting points stand for months and introduce a time-varying record at 31.39° N, 120.98° E. The water chapter exposes every monthly value.',
    boundary: 'Modeled precipitation context is not a local rain gauge, flood record, channel discharge, or water-quality measure.',
    href: 'https://power.larc.nasa.gov/docs/services/api/temporal/monthly/',
  },
  material: {
    eyebrow: 'Material history · tDAR + O’Brien et al.',
    metric: '239,629 sherds · 14 primary inferred patterns',
    body: 'Fourteen orbiting points introduce CP1–CP14 as model identifiers. The mountain chapter explains how observed decoration counts become inferred patterns.',
    boundary: 'The points are a teaching diagram, not geographic positions. A CP is not a named people, culture, date, or chapter.',
    href: 'https://arxiv.org/abs/1511.05185',
  },
}

function latLonToVector3(latitude: number, longitude: number, radius = 2.02) {
  const phi = THREE.MathUtils.degToRad(90 - latitude)
  const theta = THREE.MathUtils.degToRad(longitude + 180)
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  )
}

const kunshanPosition = latLonToVector3(31.39, 120.98)
const mandaraPosition = latLonToVector3(11, 14)

function Graticule() {
  const lines = useMemo(() => {
    const all: THREE.Vector3[][] = []
    for (const latitude of [-60, -30, 0, 30, 60]) {
      all.push(Array.from({ length: 97 }, (_, index) => latLonToVector3(latitude, -180 + index * 3.75, 2.035)))
    }
    for (let longitude = -180; longitude < 180; longitude += 30) {
      all.push(Array.from({ length: 73 }, (_, index) => latLonToVector3(-90 + index * 2.5, longitude, 2.035)))
    }
    return all
  }, [])

  return <>{lines.map((points, index) => {
    const positions = new Float32Array(points.flatMap((point) => point.toArray()))
    return <line key={index}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /></bufferGeometry><lineBasicMaterial color="#8bbbc3" transparent opacity={0.2} /></line>
  })}</>
}

function PlaceMarker({ position, color, selected, motionEnabled }: { position: THREE.Vector3; color: string; selected: boolean; motionEnabled: boolean }) {
  const ring = useRef<THREE.Group>(null)
  const orientation = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), position.clone().normalize()), [position])
  useFrame((state) => {
    if (!ring.current) return
    const pulse = motionEnabled ? 1 + Math.sin(state.clock.getElapsedTime() * 2.1) * 0.14 : 1
    ring.current.scale.setScalar(selected ? pulse * 1.2 : pulse)
  })
  return (
    <group position={position} quaternion={orientation}>
      <mesh><sphereGeometry args={[selected ? 0.095 : 0.075, 20, 20]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} /></mesh>
      <group ref={ring}><mesh position={[0, 0, -0.015]}><torusGeometry args={[selected ? 0.19 : 0.15, 0.018, 10, 40]} /><meshBasicMaterial color={color} transparent opacity={selected ? 0.95 : 0.55} /></mesh></group>
    </group>
  )
}

function SourceGlyph({ layer, motionEnabled }: { layer: SourceLayerId; motionEnabled: boolean }) {
  const group = useRef<THREE.Group>(null)
  const isMaterial = layer === 'material'
  const anchor = isMaterial ? mandaraPosition : kunshanPosition
  const orientation = useMemo(() => new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), anchor.clone().normalize()), [anchor])
  const count = layer === 'material' ? 14 : layer === 'climate' ? 12 : 3
  useFrame((state) => {
    if (!group.current || !motionEnabled) return
    group.current.rotation.z = state.clock.getElapsedTime() * (layer === 'mapped' ? 0.18 : 0.34)
  })
  return (
    <group ref={group} position={anchor} quaternion={orientation}>
      {layer === 'mapped' ? Array.from({ length: count }, (_, index) => (
        <mesh key={index} position={[0, 0, 0.015 + index * 0.01]}><torusGeometry args={[0.24 + index * 0.11, 0.012, 8, 48]} /><meshBasicMaterial color="#69d9df" transparent opacity={0.75 - index * 0.16} /></mesh>
      )) : Array.from({ length: count }, (_, index) => {
        const angle = (index / count) * Math.PI * 2
        const radius = isMaterial ? 0.42 : 0.36
        return <mesh key={index} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0.04]}><sphereGeometry args={[isMaterial ? 0.035 : 0.03, 12, 12]} /><meshBasicMaterial color={isMaterial ? '#ff9a69' : '#69d9df'} /></mesh>
      })}
    </group>
  )
}

function ConnectionArc({ motionEnabled }: { motionEnabled: boolean }) {
  const traveler = useRef<THREE.Mesh>(null)
  const curve = useMemo(() => {
    const middle = kunshanPosition.clone().add(mandaraPosition).normalize().multiplyScalar(3.15)
    return new THREE.QuadraticBezierCurve3(kunshanPosition, middle, mandaraPosition)
  }, [])
  const geometry = useMemo(() => new THREE.TubeGeometry(curve, 64, 0.012, 8, false), [curve])
  useFrame((state) => {
    if (!traveler.current) return
    const progress = motionEnabled ? (state.clock.getElapsedTime() * 0.09) % 1 : 0.5
    traveler.current.position.copy(curve.getPoint(progress))
  })
  return <><mesh geometry={geometry}><meshBasicMaterial color="#f2c078" transparent opacity={0.7} /></mesh><mesh ref={traveler}><sphereGeometry args={[0.055, 14, 14]} /><meshBasicMaterial color="#fff1c7" /></mesh></>
}

function GlobeScene({ place, layer, motionEnabled }: { place: PlaceId; layer: SourceLayerId; motionEnabled: boolean }) {
  const root = useRef<THREE.Group>(null)
  const targetRotation = place === 'kunshan' ? Math.PI - 0.54 : place === 'mandara' ? Math.PI + 1.32 : Math.PI
  useFrame((state) => {
    if (!root.current) return
    const targetX = place === 'kunshan' ? 0.5 : place === 'mandara' ? 0.18 : -0.03
    if (!motionEnabled) {
      root.current.rotation.set(targetX, targetRotation, 0)
      return
    }
    const pointerOffset = motionEnabled ? state.pointer.x * 0.08 : 0
    root.current.rotation.y += (targetRotation + pointerOffset - root.current.rotation.y) * 0.045
    root.current.rotation.x += (targetX - root.current.rotation.x) * 0.045
  })
  return (
    <group ref={root} rotation={[-0.03, Math.PI, 0]}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 4, 6]} intensity={2.8} color="#d8ffff" />
      <pointLight position={[-4, -2, 4]} intensity={22} distance={12} color="#ff9a69" />
      <mesh><sphereGeometry args={[2, 64, 64]} /><meshStandardMaterial color="#143c48" roughness={0.7} metalness={0.08} /></mesh>
      <mesh><sphereGeometry args={[2.075, 48, 48]} /><meshBasicMaterial color="#7bdfe0" wireframe transparent opacity={0.055} /></mesh>
      <Graticule />
      <ConnectionArc motionEnabled={motionEnabled} />
      <PlaceMarker position={kunshanPosition} color="#69d9df" selected={place === 'kunshan'} motionEnabled={motionEnabled} />
      <PlaceMarker position={mandaraPosition} color="#ff8a5c" selected={place === 'mandara'} motionEnabled={motionEnabled} />
      <SourceGlyph layer={layer} motionEnabled={motionEnabled} />
    </group>
  )
}

function StaticGlobe({ layer, place }: { layer: SourceLayerId; place: PlaceId }) {
  return (
    <svg className="static-globe" viewBox="0 0 640 520" role="img" aria-label="Fallback globe showing Kunshan in China and the Mandara Mountains on the Cameroon–Nigeria border">
      <defs><radialGradient id="globeShade" cx="35%" cy="28%"><stop offset="0" stopColor="#2a6975" /><stop offset="1" stopColor="#0e303b" /></radialGradient></defs>
      <circle cx="320" cy="254" r="194" fill="url(#globeShade)" stroke="#8bd9dc" strokeOpacity=".45" />
      {[118, 185, 254, 323, 390].map((y) => <ellipse key={y} cx="320" cy={y} rx={Math.sqrt(Math.max(0, 194 ** 2 - (y - 254) ** 2))} ry="18" fill="none" stroke="#a8d9dc" strokeOpacity=".2" />)}
      {[0, 1, 2, 3, 4].map((index) => <ellipse key={index} cx="320" cy="254" rx={38 + index * 38} ry="194" fill="none" stroke="#a8d9dc" strokeOpacity=".18" />)}
      <path d="M239 211 Q333 76 435 256" fill="none" stroke="#f2c078" strokeWidth="3" strokeDasharray="7 8" />
      <circle cx="239" cy="211" r={place === 'kunshan' ? 15 : 10} fill="#69d9df" stroke="#fff" strokeWidth={place === 'kunshan' ? 3 : 0} /><circle cx="435" cy="256" r={place === 'mandara' ? 15 : 10} fill="#ff8a5c" stroke="#fff" strokeWidth={place === 'mandara' ? 3 : 0} />
      <circle cx={layer === 'material' ? 435 : 239} cy={layer === 'material' ? 256 : 211} r={layer === 'mapped' ? 34 : 27} fill="none" stroke={layer === 'material' ? '#ff8a5c' : '#69d9df'} strokeWidth="3" opacity=".8" />
      <text x="132" y="190">Kunshan · 昆山</text><text x="452" y="286">Mandara</text>
    </svg>
  )
}

function GlobeCanvas({ place, layer, motionEnabled }: { place: PlaceId; layer: SourceLayerId; motionEnabled: boolean }) {
  const supportsWebGl = typeof window !== 'undefined' && 'WebGLRenderingContext' in window
  if (!supportsWebGl) return <StaticGlobe layer={layer} place={place} />
  return (
    <Canvas camera={{ position: [0, 0, 7.1], fov: 43 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} fallback={<StaticGlobe layer={layer} place={place} />}>
      <fog attach="fog" args={['#071d25', 7.5, 12]} />
      <GlobeScene place={place} layer={layer} motionEnabled={motionEnabled} />
    </Canvas>
  )
}

export function GlobalOrientation({ motionEnabled }: { motionEnabled: boolean }) {
  const [activePlace, setActivePlace] = useState<PlaceId>('both')
  const [activeLayer, setActiveLayer] = useState<SourceLayerId>('mapped')
  const source = sourceLayers[activeLayer]

  return (
    <section id="orientation" className="orientation-chapter" data-chapter aria-labelledby="orientation-title">
      <div className="orientation-heading">
        <div><span className="orientation-kicker"><Globe2 aria-hidden="true" /> Global orientation · 全球定位</span><h1 id="orientation-title">Two places.<br />One careful question.</h1></div>
        <div><p>Before comparing evidence, locate it. Kunshan is in eastern China; the Mandara Mountains cross the Cameroon–Nigeria border. This atlas connects questions—not histories, peoples, or causes.</p><a href="#questions">Choose a community question <ArrowDown aria-hidden="true" /></a></div>
      </div>

      <div className="globe-explorer">
        <div className="globe-stage">
          <GlobeCanvas place={activePlace} layer={activeLayer} motionEnabled={motionEnabled} />
          <div className="globe-key" aria-hidden="true"><span><i className="key-kunshan" />Kunshan</span><span><i className="key-mandara" />Mandara region</span><span><i className="key-arc" />question bridge</span></div>
          <p className="globe-caption">Interactive 3D orientation. Pointer movement changes the view; the controls provide a keyboard-accessible route. Marker positions are regional, and the arc represents the course question—not migration or a historical connection.</p>
        </div>

        <aside className="globe-console" aria-label="3D orientation controls">
          <div className="globe-control-group"><span>01 · Place view</span><div role="group" aria-label="Choose a place view">
            <button type="button" aria-pressed={activePlace === 'both'} onClick={() => setActivePlace('both')}>View both</button>
            <button type="button" aria-pressed={activePlace === 'kunshan'} onClick={() => setActivePlace('kunshan')}>Kunshan</button>
            <button type="button" aria-pressed={activePlace === 'mandara'} onClick={() => setActivePlace('mandara')}>Mandara</button>
          </div></div>
          <div className="globe-control-group"><span>02 · Source layer</span><div role="group" aria-label="Choose a data source layer">
            <button type="button" aria-pressed={activeLayer === 'mapped'} onClick={() => setActiveLayer('mapped')}>Mapped context</button>
            <button type="button" aria-pressed={activeLayer === 'climate'} onClick={() => setActiveLayer('climate')}>Climate</button>
            <button type="button" aria-pressed={activeLayer === 'material'} onClick={() => setActiveLayer('material')}>Material history</button>
          </div></div>
          <article className="source-layer-reading" key={activeLayer} aria-live="polite">
            <Database aria-hidden="true" /><span>{source.eyebrow}</span><strong>{source.metric}</strong><p>{source.body}</p><small>{source.boundary}</small><a href={source.href} target="_blank" rel="noreferrer">Open source <ArrowUpRight aria-hidden="true" /></a>
          </article>
        </aside>
      </div>

      <div className="place-introductions" aria-label="Why these places matter">
        {(Object.keys(places) as Array<keyof typeof places>).map((id) => {
          const place = places[id]
          return <article key={id} className={activePlace === id ? 'is-active' : undefined}><header><MapPin aria-hidden="true" /><div><span>{place.region}</span><h2>{place.name} <i lang="zh-CN">{place.nameZh}</i></h2></div></header><strong>{place.coordinates}</strong><p>{place.why}</p><small>{place.boundary}</small><div className="place-source-links"><a href={place.mapUrl} target="_blank" rel="noreferrer">Locate on OpenStreetMap <ArrowUpRight aria-hidden="true" /></a><a href={place.evidenceUrl} target="_blank" rel="noreferrer">{place.evidenceLabel} <ArrowUpRight aria-hidden="true" /></a></div></article>
        })}
      </div>

      <figure className="bilingual-quote">
        <blockquote><p lang="zh-Hant">知者樂水，仁者樂山。</p><p className="quote-pinyin">Zhì zhě yào shuǐ, rén zhě yào shān.</p><p lang="en">“The wise delight in water; the humane delight in mountains.”</p></blockquote>
        <figcaption><strong>A question-making lens, not evidence.</strong><p>Our teaching translation from <cite>Analects</cite>, Yong Ye. It is commonly numbered 6.23; the linked Wikisource edition labels it 六之二一. The passage does not describe Kunshan or Mandara and should not be used as a cultural label for either place.</p><a href="https://zh.wikisource.org/wiki/%E8%AB%96%E8%AA%9E/%E9%9B%8D%E4%B9%9F%E7%AC%AC%E5%85%AD" target="_blank" rel="noreferrer">Source: Chinese Wikisource · Yong Ye <ArrowUpRight aria-hidden="true" /></a></figcaption>
      </figure>
    </section>
  )
}
