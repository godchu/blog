import { visit } from 'unist-util-visit';

export default function rehypeMetaAsAttributes() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'code' && node.data?.meta) {
        node.properties.meta = node.data.meta;
      }
    });
  };
}
