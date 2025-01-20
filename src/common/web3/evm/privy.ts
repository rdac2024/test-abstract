import {
    ConnectedWallet,
    type SendTransactionModalUIOptions,
    type TransactionReceipt,
    type UnsignedTransactionRequest,
} from "@privy-io/react-auth";
import useWeb3ContractConfig from "@/common/web3/evm/contract";
import BigNumber from "bignumber.js";
import { SwipePassValue } from "@/common/statement/common";

export async function signMessage(message: string, wallet: ConnectedWallet): Promise<string> {
    const provider = await wallet.getEthereumProvider();

    const sig = await provider.request({
        method: "personal_sign",
        params: [ message, wallet.address ]
    });

    return sig;
}

export async function depositSwipePass(
    sendTransaction: (...arg: any) => Promise<TransactionReceipt>,
    uiConfig: SendTransactionModalUIOptions
): Promise<TransactionReceipt> {
    const { useSwipePassContract } = useWeb3ContractConfig();
    const { contract, address, chain } = useSwipePassContract("eth");
    const encodeABI = contract.interface.encodeFunctionData('deposit', []);

    const requestData = {
        to: address,
        chainId: chain,
        data: encodeABI,
        value: `0x${ new BigNumber(SwipePassValue).multipliedBy(1e18).toString(16) }`,
        gasLimit: Math.floor(52394 * 2)
    } as UnsignedTransactionRequest;

    return await sendTransaction(requestData, uiConfig);
}

export async function withdrawSwipePass(
    sendTransaction: (...arg: any) => Promise<TransactionReceipt>,
    uiConfig: SendTransactionModalUIOptions
): Promise<TransactionReceipt> {
    const { useSwipePassContract } = useWeb3ContractConfig();
    const { contract, address, chain } = useSwipePassContract("eth");
    const encodeABI = contract.interface.encodeFunctionData('withdraw', []);

    const requestData = {
        to: address,
        chainId: chain,
        data: encodeABI,
        gasLimit: Math.floor(37513 * 2)
    } as UnsignedTransactionRequest;

    return await sendTransaction(requestData, uiConfig);
}