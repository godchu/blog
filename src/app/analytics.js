// app/analytics.tsx
"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanedUrl = pathname.split(/[?#]/)[0];
    // @ts-ignore
    // eslint-disable-next-line no-undef
    gtag("event", "pageview", {
      // eslint-disable-next-line camelcase
      event_label: cleanedUrl,
    });
  }, [pathname]);

  return null;
}
