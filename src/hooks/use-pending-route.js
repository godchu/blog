// import {useEffect,useRef, useState} from 'react';
// import {useRouter} from 'next/router';

// const usePendingRoute = () => {
//   const {events} = useRouter();
//   const [pendingRoute, setPendingRoute] = useState(null);
//   const currentRoute = useRef(null);
//   useEffect(() => {
//     let routeTransitionTimer= null;

//     const handleRouteChangeStart = (url) => {
//       clearTimeout(routeTransitionTimer);
//       routeTransitionTimer = setTimeout(() => {
//         if (currentRoute.current !== url) {
//           currentRoute.current = url;
//           setPendingRoute(url);
//         }
//       }, 100);
//     };
//     const handleRouteChangeComplete = () => {
//       setPendingRoute(null);
//       clearTimeout(routeTransitionTimer);
//     };
//     events.on('routeChangeStart', handleRouteChangeStart);
//     events.on('routeChangeComplete', handleRouteChangeComplete);

//     return () => {
//       events.off('routeChangeStart', handleRouteChangeStart);
//       events.off('routeChangeComplete', handleRouteChangeComplete);
//       clearTimeout(routeTransitionTimer);
//     };
//   }, [events]);

//   return pendingRoute;
// };

// export default usePendingRoute;

'use client';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const usePendingRoute = () => {
  const pathname = usePathname();
  const [isPending, setIsPending] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      setIsPending(true);
      const timeout = setTimeout(() => {
        setIsPending(false);
        prevPath.current = pathname;
      }, 300); // adjust as needed
      return () => clearTimeout(timeout);
    }
  }, [pathname]);

  return isPending;
};

export default usePendingRoute;
