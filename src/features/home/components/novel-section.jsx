import Link from '@/components/MDX/link';

import { Header } from './header';
import { Section } from './section';
import { SectionSticker } from './section-sticker';

const title = 'Novel';
const description = ' In my spare time, I translate light novels into Vietnamese';

export const NovelSection = () => {
  return (
    <Section
      background="right-card"
      className="[--s-i-top:-25px] sm:[--s-i-top:-40px]"
      iconPosition="left"
      icon={<SectionSticker />}
    >
      <div className="w-full">
        <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0">
          <Header>{title}</Header>
          <p className="max-w-3xl text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
            {description}
          </p>
        </div>

        <div className="mx-auto gap-4 flex flex-col max-w-4xl px-5 py-5 lg:px-0">
          <NovelCard title="To haru" url="/docs/novel/to-haru" />
          <NovelCard title="Mizu Zokusei no Mahoutsukai" url="/docs/novel/mizu-zokusei-no-mahoutsukai" />
        </div>
      </div>
    </Section>
  );
};

const NovelCard = ({ title, url }) => {
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
