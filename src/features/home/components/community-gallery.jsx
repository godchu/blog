'use client';
import { useEffect, useRef, useState } from 'react';

import { CommunityImages } from './community-images';

export function CommunityGallery({ communityMedia }) {
  const ref = useRef();
  const [shouldPlay, setShouldPlay] = useState(false);
  const [isLazy, setIsLazy] = useState(true);

  // Detect when gallery is in view for animation
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((e) => setShouldPlay(e.isIntersecting)), {
      root: null,
      rootMargin: `${window.innerHeight}px 0px`,
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Lazy load optimization
  useEffect(() => {
    if (!isLazy) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setIsLazy(false)),
      { root: null, rootMargin: `${window.innerHeight * 2.5}px 0px` },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isLazy]);

  // Fallback to load after timeout
  useEffect(() => {
    const timeout = setTimeout(() => setIsLazy(false), 20000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div ref={ref} className="relative flex overflow-x-hidden overflow-y-visible w-auto">
      <div
        className="w-full py-12 lg:py-20 whitespace-nowrap flex flex-row animate-marquee lg:animate-large-marquee"
        style={{ animationPlayState: shouldPlay ? 'running' : 'paused' }}
      >
        <CommunityImages isLazy={isLazy} communityMedia={communityMedia} />
      </div>
      <div
        aria-hidden="true"
        className="w-full absolute top-0 py-12 lg:py-20 whitespace-nowrap flex flex-row animate-marquee2 lg:animate-large-marquee2"
        style={{ animationPlayState: shouldPlay ? 'running' : 'paused' }}
      >
        <CommunityImages isLazy={isLazy} communityMedia={communityMedia} />
      </div>
    </div>
  );
}
