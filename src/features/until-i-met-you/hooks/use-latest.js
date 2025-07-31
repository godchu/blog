import { useRef } from 'react';

import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect';

export const useLatest = (value) => {
  const ref = useRef(value);
  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  }, [value]);
  return ref;
};
