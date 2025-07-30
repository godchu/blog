import { rehypePlugins, remarkPlugins } from '../config/mdx-plugins';

export const mdxOptions = {
  mdxOptions: {
    remarkPlugins,
    rehypePlugins,
  },
  parseFrontmatter: true,
  scope: {},
  vfileDataIntoScope: 'toc',
};
