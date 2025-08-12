// Module: "CometStickerRelay.react"
// Dependencies:
//  - fbt: For localized text.
//  - CometAnimatedSticker.react: Component to render an animated sticker.
//  - CometRelay: For using Relay fragments.
//  - CometSpriteBase.react: Component to render a static (sprite-based) sticker.
//  - CometStickerRelay_sticker.graphql: GraphQL fragment for sticker data.
//  - react: For React and its hooks.
//  - react-compiler-runtime: For caching/memoization.
//  - recoverableViolation: For logging recoverable errors.
//  - unrecoverableViolation: For throwing fatal errors.
import React from 'react';

import { CometAnimatedSticker } from './CometAnimatedSticker';
import { CometSpriteBase } from './CometSpriteBase';

export function CometStickerRelay(props) {
  let { animationTriggers, sticker: stickerData, style, ...restProps } = props;

  // Extract sticker animation parameters from the sticker data.
  const frameCount = stickerData.frame_count;
  const frameRate = stickerData.frame_rate;
  const framesPerCol = stickerData.frames_per_column;
  const framesPerRow = stickerData.frames_per_row;
  const imageData = stickerData.image; // for static sticker image
  const label = stickerData.label;
  const pack = stickerData.pack; // pack data (could be used for grouping/styling)

  // Retrieve sprite image URI for animated sticker, if present.
  const spriteUri = stickerData.sprite_image ? stickerData.sprite_image.uri : undefined;
  // Retrieve static image URI.
  const staticUri = imageData ? imageData.uri : undefined;
  // Also extract width and height from the image data.
  const imageWidth = imageData ? imageData.width : undefined;
  const imageHeight = imageData ? imageData.height : undefined;
  // Extract pack name if available.
  const packName = pack ? pack.name : undefined;

  // Process the "style" prop:
  // If "style" is a function, call it with an object containing height and width;
  // otherwise, use the style object directly.
  let computedStyle;
  if (typeof style === 'function') {
    // Use caching to avoid re-calling the function if inputs haven't changed.
    computedStyle = style({ height: imageHeight, width: imageWidth });
  }

  // Validate the label; if label is missing, log a recoverable violation.
  if (label === undefined) {
    throw new Error('Invalid label received in CometSticker');
  }

  // Format an accessibility caption using the pack name and sticker label.
  let formattedCaption = packName ?? label ?? '';

  // If sprite animation data exists (spriteUri is provided), then the sticker is animated.
  if (spriteUri !== undefined) {
    // Verify that all required animation parameters are present.
    if (
      frameCount !== undefined &&
      frameRate !== undefined &&
      framesPerCol !== undefined &&
      framesPerRow !== undefined
    ) {
      // Render the animated sticker using CometAnimatedSticker.react.
      const animatedSticker = (
        <CometAnimatedSticker
          {...restProps}
          alt={formattedCaption}
          animationTriggers={animationTriggers}
          frameCount={frameCount}
          frameRate={frameRate}
          framesPerCol={framesPerCol}
          framesPerRow={framesPerRow}
          style={computedStyle}
          uri={spriteUri}
        />
      );

      return animatedSticker;
    } else {
      // If animation parameters are missing, log a recoverable violation.
      throw new Error('Invalid sticker animation data received');
    }
  }

  // If no spriteUri exists (i.e. no animation data), then we expect static sticker data.
  if (staticUri === undefined) {
    // If static image URI is missing, throw an unrecoverable error.
    throw new Error('Invalid sticker data received');
  }

  // Render a static sticker using CometSpriteBase.react.

  return (
    <CometSpriteBase {...restProps} accessibilityCaption={formattedCaption} src={staticUri} style={computedStyle} />
  );
}
