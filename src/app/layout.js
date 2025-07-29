import React from 'react';
import { cookies } from 'next/headers';
import Script from 'next/script';

import TopNavV2 from '@/components/layout/top-nav/top-nav.v2';
import { customMetaDataGenerator } from '@/lib/custom-meta-data-generator';

import { Analytics } from './analytics';
import { ThemeScript } from './theme-script';
import { UnloadEvent } from './unload-event';

import '@docsearch/css';
import '../assets/styles/algolia.css';
import '../assets/styles/index.css';
import '../assets/styles/sandpack.css';

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
      {/* Google Analytics */}
      <Script
        id="gtag-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
            `,
        }}
      />

      <body className="font-text font-medium antialiased text-lg bg-wash dark:bg-wash-dark text-secondary dark:text-secondary-dark leading-base">
        <ThemeScript />
        <Analytics />
        <UnloadEvent />
        <TopNavV2 />
        {children}
      </body>
    </html>
  );
}
