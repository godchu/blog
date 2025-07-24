// app/unload-event.tsx
"use client";

import { useEffect } from "react";

export function UnloadEvent() {
  useEffect(() => {
    const terminationEvent = "onpagehide" in window ? "pagehide" : "unload";
    window.addEventListener(terminationEvent, function () {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      gtag("event", "timing", {
        // eslint-disable-next-line camelcase
        event_label: "JS Dependencies",
        event: "unload",
      });
    });
  }, []);

  return null;
}
