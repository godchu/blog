/**
 * MDX 3 compatible smartypants plugin
 * Based on 'silvenon/remark-smartypants'
 * Original: https://github.com/silvenon/remark-smartypants/pull/80
 */

import { retext } from 'retext';
import smartypants from 'retext-smartypants';
import { visit } from 'unist-util-visit';

function check(parent) {
  if (!parent || !parent.tagName) return true;
  if (parent.tagName === 'script') return false;
  if (parent.tagName === 'style') return false;
  return true;
}

export default function remarkSmartypants(options = {}) {
  const processor = retext().use(smartypants, {
    ...options,
    ellipses: false,
    dashes: false,
    backticks: false,
  });

  const processor2 = retext().use(smartypants, {
    ...options,
    quotes: false,
  });

  return function transformer(tree) {
    let allText = '';
    let startIndex = 0;
    const textOrInlineCodeNodes = [];

    visit(tree, ['text', 'inlineCode'], (node, _, parent) => {
      if (check(parent)) {
        if (node.type === 'text') {
          allText += node.value;
        } else {
          // inlineCode placeholder to preserve length
          allText += 'A'.repeat(node.value.length);
        }
        textOrInlineCodeNodes.push(node);
      }
    });

    // Process all text as a single string
    allText = String(processor.processSync(allText));

    for (const node of textOrInlineCodeNodes) {
      const endIndex = startIndex + node.value.length;
      if (node.type === 'text') {
        const processedText = allText.slice(startIndex, endIndex);
        node.value = String(processor2.processSync(processedText));
      }
      startIndex = endIndex;
    }
  };
}
