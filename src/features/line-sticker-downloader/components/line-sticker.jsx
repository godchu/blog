'use client';

import { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import { parseAPNG } from '../utils';
import { fetchArrayBuffer } from '../utils/line-download';

export const LineSticker = ({
  url,
  playbackRate = 1,
  loop = false,
  autoplay = true,
  runWhenHover = false,
  scale = 1,
  //
  className,
  style = {},
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
      // canvas.style.width = `${apng.width * scale}px`;
      // canvas.style.height = `${apng.height * scale}px`;

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

  // const handleLeave = () => {
  //   if (playerRef.current) {
  //     playerRef.current.stop();
  //     // redraw first frame
  //     const ctx = canvasRef.current.getContext('2d');
  //     const frame = playerRef.current.frames?.[0];
  //     if (frame) ctx.drawImage(frame.imageElement, 0, 0);
  //   }
  // };

  return (
    <div
      className={cn('')}
      style={{
        ...style,
      }}
      onMouseEnter={handleEnter}
      // onMouseLeave={onLeave}
    >
      <canvas className="max-w-full max-h-full" ref={canvasRef} />
    </div>
  );
};

/**
 * Props:
 * - url: string (APNG url)
 * - fit: 'contain' | 'cover' | 'fill' (default 'contain')
 * - autoplay: boolean (default true)
 * - loop: boolean (default false)  // true -> infinite
 * - runWhenHover: boolean (default false)
 * - playbackRate: number (default 1)
 * - style: React.CSSProperties  // size the wrapper with width/height here
 */
// export function LineSticker({
//   url,
//   fit = 'contain',
//   autoplay = true,
//   loop = false,
//   runWhenHover = false,
//   playbackRate = 1,
//   style,
//   className,
// }) {
//   const [ready, setReady] = useState(false);
//   const wrapperRef = useRef(null);
//   const canvasRef = useRef(null);
//   const playerRef = useRef(null);
//   const apngRef = useRef(null);
//   const cleanupRef = useRef(() => {});

//   useEffect(() => {
//     let cancelled = false;

//     (async () => {
//       // fetch & parse
//       const ab = await fetchArrayBuffer(url);
//       const apng = parseAPNG(ab);
//       if (apng instanceof Error) return;

//       await apng.createImages();
//       if (cancelled) return;

//       apngRef.current = apng;

//       // init canvas
//       const canvas = canvasRef.current;
//       const wrapper = wrapperRef.current;
//       if (!canvas || !wrapper) return;

//       // loop handling
//       if (loop) apng.numPlays = 0; // 0 = infinite

//       const ctx = canvas.getContext('2d');
//       const player = await apng.getPlayer(ctx);
//       playerRef.current = player;
//       player.playbackRate = playbackRate;

//       // function to (re)layout canvas based on wrapper size
//       const layout = () => {
//         const dpr = Math.max(1, window.devicePixelRatio || 1);
//         const rect = wrapper.getBoundingClientRect();
//         const W = Math.max(1, Math.floor(rect.width));
//         const H = Math.max(1, Math.floor(rect.height));

//         // desired draw size (contain/cover/fill)
//         const natW = apng.width;
//         const natH = apng.height;

//         let drawW = W;
//         let drawH = H;

//         if (fit === 'contain') {
//           const s = Math.min(W / natW, H / natH);
//           drawW = Math.max(1, Math.floor(natW * s));
//           drawH = Math.max(1, Math.floor(natH * s));
//         } else if (fit === 'cover') {
//           const s = Math.max(W / natW, H / natH);
//           drawW = Math.max(1, Math.floor(natW * s));
//           drawH = Math.max(1, Math.floor(natH * s));
//         } // 'fill' uses container size directly

//         // center inside wrapper
//         const offsetX = Math.floor((W - drawW) / 2);
//         const offsetY = Math.floor((H - drawH) / 2);

//         // set canvas CSS size (logical) and pixel buffer (physical)
//         canvas.style.width = `${W}px`;
//         canvas.style.height = `${H}px`;
//         canvas.width = Math.max(1, Math.floor(W * dpr));
//         canvas.height = Math.max(1, Math.floor(H * dpr));

//         // reset transform, apply DPR, then scale to draw size
//         ctx.setTransform(1, 0, 0, 1, 0, 0);
//         ctx.clearRect(0, 0, canvas.width, canvas.height);
//         ctx.scale(dpr, dpr);
//         ctx.translate(offsetX, offsetY);
//         ctx.scale(drawW / natW, drawH / natH);
//       };

//       // initial layout
//       layout();

//       // draw first frame if not autoplay
//       if (!autoplay) {
//         const f0 = apng.frames?.[0];
//         if (f0?.imageElement) {
//           // after layout, top-left is (0,0) in "APNG space"
//           ctx.drawImage(f0.imageElement, 0, 0);
//         }
//       } else {
//         player.play();
//       }

//       // observe resize
//       const ro = new ResizeObserver(() => {
//         const wasPlaying = player.isPlaying;
//         layout();
//         if (!autoplay && !wasPlaying) {
//           const f0 = apng.frames?.[0];
//           if (f0?.imageElement) {
//             ctx.drawImage(f0.imageElement, 0, 0);
//           }
//         }
//       });
//       ro.observe(wrapper);

//       // pause when not visible (IntersectionObserver)
//       const io = new IntersectionObserver(
//         (entries) => {
//           const entry = entries[0];
//           if (!entry) return;
//           if (entry.isIntersecting) {
//             if (autoplay && !player.isPlaying) player.play();
//           } else {
//             if (player.isPlaying) player.stop();
//           }
//         },
//         { root: null, threshold: 0 },
//       );
//       io.observe(wrapper);

//       setReady(true);

//       cleanupRef.current = () => {
//         ro.disconnect();
//         io.disconnect();
//         if (playerRef.current) {
//           try {
//             playerRef.current.stop();
//           } catch {}
//           playerRef.current = null;
//         }
//       };
//     })();

//     return () => {
//       cancelled = true;
//       cleanupRef.current?.();
//     };
//   }, [url, autoplay, loop, playbackRate, fit]);

//   const onEnter = () => {
//     if (!ready || !runWhenHover) return;
//     playerRef.current?.play();
//   };

//   // const onLeave = () => {
//   //   if (!runWhenHover) return;
//   //   const player = playerRef.current;
//   //   const apng = apngRef.current;
//   //   const canvas = canvasRef.current;
//   //   if (player && apng && canvas) {
//   //     player.stop();
//   //     const ctx = canvas.getContext('2d');
//   //     const f0 = player.frames?.[0] ?? apng.frames?.[0];
//   //     if (f0?.imageElement) ctx.drawImage(f0.imageElement, 0, 0);
//   //   }
//   // };

//   return (
//     <div
//       ref={wrapperRef}
//       className={className}
//       style={{
//         ...style,
//       }}
//       onMouseEnter={onEnter}
//       // onMouseLeave={onLeave}
//     >
//       <canvas className="max-w-full max-h-full" ref={canvasRef} />
//     </div>
//   );
// }
