// UnloadEvent.tsx
'use client';
import { useEffect } from 'react';

export function UnloadEvent() {
  useEffect(() => {
    const terminationEvent = 'onpagehide' in globalThis ? 'pagehide' : 'unload';
    globalThis.addEventListener(terminationEvent, () => {
      window.gtag?.('event', 'page_unload', {
        page_path: window.location.pathname,
      });
    });
  }, []);
}
