"use client"

import Navigator from "@/components/common/navigator";
import React, { useState } from "react";
import LoginButton from "@/components/common/button/loginButton";
import Input from "@/components/common/input/input";
import showNotification from "@/lib/utils/notifications";
import { useLoginWithEmail } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import PageAnimationWrap from "@/components/common/layout/PageAnimationWrap";

function Login() {
  const router = useRouter()
  const { sendCode } = useLoginWithEmail()
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const onLogin = async () => {
    if (!email) {
      return;
    }

    setLoading(true);

    try {
      await sendCode({ email })

      router.push(`/login/verify?email=${email}`)
    } catch (error: any) {
      console.log(error);
      setLoading(false)
      showNotification("The email address is incorrect", "error");
    }
  };

  return (
    <PageAnimationWrap pageKey="login">
      <div className="relative h-full">
        <Navigator handleBackClick={() => router.push("/start")} />

        <div className="flex-col vw-gap-8 vw-px-24 vw-pt-16 vw-pb-24">
          <div className="vw-text-24 leading-[120%] text-white">Login with Email</div>
        </div>

        <div className="vw-px-24">
          <Input value={email} name="email" autoFocus onChange={(e) => setEmail(e.target.value)} placeholder="Please enter your email" />
        </div>

        <div className={cn('absolute left-[0] right-[0] bottom-[0] vw-px-24 vw-py-24', { 'opacity-[0.4]': !email })}>
          <LoginButton onClick={onLogin} loading={loading} title="Submit" isFullWidth />
        </div>
      </div>
    </PageAnimationWrap>
  );
}

export default Login;
