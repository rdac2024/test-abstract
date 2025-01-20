"use client";

import React, { useEffect } from "react";
import Navigator from "@/components/common/navigator";
import { useRouter } from "next/navigation";
import showNotification from "@/lib/utils/notifications";
import { HomeTabRouterPath } from "@/common/statement/common";
import { registerUser } from "@/service/user";
import { useUserContext } from "@/context/AuthContext";
import { useLogout, usePrivy, useSolanaWallets, WalletWithMetadata } from "@privy-io/react-auth";
import { cn } from "@/lib/utils";
import Styles from '@/styles/referral/referral.module.scss'
import PageAnimationWrap from "@/components/common/layout/PageAnimationWrap";
import FullScreenLoading from "@/components/loading/FullScreenLoading";
import OTPInput from "@/components/common/input/OTPInput";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setUserDetails } from "@/redux/userDetail/reducer";
import { resetPredictoorDetail } from "@/redux/predictoorDetail/reducer";

function Activate() {
  const router = useRouter();
  const { logout } = useLogout();
  const { user, createWallet } = usePrivy();
  const { createWallet: createSolanaWallet } = useSolanaWallets()
  const [enterLoading, setEnterLoading] = React.useState<boolean>(false);
  const [referralCode, setReferralCode] = React.useState<string>("");
  const { getAndSetUserDetailInfo } = useUserContext();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const code = localStorage.getItem('referralCode')
    if (code) {
      setReferralCode(code)
    }
  }, [])

  const checkAndCreateWallet = async () => {
    const hasExistingSolanaWallet = !!user?.linkedAccounts.find(
      (account): account is WalletWithMetadata =>
        account.type === 'wallet' &&
        account.walletClientType === 'privy' &&
        account.chainType === 'solana',
    );
    // create ethereum wallet
    if (!user?.wallet?.address) {
      await createWallet()
    }
    // create solana wallet
    if (!hasExistingSolanaWallet) {
      await createSolanaWallet()
    }
  }

  const referralEnterCode = async (hasReferralCode: boolean) => {
    if (hasReferralCode && referralCode.length !== 8) {
      return
    }

    setEnterLoading(true);
    try {
      // check if wallet is not created, create evm and solana wallet
      await checkAndCreateWallet();
      
      // register user (Enter referral code)
      const result = (await registerUser(hasReferralCode? referralCode : undefined)) as any;
      if (result.code === 200) {
        // success navigate to home
        router.push(HomeTabRouterPath.PROFILE);

        // set user details
        await getAndSetUserDetailInfo(result.data.wallet, true, false)
      } else {
        // error referral code
        showNotification("Referral code is invalid", "error");
      }
    } catch (e) {
      console.log(e);
      showNotification("Something went wrong. Please try again later", "error");
    } finally {
      setEnterLoading(false);
    }
  };

  const onBack = () => {
    onLogout();
    router.push("/start");
  }

  const onLogout = async () => {
    try {
      await logout();
      dispatch(setUserDetails({
        dailyLogin: "",
        dailyLoginBonus: [],
        referredBy: "",
        avatar: "",
        code: "",
        name: "",
        twitter: "",
        email: "",
        wallet: "",
        referred: 0,
        _id: "",
        swipoor: {
          lastBetAt: 0,
          correct: 0,
          gold: 0,
          gem: 0,
          wrong: 0,
          claim: {
            pass: undefined,
            basic: undefined,
            passTotal: undefined,
            basicTotal: undefined
          }
        },
        eventBonus: '0'
      }))
      dispatch(resetPredictoorDetail())
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  return (
    <>
      <PageAnimationWrap pageKey="referral">
        <div className="relative h-full">
          <Navigator handleBackClick={onBack} />

          <div className="flex-col vw-gap-8 vw-px-24 vw-pt-16">
            <div className="vw-text-24 leading-[120%] text-white">Enter a referral code to receive bonus rewards!</div>
          </div>

          <div className="vw-px-24 vw-mt-48">
            <OTPInput isReferral initValue={referralCode} type="text" length={8} onChange={setReferralCode} />
          </div>
          <div className={Styles.skipButton} onClick={() => referralEnterCode(false)}>
            <span>Skip</span>
          </div>
          <div className={cn(Styles.submitButton, { [Styles.disabled]: referralCode.length !== 8 })} onClick={() => referralEnterCode(true)}>
            <span>Continue</span>
          </div>
        </div>
      </PageAnimationWrap>
      {enterLoading && (
        <FullScreenLoading color='purple' />
      )}
    </>
  );
}

export default Activate;
