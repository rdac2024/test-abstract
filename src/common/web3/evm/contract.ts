import { netWorkType } from "@/common/statement/common";
import { ChainConfigs, ContractConfig, ContractName } from "@/common/web3/evm/config";
import { Contract } from "ethers";
import { ethers } from "ethers";

interface UseContract {
    address: string;
    chain: number;
    contract: Contract;
    abi: any;
}

export default function useWeb3ContractConfig() {
    let absEvent: UseContract;
    let swipePass: UseContract;

    function getContractConfig(chain: netWorkType, contractName: ContractName): (ContractConfig | null) {
        if (!ChainConfigs[chain].contracts[contractName]) {
            throw new Error(`Contract ${contractName}_${chain} not found for chain ${chain}`);
        }

        return ChainConfigs[chain].contracts[contractName]
    }

    // new ethers contract instance get
    const useSwipePassContract = (chain: netWorkType): UseContract => {
        const config = getContractConfig(chain, "SwipePass");
        if (!config) {
            throw new Error(`Contract swipePass_${chain} not found for chain ${chain}`);
        }

        // initialise contract or change contract
        if (!swipePass) {
            swipePass = {
                address: config.address,
                contract: new ethers.Contract(config.address, config.abi),
                chain: Number(config.chainId),
                abi: config.abi,
            }
        }

        return swipePass
    }

    const useAbsEventContract = (chain: netWorkType): UseContract => {
        const config = getContractConfig(chain, "EventEvm");
        if (!config) {
            throw new Error(`Contract EventEvm_${chain} not found for chain ${chain}`);
        }

        if (!absEvent) {
            absEvent = {
                address: config.address,
                contract: new ethers.Contract(config.address, config.abi),
                chain: Number(config.chainId),
                abi: config.abi,
            }
        }

        return absEvent
    }

    return {
        useSwipePassContract,
        useAbsEventContract,
    }
}