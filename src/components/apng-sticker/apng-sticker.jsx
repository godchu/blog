'use client';

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import cn from 'classnames';

import { parseAPNG } from '@/features/line-sticker/utils';

async function getImgBuffer(url) {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari',
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.arrayBuffer();
}

export const ApngSticker = forwardRef(
  (
    {
      className,
      style,
      canvasClassName,
      src = '',
      rate = 1.0,
      autoPlay = false,
      loop = true,
      onClick,
      size,
      width,
      height,
      showSkeleton = true,
      skeletonClassName,
      ...rest
    },
    ref,
  ) => {
    const canvasRef = useRef(null);
    const apngRef = useRef(null);
    const playerRef = useRef(null);
    const isPlayRef = useRef(false);
    const timersRef = useRef([]);
    const [staticImg, setStaticImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const speedRef = useRef(1000 / (Math.max(rate, 0.001) * 24)); // 24 fps baseline

    useEffect(() => {
      speedRef.current = 1000 / (Math.max(rate, 0.001) * 24);
      if (playerRef.current) playerRef.current.playbackRate = rate;
    }, [rate]);

    const resetPlayState = useCallback(() => {
      if (timersRef.current.length) {
        timersRef.current.forEach(clearTimeout);
        timersRef.current = [];
      }
    }, []);

    const stop = useCallback(() => {
      if (!playerRef.current) return;
      playerRef.current.stop();
      resetPlayState();
      isPlayRef.current = false;
    }, [resetPlayState]);

    const pause = useCallback(() => {
      if (!playerRef.current) return;
      playerRef.current.pause();
      resetPlayState();
      isPlayRef.current = false;
    }, [resetPlayState]);

    const play = useCallback(() => {
      if (!playerRef.current) return;
      if (!playerRef.current.paused) return;
      playerRef.current.play();
      isPlayRef.current = true;
    }, []);

    const one = useCallback(() => {
      const player = playerRef.current;
      const apng = apngRef.current;
      const canvas = canvasRef.current;
      if (!player || !apng || !canvas) return;

      resetPlayState();
      player.stop();

      const length = apng.frames?.length || 0;
      isPlayRef.current = true;

      const hasPerf = typeof performance !== 'undefined' && performance?.now;
      let nextRenderTime = (hasPerf ? performance.now() : Date.now()) + speedRef.current;
      let i = 0;

      const tick = (now) => {
        if (!isPlayRef.current || i > length - 2) {
          isPlayRef.current = false;
          return;
        }
        const _now = hasPerf ? now : Date.now();
        if (_now >= nextRenderTime) {
          player.renderNextFrame();
          i += 1;
          nextRenderTime = (hasPerf ? performance.now() : Date.now()) + speedRef.current;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, [resetPlayState]);

    useImperativeHandle(ref, () => ({
      play,
      pause,
      stop,
      one,
      get player() {
        return playerRef.current;
      },
    }));

    useEffect(() => {
      let cancelled = false;

      async function load() {
        setLoading(true);
        setStaticImg(null);
        stop();
        apngRef.current = null;
        playerRef.current = null;
        isPlayRef.current = false;

        const canvas = canvasRef.current;
        if (!canvas || !src) {
          setLoading(false);
          return;
        }

        try {
          const data = await getImgBuffer(src);
          const apng = parseAPNG(data);
          if (apng instanceof Error) throw apng;

          if (typeof apng.width !== 'number') {
            if (!cancelled) {
              setStaticImg(src);
              setLoading(false);
            }
            return;
          }

          await apng.createImages();
          if (cancelled) return;

          // intrinsic bitmap size
          canvas.width = apng.width;
          canvas.height = apng.height;

          const ctx = canvas.getContext('2d');
          const player = await apng.getPlayer(ctx);

          apngRef.current = apng;
          playerRef.current = player;
          player.playbackRate = rate;

          if (loop) {
            apng.numPlays = 0;
          }

          player.on('end', () => {
            if (loop && isPlayRef.current) {
              // Ensure we actually rewind before replaying
              player.stop();
              // replay on next frame to avoid tight loops in some impls
              requestAnimationFrame(() => {
                if (isPlayRef.current) player.play();
              });
            } else {
              isPlayRef.current = false;
            }
          });

          // player.on('end', () => {
          //   if (!loop) {
          //     isPlayRef.current = false;
          //     return;
          //   }
          //   if (!isPlayRef.current) return;

          //   // hard reset to frame 0 for iOS
          //   try {
          //     player.stop();
          //     // if the player exposes seek/reset, call it (many apng players do)
          //     player.seekToFrame?.(0);
          //   } catch {}

          //   // double rAF is more reliable than single rAF on iOS
          //   requestAnimationFrame(() => {
          //     // eslint-disable-next-line max-nested-callbacks
          //     requestAnimationFrame(() => {
          //       if (isPlayRef.current) player.play();
          //     });
          //   });
          // });

          if (autoPlay) {
            player.play();
            isPlayRef.current = true;
          }
          setLoading(false);
        } catch {
          if (!cancelled) {
            setStaticImg(src);
            setLoading(false);
          }
        }
      }

      load();
      return () => {
        cancelled = true;
        stop();
        if (playerRef.current) playerRef.current._apng = null;
        apngRef.current = null;
        playerRef.current = null;
      };
    }, [src, autoPlay, rate, loop, stop]);

    // useEffect(() => {
    //   const resume = () => {
    //     if (document.visibilityState === 'visible' && loop && isPlayRef.current && playerRef.current?.paused) {
    //       // small timeout helps some iOS versions
    //       setTimeout(() => playerRef.current?.play(), 16);
    //     }
    //   };
    //   document.addEventListener('visibilitychange', resume);
    //   window.addEventListener('pageshow', resume); // iOS bfcache
    //   return () => {
    //     document.removeEventListener('visibilitychange', resume);
    //     window.removeEventListener('pageshow', resume);
    //   };
    // }, [loop]);

    // Wrapper sizing (CSS). size wins, else width/height.
    const wrapperStyle = {
      ...(style || {}),
      ...(size !== null ? { width: size, height: size } : {}),
      ...(width !== null ? { width } : {}),
      ...(height !== null ? { height } : {}),
      position: 'relative',
      overflow: 'hidden',
    };

    return (
      <div className={className} style={wrapperStyle} {...rest}>
        {/* Skeleton */}
        {showSkeleton && loading && (
          <div
            aria-hidden="true"
            className={cn(
              'absolute inset-0 animate-pulse rounded-md',
              'bg-[linear-gradient(90deg,rgba(0,0,0,0.08),rgba(0,0,0,0.16),rgba(0,0,0,0.08))] bg-[length:200%_100%]',
              skeletonClassName,
            )}
            style={{ backgroundPosition: '200% 0%' }}
          />
        )}

        {/* Content */}
        {staticImg ? (
          <img
            src={staticImg}
            onClick={onClick}
            alt="apng-fallback"
            className="w-full h-full"
            style={{ visibility: loading ? 'hidden' : 'visible' }}
          />
        ) : (
          <canvas
            ref={canvasRef}
            className={cn('w-full h-full', canvasClassName)}
            onClick={onClick}
            style={{ visibility: loading ? 'hidden' : 'visible' }}
          />
        )}
      </div>
    );
  },
);
