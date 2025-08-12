// Module: "useMemoByObjectVariables"
// Dependencies:
//  - areEqual: A function for deep comparison between two values.
//  - react: For hooks (useMemo, useRef, useState).

import { useMemo, useRef, useState } from 'react';

import { areEqual } from './areEqual';

const INITIAL_COUNTER = 0;

/**
 * useMemoByObjectVariables
 *
 * This hook accepts an object as input and returns a memoized version of that object along with an internal counter.
 * The counter is incremented every time the object changes (as determined by a deep equality check using areEqual).
 * The hook returns a tuple: [memoizedObject, counter].
 *
 * @param {Object} obj - The object to memoize.
 * @returns {[any, number]} A tuple containing the memoized object and a counter.
 */
export function useMemoByObjectVariables(obj) {
  // Create a ref to store the counter. Initialized to 0.
  const counterRef = useRef(INITIAL_COUNTER);

  // useState to hold the current memoized object.
  // This state will be updated whenever the incoming object differs from the stored one.
  const [memoizedObj, setMemoizedObj] = useState(obj);

  // Check if the incoming object is different from the memoized object.
  // Use the deep equality check provided by areEqual.
  const hasChanged = !areEqual(obj, memoizedObj);

  // If the object has changed, update the counter and the memoized state.
  if (hasChanged) {
    counterRef.current += 1;

    setMemoizedObj(obj);
  }

  // Memoize the object using the current counter as a dependency.
  // This ensures that when counterRef.current changes, the memoized value updates.
  const memoizedValue = useMemo(() => obj, [counterRef.current]);

  // Return a tuple with the memoized object and the current counter.

  return useMemo(() => [memoizedValue, counterRef.current], [memoizedValue]);
}
