'use client';

import * as React from 'react';

import { Section } from '@/features/home/components/section';

import { BASE, maxList, packIds } from '../constant/capybara';

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
