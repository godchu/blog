import React from 'react';
import { cookies } from 'next/headers';
import Script from 'next/script';

import TopNavV2 from '@/components/layout/top-nav/top-nav.v2';
import { siteConfig } from '@/configs/site-config';
import { customMetaDataGenerator } from '@/lib/custom-meta-data-generator';

import { Analytics } from './analytics';
import { ThemeScript } from './theme-script';
import { UnloadEvent } from './unload-event';

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
      {/* Google Analytics */}
      {process.env.NODE_ENV === 'production' && (
        <>
          <Script
            id="gtag-loader"
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.Gtag}`}
          />
          <Script
            id="gtag-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${siteConfig.Gtag}', { send_page_view: false });
            `,
            }}
          />
        </>
      )}

      <body className="font-text font-medium antialiased text-lg bg-wash dark:bg-wash-dark text-secondary dark:text-secondary-dark leading-base">
        <ThemeScript />
        {process.env.NODE_ENV === 'production' && (
          <>
            <Analytics />
            <UnloadEvent />
          </>
        )}
        <TopNavV2 />
        {children}
      </body>
    </html>
  );
}
