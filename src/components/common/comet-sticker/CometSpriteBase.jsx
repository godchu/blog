// Module: "CometSpriteBase.react"
// Dependencies:
//  - BaseImage.react: A basic image component.
//  - CometPressable.react: A component that makes its children pressable (clickable) and handles hover/focus overlays.
//  - react: For React and its hooks.
//  - react-compiler-runtime: For caching/memoization of computed values.
//  - useMergeRefs: Merges multiple refs into a single ref.
//  - xplatToDOMRef: Converts a platform-specific ref into a DOM ref.
import React from 'react';
import cn from 'classnames';

import { BaseImage } from './BaseImage';
import { XplatToDOMRef } from './XplatToDOMRef';

/**
 * CometSpriteBase.react
 *
 * Renders a sprite image wrapped in a pressable container.
 *
 * Props include:
 *  - accessibilityCaption: Accessible label.
 *  - animationStyle: A function that returns a style object given a parameter (for animations).
 *  - containerRef: A ref for the container element.
 *  - cursorEnabled: When false, disables the pointer cursor.
 *  - imgHeight: Height for the image (can be a CSS percentage).
 *  - imgRef: Ref for the image element.
 *  - imgWidth: Width for the image (can be a CSS percentage).
 *  - linkProps: Props to pass to the pressable link.
 *  - onHoverIn: Callback when the sprite is hovered.
 *  - onPress: Callback when the sprite is pressed.
 *  - overlayEnabled: Whether overlays (hover/focus) are enabled.
 *  - pressableRef: Ref for the pressable component.
 *  - showFocusOverlay: Flag to show focus overlay.
 *  - showHoverOverlay: Flag to show hover overlay.
 *  - src: The image source URI.
 *  - style: Additional style for the pressable container.
 *  - xstyle: Additional style (custom CSS classes) for the pressable container.
 */
export function CometSpriteBase(props) {
  // Destructure props.
  let { accessibilityCaption, animationStyle, imgHeight, imgRef, imgWidth, src, xstyle } = props;

  const params = {
    // hovered: true,
  };

  return (
    <div className={cn('relative overflow-hidden active:transform-none', xstyle)}>
      <BaseImage
        alt={accessibilityCaption}
        draggable={false}
        // height="100%"
        ref={imgRef && XplatToDOMRef.xplatToDOMRef(imgRef)}
        src={src}
        style={{
          // height: imgHeight,
          // width: imgWidth,
          ...(animationStyle ? animationStyle(params) : undefined),
        }}
        // width="100%"
        xstyle="sprite h-full w-full"
      />
    </div>
  );
}
