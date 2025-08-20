import React from 'react';
import { GoogleAnalytics } from '@next/third-parties/google';
import { cookies } from 'next/headers';

import TopNavV2 from '@/components/layout/top-nav/top-nav.v2';
// import SocialBanner from '@/components/social-banner';
import { siteConfig } from '@/configs/site-config';
import { customMetaDataGenerator } from '@/lib/custom-meta-data-generator';

import { ScrollRestoreFix } from './scroll-restore';
import { ThemeScript } from './theme-script';

import '../assets/styles/global.css';
import '../components/MDX/mdx-components.module.css';

export const metadata = customMetaDataGenerator({
  title: 'Lê Xuân Tiến',
  description:
    'Personal blog of a software engineer, sharing insights on web development, programming, and technology.',
});

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const theme = cookieStore.get('theme');

  return (
    <html lang="en" dir="ltr" className={theme?.value ?? 'dark'}>
      {/* <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#404756" /> */}
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta name="theme-color" content="#23272f" />
      <meta name="algolia-site-verification" content="E1EAFDD7A1FB6AFC" />

      <body className="font-text font-medium antialiased text-lg bg-wash dark:bg-wash-dark text-secondary dark:text-secondary-dark leading-base">
        <ThemeScript />
        <ScrollRestoreFix />
        {process.env.NODE_ENV === 'production' && <GoogleAnalytics gaId={siteConfig.Gtag} />}
        {/* <SocialBanner /> */}
        <TopNavV2 />
        {children}
      </body>
    </html>
  );
}
