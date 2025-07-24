/* eslint-disable no-undef */
/* eslint-disable no-process-env */
import React from "react";
import Script from "next/script";

import { Analytics } from "./analytics";
import { UnloadEvent } from "./unload-event";

import "@docsearch/css";
import "../assets/styles/algolia.css";
import "../assets/styles/index.css";
import "../assets/styles/sandpack.css";

export const metadata = {
  title: "Personal Blog",
  description:
    "Personal blog of a software engineer, sharing insights on web development, programming, and technology.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" dir="ltr">
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#404756" />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta name="theme-color" content="#23272f" />
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}');`,
        }}
      />
      <body className="font-text font-medium antialiased text-lg bg-wash dark:bg-wash-dark text-secondary dark:text-secondary-dark leading-base">
        <Script
          dangerouslySetInnerHTML={{
            __html: `
                (function () {
                  function setTheme(newTheme) {
                    window.__theme = newTheme;
                    if (newTheme === 'dark') {
                      document.documentElement.classList.add('dark');
                    } else if (newTheme === 'light') {
                      document.documentElement.classList.remove('dark');
                    }
                  }

                  var preferredTheme;
                  try {
                    preferredTheme = localStorage.getItem('theme');
                  } catch (err) { }

                  window.__setPreferredTheme = function(newTheme) {
                    preferredTheme = newTheme;
                    setTheme(newTheme);
                    try {
                      localStorage.setItem('theme', newTheme);
                    } catch (err) { }
                  };

                  var initialTheme = preferredTheme;
                  var darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

                  if (!initialTheme) {
                    initialTheme = darkQuery.matches ? 'dark' : 'light';
                  }
                  setTheme(initialTheme);

                  darkQuery.addEventListener('change', function (e) {
                    if (!preferredTheme) {
                      setTheme(e.matches ? 'dark' : 'light');
                    }
                  });

                  // Detect whether the browser is Mac to display platform specific content
                  // An example of such content can be the keyboard shortcut displayed in the search bar
                  document.documentElement.classList.add(
                      window.navigator.platform.includes('Mac')
                      ? "platform-mac" 
                      : "platform-win"
                  );
                })();
              `,
          }}
        />
        <Analytics />
        <UnloadEvent />
        {children}
      </body>
    </html>
  );
}
