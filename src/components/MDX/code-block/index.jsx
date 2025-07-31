'use client';

import * as React from 'react';
import { lazy, memo, Suspense } from 'react';
import cn from 'classnames';

const CodeBlock = lazy(() => import('./code-block'));

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
