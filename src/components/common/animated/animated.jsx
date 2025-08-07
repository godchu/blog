'use client';

import { ANIMATED_SOURCE } from '@/configs/animated';
import { normalizeSticker } from '@/utils/animated';

export const Animated = ({ name, type }) => {
  // fetch from config
  // then ...

  console.log({ name, type });

  const source = ANIMATED_SOURCE[type]?.[name];

  const data = normalizeSticker(source);

  console.log({ data });

  return <div>1</div>;
};
