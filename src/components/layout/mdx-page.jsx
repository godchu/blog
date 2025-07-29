'use client';

import React, { Suspense } from 'react';

import { useActiveSection } from '@/hooks/use-active-section';

import { PageV2 } from './page.v2';

export const MdxPage = ({ markdownPath, content, toc, meta, languages = undefined }) => {
  console.log({ content });

  const { routeTree } = useActiveSection();

  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <PageV2 toc={toc} routeTree={routeTree} meta={meta} section={markdownPath} languages={languages}>
        {content}
      </PageV2>
    </Suspense>
  );
};
