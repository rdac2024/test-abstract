"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";
import { usePrivy, useSolanaWallets, WalletWithMetadata } from "@privy-io/react-auth";
import { setUserDetails, incUserGold, incUserGem, updateRewardStatus, RewardInfo } from "@/redux/userDetail/reducer";
import { AppDispatch } from "@/redux/store";
import { usePathname, useRouter } from "next/navigation";
import { getUserInfo } from "@/service/user";

interface AuthContextType {
  fetchUserInfoLoading: boolean;
  getAndSetUserDetailInfo: (id: string, save?: boolean, routerPush?: boolean) => any;
  updateUserDetailGold: (gold: number) => void;
  updateUserDetailGem: (gem: number) => void;
  updateUserDetailClaim: (status: RewardInfo) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useUserContext must be used within a AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const routerName = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const { createWallet, ready, authenticated, user } = usePrivy();
  const { createWallet: createSolanaWallet } = useSolanaWallets()
  const [fetchUserInfoLoading, setFetchUserInfoLoading] = useState(false);

  const getHasExistingSolanaWallet = () => {
    return !!user?.linkedAccounts.find(
      (account): account is WalletWithMetadata =>
        account.type === 'wallet' &&
        account.walletClientType === 'privy' &&
        account.chainType === 'solana',
    );
  }

  // auth login check
  useEffect(() => {
    (async () => {
      console.log("AuthContext privy", ready, authenticated, user);
      if (ready && authenticated) {
        const hasExistingSolanaWallet = getHasExistingSolanaWallet();
        if (hasExistingSolanaWallet && user?.wallet?.address) {
          const wallet = user?.wallet?.address.toLowerCase() as string;
          await getAndSetUserDetailInfo(wallet, true, true);
        } else {
          // create ethereum wallet
          if (!user?.wallet?.address) {
            await createWallet()
          }
          // create solana wallet
          if (!hasExistingSolanaWallet) {
            await createSolanaWallet()
          }
        }
      }

      // redirect to start page if not authenticated
      if (
        ready &&
        !authenticated &&
        !routerName.startsWith('/start')
      ) {
        router.push("/start");
      }
    })();
  }, [authenticated, user?.wallet]);

  // Get And Refresh User Info
  const getAndSetUserDetailInfo = async (wallet: string, save: boolean = false, routerPush: boolean = false) => {
    if (fetchUserInfoLoading || !wallet) return;
    try {
      setFetchUserInfoLoading(true);
      const result = await getUserInfo(wallet.toLowerCase());
      console.log("getUser:", result);
      if (result.code === 200) {
        const userObj = result.data!;

        if (save) {
          const swipoor = userObj.swipoor;
          dispatch(setUserDetails({
            ...userObj,
            ...swipoor
          }))
        };
        return result.data;
      } else {
        if (result?.msg && result?.msg?.includes("User does not exist")) {
          router.push("/referral");
        };
      }
      return null;
    } catch (error: any) {
      console.error("getAndSetUserDetailInfo error", error);
      return null;
    } finally {
      setFetchUserInfoLoading(false);
    }
  };

  // update user global gold
  const updateUserDetailGold = async (gold: number) => {
    dispatch(incUserGold(gold));
  };

  // update user global gem
  const updateUserDetailGem = async (gem: number) => {
    dispatch(incUserGem(gem))
  }
  // update user claim
  const updateUserDetailClaim = async (status: RewardInfo) => {
    dispatch(updateRewardStatus(status))
  }

  return (
    <AuthContext.Provider value={{
      fetchUserInfoLoading,
      getAndSetUserDetailInfo,
      updateUserDetailGold,
      updateUserDetailGem,
      updateUserDetailClaim
    }}>
      {children}
    </AuthContext.Provider>
  );
}
