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

      <AboutSection num="01" />

      <NikkiSection num="02" />

      <BlogSection num="03" />

      <NovelSection num="04" />

      <CommunityGallerySection num="05" />
    </div>
  );
}
