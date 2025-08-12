function getInitialState() {
  return Object.freeze({
    hasAnimated: false, // Indicates if the animation has already been executed at least once.
    iterationIndex: 1, // The current iteration count of the animation.
    shouldAnimate: false, // Flag that determines whether the animation should run.
  });
}

// The reducer function: takes the current state and an action, and returns a new state.
function reducer(state, action) {
  // Switch on the action type.
  switch (action.type) {
    case 'FORCE_STOP_ANIMATION':
      // When a FORCE_STOP_ANIMATION action is received,
      // reset the state to the initial state and ensure shouldAnimate is false.
      return forceStopAnimation(state, action); //
    case 'RESTART_ANIMATION':
      // Restart the animation: first, force-stop, then set shouldAnimate to true.
      return restartAnimation(state, action); //
    case 'START_ANIMATION':
      // Start the animation if it has not already run.
      return startAnimation(state, action);
    case 'NEXT_ITERATION':
      // Advance the animation iteration count, and mark animation as complete if the iteration limit is reached.
      return nextIteration(state, action);
    default:
      // For unknown action types, simply return the current state.
      // (The code calls b.type here just for side effects, if any.)
      action.type;
      break;
  }
  return state;
}

// Handler for "START_ANIMATION" action.
// If the animation has already run (hasAnimated is true), delegate to RESTART_ANIMATION;
// otherwise, mark that the animation should run.
function startAnimation(state, action) {
  if (state.hasAnimated) {
    // If the animation has already been played, use the restart logic.
    return reducer(state, { type: 'RESTART_ANIMATION' });
  }
  // Otherwise, enable animation.
  return {
    ...state,
    shouldAnimate: true,
  };
}

// Handler for "RESTART_ANIMATION" action.
// First, force-stop the animation, then re-enable it.
function restartAnimation(state, action) {
  const stoppedState = reducer(state, { type: 'FORCE_STOP_ANIMATION' });
  return {
    ...stoppedState,
    shouldAnimate: true,
  };
}

// Handler for "NEXT_ITERATION" action.
// Expects action.iterationLimit to specify the maximum number of iterations.
// Increments the iteration index; if the limit is reached, sets hasAnimated to true and resets the iteration index.
function nextIteration(state, action) {
  const limit = action.iterationLimit;
  const currentIteration = state.iterationIndex;
  const reachedLimit = currentIteration >= limit;
  return {
    ...state,
    hasAnimated: reachedLimit,
    iterationIndex: reachedLimit ? 1 : currentIteration + 1,
  };
}

// Handler for "FORCE_STOP_ANIMATION" action.
// Resets the state to its initial values and ensures that shouldAnimate is false.
function forceStopAnimation(state, action) {
  return {
    ...state,
    ...getInitialState(),
    shouldAnimate: false,
  };
}

export const cometAnimationStateReducer = { getInitialState, reducer };
