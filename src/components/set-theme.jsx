'use client';
import {useState, useEffect} from 'react';

function SetTheme() {
  // eslint-disable-next-line react/hook-use-state
  const [_, setTheme] = useState(globalThis.window?.__theme || 'light');

  useEffect(() => {
    globalThis.window.__onThemeChange = setTheme;
  }, []);
}

export default SetTheme;
