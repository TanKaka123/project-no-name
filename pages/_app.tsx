import React from 'react';
import Head from 'next/head';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/contexts/AuthContext';
import { ChakraProvider } from '@chakra-ui/react';
import { ThemeProvider } from "next-themes";
import { theme } from '@/components/ui/theme';
import { useForm, FormProvider } from 'react-hook-form';
import { HeaderFooterLayout, LeftPanelLayout, MinimalLayout } from '@/components/layout';
import type { AppProps } from 'next/app';


const inter = Inter({ subsets: ['latin'] });
type LayoutType = 'header-footer' | 'left-panel' | 'minimal';

export default function MyApp({ Component, pageProps, layout }: AppProps & {layout: LayoutType}) {
  const methods = useForm();

  const renderLayout = (layoutType: LayoutType, children: React.ReactNode) => {
    switch (layoutType) {
      case 'header-footer':
        return <HeaderFooterLayout>{children}</HeaderFooterLayout>;
      case 'left-panel':
        return <LeftPanelLayout>{children}</LeftPanelLayout>;
      case 'minimal':
      default:
        return <MinimalLayout>{children}</MinimalLayout>;
    }
  };

  return (
    <AuthProvider>
      <Head>
        <title>Study Planner</title>
      </Head>
      <main className={inter.className}>
        <ChakraProvider theme={theme}>
          <ThemeProvider attribute="class">
            <FormProvider {...methods}>
              {renderLayout(layout, <Component {...pageProps} />)}
            </FormProvider>
          </ThemeProvider>
        </ChakraProvider>
      </main>
    </AuthProvider>
  );
}
