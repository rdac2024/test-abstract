"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginWithEmail, usePrivy } from "@privy-io/react-auth";
import showNotification from "@/lib/utils/notifications";
import { getVwByPx } from "@/common/utils";
import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { cn } from "@/lib/utils";
import { HomeTabRouterPath } from "@/common/statement/common";
import OTPInput from "@/components/common/input/OTPInput";
import Navigator from "@/components/common/navigator";
import PageAnimationWrap from "@/components/common/layout/PageAnimationWrap";
import LoginButton from "@/components/common/button/loginButton";

function VerifyEmailCode() {
  const userDetail = useSelector((state: IRootState) => state.userDetailsReducer);
  const email = useRef("");

  const router = useRouter()
  const { loginWithCode } = useLoginWithEmail()
  const { user: privyUser } = usePrivy();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (email.current == "") {
      const params = new URLSearchParams(window.location.search);
      email.current = params.get("email") || "";
    }
  }, [privyUser]);

  useEffect(() => {
    if (userDetail.userInfo._id) {
      router.push(HomeTabRouterPath.PROFILE)
    }
  }, [userDetail])

  const verifyCode = async () => {
    if (!otp) {
      return
    }

    setLoading(true)

    try {
      await loginWithCode({ code: otp })
    } catch (error: any) {
      console.log(error);
      setLoading(false)
      showNotification(`${error.message}`, "error");
    }
  }

  return (
    <PageAnimationWrap pageKey='login-verify'>
      <div className="relative h-full">
        <Navigator handleBackClick={() => router.push("/login")} />

        <div className="flex-col vw-gap-8 vw-px-24 vw-pt-16">
          <div className="vw-text-24 leading-[120%] text-white">Enter Email Verification Code</div>
          <div className="vw-text-16 font-[300] purple-text w-[fit-content] vw-h-24">{decodeURIComponent(email.current)}</div>
          <div className="text-[rgba(255,255,255,0.4)] font-[300] vw-text-12">Please check your email inbox (including spam/junk folders) for a message from privy.io. Enter the code you received below.</div>
        </div>
          
        <div className="vw-px-24" style={{ marginTop: getVwByPx(38) }}>
          <OTPInput type="number" length={6} onChange={setOtp} />
        </div>
        <div className={cn('absolute left-[0] right-[0] bottom-[0] vw-px-24 vw-py-24', { 'opacity-[0.4]': otp.length !== 6 })}>
          <LoginButton onClick={verifyCode} loading={loading} title="Confirm" isFullWidth />
        </div>
      </div>
    </PageAnimationWrap>
  );
}

export default VerifyEmailCode;
