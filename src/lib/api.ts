const API_URL = (() => {
  const host = typeof window !== "undefined" ? window.location.hostname : "";
  if (host.includes("localhost") || host.includes("127.0.0.1")) {
    return "http://localhost:3020";
  }
  if (host.includes("staging2-all-access")) {
    return "https://api-dev-chain.expl.one";
  }
  return "https://api-chain.expl.one";
})();

export interface NetworkStats {
  blockHeight: number;
  activeNodes: number;
  totalTransactions: number;
  avgBlockTime: number;
  networkUptime: number;
  uniqueWallets: number;
  timestamp: number;
}

export interface BlockData {
  number: number;
  hash: string;
  txCount: number;
  timestamp: number;
}

export async function fetchStats(): Promise<NetworkStats | null> {
  try {
    const res = await fetch(`${API_URL}/stats`);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export function getOneIdApiUrl(): string {
  const host = typeof window !== "undefined" ? window.location.hostname : "";
  if (host.includes("localhost") || host.includes("127.0.0.1")) return "http://localhost:3010";
  if (host.startsWith("staging2-all-access")) return "https://api-dev-id.expl.one";
  return "https://api-id.expl.one";
}

export async function fetchBlocks(): Promise<BlockData[] | null> {
  try {
    const res = await fetch(`${API_URL}/blocks`);
    if (!res.ok) return null;
    const data = await res.json();
    return data.blocks;
  } catch {
    return null;
  }
}
