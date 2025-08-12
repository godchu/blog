'use client';

import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import cn from 'classnames';
import ExecutionEnvironment from 'fbjs/lib/ExecutionEnvironment';

import { CometSSRPreloadImageCollection } from './CometSSRPreloadImageCollection';
import { mergeRefs } from './mergeRefs';

// 080125
/**
 * @type React.ForwardRefRenderFunction<React.FunctionComponent, import("./types").BaseImageProps>
 */
const _BaseImage = (props, ref) => {
  const {
    alt = '',
    'aria-labelledby': al,
    elementtiming,
    objectFit = 'fill',
    onLoad,
    referrerPolicy = 'origin-when-cross-origin',
    sizes,
    src,
    srcSet,
    // eslint-disable-next-line no-unused-vars
    testid,
    xstyle,
    ...rest
  } = props;

  const imageRef = useRef(null);
  const combinedRef = useMemo(() => mergeRefs(imageRef, ref), [imageRef, ref]);

  // Add image to SSR preload collection if in a server environment
  if (!ExecutionEnvironment.canUseDOM && src) {
    CometSSRPreloadImageCollection.addImage(src);
  }

  useEffect(() => {
    if (onLoad && imageRef.current?.complete) {
      onLoad();
    }
  }, [onLoad]);

  // Handle case of missing or empty src
  if (src === '') {
    throw Error('Src is missing');
    // return (
    //   <RecoverableViolationWithComponentStack errorMessage="Invalid src provided to image" projectName="comet_ui" />
    // );
  }

  return (
    <img
      {...rest}
      alt={alt}
      aria-labelledby={al}
      className={cn(
        {
          'object-contain': objectFit === 'contain',
          'object-cover': objectFit === 'cover',
          'object-fill': objectFit === 'fill',
        },
        xstyle,
      )}
      // eslint-disable-next-line react/no-unknown-property
      elementtiming={elementtiming}
      onLoad={onLoad}
      ref={combinedRef}
      referrerPolicy={referrerPolicy}
      sizes={sizes}
      src={src}
      srcSet={srcSet}
    />
  );
};

export const BaseImage = forwardRef(_BaseImage);

BaseImage.displayName = 'BaseImage.react';
