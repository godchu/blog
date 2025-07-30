import React from 'react';
import { notFound } from 'next/navigation';
import { promises as fs } from 'node:fs';

import { MdxPage } from '@/features/mdx';
import { compiledMDX } from '@/features/mdx/lib';

// ========================================================
// BlogPost Page
// ========================================================
export default async function BlogPost({ params }) {
  const { markdownPath } = await params;
  const rootDir = process.cwd() + '/content/';
  const path = (markdownPath || []).join('/') || 'index';

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

  const { content, scope, frontmatter, error } = await compiledMDX(mdx);

  if (error) {
    console.error('Error evaluating MDX:', error);
    return notFound();
  }

  return <MdxPage content={content} toc={scope.toc} meta={frontmatter} markdownPath={markdownPath} />;
}
