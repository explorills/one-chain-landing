import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  CubeTransparent,
  Lightning,
  ShieldCheck,
  Globe as GlobeIcon,
  Users,
  HardDrives,
  ArrowRight,
  ArrowUpRight,
  Cube,
  CirclesThree,
  Database,
  Cpu,
  TreeStructure,
  Lock,
} from '@phosphor-icons/react'
import { Globe } from './components/Globe'
import { AnimatedCounter } from './components/AnimatedCounter'
import { DataStream } from './components/DataStream'
import { BlockTicker } from './components/BlockTicker'
import { PoweredByExplNodes } from './components/PoweredByExplNodes'
import { EcosystemDropdown } from './components/EcosystemDropdown'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.5, ease } },
}

const socialLinks = [
  { name: 'Discord', url: 'https://discord.com/invite/RetTCVq7tJ', icon: '/Discord-Symbol-White.svg' },
  { name: 'Twitter', url: 'https://x.com/explorills_main', icon: 'https://cdn.simpleicons.org/x/ffffff' },
  { name: 'GitHub', url: 'https://github.com/explorills', icon: '/github-mark-white.svg' },
]

const navItems = [
  { label: 'Network', id: 'network' },
  { label: 'Architecture', id: 'architecture' },
  { label: 'EXPL Nodes', id: 'nodes' },
  { label: 'Consensus', id: 'consensus' },
  { label: 'Roadmap', id: 'roadmap' },
]

function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled ? 'backdrop-blur-lg bg-[#1c1c1d]/40' : 'bg-[#1c1c1d]/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between py-2.5 sm:py-3 md:py-4 gap-2 sm:gap-4">
            {/* Logo + title — ecosystem standard */}
            <a href="/" className="flex items-center gap-2 sm:gap-[11px] shrink-0">
              <img
                src="/logo.png"
                alt="ONE Chain"
                className="w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] md:w-[58px] md:h-[58px] object-contain"
                width="58"
                height="58"
                loading="eager"
              />
              <div className="flex flex-col gap-1 sm:gap-1.5">
                <p className="text-lg sm:text-[22px] md:text-[26px] font-bold tracking-tight leading-none">
                  ONE <span className="text-primary">chain</span>
                </p>
                <div className="hidden min-[360px]:block">
                  <PoweredByExplNodes size="sm" />
                </div>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://network.expl.one"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Network Dashboard
              </a>
              <EcosystemDropdown />
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-2 lg:hidden">
              <EcosystemDropdown />
              {/* Mobile hamburger */}
              <button
                className="p-1.5 sm:p-2 text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {mobileMenuOpen ? (
                    <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>
                  ) : (
                    <><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="fixed top-[60px] sm:top-[68px] left-0 right-0 z-40 bg-[#1c1c1d]/95 backdrop-blur-md border-t border-border/30 lg:hidden"
        >
          <div className="flex flex-col py-3 sm:py-4 px-3 sm:px-4 gap-3 sm:gap-4">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://network.expl.one"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              Network Dashboard
            </a>
          </div>
        </motion.div>
      )}
    </>
  )
}

function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-16 sm:pt-20 md:pt-16">
      <DataStream count={20} />

      {/* Globe — background on mobile, side element on desktop */}
      <div className="absolute inset-0 lg:relative lg:inset-auto lg:flex-1 flex items-center justify-center pointer-events-none lg:pointer-events-auto">
        <div className="w-full max-w-[400px] sm:max-w-[500px] lg:max-w-[600px] opacity-20 lg:opacity-100">
          <Globe />
        </div>
      </div>

      <div className="absolute inset-0 lg:relative lg:inset-auto max-w-7xl mx-auto px-3 sm:px-4 md:px-6 w-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-6 w-full items-center">
          {/* Text content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="relative z-10 space-y-3 sm:space-y-4 md:space-y-5"
          >
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-medium bg-primary/10 text-primary border border-primary/20"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Chain ID: 311801
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-[26px] min-[360px]:text-[30px] sm:text-[40px] md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              The Economic
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer">
                Backbone
              </span>
              <br />
              of ONE
            </motion.h1>

            <motion.p variants={fadeUp} className="text-[13px] sm:text-sm md:text-base text-muted-foreground leading-relaxed max-w-md">
              EVM-compatible blockchain purpose-built for the EXPL.ONE ecosystem.
              Gas-free transactions. Sovereign infrastructure. Community-powered EXPL Nodes.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col min-[480px]:flex-row flex-wrap gap-2.5 sm:gap-3 pt-1">
              <a
                href="#network"
                className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-[13px] sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-accent text-white hover:shadow-[0_0_30px_oklch(0.65_0.12_220_/_0.35)] transition-all duration-300"
              >
                Explore Network
                <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://network.expl.one"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-[13px] sm:text-sm font-medium rounded-xl border border-primary/40 hover:border-primary/60 hover:bg-primary/10 transition-all duration-200"
              >
                Network Dashboard
                <ArrowUpRight weight="bold" className="w-4 h-4 text-primary group-hover:text-primary/80 transition-colors" />
              </a>
              <a
                href="https://github.com/explorills/one-chain"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-[13px] sm:text-sm font-medium rounded-xl border border-border/60 hover:border-primary/40 hover:bg-card/50 transition-all duration-200"
              >
                View Source
                <ArrowUpRight weight="bold" className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-4 sm:gap-5 md:gap-6 pt-1 sm:pt-2">
              {[
                { label: 'Block Time', value: '3s' },
                { label: 'Gas Fee', value: 'Zero' },
                { label: 'Consensus', value: 'PoA' },
              ].map((spec) => (
                <div key={spec.label} className="text-center">
                  <div className="text-sm sm:text-base md:text-lg font-semibold text-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                    {spec.value}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">{spec.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Empty slot for grid on desktop — globe is absolutely positioned on mobile */}
          <div className="hidden lg:block" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

function NetworkSection() {
  const stats = [
    { label: 'Block Height', value: 2847391, icon: Cube, prefix: '#' },
    { label: 'Active EXPL Nodes', value: 142, icon: HardDrives },
    { label: 'Transactions', value: 8439021, icon: Lightning },
    { label: 'Avg Block Time', value: 3.0, decimals: 1, suffix: 's', icon: CirclesThree },
    { label: 'Network Uptime', value: 99.97, decimals: 2, suffix: '%', icon: ShieldCheck },
    { label: 'Unique Wallets', value: 24819, icon: Users },
  ]

  return (
    <section id="network" className="relative py-10 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary mb-2 sm:mb-3"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Network Statistics
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight">
            Real-Time Network
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 md:gap-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className="group relative p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl bg-card/40 border border-border/40 backdrop-blur-sm hover:border-primary/30 hover:bg-card/60 transition-all duration-300"
            >
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3">
                <stat.icon weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-primary/40 group-hover:text-primary/60 transition-colors" />
              </div>
              <div className="text-lg sm:text-xl md:text-3xl font-bold mb-0.5 sm:mb-1">
                <AnimatedCounter target={stat.value} prefix={stat.prefix} suffix={stat.suffix} decimals={stat.decimals} />
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-muted-foreground leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.3 }}
          className="mt-6 sm:mt-8 max-w-2xl mx-auto"
        >
          <BlockTicker />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease, delay: 0.4 }}
          className="mt-5 sm:mt-6 text-center"
        >
          <a
            href="https://network.expl.one"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 text-[13px] sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-accent text-white hover:shadow-[0_0_30px_oklch(0.65_0.12_220_/_0.35)] transition-all duration-300"
          >
            Network Dashboard
            <ArrowUpRight weight="bold" className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function ArchitectureSection() {
  const layers = [
    { title: 'Application Layer', desc: 'Ecosystem dApps, ONE Ventures deployment, ERC-721/1155 tokens', icon: CubeTransparent, color: 'oklch(0.60 0.16 250)' },
    { title: 'Execution Layer', desc: 'Full EVM with permissioned CREATE/CREATE2, Shanghai + Cancun EIPs', icon: Cpu, color: 'oklch(0.55 0.23 264)' },
    { title: 'Consensus Layer', desc: 'Proof of Authority (Clique) — 3-second block production', icon: ShieldCheck, color: 'oklch(0.60 0.14 230)' },
    { title: 'Network Layer', desc: 'Encrypted P2P via DevP2P, full node mesh, block/tx propagation', icon: GlobeIcon, color: 'oklch(0.55 0.12 240)' },
    { title: 'Data Layer', desc: 'LevelDB state storage, EXPL native currency, zero-gas model', icon: Database, color: 'oklch(0.50 0.10 250)' },
  ]

  return (
    <section id="architecture" className="relative py-10 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <motion.span variants={fadeUp} className="inline-block text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary mb-2 sm:mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Architecture
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight">
            Purpose-Built Stack
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[13px] sm:text-sm text-muted-foreground mt-2 sm:mt-3 max-w-xl mx-auto">
            Forked from go-ethereum v1.14.12 with surgical modifications for the ONE ecosystem.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="max-w-3xl mx-auto space-y-2 sm:space-y-2.5"
        >
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              variants={fadeUp}
              className="group relative flex items-center gap-2.5 sm:gap-3 md:gap-4 p-2.5 sm:p-3.5 md:p-4 rounded-lg sm:rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
            >
              <div
                className="shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-md sm:rounded-lg flex items-center justify-center text-[11px] sm:text-xs md:text-sm font-bold"
                style={{ background: `${layer.color}15`, color: layer.color, fontFamily: "'JetBrains Mono', monospace" }}
              >
                L{layers.length - i}
              </div>
              <div className="shrink-0 w-9 h-9 md:w-10 md:h-10 rounded-lg items-center justify-center hidden sm:flex" style={{ background: `${layer.color}15` }}>
                <layer.icon weight="duotone" className="w-4.5 h-4.5 md:w-5 md:h-5" style={{ color: layer.color }} />
              </div>
              <div className="min-w-0">
                <h3 className="text-[13px] sm:text-sm md:text-base font-semibold mb-0.5">{layer.title}</h3>
                <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed">{layer.desc}</p>
              </div>
              {i < layers.length - 1 && (
                <div className="absolute left-[1.55rem] sm:left-[2.05rem] md:left-[2.25rem] top-full w-px h-2 sm:h-2.5 z-10" style={{ background: `linear-gradient(to bottom, ${layer.color}40, transparent)` }} />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function NodesSection() {
  const features = [
    { icon: Lightning, title: 'Gas-Free Transactions', desc: 'Zero transaction fees. EXPL Node operators earn EXPL NET through daily distribution. Users transact freely.' },
    { icon: Lock, title: 'Permissioned Deployment', desc: 'Contract deployment gated at EVM level. Only whitelisted addresses via ONE Ventures can deploy.' },
    { icon: HardDrives, title: 'Full EXPL Node Infrastructure', desc: 'Every EXPL Node is a full node providing hosting and computational power for the entire ecosystem.' },
    { icon: TreeStructure, title: 'Decentralized Hosting', desc: 'Frontend, backend, and all services distributed across EXPL Nodes. Zero cloud dependency.' },
    { icon: Users, title: 'Stakeholder Incentives', desc: 'Run an EXPL Node, become a stakeholder. Earn EXPL NET daily. Participate in governance.' },
    { icon: ShieldCheck, title: 'Sovereign Network', desc: 'No bridges, no external tokens. ONE Chain exists exclusively for the ONE ecosystem.' },
  ]

  return (
    <section id="nodes" className="relative py-10 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <motion.span variants={fadeUp} className="inline-block text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary mb-2 sm:mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            EXPL Node Infrastructure
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight">
            EXPL Nodes Power Everything
          </motion.h2>
          <motion.p variants={fadeUp} className="text-[13px] sm:text-sm text-muted-foreground mt-2 sm:mt-3 max-w-lg mx-auto">
            Dual purpose — processing transactions and providing decentralized infrastructure.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3 md:gap-4"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={scaleIn}
              className="group p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm hover:border-primary/25 hover:bg-card/50 transition-all duration-300"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-md sm:rounded-lg bg-primary/10 flex items-center justify-center mb-2.5 sm:mb-3 group-hover:bg-primary/15 transition-colors">
                <feature.icon weight="duotone" className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5 text-primary" />
              </div>
              <h3 className="text-[13px] sm:text-sm md:text-base font-semibold mb-1 sm:mb-1.5">{feature.title}</h3>
              <p className="text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ConsensusSection() {
  return (
    <section id="consensus" className="relative py-10 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="p-3.5 sm:p-5 md:p-6 rounded-lg sm:rounded-xl bg-card/30 border border-border/30 backdrop-blur-sm">
              <div className="space-y-2.5 sm:space-y-3">
                {['Validator A', 'Validator B', 'Validator C'].map((validator, i) => (
                  <div key={validator} className="flex items-center gap-2.5 sm:gap-3">
                    <div
                      className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-md sm:rounded-lg flex items-center justify-center text-[10px] sm:text-xs font-bold border"
                      style={{
                        borderColor: i === 0 ? 'oklch(0.55 0.23 264 / 0.5)' : 'oklch(0.25 0.03 230)',
                        background: i === 0 ? 'oklch(0.55 0.23 264 / 0.1)' : 'oklch(0.12 0.02 230)',
                        color: i === 0 ? 'oklch(0.62 0.18 250)' : 'oklch(0.50 0.03 230)',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      V{i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] sm:text-xs md:text-sm font-medium">{validator}</span>
                        {i === 0 && (
                          <span className="text-[8px] sm:text-[9px] md:text-[10px] px-1 sm:px-1.5 py-0.5 rounded-full bg-primary/15 text-primary font-medium" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                            PRODUCING
                          </span>
                        )}
                      </div>
                      <div className="h-1 sm:h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{ background: i === 0 ? 'linear-gradient(90deg, oklch(0.55 0.23 264), oklch(0.60 0.16 250))' : 'oklch(0.30 0.05 230)' }}
                          initial={{ width: '0%' }}
                          whileInView={{ width: i === 0 ? '100%' : '0%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 3, ease: 'linear', repeat: Infinity, delay: i * 3 }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-md sm:rounded-lg bg-muted/30 border border-border/30">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <Cube weight="duotone" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[11px] sm:text-xs md:text-sm font-medium">Round-Robin Block Production</div>
                    <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">Validators take turns every 3 seconds. Deterministic.</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Explanation */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.span variants={fadeUp} className="inline-block text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary mb-2 sm:mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
              Consensus Mechanism
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight mb-3 sm:mb-4">
              Proof of Authority
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-2.5 sm:space-y-3 text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed">
              <p>
                ONE Chain uses Clique Proof of Authority — the simplest, most efficient
                consensus for a permissioned ecosystem. No mining. No staking races. No wasted energy.
              </p>
              <p>
                Authorized validators produce blocks in a deterministic round-robin schedule.
                Every 3 seconds, one validator seals the next block. Consensus is instant.
              </p>
              <p>
                Validators are ecosystem stakeholders — trusted participants incentivized
                through EXPL NET distribution. Aligned participants, not untrusted strangers.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-2 sm:gap-3 mt-4 sm:mt-5">
              {[
                { label: 'Finality', value: '~3s' },
                { label: 'Energy Use', value: 'Minimal' },
                { label: 'Throughput', value: '~500 TPS' },
                { label: 'Security Model', value: 'Authority' },
              ].map((item) => (
                <div key={item.label} className="p-2 sm:p-2.5 rounded-md sm:rounded-lg bg-card/30 border border-border/30">
                  <div className="text-[11px] sm:text-xs md:text-sm font-semibold text-foreground" style={{ fontFamily: "'JetBrains Mono', monospace" }}>{item.value}</div>
                  <div className="text-[10px] sm:text-[11px] text-muted-foreground mt-0.5">{item.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function RoadmapSection() {
  const phases = [
    { phase: 'Phase 1', title: 'Foundation', status: 'active' as const, items: ['Geth fork with ONE Chain config', 'PoA consensus — 3s block time', 'Gas-free transaction model', 'Permissioned contract deployment', 'Local testnet & tooling'] },
    { phase: 'Phase 2', title: 'Token Economy', status: 'upcoming' as const, items: ['EXPL native currency integration', 'ERC-721/1155 ecosystem tokens', 'Multi-validator testnet', 'Block explorer & wallets', 'EXPL Node operator incentives'] },
    { phase: 'Phase 3', title: 'Decentralized Storage', status: 'upcoming' as const, items: ['Chunked data on EXPL Nodes', 'Frontend hosting on EXPL Nodes', 'Asset CDN via EXPL Node mesh', 'Content addressing'] },
    { phase: 'Phase 4', title: 'Decentralized Compute', status: 'upcoming' as const, items: ['Backend services on EXPL Nodes', 'Task scheduling & sandboxing', 'Full self-sovereignty', 'Zero cloud dependency'] },
  ]

  return (
    <section id="roadmap" className="relative py-10 sm:py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="text-center mb-6 sm:mb-8 md:mb-10"
        >
          <motion.span variants={fadeUp} className="inline-block text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.2em] sm:tracking-[0.25em] text-primary mb-2 sm:mb-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            Roadmap
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight">
            Building in Phases
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4"
        >
          {phases.map((phase) => (
            <motion.div
              key={phase.phase}
              variants={fadeUp}
              className={`group relative p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                phase.status === 'active' ? 'bg-primary/5 border-primary/30' : 'bg-card/20 border-border/30 hover:border-border/50'
              }`}
            >
              {phase.status === 'active' && (
                <div className="absolute -top-px left-4 right-4 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}
              <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                <span
                  className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${phase.status === 'active' ? 'text-primary' : 'text-muted-foreground'}`}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {phase.phase}
                </span>
                {phase.status === 'active' && (
                  <span className="flex items-center gap-1 text-[8px] sm:text-[9px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">
                    <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                    Active
                  </span>
                )}
              </div>
              <h3 className="text-[13px] sm:text-sm md:text-base font-semibold mb-2.5 sm:mb-3">{phase.title}</h3>
              <ul className="space-y-1.5 sm:space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-1.5 sm:gap-2 text-[11px] sm:text-xs md:text-sm text-muted-foreground leading-relaxed">
                    <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${phase.status === 'active' ? 'bg-primary' : 'bg-muted-foreground/50'}`} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <footer className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/30 bg-background/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="py-2.5 sm:py-3">
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="text-[10px] sm:text-xs whitespace-nowrap min-w-0">
                <a href="https://expl.one" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">EXPL.ONE</a>
                <span className="text-muted-foreground"> &copy; {new Date().getFullYear()}</span>
                <span className="text-muted-foreground hidden min-[400px]:inline"> All rights reserved</span>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                {socialLinks.map((social) => (
                  <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer" className="relative group">
                    <div className="absolute inset-0 rounded-full bg-primary/50 blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                    <div className="relative w-4 h-4 sm:w-5 sm:h-5">
                      <img src={social.icon} alt={social.name} className="w-full h-full opacity-60 group-hover:opacity-0 transition-opacity duration-300" />
                      <img src={social.icon} alt={social.name} className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ filter: 'brightness(0) saturate(100%) invert(55%) sepia(75%) saturate(3021%) hue-rotate(248deg) brightness(93%) contrast(91%)' }} />
                    </div>
                  </a>
                ))}
              </div>

              <div className="hidden min-[550px]:block">
                <PoweredByExplNodes size="sm" />
              </div>
            </div>
          </div>
        </div>
      </footer>

      <motion.button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-16 sm:bottom-20 right-3 sm:right-6 md:right-8 w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 flex items-center justify-center transition-all duration-300 z-50 border border-primary/50"
        initial={{ opacity: 0, scale: 0, y: 100 }}
        animate={{ opacity: showScrollTop ? 1 : 0, scale: showScrollTop ? 1 : 0, y: showScrollTop ? 0 : 100 }}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Scroll to top"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </motion.button>
    </>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen pb-14 sm:pb-16">
      <Header />
      <main>
        <HeroSection />
        <NetworkSection />
        <ArchitectureSection />
        <NodesSection />
        <ConsensusSection />
        <RoadmapSection />
      </main>
      <Footer />
    </div>
  )
}
