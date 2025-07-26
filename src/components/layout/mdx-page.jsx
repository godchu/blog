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

  const parsedToc = transformTOC(toc);

  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <Page toc={parsedToc} routeTree={routeTree} meta={meta} section={markdownPath} languages={languages}>
        {content}
      </Page>
    </Suspense>
  );
};

// Deserialize a client React tree from JSON.
// function reviveNodeOnClient(parentPropertyName, val) {
//   if (Array.isArray(val) && val[0] === '$r') {
//     // Assume it's a React element.
//     let Type = val[1];
//     let key = val[2];
//     if (key === undefined) {
//       key = parentPropertyName; // Index within a parent.
//     }
//     let props = val[3];
//     if (Type === 'wrapper') {
//       Type = Fragment;
//       props = { children: props.children };
//     }
//     if (Type in MDXComponents) {
//       Type = MDXComponents[Type];
//     }
//     if (!Type) {
//       console.error('Unknown type: ' + Type);
//       Type = Fragment;
//     }
//     return <Type key={key} {...props} />;
//   } else {
//     return val;
//   }
// }

function transformTOC(toc) {
  return toc.map(({ value, href, depth }) => ({
    text: value,
    url: href,
    depth,
  }));
}
