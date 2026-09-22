import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

function WaterLines({ motionEnabled }: { motionEnabled: boolean }) {
  const group = useRef<THREE.Group>(null)
  const paths = useMemo(
    () =>
      Array.from({ length: 9 }, (_, line) =>
        Array.from({ length: 54 }, (_, index) => {
          const x = -5.4 + (index / 53) * 10.8
          const wave = Math.sin(index * 0.35 + line * 0.76) * 0.18
          const sweep = Math.sin(index * 0.09 + line * 0.4) * 0.72
          return new THREE.Vector3(x, -1.75 + line * 0.31 + wave + sweep * 0.12, wave * 0.5)
        }),
      ),
    [],
  )

  useFrame((state) => {
    if (!group.current) return
    const t = motionEnabled ? state.clock.getElapsedTime() : 0
    group.current.position.x = Math.sin(t * 0.14) * 0.25
    group.current.rotation.z = -0.08 + Math.sin(t * 0.12) * 0.02
  })

  return (
    <group ref={group} position={[-2.8, -0.5, 0.3]} rotation={[0.2, -0.32, -0.08]}>
      {paths.map((points, index) => {
        const positions = new Float32Array(points.flatMap((point) => [point.x, point.y, point.z]))
        return (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial
              color={index % 3 === 0 ? '#8df2e5' : '#35aeb6'}
              transparent
              opacity={0.22 + index * 0.035}
            />
          </line>
        )
      })}
    </group>
  )
}

function MountainMesh({ motionEnabled }: { motionEnabled: boolean }) {
  const mesh = useRef<THREE.Mesh>(null)
  const geometry = useMemo(() => {
    const result = new THREE.PlaneGeometry(7.6, 5.8, 42, 32)
    const positions = result.attributes.position as THREE.BufferAttribute
    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index)
      const y = positions.getY(index)
      const ridge = Math.exp(-Math.pow(x * 0.58, 2)) * 1.65
      const shoulder = Math.exp(-Math.pow((x - 1.65) * 0.9, 2)) * 0.72
      const cut = Math.sin(y * 2.25 + x * 0.7) * 0.16
      const taper = Math.max(0, 1 - Math.abs(y) / 3.3)
      positions.setZ(index, (ridge + shoulder + cut) * taper)
    }
    positions.needsUpdate = true
    result.computeVertexNormals()
    return result
  }, [])

  useFrame((state) => {
    if (!mesh.current) return
    const t = motionEnabled ? state.clock.getElapsedTime() : 0
    mesh.current.rotation.z = 0.07 + Math.sin(t * 0.1) * 0.018
    mesh.current.position.y = Math.cos(t * 0.15) * 0.06
  })

  return (
    <mesh
      ref={mesh}
      geometry={geometry}
      position={[2.35, -0.3, -0.8]}
      rotation={[-1.08, 0.05, 0.07]}
    >
      <meshStandardMaterial
        color="#c66e42"
        emissive="#6f301e"
        emissiveIntensity={0.55}
        roughness={0.82}
        metalness={0.1}
        wireframe
        transparent
        opacity={0.72}
      />
    </mesh>
  )
}

function Dust({ motionEnabled }: { motionEnabled: boolean }) {
  const points = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const values = new Float32Array(360 * 3)
    for (let index = 0; index < 360; index += 1) {
      values[index * 3] = (Math.random() - 0.5) * 13
      values[index * 3 + 1] = (Math.random() - 0.5) * 7
      values[index * 3 + 2] = (Math.random() - 0.5) * 4
    }
    return values
  }, [])

  useFrame((state) => {
    if (!points.current || !motionEnabled) return
    points.current.rotation.y = state.clock.getElapsedTime() * 0.012
  })

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial transparent color="#efe4ca" size={0.018} sizeAttenuation depthWrite={false} opacity={0.5} />
    </points>
  )
}

function Scene({ motionEnabled }: { motionEnabled: boolean }) {
  const root = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (!root.current) return
    const factor = motionEnabled ? 1 : 0
    root.current.rotation.y += (state.pointer.x * 0.08 * factor - root.current.rotation.y) * 0.025
    root.current.rotation.x += (-state.pointer.y * 0.04 * factor - root.current.rotation.x) * 0.025
  })

  return (
    <group ref={root}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[-4, 6, 5]} intensity={1.4} color="#c2fff5" />
      <pointLight position={[4, 1, 4]} intensity={18} distance={12} color="#eb8351" />
      <WaterLines motionEnabled={motionEnabled} />
      <MountainMesh motionEnabled={motionEnabled} />
      <Dust motionEnabled={motionEnabled} />
    </group>
  )
}

export function AtlasScene({ motionEnabled }: { motionEnabled: boolean }) {
  return (
    <div className="atlas-scene" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0.1, 8.4], fov: 46 }}
        dpr={[1, 1.65]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        fallback={<div className="scene-fallback" />}
      >
        <fog attach="fog" args={['#07191b', 7, 14]} />
        <Scene motionEnabled={motionEnabled} />
      </Canvas>
      <div className="scene-veil" />
    </div>
  )
}
