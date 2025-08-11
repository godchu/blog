'use client';

import React from 'react';

export const SpriteAnimator = React.forwardRef(
  (
    {
      data,
      autoPlay = true,
      loop = true,
      hoverPause = false,
      pauseWhenTabHidden = true,
      inViewOnly = false,
      playbackRate = 1,
      direction = 'forward',
      startFrame = 0,
      scale = 1,
      pixelated = false,
      className,
      style,
    },
    ref,
  ) => {
    const { frame_count, frame_rate, frames_per_column, frames_per_row, sprite_image, image, label } = data;

    // Resolve columns from provided metadata
    const cols = React.useMemo(() => {
      if (frames_per_column && frames_per_column > 0) return frames_per_column;
      const rows = Math.max(1, frames_per_row || 1);
      return Math.max(1, Math.ceil(frame_count / rows));
    }, [frames_per_column, frames_per_row, frame_count]);

    const frameW = image.width;
    const frameH = image.height;

    const [ready, setReady] = React.useState(false);
    const [playing, setPlaying] = React.useState(autoPlay);
    const [frame, setFrame] = React.useState(Math.min(Math.max(0, startFrame), Math.max(0, frame_count - 1)));
    const [inView, setInView] = React.useState(true);

    const hostRef = React.useRef(null);
    const rafRef = React.useRef(null);
    const lastTimeRef = React.useRef(null);
    const accRef = React.useRef(0);

    // Preload sheet
    React.useEffect(() => {
      const img = new Image();
      img.src = sprite_image.uri;
      img.onload = () => setReady(true);
      img.onerror = () => setReady(true);
    }, [sprite_image.uri]);

    // IntersectionObserver for inViewOnly
    React.useEffect(() => {
      if (!inViewOnly || !hostRef.current) return;
      const el = hostRef.current;
      const obs = new IntersectionObserver((entries) => setInView(entries[0]?.isIntersecting ?? true), {
        root: null,
        threshold: 0,
      });
      obs.observe(el);
      return () => obs.disconnect();
    }, [inViewOnly]);

    // Document visibility pause
    const hidden = typeof document !== 'undefined' && document.visibilityState === 'hidden';
    React.useEffect(() => {
      if (!pauseWhenTabHidden) return;
      const onVis = () => {
        // reset timers when tab flips
        lastTimeRef.current = null;
        accRef.current = 0;
      };
      document.addEventListener('visibilitychange', onVis);
      return () => document.removeEventListener('visibilitychange', onVis);
    }, [pauseWhenTabHidden]);

    // Animation loop using RAF + accumulator
    React.useEffect(() => {
      if (!ready) return;

      const frameDuration = Math.max(1, frame_rate) / Math.max(0.001, playbackRate);

      const tick = (t) => {
        const canRun = playing && (!pauseWhenTabHidden || !hidden) && (!inViewOnly || inView);

        if (!canRun) {
          lastTimeRef.current = t;
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        if (lastTimeRef.current === null) {
          lastTimeRef.current = t;
        }
        const dt = t - lastTimeRef.current;
        lastTimeRef.current = t;

        accRef.current += dt;

        while (accRef.current >= frameDuration) {
          accRef.current -= frameDuration;

          setFrame((prev) => {
            let next = direction === 'forward' ? prev + 1 : prev - 1;

            if (direction === 'forward' && next >= frame_count) {
              if (!loop) {
                // hold on last frame and stop
                setPlaying(false);
                return frame_count - 1;
              }
              next = 0;
            } else if (direction === 'reverse' && next < 0) {
              if (!loop) {
                setPlaying(false);
                return 0;
              }
              next = frame_count - 1;
            }
            return next;
          });
        }

        rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
      return () => {
        if (rafRef.current !== null) {
          cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = null;
        lastTimeRef.current = null;
        accRef.current = 0;
      };
    }, [
      ready,
      playing,
      loop,
      frame_rate,
      playbackRate,
      direction,
      inViewOnly,
      inView,
      pauseWhenTabHidden,
      hidden,
      frame_count,
    ]);

    // Expose imperative controls
    React.useImperativeHandle(
      ref,
      () => ({
        play: () => setPlaying(true),
        pause: () => setPlaying(false),
        toggle: () => setPlaying((p) => !p),
        goto: (idx) => setFrame(Math.min(Math.max(0, Math.floor(idx)), Math.max(0, frame_count - 1))),
        isPlaying: () => playing,
      }),
      [playing, frame_count],
    );

    // Compute current background offset
    const x = (frame % cols) * frameW;
    const y = Math.floor(frame / cols) * frameH;

    return (
      <div
        ref={hostRef}
        className={className}
        style={{
          display: 'inline-block',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          cursor: hoverPause ? 'pointer' : undefined,
          ...style,
        }}
        onMouseEnter={() => hoverPause && setPlaying(false)}
        onMouseLeave={() => hoverPause && setPlaying(true)}
        aria-label={label || 'sprite animation'}
        role="img"
      >
        <div
          style={{
            width: frameW,
            height: frameH,
            backgroundImage: `url(${sprite_image.uri})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: `-${x}px -${y}px`,
            willChange: 'background-position',
            imageRendering: pixelated ? 'pixelated' : undefined,
          }}
        />
      </div>
    );
  },
);
