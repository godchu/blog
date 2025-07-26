import xoSpaceBrowser from 'eslint-config-xo/space/browser';
import xoReactSpace from 'eslint-config-xo-react/space';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

/** @type {import('@typescript-eslint/utils/ts-eslint').FlatConfig.ConfigArray} */
export default [
  ...xoSpaceBrowser,
  ...xoReactSpace,
  eslintPluginUnicorn.configs.recommended,
  {
    rules: {
      'unicorn/better-regex': 'warn',
      'react/prop-types': 'off',
      'capitalized-comments': 'off',
      'react/no-array-index-key': 'off',
      'unicorn/prevent-abbreviations': 'off',
      'react/jsx-indent': 'off',
    },
  },
  {
    files: ['**/*.md?(x)'],
    extends: ['plugin:mdx/recommended'],
    parser: 'eslint-mdx',
    parserOptions: {
      markdownExtensions: ['*.md, *.mdx'],
    },
    settings: {
      'mdx/code-blocks': false,
      'mdx/remark': true,
    },
    rules: {
      'react/no-unescaped-entities': 0,
    },
  },
];
