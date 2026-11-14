import { Component, Suspense, useEffect, useState, useRef, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import CoreObject from './CoreObject'
import StarField from './StarField'

class SceneErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() { return this.state.failed ? this.props.fallback : this.props.children }
}

function CameraMotion({ reducedMotion }: { reducedMotion: boolean }) {
  const pointer = useRef({ x: 0, y: 0 })
  useEffect(() => {
    if (reducedMotion) return
    const move = (event: PointerEvent) => { pointer.current = { x: (event.clientX / window.innerWidth) * 2 - 1, y: -(event.clientY / window.innerHeight) * 2 + 1 } }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [reducedMotion])
  useFrame((state, delta) => {
    if (reducedMotion) return
    const damping = 1 - Math.exp(-delta * 1.5)
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, pointer.current.x * 0.45, damping)
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, pointer.current.y * 0.3, damping)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

function useMedia(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])
  return matches
}

function Fallback() {
  return <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 48%, rgba(84, 105, 205, .24), transparent 38%), radial-gradient(ellipse at 65% 60%, rgba(88, 54, 143, .14), transparent 45%)' }} />
}

/** Decorative scene. The parent should provide a positioned container with dimensions. */
export default function SpaceScene() {
  const reducedMotion = useMedia('(prefers-reduced-motion: reduce)')
  const mobile = useMedia('(max-width: 768px)')
  const [webgl, setWebgl] = useState(true)
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      setWebgl(Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl')))
    } catch { setWebgl(false) }
  }, [])
  if (!webgl) return <Fallback />
  return <SceneErrorBoundary fallback={<Fallback />}>
    <Canvas aria-hidden="true" dpr={mobile ? [1, 1.25] : [1, 1.7]} camera={{ position: [0, 0, 7], fov: 42 }} gl={{ alpha: true, antialias: !mobile, powerPreference: 'low-power' }} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <Suspense fallback={null}>
        <CameraMotion reducedMotion={reducedMotion || mobile} />
        <StarField reducedMotion={reducedMotion} mobile={mobile} />
        <CoreObject reducedMotion={reducedMotion} mobile={mobile} />
      </Suspense>
    </Canvas>
  </SceneErrorBoundary>
}

