import React from 'react';
import { evaluate } from 'next-mdx-remote-client/rsc';
import { promises as fs } from 'node:fs';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import remarkFlexibleToc from 'remark-flexible-toc';
// import remarkGfm from 'remark-gfm';
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
    mdx = await fs.readFile(rootDirectory + path + '/index.md', 'utf8');
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

  const { content, frontmatter, scope, error } = await evaluate({
    source: mdx,
    options,
    components: MDXComponents,
  });

  console.log(scope.toc);

  if (error) {
    console.error('Error evaluating MDX:', error);
    return <div>Error loading content</div>;
  }

  // TODO add suspense fallback
  return <MdxPage content={content} toc={scope.toc} meta={frontmatter} markdownPath={markdownPath} />;
}
