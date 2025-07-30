import { slug as toSlug } from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

export default function remarkCustomHeadingIds({ icon = '', className = 'anchor' } = {}) {
  return function transformer(tree) {
    const ids = new Set();

    visit(tree, 'heading', (node) => {
      const children = [...node.children];
      let id;

      const lastChild = children[children.length - 1];

      if (lastChild && lastChild.type === 'mdxTextExpression') {
        // Case: ## Heading {/*custom-id*/}
        id = lastChild.value?.trim();
        const isValid = id?.startsWith('/*') && id?.endsWith('*/');
        if (!isValid) {
          throw new Error(`Invalid custom ID syntax in header: ${id}. Expected format: {/*my-id*/}`);
        }

        id = id.slice(2, -2).trim(); // Remove /* and */
        if (id !== toSlug(id)) {
          throw new Error(`Custom ID "${id}" is not a valid slug. Replace with: {/*${toSlug(id)}*/}`);
        }

        node.children.pop(); // Remove expression from the heading
      } else {
        // Case: ## Heading (generate slug)
        id = toSlug(toString(node));
      }

      if (ids.has(id)) {
        throw new Error(`Duplicate heading ID "${id}" found. Add an explicit custom ID like {/*my-unique-id*/}`);
      }
      ids.add(id);

      node.data ||= {};
      node.data.hProperties ||= {};
      node.data.htmlAttributes ||= {};

      node.data.id = id;
      node.data.hProperties.id = id;
      node.data.htmlAttributes.id = id;
    });
  };
}
