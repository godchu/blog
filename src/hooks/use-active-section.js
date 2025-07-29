'use client';

import { usePathname } from 'next/navigation';

import sidebarBlog from '../sidebarBlog.json';
import sidebarLearn from '../sidebarLearn.json';
import sidebarNikki from '../sidebarNikki.json';

export function useActiveSection() {
  const pathname = usePathname();
  const cleanedPath = pathname.split(/[\?\#]/)[0];

  // Remove /docs prefix
  const sectionPath = cleanedPath.startsWith('/docs') ? cleanedPath.slice('/docs'.length) : cleanedPath;

  let section;

  // if (cleanedPath === '/' || sectionPath === '') {
  //   return 'home';
  // } else if (sectionPath.startsWith('/reference')) {
  //   return 'reference';
  // } else if (sectionPath.startsWith('/learn')) {
  //   return 'learn';
  // } else if (sectionPath.startsWith('/community')) {
  //   return 'community';
  // } else if (sectionPath.startsWith('/blog')) {
  //   return 'blog';
  // } else {
  //   return 'unknown';

  if (cleanedPath === '/' || sectionPath === '') {
    section = 'home';
  } else if (sectionPath.startsWith('/learn')) {
    section = 'learn';
  } else if (sectionPath.startsWith('/nikki')) {
    section = 'nikki';
  } else if (sectionPath.startsWith('/blog')) {
    section = 'blog';
  } else {
    section = 'unknown';
  }

  let routeTree;
  switch (section) {
    case 'home':
    case 'unknown':
      routeTree = sidebarLearn;
      break;
    case 'nikki':
      routeTree = sidebarNikki;
      break;
    case 'learn':
      routeTree = sidebarLearn;
      break;
    case 'blog':
      routeTree = sidebarBlog;
      break;
  }

  return { section, routeTree };
}
