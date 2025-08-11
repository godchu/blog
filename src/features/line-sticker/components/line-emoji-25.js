'use client';

import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import cn from 'classnames';

import { parseAPNG } from '@/features/line-sticker/utils';

// Note: now accepts AbortSignal
async function getImgBuffer(url, signal) {
  const res = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome Safari',
    },
    cache: 'no-store',
    signal,
  });
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.arrayBuffer();
}

export const LineEmojiCanvas25 = forwardRef(
  (
    {
      className,
      style,
      canvasClassName,
      src = '',
      rate = 1.0,
      autoPlay = false,
      loop = true,
      runWhenHover = false,
      onClick,
      onError,
      size,
      width,
      height,
      showSkeleton = true,
      skeletonClassName,
      ...rest
    },
    ref,
  ) => {
    const wrapperRef = useRef(null);
    const canvasRef = useRef(null);
    const apngRef = useRef(null);
    const playerRef = useRef(null);

    const [ready, setReady] = useState(false);
    const [staticImg, setStaticImg] = useState(null);
    const [loading, setLoading] = useState(false);

    // Imperative controls
    const play = useCallback(() => {
      playerRef.current?.play?.();
    }, []);
    const pause = useCallback(() => {
      playerRef.current?.pause?.();
    }, []);
    const stop = useCallback(() => {
      playerRef.current?.stop?.();
    }, []);

    function restartPlayer(player) {
      try {
        player.stop?.();
        player.seekToFrame?.(0);
      } catch {}
      // double-rAF to settle canvas before replay (iOS quirk)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          try {
            player.play?.();
          } catch {}
        });
      });
    }

    // Play once by temporarily setting numPlays=1 and restarting from frame 0
    const playOnce = useCallback(() => {
      const apng = apngRef.current;
      const player = playerRef.current;
      if (!apng || !player) return;

      const prev = apng.numPlays; // 0 = infinite
      try {
        player.stop?.();
        player.seekToFrame?.(0);
        apng.numPlays = 1;
        player.play?.();

        const restore = () => {
          apng.numPlays = prev;
          player.off?.('end', restore);
        };
        player.on?.('end', restore);
      } catch {
        // swallow
      }
    }, []);

    useImperativeHandle(ref, () => ({
      play,
      pause,
      stop,
      playOnce,
      get player() {
        return playerRef.current;
      },
      get isReady() {
        return ready;
      },
    }));

    // (Re)load APNG when src/rate/loop/autoplay changes
    useEffect(() => {
      let cancelled = false;
      let detachEnd = null;

      let guardRAF = 0;
      let lastFrameIdx = -1;
      let lastT = 0;

      const controller = new AbortController();

      // eslint-disable-next-line complexity
      async function load() {
        setLoading(true);
        setReady(false);
        setStaticImg(null);

        // Cleanup prior player
        try {
          playerRef.current?.stop?.();
        } catch {}
        apngRef.current = null;
        playerRef.current = null;

        const canvas = canvasRef.current;
        if (!canvas || !src) {
          setLoading(false);
          return;
        }

        try {
          const buf = await getImgBuffer(src, controller.signal);
          const apng = parseAPNG(buf);
          if (apng instanceof Error) throw apng;

          // If not actually APNG, show static
          if (typeof apng.width !== 'number') {
            if (!cancelled) {
              setStaticImg(src);
              setLoading(false);
            }
            return;
          }

          await apng.createImages();
          if (cancelled) return;

          // Canvas sizing with DPR for crisp rendering
          const dpr = Math.max(1, window.devicePixelRatio || 1);

          // If you want to respect external sizing, we still size the backing store high-DPI
          const logicalW = apng.width;
          const logicalH = apng.height;

          // Keep CSS size at logical pixels (overridden by wrapper styles if provided)
          canvas.style.width = `${logicalW}`;
          canvas.style.height = `${logicalH}`;

          // Backing store scaled by DPR
          canvas.width = Math.round(logicalW * dpr);
          canvas.height = Math.round(logicalH * dpr);

          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('2D context not available');
          // Map logical coordinates to high-DPI backing store
          ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

          const player = await apng.getPlayer(ctx);

          apngRef.current = apng;
          playerRef.current = player;

          // Configure playback
          player.playbackRate = Math.max(rate, 0.001);
          apng.numPlays = loop ? 0 : 1; // 0=infinite

          // Robust manual looping for iOS Safari (and as a backstop)
          if (loop) {
            const restart = () => {
              // try {
              //   player.stop?.();
              //   player.seekToFrame?.(0);
              // } catch {}
              // // Double-rAF to fully settle canvas state before replay
              // requestAnimationFrame(() => {
              //   requestAnimationFrame(() => {
              //     if (!cancelled && playerRef.current === player) {
              //       try {
              //         player.play?.();
              //       } catch {}
              //     }
              //   });
              // });

              restartPlayer(player);
            };
            player.on?.('end', restart);
            detachEnd = () => player.off?.('end', restart);
          }

          // iOS loop guard: if we stall at last frame or paused unexpectedly, restart
          const guard = (t) => {
            if (cancelled || playerRef.current !== player) return;
            // Throttle checks ~2/sec
            if (t - lastT > 500) {
              lastT = t;
              const atEnd =
                typeof player.currentFrameNumber === 'number'
                  ? player.currentFrameNumber >= (apng.frames?.length ?? 1) - 1
                  : false;
              // If paused but should loop, or stuck at end, kick it
              if ((loop && player.paused) || atEnd) {
                restartPlayer(player);
              } else {
                // also detect “no progress” for 2+ seconds
                const cur = player.currentFrameNumber ?? -1;
                if (cur === lastFrameIdx) {
                  restartPlayer(player);
                }
                lastFrameIdx = cur;
              }
            }
            guardRAF = requestAnimationFrame(guard);
          };

          guardRAF = requestAnimationFrame(guard);

          setReady(true);

          if (autoPlay) {
            try {
              player.play?.();
            } catch {}
          }

          setLoading(false);
        } catch (err) {
          if (!cancelled) {
            onError?.(err);
            setStaticImg(src);
            setLoading(false);
          }
        }
      }

      load();

      return () => {
        cancelled = true;
        controller.abort();
        try {
          playerRef.current?.stop?.();
        } catch {}
        detachEnd?.();
        if (guardRAF) cancelAnimationFrame(guardRAF);
        apngRef.current = null;
        playerRef.current = null;
      };
    }, [src, rate, loop, autoPlay, onError]);

    // Keep playbackRate in sync if only `rate` changes
    useEffect(() => {
      if (playerRef.current) {
        playerRef.current.playbackRate = Math.max(rate, 0.001);
      }
    }, [rate]);

    // Resume playback after visibility/pageshow (iOS BFCache / tab restore)
    useEffect(() => {
      if (!loop) return;

      const resume = () => {
        const p = playerRef.current;
        if (!p) return;
        requestAnimationFrame(() => {
          if (playerRef.current !== p) return;
          if (p.paused) {
            restartPlayer(p);
          }
        });
      };

      const onVisibility = () => {
        if (document.visibilityState === 'visible') resume();
      };

      document.addEventListener('visibilitychange', onVisibility);
      window.addEventListener('pageshow', resume);
      return () => {
        document.removeEventListener('visibilitychange', onVisibility);
        window.removeEventListener('pageshow', resume);
      };
    }, [loop]);

    // Optional: Intersection-based autoplay/pause (saves work when offscreen)
    useEffect(() => {
      if (!autoPlay) return;
      const el = wrapperRef.current;
      if (!el) return;

      const io = new IntersectionObserver(
        ([entry]) => {
          const p = playerRef.current;
          if (!p) return;
          if (entry.isIntersecting) p.play?.();
          else p.pause?.();
        },
        { threshold: 0.1 },
      );

      io.observe(el);
      return () => io.disconnect();
    }, [autoPlay]);

    useEffect(() => {
      if (!autoPlay) return;
      const onFirstTouch = () => {
        const p = playerRef.current;
        if (p) {
          try {
            p.play?.();
          } catch {}
        }
        window.removeEventListener('touchstart', onFirstTouch, { capture: true });
      };
      window.addEventListener('touchstart', onFirstTouch, { capture: true });
      return () => window.removeEventListener('touchstart', onFirstTouch, { capture: true });
    }, [autoPlay]);

    // Wrapper sizing: only apply when not nullish
    //  React.CSSProperties
    const wrapperStyle = {
      ...(style || {}),
      ...(size !== null ? { width: size, height: size } : {}),
      ...(width !== null ? { width } : {}),
      ...(height !== null ? { height } : {}),
      position: 'relative',
      overflow: 'hidden',
    };

    // Hover/touch handlers for cross-platform “run when hover”
    const handleEnter = useCallback(() => {
      if (!runWhenHover || !ready) return;
      playerRef.current?.play?.();
    }, [runWhenHover, ready]);

    const handleLeave = useCallback(() => {
      if (!runWhenHover) return;
      // For touch you might prefer to keep it running; pause is better UX on desktop hover.
      if (matchMedia?.('(hover:hover)').matches) {
        playerRef.current?.pause?.();
      }
    }, [runWhenHover]);

    return (
      <div
        ref={wrapperRef}
        className={className}
        style={wrapperStyle}
        // Desktop/iPad (mouse/trackpad) hover
        onPointerEnter={handleEnter}
        onPointerLeave={handleLeave}
        // Touch start (iOS phones)
        onTouchStart={handleEnter}
        {...rest}
      >
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

        {staticImg ? (
          <img
            src={staticImg}
            onClick={onClick}
            alt="apng-fallback"
            draggable={false}
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
