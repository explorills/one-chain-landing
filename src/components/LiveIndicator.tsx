import { useState, useEffect } from 'react'

function getTimezoneLabel(): string {
  const offset = -new Date().getTimezoneOffset()
  const sign = offset >= 0 ? '+' : '-'
  const hours = Math.floor(Math.abs(offset) / 60)
  const mins = Math.abs(offset) % 60
  return mins > 0 ? `UTC${sign}${hours}:${String(mins).padStart(2, '0')}` : `UTC${sign}${hours}`
}

function formatTime(date: Date): string {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function LiveIndicator() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const tz = getTimezoneLabel()

  return (
    <div className="flex items-center justify-between gap-3 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg sm:rounded-xl bg-card/20 border border-border/20 backdrop-blur-sm">
      {/* Live dot + label */}
      <div className="flex items-center gap-2">
        <div className="relative flex items-center justify-center w-2.5 h-2.5">
          <div className="absolute w-2.5 h-2.5 rounded-full bg-[#16a34a]" />
          <div
            className="absolute w-2.5 h-2.5 rounded-full bg-[#16a34a]"
            style={{ animation: 'pulse-ring 2s ease-out infinite' }}
          />
        </div>
        <span
          className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#16a34a]"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Live
        </span>
      </div>

      {/* Clock + timezone */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span
          className="text-[11px] sm:text-xs text-muted-foreground hidden min-[400px]:inline"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {formatDate(now)}
        </span>
        <span
          className="text-[11px] sm:text-xs text-foreground/80 tabular-nums"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {formatTime(now)}
        </span>
        <span
          className="text-[10px] sm:text-[11px] text-muted-foreground"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          ({tz})
        </span>
      </div>
    </div>
  )
}
