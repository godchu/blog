/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';

function Intro({ children }) {
  return <div className="font-display text-xl text-primary dark:text-primary-dark leading-relaxed">{children}</div>;
}

export default Intro;
