'use client';

import * as React from 'react';

import { Section } from '@/features/home/components/section';

const BASE = 'https://raw.githubusercontent.com/godchu/blog-assets/refs/heads/main/line-packs-v2';

// Your lists
const packIds = [
  '648e6812b74fae74142e8af0',
  '67c9092bcd372c3107c54c32',
  '63ca068085d52f7ff12596d5',
  '64e80b97092abe5833a87320',
  '65e1933065bd7b66653c90f9',
  '6808583169d7650139d3175a',
  '667b809422d33233cb380c63',
  '66d164f4ef749a3b57850c5c',
  '67623b3dfeefbb031e01547f',
  '653c693f3a007919c0167e64',
  '665e825e22d33233cb37cea0',
  '65781a7a896d8c165265f3ea',
  '686cb4907a295f1761c5ba83',
];
const maxList = [40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40];

/** 1→"001", 12→"012" */
function pad3(n) {
  return String(n).padStart(3, '0');
}

/** Build GIF URL: <BASE>/<pack>/<NNN>/<NNN>_animation/<NNN>_animation.gif */
function buildGifUrl(packId, index) {
  const n = pad3(index);
  return `${BASE}/${packId}/${n}/${n}_animation/${n}_animation.gif`;
}

/** A single GIF with graceful fallback if 404 */
function GifItem({ src, alt, width = 180, height = 180 }) {
  const [visible, setVisible] = React.useState(true);

  if (!visible) return null;

  return (
    <a href={src} target="_blank" rel="noreferrer" className="block" title={alt}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        onError={() => setVisible(false)}
        className="rounded-xl shadow-sm border border-black/5 bg-white/30"
        style={{ imageRendering: 'auto' }}
      />
    </a>
  );
}

export default function CapybaraGif() {
  return (
    <div className="ps-0">
      <Section background="left-card">
        <div className="w-full">
          <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0">
            {/* Grid per pack */}
            {packIds.map((packId, i) => {
              const count = maxList[i] ?? 0;
              const items = Array.from({ length: count }, (_, k) => k + 1);
              return (
                <div key={packId} className="mb-10">
                  <h2 className="text-lg font-semibold mb-3">
                    Pack: <code className="text-sm">{packId}</code>
                  </h2>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {items.map((idx) => {
                      const src = buildGifUrl(packId, idx);
                      return (
                        <GifItem
                          key={`${packId}-${idx}`}
                          src={src}
                          alt={`${packId} - ${pad3(idx)}`}
                          width={160}
                          height={160}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </div>
  );
}
