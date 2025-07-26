import React, { Children, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { usePathname } from 'next/navigation';

import { H2, H4 } from '../heading';

import { Challenge } from './challenge';
import { Navigation } from './navigation';

const parseChallengeContents = (children) => {
  const contents = [];

  if (!children) {
    return contents;
  }

  let challenge = {};
  let content = [];
  Children.forEach(children, (child) => {
    const { props, type } = child;
    switch (type.mdxName) {
      case 'Solution': {
        challenge.solution = child;
        challenge.content = content;
        contents.push(challenge);
        challenge = {};
        content = [];
        break;
      }
      case 'Hint': {
        challenge.hint = child;
        break;
      }
      case 'h4': {
        challenge.order = contents.length + 1;
        challenge.name = props.children;
        challenge.id = props.id;
        break;
      }
      default: {
        content.push(child);
      }
    }
  });

  return contents;
};

const QueuedScroll = {
  INIT: 'init',
  NEXT: 'next',
};

export function Challenges({
  children,
  isRecipes,
  noTitle,
  titleText = isRecipes ? 'Try out some examples' : 'Try out some challenges',
  titleId = isRecipes ? 'examples' : 'challenges',
}) {
  const challenges = parseChallengeContents(children);
  const totalChallenges = challenges.length;
  const scrollAnchorRef = useRef(null);
  const queuedScrollRef = useRef(QueuedScroll.INIT);
  const [activeIndex, setActiveIndex] = useState(0);
  const currentChallenge = challenges[activeIndex];
  const asPath = usePathname();

  useEffect(() => {
    if (queuedScrollRef.current === QueuedScroll.INIT) {
      const initIndex = challenges.findIndex((challenge) => challenge.id === asPath.split('#')[1]);
      if (initIndex === -1) {
        queuedScrollRef.current = undefined;
      } else if (initIndex !== activeIndex) {
        setActiveIndex(initIndex);
      }
    }
    if (queuedScrollRef.current) {
      scrollAnchorRef.current.scrollIntoView({
        block: 'start',
        ...(queuedScrollRef.current === QueuedScroll.NEXT && {
          behavior: 'smooth',
        }),
      });
      queuedScrollRef.current = undefined;
    }
  }, [activeIndex, asPath, challenges]);

  const handleChallengeChange = (index) => {
    setActiveIndex(index);
  };

  const Heading = isRecipes ? H4 : H2;
  return (
    <div className="max-w-7xl mx-auto py-4 w-full">
      <div
        className={cn(
          'border-gray-10 bg-card dark:bg-card-dark shadow-inner rounded-none -mx-5 sm:mx-auto sm:rounded-2xl',
        )}
      >
        <div ref={scrollAnchorRef} className="py-2 px-5 sm:px-8 pb-0 md:pb-0">
          {!noTitle && (
            <Heading
              id={titleId}
              className={cn(
                'mb-2 leading-10 relative',
                isRecipes ? 'text-xl text-purple-50 dark:text-purple-30' : 'text-3xl text-link',
              )}
            >
              {titleText}
            </Heading>
          )}
          {totalChallenges > 1 && (
            <Navigation
              currentChallenge={currentChallenge}
              challenges={challenges}
              handleChange={handleChallengeChange}
              isRecipes={isRecipes}
            />
          )}
        </div>
        <Challenge
          key={currentChallenge.id}
          isRecipes={isRecipes}
          currentChallenge={currentChallenge}
          totalChallenges={totalChallenges}
          hasNextChallenge={activeIndex < totalChallenges - 1}
          handleClickNextChallenge={() => {
            setActiveIndex((i) => i + 1);
            queuedScrollRef.current = QueuedScroll.NEXT;
          }}
        />
      </div>
    </div>
  );
}
