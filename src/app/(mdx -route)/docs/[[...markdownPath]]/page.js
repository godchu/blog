import React from 'react';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';

import { siteConfig } from '@/configs/site-config';
import { MdxPage } from '@/features/mdx';
import { compiledMDX } from '@/features/mdx/lib';
import { listAllMdxSlugs, readMdxBySegments } from '@/lib/read-mdx-by-segments';

// ========================================================
// MarkdownPage Page //====================================
// ========================================================

export async function generateStaticParams() {
  return await listAllMdxSlugs();
}

export async function generateMetadata({ params }) {
  const { markdownPath } = await params;
  const segs = markdownPath || [];
  const section = (segs[0] || '').toLowerCase();

  const mdx = await readMdxBySegments(segs);
  if (!mdx) return {};

  const { data } = matter(mdx);
  const path = '/docs/' + segs.join('/');
  const url = new URL(path, siteConfig.site).toString();

  // prefer front-matter image if provided; otherwise section OG image
  const sectionOg =
    section && ['blog', 'nikki', 'fun', 'novel'].includes(section)
      ? `/og/${section}.png` // relative to metadataBase
      : `/og/default.png`; // optional fallback

  const og = data.image || sectionOg;
  const title = data.title ?? segs.at(-1) ?? 'Capybara Boy';
  const description = data.description || data.excerpt || '';

  return {
    metadataBase: new URL(siteConfig.site),
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: isArticle(segs, data) ? 'article' : 'website',
      url,
      title,
      description,
      images: [og],
    },
    twitter: { card: 'summary_large_image', title, description, images: [og] },
    robots: data.index === false ? { index: false, follow: false } : undefined,
  };
}

export default async function MarkdownPage({ params }) {
  const { markdownPath } = await params;

  const mdxRaw = await readMdxBySegments(markdownPath);
  if (!mdxRaw) {
    return notFound();
  }

  const { content, scope, frontmatter, error } = await compiledMDX(mdxRaw);
  if (error) {
    console.error('Error evaluating MDX:', error);
    return notFound();
  }

  // JSON-LD: Article (if blog post) or WebPage fallback
  const path = '/docs/' + (markdownPath?.join('/') ?? '');
  const url = `${siteConfig.site}${path}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: frontmatter?.title,
    description: frontmatter?.description || frontmatter?.excerpt,
    datePublished: frontmatter?.date,
    dateModified: frontmatter?.updated || frontmatter?.date,
    author: frontmatter?.author
      ? [{ '@type': 'Person', name: frontmatter.author }]
      : [{ '@type': 'Person', name: 'Capybara Boy' }],
    mainEntityOfPage: url,
  };

  const crumbs = (markdownPath || []).map((seg, i, arr) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: seg,
    item: `${siteConfig.site}/docs/${arr.slice(0, i + 1).join('/')}`,
  }));

  const jsonLdBreadcrumbs = crumbs.length
    ? { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs }
    : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {jsonLdBreadcrumbs && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbs) }} />
      )}

      <MdxPage content={content} toc={scope.toc} meta={frontmatter} markdownPath={markdownPath} />
    </>
  );
}

function isArticle(segs, fm) {
  const section = segs[0];
  return section === 'blog' || section === 'nikki' || section === 'fun' || section === 'novel' || Boolean(fm?.date);
}
