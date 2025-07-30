'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

import { siteConfig } from '@/configs/site-config';

export const Giscus = () => {
  const [, setEnabledLoadComments] = useState(true);

  const COMMENTS_ID = 'comments-container';

  useEffect(() => {
    setEnabledLoadComments(false);

    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.setAttribute('data-repo', siteConfig.Giscus.repo);
    script.setAttribute('data-repo-id', siteConfig.Giscus.repositoryId);
    script.setAttribute('data-category', siteConfig.Giscus.category);
    script.setAttribute('data-category-id', siteConfig.Giscus.categoryId);
    script.setAttribute('data-mapping', siteConfig.Giscus.mapping);
    script.setAttribute('data-strict', siteConfig.Giscus.strict);
    script.setAttribute('data-reactions-enabled', siteConfig.Giscus.reactions);
    script.setAttribute('data-emit-metadata', siteConfig.Giscus.metadata);
    script.setAttribute('data-input-position', siteConfig.Giscus.inputPosition);
    script.setAttribute('data-lang', siteConfig.Giscus.lang);
    script.setAttribute('data-theme', Cookies.get('theme') === 'dark' ? 'dark_dimmed' : 'light');
    script.setAttribute('crossorigin', 'anonymous');
    script.async = true;

    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.innerHTML = '';
    };
  }, []);

  return <div className="giscus" id={COMMENTS_ID} />;
};
