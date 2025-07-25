/* eslint-disable unicorn/prefer-global-this */
const code = function () {
  window.__onThemeChange = function () {};

  function setTheme(newTheme) {
    window.__theme = newTheme;
    preferredTheme = newTheme;
    document.documentElement.dataset.theme = newTheme;
    window.__onThemeChange(newTheme);
  }

  let preferredTheme;

  try {
    preferredTheme = localStorage.getItem('theme');
  } catch {}

  window.__setPreferredTheme = function (newTheme) {
    setTheme(newTheme);
    try {
      localStorage.setItem('theme', newTheme);
    } catch {}
  };

  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');

  // eslint-disable-next-line unicorn/prevent-abbreviations
  darkQuery.addEventListener('change', e => {
    window.__setPreferredTheme(e.matches ? 'dark' : 'light');
  });

  setTheme(preferredTheme || (darkQuery.matches ? 'dark' : 'light'));
};

export const getTheme = `(${code})();`;
