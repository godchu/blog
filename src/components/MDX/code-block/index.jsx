'use client';

import * as React from 'react';
import cn from 'classnames';

import CodeBlock from './code-block';

export default function Pre(props) {
  const { children, isFromPackageImport } = props;

  return (
    <CodeBlock
      {...props}
      fallback={
        <pre
          translate="no"
          dir="ltr"
          className={cn(
            'rounded-lg leading-6 h-full w-full overflow-x-auto flex items-center bg-wash dark:bg-gray-95 shadow-lg text-[13.6px] overflow-hidden',
            !isFromPackageImport && 'my-8',
          )}
        >
          <div className="py-[18px] ps-5 font-normal">
            <p className="sp-pre-placeholder overflow-hidden">{children}</p>
          </div>
        </pre>
      }
    />
  );
}
