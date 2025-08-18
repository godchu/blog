import { IconFacebookRectangle } from '@/components/icon/icon-facebook-rectangle';
import { IconGithubRectangle } from '@/components/icon/icon-github-rectangle';
import { IconInstagramRectangle } from '@/components/icon/icon-instagram-rectangle';
import IconLocket from '@/components/icon/icon-locket';
import { IconYoutube } from '@/components/icon/icon-youtube';
import { ExternalLink } from '@/components/MDX/external-link';
import Link from '@/components/MDX/link';
import { siteConfig } from '@/configs/site-config';

import { HiSticker } from './hi-sticker';

const socialLinkClasses = 'hover:text-primary dark:text-primary-dark';

export const HeroSection = () => {
  return (
    <section className="mx-auto flex flex-col w-full max-w-7xl lg:min-h-screen lg:h-screen">
      <div className="flex-col gap-2 flex grow w-full my-20 lg:mb-0 lg:mt-[-96px] lg:justify-center mx-auto items-center">
        <div className="px-5 lg:px-0 w-full h-auto max-w-4xl relative">
          <HiSticker animated />

          <h2 className="font-sans text-primary dark:text-primary-dark font-semibold text-[clamp(40px,8vw,80px)] leading-[1.1]">
            Lê Xuân Tiến.
          </h2>
          <h3 className="font-sans font-semibold text-[clamp(40px,8vw,80px)] mt-[5px] leading-[0.9]">
            I build things for fun.
          </h3>
          <p className="mt-5 max-w-[540px]">
            {/* I’m a <b>Full‑stack</b> developer at <Link href="https://dainghiasteel.com/">Dai Nghia Steel</Link>, where I
            build easy-to-use digital products from frontend to backend. */}
            I’m a <b>Full‑stack</b> developer and <b>import–export</b> documentation specialist at{' '}
            <Link href="https://dainghiasteel.com/">Dai Nghia Steel</Link>, where I create accessible digital products
            and handle customs paperwork for the company’s shipments.
            <span className="block text-sm mt-2 opacity-70">(also quietly operating as capybara boy 🐾)</span>
          </p>

          <div className="flex flex-row items-center gap-x-3 mt-5">
            <ExternalLink
              aria-label="Le Xuan Tien on Github"
              href={siteConfig.Social.Github}
              className={socialLinkClasses}
            >
              <IconGithubRectangle width="32px" height="32px" />
            </ExternalLink>
            <ExternalLink
              aria-label="Le Xuan Tien on Instagram"
              href={siteConfig.Social.Instagram}
              className={socialLinkClasses}
            >
              <IconInstagramRectangle width="32px" height="32px" />
            </ExternalLink>
            <ExternalLink
              aria-label="Le Xuan Tien on Facebook"
              href={siteConfig.Social.Facebook}
              className={socialLinkClasses}
            >
              <IconFacebookRectangle width="32px" height="32px" />
            </ExternalLink>
            <ExternalLink
              aria-label="Le Xuan Tien on Youtube"
              href={siteConfig.Social.Youtube}
              className={socialLinkClasses}
            >
              <IconYoutube width="32px" height="32px" />
            </ExternalLink>
            <ExternalLink
              aria-label="Le Xuan Tien on Locket"
              href={siteConfig.Social.Locket}
              className={socialLinkClasses}
            >
              <IconLocket />
            </ExternalLink>
          </div>

          <button className="font-medium mt-12 px-7 py-2 border-solid border-[1px] border-brand dark:border-brand-dark text-brand dark:text-brand-dark rounded-md pointer text-base transition-opacity betterhover:hover:bg-highlight-dark betterhover:hover:bg-highlight betterhover:hover:border-[1.5px]">
            Check out my blog
          </button>
        </div>
      </div>
    </section>
  );
};
