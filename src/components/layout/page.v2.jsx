/* eslint-disable complexity */
'use client';

import React, { Suspense } from 'react';
import cn from 'classnames';
import Head from 'next/head';
import { usePathname } from 'next/navigation';

import { DocsPageFooter } from '../docs-footer';
import { LanguagesContext } from '../MDX/languages-context';
import { TocContext } from '../MDX/toc-context';
import PageHeading from '../page-heading';
import { Seo } from '../seo';

import { Footer } from './footer';
import { getRouteMeta } from './get-route-meta';
import { SidebarNav } from './sidebar-nav';
import { Toc } from './toc';

function PageV2({ children, toc, routeTree, meta, section, languages }) {
  const asPath = usePathname();
  const cleanedPath = asPath.split(/[#?]/)[0];

  const { route, nextRoute, prevRoute, breadcrumbs, order } = getRouteMeta(cleanedPath, routeTree);

  const title = meta.title || route?.title || '';
  const { version } = meta;
  const description = meta.description || route?.description || '';
  const isBlogIndex = cleanedPath === '/docs/blog';
  const isNikkiIndex = cleanedPath === '/docs/nikki';

  let hasColumns = true;
  let showSidebar = true;
  let showToc = true;
  if (isBlogIndex || isNikkiIndex) {
    hasColumns = false;
    showSidebar = false;
    showToc = false;
  } else if (section === 'nikki') {
    showToc = false;
    hasColumns = false;
    showSidebar = false;
  }

  let searchOrder;
  if (section === 'learn' || (section === 'blog' && !isBlogIndex) || (section === 'nikki' && !isNikkiIndex)) {
    searchOrder = order;
  }

  return (
    <>
      <Seo
        title={title}
        titleForTitleTag={meta.titleForTitleTag}
        isHomePage={false}
        image={'/images/og-' + section + '.png'}
        searchOrder={searchOrder}
      />
      {isBlogIndex ? (
        <Head>
          <link rel="alternate" type="application/rss+xml" title="React Blog RSS Feed" href="/rss.xml" />
        </Head>
      ) : undefined}
      <div
        className={cn(
          hasColumns && 'grid grid-cols-only-content lg:grid-cols-sidebar-content 2xl:grid-cols-sidebar-content-toc',
        )}
      >
        {showSidebar && (
          <div className="lg:-mt-16 z-10">
            <div className="fixed top-0 py-0 shadow lg:pt-16 lg:sticky start-0 end-0 lg:shadow-none">
              <SidebarNav key={section} routeTree={routeTree} breadcrumbs={breadcrumbs} />
            </div>
          </div>
        )}
        {/* No fallback UI so need to be careful not to suspend directly inside. */}
        <Suspense fallback={undefined}>
          <main className="min-w-0 isolate">
            <article key={asPath} className="font-normal break-words text-primary dark:text-primary-dark">
              <div className="ps-0">
                <div className={cn(section === 'blog' && 'mx-auto px-0 lg:px-4 max-w-5xl')}>
                  <PageHeading
                    title={title}
                    version={version}
                    description={description}
                    tags={route?.tags}
                    breadcrumbs={breadcrumbs}
                  />
                </div>
                <div className="px-5 sm:px-12">
                  <div className={cn('max-w-7xl mx-auto', section === 'blog' && 'lg:flex lg:flex-col lg:items-center')}>
                    <TocContext value={toc}>
                      <LanguagesContext value={languages}>{children}</LanguagesContext>
                    </TocContext>
                  </div>
                  {(!isBlogIndex || !isNikkiIndex) && (
                    <DocsPageFooter route={route} nextRoute={nextRoute} prevRoute={prevRoute} />
                  )}
                </div>
              </div>
            </article>
            <div className="self-stretch w-full">
              <div className="w-full px-5 pt-10 mx-auto sm:px-12 md:px-12 md:pt-12 lg:pt-10">
                <hr className="mx-auto max-w-7xl border-border dark:border-border-dark" />
              </div>
              <div className={cn('py-12 px-5 sm:px-12 md:px-12 sm:py-12 md:py-16 lg:py-14')}>
                <Footer />
              </div>
            </div>
          </main>
        </Suspense>
        <div className="hidden -mt-16 lg:max-w-custom-xs 2xl:block">
          {showToc && toc.length > 0 ? <Toc key={asPath} headings={toc} /> : undefined}
        </div>
      </div>
    </>
  );
}

export { PageV2 };
