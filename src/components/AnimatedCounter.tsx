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
  const currentTarget = useRef(0)
  const waitingForData = useRef(true)

  // Mark when we first receive real data (target > 0)
  useEffect(() => {
    if (target > 0 && waitingForData.current) {
      waitingForData.current = false
    }
  }, [target])

  // Initial scroll-triggered animation — only fires when in view AND we have real data
  useEffect(() => {
    if (!isInView || hasAnimated.current || target === 0) return
    hasAnimated.current = true
    currentTarget.current = target

    const start = performance.now()
    const step = (now: number) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(eased * target)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [isInView, target, duration])

  // Live updates — smoothly animate to new target after initial animation
  useEffect(() => {
    if (!hasAnimated.current || target === currentTarget.current || target === 0) return
    const from = currentTarget.current
    currentTarget.current = target

    const start = performance.now()
    const animDuration = 0.6
    const step = (now: number) => {
      const elapsed = (now - start) / 1000
      const progress = Math.min(elapsed / animDuration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(from + (target - from) * eased)
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target])

  // Show dash while waiting for data, never show 0 for integer stats
  if (target === 0 && decimals === 0) {
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
