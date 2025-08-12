// Module: "useSpriteAnimation"
// Dependencies:
//  - react: for useLayoutEffect hook.
//  - react-compiler-runtime: for caching computed values.
//  - stylex: for injecting CSS rules.
//  - unrecoverableViolation: for throwing errors if inputs are invalid.
//  - useInvalidNumberThrowsViolation: a hook that validates numeric inputs.
import { useLayoutEffect } from 'react';

// Internal counter for animation style injection.
let animationStyleCounter = 0;

/**
 * Generates a unique animation name based on the provided parameters.
 *
 * @param {number} frameCount - Total number of frames.
 * @param {number} framesPerCol - Number of frames per column.
 * @param {number} framesPerRow - Number of frames per row.
 * @returns {string} A unique animation name.
 */
function generateAnimationName(frameCount, framesPerCol, framesPerRow) {
  return '__DYNAMIC__CometAnimatedSprite_' + frameCount + '_' + framesPerCol + '_' + framesPerRow;
}

/**
 * Generates a single keyframe rule for a given step.
 *
 * @param {Object} params - Parameters for the keyframe.
 * @param {number} params.frameCount - Total number of frames.
 * @param {number} params.framesPerCol - Frames per column.
 * @param {number} params.framesPerRow - Frames per row.
 * @param {number} params.step - Current step (0-indexed).
 * @returns {string} A CSS keyframe rule line (percentage and transform).
 */
function generateKeyframeRule({ frameCount, framesPerCol, framesPerRow, step }) {
  // Calculate percentage progress for the current frame.
  const percentage = (step / frameCount) * 100;
  // Calculate horizontal offset as a percentage.
  const xOffset = ((step % framesPerRow) / framesPerRow) * 100;
  // Calculate vertical offset as a percentage.
  const yOffset = (Math.floor(step / framesPerRow) / framesPerCol) * 100;
  // Validate that the computed values are numbers and finite.
  const hasInvalidNumber =
    Number.isNaN(xOffset) ||
    Number.isNaN(yOffset) ||
    Number.isNaN(percentage) ||
    !Number.isFinite(xOffset) ||
    !Number.isFinite(yOffset) ||
    !Number.isFinite(percentage);
  if (hasInvalidNumber) {
    throw new Error('Invalid animation input provided.');
  }
  // Return a string for the keyframe, moving the sprite by translating by (xOffset, yOffset).
  return percentage + '% { transform: translate(-' + xOffset + '%, -' + yOffset + '%); }';
}

/**
 * Generates the complete CSS @keyframes rule.
 *
 * @param {string} animationName - The unique name for the animation.
 * @param {number} frameCount - Total number of frames.
 * @param {number} framesPerCol - Frames per column.
 * @param {number} framesPerRow - Frames per row.
 * @returns {string} A full CSS @keyframes rule.
 */
// eslint-disable-next-line max-params
function generateKeyframes(animationName, frameCount, framesPerCol, framesPerRow) {
  const rules = [];
  if (!Number.isFinite(frameCount) || Number.isNaN(frameCount)) {
    throw new Error('Invalid framecount');
  }
  for (let step = 0; step < frameCount; step++) {
    rules.push(
      generateKeyframeRule({
        frameCount,
        framesPerCol,
        framesPerRow,
        step,
      }),
    );
  }
  if (rules.length <= 0) {
    throw new Error('There were no animation frames to create an animation.');
  }
  return '\n  @keyframes ' + animationName + ' {\n    ' + rules.join('\n    ') + '\n  }\n';
}

// Track which animations we've already injected
const injectedAnimations = new Set();
const SHEET_ID = 'sprite-anim-style';

function ensureStyleEl() {
  if (typeof document === 'undefined') return null;
  let el = document.getElementById(SHEET_ID);
  if (!el) {
    el = document.createElement('style');
    el.id = SHEET_ID;
    el.type = 'text/css';
    document.head.appendChild(el);
  }
  return el;
}

function injectKeyframes(cssText, name) {
  if (typeof document === 'undefined') return;
  if (injectedAnimations.has(name)) return; // no-op if already injected

  const styleEl = ensureStyleEl();
  if (!styleEl) return;

  try {
    // Prefer CSSOM insertRule for efficiency
    const sheet = styleEl.sheet;
    if (sheet && 'insertRule' in sheet) {
      // Some browsers accept full @keyframes via insertRule; if not, fall back below
      sheet.insertRule(cssText, sheet.cssRules.length);
    } else {
      styleEl.appendChild(document.createTextNode(cssText));
    }
  } catch {
    // Fallback path: just append the text
    styleEl.appendChild(document.createTextNode(cssText));
  }

  injectedAnimations.add(name);
}

/**
 * useSpriteAnimation hook
 *
 * @param {number} frameCount - Total number of frames in the sprite.
 * @param {number} framesPerCol - Number of frames per column in the sprite.
 * @param {number} framesPerRow - Number of frames per row in the sprite.
 * @returns {string} A unique CSS animation name.
 *
 * This hook validates the numeric inputs (using useInvalidNumberThrowsViolation) and
 * generates a unique animation name via generateAnimationName. It then uses react-compiler-runtime
 * to cache the animation name based on frameCount, framesPerCol, and framesPerRow.
 * Finally, it injects the generated @keyframes rule into the stylesheet using stylex.inject.
 * The injection is done inside a useLayoutEffect so that it runs after DOM mutations.
 */
export function useSpriteAnimation(frameCount, framesPerCol, framesPerRow) {
  // Validate numeric inputs.
  // useInvalidNumberThrowsViolation(frameCount);
  // useInvalidNumberThrowsViolation(framesPerCol);
  // useInvalidNumberThrowsViolation(framesPerRow);

  let animationName = generateAnimationName(frameCount, framesPerCol, framesPerRow);

  // Run the injection function using useLayoutEffect so that it executes after layout.
  useLayoutEffect(() => {
    const keyframes = generateKeyframes(animationName, frameCount, framesPerCol, framesPerRow);

    console.log({ keyframes });

    // Use the stylex.inject function to insert the keyframes into the document,
    // using a global counter to ensure uniqueness.
    // stylexInject.default(keyframes, animationStyleCounter);
    injectKeyframes(keyframes, animationName);
    animationStyleCounter++;
  }, [animationName, frameCount, framesPerCol, framesPerRow]);

  // Return the unique animation name so that it can be applied as the CSS animation name.
  return animationName;
}

/*
{
    "keyframes": "\n  @keyframes __DYNAMIC__CometAnimatedSprite_13_4_4 {\n    0% { transform: translate(-0%, -0%); }\n    7.6923076923076925% { transform: translate(-25%, -0%); }\n    15.384615384615385% { transform: translate(-50%, -0%); }\n    23.076923076923077% { transform: translate(-75%, -0%); }\n    30.76923076923077% { transform: translate(-0%, -25%); }\n    38.46153846153847% { transform: translate(-25%, -25%); }\n    46.15384615384615% { transform: translate(-50%, -25%); }\n    53.84615384615385% { transform: translate(-75%, -25%); }\n    61.53846153846154% { transform: translate(-0%, -50%); }\n    69.23076923076923% { transform: translate(-25%, -50%); }\n    76.92307692307693% { transform: translate(-50%, -50%); }\n    84.61538461538461% { transform: translate(-75%, -50%); }\n    92.3076923076923% { transform: translate(-0%, -75%); }\n  }\n"
}


*/
