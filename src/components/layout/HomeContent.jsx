/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

'use client';

import { memo, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import cn from 'classnames';

import ButtonLink from '../button-link';
import { BiLogoGithub } from '../icon/bo/BiLogoGithub';
import { Logo } from '../logo';
import Link from '../MDX/link';

function Section({ children, background = null }) {
  return (
    <div
      className={cn(
        'mx-auto flex flex-col w-full',
        background === null && 'max-w-7xl',
        background === 'left-card' &&
          'bg-gradient-left dark:bg-gradient-left-dark border-t border-primary/10 dark:border-primary-dark/10 ',
        background === 'right-card' &&
          'bg-gradient-right dark:bg-gradient-right-dark border-t border-primary/5 dark:border-primary-dark/5',
      )}
      style={{
        contain: 'content',
      }}
    >
      <div className="flex-col gap-2 flex grow w-full my-20 lg:my-32 mx-auto items-center">{children}</div>
    </div>
  );
}

function Header({ children }) {
  return (
    <h2 className="leading-xl font-display text-primary dark:text-primary-dark font-semibold text-5xl lg:text-6xl -mt-4 mb-7 w-full max-w-3xl lg:max-w-xl">
      {children}
    </h2>
  );
}

function Para({ children }) {
  return (
    <p className="max-w-3xl mx-auto text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
      {children}
    </p>
  );
}

function Center({ children }) {
  return (
    <div className="px-5 lg:px-0 max-w-4xl lg:text-center text-white text-opacity-80 flex flex-col items-center justify-center">
      {children}
    </div>
  );
}

export function HomeContent() {
  return (
    <div className="ps-0">
      <Section>
        <div className="px-5 lg:px-0">
          <div style={{ opacity: 1, transform: 'none' }}>
            <div>
              <h2 className="leading-xl font-display text-primary dark:text-primary-dark font-semibold text-5xl lg:text-6xl -mt-4 mb-7 w-full max-w-3xl">
                Software engineer, technical writer & open-source maintainer
              </h2>
              <Para>
                I'm Le Xuan Tien, an experienced frontend developer passionate about learning and building open-source
                software that is beneficial to developers and the world at large.
              </Para>
            </div>
          </div>
          <div style={{ opacity: 1, transform: 'none' }}>
            <div>
              <ul className="flex items-center flex-wrap gap-x-5 gap-y-4 my-10">
                <li>
                  <Link
                    className="flex items-center border-b dark:border-b-zinc-800 border-zinc-200 group"
                    href="https://github.com/tienlx97"
                  >
                    Next.js
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
      <Section background="left-card">
        <div className="w-full">
          <div className="mx-auto flex flex-col max-w-4xl">
            <Center>
              <Header>
                Join a community <br className="hidden lg:inline" />
                of millions
              </Header>
              <Para>
                You’re not alone. Two million developers from all over the world visit the React docs every month. React
                is something that people and teams can agree on.
              </Para>
            </Center>
          </div>
          <CommunityGallery />
          <div className="mx-auto flex flex-col max-w-4xl">
            <Center>
              <Para>
                This is why React is more than a library, an architecture, or even an ecosystem. React is a community.
                It’s a place where you can ask for help, find opportunities, and meet new friends. You will meet both
                developers and designers, beginners and experts, researchers and artists, teachers and students. Our
                backgrounds may be very different, but React lets us all create user interfaces together.
              </Para>
            </Center>
          </div>
        </div>

        <div className="mt-20 px-5 lg:px-0 mb-6 max-w-4xl text-center text-opacity-80">
          <Logo className="uwu-hidden text-brand dark:text-brand-dark w-24 lg:w-28 mb-10 lg:mb-8 mt-12 h-auto mx-auto self-start" />
          <Header>
            Welcome to the <br className="hidden lg:inline" />
            React community
          </Header>
          <ButtonLink href="/learn" type="primary" size="lg" label="Take the Tutorial">
            Get Started
          </ButtonLink>
        </div>
      </Section>
    </div>
  );
}

const communityImages = [
  {
    src: '/images/home/community/react_conf_fun.webp',
    alt: 'People singing karaoke at React Conf',
  },
  {
    src: '/images/home/community/react_india_sunil.webp',
    alt: 'Sunil Pai speaking at React India',
  },
  {
    src: '/images/home/community/react_conf_hallway.webp',
    alt: 'A hallway conversation between two people at React Conf',
  },
  {
    src: '/images/home/community/react_india_hallway.webp',
    alt: 'A hallway conversation at React India',
  },
  {
    src: '/images/home/community/react_conf_elizabet.webp',
    alt: 'Elizabet Oliveira speaking at React Conf',
  },
  {
    src: '/images/home/community/react_india_selfie.webp',
    alt: 'People taking a group selfie at React India',
  },
  {
    src: '/images/home/community/react_conf_nat.webp',
    alt: 'Nat Alison speaking at React Conf',
  },
  {
    src: '/images/home/community/react_india_team.webp',
    alt: 'Organizers greeting attendees at React India',
  },
];

function CommunityGallery() {
  const ref = useRef();

  const [shouldPlay, setShouldPlay] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShouldPlay(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: `${window.innerHeight}px 0px`,
      },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const [isLazy, setIsLazy] = useState(true);
  // Either wait until we're scrolling close...
  useEffect(() => {
    if (!isLazy) {
      return;
    }
    // eslint-disable-next-line radix
    const rootVertical = parseInt(window.innerHeight * 2.5);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLazy(false);
          }
        });
      },
      {
        root: null,
        rootMargin: `${rootVertical}px 0px`,
      },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isLazy]);
  // ... or until it's been a while after hydration.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLazy(false);
    }, 20 * 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div ref={ref} className="relative flex overflow-x-hidden overflow-y-visible w-auto">
      <div
        className="w-full py-12 lg:py-20 whitespace-nowrap flex flex-row animate-marquee lg:animate-large-marquee"
        style={{
          animationPlayState: shouldPlay ? 'running' : 'paused',
        }}
      >
        <CommunityImages isLazy={isLazy} />
      </div>
      <div
        aria-hidden="true"
        className="w-full absolute top-0 py-12 lg:py-20 whitespace-nowrap flex flex-row animate-marquee2 lg:animate-large-marquee2"
        style={{
          animationPlayState: shouldPlay ? 'running' : 'paused',
        }}
      >
        <CommunityImages isLazy={isLazy} />
      </div>
    </div>
  );
}

const CommunityImages = memo(({ isLazy }) => {
  return (
    <>
      {communityImages.map(({ src, alt }, i) => (
        <div key={i} className={cn(`group flex justify-center px-5 min-w-[50%] lg:min-w-[25%] rounded-2xl relative`)}>
          <div
            className={cn(
              'h-auto relative rounded-2xl overflow-hidden before:-skew-x-12 before:absolute before:inset-0 before:-translate-x-full group-hover:before:animate-[shimmer_1s_forwards] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent transition-all ease-in-out duration-300',
              i % 2 === 0
                ? 'rotate-2 group-hover:rotate-[-1deg] group-hover:scale-110 group-hover:shadow-lg lg:group-hover:shadow-2xl'
                : 'group-hover:rotate-1 group-hover:scale-110 group-hover:shadow-lg lg:group-hover:shadow-2xl rotate-[-2deg]',
            )}
          >
            <img
              loading={isLazy ? 'lazy' : 'eager'}
              src={src}
              alt={alt}
              className="aspect-[4/3] h-full w-full flex object-cover rounded-2xl bg-gray-10 dark:bg-gray-80"
            />
          </div>
        </div>
      ))}
    </>
  );
});

//

const socialLinks = [
  {
    id: 1,
    name: 'GitHub',
    url: 'https://github.com/Evavic44',
    icon: BiLogoGithub,
    status: 'social',
  },
  {
    id: 2,
    name: 'X',
    url: 'https://twitter.com/victorekea',
    icon: FaSquareXTwitter,
    status: 'social',
  },
  {
    id: 3,
    name: 'Linkedin',
    url: 'https://linkedin.com/in/victorekeawa',
    icon: BiLogoLinkedinSquare,
    status: 'social',
  },
  {
    id: 4,
    name: 'Codepen',
    url: 'https://codepen.io/evavic44',
    icon: BiLogoCodepen,
    status: 'social',
  },
  {
    id: 5,
    name: 'Dribbble',
    url: 'https://dribbble.com/victoreke',
    icon: BiLogoDribbble,
    status: 'social',
  },
  {
    id: 6,
    name: 'Instagram',
    url: 'https://instagram.com/victorekea',
    icon: BiLogoInstagram,
    status: 'social',
  },
  {
    id: 7,
    name: 'Steam',
    url: 'https://steamcommunity.com/id/victoreke/',
    icon: BiLogoSteam,
    status: 'social',
  },
  {
    id: 8,
    name: 'Unsplash',
    url: 'https://unsplash.com/@victoreke',
    icon: BiLogoUnsplash,
    status: 'social',
  },
  {
    id: 9,
    name: 'FreeCodeCamp',
    url: 'https://freecodecamp.org/news/author/victoreke/',
    icon: FaFreeCodeCamp,
    status: 'publication',
  },
  {
    id: 10,
    name: 'Hashnode',
    url: 'https://eke.hashnode.dev',
    icon: FaHashnode,
    status: 'publication',
  },
  {
    id: 11,
    name: 'Sanity',
    url: 'https://www.sanity.io/exchange/community/victoreke',
    icon: FaHashtag,
    status: 'publication',
  },
  {
    id: 12,
    name: 'Youtube',
    url: 'https://youtube.com/@victorekea',
    icon: BiLogoYoutube,
    status: 'social',
  },
  {
    id: 13,
    name: 'Daily.dev',
    url: 'https://app.daily.dev/eke',
    icon: BiLinkExternal,
    status: 'social',
  },
  {
    id: 14,
    name: 'Producthunt',
    url: 'https://www.producthunt.com/@victorekea',
    icon: FaProductHunt,
    status: 'social',
  },
  {
    id: 15,
    name: 'Stackoverflow',
    url: 'https://stackoverflow.com/users/14021166/victor-eke',
    icon: BiLogoStackOverflow,
    status: 'social',
  },
  {
    id: 16,
    name: 'Codewars',
    url: 'https://www.codewars.com/users/victoreke',
    icon: SiCodewars,
    status: 'social',
  },
  {
    id: 17,
    name: 'Gitlab',
    url: 'https://gitlab.com/victoreke',
    icon: BiLogoGitlab,
    status: 'social',
  },
];
