import React from 'react';

export function ExternalLink({
  href,
  target,
  children,
  ...properties
}) {
  return (
     
    <a href={href} target={target ?? '_blank'} rel="noopener" {...properties}>
      {children}
    </a>
  );
}
