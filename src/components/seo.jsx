
import * as React from 'react';
import Head from 'next/head';
import {withRouter} from 'next/router';

import {finishedTranslations} from '@/utils/finished-translations';

import {siteConfig} from '../site-config';

// export interface SeoProps {
//   title: string;
//   titleForTitleTag: undefined | string;
//   description?: string;
//   image?: string;
//   // jsonld?: JsonLDType | Array<JsonLDType>;
//   children?: React.ReactNode;
//   isHomePage: boolean;
//   searchOrder?: number;
// }

// If you are a maintainer of a language fork,
// deployedTranslations has been moved to src/utils/finishedTranslations.ts.

function getDomain(languageCode) {
  const subdomain = languageCode === 'en' ? '' : languageCode + '.';
  return subdomain + 'react.dev';
}

export const Seo = withRouter(({
  title,
  titleForTitleTag,
  image = '/images/og-default.png',
  router,
  children,
  isHomePage,
  searchOrder,
}) => {
  const siteDomain = getDomain(siteConfig.languageCode);
  const canonicalUrl = `https://${siteDomain}${
    router.asPath.split(/[#?]/)[0]
  }`;
    // Allow setting a different title for Google results
  const pageTitle
      = (titleForTitleTag ?? title) + (isHomePage ? '' : ' – React');
    // Twitter's meta parser is not very good.
  const twitterTitle = pageTitle.replaceAll(/[<>]/g, '');
  const description = isHomePage
    ? 'React is the library for web and native user interfaces. Build user interfaces out of individual pieces called components written in JavaScript. React is designed to let you seamlessly combine components written by independent people, teams, and organizations.'
    : 'The library for web and native user interfaces';
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      {title != undefined && <title key="title">{pageTitle}</title>}
      {isHomePage ? <meta key="description" name="description" content={description}/> : null}
      <link rel="canonical" href={canonicalUrl}/>
      <link
        rel="alternate"
        href={canonicalUrl.replace(siteDomain, getDomain('en'))}
        hrefLang="x-default"
      />
      {finishedTranslations.map(languageCode => (
        <link
          key={'alt-' + languageCode}
          rel="alternate"
          hrefLang={languageCode}
          href={canonicalUrl.replace(siteDomain, getDomain(languageCode))}
        />
      ))}
      <meta property="fb:app_id" content="623268441017527"/>
      <meta key="og:type" property="og:type" content="website"/>
      <meta key="og:url" property="og:url" content={canonicalUrl}/>
      {title != undefined && (
        <meta key="og:title" property="og:title" content={pageTitle}/>
      )}
      {description != undefined && (
        <meta
          key="og:description"
          property="og:description"
          content={description}
        />
      )}
      <meta
        key="og:image"
        property="og:image"
        content={`https://${siteDomain}${image}`}
      />
      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:site" name="twitter:site" content="@reactjs"/>
      <meta key="twitter:creator" name="twitter:creator" content="@reactjs"/>
      {title != undefined && (
        <meta
          key="twitter:title"
          name="twitter:title"
          content={twitterTitle}
        />
      )}
      {description != undefined && (
        <meta
          key="twitter:description"
          name="twitter:description"
          content={description}
        />
      )}
      <meta
        key="twitter:image"
        name="twitter:image"
        content={`https://${siteDomain}${image}`}
      />
      <meta
        name="google-site-verification"
        content="sIlAGs48RulR4DdP95YSWNKZIEtCqQmRjzn-Zq-CcD0"
      />
      {searchOrder != undefined && (
        <meta name="algolia-search-order" content={'' + searchOrder}/>
      )}
      <link
        rel="preload"
        href="https://react.dev/fonts/Source-Code-Pro-Regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://react.dev/fonts/Source-Code-Pro-Bold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://react.dev/fonts/Optimistic_Display_W_Md.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://react.dev/fonts/Optimistic_Display_W_SBd.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://react.dev/fonts/Optimistic_Display_W_Bd.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://react.dev/fonts/Optimistic_Text_W_Md.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://react.dev/fonts/Optimistic_Text_W_Bd.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://react.dev/fonts/Optimistic_Text_W_Rg.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        href="https://react.dev/fonts/Optimistic_Text_W_It.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      {children}
    </Head>
  );
});
