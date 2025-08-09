// StickerClient.tsx (CLIENT)
'use client';

import { useEffect, useState } from 'react';

import { ApngSticker } from '@/components/apng-sticker/apng-sticker';

const BASE = 'https://raw.githubusercontent.com/godchu/blog-assets/refs/heads/main/line-packs-v2';

function buildStickerUrl(packId, index, { animated = true, ext = 'png' } = {}) {
  const n = String(index).padStart(3, '0');
  const name = animated ? `${n}/${n}_animation/${n}_animation.${ext}` : `${n}/${n}.${ext}`;
  return `${BASE}/${packId}/${name}`;
}
function hash(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

const packIds = [
  '63ca068085d52f7ff12596d5',
  '64e80b97092abe5833a87320',
  '67c9092bcd372c3107c54c32',
  '6808583169d7650139d3175a',
];
const maxList = [40, 40, 40, 40];

export default function StickerClient({ animated, pick }) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const len = packIds.length;
    if (!len) return;
    const packIdx =
      pick === 'daily' ? hash(new Date().toISOString().slice(0, 10)) % len : Math.floor(Math.random() * len);
    const packId = packIds[packIdx];
    const max = Math.max(1, Number(maxList[packIdx] ?? maxList[0] ?? 1));
    const idx =
      pick === 'daily'
        ? (hash(new Date().toISOString().slice(0, 10) + packId) % max) + 1
        : Math.floor(Math.random() * max) + 1;
    setUrl(buildStickerUrl(packId, idx, { animated }));
  }, [animated, pick]);

  // SAME BOX always, swaps content inside (skeleton → canvas)
  const boxClass = 'inline-block w-[28px] h-[28px] sm:w-[40px] sm:h-[40px] align-text-bottom';

  if (!url) {
    return <span className={boxClass} aria-hidden="true" />; // identical to server fallback
  }

  return (
    <ApngSticker className={boxClass} autoPlay loop src={url} showSkeleton style={{ transform: 'translateY(6px)' }} />
  );
}
