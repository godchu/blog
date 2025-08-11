'use client';

import { useEffect, useState } from 'react';

import { LineEmojiCanvas25 } from '@/features/line-sticker/components/line-emoji-25';
import { BASE, maxList, packIds } from '@/features/line-sticker/constant/packid';

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

export function SectionSticker({
  animated = true,
  pick = 'visit',
  className = 'w-[40px] h-[40px] sm:w-[70px] sm:h-[70px]',
}) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!packIds.length || !maxList.length) return;

    const len = packIds.length;
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

  // return <ApngSticker loop autoPlay showSkeleton={false} className={className} src={url} />;

  return (
    <LineEmojiCanvas25
      className={className}
      autoPlay
      loop
      src={url}
      showSkeleton={false}
      runWhenHover
      // style={{ transform: 'translateY(6px)' }}
    />
  );
}
