import React from 'react';
import { evaluate } from 'next-mdx-remote-client/rsc';
import { promises as fs } from 'node:fs';
import remarkFlexibleToc from 'remark-flexible-toc';

import { MdxPage } from '@/components/layout/mdx-page';
import { MDXComponents } from '@/components/MDX/mdx-components';

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
      remarkPlugins: [remarkFlexibleToc],
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

  if (error) {
    console.error('Error evaluating MDX:', error);
    return <div>Error loading content</div>;
  }

  // TODO add suspense fallback
  return <MdxPage content={content} toc={scope.toc} meta={frontmatter} markdownPath={markdownPath} />;
}
