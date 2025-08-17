import * as React from 'react';
import Link from 'next/link';

function NikkiCard({ title, url }) {
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
}

export default NikkiCard;
