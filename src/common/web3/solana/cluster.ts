import { Commitment, Connection, Cluster, PublicKey } from '@solana/web3.js';

const clusterURLMapping: Record<Cluster, string> = {
  'mainnet-beta': process.env.NEXT_PUBLIC_SOLANA_MAINNET_URL || 'https://api.mainnet-beta.solana.com',
  'devnet': process.env.NEXT_PUBLIC_SOLANA_DEVNET_URL || 'https://api.devnet.solana.com',
  'testnet': process.env.NEXT_PUBLIC_SOLANA_TESTNET_URL || 'https://api.testnet.solana.com',
};

class ClusterManager {
  private cluster: Cluster;

  constructor(initialCluster: Cluster = process.env.NEXT_PUBLIC_SOLANA_NETWORK as Cluster) {
    this.cluster = initialCluster;
  }

  getClusterURL(): string {
    return clusterURLMapping[this.cluster];
  }

  getConnection(commitment?: Commitment): Connection {
    return new Connection(this.getClusterURL(), commitment ?? 'processed');
  }

  setCluster(newCluster: Cluster): void {
    this.cluster = newCluster;
    // capping at 20 chars due to security (not to expose the token)
    console.log(
      `Cluster updated, now ${newCluster} (${this.getClusterURL().substr(0, 20)})`
    );
  }

  isDevnet(): boolean {
    return this.cluster === 'devnet';
  }

  get currentCluster(): Cluster {
    return this.cluster;
  }
}

export const SolanaCluster = new ClusterManager(process.env.NEXT_PUBLIC_SOLANA_NETWORK as Cluster);
