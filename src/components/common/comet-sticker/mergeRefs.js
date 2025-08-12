/**
 * Changelog:
 * - 21/01/2025
 */

/**
 * Merges multiple refs (functions or objects) into a single ref callback.
 * @param  {...any} refs - Refs to merge (can be function refs or object refs).
 * @returns {function} - A callback ref that assigns the value to all provided refs.
 */
export function mergeRefs(...refs) {
  return (element) => {
    const cleanupCallbacks = [];

    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') {
        const cleanup = ref(element);

        if (typeof cleanup === 'function') {
          cleanupCallbacks.push(cleanup);
        } else {
          cleanupCallbacks.push(() => ref(null));
        }
        return;
      }

      if (typeof ref === 'object' && ref !== null) {
        ref.current = element;
        cleanupCallbacks.push(() => {
          ref.current = null;
        });
        return;
      }

      // Handle unsupported ref types
      throw new Error(
        `mergeRefs cannot handle refs of type boolean, number, or string. Received ref: ${String(
          ref,
        )} of type ${typeof ref}`,
      );
    });

    return () => {
      cleanupCallbacks.forEach((cleanup) => cleanup());
    };
  };
}
