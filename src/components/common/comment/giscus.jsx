'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { usePathname } from 'next/navigation';

import { siteConfig } from '@/configs/site-config';

const COMMENTS_ID = 'comments-container';

export const Giscus = () => {
  const pathname = usePathname();

  const [, setEnabledLoadComments] = useState(true);

  useEffect(() => {
    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.innerHTML = '';
    setEnabledLoadComments(false);

    let theme;
    const val = Cookies.get('theme');

    if (!val) {
      theme = 'dark_dimmed';
    } else if (val === 'dark') {
      theme = 'dark_dimmed';
    } else if (val === 'light') {
      theme = 'light';
    }

    console.log({ theme });

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', siteConfig.Giscus.repo);
    script.setAttribute('data-repo-id', siteConfig.Giscus.repositoryId);
    script.setAttribute(
      'data-category',
      process.env.NODE_ENV === 'development' ? siteConfig.Giscus.categoryDev : siteConfig.Giscus.category,
    );
    script.setAttribute(
      'data-category-id',
      process.env.NODE_ENV === 'development' ? siteConfig.Giscus.categoryIdDev : siteConfig.Giscus.categoryId,
    );
    script.setAttribute('data-mapping', siteConfig.Giscus.mapping);
    script.setAttribute('data-strict', siteConfig.Giscus.strict);
    script.setAttribute('data-reactions-enabled', siteConfig.Giscus.reactions);
    script.setAttribute('data-emit-metadata', siteConfig.Giscus.metadata);
    script.setAttribute('data-input-position', siteConfig.Giscus.inputPosition);
    script.setAttribute('data-lang', siteConfig.Giscus.lang);
    script.setAttribute('data-theme', theme);
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    if (comments) comments.appendChild(script);

    // return () => {
    //   const comments = document.getElementById(COMMENTS_ID);
    //   if (comments) comments.innerHTML = '';
    // };
  }, [pathname]);

  return <div className="giscus" id={COMMENTS_ID} key={pathname} />;
};
