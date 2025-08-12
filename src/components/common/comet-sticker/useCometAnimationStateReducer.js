// Module: "useCometAnimationStateReducer"
// Dependencies:
//  - cometAnimationStateReducer: Provides the reducer function and a method to get the initial state.
//  - react: For useReducer and useMemo hooks.
//  - react-compiler-runtime: For caching/memoizing computed values.
import { useReducer } from 'react';

import { cometAnimationStateReducer } from './cometAnimationStateReducer';

/**
 * useCometAnimationStateReducer
 *
 * This hook initializes and returns the animation state along with methods to trigger actions.
 * It expects a configuration object that contains:
 *   - frameCount: Total number of frames in the sprite animation.
 *   - frameRate: The rate at which frames should be advanced.
 *   - iterationLimit: The maximum number of animation iterations allowed.
 *
 * It computes:
 *   - canAnimate: Based on the internal state (if the animation should run and hasn't yet been animated).
 *   - duration: Computed as frameRate multiplied by frameCount.
 *   - nextAnimationIteration: A callback to signal that an animation iteration is complete.
 *   - startAnimation: A callback to trigger the start of the animation.
 *
 * @param {Object} config - Animation configuration with frameCount, frameRate, iterationLimit, etc.
 * @returns {Object} An object with the animation state and action methods.
 */
export function useCometAnimationStateReducer(config) {
  // Extract animation configuration values.
  const { frameCount, frameRate, iterationLimit } = config;

  // Initialize the reducer.
  // The reducer function and its initializer (getInitialState) are imported from cometAnimationStateReducer.
  // useReducer returns an array: [state, dispatch].
  const [state, dispatch] = useReducer(
    cometAnimationStateReducer.reducer,
    null,
    cometAnimationStateReducer.getInitialState,
  );

  // Determine if we should animate.
  // For example, the state might specify that we should animate only if "shouldAnimate" is true and
  // the animation has not already been run (hasAnimated is false).
  const canAnimate = state.shouldAnimate && !state.hasAnimated;

  // Calculate the total animation duration (e.g., in milliseconds) as frameRate * frameCount.
  const duration = frameRate * frameCount;

  // Cache the object that bundles the animation state and the action callbacks.
  // If the cached values differ from the current computed ones, update the cache.
  let animationState = {
    canAnimate,
    duration,
    // Function to be called when an animation iteration is complete.
    nextAnimationIteration: function () {
      dispatch({
        type: 'NEXT_ITERATION',
        iterationLimit,
      });
    },
    // Function to start the animation.
    startAnimation: function () {
      dispatch({ type: 'START_ANIMATION' });
    },
  };
  // Return the cached animation state object.
  return animationState;
}
