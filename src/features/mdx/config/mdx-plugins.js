import rehypeExternalLinks from 'rehype-external-links';
import rehypeUnwrapImages from 'rehype-unwrap-images';

import rehypeMetaAsAttributes from '../plugins/rehype-meta-as-attributes';
import rehypeWrapWithMaxWidth from '../plugins/rehype-wrap-with-max-width';
import remarkCustomHeadingIds from '../plugins/remark-custom-heading-ids';
import remarkTocFromHeadings from '../plugins/remark-toc-from-headings';

export const remarkPlugins = [remarkCustomHeadingIds, [remarkTocFromHeadings, { maxDepth: 10 }]];

export const rehypePlugins = [rehypeWrapWithMaxWidth, rehypeUnwrapImages, rehypeExternalLinks, rehypeMetaAsAttributes];
