import { ConnectedSolanaWallet } from "@privy-io/react-auth";
import { PublicKey, TransactionInstruction, SystemProgram, Connection, Keypair, Transaction } from "@solana/web3.js";
import { sendTransactionSolana } from "./utils";
import { web3 } from '@project-serum/anchor';

export async function signMessageSolana(message: string, wallet: ConnectedSolanaWallet): Promise<string> {
    if (!wallet.signMessage) {
        throw new Error("Wallet does not support message signing");
    }

    const signature = await wallet.signMessage(new TextEncoder().encode(message));
    return Buffer.from(signature).toString('hex');
}

export async function withdrawPrivyWallet(wallet: ConnectedSolanaWallet, receiver: string, amount: number) {
    const instructions: TransactionInstruction[] = [];
    instructions.push(
        SystemProgram.transfer({
            fromPubkey: new PublicKey(wallet.address),
            toPubkey: new PublicKey(receiver),
            lamports: amount * 1e9,
        })
    );

    // Send the transaction
    const tx = await sendTransactionSolana(wallet, instructions);
    console.log(`Transaction Signature: ${tx}`);
    return tx;
}

export function isSolanaAddress(address: string) {
    try {
        new PublicKey(address);
        return true;
    } catch (error) {
        return false;
    }
}