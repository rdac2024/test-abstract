"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useSelector } from "react-redux";
import { IRootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { getVwByPx } from "@/lib/utils";

// images
import LogoSvg from "@/assets/images/start/logo.svg";
import BannerSvg from "@/assets/images/start/banner.svg";
import EmailIcon from "@/assets/images/start/email.svg";
import { HomeTabRouterPath } from "@/common/statement/common";
import TwitterLoginButton from "@/components/common/button/twitterLoginButton";

function Start() {
  const router = useRouter();
  const userDetail = useSelector((state: IRootState) => state.userDetailsReducer);
  const [loginLoading, setLoginLoading] = useState(false)

  useEffect(() => {
    (async () => {
      if (userDetail.login) {
        router.push(HomeTabRouterPath.FORECATOOOR_PLAY);
      }
    })();
  }, [userDetail.login]);

  return (
    <section className="h-full overflow-y-auto hideScrollbar">
      <div className="flex-col items-center vw-pt-48 vw-pb-24">
        <div style={{ width: getVwByPx(200), height: getVwByPx(200) }}>
          <BannerSvg />
        </div>

        <div className="flex-col items-center vw-px-24" style={{ marginTop: getVwByPx(96) }}>
          <div style={{ width: getVwByPx(137.67), height: getVwByPx(28) }}>
            <LogoSvg />
          </div>
          <p className="text-white vw-text-24 text-center leading-[120%] vw-mt-16">Start earning instant rewards while you play!</p>
          <div className="w-full vw-mt-32 vw-mb-12">
            <TwitterLoginButton isFullWidth loginLoading={loginLoading} setLoginLoading={setLoginLoading} />
          </div>
          <Link href="/login" className="flex-row-center vw-h-48 vw-gap-8">
            <div className="vw-size-24">
              <EmailIcon />
            </div>
            <span className="text-white vw-text-16 leading-[120%]">Login with Email</span>
          </Link>
        </div>

        <div className="text-white font-[300] vw-text-12 leading-[120%] text-center text-opacity-[0.6] vw-mt-48" style={{ width: getVwByPx(220) }}>
          <span>By signing up, you agree with our </span>
          <span className="underline">Terms of use & Privacy Policy</span>
          <span>.</span>
        </div>
      </div>
    </section>
  );
}

export default Start;
