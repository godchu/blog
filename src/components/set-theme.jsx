'use client';
import {useEffect,useState} from 'react';

function SetTheme() {
   
  const [, setTheme] = useState(globalThis.window?.__theme || 'light');

  useEffect(() => {
    globalThis.window.__onThemeChange = setTheme;
  }, []);
}

export default SetTheme;
