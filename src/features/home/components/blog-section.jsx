import Image from 'next/image';

import Link from '@/components/MDX/link';
import blogJson from '@/configs/sidebarBlog.json';

import { Header } from './header';
import { Section } from './section';
import { SectionSticker } from './section-sticker';

const title = 'Blog';
const description = 'Anything important, including release notes or deprecation notices, will be posted here first.';

export const BlogSection = () => {
  const latestBlogRoutes = [...blogJson.routes[0].routes].slice(0, 5);

  return (
    <Section
      background="left-card"
      className="[--s-i-top:-25px] sm:[--s-i-top:-40px]"
      iconPosition="right"
      icon={<SectionSticker />}
    >
      <div className="w-full">
        <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0">
          <Header num="03">{title}</Header>
          <p className="max-w-3xl text-lg lg:text-xl text-secondary dark:text-secondary-dark leading-normal">
            {description}
          </p>
        </div>

        <div className="mx-auto gap-4 flex flex-col max-w-4xl px-5 py-5 lg:px-0">
          {latestBlogRoutes.map((entry) => (
            <BlogCard
              key={entry.path}
              title={entry.title}
              url={entry.path}
              date={entry.date}
              image={entry.image}
              description={entry.description}
            />
          ))}
          <div className="text-center">
            <Link className="underline" href="/docs/blog">
              Read more
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
};

function BlogCard({ title, date, url, image, description }) {
  return (
    <Link
      href={url}
      passHref
      className="block h-full w-full rounded-2xl outline-none focus:outline-none focus-visible:outline focus-visible:outline-link focus:outline-offset-2 focus-visible:dark:focus:outline-link-dark"
    >
      <div className="flex flex-col h-full w-full cursor-pointer rounded-2xl shadow-secondary-button-stroke dark:shadow-secondary-button-stroke-dark hover:bg-gray-40/5 active:bg-gray-40/10 hover:dark:bg-gray-60/5 active:dark:bg-gray-60/10">
        {/* Image Section */}
        {image && (
          <div className="relative w-full h-48 sm:h-56 lg:h-72 rounded-t-2xl overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        {/* Content Section */}
        <div className="flex flex-col justify-between flex-1 p-5 sm:p-6 text-xl text-primary dark:text-primary-dark leading-relaxed">
          <div className="flex flex-row gap-3 w-full">
            <h2 className="font-semibold flex-1 text-2xl lg:text-3xl hover:underline leading-snug mb-4">{title}</h2>
          </div>

          <div>
            <div className="flex flex-row justify-start gap-2 items-center text-base text-tertiary dark:text-tertiary-dark">
              {date}
            </div>
            <span className="text-base text-secondary dark:text-secondary-dark">{description}</span>
            {description && (
              <div className="text-link text-base dark:text-link-dark hover:underline mt-4">Read more</div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
