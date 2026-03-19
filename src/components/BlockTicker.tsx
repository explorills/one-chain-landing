import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Block {
  number: number
  hash: string
  txCount: number
  timestamp: number
}

function randomHash(): string {
  const chars = '0123456789abcdef'
  let hash = '0x'
  for (let i = 0; i < 8; i++) {
    hash += chars[Math.floor(Math.random() * 16)]
  }
  return hash + '...'
}

export function BlockTicker() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const blockNum = useRef(2_847_391)

  useEffect(() => {
    // Add initial block
    const initial: Block = {
      number: blockNum.current,
      hash: randomHash(),
      txCount: Math.floor(Math.random() * 12),
      timestamp: Date.now(),
    }
    setBlocks([initial])

    // Simulate new blocks every 3 seconds (matching ONE Chain block time)
    const interval = setInterval(() => {
      blockNum.current += 1
      const newBlock: Block = {
        number: blockNum.current,
        hash: randomHash(),
        txCount: Math.floor(Math.random() * 15),
        timestamp: Date.now(),
      }
      setBlocks((prev) => [newBlock, ...prev].slice(0, 5))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
        <div className="relative flex items-center justify-center w-2 h-2">
          <div className="absolute w-2 h-2 rounded-full bg-accent" />
          <div
            className="absolute w-2 h-2 rounded-full bg-accent"
            style={{ animation: 'pulse-ring 2s ease-out infinite' }}
          />
        </div>
        <span
          className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-muted-foreground"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Live Blocks
        </span>
      </div>

      <AnimatePresence mode="popLayout">
        {blocks.map((block) => (
          <motion.div
            key={block.number}
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-between px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-md sm:rounded-lg bg-secondary/50 border border-border/50 backdrop-blur-sm gap-2"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span
                className="text-primary text-[12px] sm:text-sm font-medium shrink-0"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                #{block.number.toLocaleString()}
              </span>
              <span
                className="text-muted-foreground text-[11px] sm:text-xs hidden min-[400px]:inline truncate"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {block.hash}
              </span>
            </div>
            <span className="text-[11px] sm:text-xs text-muted-foreground shrink-0">
              {block.txCount} tx
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
