import { useEffect, useState } from 'react';

import { useInterval } from './use-interval';

function padZero(time) {
  return `${time}`.length < 2 ? `0${time}` : `${time}`;
}

export function getHMSTime(timeDiff) {
  if (timeDiff <= 0) {
    return ['00', '00', '00'];
  }
  if (timeDiff > 100 * 3600) {
    return ['99', '59', '59'];
  }
  const hour = Math.floor(timeDiff / 3600);
  const minute = Math.floor((timeDiff - hour * 3600) / 60);
  const second = timeDiff - hour * 3600 - minute * 60;
  return [padZero(hour), padZero(minute), padZero(second)];
}

export function getDHMS(timeDiff) {
  if (timeDiff <= 0) {
    return ['00', '00', '00', '00'];
  }
  const day = Math.floor(timeDiff / 86_400);
  const hour = Math.floor((timeDiff % 86_400) / 3600);
  const minute = Math.floor((timeDiff % 3600) / 60);
  const second = timeDiff % 60;
  return [padZero(day), padZero(hour), padZero(minute), padZero(second)];
}

export const useCountDown = (time, format = getDHMS, callback) => {
  const [remainTime, setRemainTime] = useState(time);
  const [delay, setDelay] = useState(1000);

  useInterval(() => {
    if (remainTime <= 0) {
      setDelay(undefined);
      return;
    }
    setRemainTime(remainTime - 1);
  }, delay);

  useEffect(() => {
    if (time > 0 && remainTime <= 0 && callback) {
      callback();
    }
  }, [callback, remainTime, time]);

  const [day, hour, minute, second] = format(remainTime);

  return [day, hour, minute, second];
};
