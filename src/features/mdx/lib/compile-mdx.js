// src/features/mdx/lib/compileMDX.js
import { cache } from 'react';
import { evaluate } from 'next-mdx-remote-client/rsc';

import { MDXComponents } from '@/components/MDX/mdx-components';

import { mdxOptions } from './mdx-options';

export const compiledMDX = cache(async (mdx) => {
  return evaluate({ source: mdx, options: mdxOptions, components: MDXComponents });
});
