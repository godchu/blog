'use client';

import * as React from 'react';
import Head from 'next/head';

export function Seo({ title, titleForTitleTag, image = '/images/og-default.png', children, isHomePage, searchOrder }) {
  return (
    <Head>
      {searchOrder !== undefined && <meta name="algolia-search-order" content={String(searchOrder)} />}
      {/* Font preloads */}
      {[
        'Source-Code-Pro-Regular',
        'Source-Code-Pro-Bold',
        'Optimistic_Display_W_Md',
        'Optimistic_Display_W_SBd',
        'Optimistic_Display_W_Bd',
        'Optimistic_Text_W_Md',
        'Optimistic_Text_W_Bd',
        'Optimistic_Text_W_Rg',
        'Optimistic_Text_W_It',
      ].map((font) => (
        <link
          key={font}
          rel="preload"
          href={`https://tienlx97.io.vn/fonts/${font}.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}
      {children}
    </Head>
  );
}
