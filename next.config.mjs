/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  images: {
    remotePatterns: [
      new URL('https://raw.githubusercontent.com/**'),
      { protocol: 'https', hostname: 'stickershop.line-scdn.net' },
      { protocol: 'https', hostname: 'sdl-stickershop.line.naver.jp' },
      { protocol: 'https', hostname: 'stickershop.line.naver.jp' },
      { protocol: 'https', hostname: 'shop.line-scdn.net' },
      { protocol: 'https', hostname: 'scdn.line-apps.com' },
      { protocol: 'https', hostname: 'store.line.me' },
    ],
  },
};

// Merge MDX config with Next.js config
export default nextConfig;
