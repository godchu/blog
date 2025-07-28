'use client';

import { usePathname } from 'next/navigation';

import { useActiveSection } from '@/hooks/use-active-section';

import { getRouteMeta } from '../get-route-meta';

import TopNav from './top-nav';

export default function TopNavV2() {
  const { section, routeTree } = useActiveSection();

  const asPath = usePathname();
  const cleanedPath = asPath.split(/[#?]/)[0];

  const { breadcrumbs } = getRouteMeta(cleanedPath, routeTree);

  return <TopNav section={section} routeTree={routeTree} breadcrumbs={breadcrumbs} />;
}
