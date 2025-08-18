import { AboutSection } from './about-section';
import { BlogSection } from './blog-section';
import { CommunityGallerySection } from './community-gallery-section';
import { HeroSection } from './main-section';
import { NikkiSection } from './nikki-section';
import { NovelSection } from './novel-section';

export function HomeContent() {
  return (
    <div className="ps-0">
      <HeroSection />

      <AboutSection />

      <NikkiSection />

      <BlogSection />

      <NovelSection />

      {/* hidden now */}
      <CommunityGallerySection />
    </div>
  );
}
