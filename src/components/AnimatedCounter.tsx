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
  const isInView = useInView(ref, { once: true })
  const hasAnimated = useRef(false)
  const currentTarget = useRef(0)

  // Scroll-triggered count-up animation
  // Starts from 90% of target so large numbers never flash 0
  useEffect(() => {
    if (!isInView || hasAnimated.current || target === 0) return
    hasAnimated.current = true
    currentTarget.current = target

    const startValue = target * 0.9
    const start = performance.now()
    const step = (now: number) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(startValue + (target - startValue) * eased)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration])

  // Live updates — smooth animate to new target
  useEffect(() => {
    if (!hasAnimated.current || target === currentTarget.current || target === 0) return
    const from = currentTarget.current
    currentTarget.current = target

    const start = performance.now()
    const step = (now: number) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / 0.6, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(from + (target - from) * eased)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target])

  // Show dash while waiting for data
  if (target === 0 && decimals === 0 && !hasAnimated.current) {
    return (
      <motion.span
        ref={ref}
        className="tabular-nums"
        style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 'inherit' }}
      >
        {prefix}—{suffix}
      </motion.span>
    )
  }

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
