import { memo } from 'react';
import cn from 'classnames';

export const CommunityImages = memo(({ isLazy, communityMedia }) => {
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
              // <video
              //   src={src}
              //   muted
              //   loop
              //   playsInline
              //   autoPlay={!isLazy}
              //   preload={isLazy ? 'none' : 'auto'}
              //   className="aspect-[4/3] h-full w-full object-cover rounded-2xl bg-gray-10 dark:bg-gray-80"
              // />
              <video
                src={src}
                muted
                playsInline
                loop
                autoPlay
                preload={isLazy ? 'none' : 'auto'}
                poster="/images/home/hero/video-poster.png"
                onLoadedData={(e) => {
                  const video = e.currentTarget;
                  // Safari sometimes needs explicit play call
                  if (video.paused) {
                    video.play().catch(() => {});
                  }
                }}
                className="aspect-[4/3] h-full w-full object-cover rounded-2xl bg-gray-10 dark:bg-gray-80"
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
});
