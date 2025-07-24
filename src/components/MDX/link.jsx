/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import cn from 'classnames';
import NextLink from 'next/link';
import {Children, cloneElement} from 'react';
import {ExternalLink} from './external-link';

function Link({
  href,
  className,
  children,
  ...properties
}) {
  const classes
    = 'inline text-link dark:text-link-dark border-b border-link border-opacity-0 hover:border-opacity-100 duration-100 ease-in transition leading-normal';
  const modifiedChildren = Children.toArray(children).map(child => {
    if (child.type?.mdxName && child.type?.mdxName === 'inlineCode') {
      return cloneElement(child, {
        isLink: true,
      });
    }

    return child;
  });

  if (!href) {
    return <a href={href} className={className} {...properties}/>;
  }

  return (
    <>
      {href.startsWith('https://')
        ? (
          <ExternalLink href={href} className={cn(classes, className)} {...properties}>
            {modifiedChildren}
          </ExternalLink>
        )
        : (href.startsWith('#')
          ? (
            <a className={cn(classes, className)} href={href} {...properties}>
              {modifiedChildren}
            </a>
          )
          : (
            <NextLink href={href} className={cn(classes, className)} {...properties}>
              {modifiedChildren}
            </NextLink>
          ))}
    </>
  );
}

export default Link;
