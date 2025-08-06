import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';

function BlogCard({ title, badge, date, icon, url, image, children }) {
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
              {icon === 'labs' && (
                <svg className="w-6 h-6" viewBox="0 0 72 72" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M27.4865 9C25.8297 9 24.4865 10.3431..."
                    fill="currentColor"
                  />
                </svg>
              )}
              {icon === 'blog' && (
                <svg className="w-6 h-6" viewBox="0 0 72 72" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.7101 56.3758C13.0724..." fill="currentColor" />
                </svg>
              )}
              {date}
              {badge && (
                <div className="h-fit px-1 bg-highlight dark:bg-highlight-dark rounded uppercase text-link dark:text-link-dark font-bold tracking-wide text-xs whitespace-nowrap">
                  New
                </div>
              )}
            </div>
            <span className="text-base text-secondary dark:text-secondary-dark">{children}</span>
            {children && <div className="text-link text-base dark:text-link-dark hover:underline mt-4">Read more</div>}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BlogCard;
