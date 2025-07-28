'use client';

import { usePathname } from 'next/navigation';

import { DocsPageFooter } from '@/components/docs-footer';
import { getRouteMeta } from '@/components/layout/get-route-meta';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Toc } from '@/components/layout/toc';
import { LanguagesContext } from '@/components/MDX/languages-context';
import { TocContext } from '@/components/MDX/toc-context';
import PageHeading from '@/components/page-heading';
import { Seo } from '@/components/seo';

export default async function DocPage({ content, toc, routeTree, meta, section, languages }) {
  const asPath = usePathname();
  const cleanedPath = asPath.split(/[#?]/)[0];

  console.log({ cleanedPath });

  const { route, nextRoute, prevRoute, breadcrumbs, order } = getRouteMeta(cleanedPath, routeTree);

  return (
    <>
      <Seo
        title={meta.title || route?.title}
        titleForTitleTag={meta.titleForTitleTag}
        image={`/images/og-${section}.png`}
        searchOrder={order}
        isHomePage={false}
      />
      <div className="fixed top-0 py-0 shadow lg:pt-16 lg:sticky start-0 end-0 lg:shadow-none">
        <SidebarNav key={section} routeTree={routeTree} breadcrumbs={breadcrumbs} />
      </div>
      <article className="font-normal break-words text-primary dark:text-primary-dark">
        <div className="ps-0">
          <div className={section === 'blog' ? 'mx-auto px-0 lg:px-4 max-w-5xl' : ''}>
            <PageHeading
              title={meta.title}
              version={meta.version}
              description={meta.description}
              tags={route?.tags}
              breadcrumbs={breadcrumbs}
            />
          </div>
          <div className="px-5 sm:px-12">
            <div className="max-w-7xl mx-auto">
              <TocContext value={toc}>
                <LanguagesContext value={languages}>{content}</LanguagesContext>
              </TocContext>
            </div>
            <DocsPageFooter route={route} nextRoute={nextRoute} prevRoute={prevRoute} />
          </div>
        </div>
      </article>
      {/* Right-hand ToC column */}
      <div className="hidden -mt-16 lg:max-w-custom-xs 2xl:block">{toc.length > 0 ? <Toc headings={toc} /> : null}</div>
    </>
  );
}
