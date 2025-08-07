import React from 'react';
import { GoogleTagManager } from '@next/third-parties/google';
import { cookies } from 'next/headers';

import TopNavV2 from '@/components/layout/top-nav/top-nav.v2';
import SocialBanner from '@/components/social-banner';
import { siteConfig } from '@/configs/site-config';
import { customMetaDataGenerator } from '@/lib/custom-meta-data-generator';

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

      <body className="font-text font-medium antialiased text-lg bg-wash dark:bg-wash-dark text-secondary dark:text-secondary-dark leading-base">
        <ThemeScript />
        {process.env.NODE_ENV === 'production' && <GoogleTagManager gaId={siteConfig.Gtag} />}
        <SocialBanner />
        <TopNavV2 />
        {children}
      </body>
    </html>
  );
}

// <!-- Google Tag Manager -->
// <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
// new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
// j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
// 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
// })(window,document,'script','dataLayer','GTM-PPFNKPVX');</script>
// <!-- End Google Tag Manager -->

// <!-- Google Tag Manager (noscript) -->
// <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PPFNKPVX"
// height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
// <!-- End Google Tag Manager (noscript) -->
