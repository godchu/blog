'use client';

import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import cn from 'classnames';

export const SpriteAnimator = forwardRef(
  ({ data, className, style, autoPlay = true, loop = true, playbackRate = 1 }, ref) => {
    const {
      frame_count: N,
      frame_rate: fpsRaw,
      frames_per_row: cols,
      frames_per_column: rows,
      sprite_image,
      image,
    } = data;

    const frameW = Number(image.width);
    const frameH = Number(image.height);
    const sheetW = cols * frameW;
    const sheetH = rows * frameH;

    const containerRef = useRef(null);
    const [playing, setPlaying] = useState(!!autoPlay);
    const [rate, setRate] = useState(Math.max(0.001, playbackRate));

    // Duration in seconds (N frames at fps)
    const fps = Math.max(0.001, Number(fpsRaw) || 1);
    // const baseDurationSec = N / fps;
    const baseDurationSec = (N * Math.max(1, Number(fpsRaw))) / 1000; // if fpsRaw is ms/frame
    const effectiveDurationSec = baseDurationSec / rate;

    // Build keyframes once per sheet/geometry
    const { keyframesCss, animName } = useMemo(() => {
      const frames = [];
      for (let i = 0; i < N; i++) {
        const r = Math.floor(i / cols);
        const c = i % cols;
        const x = -(c * frameW);
        const y = -(r * frameH);
        const pct = (i / N) * 100;
        frames.push(`${pct}% { background-position: ${x}px ${y}px; }`);
      }
      // snap to last at 100%
      const last = N - 1;
      const lr = Math.floor(last / cols);
      const lc = last % cols;
      frames.push(`100% { background-position: ${-(lc * frameW)}px ${-(lr * frameH)}px; }`);

      const name = `spr-${Math.random().toString(36).slice(2)}`;
      return { keyframesCss: `@keyframes ${name}{${frames.join('\n')}}`, animName: name };
    }, [N, cols, frameW, frameH]);

    useEffect(() => {
      const node = document.createElement('style');
      node.textContent = keyframesCss;
      document.head.appendChild(node);
      return () => node.remove();
    }, [keyframesCss]);

    useImperativeHandle(ref, () => ({
      play: () => setPlaying(true),
      pause: () => setPlaying(false),
      stop: () => {
        setPlaying(false);
        const el = containerRef.current;
        if (el) {
          el.style.animation = 'none';
          el.style.backgroundPosition = `0px 0px`;
          // eslint-disable-next-line no-return-assign
          requestAnimationFrame(() => (el.style.animation = ''));
        }
      },
      setRate: (r) => setRate(Math.max(0.001, r)),
      isPlaying: () => playing,
    }));

    const iterationCount = loop === true ? 'infinite' : loop === false ? '1' : String(Math.max(1, loop));

    return (
      <div
        ref={containerRef}
        className={cn('inline-block select-none', className)}
        style={{
          width: frameW,
          height: frameH,
          backgroundImage: `url("${sprite_image.uri}")`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${sheetW}px ${sheetH}px`,
          backgroundPosition: `0px 0px`,
          imageRendering: 'pixelated', // remove if you want smoother scaling
          ...style,
          animationName: animName,
          animationDuration: `${effectiveDurationSec}s`,
          animationTimingFunction: 'steps(1, end)',
          animationIterationCount: iterationCount,
          animationPlayState: playing ? 'running' : 'paused',
          animationFillMode: 'forwards',
        }}
        aria-label="sprite-animation"
      />
    );
  },
);
