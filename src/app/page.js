import { HomeContent } from '@/features/home';
import { customMetaDataGenerator } from '@/lib/custom-meta-data-generator';

export const metadata = customMetaDataGenerator({
  title: 'Lê Xuân Tiến',
  description:
    'Personal blog of a software engineer, sharing insights on web development, programming, and technology.',
});

export default function HomePage() {
  return <HomeContent />;
}
