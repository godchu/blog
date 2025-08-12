/* eslint-disable no-implicit-coercion */
/* eslint-disable complexity */
/* eslint-disable no-eq-null */
/* eslint-disable max-params */
// Module: "areEqual"
// This module exports a function that performs a deep equality check between two values.

let poolA = []; // Pool for tracking visited objects from the first argument.
let poolB = []; // Pool for tracking corresponding visited objects from the second argument.

export function areEqual(a, b) {
  // Obtain helper arrays from the pool (or create new ones if none are available).
  const visitedA = poolA.length ? poolA.pop() : [];
  const visitedB = poolB.length ? poolB.pop() : [];

  // Call the internal recursive function that does the deep comparison.
  const result = deepEqual(a, b, visitedA, visitedB);

  // Clear the helper arrays.
  visitedA.length = 0;
  visitedB.length = 0;
  // Return the helper arrays to their respective pools.
  poolA.push(visitedA);
  poolB.push(visitedB);

  return result;
}

function deepEqual(a, b, stackA, stackB) {
  // Check for strict equality.
  if (a === b) {
    // Special handling for 0 and -0.
    return a !== 0 || 1 / a === 1 / b;
  }

  // If either value is null or undefined, they are not equal.
  if (a == null || b == null) return false;

  // If either is not an object, they are not equal.
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  // Use Object.prototype.toString to determine the specific type.
  const toString = Object.prototype.toString;
  const classA = toString.call(a);
  const classB = toString.call(b);
  if (classA !== classB) return false;

  // Handle special built-in types.
  switch (classA) {
    case '[object String]':
      return a === String(b);
    case '[object Number]':
      // Check for NaN.
      return isNaN(a) || isNaN(b) ? false : a === Number(b);
    case '[object Date]':
    case '[object Boolean]':
      return +a === +b;
    case '[object RegExp]':
      return (
        a.source === b.source && a.global === b.global && a.multiline === b.multiline && a.ignoreCase === b.ignoreCase
      );
  }

  // Check for cyclic structures.
  let length = stackA.length;
  while (length--) {
    if (stackA[length] === a) return stackB[length] === b;
  }
  // Push the current objects onto the stack.
  stackA.push(a);
  stackB.push(b);

  try {
    if (classA === '[object Array]') {
      // Arrays: compare lengths and corresponding elements.
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; i++) {
        if (!deepEqual(a[i], b[i], stackA, stackB)) return false;
      }
    } else if (a instanceof Set) {
      // Sets: compare sizes, then check that every element in one is present in the other.
      if (a.size !== b.size) return false;
      let valuesB = Array.from(b.values());
      for (const itemA of a) {
        let found = false;
        for (let i = 0; i < valuesB.length; i++) {
          if (deepEqual(itemA, valuesB[i], stackA, stackB)) {
            found = true;
            valuesB.splice(i, 1);
            break;
          }
        }
        if (!found) return false;
      }
      return true;
    } else if (a instanceof Map) {
      // Maps: compare sizes, then ensure every entry in one Map exists in the other.
      if (a.size !== b.size) return false;
      let entriesB = Array.from(b);
      for (const entryA of a) {
        let found = false;
        for (let i = 0; i < entriesB.length; i++) {
          if (deepEqual(entryA, entriesB[i], stackA, stackB)) {
            found = true;
            entriesB.splice(i, 1);
            break;
          }
        }
        if (!found) return false;
      }
      return true;
    } else {
      // For generic objects:
      // Check that they have the same constructor.
      if (a.constructor !== b.constructor) return false;
      // If both have a valueOf method, compare their primitive values.
      if (Object.prototype.hasOwnProperty.call(a, 'valueOf') && Object.prototype.hasOwnProperty.call(b, 'valueOf')) {
        if (a.valueOf() !== b.valueOf()) return false;
      }
      // Compare own enumerable properties.
      const keysA = Object.keys(a);
      const keysB = Object.keys(b);
      if (keysA.length !== keysB.length) return false;
      for (let key of keysA) {
        // Skip the "_owner" property (commonly used internally in React).
        if (key === '_owner') continue;
        if (!Object.prototype.hasOwnProperty.call(b, key) || !deepEqual(a[key], b[key], stackA, stackB)) {
          return false;
        }
      }
    }
    return true;
  } finally {
    // Remove the current objects from the stacks.
    stackA.pop();
    stackB.pop();
  }
}
