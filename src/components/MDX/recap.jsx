/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';

import { H2 } from './heading';

function Recap({ children }) {
  return (
    <section>
      <H2 isPageAnchor id="recap">
        Recap
      </H2>
      {children}
    </section>
  );
}

export default Recap;
