/* eslint-disable react/jsx-pascal-case */
'use client';

import { useContext, useMemo } from 'react';

import Link from './link';
import { LI, UL } from './list';
import { TocContext } from './toc-context';

export function InlineToc() {
  const toc = useContext(TocContext);
  const root = useMemo(() => calculateNestedToc(toc), [toc]);
  if (root.children.length < 2) {
    return null;
  }
  return <InlineTocItem items={root.children} />;
}

function calculateNestedToc(toc) {
  const currentAncestors = new Map();
  const root = {
    item: null,
    children: [],
  };
  const startIndex = 1; // Skip "Overview"
  for (let i = startIndex; i < toc.length; i++) {
    const item = toc[i];
    const currentParent = currentAncestors.get(item.depth - 1) || root;
    const node = {
      item,
      children: [],
    };
    currentParent.children.push(node);
    currentAncestors.set(item.depth, node);
  }
  return root;
}

function InlineTocItem({ items }) {
  return (
    <UL>
      {items.map((node) => (
        <LI key={node.item.url}>
          <Link href={node.item.url}>{node.item.text}</Link>
          {node.children.length > 0 && <InlineTocItem items={node.children} />}
        </LI>
      ))}
    </UL>
  );
}
