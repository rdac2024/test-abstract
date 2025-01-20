import React, { useMemo } from "react";
import { usePrivy, useSolanaWallets, WalletWithMetadata } from '@privy-io/react-auth'
import { shortenAddress } from "@/common/utils";
import BallSvg from "@/assets/images/profile/ball.svg";

function ExportEmbeddedWalletButton() {
  const { ready, authenticated, user } = usePrivy();
  const { exportWallet } = useSolanaWallets();
  const disableLogout = !ready || (ready && !authenticated);

  const onClick = () => {
    if (disableLogout) return
    exportWallet()
  }

  const wallet = useMemo(() => {
    const linkedAccount = user?.linkedAccounts.find(
      (account): account is WalletWithMetadata =>
        account.type === 'wallet' &&
        account.walletClientType === 'privy' &&
        account.chainType === 'solana',
    );
    return linkedAccount?.address || '';
  }, [user])

  return (
    <div onClick={onClick} className="flex items-center vw-gap-4 vw-h-16">
      <span className="vw-text-14 font-[300] text-[rgba(255,255,255,0.4)]">{shortenAddress(wallet)}</span>
      <BallSvg className="vw-size-16" />
    </div>
  );
}

export default ExportEmbeddedWalletButton;
