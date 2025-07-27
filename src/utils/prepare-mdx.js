/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import { Children } from 'react';

// TODO: This logic could be in MDX plugins instead.

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const PREPARE_MDX_CACHE_BREAKER = 3;
// !!! IMPORTANT !!! Bump this if you change any logic.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

export function prepareMDX(rawChildren) {
  const children = wrapChildrenInMaxWidthContainers(rawChildren);
  return { children };
}

function wrapChildrenInMaxWidthContainers(children) {
  // Auto-wrap everything except a few types into
  // <MaxWidth> wrappers. Keep reusing the same
  // wrapper as long as we can until we meet
  // a full-width section which interrupts it.
  let fullWidthTypes = ['Sandpack', 'FullWidth', 'Illustration', 'IllustrationBlock', 'Challenges', 'Recipes'];
  let wrapQueue = [];
  let finalChildren = [];
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
    if (fullWidthTypes.includes(child.type)) {
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
