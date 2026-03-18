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
  const pointerInteracting = useRef<number | null>(null)
  const pointerInteractionMovement = useRef(0)
  const [focusPoint, setFocusPoint] = useState<[number, number]>([0.3, 0.1])

  useEffect(() => {
    let phi = 0.3
    let width = 0

    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth
      }
    }
    window.addEventListener('resize', onResize)
    onResize()

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0.3,
      theta: 0.15,
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
        if (!pointerInteracting.current) {
          phi += 0.002
        }
        state.phi = phi + pointerInteractionMovement.current
        state.width = width * 2
        state.height = width * 2
      },
    })

    return () => {
      globe.destroy()
      window.removeEventListener('resize', onResize)
    }
  }, [])

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
        style={{ contain: 'layout paint size', cursor: 'grab' }}
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX - pointerInteractionMovement.current
          ;(e.target as HTMLCanvasElement).style.cursor = 'grabbing'
        }}
        onPointerUp={(e) => {
          pointerInteracting.current = null
          ;(e.target as HTMLCanvasElement).style.cursor = 'grab'
        }}
        onPointerOut={(e) => {
          pointerInteracting.current = null
          ;(e.target as HTMLCanvasElement).style.cursor = 'grab'
        }}
        onMouseMove={(e) => {
          if (pointerInteracting.current !== null) {
            const delta = e.clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta / 200
          }
        }}
        onTouchMove={(e) => {
          if (pointerInteracting.current !== null && e.touches[0]) {
            const delta = e.touches[0].clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta / 100
          }
        }}
      />
    </div>
  )
}
