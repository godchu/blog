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
    appId: '5YX659QBL4',
    apiKey: '842ef6e0c139ffcf7ff63702c41efefe',
    indexName: 'beta-blog',
  },
  Gtag: 'GTM-K994L4J7',

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
};
