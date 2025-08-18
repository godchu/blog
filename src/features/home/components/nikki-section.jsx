import Link from '@/components/MDX/link';

import nikkiJson from '../../../configs/sidebarNikki.json';

import { Header } from './header';
import { Section } from './section';
import { SectionSticker } from './section-sticker';

const title = 'My Nikki';
const description =
  'A personal log of thoughts, progress, and life updates. This is where I share milestones, reflections, and moments that matter.';

export const NikkiSection = () => {
  const latestNikkiRoutes = [...nikkiJson.routes[0].routes]
    .sort(
      (a, b) =>
        new Date(b.path.split('/').pop().split('-').reverse().join('-')) -
        new Date(a.path.split('/').pop().split('-').reverse().join('-')),
    )
    .slice(0, 5);

  return (
    <Section
      background="right-card"
      className="[--s-i-top:-25px] sm:[--s-i-top:-40px]"
      iconPosition="left"
      icon={<SectionSticker />}
    >
      <div className="w-full">
        <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0">
          <Header num="02">{title}</Header>
          <p className="max-w-3xl text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
            {description}
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
  );
};

const NikkiCard = ({ title, url }) => {
  return (
    <Link
      href={url}
      className="block h-full w-full rounded-2xl focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 focus-visible:dark:focus:outline-link-dark hover:underline"
      aria-label={`Read entry: ${title}`}
    >
      <div className="flex flex-col h-full w-full rounded-2xl cursor-pointer shadow-secondary-button-stroke dark:shadow-secondary-button-stroke-dark hover:bg-gray-40/5 active:bg-gray-40/10 hover:dark:bg-gray-60/5 active:dark:bg-gray-60/10">
        <div className="flex flex-col justify-between flex-1 p-5 sm:p-6 text-primary dark:text-primary-dark">
          <h2 className="max-w-3xl text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
            {title}
          </h2>
        </div>
      </div>
    </Link>
  );
};
