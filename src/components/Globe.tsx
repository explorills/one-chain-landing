import { useEffect, useRef, useState } from 'react'
import createGlobe from 'cobe'

// Node locations — real cities representing ONE ecosystem global distribution
const NODE_MARKERS: [number, number][] = [
  [51.5074, -0.1278],   // London
  [40.7128, -74.006],   // New York
  [35.6762, 139.6503],  // Tokyo
  [-33.8688, 151.2093], // Sydney
  [48.8566, 2.3522],    // Paris
  [1.3521, 103.8198],   // Singapore
  [37.5665, 126.978],   // Seoul
  [55.7558, 37.6173],   // Moscow
  [19.076, 72.8777],    // Mumbai
  [-23.5505, -46.6333], // São Paulo
  [52.52, 13.405],      // Berlin
  [43.6532, -79.3832],  // Toronto
  [25.2048, 55.2708],   // Dubai
  [59.3293, 18.0686],   // Stockholm
  [47.3769, 8.5417],    // Zurich
  [41.0082, 28.9784],   // Istanbul
  [-34.6037, -58.3816], // Buenos Aires
  [13.7563, 100.5018],  // Bangkok
]

export function Globe() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const pointerDown = useRef(false)
  const pointerX = useRef(0)
  const pointerY = useRef(0)
  const velocityX = useRef(0)
  const velocityY = useRef(0)
  const phiRef = useRef(0.3)
  const thetaRef = useRef(0.15)
  const [webglSupported, setWebglSupported] = useState(true)

  useEffect(() => {
    if (!canvasRef.current) return

    // Check WebGL support before initializing
    const gl = canvasRef.current.getContext('webgl') || canvasRef.current.getContext('experimental-webgl')
    if (!gl) {
      setWebglSupported(false)
      return
    }

    let width = 0
    const FRICTION = 0.95
    const SENSITIVITY = 0.005
    const AUTO_SPIN = 0.002

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }
    window.addEventListener('resize', onResize)
    onResize()

    let globe: ReturnType<typeof createGlobe>
    try {
      globe = createGlobe(canvasRef.current, {
        devicePixelRatio: 2,
        width: width * 2,
        height: width * 2,
        phi: phiRef.current,
        theta: thetaRef.current,
        dark: 1,
        diffuse: 3,
        mapSamples: 36000,
        mapBrightness: 2.5,
        baseColor: [0.15, 0.2, 0.35],
        markerColor: [0.4, 0.7, 1.0],
        glowColor: [0.12, 0.18, 0.35],
        markers: NODE_MARKERS.map(([lat, lng]) => ({
          location: [lat, lng] as [number, number],
          size: 0.04,
        })),
        onRender: (state) => {
          if (!pointerDown.current) {
            if (Math.abs(velocityX.current) > 0.0001 || Math.abs(velocityY.current) > 0.0001) {
              phiRef.current += velocityX.current
              thetaRef.current += velocityY.current
              velocityX.current *= FRICTION
              velocityY.current *= FRICTION
            } else {
              phiRef.current += AUTO_SPIN
            }
          }

          state.phi = phiRef.current
          state.theta = thetaRef.current
          state.width = width * 2
          state.height = width * 2
        },
      })
    } catch {
      setWebglSupported(false)
      return
    }

    const canvas = canvasRef.current

    const onPointerDown = (e: PointerEvent) => {
      pointerDown.current = true
      pointerX.current = e.clientX
      pointerY.current = e.clientY
      velocityX.current = 0
      velocityY.current = 0
      canvas.style.cursor = 'grabbing'
      canvas.setPointerCapture(e.pointerId)
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!pointerDown.current) return
      const dx = e.clientX - pointerX.current
      const dy = e.clientY - pointerY.current
      pointerX.current = e.clientX
      pointerY.current = e.clientY

      const flipH = Math.cos(thetaRef.current) >= 0 ? 1 : -1

      velocityX.current = dx * SENSITIVITY * flipH
      velocityY.current = dy * SENSITIVITY

      phiRef.current += velocityX.current
      thetaRef.current += velocityY.current
    }

    const onPointerUp = (e: PointerEvent) => {
      pointerDown.current = false
      canvas.style.cursor = 'grab'
      canvas.releasePointerCapture(e.pointerId)
    }

    canvas.addEventListener('pointerdown', onPointerDown)
    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerup', onPointerUp)
    canvas.addEventListener('pointerleave', onPointerUp)

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('pointerdown', onPointerDown)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerup', onPointerUp)
      canvas.removeEventListener('pointerleave', onPointerUp)
    }
  }, [])

  if (!webglSupported) {
    return (
      <div className="relative w-full aspect-square max-w-[600px] mx-auto">
        <div
          className="absolute inset-[-10%] rounded-full"
          style={{
            background: 'radial-gradient(circle, oklch(0.45 0.12 220 / 0.15) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute inset-[10%] rounded-full"
          style={{
            background: 'radial-gradient(circle at 35% 35%, oklch(0.25 0.08 220) 0%, oklch(0.15 0.06 240) 40%, oklch(0.08 0.03 260) 100%)',
            boxShadow: 'inset 0 0 60px oklch(0.30 0.10 220 / 0.3), 0 0 80px oklch(0.35 0.12 220 / 0.15)',
          }}
        />
      </div>
    )
  }

  return (
    <div className="relative w-full aspect-square max-w-[600px] mx-auto">
      {/* Outer glow ring */}
      <div
        className="absolute inset-[-10%] rounded-full"
        style={{
          background: 'radial-gradient(circle, oklch(0.45 0.12 220 / 0.15) 0%, transparent 70%)',
        }}
      />
      {/* Inner atmosphere */}
      <div
        className="absolute inset-[5%] rounded-full"
        style={{
          background: 'radial-gradient(circle at 30% 30%, oklch(0.50 0.10 210 / 0.08) 0%, transparent 60%)',
        }}
      />
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ contain: 'layout paint size', cursor: 'grab', touchAction: 'none' }}
      />
    </div>
  )
}
