import { AboutSection } from './about-section';
import { BlogSection } from './blog-section';
import { CommunityGallerySection } from './community-gallery-section';
import { MainSection } from './main-section';
import { NikkiSection } from './nikki-section';
import { NovelSection } from './novel-section';

export function HomeContent() {
  return (
    <div className="ps-0">
      <MainSection />

      <AboutSection />

      <NikkiSection />

      <BlogSection />

      <NovelSection />

      <CommunityGallerySection />
    </div>
  );
}
