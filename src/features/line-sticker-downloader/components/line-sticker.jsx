'use client';

import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import cn from 'classnames';

import { parseAPNG } from '../utils';
import { fetchArrayBuffer } from '../utils/line-download';

/** Parse CSS px strings to numbers for the backing store size */
function toPx(value, fallback) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.endsWith('px')) {
    const n = parseFloat(value);
    if (!Number.isNaN(n)) return n;
  }
  return fallback;
}

/**
 * LineSticker — APNG on <canvas> (no observers).
 * Adds an overlay to mask canvas clears during load/resize.
 */
export const LineSticker = forwardRef(
  (
    {
      url,
      playbackRate = 1,
      loop = false,
      autoplay = true,
      runWhenHover = false,
      scale = 1,
      alt = '',
      className,
      style = {},
      withOverlay = true,
      overlayClassName = 'bg-black/5 dark:bg-white/10', // tweak as you like
    },
    ref,
  ) => {
    const [status, setStatus] = useState('idle'); // idle | loading | ready | error
    const [errorMsg, setErrorMsg] = useState('');
    const [masking, setMasking] = useState(true); // controls overlay visibility

    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);

    const apngRef = useRef(null);
    const playerRef = useRef(null);

    const prefersReducedMotion = useMemo(() => {
      if (typeof window === 'undefined') return false;
      try {
        return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
      } catch {
        return false;
      }
    }, []);

    const drawFirstFrame = useCallback(() => {
      const c = canvasRef.current;
      const apng = apngRef.current;
      if (!c || !apng) return;

      const ctx = ctxRef.current || c.getContext('2d', { willReadFrequently: true }) || c.getContext('2d');

      const f0 = apng.frames?.[0];
      if (ctx && f0?.imageElement) {
        ctx.clearRect(0, 0, c.width, c.height);
        ctx.drawImage(f0.imageElement, 0, 0);
      }
    }, []);

    // After resizing the canvas, either resume playback (if it was playing) or paint a preview
    const resumeOrPreview = useCallback(() => {
      const player = playerRef.current;
      if (player && typeof player.isPlaying === 'boolean' && player.isPlaying) {
        requestAnimationFrame(() => player.play?.());
      } else {
        drawFirstFrame();
      }
    }, [drawFirstFrame]);

    // DPR-aware canvas sizing + context setup
    const setupCanvasSize = useCallback(
      (apng) => {
        const canvas = canvasRef.current;
        if (!canvas || !apng) return;

        const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
        const naturalW = apng.width || 0;
        const naturalH = apng.height || 0;

        // CSS size: prefer style.width/height, else natural * scale
        const cssWidth = style?.width ?? naturalW * scale;
        const cssHeight = style?.height ?? naturalH * scale;
        canvas.style.width = typeof cssWidth === 'number' ? `${cssWidth}px` : cssWidth;
        canvas.style.height = typeof cssHeight === 'number' ? `${cssHeight}px` : cssHeight;

        // Backing store size in device pixels for crisp rendering
        const numericW = toPx(cssWidth, naturalW * scale);
        const numericH = toPx(cssHeight, naturalH * scale);
        canvas.width = Math.max(1, Math.round(numericW * dpr));
        canvas.height = Math.max(1, Math.round(numericH * dpr));

        const ctx = canvas.getContext('2d', { willReadFrequently: true }) || canvas.getContext('2d');

        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctxRef.current = ctx;
      },
      [scale, style?.width, style?.height],
    );

    // Load & mount APNG
    useEffect(() => {
      let cancelled = false;

      // eslint-disable-next-line complexity
      async function load() {
        setStatus('loading');
        setMasking(true); // mask while (re)loading
        setErrorMsg('');
        apngRef.current = null;

        if (playerRef.current) {
          try {
            playerRef.current.stop();
          } catch {}
          playerRef.current = null;
        }

        // Clear previous pixels
        const c = canvasRef.current;
        if (c) {
          const ctx = c.getContext('2d', { willReadFrequently: true }) || c.getContext('2d');
          ctx?.clearRect(0, 0, c.width, c.height);
        }

        try {
          const ab = await fetchArrayBuffer(url);
          if (cancelled) return;

          const apng = parseAPNG(ab);
          if (apng instanceof Error) throw apng;

          await apng.createImages();
          if (cancelled) return;

          apngRef.current = apng;

          setupCanvasSize(apng);

          const ctx =
            ctxRef.current ||
            canvasRef.current?.getContext('2d', { willReadFrequently: true }) ||
            canvasRef.current?.getContext('2d');

          if (!ctx) throw new Error('Canvas context is not available');

          apng.numPlays = loop ? 0 : (apng.numPlays ?? 1);

          const player = await apng.getPlayer(ctx);
          playerRef.current = player;

          player.playbackRate = playbackRate;

          const shouldAutoplay = autoplay && !prefersReducedMotion && !runWhenHover;

          if (shouldAutoplay) {
            player.play();
          } else if (apng.frames.length > 0) {
            drawFirstFrame();
          }

          setStatus('ready');
          // Fade overlay after we’ve drawn something
          requestAnimationFrame(() => setMasking(false));
        } catch (err) {
          if (cancelled) return;
          setStatus('error');
          setErrorMsg(err?.message || 'Failed to load sticker.');
          // keep masking=false so the <img> fallback is visible
          setMasking(false);
        }
      }

      load();

      return () => {
        cancelled = true;
        if (playerRef.current) {
          try {
            playerRef.current.stop();
          } catch {}
          playerRef.current = null;
        }
      };
    }, [url, loop, autoplay, runWhenHover, playbackRate, prefersReducedMotion, setupCanvasSize, drawFirstFrame]);

    // Keep playbackRate in sync
    useEffect(() => {
      if (playerRef.current) {
        playerRef.current.playbackRate = playbackRate;
      }
    }, [playbackRate]);

    // Pause on hidden tab; resume if we would have autoplayed
    useEffect(() => {
      const onVisibility = () => {
        const player = playerRef.current;
        if (!player) return;

        if (document.hidden) {
          if (player.pause) player.pause();
          else {
            player.stop?.();
            drawFirstFrame();
          }
        } else {
          if (autoplay && !runWhenHover && !prefersReducedMotion) {
            requestAnimationFrame(() => player.play?.());
          }
        }
      };
      document.addEventListener('visibilitychange', onVisibility);
      return () => document.removeEventListener('visibilitychange', onVisibility);
    }, [autoplay, runWhenHover, prefersReducedMotion, drawFirstFrame]);

    // Keep DPR mapping crisp on window resize/zoom — mask during the resize repaint
    useEffect(() => {
      if (!apngRef.current) return;
      let raf = 0;
      const onResize = () => {
        if (raf) cancelAnimationFrame(raf);
        // Show overlay immediately to hide the buffer clear
        if (withOverlay) setMasking(true);
        raf = requestAnimationFrame(() => {
          setupCanvasSize(apngRef.current);
          resumeOrPreview();
          // Let the frame paint, then fade overlay out
          requestAnimationFrame(() => {
            if (withOverlay) setMasking(false);
          });
        });
      };
      window.addEventListener('resize', onResize);
      return () => {
        window.removeEventListener('resize', onResize);
        if (raf) cancelAnimationFrame(raf);
      };
    }, [status, setupCanvasSize, resumeOrPreview, withOverlay]);

    // Hover controls
    const handleEnter = () => {
      if (status !== 'ready' || !runWhenHover) return;
      try {
        playerRef.current?.play?.();
      } catch {}
    };
    const handleLeave = () => {
      if (!runWhenHover || !apngRef.current) return;
      try {
        if (playerRef.current?.pause) playerRef.current.pause();
        else playerRef.current?.stop?.();
      } catch {}
      drawFirstFrame();
    };

    // Public controls
    useImperativeHandle(ref, () => ({
      play: () => playerRef.current?.play?.(),
      pause: () => playerRef.current?.pause?.() ?? playerRef.current?.stop?.(),
      stop: () => {
        playerRef.current?.stop?.();
        drawFirstFrame();
      },
      seek: (index = 0) => {
        const apng = apngRef.current;
        const c = canvasRef.current;
        if (!apng || !c) return;

        const ctx = ctxRef.current || c.getContext('2d', { willReadFrequently: true }) || c.getContext('2d');

        const frame = apng.frames?.[index] ?? apng.frames?.[0];
        if (frame?.imageElement && ctx) {
          try {
            playerRef.current?.stop?.();
          } catch {}
          ctx.clearRect(0, 0, c.width, c.height);
          ctx.drawImage(frame.imageElement, 0, 0);
        }
      },
    }));

    // Error fallback (handles static PNGs too)
    if (status === 'error') {
      return (
        <img
          src={url}
          alt={alt}
          className={cn('inline-block', className)}
          style={style}
          draggable={false}
          data-error={process.env.NODE_ENV !== 'production' ? errorMsg : undefined}
        />
      );
    }

    return (
      <div
        ref={containerRef}
        className={cn('relative inline-block', className)}
        style={style}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-busy={status !== 'ready'}
      >
        <canvas ref={canvasRef} className="block max-w-full max-h-full" role="img" aria-label={alt} />
        {withOverlay && (
          <div
            aria-hidden="true"
            className={cn(
              'absolute inset-0 transition-opacity duration-150 pointer-events-none',
              masking ? 'opacity-100' : 'opacity-0',
              overlayClassName,
            )}
          />
        )}
      </div>
    );
  },
);
