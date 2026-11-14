import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type CoreObjectProps = { reducedMotion?: boolean; mobile?: boolean }

export default function CoreObject({ reducedMotion = false, mobile = false }: CoreObjectProps) {
  const group = useRef<THREE.Group>(null)
  const inner = useRef<THREE.Mesh>(null)
  useFrame((state, delta) => {
    if (reducedMotion) return
    if (group.current) {
      group.current.rotation.y += delta * 0.12
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.08
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.09 - Math.min(window.scrollY / window.innerHeight, 1) * 0.4
    }
    if (inner.current) inner.current.rotation.y -= delta * 0.22
  })
  return <group ref={group} rotation={[0.25, -0.2, -0.2]}>
    <mesh ref={inner}>
      <icosahedronGeometry args={[1.35, mobile ? 2 : 3]} />
      <meshStandardMaterial color="#192143" emissive="#253b85" emissiveIntensity={0.45} metalness={0.7} roughness={0.3} flatShading />
    </mesh>
    <mesh scale={1.015}>
      <icosahedronGeometry args={[1.35, 2]} />
      <meshBasicMaterial color="#63e9f1" wireframe transparent opacity={0.22} />
    </mesh>
    <mesh rotation={[Math.PI / 2.45, 0.25, 0]}>
      <torusGeometry args={[2.05, 0.008, 6, mobile ? 90 : 160]} />
      <meshBasicMaterial color="#52dce8" transparent opacity={0.65} />
    </mesh>
    <mesh rotation={[Math.PI / 2.1, -0.45, 0.35]}>
      <torusGeometry args={[2.38, 0.004, 6, mobile ? 90 : 160]} />
      <meshBasicMaterial color="#82aaff" transparent opacity={0.35} />
    </mesh>
    <pointLight position={[2, 2, 3]} intensity={25} color="#68f9ee" />
    <pointLight position={[-3, -2, -1]} intensity={16} color="#7546cc" />
    <ambientLight intensity={0.45} />
  </group>
}



