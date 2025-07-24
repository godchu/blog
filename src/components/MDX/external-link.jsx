import React from 'react';

export function ExternalLink({
  href,
  target,
  children,
  ...properties
}) {
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a href={href} target={target ?? '_blank'} rel='noopener' {...properties}>
      {children}
    </a>
  );
}
