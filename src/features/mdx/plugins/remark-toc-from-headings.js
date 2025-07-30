import { slug as toSlug } from 'github-slugger';
import { toString } from 'mdast-util-to-string';
import { visit } from 'unist-util-visit';

/**
 * Custom Remark plugin that extracts table of contents
 * Supports: h1–h3 + special components like Challenges, Recap, TeamMember
 */
export default function remarkTocFromHeadings({ maxDepth = 10 } = {}) {
  return function (tree, vfile) {
    const toc = [];
    const ids = new Set();

    visit(tree, (node) => {
      if (toc.length > maxDepth) return;

      if (node.type === 'heading' && ['h1', 'h2', 'h3'].includes(node.depth && `h${node.depth}`)) {
        const text = toString(node).trim();
        const id = toSlug(text);
        if (!ids.has(id)) {
          toc.push({ url: `#${id}`, text, depth: node.depth });
          ids.add(id);
        }
        return;
      }

      if (node.type === 'mdxJsxFlowElement') {
        const name = node.name;

        if (name === 'Challenges') {
          toc.push({ url: '#challenges', text: 'Challenges', depth: 2 });
        }

        if (name === 'Recap') {
          toc.push({ url: '#recap', text: 'Recap', depth: 2 });
        }

        if (name === 'TeamMember') {
          const permalink = node.attributes.find((attr) => attr.name === 'permalink')?.value;
          const nameProp = node.attributes.find((attr) => attr.name === 'name')?.value;
          if (permalink && nameProp) {
            toc.push({
              url: `#${permalink}`,
              text: nameProp,
              depth: 3,
            });
          }
        }
      }
    });

    if (toc.length > 0) {
      toc.unshift({ url: '#', text: 'Overview', depth: 2 });
    }

    vfile.data.toc = toc;
  };
}
