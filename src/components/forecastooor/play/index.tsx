"use client";

import useWeb3ContractConfig from "@/common/web3/evm/contract";
import { useAbstractPrivyLogin } from "@abstract-foundation/agw-react/privy";
import { CrossAppAccountWithMetadata, usePrivy } from "@privy-io/react-auth";
import { useMemo } from "react";
import { useWriteContract } from "wagmi";

const ForecastooorPlay = () => {
  const { user } = usePrivy();
  const { useAbsEventContract } = useWeb3ContractConfig()
  const { address, abi } = useAbsEventContract("abs")
  const { writeContractAsync } = useWriteContract();
  const { link } = useAbstractPrivyLogin();

  const submit = async () => {
    writeContract({
      id: '21321312',
      expireAt: 1737383152,
      signature: '0xxxxx'
    })
  }

  const writeContract = async (data: any) => {
    let res = ''
    try {
      const { id, expireAt, signature } = data
      res = await writeContractAsync({
        abi: abi as any,
        address: address as `0x${string}`,
        functionName: "betCrypto",
        args: [
          id,
          expireAt,
          signature,
        ],
      })
    } catch (e) {
      console.log('e', e)
    }
    return res
  }

  const absUser = useMemo(() => {
    const absUserAccount = user?.linkedAccounts.find(
      (account): account is CrossAppAccountWithMetadata =>
        account.type === "cross_app" &&
        account.providerApp && account.providerApp.id == process.env.NEXT_PUBLIC_PRIVY_ABS_ID &&
        account.embeddedWallets.length > 0,
    );
    return absUserAccount as CrossAppAccountWithMetadata
  }, [user])

  const onLink = async () => {
    try {
      const user = await link()
      console.log('link user', user)
    } catch (e) {
      if ((e as any).message !== 'User rejected request') {
        console.dir(e)
      }
    }
  }

  const ethWallet = useMemo(() => {
    if (!absUser) {
      return ''
    }
    return absUser.smartWallets[0].address
  },[absUser])

  return (
    <div className="h-full flex-col-center vw-gap-16">
      {absUser? (
        <>
          <div className="vw-text-14 text-white">
            <div>Wallet:</div>
            <div className="break-all">{ethWallet}</div>
          </div>
          <div className='w-[50%]'>
            <div className="commonButton primary vw-h-32" onClick={submit}>Submit</div>
          </div>
        </>
      ) : (
        <div className='w-[50%]'>
          <div className="commonButton primary vw-h-32" onClick={onLink}>Link Wallet</div>
        </div>
      )}
    </div>
  )
}

export default ForecastooorPlay