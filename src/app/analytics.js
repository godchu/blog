// Analytics.tsx
'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanedUrl = pathname.split(/[#?]/)[0];
    window.gtag?.('event', 'page_view', {
      page_path: cleanedUrl,
    });
  }, [pathname]);
}
