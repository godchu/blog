import babelParser from '@babel/eslint-parser';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
// import typescriptEslint from '@typescript-eslint/eslint-plugin';
// import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import * as mdxPlugin from 'eslint-plugin-mdx';
import noFunctionDeclareAfterReturn from 'eslint-plugin-no-function-declare-after-return';
import noOnlyTests from 'eslint-plugin-no-only-tests';
import reactPlugin from 'eslint-plugin-react';
import reactCompiler from 'eslint-plugin-react-compiler';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import sortKeysFix from 'eslint-plugin-sort-keys-fix';
// import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  importPlugin.flatConfigs.recommended,
  {
    ignores: ['**/node_modules'],
  },
  ...compat.extends('alloy', 'alloy/react'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      'sort-keys-fix': sortKeysFix,
      // import: fixupPluginRules(_import),
      'no-function-declare-after-return': noFunctionDeclareAfterReturn,
      'no-only-tests': noOnlyTests,
      'react-compiler': reactCompiler,
    },

    languageOptions: {
      ...reactPlugin.configs.flat.recommended.languageOptions,
      globals: {
        JSX: true,
        __DEV__: true,
      },

      parser: babelParser,
      ecmaVersion: 11,
      sourceType: 'module',

      parserOptions: {
        ecmaFeatures: {
          experimentalObjectRestSpread: true,
        },

        requireConfigFile: false,
      },
    },

    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'], // Replace './src/utils' with the actual path
          ],
          extensions: ['.js', '.jsx'], // Ensure extensions are covered
        },

        node: {
          extensions: ['.js', '.jsx'], // Add all relevant extensions
        },
      },
      react: {
        version: 'detect',
      },
    },

    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      eqeqeq: [2, 'allow-null'],
      'import/first': 2,
      'import/newline-after-import': 2,
      'import/no-duplicates': 2,
      indent: 0,
      'jsx-quotes': [2, 'prefer-double'],
      'max-len': 0,
      'no-unused-expressions': 0,

      'no-unused-vars': [
        2,
        {
          args: 'none',
        },
      ],

      'no-var': 2,

      'no-restricted-globals': [
        2,
        'addEventListener',
        'blur',
        'close',
        'closed',
        'confirm',
        'defaultStatus',
        'defaultstatus',
        'event',
        'external',
        'find',
        'focus',
        'frameElement',
        'frames',
        'history',
        'innerHeight',
        'innerWidth',
        'length',
        'location',
        'locationbar',
        'menubar',
        'moveBy',
        'moveTo',
        'name',
        'onblur',
        'onerror',
        'onfocus',
        'onload',
        'onresize',
        'onunload',
        'open',
        'opener',
        'opera',
        'outerHeight',
        'outerWidth',
        'pageXOffset',
        'pageYOffset',
        'parent',
        'print',
        'removeEventListener',
        'resizeBy',
        'resizeTo',
        'screen',
        'screenLeft',
        'screenTop',
        'screenX',
        'screenY',
        'scroll',
        'scrollbars',
        'scrollBy',
        'scrollTo',
        'scrollX',
        'scrollY',
        'self',
        'status',
        'statusbar',
        'stop',
        'toolbar',
        'top',
      ],

      'no-param-reassign': 0,
      'no-void': 0,
      'react/no-children-prop': 0,
      'react-compiler/react-compiler': 'error',
      'react/jsx-no-constructed-context-values': 0,
    },
  },
  // ...compat
  //   .extends(
  //     'eslint:recommended',
  //     'plugin:@typescript-eslint/eslint-recommended',
  //     'plugin:@typescript-eslint/recommended',
  //     'plugin:import/typescript',
  //   )
  //   .map(config => ({
  //     ...config,
  //     files: ['**/*.ts', '**/*.tsx'],
  //     ...reactPlugin.configs.flat.recommended,
  //     languageOptions: {
  //       ...reactPlugin.configs.flat.recommended.languageOptions,
  //       globals: {
  //         ...globals.browser,
  //       },

  //       parser: tsParser,
  //       ecmaVersion: 5,
  //       sourceType: 'module',
  //     },

  //     rules: {
  //       '@typescript-eslint/ban-ts-comment': 0,
  //       '@typescript-eslint/no-this-alias': 0,

  //       '@typescript-eslint/no-unused-vars': [
  //         2,
  //         {
  //           args: 'none',
  //         },
  //       ],
  //     },

  //     settings: {
  //       'import/resolver': {
  //         // You will also need to install and configure the TypeScript resolver
  //         // See also https://github.com/import-js/eslint-import-resolver-typescript#configuration
  //         typescript: true,
  //         node: true,
  //       },
  //     },
  //   })),
  {
    files: ['**/*.js', '**/*.jsx'],
    // ...reactPlugin.configs.flat.recommended,
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^react', String.raw`^@?\w`],
            ['^(@|components)(/.*|$)'],
            [String.raw`^\u0000`],
            [String.raw`^\.\.(?!/?$)`, String.raw`^\.\./?$`],
            [String.raw`^\./(?=.*/)(?!/?$)`, String.raw`^\.(?!/?$)`, String.raw`^\./?$`],
            [String.raw`^.+\.?(css)$`],
          ],
        },
      ],
    },
  },
  {
    name: 'custom/mdx/recommended',
    files: ['**/*.mdx'],
    ...mdxPlugin.flat,
    processor: mdxPlugin.createRemarkProcessor({
      // I disabled linting code blocks
      // as I was having performance issues
      lintCodeBlocks: false,
      languageMapper: {},
    }),
  },
  {
    name: 'custom/mdx/code-blocks',
    files: ['**/*.mdx'],
    ...mdxPlugin.flatCodeBlocks,
    rules: {
      ...mdxPlugin.flatCodeBlocks.rules,
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
];
