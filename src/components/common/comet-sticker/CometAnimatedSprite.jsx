// Module: "CometAnimatedSprite.react"
// Dependencies:
//  - CometSpriteBase.react: Base component that renders the sprite image.
//  - react: For React hooks.
//  - react-compiler-runtime: For caching/memoization of props.
//  - useCometAnimationTrigger: Custom hook for triggering animations (hover, load, iteration).
//  - useInvalidNumberThrowsViolation: Validates numeric props and throws a violation if invalid.
//  - useRefEffect: A hook that applies a side effect when a ref’s value changes.
//  - useSpriteAnimation: Computes the CSS animation name given frame count and layout.
//  - useVisibilityObserver: A hook that triggers a callback when the element becomes visible.
import React, { useEffect } from 'react';

import { CometSpriteBase } from './CometSpriteBase';
import { useCometAnimationTrigger } from './useCometAnimationTrigger';
import { useRefEffect } from './useRefEffect';
import { useSpriteAnimation } from './useSpriteAnimation';

export function CometAnimatedSprite(props) {
  let { animationTriggers, frameCount, frameRate, framesPerCol, framesPerRow, repeatNumber, spriteUri, ...restProps } =
    props;

  // Provide a default for repeatNumber (default is 3 iterations).
  const iterationLimit = repeatNumber === undefined ? 3 : repeatNumber;

  // Use another cache to compute the animation trigger config.
  // This object bundles the animation-related parameters.
  let animationConfig = {
    animationTriggers,
    frameCount,
    frameRate,
    iterationLimit,
  };

  // useCometAnimationTrigger uses the provided configuration to
  // compute:
  // - duration (total animation duration)
  // - getShouldAnimate: a function to decide whether animation should run
  // - onHoverIn, onLoad, onNextAnimationIteration: event handlers.
  const { duration, getShouldAnimate, onHoverIn, onLoad, onNextAnimationIteration } =
    useCometAnimationTrigger(animationConfig);

  // useSpriteAnimation computes a CSS animation name based on frame count, frames per col/row.
  // This name is used as the value for the animation-name CSS property.
  const spriteAnimationName = useSpriteAnimation(frameCount, framesPerCol, framesPerRow);

  // Validate that framesPerCol and framesPerRow are valid numbers.
  const validatedFramesPerCol = framesPerCol * 100; // useInvalidNumberThrowsViolation(framesPerCol * 100);
  const validatedFramesPerRow = framesPerRow * 100; // useInvalidNumberThrowsViolation(framesPerRow * 100);

  // Setup a visibility observer so that when the sprite becomes visible, onLoad is fired.
  // useVisibilityObserver expects an object with an "onVisible" callback.
  // const visibilityObserverRef = useVisibilityObserver({ onVisible: onLoad });

  // useEffect(() => {
  //   onLoad();
  // }, [onLoad]);

  // Setup a ref effect to attach an event listener for "animationiteration" events.
  // When an iteration completes, onNextAnimationIteration is called.
  const animationIterationEffectRef = useRefEffect(
    (element) => {
      element.addEventListener('animationiteration', onNextAnimationIteration);
      return () => {
        element.removeEventListener('animationiteration', onNextAnimationIteration);
      };
    },
    [onNextAnimationIteration],
  );

  // useRefEffect is used to run the iteration handler effect on a ref change.
  // useSpriteAnimation and useCometAnimationTrigger determine the animation style.
  // Compute CSS style: if getShouldAnimate returns true for the element, then set animation duration and name.
  let animationIterationHandler = function (element) {
    return getShouldAnimate(element)
      ? {
          animationDuration: duration + 'ms',
          animationName: spriteAnimationName,
        }
      : { animation: 'none' };
  };

  // Calculate image dimensions as percentages from validated numbers.
  const imgHeight = validatedFramesPerCol + '%';
  const imgWidth = validatedFramesPerRow + '%';

  return (
    <CometSpriteBase
      {...restProps}
      animationStyle={animationIterationHandler}
      // containerRef={visibilityObserverRef}
      imgHeight={imgHeight}
      imgRef={animationIterationEffectRef}
      imgWidth={imgWidth}
      onHoverIn={onHoverIn}
      src={spriteUri}
    />
  );
}
