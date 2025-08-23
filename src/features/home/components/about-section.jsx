import React from 'react';
import Image from 'next/image';

// import { IconGolang } from '@/components/icon/icon-golang';
// import { IconJavascript } from '@/components/icon/icon-javascript';
// import { IconNodejs } from '@/components/icon/icon-nodejs';
// import { IconReact } from '@/components/icon/icon-react';
// import { IconReactNative } from '@/components/icon/icon-react-native';
// import { IconTypescript } from '@/components/icon/icon-typescript';
// import { ExternalLink } from '@/components/MDX/external-link';
import Link from '@/components/MDX/link';
import { LI } from '@/components/MDX/list';

import { Header } from './header';
import { Section } from './section';
import { SectionSticker } from './section-sticker';

const skills = ['JavaScript', 'TypeScript', 'Node.js', 'Golang', 'React', 'React Native'];

// const skills = [
//   <IconJavascript width="36px" height="36px" />,
//   <IconTypescript width="32px" height="32px" />,
//   <IconNodejs width="32px" height="32px" />,
//   <IconGolang width="32px" height="32px" />,
//   <IconReact width="32px" height="32px" />,
//   <IconReactNative width="32px" height="32px" />,
// ];

// const socialLinkClasses = 'hover:text-primary dark:text-primary-dark';

export const AboutSection = ({ num }) => {
  return (
    <Section
      background="left-card"
      className="[--s-i-top:-25px] sm:[--s-i-top:-40px]"
      iconPosition="right"
      icon={<SectionSticker />}
    >
      <div className="w-full">
        <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0">
          <Header num={num}>About Me</Header>

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
            <Link href="https://www.youtube.com/playlist?list=PLVKjMj1m6Uneyx2xDPfC6gtzQUzxglk5Q">badminton court</Link>{' '}
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
            Today, I focus on building scalable, accessible, and user-friendly web apps as a full-stack developer. I’ve
            worked across the stack — from front-end frameworks to back-end systems — always learning, improving, and
            staying curious.
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

          {/* <div className="flex flex-row items-center gap-x-3 mt-5">
            {skills.map((skill, i) => (
              <React.Fragment key={i}>{skill}</React.Fragment>
            ))}
          </div> */}
        </div>
      </div>
    </Section>
  );
};
