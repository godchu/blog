import Image from 'next/image';

import NikkiCard from '@/components/common/comment/nikki-card';
import { IconFacebookRectangle } from '@/components/icon/icon-facebook-rectangle';
import { IconGithubRectangle } from '@/components/icon/icon-github-rectangle';
import { IconInstagramRectangle } from '@/components/icon/icon-instagram-rectangle';
import IconLocket from '@/components/icon/icon-locket';
import { IconYoutube } from '@/components/icon/icon-youtube';
import { ExternalLink } from '@/components/MDX/external-link';
import Link from '@/components/MDX/link';
import { LI } from '@/components/MDX/list';
import { communityMedia } from '@/configs/home';
import { siteConfig } from '@/configs/site-config';

import blogJson from '../../../configs/sidebarBlog.json';
import nikkiJson from '../../../configs/sidebarNikki.json';

import { CommunityGallery } from './community-gallery';
import { Header } from './header';
import { HiStickerV2 } from './hi-sticker.v2';
import { Section } from './section';
import { SectionSticker } from './section-sticker';

const skills = ['JavaScript', 'TypeScript', 'Node.js', 'Golang', 'React', 'React Native'];

export function HomeContent() {
  const latestNikkiRoutes = [...nikkiJson.routes[0].routes]
    .sort(
      (a, b) =>
        new Date(b.path.split('/').pop().split('-').reverse().join('-')) -
        new Date(a.path.split('/').pop().split('-').reverse().join('-')),
    )
    .slice(0, 5);

  const latestBlogRoutes = [...blogJson.routes[0].routes].slice(0, 5);

  const socialLinkClasses = 'hover:text-primary dark:text-primary-dark';

  return (
    <div className="ps-0">
      {/* <Animated name="hibi" type="capybara" /> */}
      {/* Intro Section */}
      <div className="mx-auto flex flex-col w-full max-w-7xl">
        <div className="flex-col gap-2 flex grow w-full my-20 lg:my-32 mx-auto items-center">
          <div className="px-5 lg:px-0 w-full h-auto max-w-4xl relative">
            <HiStickerV2 animated />

            <h2 className="font-sans text-primary dark:text-primary-dark font-semibold text-[clamp(40px,8vw,80px)] leading-[1.1]">
              Lê Xuân Tiến.
            </h2>
            <h3 className="font-sans font-semibold text-[clamp(40px,8vw,80px)] mt-[5px] leading-[0.9]">
              I build things for fun.
            </h3>
            <p className="mt-5 max-w-[540px]">
              I’m a <b>Full‑stack</b> developer at <Link href="https://dainghiasteel.com/">Dai Nghia Steel</Link>, where
              I build easy-to-use digital products from frontend to backend.
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
          </div>
        </div>
      </div>

      {/* About Section */}
      <Section
        background="left-card"
        className="[--s-i-top:-25px] sm:[--s-i-top:-40px]"
        iconPosition="right"
        icon={<SectionSticker />}
      >
        <div className="w-full">
          <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0">
            <Header>About Me</Header>

            <div className="max-w-[300px] w-full mx-auto md:mx-0 aspect-[4/4] relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 bg-white/40 dark:bg-white/5 transition-transform duration-500 ease-out ">
              <Image src="/images/og-home-4-4.jpg" alt="Lê Xuân Tiến" fill priority className="object-cover" />
            </div>
          </div>

          {/* Single responsive photo */}

          <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0">
            <p className="max-w-4xl text-lg lg:text-xl my-5 text-secondary dark:text-secondary-dark leading-normal">
              Hi, I’m Tiến — born in 1997, Scorpio, lowkeyyy and proud graduate of{' '}
              <Link href="https://uit.edu.vn/">UIT</Link>. I’ve always enjoyed making web stuff for fun, starting from
              tiny side projects to building apps that (hopefully) don’t break.
            </p>

            <p className="max-w-4xl text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
              Big fan of <Link href="/capybara-gif">capybaras</Link> — the chillest creatures alive — and I like to keep
              that same calm energy in my work. Outside the screen, you’ll often find me on a{' '}
              <Link href="https://www.youtube.com/playlist?list=PLVKjMj1m6Uneyx2xDPfC6gtzQUzxglk5Q">
                badminton court
              </Link>{' '}
              chasing the perfect jump smash, or lost in a <Link href="/my-reading-book">good book</Link> to recharge my
              brain.
            </p>

            <div className="max-w-[300px] w-full mx-auto md:mx-0 aspect-[4/4] relative overflow-hidden rounded-2xl shadow-sm ring-1 ring-black/5 bg-white/40 dark:bg-white/5 transition-transform duration-500 ease-out mt-5">
              <Image
                src="/images/home/badminton.png"
                alt="Lê Xuân Tiến on badminton"
                fill
                priority
                className="object-cover"
              />
            </div>

            <p className="max-w-4xl text-lg lg:text-xl text-secondary dark:text-secondary-dark mt-5 leading-normal">
              Today, I focus on building scalable, accessible, and user-friendly web apps as a full-stack developer.
              I’ve worked across the stack — from front-end frameworks to back-end systems — always learning, improving,
              and staying curious.
            </p>

            <p className="max-w-4xl text-lg lg:text-xl text-secondary dark:text-secondary-dark mt-5 leading-normal">
              Here are a few technologies I’ve been working with recently:
            </p>
            <ul className="ms-6 my-3 grid grid-cols-2 gap-x-[10px] px-2 mt-5 max-w-[400px] list-disc">
              {skills.map((skill, i) => (
                // eslint-disable-next-line react/jsx-pascal-case
                <LI key={i}>{skill}</LI>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section
        background="right-card"
        className="[--s-i-top:-25px] sm:[--s-i-top:-40px]"
        iconPosition="left"
        icon={<SectionSticker />}
      >
        <div className="w-full">
          <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0">
            <Header>My Nikki</Header>
            <p className="max-w-3xl text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
              A personal log of thoughts, progress, and life updates. This is where I share milestones, reflections, and
              moments that matter.
            </p>
          </div>

          <div className="mx-auto gap-4 flex flex-col max-w-4xl px-5 py-5 lg:px-0">
            {latestNikkiRoutes.map((entry) => (
              <NikkiCard key={entry.path} title={entry.title} url={entry.path} />
            ))}

            <div className="text-center">
              <Link className="underline" href="/docs/nikki">
                Read more
              </Link>
            </div>
          </div>
        </div>
      </Section>
      {/*  */}
      <Section
        background="left-card"
        className="[--s-i-top:-25px] sm:[--s-i-top:-40px]"
        iconPosition="right"
        icon={<SectionSticker />}
      >
        <div className="w-full">
          <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0">
            <Header>Blog</Header>
            <p className="max-w-3xl text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
              Anything important, including release notes or deprecation notices, will be posted here first.
            </p>
          </div>

          <div className="mx-auto gap-4 flex flex-col max-w-4xl px-5 py-5 lg:px-0">
            {latestBlogRoutes.map((entry) => (
              <NikkiCard key={entry.path} title={entry.title} url={entry.path} />
            ))}
            <div className="text-center">
              <Link className="underline" href="/docs/blog">
                Read more
              </Link>
            </div>
          </div>
        </div>
      </Section>
      <Section
        background="right-card"
        className="[--s-i-top:-25px] sm:[--s-i-top:-40px]"
        iconPosition="left"
        icon={<SectionSticker />}
      >
        <div className="w-full">
          <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0">
            <Header>Photos</Header>
            <p className="max-w-4xl text-lg lg:text-xl my-5 text-secondary dark:text-secondary-dark leading-normal">
              A journey in snapshots — from the first giggles, through curious adventures, to the person I’ve grown into
              now.
            </p>
          </div>

          <CommunityGallery communityMedia={communityMedia} />
        </div>
      </Section>
    </div>
  );
}
