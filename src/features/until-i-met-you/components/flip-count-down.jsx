'use client';

import { H2 } from '@/components/MDX/heading';

import { getDHMS, useCountDown } from '../hooks/use-count-down';

import { TimeBox } from './time-box';

export const FlipCountDown = ({ startTime, endTime, title }) => {
  const onFinish = () => {
    alert('Time is up!');
  };

  const [days, hours, minutes, seconds] = useCountDown(
    Math.max(0, Math.floor((endTime - startTime) / 1000)),
    getDHMS,
    onFinish,
  );

  return (
    <div className="w-full text-center py-10">
      <H2 className="w-full mb-6 sm:text-5xl">{title}</H2>
      <div className="w-full flex justify-center flex-wrap gap-5">
        <TimeBox value={days} label="Days" />
        <TimeBox value={hours} label="Hours" />
        <TimeBox value={minutes} label="Minutes" />
        <TimeBox value={seconds} label="Seconds" />
      </div>
    </div>
  );
};
