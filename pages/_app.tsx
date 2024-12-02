import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { ChakraProvider, Container } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { Provider as ReduxProvider } from "react-redux";

import { theme } from "@/components/ui/theme";
import {
  HeaderFooterLayout,
  LeftPanelLayout,
  MinimalLayout,
} from "@/components/layout";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { store } from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });
type LayoutType = "header-footer" | "left-panel" | "minimal";

export default function MyApp({
  Component,
  pageProps,
  layout,
}: AppProps & { layout: LayoutType }) {

  const renderLayout = (layoutType: LayoutType, children: React.ReactNode) => {
    switch (layoutType) {
      case "header-footer":
        return <HeaderFooterLayout>{children}</HeaderFooterLayout>;
      case "left-panel":
        return <LeftPanelLayout>{children}</LeftPanelLayout>;
      case "minimal":
      default:
        return <MinimalLayout>{children}</MinimalLayout>;
    }
  };

  return (
    <Container>
      <Head>
        <title>Study Planner</title>
      </Head>
      <main className={inter.className}>
        <ChakraProvider theme={theme}>
          <ThemeProvider attribute="class">
            <ReduxProvider store={store}>
              <AuthProvider>
                <GoogleOAuthProvider
                  clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ""}
                >
                    {renderLayout(layout, <Component {...pageProps} />)}
                </GoogleOAuthProvider>
              </AuthProvider>
            </ReduxProvider>
          </ThemeProvider>
        </ChakraProvider>
      </main>
    </Container>
  );
}
