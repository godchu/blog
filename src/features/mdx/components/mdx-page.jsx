'use client';

import React, { Suspense } from 'react';

import { PageV2 } from '@/components/layout/page.v2';
import { useActiveSection } from '@/hooks/use-active-section';

export const MdxPage = ({ markdownPath, content, toc, meta, languages = undefined }) => {
  const { routeTree, section } = useActiveSection();

  return (
    <Suspense fallback={<div className="loading">Loading...</div>}>
      <PageV2 toc={toc} routeTree={routeTree} meta={meta} section={section} languages={languages}>
        {content}
      </PageV2>
    </Suspense>
  );
};
