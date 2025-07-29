'use client';

import * as React from 'react';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

import { finishedTranslations } from '@/utils/finished-translations';

import { siteConfig } from '../configs/site-config';

function getDomain(languageCode) {
  const subdomain = languageCode === 'en' ? '' : `${languageCode}.`;
  return `${subdomain}tienlx97.io.vn`;
}

export function Seo({ title, titleForTitleTag, image = '/images/og-default.png', children, isHomePage, searchOrder }) {
  const pathname = usePathname() || '';
  const siteDomain = getDomain(siteConfig.languageCode);
  const canonicalUrl = `https://${siteDomain}${pathname.split(/[#?]/)[0]}`;
  const pageTitle = (titleForTitleTag ?? title) + (isHomePage ? '' : ' – React');
  const twitterTitle = pageTitle.replaceAll(/[<>]/g, '');
  const description = isHomePage
    ? 'React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript. React is designed to let you seamlessly combine components written by independent people, teams, and organizations.'
    : 'The library for web and native user interfaces';

  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {title !== undefined && <title key="title">{pageTitle}</title>}
      {isHomePage && <meta key="description" name="description" content={description} />}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" href={canonicalUrl.replace(siteDomain, getDomain('en'))} hrefLang="x-default" />
      {finishedTranslations.map((languageCode) => (
        <link
          key={'alt-' + languageCode}
          rel="alternate"
          hrefLang={languageCode}
          href={canonicalUrl.replace(siteDomain, getDomain(languageCode))}
        />
      ))}
      <meta property="fb:app_id" content="623268441017527" />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:url" property="og:url" content={canonicalUrl} />
      {title && <meta key="og:title" property="og:title" content={pageTitle} />}
      {description && <meta key="og:description" property="og:description" content={description} />}
      <meta key="og:image" property="og:image" content={`https://${siteDomain}${image}`} />
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:site" name="twitter:site" content="@reactjs" />
      <meta key="twitter:creator" name="twitter:creator" content="@reactjs" />
      {title && <meta key="twitter:title" name="twitter:title" content={twitterTitle} />}
      {description && <meta key="twitter:description" name="twitter:description" content={description} />}
      <meta key="twitter:image" name="twitter:image" content={`https://${siteDomain}${image}`} />
      {/* <meta name="google-site-verification" content="sIlAGs48RulR4DdP95YSWNKZIEtCqQmRjzn-Zq-CcD0" /> */}
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
          href={`https://react.dev/fonts/${font}.woff2`}
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      ))}
      {children}
    </Head>
  );
}
