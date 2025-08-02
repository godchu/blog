'use client';

import { usePathname } from 'next/navigation';

import sidebarBlog from '../configs/sidebarBlog.json';
import sidebarFun from '../configs/sidebarFunny.json';
import sidebarNikki from '../configs/sidebarNikki.json';
import sidebarNovel from '../configs/sidebarNovel.json';

export function useActiveSection() {
  const pathname = usePathname();
  const cleanedPath = pathname.split(/[\?\#]/)[0];

  // Remove /docs prefix
  const sectionPath = cleanedPath.startsWith('/docs') ? cleanedPath.slice('/docs'.length) : cleanedPath;

  let section;

  if (cleanedPath === '/' || sectionPath === '') {
    section = 'home';
  } else if (sectionPath.startsWith('/fun')) {
    section = 'fun';
  } else if (sectionPath.startsWith('/nikki')) {
    section = 'nikki';
  } else if (sectionPath.startsWith('/blog')) {
    section = 'blog';
  } else if (sectionPath.startsWith('/novel')) {
    section = 'novel';
  } else {
    section = 'unknown';
  }

  let routeTree;
  switch (section) {
    case 'home':
    case 'unknown':
      routeTree = sidebarNikki;
      break;
    case 'novel':
      routeTree = sidebarNovel;
      break;
    case 'nikki':
      routeTree = sidebarNikki;
      break;
    case 'fun':
      routeTree = sidebarFun;
      break;
    case 'blog':
      routeTree = sidebarBlog;
      break;
  }

  return { section, routeTree };
}
