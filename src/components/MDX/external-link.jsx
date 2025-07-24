import React from "react";

export function ExternalLink({
  href,
  target,
  children,
  ...props
}) {
  return (
    <a href={href} target={target ?? '_blank'} rel="noopener" {...props}>
      {children}
    </a>
  );
}
