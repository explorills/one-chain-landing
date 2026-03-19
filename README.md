# ONE Chain Landing

Official landing page for **ONE Chain** — the EVM-compatible blockchain purpose-built for the [EXPL.ONE](https://expl.one) ecosystem.

**Live:** [chain.expl.one](https://chain.expl.one)

## About ONE Chain

ONE Chain is a sovereign, gas-free blockchain forked from [go-ethereum v1.14.12](https://github.com/ethereum/go-ethereum) with surgical modifications for the ONE ecosystem. It serves as the economic backbone powering all EXPL.ONE products and services.

### Key Specifications

| Parameter | Value |
|---|---|
| Chain ID | `311801` |
| Consensus | Proof of Authority (Clique) |
| Block Time | 3 seconds |
| Gas Fee | Zero — completely gas-free |
| Native Currency | EXPL |
| EVM Compatibility | Full (Shanghai + Cancun EIPs) |
| Contract Deployment | Permissioned (whitelist at EVM level) |

### Architecture

ONE Chain is a closed, sovereign network — no bridges, no external tokens, no cross-chain integrations. All transactions, tokens, and smart contracts exist exclusively within the ONE ecosystem. EXPL Nodes provide the full infrastructure: transaction processing, block validation, decentralized hosting, and compute.

### Connected Infrastructure

- **ONE Network Dashboard** — Real-time network monitoring, node status, and block explorer
  - Live: [network.expl.one](https://network.expl.one)
  - Source: [github.com/explorills/expl-nodes-dashboard](https://github.com/explorills/expl-nodes-dashboard)

- **ONE Chain Core** — The blockchain node software (Geth fork)
  - Source: [github.com/explorills/one-chain](https://github.com/explorills/one-chain)

## Tech Stack

- **Runtime**: Bun
- **Framework**: React 19 + TypeScript
- **Build**: Vite 7
- **Styling**: Tailwind CSS 4 (oklch color space)
- **Animations**: Framer Motion
- **Globe**: cobe (WebGL) — interactive 3D globe with node location markers
- **Icons**: Phosphor Icons
- **Font**: Space Grotesk (ecosystem standard)

## Development

```bash
bun install
bun run dev
```

## Build

```bash
bun run build
```

## Deployment

Deployed via AWS S3 + CloudFront. Production at `chain.expl.one`, staging at `staging2-all-access-chain.expl.one`.

## ONE Ecosystem

ONE Chain Landing is part of the [EXPL.ONE](https://expl.one) ecosystem — a unified platform of interconnected products built on decentralized infrastructure.

| Project | URL |
|---|---|
| EXPL.ONE (Main) | [expl.one](https://expl.one) |
| EXPL Nodes | [node.expl.one](https://node.expl.one) |
| ONE Network | [network.expl.one](https://network.expl.one) |
| ONE Chain | [chain.expl.one](https://chain.expl.one) |
| ONE Deal | [deal.expl.one](https://deal.expl.one) |
| ONE Pump | [pump.expl.one](https://pump.expl.one) |
| ONE World | [world.expl.one](https://world.expl.one) |
| ONE ID | [id.expl.one](https://id.expl.one) |
| ONE Box | [box.expl.one](https://box.expl.one) |
| Documentation | [docs.expl.one](https://docs.expl.one) |

## License

MIT
