"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { getVwByPx } from "@/lib/utils";

export default function HomeLoadingProgress() {
  const [progress, setProgress] = useState(0);
  const { ready } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referralCode = params.get("ref");
    if (referralCode) {
      localStorage.setItem('referralCode', referralCode as string)
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + 5;

        if (newProgress >= 100) {
          clearInterval(interval);
          return 100;
        }

        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let timerId: NodeJS.Timeout
    if (progress >= 100 && ready) {
      timerId = setTimeout(() => {
        router.push(`/start`);
      }, 100);
    }
    return () => {
      clearTimeout(timerId)
    }
  }, [progress, router, ready]);

  return (
    <div className="purple-text flex vw-text-24">
      <span className="text-right" style={{ width: getVwByPx(42) }}>{progress}</span>
      <span>%</span>
    </div>
  );
}
