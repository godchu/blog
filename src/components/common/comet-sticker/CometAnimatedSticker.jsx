import React from 'react';

import { CometAnimatedSprite } from './CometAnimatedSprite';

export const CometAnimatedSticker = ({ alt, frameCount, frameRate, framesPerCol, framesPerRow, uri, ...rest }) => {
  return (
    <CometAnimatedSprite
      {...rest}
      accessibilityCaption={alt}
      frameCount={frameCount}
      frameRate={frameRate}
      framesPerCol={framesPerCol}
      framesPerRow={framesPerRow}
      spriteUri={uri}
    />
  );
};
