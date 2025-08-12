// Module: "useCometAnimationTrigger"
// Dependencies:
//  - react: for useCallback, useMemo, and useRef.
//  - useCometAnimationStateReducer: a custom hook managing animation state/actions.
//  - useMemoByObjectVariables: a hook that memoizes an object based on its properties.
import { useCallback, useMemo, useRef } from 'react';

import { useCometAnimationStateReducer } from './useCometAnimationStateReducer';
import { useMemoByObjectVariables } from './useMemoByObjectVariables';

/**
 * Helper function that returns true if the animation should run based on hover.
 * It checks whether the trigger configuration has "hover" enabled and whether the current event state is hovered.
 *
 * @param {Object} triggerConfig - The animation trigger configuration.
 * @param {Object} eventState - An object that should contain a "hovered" property.
 * @returns {boolean} True if both triggerConfig.hover and eventState.hovered are true.
 */
function shouldAnimateOnHover(triggerConfig, eventState) {
  // Return true only if both conditions are met.
  return eventState.hovered === true && triggerConfig.hover === true ? true : false;
}

/**
 * useCometAnimationTrigger
 *
 * @param {Object} config - The animation configuration object. It must include an
 *   "animationTriggers" property and other animation parameters that will be passed
 *   to the animation state reducer.
 *
 * @returns {Object} An object with the following properties:
 *   - duration: The total duration of the animation.
 *   - getShouldAnimate: A function to check if the animation should be running,
 *                        based on the current event state.
 *   - onHoverIn: A callback to trigger animation when the element is hovered.
 *   - onLoad: A callback to trigger animation when the element loads (only once).
 *   - onNextAnimationIteration: A callback that is called at each animation iteration.
 */
export function useCometAnimationTrigger(config) {
  // Extract the animationTriggers from the config; the remaining config is passed to the reducer.
  const { animationTriggers, ...restConfig } = config;

  // Create a ref to track if the "load" trigger has been fired already.
  const loadTriggeredRef = useRef(false);

  // Use a custom reducer hook to manage the animation state (e.g., duration, canAnimate, iteration callback).
  const animationState = useCometAnimationStateReducer(restConfig);

  // Memoize the animationTriggers object using useMemoByObjectVariables.
  // This hook returns an array; we take the first element which represents the current trigger config.
  const memoizedTriggers = useMemoByObjectVariables(animationTriggers);
  const triggers = memoizedTriggers[0];

  // Create a memoized "onHoverIn" callback:
  // If the trigger configuration specifies hover-based animation, return a function that starts the animation.
  const onHoverIn = useMemo(() => {
    return triggers.hover === true
      ? () => {
          animationState.startAnimation();
        }
      : undefined;
  }, [animationState, triggers]);

  // Create a memoized "onLoad" callback:
  // If the load trigger is enabled and hasn't been triggered yet, return a function that starts the animation.
  const onLoad = useMemo(() => {
    if (loadTriggeredRef.current === false && triggers.load === true) {
      return () => {
        loadTriggeredRef.current = true;
        animationState.startAnimation();
      };
    }
    return undefined;
  }, [animationState, triggers]);

  // Create a callback "getShouldAnimate" that takes an event state and returns true if:
  // - The animation state indicates that animation can run, or
  // - The hover trigger condition is met (using the helper above).
  const getShouldAnimate = useCallback(
    (eventState) => {
      return animationState.canAnimate || shouldAnimateOnHover(triggers, eventState);
    },
    [animationState, triggers],
  );

  // Return an object bundling the animation parameters and event handlers.
  return useMemo(() => {
    return {
      duration: animationState.duration,
      getShouldAnimate,
      onHoverIn,
      onLoad,
      onNextAnimationIteration: animationState.nextAnimationIteration,
    };
  }, [animationState, getShouldAnimate, onHoverIn, onLoad]);
}
