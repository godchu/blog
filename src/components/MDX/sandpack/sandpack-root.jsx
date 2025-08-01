'use client';

import React, { Children } from 'react';
import { SandpackLogLevel } from '@codesandbox/sandpack-client';
import { SandpackProvider } from '@codesandbox/sandpack-react/unstyled';

import { createFileMap } from './create-file-map';
import { CustomPreset } from './custom-preset';
import { template } from './template';
import { CustomTheme } from './themes';

const sandboxStyle = `
* {
  box-sizing: border-box;
}

body {
  font-family: sans-serif;
  margin: 20px;
  padding: 0;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

h2 {
  margin-top: 0;
  font-size: 20px;
}

h3 {
  margin-top: 0;
  font-size: 18px;
}

h4 {
  margin-top: 0;
  font-size: 16px;
}

h5 {
  margin-top: 0;
  font-size: 14px;
}

h6 {
  margin-top: 0;
  font-size: 12px;
}

code {
  font-size: 1.2em;
}

ul {
  padding-inline-start: 20px;
}
`.trim();

function SandpackRoot(props) {
  let { children, autorun = true } = props;
  const codeSnippets = Children.toArray(children);
  const files = createFileMap(codeSnippets);

  if ('/index.html' in files) {
    throw new Error(
      'You cannot use `index.html` file in sandboxes. ' +
        'Only `public/index.html` is respected by Sandpack and CodeSandbox (where forks are created).',
    );
  }

  files['/src/styles.css'] = {
    code: [sandboxStyle, files['/src/styles.css']?.code ?? ''].join('\n\n'),
    hidden: !files['/src/styles.css']?.visible,
  };

  return (
    <div className="sandpack sandpack--playground w-full my-8" dir="ltr">
      <SandpackProvider
        files={{ ...template, ...files }}
        theme={CustomTheme}
        customSetup={{
          environment: 'create-react-app',
        }}
        options={{
          autorun,
          initMode: 'user-visible',
          initModeObserverOptions: { rootMargin: '1400px 0px' },
          // bundlerURL: 'https://786946de.sandpack-bundler-4bw.pages.dev',
          bundlerURL: 'https://sandpack-bundler.codesandbox.io',
          logLevel: SandpackLogLevel.None,
        }}
      >
        <CustomPreset providedFiles={Object.keys(files)} />
      </SandpackProvider>
    </div>
  );
}

export default SandpackRoot;
