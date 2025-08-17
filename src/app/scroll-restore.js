'use client';

import { useEffect } from 'react';

export function ScrollRestoreFix() {
  useEffect(() => {
    const isSafari = /^(?:(?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      // eslint-disable-next-line no-restricted-globals
      history.scrollRestoration = 'auto';
    }
  }, []);
}
