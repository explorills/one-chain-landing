import { useEffect, useRef, useState } from 'react'
import { useInView, motion } from 'framer-motion'

interface AnimatedCounterProps {
  target: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
}

export function AnimatedCounter({
  target,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const hasAnimated = useRef(false)
  const currentTarget = useRef(target)

  // Initial scroll-triggered animation
  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const start = performance.now()
    const step = (now: number) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * currentTarget.current)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, duration])

  // Live updates — smoothly animate to new target after initial animation
  useEffect(() => {
    if (!hasAnimated.current || target === currentTarget.current) return
    const from = currentTarget.current
    currentTarget.current = target

    const start = performance.now()
    const animDuration = 0.6 // faster for live updates
    const step = (now: number) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / animDuration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(from + (target - from) * eased)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target])

  const formatted = decimals > 0
    ? count.toFixed(decimals)
    : Math.floor(count).toLocaleString()

  return (
    <motion.span
      ref={ref}
      className="tabular-nums"
      style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'inherit' }}
    >
      {prefix}{formatted}{suffix}
    </motion.span>
  )
}
