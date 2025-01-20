import { netWorkType } from "@/common/statement/common";
import { SwipePassAbi, EventEvmAbi } from "@/abi";

export interface ContractConfig {
    name: string;
    address: string;
    abi: any;
    chainId: number;
}

export type ContractName = 'SwipePass' | 'EventEvm'

export const ChainConfigs = {
    [`${ "eth" }` as netWorkType]: {
        contracts: {
            SwipePass: { // eth swipe pass
                name: "SwipePassContract",
                address: process.env.NEXT_PUBLIC_SWIPE_PASS_CONTRACT_ADDRESS_ETHEREUM || "",
                abi: SwipePassAbi,
                chainId: process.env.NEXT_PUBLIC_ETHEREUM_CHAIN_ID || 0,
            } as ContractConfig
        }
    },
    [`${ "abs" }` as netWorkType]: {
        contracts: {
            SwipePass: {
                name: "SwipePassContract",
                address: process.env.NEXT_PUBLIC_SWIPE_PASS_CONTRACT_ADDRESS_MANTLE || "",
                abi: SwipePassAbi,
                chainId: process.env.NEXT_PUBLIC_MANTLE_CHAIN_ID || 0,
            } as ContractConfig,
            EventEvm: {
                name: "EventEvmContract",
                address: process.env.NEXT_PUBLIC_EVENT_CONTRACT_ADDRESS_MANTLE || "",
                abi: EventEvmAbi,
                chainId: process.env.NEXT_PUBLIC_ABSTRACT_CHAIN_ID || 0,
            } as ContractConfig
        }
    }
};
