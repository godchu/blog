/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import { Children } from 'react';
import * as React from 'react';

import CodeBlock from './code-block';

export function PackageImport({ children }) {
  const terminal = Children.toArray(children).filter((child) => {
    return child.type?.mdxName !== 'pre';
  });
  const code = Children.toArray(children).map((child, i) => {
    if (child.type?.mdxName === 'pre') {
      return <CodeBlock {...child.props} isFromPackageImport key={i} noMargin={true} noMarkers={true} />;
    } else {
      return null;
    }
  });
  return (
    <section className="my-8 grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4">
      <div className="flex flex-col justify-center">{terminal}</div>
      <div className="flex flex-col justify-center">{code}</div>
    </section>
  );
}
