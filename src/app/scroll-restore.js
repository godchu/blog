// app/scroll-restore.tsx
"use client";

import { useEffect } from "react";

export function ScrollRestoreFix() {
  useEffect(() => {
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari) {
      history.scrollRestoration = "auto";
    }
  }, []);
  return null;
}
