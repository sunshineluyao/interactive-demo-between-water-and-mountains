import { Canvas, useFrame } from '@react-three/fiber'
import { ArrowDown, CirclePause, CirclePlay, Compass, Database, MousePointer2, ShieldCheck } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'

const logicStages = [
  {
    id: 'question',
    number: '01',
    short: 'Question',
    title: 'Begin with a human question.',
    body: 'Name what a person or community needs to notice, compare, challenge, or explain before choosing a chart or control.',
    test: 'Can the question be understood without seeing the interface?',
    href: '#questions',
    link: 'Revisit the community lenses',
    Icon: Compass,
  },
  {
    id: 'evidence',
    number: '02',
    short: 'Evidence',
    title: 'Respect what the source can support.',
    body: 'Identify the records, scale, transformation, missing voices, and evidence boundary before encoding anything.',
    test: 'Can a reader tell what the data does not establish?',
    href: '#evidence',
    link: 'Inspect the source shelf',
    Icon: Database,
  },
  {
    id: 'interaction',
    number: '03',
    short: 'Interaction',
    title: 'Choose an action that reveals something.',
    body: 'Connect one user action to one visible response, one analytical purpose, and a clear way to reset or recover.',
    test: 'Does moving the control change what the learner can understand?',
    href: '#tutorial-studio',
    link: 'Try the guided studio',
    Icon: MousePointer2,
  },
  {
    id: 'validation',
    number: '04',
    short: 'Validation',
    title: 'Return the interpretation for challenge.',
    body: 'Check the domain, data and task, visual idiom, and algorithm—then invite community feedback before making a claim.',
    test: 'Who can disagree, and what would make you revise the design?',
    href: '#validate',
    link: 'See the four validation checks',
    Icon: ShieldCheck,
  },
] as const

function QuestionNode() {
  return (
    <group>
      <mesh><icosahedronGeometry args={[0.28, 2]} /><meshStandardMaterial color="#f7d68b" emissive="#efb858" emissiveIntensity={1.25} roughness={0.38} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[0.54, 0.025, 12, 64]} /><meshBasicMaterial color="#f7d68b" transparent opacity={0.7} /></mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}><torusGeometry args={[0.42, 0.012, 10, 48]} /><meshBasicMaterial color="#fff0bd" transparent opacity={0.42} /></mesh>
    </group>
  )
}

function EvidenceNode() {
  const points = useMemo(() => Array.from({ length: 15 }, (_, index) => ({
    x: ((index % 5) - 2) * 0.18,
    y: (Math.floor(index / 5) - 1) * 0.18,
    z: ((index * 7) % 5 - 2) * 0.08,
    strong: index === 7,
  })), [])
  return <group>{points.map((point, index) => <mesh key={index} position={[point.x, point.y, point.z]}><boxGeometry args={[0.11, 0.11, 0.11]} /><meshStandardMaterial color={point.strong ? '#ff9a69' : '#79dce1'} emissive={point.strong ? '#b64729' : '#24798a'} emissiveIntensity={point.strong ? 1.1 : 0.45} roughness={0.42} /></mesh>)}</group>
}

function InteractionNode({ motionEnabled }: { motionEnabled: boolean }) {
  const slider = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (!slider.current) return
    slider.current.position.x = motionEnabled ? Math.sin(state.clock.getElapsedTime() * 1.1) * 0.34 : 0.18
  })
  return (
    <group>
      <mesh position={[0, 0.22, 0]}><boxGeometry args={[0.95, 0.48, 0.08]} /><meshStandardMaterial color="#1d5361" emissive="#1a7180" emissiveIntensity={0.55} roughness={0.5} /></mesh>
      <mesh position={[0, -0.27, 0]}><boxGeometry args={[0.82, 0.055, 0.07]} /><meshBasicMaterial color="#9ddfe3" /></mesh>
      <mesh ref={slider} position={[0.18, -0.27, 0.08]}><sphereGeometry args={[0.105, 20, 20]} /><meshStandardMaterial color="#ff9a69" emissive="#c74f2f" emissiveIntensity={1.15} /></mesh>
      <mesh position={[0, 0.22, 0.08]} rotation={[0, 0, -0.18]}><torusGeometry args={[0.16, 0.025, 10, 44, Math.PI * 1.55]} /><meshBasicMaterial color="#f7d68b" /></mesh>
    </group>
  )
}

function ValidationNode({ motionEnabled }: { motionEnabled: boolean }) {
  const group = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.z = motionEnabled ? state.clock.getElapsedTime() * 0.12 : 0
  })
  return (
    <group ref={group}>
      {[0, 1, 2, 3].map((index) => {
        const angle = (index / 4) * Math.PI * 2
        return <mesh key={index} position={[Math.cos(angle) * 0.33, Math.sin(angle) * 0.33, 0]}><torusGeometry args={[0.13, 0.035, 10, 36]} /><meshStandardMaterial color={index === 3 ? '#ff9a69' : '#78d8dc'} emissive={index === 3 ? '#b7462b' : '#247b87'} emissiveIntensity={0.85} roughness={0.35} /></mesh>
      })}
      <mesh><octahedronGeometry args={[0.16, 0]} /><meshStandardMaterial color="#f7d68b" emissive="#d49a36" emissiveIntensity={1.15} /></mesh>
    </group>
  )
}

function LogicScene({ active, motionEnabled }: { active: number; motionEnabled: boolean }) {
  const root = useRef<THREE.Group>(null)
  const traveler = useRef<THREE.Mesh>(null)
  const nodes = [useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null), useRef<THREE.Group>(null)]
  const positions = useMemo(() => [-2.55, -0.85, 0.85, 2.55], [])
  const curve = useMemo(() => new THREE.CatmullRomCurve3(positions.map((x, index) => new THREE.Vector3(x, Math.sin(index * 1.4) * 0.16, 0))), [positions])
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 96, 0.018, 8, false), [curve])

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    if (root.current) {
      const pointerX = motionEnabled ? state.pointer.x * 0.11 : 0
      const pointerY = motionEnabled ? -state.pointer.y * 0.055 : 0
      root.current.rotation.y += (pointerX - root.current.rotation.y) * 0.04
      root.current.rotation.x += (pointerY - root.current.rotation.x) * 0.04
      root.current.position.x += (-positions[active] * 0.075 - root.current.position.x) * 0.045
    }
    nodes.forEach((node, index) => {
      if (!node.current) return
      const target = index === active ? 1.32 : 0.82
      const pulse = index === active && motionEnabled ? Math.sin(time * 2.2) * 0.035 : 0
      const scale = THREE.MathUtils.lerp(node.current.scale.x, target + pulse, 0.09)
      node.current.scale.setScalar(scale)
      node.current.position.y = (index === active ? 0.18 : 0) + (motionEnabled ? Math.sin(time * 0.72 + index) * 0.035 : 0)
    })
    if (traveler.current) {
      const base = active / (logicStages.length - 1)
      const drift = motionEnabled ? ((time * 0.08) % 0.18) - 0.09 : 0
      traveler.current.position.copy(curve.getPoint(THREE.MathUtils.clamp(base + drift, 0, 1)))
    }
  })

  return (
    <group ref={root} rotation={[-0.12, 0, 0]}>
      <ambientLight intensity={1.05} />
      <directionalLight position={[-4, 6, 7]} intensity={2.7} color="#d9ffff" />
      <pointLight position={[3, 1, 4]} intensity={24} distance={10} color="#ff8c61" />
      <gridHelper args={[9, 22, '#2a6670', '#153943']} position={[0, -1.05, 0]} />
      <mesh geometry={tube}><meshBasicMaterial color="#6fcfd5" transparent opacity={0.38} /></mesh>
      <mesh ref={traveler}><sphereGeometry args={[0.075, 16, 16]} /><meshStandardMaterial color="#fff0bd" emissive="#efb858" emissiveIntensity={1.4} /></mesh>
      <group ref={nodes[0]} position={[positions[0], 0, 0]}><QuestionNode /></group>
      <group ref={nodes[1]} position={[positions[1], 0, 0]}><EvidenceNode /></group>
      <group ref={nodes[2]} position={[positions[2], 0, 0]}><InteractionNode motionEnabled={motionEnabled} /></group>
      <group ref={nodes[3]} position={[positions[3], 0, 0]}><ValidationNode motionEnabled={motionEnabled} /></group>
    </group>
  )
}

function StaticLogicScene({ active }: { active: number }) {
  return <div className="logic-scene-fallback" aria-hidden="true">{logicStages.map((stage, index) => <i key={stage.id} className={index === active ? 'is-active' : undefined} />)}</div>
}

function LogicCanvas({ active, motionEnabled }: { active: number; motionEnabled: boolean }) {
  const supportsWebGl = typeof window !== 'undefined' && 'WebGLRenderingContext' in window
  if (!supportsWebGl) return <StaticLogicScene active={active} />
  return (
    <Canvas camera={{ position: [0, 0.45, 7.4], fov: 42 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }} fallback={<StaticLogicScene active={active} />}>
      <fog attach="fog" args={['#071d25', 7.2, 11]} />
      <LogicScene active={active} motionEnabled={motionEnabled} />
    </Canvas>
  )
}

export function TutorialLogicScene({ motionEnabled, lensName }: { motionEnabled: boolean; lensName: string }) {
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const stage = logicStages[active]

  useEffect(() => {
    if (!playing || !motionEnabled) return
    const timer = window.setInterval(() => setActive((value) => (value + 1) % logicStages.length), 4600)
    return () => window.clearInterval(timer)
  }, [playing, motionEnabled])

  useEffect(() => { if (!motionEnabled) setPlaying(false) }, [motionEnabled])

  return (
    <section id="tutorial-logic" className="tutorial-logic" aria-labelledby="tutorial-logic-title">
      <header className="tutorial-logic-heading">
        <div><span>One coherent learning route</span><h3 id="tutorial-logic-title">Question → evidence → interaction → validation</h3></div>
        <p>The interface is not the starting point. Follow this sequence so every animation, slider, map, and comparison serves an accountable learning goal.</p>
      </header>
      <div className="logic-current-lens"><span>Current question lens</span><strong>{lensName}</strong></div>
      <div className="tutorial-logic-shell">
        <div className="logic-canvas" aria-hidden="true">
          <LogicCanvas active={active} motionEnabled={motionEnabled} />
          <div className="logic-canvas-label"><span>{stage.number} · {stage.short}</span><strong>{stage.title}</strong></div>
        </div>
        <div className="logic-reading" aria-live="polite">
          <div className="logic-stage-topline"><span>Stage {stage.number}</span><button type="button" onClick={() => setPlaying((value) => !value)} aria-pressed={playing} disabled={!motionEnabled}>{playing ? <CirclePause aria-hidden="true" /> : <CirclePlay aria-hidden="true" />}{playing ? 'Pause route' : 'Play route'}</button></div>
          <stage.Icon aria-hidden="true" />
          <h4>{stage.title}</h4>
          <p>{stage.body}</p>
          <div><span>Checkpoint</span><strong>{stage.test}</strong></div>
          <a href={stage.href}>{stage.link} <ArrowDown aria-hidden="true" /></a>
        </div>
      </div>
      <nav className="logic-stage-buttons" aria-label="Four-step evidence design route">
        {logicStages.map((item, index) => <button key={item.id} type="button" aria-pressed={active === index} onClick={() => { setActive(index); setPlaying(false) }}><span>{item.number}</span><strong>{item.short}</strong></button>)}
      </nav>
    </section>
  )
}
