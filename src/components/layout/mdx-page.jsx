'use client';

import React, { Suspense } from 'react';

import { useActiveSection } from '@/hooks/use-active-section';

import sidebarBlog from '../../sidebarBlog.json';
import sidebarCommunity from '../../sidebarCommunity.json';
import sidebarHome from '../../sidebarHome.json';
import sidebarLearn from '../../sidebarLearn.json';
import sidebarReference from '../../sidebarReference.json';

import { Page } from './page';

// import { Page } from './page';

export const MdxPage = ({ markdownPath, content, toc, meta, languages = undefined }) => {
  const section = useActiveSection();
  let routeTree;
  switch (section) {
    case 'home':
    case 'unknown':
      routeTree = sidebarHome;
      break;
    case 'learn':
      routeTree = sidebarLearn;
      break;
    case 'reference':
      routeTree = sidebarReference;
      break;
    case 'community':
      routeTree = sidebarCommunity;
      break;
    case 'blog':
      routeTree = sidebarBlog;
      break;
  }

  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <Page toc={toc} routeTree={routeTree} meta={meta} section={markdownPath} languages={languages}>
        {content}
      </Page>
    </Suspense>
  );
};
