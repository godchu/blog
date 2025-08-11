import { useState } from 'react';
import cn from 'classnames';

import { getStickerInfo } from '../utils/download';

export const LineDownloader = () => {
  const [url, setUrl] = useState('https://store.line.me/emojishop/product/65e1933065bd7b66653c90f9/en');

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const onDownload = async (e) => {
    e.preventDefault();
    const data = await getStickerInfo(url);

    console.log({ data });
  };

  return (
    <>
      <h1 className="leading-xl font-display text-primary dark:text-primary-dark font-semibold text-5xl lg:text-6xl -mt-4 mb-10 w-full">
        🚀 Line Sticker Downloader 🚀
      </h1>
      <input
        value={url}
        onChange={handleChange}
        placeholder="Example: https://store.line.me/stickershop/product/35705/en"
        className="flex 3xl:w-[56rem] 3xl:mx-0 relative ps-4 pe-1 py-1 h-10 bg-gray-30/20 dark:bg-gray-40/20 outline-none focus:outline-link betterhover:hover:bg-opacity-80 pointer items-center text-start w-full text-gray-30 rounded-xl align-middle text-base"
      />
      <div className="mt-6">
        <button
          disabled={!url.trim()}
          className={cn('px-4 py-1 h-10 rounded-xl pointer text-base transition-opacity', {
            'bg-brand dark:bg-brand-dark betterhover:hover:bg-opacity-90 dark:text-[#003544] text-white': url.trim(),
            'bg-gray-30/20 dark:bg-gray-40/20 opacity-80 cursor-not-allowed text-gray-30 dark:text-gray-30':
              !url.trim(),
          })}
          onClick={onDownload}
        >
          Download
        </button>
      </div>
    </>
  );
};
