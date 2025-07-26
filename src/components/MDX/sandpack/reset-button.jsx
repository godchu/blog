/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';

import { IconRestart } from '@/components/icon/icon-restart';

export function ResetButton({ onReset }) {
  return (
    <button
      className="text-sm text-primary dark:text-primary-dark inline-flex items-center hover:text-link duration-100 ease-in transition mx-1"
      onClick={onReset}
      title="Reset Sandbox"
      type="button"
    >
      <IconRestart className="inline mx-1 relative" /> Reset
    </button>
  );
}
