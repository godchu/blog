'use client';

import * as React from 'react';
import { memo, Suspense } from 'react';
import cn from 'classnames';
import dynamic from 'next/dynamic';

/**
 * TODO: just temp fix
 */
const CodeBlock = dynamic(() => import('./code-block'), {
  ssr: false,
  loading: () => (
    <pre
      translate="no"
      dir="ltr"
      className={cn(
        'rounded-lg leading-6 h-full w-full overflow-x-auto flex items-center bg-wash dark:bg-gray-95 shadow-lg text-[13.6px] overflow-hidden min-h-[120px]',
      )}
    >
      <div className="py-[18px] ps-5 font-normal">
        <p className="sp-pre-placeholder overflow-hidden" />
      </div>
    </pre>
  ),
});

export default memo((props) => {
  const { children, isFromPackageImport } = props;

  return (
    <Suspense
      fallback={
        <pre
          translate="no"
          dir="ltr"
          className={cn(
            'rounded-lg leading-6 h-full w-full overflow-x-auto flex items-center bg-wash dark:bg-gray-95 shadow-lg text-[13.6px] overflow-hidden',
            !isFromPackageImport && 'my-8',
          )}
        >
          <div className="py-[18px] ps-5 font-normal ">
            <p className="sp-pre-placeholder overflow-hidden">{children}</p>
          </div>
        </pre>
      }
    >
      <CodeBlock {...props} />
    </Suspense>
  );
});
