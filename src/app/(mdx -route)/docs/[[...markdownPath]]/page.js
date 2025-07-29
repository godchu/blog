import React from 'react';
import { FileStore, stableHash } from 'metro-cache';
import { notFound } from 'next/navigation';
import { evaluate } from 'next-mdx-remote-client/rsc';
import { promises as fs } from 'node:fs';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import remarkImages from 'remark-images';
import smartypants from 'remark-smartypants';
import { visit } from 'unist-util-visit';

import { MdxPage } from '@/components/layout/mdx-page';
import { MDXComponents } from '@/components/MDX/mdx-components';
import { DISK_CACHE_BREAKER, PREPARE_MDX_CACHE_BREAKER } from '@/constants/mdx';
import rehypeWrapWithMaxWidth from '@/utils/rehypeWrapWithMaxWidth';
import remarkCustomHeadingIds from '@/utils/remark-custom-heading-ids';
import remarkTocFromHeadings from '@/utils/remark-toc-from-headings';

// ========================================================
// MDX evaluation options
// ========================================================
const options = {
  mdxOptions: {
    remarkPlugins: [remarkCustomHeadingIds, smartypants, remarkImages, [remarkTocFromHeadings, { maxDepth: 10 }]],
    rehypePlugins: [
      rehypeWrapWithMaxWidth,
      rehypeUnwrapImages,
      rehypeExternalLinks,
      function rehypeMetaAsAttributes() {
        return (tree) => {
          visit(tree, 'element', (node) => {
            if (node.tagName === 'code' && node.data?.meta) {
              node.properties.meta = node.data.meta;
            }
          });
        };
      },
    ],
  },
  parseFrontmatter: true,
  scope: {},
  vfileDataIntoScope: 'toc',
};

// ========================================================
// BlogPost Page
// ========================================================
export default async function BlogPost({ params }) {
  const { markdownPath } = params;
  const rootDir = process.cwd() + '/content/';
  const path = (markdownPath || []).join('/') || 'index';

  // --------------------------------------------------------
  // Step 1: Read MDX file (supports index fallback)
  // --------------------------------------------------------
  let mdx;
  try {
    mdx = await fs.readFile(rootDir + path + '.mdx', 'utf8');
  } catch {
    try {
      mdx = await fs.readFile(rootDir + path + '/index.mdx', 'utf8');
    } catch {
      return notFound();
    }
  }

  // --------------------------------------------------------
  // Step 2: Prepare caching
  // --------------------------------------------------------
  const store = new FileStore({
    root: process.cwd() + '/node_modules/.cache/tienlx97-docs-mdx/',
  });

  const mdxComponentNames = Object.keys(MDXComponents);
  const lockfile = await fs.readFile(process.cwd() + '/pnpm-lock.yaml', 'utf8');

  const hash = Buffer.from(
    stableHash({
      mdx,
      mdxComponentNames,
      DISK_CACHE_BREAKER,
      PREPARE_MDX_CACHE_BREAKER,
      lockfile,
    }),
  );

  // --------------------------------------------------------
  // Step 3: Load from cache if available
  // --------------------------------------------------------
  const rawCached = await store.get(hash);
  const cached = JSON.parse(rawCached);

  let content;
  let frontmatter;
  let toc;

  if (cached) {
    console.log(`Reading compiled MDX for /${path} from cache`);
    ({ content, frontmatter, toc } = cached);
  } else {
    // --------------------------------------------------------
    // Step 4: Evaluate MDX if no cache
    // --------------------------------------------------------
    const { error, ...rest } = await evaluate({
      source: mdx,
      options,
      components: MDXComponents,
    });

    if (error) {
      console.error('Error evaluating MDX:', error);
      return notFound();
    }

    content = rest.content;
    frontmatter = rest.frontmatter;
    toc = rest.scope.toc;

    // Store result in cache
    await store.set(hash, JSON.stringify({ content, frontmatter, toc }));
  }

  // --------------------------------------------------------
  // Step 5: Render page
  // --------------------------------------------------------
  return <MdxPage content={content} toc={toc} meta={frontmatter} markdownPath={markdownPath} />;
}
