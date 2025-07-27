/**
 * Rehype plugin to wrap all non-full-width elements in <MaxWidth>
 * between any full-width components like <Sandpack>, etc.
 */
export default function rehypeWrapWithMaxWidth() {
  const FULL_WIDTH_COMPONENTS = new Set([
    'Sandpack',
    'FullWidth',
    'Illustration',
    'IllustrationBlock',
    'Challenges',
    'Recipes',
  ]);

  return (tree) => {
    const newChildren = [];
    let wrapBuffer = [];

    const flushBuffer = () => {
      if (wrapBuffer.length > 0) {
        newChildren.push({
          type: 'mdxJsxFlowElement',
          name: 'MaxWidth',
          attributes: [],
          children: wrapBuffer,
        });
        wrapBuffer = [];
      }
    };

    for (const node of tree.children) {
      // const isFullWidth = node.type === 'mdxJsxFlowElement' && FULL_WIDTH_COMPONENTS.has(node.name);
      const isFullWidth =
        (node.type === 'mdxJsxFlowElement' && FULL_WIDTH_COMPONENTS.has(node.name)) ||
        (node.type === 'element' && FULL_WIDTH_COMPONENTS.has(node.tagName));

      if (isFullWidth) {
        flushBuffer();
        newChildren.push(node);
      } else {
        wrapBuffer.push(node);
      }
    }

    flushBuffer();
    tree.children = newChildren;
  };
}
