'use client';

import {useEffect} from 'react';
import {usePathname} from 'next/navigation';

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    const cleanedUrl = pathname.split(/[#?]/)[0];
    // @ts-ignore
    // eslint-disable-next-line no-undef
    gtag('event', 'pageview', {

       
      event_label: cleanedUrl,
    });
  }, [pathname]);
}
