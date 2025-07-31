import { useCallback, useRef } from 'react';

import { isDev, isFunction } from '../utils/is.js';

import { useIsomorphicLayoutEffect } from './use-isomorphic-layout-effect.js';

/**
 * keep function reference immutable
 */
export const useEvent = (fn) => {
  if (isDev && !isFunction(fn)) {
    console.error(`useEvent expected parameter is a function, got ${typeof fn}`);
  }

  const handlerRef = useRef(fn);
  useIsomorphicLayoutEffect(() => {
    handlerRef.current = fn;
  }, [fn]);

  return useCallback((...args) => {
    const fn = handlerRef.current;
    return fn(...args);
  }, []);
};
