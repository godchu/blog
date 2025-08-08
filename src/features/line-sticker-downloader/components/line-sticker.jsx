'use client';

import { useEffect, useRef, useState } from 'react';

import { parseAPNG } from '../utils';
import { fetchArrayBuffer } from '../utils/line-download';

export const LineSticker = ({
  url,
  playbackRate = 1,
  loop = false,
  autoplay = true,
  runWhenHover = false,
  scale = 1,
}) => {
  const [ready, setReady] = useState(false);

  const canvasRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ab = await fetchArrayBuffer(url);

      // const ab = bufferToArrayBuffer(buf);
      const apng = parseAPNG(ab);
      if (apng instanceof Error) return;

      await apng.createImages();
      if (cancelled) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      // canvas.width = apng.width;
      // canvas.height = apng.height;

      canvas.width = apng.width * scale;
      canvas.height = apng.height * scale;
      canvas.style.width = `${apng.width * scale}px`;
      canvas.style.height = `${apng.height * scale}px`;

      const ctx = canvas.getContext('2d');
      ctx.scale(scale, scale);

      const player = await apng.getPlayer(ctx);
      playerRef.current = player;
      player.playbackRate = playbackRate;

      if (loop) {
        apng.numPlays = 0;
      }

      if (autoplay) {
        player.play(); // ✅ auto-play
      } else if (apng.frames.length > 0) {
        // draw first frame only (hover-to-play style)
        ctx.drawImage(apng.frames[0].imageElement, 0, 0);
      }

      // // Draw first frame only
      // if (apng.frames.length > 0) {
      //   ctx.drawImage(apng.frames[0].imageElement, 0, 0);
      // }
      setReady(true);
    })();

    return () => {
      cancelled = true;
      if (playerRef.current) {
        try {
          playerRef.current.stop();
        } catch {}
        playerRef.current = null;
      }
    };
  }, [url, scale]);

  const handleEnter = () => {
    if (!ready || !runWhenHover) return;

    if (playerRef.current) playerRef.current.play();
  };

  const handleLeave = () => {
    if (playerRef.current) {
      playerRef.current.stop();
      // redraw first frame
      const ctx = canvasRef.current.getContext('2d');
      const frame = playerRef.current.frames?.[0];
      if (frame) ctx.drawImage(frame.imageElement, 0, 0);
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseEnter={handleEnter}
      // onMouseLeave={handleLeave}
      style={{ imageRendering: 'pixelated' }}
    />
  );
};
