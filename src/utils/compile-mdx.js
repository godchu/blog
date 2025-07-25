/* eslint-disable unicorn/no-await-expression-member */
/* eslint-disable no-undef */
import {promises as fs} from 'node:fs';
import {PREPARE_MDX_CACHE_BREAKER, prepareMDX} from './prepare-mdx';
import {FileStore, stableHash} from 'metro-cache';
import {MDXComponents} from '@/components/MDX/mdx-components';
import {remarkPlugins} from '../../plugins/markdownToHtml';

import {transformSync} from 'esbuild';

/* eslint-disable unicorn/consistent-function-scoping */

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~ IMPORTANT: BUMP THIS IF YOU CHANGE ANY CODE BELOW ~~~
const DISK_CACHE_BREAKER = 10;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export default async function compileMDX(
  mdx,
  path,
  parameters,
) {
  const mdxComponentNames = Object.keys(MDXComponents);

  const store = new FileStore({
    root: process.cwd() + '/node_modules/.cache/react-docs-mdx/',
  });
  const hash = Buffer.from(stableHash({
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    // ~~~~ IMPORTANT: Everything that the code below may rely on.
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    mdx,
    ...parameters,
    mdxComponentNames,
    DISK_CACHE_BREAKER,
    PREPARE_MDX_CACHE_BREAKER,
    lockfile: await fs.readFile(process.cwd() + '/yarn.lock', 'utf8'),
  }));
  const cached = await store.get(hash);
  if (cached) {
    console.log('Reading compiled MDX for /' + path + ' from ./node_modules/.cache/');
    return cached;
  }

  if (process.env.NODE_ENV === 'production') {
    console.log('Cache miss for MDX for /' + path + ' from ./node_modules/.cache/');
  }

  // If we don't add these fake imports, the MDX compiler
  // will insert a bunch of opaque components we can't introspect.
  // This will break the prepareMDX() call below.
  const mdxWithFakeImports
    = mdx
    	+ '\n\n'
    	+ mdxComponentNames
    	  .map(key => 'import ' + key + ' from "' + key + '";\n')
    	  .join('\n');

  // Turn the MDX we just read into some JS we can execute.
  const {compile: compileMdx} = await import('@mdx-js/mdx');
  const visit = (await import('unist-util-visit')).default;
  const jsxCode = await compileMdx(mdxWithFakeImports, {
    remarkPlugins: [
      ...remarkPlugins,
      (await import('remark-gfm')).default,
      (await import('remark-frontmatter')).default,
    ],
    rehypePlugins: [
      // Support stuff like ```js App.js {1-5} active by passing it through.
      // eslint-disable-next-line func-names
      function rehypeMetaAsAttributes() {
        return tree => {
          visit(tree, 'element', node => {
            if (
              // @ts-expect-error -- tagName is a valid property
              node.tagName === 'code'
              && node.data
              && node.data.meta
            ) {
              // @ts-expect-error -- properties is a valid property
              node.properties.meta = node.data.meta;
            }
          });
        };
      },
    ],
  });

  console.log(String(jsxCode.value));

  const {code: jsCode} = transformSync(String(jsxCode.value), {
    loader: 'jsx',
    format: 'cjs',
    target: 'es2019',
  });

  // Prepare environment for MDX.
  const fakeExports = {};
  const fakeRequire = name => {
    if (name === 'react/jsx-runtime') {
      return require('react/jsx-runtime');
    }

    // For each fake MDX import, give back the string component name.
    // It will get serialized later.
    return name;
  };

  // eslint-disable-next-line no-new-func
  const evalJSCode = new Function('require', 'exports', jsCode);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  // THIS IS A BUILD-TIME EVAL. NEVER DO THIS WITH UNTRUSTED MDX (LIKE FROM CMS)!!!
  // In this case it's okay because anyone who can edit our MDX can also edit this file.
  evalJSCode(fakeRequire, fakeExports);
  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  // @ts-expect-error -- default exports is existed after eval
  const reactTree = fakeExports.default({});

  // Pre-process MDX output and serialize it.
  let {toc, children} = prepareMDX(reactTree.props.children);
  if (path === 'index') {
    toc = [];
  }

  // Parse Frontmatter headers from MDX.
  const fm = require('gray-matter');
  const meta = fm(mdx).data;

  // Load the list of translated languages conditionally.
  let languages;
  if (typeof path === 'string' && path.endsWith('/translations')) {
    languages = await (
      await fetch('https://raw.githubusercontent.com/reactjs/translations.react.dev/main/langs/langs.json')

    ).json(); // { code: string; name: string; enName: string}[]
  }

  const output = {
    content: JSON.stringify(children, stringifyNodeOnServer),
    toc: JSON.stringify(toc, stringifyNodeOnServer),
    meta,
    languages,
  };

  // Serialize a server React tree node to JSON.
  function stringifyNodeOnServer(key, value) {
    if (
      value !== undefined
      && value.$$typeof === Symbol.for('react.transitional.element')
    ) {
      // Remove fake MDX props.
      const {mdxType, originalType, parentName, ...cleanProperties} = value.props;
      return [
        '$r',
        typeof value.type === 'string' ? value.type : mdxType,
        value.key,
        cleanProperties,
      ];
    }

    return value;
  }

  // Cache it on the disk.
  await store.set(hash, output);
  return output;
}
