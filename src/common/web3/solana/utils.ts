import { ConnectedSolanaWallet } from "@privy-io/react-auth";
import { Connection, Keypair, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import { SolanaCluster } from "./cluster";
import { Wallet } from "@project-serum/anchor";

export class RedactedWallet implements Wallet {
    constructor(readonly payer: Keypair) {
        this.payer = payer
    }

    async signTransaction(tx: Transaction): Promise<Transaction> {
        tx.partialSign(this.payer);
        return tx;
    }

    async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
        return txs.map((t) => {
            t.partialSign(this.payer);
            return t;
        });
    }

    get publicKey(): PublicKey {
        return this.payer.publicKey;
    }
}

export async function sendTransactionSolana(
    solanaWallet: ConnectedSolanaWallet,
    instructions: Array<TransactionInstruction>,
    connection?: Connection
) {
    if (!solanaWallet) return;
    connection = connection || new Connection(SolanaCluster.getClusterURL());

    // Build out the transaction object for your desired program
    let transaction = new Transaction({
        feePayer: new PublicKey(solanaWallet.address),
        recentBlockhash: (await connection.getLatestBlockhash()).blockhash,
    });
    for (const ix of instructions) transaction.add(ix);

    // Send transaction
    const tx = await solanaWallet.signTransaction(transaction);
    return await connection.sendRawTransaction(tx.serialize());
}

export async function sendFromRawTransactionSolana(
    solanaWallet: ConnectedSolanaWallet,
    rawTx: string,
    connection?: Connection
) {
    connection = connection || new Connection(SolanaCluster.getClusterURL());
    const transaction = Transaction.from(Buffer.from(rawTx, "base64"));

    // Send transaction
    const tx = await solanaWallet.signTransaction(transaction);
    return await connection.sendRawTransaction(tx.serialize());
}

export async function getBalanceSolana(solanaWallet: ConnectedSolanaWallet): Promise<number> {
    const publicKey = new PublicKey(solanaWallet.address);
    const connection = new Connection(SolanaCluster.getClusterURL(), 'confirmed')
    // Get the balance (in lamports, 1 SOL = 100 million lamports)
    const balance = await connection.getBalance(publicKey);
  
    // Convert lamports to SOL
    const balanceInSOL = balance / 1e9;
    return balanceInSOL
}