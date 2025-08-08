'use client';

import { Section } from '@/features/home/components/section';
import { getStickerInfo } from '@/features/line-sticker-downloader/utils/download';

export default async function LineDownloadPage() {
  const data = await getStickerInfo('https://store.line.me/stickershop/product/35705/en');

  console.log({ data });

  return (
    <div className="ps-0">
      <Section background="left-card">
        <div className="w-full">
          <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0">{/* <LineDownloader /> */}</div>
        </div>
      </Section>
    </div>
  );
}
