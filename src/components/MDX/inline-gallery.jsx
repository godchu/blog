'use client';

import * as React from 'react';

export function ImageGallery({ images }) {
  return (
    <div className="flex justify-center gap-4 flex-wrap mb-4">
      {images.map((img, idx) => (
        <picture key={idx}>
          <source srcSet={img.src} />
          <img src={img.src} alt={img.alt} width={img.width} className="rounded-lg" />
        </picture>
      ))}
    </div>
  );
}
