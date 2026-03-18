import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import {
  GithubLogo,
  DiscordLogo,
  XLogo,
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
import { DataStream, DataStreamHorizontal } from './components/DataStream'
import { BlockTicker } from './components/BlockTicker'
import { PoweredByExplNodes } from './components/PoweredByExplNodes'

const ease = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease } },
}

function Header() {
  const { scrollY } = useScroll()
  const headerBg = useTransform(scrollY, [0, 100], [0, 1])

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent"
      style={{
        backgroundColor: useTransform(headerBg, (v) => `oklch(0.06 0.02 240 / ${v * 0.85})`),
        backdropFilter: useTransform(headerBg, (v) => `blur(${v * 16}px)`),
        borderColor: useTransform(headerBg, (v) => `oklch(0.18 0.03 230 / ${v * 0.5})`),
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/80 to-accent/60 flex items-center justify-center group-hover:shadow-[0_0_20px_oklch(0.65_0.12_220_/_0.3)] transition-shadow duration-300">
            <CubeTransparent weight="bold" className="w-4.5 h-4.5 text-white" />
          </div>
          <span className="text-lg font-semibold tracking-tight">
            ONE <span className="text-primary">Chain</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {['Network', 'Architecture', 'Nodes', 'Consensus', 'Roadmap'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/explorills/one-chain"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-border/60 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
          >
            <GithubLogo weight="bold" className="w-4 h-4" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </motion.header>
  )
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <DataStream count={25} />

      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 lg:gap-6 items-center py-20">
        {/* Left: text */}
        <motion.div
          style={{ y, opacity }}
          className="relative z-10 max-w-xl"
        >
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-6"
          >
            <motion.div variants={fadeUp}>
              <span
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Chain ID: 311801
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            >
              The Economic
              <br />
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer">
                Backbone
              </span>
              <br />
              of ONE
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg text-muted-foreground leading-relaxed max-w-md">
              EVM-compatible blockchain purpose-built for the EXPL.ONE ecosystem.
              Gas-free transactions. Sovereign infrastructure. Community-powered nodes.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 pt-2">
              <a
                href="#network"
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-gradient-to-r from-primary to-accent text-white hover:shadow-[0_0_30px_oklch(0.65_0.12_220_/_0.35)] transition-all duration-300"
              >
                Explore Network
                <ArrowRight weight="bold" className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <a
                href="https://github.com/explorills/one-chain"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 text-sm font-medium rounded-xl border border-border/60 hover:border-primary/40 hover:bg-card/50 transition-all duration-200"
              >
                View Source
                <ArrowUpRight weight="bold" className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </motion.div>

            {/* Mini specs row */}
            <motion.div variants={fadeUp} className="flex gap-6 pt-4">
              {[
                { label: 'Block Time', value: '3s' },
                { label: 'Gas Fee', value: 'Zero' },
                { label: 'Consensus', value: 'PoA' },
              ].map((spec) => (
                <div key={spec.label} className="text-center">
                  <div
                    className="text-lg font-semibold text-foreground"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {spec.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{spec.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right: globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="relative flex items-center justify-center"
        >
          <Globe />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

function NetworkSection() {
  const stats = [
    { label: 'Block Height', value: 2847391, icon: Cube, prefix: '#' },
    { label: 'Active Nodes', value: 142, icon: HardDrives },
    { label: 'Transactions', value: 8439021, icon: Lightning },
    { label: 'Avg Block Time', value: 3.0, decimals: 1, suffix: 's', icon: CirclesThree },
    { label: 'Network Uptime', value: 99.97, decimals: 2, suffix: '%', icon: ShieldCheck },
    { label: 'Unique Wallets', value: 24819, icon: Users },
  ]

  return (
    <section id="network" className="relative py-32">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-medium uppercase tracking-[0.25em] text-primary mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Network Statistics
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight">
            Real-Time Network
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={scaleIn}
              className="group relative p-6 rounded-2xl bg-card/40 border border-border/40 backdrop-blur-sm hover:border-primary/30 hover:bg-card/60 transition-all duration-300"
            >
              <div className="absolute top-4 right-4">
                <stat.icon weight="duotone" className="w-5 h-5 text-primary/40 group-hover:text-primary/60 transition-colors" />
              </div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">
                <AnimatedCounter
                  target={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Live block ticker */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease, delay: 0.4 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <BlockTicker />
        </motion.div>
      </div>
    </section>
  )
}

function ArchitectureSection() {
  const layers = [
    {
      title: 'Application Layer',
      desc: 'Ecosystem dApps, ONE Ventures contract deployment, ERC-721/1155 tokens',
      icon: CubeTransparent,
      color: 'oklch(0.70 0.10 200)',
    },
    {
      title: 'Execution Layer',
      desc: 'Full EVM with permissioned CREATE/CREATE2, Shanghai + Cancun EIPs from genesis',
      icon: Cpu,
      color: 'oklch(0.65 0.12 220)',
    },
    {
      title: 'Consensus Layer',
      desc: 'Proof of Authority (Clique) — authorized validators, 3-second block production',
      icon: ShieldCheck,
      color: 'oklch(0.60 0.14 230)',
    },
    {
      title: 'Network Layer',
      desc: 'Encrypted P2P via DevP2P, full node mesh, block/tx propagation',
      icon: GlobeIcon,
      color: 'oklch(0.55 0.12 240)',
    },
    {
      title: 'Data Layer',
      desc: 'LevelDB state storage, EXPL native currency, zero-gas transaction model',
      icon: Database,
      color: 'oklch(0.50 0.10 250)',
    },
  ]

  return (
    <section id="architecture" className="relative py-32">
      <DataStreamHorizontal />
      <div className="max-w-7xl mx-auto px-6 pt-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-medium uppercase tracking-[0.25em] text-primary mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Architecture
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight">
            Purpose-Built Stack
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Forked from go-ethereum v1.14.12 with surgical modifications. Every layer
            customized for the ONE ecosystem — nothing more, nothing less.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-3xl mx-auto space-y-3"
        >
          {layers.map((layer, i) => (
            <motion.div
              key={layer.title}
              variants={fadeUp}
              className="group relative flex items-center gap-5 p-5 rounded-xl border border-border/30 bg-card/30 backdrop-blur-sm hover:border-primary/30 hover:bg-card/50 transition-all duration-300"
            >
              {/* Layer number */}
              <div
                className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold"
                style={{
                  background: `${layer.color}15`,
                  color: layer.color,
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                L{layers.length - i}
              </div>

              {/* Icon */}
              <div
                className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${layer.color}15` }}
              >
                <layer.icon weight="duotone" className="w-5 h-5" style={{ color: layer.color }} />
              </div>

              {/* Content */}
              <div className="min-w-0">
                <h3 className="text-base font-semibold mb-0.5">{layer.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{layer.desc}</p>
              </div>

              {/* Connector line */}
              {i < layers.length - 1 && (
                <div
                  className="absolute left-[2.95rem] top-full w-px h-3 z-10"
                  style={{ background: `linear-gradient(to bottom, ${layer.color}40, transparent)` }}
                />
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
    {
      icon: Lightning,
      title: 'Gas-Free Transactions',
      desc: 'Zero transaction fees. Node operators earn EXPL NET through daily distribution, not gas extraction. Users transact freely.',
    },
    {
      icon: Lock,
      title: 'Permissioned Deployment',
      desc: 'Contract deployment gated at the EVM level. Only whitelisted addresses via ONE Ventures can deploy — preventing spam and maintaining quality.',
    },
    {
      icon: HardDrives,
      title: 'Full Node Infrastructure',
      desc: 'Every node is a full node. Beyond transaction processing, nodes provide hosting and computational power for the entire ecosystem.',
    },
    {
      icon: TreeStructure,
      title: 'Decentralized Hosting',
      desc: 'Frontend, backend, and all ecosystem services distributed across the node network. Zero dependency on centralized cloud providers.',
    },
    {
      icon: Users,
      title: 'Stakeholder Incentives',
      desc: 'Run a node, become an ecosystem stakeholder. Earn EXPL NET from daily distribution. Participate in governance and network decisions.',
    },
    {
      icon: ShieldCheck,
      title: 'Sovereign Network',
      desc: 'No bridges. No external tokens. No cross-chain attack surface. ONE Chain exists exclusively for the ONE ecosystem — fully self-contained.',
    },
  ]

  return (
    <section id="nodes" className="relative py-32">
      <DataStreamHorizontal />
      <div className="max-w-7xl mx-auto px-6 pt-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-medium uppercase tracking-[0.25em] text-primary mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Node Infrastructure
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight">
            Nodes Power Everything
          </motion.h2>
          <motion.p variants={fadeUp} className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            ONE Chain nodes serve dual purpose — processing transactions and providing
            decentralized infrastructure for the entire ecosystem. Run a node, power the network.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={scaleIn}
              className="group p-6 rounded-2xl bg-card/30 border border-border/30 backdrop-blur-sm hover:border-primary/25 hover:bg-card/50 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                <feature.icon weight="duotone" className="w-5.5 h-5.5 text-primary" />
              </div>
              <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ConsensusSection() {
  return (
    <section id="consensus" className="relative py-32">
      <DataStreamHorizontal />
      <div className="max-w-7xl mx-auto px-6 pt-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: visual */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease }}
            className="relative"
          >
            <div className="relative p-8 rounded-2xl bg-card/30 border border-border/30 backdrop-blur-sm overflow-hidden">
              {/* Consensus visualization */}
              <div className="space-y-4">
                {['Validator A', 'Validator B', 'Validator C'].map((validator, i) => (
                  <div key={validator} className="flex items-center gap-4">
                    <div
                      className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold border"
                      style={{
                        borderColor: i === 0 ? 'oklch(0.65 0.12 220 / 0.5)' : 'oklch(0.25 0.03 230)',
                        background: i === 0 ? 'oklch(0.65 0.12 220 / 0.1)' : 'oklch(0.12 0.02 230)',
                        color: i === 0 ? 'oklch(0.70 0.12 220)' : 'oklch(0.50 0.03 230)',
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      V{i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-medium">{validator}</span>
                        {i === 0 && (
                          <span
                            className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-medium"
                            style={{ fontFamily: "'JetBrains Mono', monospace" }}
                          >
                            PRODUCING
                          </span>
                        )}
                      </div>
                      <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          className="h-full rounded-full"
                          style={{
                            background: i === 0
                              ? 'linear-gradient(90deg, oklch(0.65 0.12 220), oklch(0.70 0.10 200))'
                              : 'oklch(0.30 0.05 230)',
                          }}
                          initial={{ width: '0%' }}
                          whileInView={{ width: i === 0 ? '100%' : '0%' }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 3,
                            ease: 'linear',
                            repeat: Infinity,
                            delay: i * 3,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Block produced indicator */}
              <div className="mt-6 p-4 rounded-xl bg-muted/30 border border-border/30">
                <div className="flex items-center gap-3">
                  <Cube weight="duotone" className="w-5 h-5 text-primary" />
                  <div>
                    <div className="text-sm font-medium">Round-Robin Block Production</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Validators take turns every 3 seconds. Deterministic, no competition.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: explanation */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.span
              variants={fadeUp}
              className="inline-block text-xs font-medium uppercase tracking-[0.25em] text-primary mb-4"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Consensus Mechanism
            </motion.span>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">
              Proof of Authority
            </motion.h2>
            <motion.div variants={fadeUp} className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                ONE Chain uses Clique Proof of Authority — the simplest, most efficient
                consensus for a permissioned ecosystem. No mining. No staking races.
                No wasted energy.
              </p>
              <p>
                Authorized validators produce blocks in a deterministic round-robin schedule.
                Every 3 seconds, one validator seals the next block. Other nodes verify
                the signature and accept the block. Consensus is instant.
              </p>
              <p>
                Validators are ecosystem stakeholders — trusted participants who run full nodes
                and are incentivized through EXPL NET distribution. The network doesn't need
                to solve the Byzantine Generals Problem with untrusted strangers — it solves
                it with aligned participants.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: 'Finality', value: '~3s' },
                { label: 'Energy Use', value: 'Minimal' },
                { label: 'Throughput', value: '~500 TPS' },
                { label: 'Security Model', value: 'Authority' },
              ].map((item) => (
                <div key={item.label} className="p-3 rounded-lg bg-card/30 border border-border/30">
                  <div
                    className="text-sm font-semibold text-foreground"
                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                  >
                    {item.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">{item.label}</div>
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
    {
      phase: 'Phase 1',
      title: 'Foundation',
      status: 'active' as const,
      items: [
        'Geth fork with ONE Chain configuration',
        'PoA consensus (Clique) — 3s block time',
        'Gas-free transaction model',
        'Permissioned contract deployment',
        'Local testnet & validator tooling',
      ],
    },
    {
      phase: 'Phase 2',
      title: 'Token Economy',
      status: 'upcoming' as const,
      items: [
        'EXPL native currency integration',
        'ERC-721 / ERC-1155 ecosystem tokens',
        'Multi-validator testnet deployment',
        'Block explorer & wallet integration',
        'EXPL NET node incentive distribution',
      ],
    },
    {
      phase: 'Phase 3',
      title: 'Decentralized Storage',
      status: 'upcoming' as const,
      items: [
        'Chunked data storage on full nodes',
        'Frontend hosting on node network',
        'Asset CDN via node mesh',
        'Content addressing & replication',
      ],
    },
    {
      phase: 'Phase 4',
      title: 'Decentralized Compute',
      status: 'upcoming' as const,
      items: [
        'Backend services on node infrastructure',
        'Task scheduling & execution sandboxing',
        'Full ecosystem self-sovereignty',
        'Zero external cloud dependency',
      ],
    },
  ]

  return (
    <section id="roadmap" className="relative py-32">
      <DataStreamHorizontal />
      <div className="max-w-7xl mx-auto px-6 pt-16">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block text-xs font-medium uppercase tracking-[0.25em] text-primary mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            Roadmap
          </motion.span>
          <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl font-bold tracking-tight">
            Building in Phases
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {phases.map((phase, i) => (
            <motion.div
              key={phase.phase}
              variants={fadeUp}
              className={`group relative p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${
                phase.status === 'active'
                  ? 'bg-primary/5 border-primary/30'
                  : 'bg-card/20 border-border/30 hover:border-border/50'
              }`}
            >
              {phase.status === 'active' && (
                <div className="absolute -top-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
              )}

              <div className="flex items-center gap-2 mb-4">
                <span
                  className={`text-xs font-bold uppercase tracking-wider ${
                    phase.status === 'active' ? 'text-primary' : 'text-muted-foreground'
                  }`}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {phase.phase}
                </span>
                {phase.status === 'active' && (
                  <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-primary/15 text-primary">
                    <span className="w-1 h-1 rounded-full bg-primary animate-pulse" />
                    Active
                  </span>
                )}
              </div>

              <h3 className="text-lg font-semibold mb-4">{phase.title}</h3>

              <ul className="space-y-2.5">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed">
                    <span
                      className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${
                        phase.status === 'active' ? 'bg-primary' : 'bg-muted-foreground/50'
                      }`}
                    />
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
  return (
    <footer className="relative border-t border-border/30 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <a
              href="https://expl.one"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground hover:text-primary transition-colors"
            >
              EXPL.ONE
            </a>
            <span>&copy; {new Date().getFullYear()} All rights reserved</span>
          </div>

          {/* Center: socials */}
          <div className="flex items-center gap-4">
            <a
              href="https://discord.gg/explorills"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hover:drop-shadow-[0_0_8px_oklch(0.65_0.12_220_/_0.5)] transition-all duration-200"
              aria-label="Discord"
            >
              <DiscordLogo weight="fill" className="w-5 h-5" />
            </a>
            <a
              href="https://x.com/explorills_main"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hover:drop-shadow-[0_0_8px_oklch(0.65_0.12_220_/_0.5)] transition-all duration-200"
              aria-label="X (Twitter)"
            >
              <XLogo weight="fill" className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/explorills/one-chain"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground hover:drop-shadow-[0_0_8px_oklch(0.65_0.12_220_/_0.5)] transition-all duration-200"
              aria-label="GitHub"
            >
              <GithubLogo weight="fill" className="w-5 h-5" />
            </a>
          </div>

          {/* Right: PoweredByExplNodes */}
          <div className="max-[550px]:hidden">
            <PoweredByExplNodes size="sm" />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="relative min-h-screen">
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
