/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import React, {Children} from 'react';

// TODO: This logic could be in MDX plugins instead.

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const PREPARE_MDX_CACHE_BREAKER = 3;
// !!! IMPORTANT !!! Bump this if you change any logic.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export function prepareMDX(rawChildren) {
  const toc = getTableOfContents(rawChildren, /* depth */ 10);
  const children = wrapChildrenInMaxWidthContainers(rawChildren);
  return {toc, children};
}

function wrapChildrenInMaxWidthContainers(children) {
  // Auto-wrap everything except a few types into
  // <MaxWidth> wrappers. Keep reusing the same
  // wrapper as long as we can until we meet
  // a full-width section which interrupts it.
  const fullWidthTypes = new Set([
    'Sandpack',
    'FullWidth',
    'Illustration',
    'IllustrationBlock',
    'Challenges',
    'Recipes',
  ]);
  let wrapQueue = [];
  const finalChildren = [];
  function flushWrapper(key) {
    if (wrapQueue.length > 0) {
      const Wrapper = 'MaxWidth';
      finalChildren.push(<Wrapper key={key}>{wrapQueue}</Wrapper>);
      wrapQueue = [];
    }
  }

  function handleChild(child, key) {
    if (child === undefined) {
      return;
    }

    if (typeof child !== 'object') {
      wrapQueue.push(child);
      return;
    }

    if (fullWidthTypes.has(child.type)) {
      flushWrapper(key);
      finalChildren.push(child);
    } else {
      wrapQueue.push(child);
    }
  }

  Children.forEach(children, handleChild);
  flushWrapper('last');
  return finalChildren;
}

function getTableOfContents(children, depth) {
  const anchors = [];
  extractHeaders(children, depth, anchors);
  if (anchors.length > 0) {
    anchors.unshift({
      url: '#',
      text: 'Overview',
      depth: 2,
    });
  }

  return anchors;
}

const headerTypes = new Set([
  'h1',
  'h2',
  'h3',
  'Challenges',
  'Recap',
  'TeamMember',
]);
function extractHeaders(children, depth, out) {
  for (const child of Children.toArray(children)) {
    if (child.type && headerTypes.has(child.type)) {
      let header;
      switch (child.type) {
        case 'Challenges': {
          header = {
            url: '#challenges',
            depth: 2,
            text: 'Challenges',
          };

          break;
        }

        case 'Recap': {
          header = {
            url: '#recap',
            depth: 2,
            text: 'Recap',
          };

          break;
        }

        case 'TeamMember': {
          header = {
            url: '#' + child.props.permalink,
            depth: 3,
            text: child.props.name,
          };

          break;
        }

        default: {
          header = {
            url: '#' + child.props.id,
            // eslint-disable-next-line radix
            depth: (child.type && Number.parseInt(child.type.replace('h', ''), 0)) ?? 0,
            text: child.props.children,
          };
        }
      }

      out.push(header);
    } else if (child.children && depth > 0) {
      extractHeaders(child.children, depth - 1, out);
    }
  }
}
