import { useEffect, useState } from 'react'

interface StreamLine {
  id: number
  x: number
  height: number
  delay: number
  duration: number
  opacity: number
}

export function DataStream({ count = 20 }: { count?: number }) {
  const [lines, setLines] = useState<StreamLine[]>([])

  useEffect(() => {
    const generated: StreamLine[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      height: 30 + Math.random() * 120,
      delay: Math.random() * 8,
      duration: 4 + Math.random() * 6,
      opacity: 0.08 + Math.random() * 0.15,
    }))
    setLines(generated)
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {lines.map((line) => (
        <div
          key={line.id}
          className="absolute bottom-0"
          style={{
            left: `${line.x}%`,
            width: '1px',
            height: `${line.height}px`,
            background: `linear-gradient(to top, transparent, oklch(0.65 0.12 220 / ${line.opacity}), transparent)`,
            animation: `data-flow ${line.duration}s ${line.delay}s ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}

// Horizontal variant for section dividers
export function DataStreamHorizontal() {
  const [particles, setParticles] = useState<Array<{
    id: number
    y: number
    size: number
    delay: number
    duration: number
  }>>([])

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        y: Math.random() * 4 - 2,
        size: 1 + Math.random() * 3,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 4,
      }))
    )
  }, [])

  return (
    <div className="relative w-full h-px overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            top: `${p.y}px`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: 'oklch(0.70 0.12 220)',
            left: '-5%',
            animation: `shimmer ${p.duration}s ${p.delay}s linear infinite`,
            opacity: 0.6,
          }}
        />
      ))}
    </div>
  )
}
