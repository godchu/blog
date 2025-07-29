export function customMetaDataGenerator({
  title,
  description = 'Personal blog of a software engineer, sharing insights on web development, programming, and technology.',
  canonicalUrl = 'https://tienlx97.io.vn',
  ogType = 'website',
  keywords = ['Portfolio', 'Personal Website'],
  ogImage = 'https://tienlx97.io.vn/images/og-home.jpg',
  twitterCard = 'https://tienlx97.io.vn/images/og-home.jpg',
}) {
  // Create Site Title
  const siteTitle = 'Your Website Name';
  const fullTitle = `${title} | ${siteTitle}`;

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title: fullTitle,
      description,
      type: ogType,
      url: canonicalUrl,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: twitterCard,
      title: fullTitle,
      description,
      images: [ogImage],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
