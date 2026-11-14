import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

type StarFieldProps = { reducedMotion?: boolean; mobile?: boolean }

export default function StarField({ reducedMotion = false, mobile = false }: StarFieldProps) {
  const points = useRef<THREE.Points>(null)
  const material = useRef<THREE.ShaderMaterial>(null)
  const { positions, sizes, phases } = useMemo(() => {
    const count = mobile ? 450 : 1100
    const positions = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    const phases = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      // A deep volume rather than a flat backdrop gives the camera parallax room.
      positions[i * 3] = (Math.random() - 0.5) * 45
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30
      positions[i * 3 + 2] = -4 - Math.random() * 30
      sizes[i] = 1.2 + Math.pow(Math.random(), 3) * 4
      phases[i] = Math.random() * Math.PI * 2
    }
    return { positions, sizes, phases }
  }, [mobile])
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uPixelRatio: { value: Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.7) } }), [mobile])
  useFrame((_, delta) => {
    if (reducedMotion) return
    if (points.current) points.current.rotation.z += delta * 0.002
    if (material.current) material.current.uniforms.uTime.value += delta
  })
  return <points ref={points}>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
      <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
    </bufferGeometry>
    <shaderMaterial ref={material} transparent depthWrite={false} blending={THREE.AdditiveBlending} uniforms={uniforms}
      vertexShader={`
        attribute float aSize;
        attribute float aPhase;
        uniform float uTime;
        uniform float uPixelRatio;
        varying float vAlpha;
        void main() {
          vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * viewPosition;
          gl_PointSize = min(16.0, aSize * uPixelRatio * (18.0 / -viewPosition.z));
          vAlpha = 0.45 + 0.25 * sin(uTime * 0.5 + aPhase);
        }
      `}
      fragmentShader={`
        varying float vAlpha;
        void main() {
          float distanceToCenter = length(gl_PointCoord - vec2(0.5));
          float glow = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
          gl_FragColor = vec4(0.38, 0.88, 1.0, glow * vAlpha);
        }
      `} />
  </points>
}
