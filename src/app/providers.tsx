"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { RektLogo } from "@/common/statement/images";
import { AuthProvider } from "@/context/AuthContext";
import Script from "next/script";
import DisableServerSideRender from "@/hooks/disableServerSideRender";
import { AbstractPrivyProvider } from "@abstract-foundation/agw-react/privy";

export default function RootProviders({ children }: { children: React.ReactNode }) {
  const IsDev = process.env.NEXT_PUBLIC_LOCAL_TEST == "true";
  return (
    <Provider store={store}>
      <DisableServerSideRender>
        <AbstractPrivyProvider
          appId={ process.env.NEXT_PUBLIC_PRIVY_APP_ID || "" }
          config={{
            loginMethods: [ "twitter","email" ],
            embeddedWallets: {
              createOnLogin: "users-without-wallets" // auto create embeddedWallets for users without wallet
            },
            appearance: {
              theme: "dark",
              logo: RektLogo,
              walletChainType: "ethereum-and-solana"
            },
          }}
        >
          <AuthProvider>
            {children}
          </AuthProvider>
        </AbstractPrivyProvider>
        { IsDev && (
          <Script
            src={ "https://cdn.jsdelivr.net/npm/eruda" }
            onLoad={ () => {
              const anyWindow = window as any;
              anyWindow.eruda.init();
            }}
          />
        )}
        <Script
          src={ "https://www.googletagmanager.com/gtag/js?id=G-Z3V3546D12" }
          onLoad={ () => {
            const anyWindow = window as any;
            anyWindow.dataLayer = anyWindow.dataLayer || [];
            function gtag(...args: any[]) {
              anyWindow.dataLayer.push(arguments);
            }
            gtag('js', new Date());
            gtag('config', 'G-Z3V3546D12');
          }}
        />
      </DisableServerSideRender>
    </Provider>
  )
}
