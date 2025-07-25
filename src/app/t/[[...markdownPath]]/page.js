import React, {Suspense} from 'react';
import {evaluate} from 'next-mdx-remote-client/rsc';
import {promises as fs} from 'node:fs';
import {MDXComponents} from '@/components/MDX/mdx-components';
import remarkFlexibleToc from 'remark-flexible-toc';

export default async function BlogPost({params}) {
  const {markdownPath} = await params;

  // eslint-disable-next-line no-undef
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
      remarkPlugins: [
        // ...
        remarkFlexibleToc,
      ],
    },
    parseFrontmatter: true,
    scope: {
      // readingTime: calculateSomeHow(source),
    },
    vfileDataIntoScope: 'toc',
  };

  const {content, frontmatter, scope, error} = await evaluate({
    source: mdx,
    options,
    components: MDXComponents,
  });

  console.log({scope});

  return (
    <>
      <h1>{frontmatter.title}</h1>
      {/* <TableOfContentComponent toc={scope.toc}/> */}
      <Suspense fallback={<div>Loading content...</div>}>
        {content}
      </Suspense>
    </>
  );
}
