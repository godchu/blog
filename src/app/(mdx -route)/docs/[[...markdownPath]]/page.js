import React from 'react';
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
import rehypeWrapWithMaxWidth from '@/utils/rehypeWrapWithMaxWidth';
import remarkCustomHeadingIds from '@/utils/remark-custom-heading-ids';
import remarkTocFromHeadings from '@/utils/remark-toc-from-headings';

export default async function BlogPost({ params }) {
  const { markdownPath } = await params;

  const rootDirectory = process.cwd() + '/content/';

  // Read MDX from the file.
  const path = (markdownPath || []).join('/') || 'index';

  let mdx;
  try {
    mdx = await fs.readFile(rootDirectory + path + '.md', 'utf8');
  } catch {
    try {
      mdx = await fs.readFile(rootDirectory + path + '/index.md', 'utf8');
    } catch {
      return notFound(); // ✅ fallback if both fail
    }
  }

  const { content, frontmatter, scope, error } = await evaluate({
    source: mdx,
    options,
    components: MDXComponents,
  });

  if (error) {
    console.error('Error evaluating MDX:', error);
    // return <div>Error loading content</div>;
    return notFound();
  }

  return <MdxPage content={content} toc={scope.toc} meta={frontmatter} markdownPath={markdownPath} />;
}

/**
 * @typedef {import('next-mdx-remote-client/rsc').EvaluateOptions }
 */
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
            if (
              // @ts-expect-error -- tagName is a valid property
              node.tagName === 'code' &&
              node.data &&
              node.data.meta
            ) {
              // @ts-expect-error -- properties is a valid property
              node.properties.meta = node.data.meta;
            }
          });
        };
      },
    ],
  },
  parseFrontmatter: true,
  scope: {
    // readingTime: calculateSomeHow(source),
  },
  vfileDataIntoScope: 'toc',
};
