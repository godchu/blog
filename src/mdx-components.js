import {MDXComponents} from '@/components/MDX/mdx-components';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.

/**
 *
 * @param {import('mdx/types').MDXComponents} components
 */
export function useMDXComponents(components) {
  return {
    ...MDXComponents,
    ...components,
  };
}
