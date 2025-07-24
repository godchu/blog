import shopifyEslintPlugin from "@shopify/eslint-plugin";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sortKeysFix from "eslint-plugin-sort-keys-fix";
import noFunctionDeclareAfterReturn from "eslint-plugin-no-function-declare-after-return";
import noOnlyTests from "eslint-plugin-no-only-tests";
import importPlugin from "eslint-plugin-import";

/** @type {import('@typescript-eslint/utils/ts-eslint').FlatConfig.ConfigArray} */
const eslintConfig = [
  ...shopifyEslintPlugin.configs.esnext,
  ...shopifyEslintPlugin.configs.react,
  ...shopifyEslintPlugin.configs.prettier,
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: {
      "simple-import-sort": simpleImportSort,
      "sort-keys-fix": sortKeysFix,
      import: importPlugin,
      "no-function-declare-after-return": noFunctionDeclareAfterReturn,
      "no-only-tests": noOnlyTests,
    },

    rules: {
      "import-x/no-unresolved": "off",

      // Disable prop-types check for React components
      "react/prop-types": "off",
      // Not needed with React 17+ and automatic JSX runtime
      "react/react-in-jsx-scope": "off",
      // You can add more rules here as needed
    },

    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        alias: {
          map: [["@", "./src"]],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
  },
  {
    files: ["**/*.md?(x)"],
    extends: ["plugin:mdx/recommended"],
    parser: "eslint-mdx",
    parserOptions: {
      markdownExtensions: ["*.md, *.mdx"],
    },
    settings: {
      "mdx/code-blocks": false,
      "mdx/remark": true,
    },
    rules: {
      "react/no-unescaped-entities": 0,
    },
  },
];

export default eslintConfig;
