'use client';

import React, { useEffect, useMemo } from "react";
import { Spin } from "antd";
import { useLoginWithOAuth, usePrivy } from "@privy-io/react-auth";
import showNotification from "@/lib/utils/notifications";
import { useUserContext } from "@/context/AuthContext";
import { LoadingOutlined } from "@ant-design/icons";
import { getVwByPx } from "@/lib/utils";
import { cn } from "@/lib/utils";

import TwitterSvg from '@/assets/images/start/twitter.svg'

interface Props {
  className?: string;
  isFullWidth?: boolean;
  isWeb?: boolean
  loginLoading: boolean
  setLoginLoading: (v: boolean) => void
}

function TwitterLoginButton(props: Props) {
  const { className, isFullWidth, isWeb, loginLoading, setLoginLoading } = props
  const { ready, authenticated } = usePrivy()
  const { initOAuth, loading } = useLoginWithOAuth();
  const { fetchUserInfoLoading } = useUserContext()

  useEffect(() => {
    if (loading) setLoginLoading(true);
    if (authenticated) setLoginLoading(true);
    if (fetchUserInfoLoading) setLoginLoading(true);
  }, [authenticated, fetchUserInfoLoading, loading])

  const loginWithX = async () => {
    setLoginLoading(true);
    try {
      await initOAuth({ provider: "twitter" });
    } catch (error: any) {
      console.log(error);
      showNotification("Something went wrong. Please try again later", "error");
    }
  };

  const isLoading = useMemo(() => {
    return !ready || loginLoading
  }, [loginLoading, ready])

  return (
    <>
      {isWeb && (
        <button className={cn(className, `relative h-[48px] flex-row-center gap-[8px] rounded-[100px] !bg-[#ffffff] `, { 'w-full': isFullWidth, 'opacity-[0.8]': isLoading})}
          disabled={isLoading}
          onClick={loginWithX}
        >
          { isLoading && (
            <Spin className="absolute top-[50%] left-[48px]" style={{ transform: 'translateY(-50%)' }} indicator={<LoadingOutlined rev={undefined} spin />} />
          )}
          <div className='w-[24px] h-[24px]'>
            <TwitterSvg />
          </div>
          <span className="text-[16px] leading-[120%] text-[#050507]">Login with Twitter</span>
        </button>
      )}
      {!isWeb && (
        <button
          className={cn(
            className,
            `relative vw-h-48 flex-row-center vw-gap-8 vw-radius-100 !bg-[#ffffff]`,
            {
              'w-full': isFullWidth,
              'opacity-[0.8]': isLoading
            }
          )}
          disabled={isLoading}
          onClick={loginWithX}
        >
          { (isLoading) && (
            <Spin
              className="absolute top-[50%]"
              style={{
                left: getVwByPx(48),
                transform: 'translateY(-50%)'
              }}
              indicator={<LoadingOutlined className="svg-fill-black" rev={undefined} spin />}
            />
          )}
          <div className='vw-size-24'>
            <TwitterSvg />
          </div>
          <span className="vw-text-16 leading-[120%] text-[#050507]">Login with Twitter</span>
        </button>
      )}
    </>
  );
}

export default TwitterLoginButton;
