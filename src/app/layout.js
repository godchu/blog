/* eslint-disable no-undef */
import Script from 'next/script';

import React from 'react';
import {Analytics} from './analytics';

import {UnloadEvent} from './unload-event';
import '@docsearch/css';
import '../assets/styles/algolia.css';
import '../assets/styles/index.css';
import '../assets/styles/sandpack.css';

export const metadata = {
  title: 'Personal Blog',
  description:
    'Personal blog of a software engineer, sharing insights on web development, programming, and technology.',
};

export default function RootLayout({children}) {
  return (
    <html lang='en' dir='ltr' className='light platform-win'>
      <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#404756'/>
      <meta name='msapplication-TileColor' content='#2b5797'/>
      <meta name='theme-color' content='#23272f'/>
      {/* Google Analytics */}
      <Script
        id='gtag-loader'
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');
            `,
        }}
      />
      <body className='font-text font-medium antialiased text-lg bg-wash dark:bg-wash-dark text-secondary dark:text-secondary-dark leading-base'>
        {/* Early theme + platform detection (prevents flicker and mismatch) */}
        <Script
          id='theme-loader'
          strategy='beforeInteractive'
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var preferredTheme = localStorage.getItem('theme');
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
                  var initialTheme = preferredTheme || (darkQuery.matches ? 'dark' : 'light');
                  document.documentElement.classList.toggle('dark', initialTheme === 'dark');
                  document.documentElement.classList.add(
                    navigator.platform.includes('Mac') ? 'platform-mac' : 'platform-win'
                  );
                } catch (e) {}
              })();
            `,
          }}
        />
        <Analytics/>
        <UnloadEvent/>
        {children}
      </body>
    </html>
  );
}
