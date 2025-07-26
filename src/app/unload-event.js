'use client';

import {useEffect} from 'react';

export function UnloadEvent() {
  useEffect(() => {
    const terminationEvent = 'onpagehide' in globalThis ? 'pagehide' : 'unload';
    globalThis.addEventListener(terminationEvent, () => {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      gtag('event', 'timing', {

         
        event_label: 'JS Dependencies',
        event: 'unload',
      });
    });
  }, []);
}
