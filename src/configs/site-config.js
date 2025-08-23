export const siteConfig = {
  version: '1.0',
  // --------------------------------------
  // Translations should replace these lines:
  languageCode: 'en',
  hasLegacySite: true,
  isRTL: false,
  // --------------------------------------
  copyright: `Copyright © ${new Date().getFullYear()}`,
  repoUrl: 'https://github.com/godchu/blog',
  algolia: {
    appId: 'LOYILEZTLM',
    apiKey: 'dea2ce8adc8a06081b96a2cd75baf416',
    indexName: 'Personal website',
  },
  Gtag: 'G-VKZ14GJNT2',

  Giscus: {
    repo: 'godchu/blog',
    repositoryId: 'R_kgDOPR9q-w',

    category: 'Announcements',
    categoryId: 'DIC_kwDOPR9q-84CtkuV',

    categoryDev: 'General',
    categoryIdDev: 'DIC_kwDOPR9q-84CtkuW',

    mapping: 'pathname',
    strict: '0',
    reactions: '1',
    metadata: '0',
    inputPosition: 'bottom',
    lang: 'en',
    commentsTheme: 'dark',
  },

  Social: {
    Facebook: 'https://www.facebook.com/tienlx97',
    Instagram: 'https://www.instagram.com/capy.bara.boy/',
    Github: 'https://github.com/tienlx97',
    Youtube: 'https://youtube.com/@tienlx97',
    Locket: 'https://locket.camera/links/YaMAvtC9iUSbTnCM9',
  },

  site: 'https://tienlx97.io.vn',
  siteName: 'Capybara Boy',
};
