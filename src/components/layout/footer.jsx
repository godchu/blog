import * as React from 'react';
import cn from 'classnames';
import NextLink from 'next/link';

import { IconFacebookCircle } from '../icon/icon-facebook-circle';
import { IconGitHub } from '../icon/icon-gitHub';
import { IconYoutube } from '../icon/icon-youtube';
import { ExternalLink } from '../MDX/external-link';

export function Footer() {
  const socialLinkClasses = 'hover:text-primary dark:text-primary-dark';
  return (
    <div className="max-w-4xl ms-0 2xl:mx-auto">
      <footer className={cn('text-secondary dark:text-secondary-dark')}>
        <div className="grid grid-cols-3 md:grid-cols-3 xl:grid-cols-5 gap-x-12 gap-y-8 max-w-7xl mx-auto">
          <div className="col-span-2 md:col-span-1 justify-items-start">
            <FooterLink isHeader>Le Xuan Tien</FooterLink>
            <div className="text-sm text-primary dark:text-primary-dark" dir="ltr">
              Folked from react.dev
            </div>
          </div>
          <div className="flex flex-col">
            <FooterLink isHeader={true}>More</FooterLink>
            <FooterLink href="/docs/blog">Blog</FooterLink>
            <FooterLink href="/docs/fun">Fun</FooterLink>
            <FooterLink href="/docs/nikki">Nikki</FooterLink>
            <FooterLink href="/privacy">Privacy</FooterLink>
            <FooterLink href="/terms">Terms</FooterLink>
          </div>
          <div className="flex flex-col">
            <FooterLink isHeader={true}>Social</FooterLink>
            <div className="flex flex-row items-center gap-x-2">
              <ExternalLink
                aria-label="Le Xuan Tien on Facebook"
                href="https://www.facebook.com/tienlx97"
                className={socialLinkClasses}
              >
                <IconFacebookCircle />
              </ExternalLink>
              <ExternalLink
                aria-label="Le Xuan Tien on Github"
                href="https://github.com/tienlx97"
                className={socialLinkClasses}
              >
                <IconGitHub />
              </ExternalLink>
              <ExternalLink
                aria-label="Le Xuan Tien on Youtube"
                href="https://youtube.com/tienlx97"
                className={socialLinkClasses}
              >
                <IconYoutube />
              </ExternalLink>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/*
- 9tr: nha`
- 3tr: com
- 500: xang
- 1tr: chill
*/
function FooterLink({ href, children, isHeader = false }) {
  const classes = cn('border-b inline-block border-transparent', {
    'text-sm text-primary dark:text-primary-dark': !isHeader,
    'text-md text-secondary dark:text-secondary-dark my-2 font-bold': isHeader,
    'hover:border-gray-10': href,
  });

  if (!href) {
    return <div className={classes}>{children}</div>;
  }

  if (href.startsWith('https://')) {
    return (
      <div>
        <ExternalLink href={href} className={classes}>
          {children}
        </ExternalLink>
      </div>
    );
  }

  return (
    <div>
      <NextLink href={href} className={classes}>
        {children}
      </NextLink>
    </div>
  );
}
