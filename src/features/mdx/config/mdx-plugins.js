import rehypeExternalLinks from 'rehype-external-links';
import rehypeUnwrapImages from 'rehype-unwrap-images';
import remarkGfm from 'remark-gfm';
import remarkImages from 'remark-images';

import rehypeMetaAsAttributes from '../plugins/rehype-meta-as-attributes';
import rehypeWrapWithMaxWidth from '../plugins/rehype-wrap-with-max-width';
import remarkCustomHeadingIds from '../plugins/remark-custom-heading-ids';
import remarkSmartypants from '../plugins/remark-smartypants';
import remarkTocFromHeadings from '../plugins/remark-toc-from-headings';

export const remarkPlugins = [
  remarkSmartypants,
  remarkImages,
  remarkCustomHeadingIds,
  [remarkTocFromHeadings, { maxDepth: 10 }],
  remarkGfm,
];

export const rehypePlugins = [rehypeUnwrapImages, rehypeExternalLinks, rehypeMetaAsAttributes, rehypeWrapWithMaxWidth];

// import rehypeExternalLinks from 'rehype-external-links';
// import rehypeUnwrapImages from 'rehype-unwrap-images';
// import remarkGfm from 'remark-gfm';
// import remarkImages from 'remark-images';

// import rehypeMetaAsAttributes from '../plugins/rehype-meta-as-attributes';
// import rehypeWrapWithMaxWidth from '../plugins/rehype-wrap-with-max-width';
// import remarkCustomHeadingIds from '../plugins/remark-custom-heading-ids';
// import remarkSmartypants from '../plugins/remark-smartypants';
// import remarkTocFromHeadings from '../plugins/remark-toc-from-headings';

// export const remarkPlugins = [
//   // remarkImages,
//   remarkCustomHeadingIds,
//   remarkSmartypants,
//   [(remarkTocFromHeadings, { maxDepth: 10 })],
//   // remarkGfm,
// ];

// export const rehypePlugins = [rehypeWrapWithMaxWidth, rehypeUnwrapImages, rehypeExternalLinks, rehypeMetaAsAttributes];
