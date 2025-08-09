// HiStickerV2.tsx  (SERVER)
'use client';

import dynamic from 'next/dynamic';

function StickerBoxPlaceholder() {
  return (
    <span className="inline-block w-[28px] h-[28px] sm:w-[40px] sm:h-[40px] align-text-bottom" aria-hidden="true" />
  );
}

const StickerClient = dynamic(() => import('./sticker-client'), {
  ssr: false,
  loading: () => <StickerBoxPlaceholder />, // exact same box as client “not ready” state
});

export function HiStickerV2({ animated = true, pick = 'visit' }) {
  return (
    <span className="inline-flex items-baseline gap-2 align-baseline mb-[15px] md:mb-[30px]">
      <StickerClient animated={animated} pick={pick} />
      <span className="font-display text-[clamp(14px,5vw,16px)] text-link dark:text-link-dark leading-normal">
        My name is
      </span>
    </span>
  );
}
