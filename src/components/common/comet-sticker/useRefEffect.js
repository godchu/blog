// Module: "useRefEffect"
// Dependencies: react (for useCallback and useRef)

import { useCallback, useRef } from 'react';

/**
 * useRefEffect
 *
 * This hook accepts an effect function and a dependency array.
 * It returns a stable callback function that:
 *  - When invoked with a new value, it calls the previous cleanup function (if one exists) and then
 *    calls the effect function with the new value. The effect function is expected to return a cleanup function.
 *
 * @param {Function} effectFn - A function that receives a value and returns a cleanup function.
 * @param {Array} deps - Dependency array to control when the effectFn should be updated.
 * @returns {Function} A stable callback that accepts a new value and triggers the effect.
 */
export function useRefEffect(effectFn, deps) {
  // Create a ref to store the current cleanup function.
  const cleanupRef = useRef(null);

  // Return a stable callback using useCallback.
  return useCallback((value) => {
    // If there's an existing cleanup function, call it and reset the ref.
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }
    // If the new value is not null, call effectFn with it and store the cleanup function returned.
    if (value) {
      cleanupRef.current = effectFn(value);
    }
    // eslint-disable-next-line react-compiler/react-compiler
  }, deps);
}
