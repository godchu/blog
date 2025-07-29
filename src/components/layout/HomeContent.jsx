/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

'use client';

import { memo, useEffect, useRef, useState } from 'react';
import * as React from 'react';
import cn from 'classnames';

import Link from '../MDX/link';
import { LI } from '../MDX/list';

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

export function HomeContent() {
  return (
    <div className="ps-0">
      <div className="mx-auto flex flex-col w-full max-w-7xl">
        <div className="flex-col gap-2 flex grow w-full my-20 lg:my-32 mx-auto items-center">
          <div className="px-5 lg:px-0 w-full h-auto max-w-4xl">
            <h1 className="font-display text-[clamp(14px,5vw,16px)] md:mb-[30px] md:ml-[4px] mb-[15px] ml-[2px] text-link dark:text-link-dark leading-normal">
              Hi, my name is
            </h1>
            <h2 className="font-sans text-primary dark:text-primary-dark font-semibold text-[clamp(40px,8vw,80px)] m-0 leading-[1.1]">
              Lê Xuân Tiến.
            </h2>
            <h3 className="font-sans font-semibold text-[clamp(40px,8vw,80px)] m-0 mt-[5px] leading-[0.9]">
              I build software and handle exports.
            </h3>
            <p className="mt-5 max-w-[540px] ">
              I’m a <b>Full‑stack</b> developer and <b>import–export</b> documentation specialist at{' '}
              <Link href="https://dainghiasteel.com/">Dai Nghia Steel</Link>, where I create accessible digital products
              and handle customs paperwork for the company’s shipments.
            </p>
          </div>
        </div>
      </div>
      <Section background="left-card">
        <div className="w-full">
          <div className="mx-auto flex flex-col max-w-4xl">
            <div className="px-5 lg:px-0 w-full h-auto max-w-4xl">
              <Header>About Me</Header>
              <p className="max-w-3xl text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
                Hello! My name is Tiến and I build things for the web. My interest in web development started when I
                began experimenting with small projects — and over time, that curiosity grew into building scalable,
                user‑friendly web applications.
              </p>
            </div>
          </div>
          <CommunityGallery />
          <div className="mx-auto flex flex-col max-w-4xl">
            <div className="px-5 lg:px-0 w-full h-auto max-w-4xl">
              <p className="max-w-3xl text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
                Fast‑forward to today, my main focus is building scalable, accessible, and user‑friendly web
                applications as a full‑stack developer. Over the years, I’ve explored various aspects of development,
                from front‑end frameworks to back‑end systems, constantly improving my skills.
              </p>
              <br />
              <p className="max-w-3xl text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
                In my spare time, I enjoy <b className="text-link dark:text-link-dark">reverse engineering</b>{' '}
                Facebook’s UI as a personal challenge and a way to explore modern front‑end architecture.
              </p>
              <br />
              <p className="max-w-3xl text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
                Here are a few technologies I’ve been working with recently:
              </p>

              <ul className="ms-6 my-3 grid grid-cols-2 gap-x-[10px] gap-y-0 p-0 px-2 mt-5 mb-0  max-w-[400px] list-disc">
                {/* eslint-disable-next-line react/jsx-pascal-case */}
                {skills && skills.map((skill, i) => <LI key={i}>{skill}</LI>)}
              </ul>
            </div>
          </div>
        </div>
      </Section>
      {/* <Section background="right-card">
        <div className="w-full">
          <div className="mx-auto flex flex-col max-w-4xl">
            <div className="px-5 lg:px-0 w-full h-auto max-w-4xl">
              <Header>About Me</Header>
            </div>
          </div>
        </div>
      </Section> */}
    </div>
  );
}

const skills = ['JavaScript', 'TypeScript', 'Node.js', 'Golang', 'React', 'React Native'];

const communityMedia = [
  {
    src: '/images/home/hero/1.jpg',
    alt: 'Le Xuan Tien',
    type: 'image',
  },
  {
    src: '/images/home/hero/2.jpg',
    alt: 'Le Xuan Tien',
    type: 'image',
  },
  {
    src: '/images/home/hero/v1.mp4',
    alt: 'Le Xuan Tien',
    type: 'video',
  },
  {
    src: '/images/home/hero/4.jpg',
    alt: 'Le Xuan Tien',
    type: 'image',
  },
  {
    src: '/images/home/hero/6.jpg',
    alt: 'Le Xuan Tien',
    type: 'image',
  },
  {
    src: '/images/home/hero/5.jpg',
    alt: 'Le Xuan Tien',
    type: 'image',
  },
  {
    src: '/images/home/hero/3.jpg',
    alt: 'Le Xuan Tien',
    type: 'image',
  },
  {
    src: '/images/home/hero/7.jpg',
    alt: 'Le Xuan Tien',
    type: 'image',
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
      {communityMedia.map(({ type, src, alt }, i) => (
        <div key={i} className={cn('group flex justify-center px-5 min-w-[50%] lg:min-w-[25%] rounded-2xl relative')}>
          <div
            className={cn(
              'h-auto relative rounded-2xl overflow-hidden before:-skew-x-12 before:absolute before:inset-0 before:-translate-x-full group-hover:before:animate-[shimmer_1s_forwards] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent transition-all ease-in-out duration-300',
              i % 2 === 0
                ? 'rotate-2 group-hover:rotate-[-1deg] group-hover:scale-110 group-hover:shadow-lg lg:group-hover:shadow-2xl'
                : 'group-hover:rotate-1 group-hover:scale-110 group-hover:shadow-lg lg:group-hover:shadow-2xl rotate-[-2deg]',
            )}
          >
            {type === 'image' ? (
              <img
                loading={isLazy ? 'lazy' : 'eager'}
                src={src}
                alt={alt}
                className="aspect-[4/3] h-full w-full object-cover rounded-2xl bg-gray-10 dark:bg-gray-80"
              />
            ) : (
              <video
                src={src}
                muted
                loop
                playsInline
                autoPlay={!isLazy}
                preload={isLazy ? 'none' : 'auto'}
                className="aspect-[4/3] h-full w-full object-cover rounded-2xl bg-gray-10 dark:bg-gray-80"
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
});

//
