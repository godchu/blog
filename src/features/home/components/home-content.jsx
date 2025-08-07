import { Animated } from '@/components/common/animated/animated';
import NikkiCard from '@/components/common/comment/nikki-card';
import Link from '@/components/MDX/link';
import { LI } from '@/components/MDX/list';
import { communityMedia } from '@/configs/home';

import nikkiJson from '../../../configs/sidebarNikki.json';

import { CommunityGallery } from './community-gallery';
import { Header } from './header';
import { Section } from './section';

const skills = ['JavaScript', 'TypeScript', 'Node.js', 'Golang', 'React', 'React Native'];

export function HomeContent() {
  const latestNikkiRoutes = [...nikkiJson.routes[0].routes]
    .sort(
      (a, b) =>
        new Date(b.path.split('/').pop().split('-').reverse().join('-')) -
        new Date(a.path.split('/').pop().split('-').reverse().join('-')),
    )
    .slice(0, 5);

  return (
    <div className="ps-0">
      <Animated name="hibi" type="capybara" />
      {/* Intro Section */}
      <div className="mx-auto flex flex-col w-full max-w-7xl">
        <div className="flex-col gap-2 flex grow w-full my-20 lg:my-32 mx-auto items-center">
          <div className="px-5 lg:px-0 w-full h-auto max-w-4xl">
            <h1 className="font-display text-[clamp(14px,5vw,16px)] text-link dark:text-link-dark mb-[15px] md:mb-[30px] leading-normal">
              Hi, my name is
            </h1>
            <h2 className="font-sans text-primary dark:text-primary-dark font-semibold text-[clamp(40px,8vw,80px)] leading-[1.1]">
              Lê Xuân Tiến.
            </h2>
            <h3 className="font-sans font-semibold text-[clamp(40px,8vw,80px)] mt-[5px] leading-[0.9]">
              I build software and handle exports.
            </h3>
            <p className="mt-5 max-w-[540px]">
              I’m a <b>Full‑stack</b> developer and <b>import–export</b> documentation specialist at{' '}
              <Link href="https://dainghiasteel.com/">Dai Nghia Steel</Link>, where I create accessible digital products
              and handle customs paperwork for the company’s shipments.
              <span className="block text-sm mt-2 opacity-70">(also quietly operating as capybara boy 🐾)</span>
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <Section background="left-card">
        <div className="w-full">
          <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0">
            <Header>About Me</Header>
            <p className="max-w-3xl text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
              Hello! My name is Tiến and I build things for the web. My interest in web development started when I began
              experimenting with small projects — and over time, that curiosity grew into building scalable,
              user‑friendly web applications.
            </p>
          </div>

          <CommunityGallery communityMedia={communityMedia} />

          <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0">
            <p className="max-w-3xl text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
              Fast‑forward to today, my main focus is building scalable, accessible, and user‑friendly web applications
              as a full‑stack developer. Over the years, I’ve explored various aspects of development, from front‑end
              frameworks to back‑end systems, constantly improving my skills.
            </p>
            <p className="max-w-3xl text-lg lg:text-xl text-secondary dark:text-secondary-dark mt-5 leading-normal">
              In my spare time, I enjoy <b className="text-link dark:text-link-dark">reverse engineering</b> Facebook’s
              UI as a personal challenge and a way to explore modern front‑end architecture.
            </p>
            <p className="max-w-3xl text-lg lg:text-xl text-secondary dark:text-secondary-dark mt-5 leading-normal">
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

      <Section background="right-card">
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
          </div>
        </div>
      </Section>
      <Section background="left-card">
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
          </div>
        </div>
      </Section>
    </div>
  );
}
