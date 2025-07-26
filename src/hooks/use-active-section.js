'use client';

import { usePathname } from 'next/navigation';

export function useActiveSection() {
  const pathname = usePathname();
  const cleanedPath = pathname.split(/[\?\#]/)[0];
  if (cleanedPath === '/') {
    return 'home';
  } else if (cleanedPath.startsWith('/reference')) {
    return 'reference';
  } else if (pathname.startsWith('/learn')) {
    return 'learn';
  } else if (pathname.startsWith('/community')) {
    return 'community';
  } else if (pathname.startsWith('/blog')) {
    return 'blog';
  } else {
    return 'unknown';
  }
}
