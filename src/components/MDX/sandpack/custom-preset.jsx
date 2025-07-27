'use client';

import { memo, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { SandpackCodeEditor, SandpackLayout, useActiveCode, useSandpack } from '@codesandbox/sandpack-react/unstyled';
import cn from 'classnames';

import { IconChevron } from '@/components/icon/icon-chevron';

import { NavigationBar } from './navigation-bar';
import { Preview } from './preview';
// import { useSandpackLint } from './use-sandpack-lint';

export const CustomPreset = memo(({ providedFiles }) => {
  // const { lintErrors, lintExtensions } = useSandpackLint();
  const { sandpack } = useSandpack();
  const { code } = useActiveCode();
  const { activeFile } = sandpack;
  const lineCountRef = useRef({});
  if (!lineCountRef.current[activeFile]) {
    lineCountRef.current[activeFile] = code.split('\n').length;
  }
  const lineCount = lineCountRef.current[activeFile];
  const isExpandable = lineCount > 16;
  return (
    <SandboxShell
      providedFiles={providedFiles}
      // lintErrors={lintErrors}
      // lintExtensions={lintExtensions}
      isExpandable={isExpandable}
    />
  );
});

const SandboxShell = memo(({ providedFiles, lintErrors, lintExtensions, isExpandable }) => {
  const containerRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div
      className="shadow-lg dark:shadow-lg-dark rounded-lg"
      ref={containerRef}
      style={{
        contain: 'content',
      }}
    >
      <NavigationBar providedFiles={providedFiles} />
      <SandpackLayout
        className={cn(
          !(isExpandable || isExpanded) && 'rounded-b-lg overflow-hidden',
          isExpanded && 'sp-layout-expanded',
        )}
      >
        <Editor lintExtensions={lintExtensions} />
        <Preview className="order-last xl:order-2" isExpanded={isExpanded} lintErrors={lintErrors} />
        {(isExpandable || isExpanded) && (
          <button
            translate="yes"
            className="sandpack-expand flex text-base justify-between dark:border-card-dark bg-wash dark:bg-card-dark items-center z-10 p-1 w-full order-2 xl:order-last border-b-1 relative top-0"
            onClick={() => {
              const nextIsExpanded = !isExpanded;
              flushSync(() => {
                setIsExpanded(nextIsExpanded);
              });
              if (!nextIsExpanded && containerRef.current !== null) {
                // @ts-ignore
                if (containerRef.current.scrollIntoViewIfNeeded) {
                  // @ts-ignore
                  containerRef.current.scrollIntoViewIfNeeded();
                } else {
                  containerRef.current.scrollIntoView({
                    block: 'nearest',
                    inline: 'nearest',
                  });
                }
              }
            }}
          >
            <span className="flex p-2 focus:outline-none text-primary dark:text-primary-dark leading-[20px]">
              <IconChevron className="inline me-1.5 text-xl" displayDirection={isExpanded ? 'up' : 'down'} />
              {isExpanded ? 'Show less' : 'Show more'}
            </span>
          </button>
        )}
      </SandpackLayout>
    </div>
  );
});

const Editor = memo(({ lintExtensions }) => {
  return (
    <SandpackCodeEditor
      showLineNumbers
      showInlineErrors
      showTabs={false}
      showRunButton={false}
      extensions={lintExtensions}
    />
  );
});
