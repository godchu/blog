import { communityMedia } from '@/configs/home';

import { CommunityGallery } from './community-gallery';
import { Header } from './header';
import { Section } from './section';
import { SectionSticker } from './section-sticker';

const title = 'Photos';

const description =
  "A journey in snapshots — from the first giggles, through curious adventures, to the person I’ve grown into now. I know it's not beautiful";

export const CommunityGallerySection = () => {
  return (
    <Section
      background="right-card"
      className="[--s-i-top:-25px] sm:[--s-i-top:-40px]"
      iconPosition="right"
      icon={<SectionSticker />}
    >
      <div className="w-full">
        <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0">
          <Header num="05">{title}</Header>
          <p className="max-w-4xl text-lg lg:text-xl my-5 text-secondary dark:text-secondary-dark leading-normal">
            {description}
          </p>
        </div>
        <CommunityGallery communityMedia={communityMedia} />
      </div>
    </Section>
  );
};
