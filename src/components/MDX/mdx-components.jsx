/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import cn from 'classnames';

import { finishedTranslations } from '@/utils/finished-translations';

import ButtonLink from '../button-link';
import { IconCanary } from '../icon/icon-canary';
import { IconNavArrow } from '../icon/icon-nav-arrow';

import { NCTIframe } from './embed/nct-iframe';
import { Spotify } from './embed/spotify';
import { YouTubeIframe } from './embed/youtube-iframe';
import { ZingIframe } from './embed/zing-iframe';
import { Novel } from './novel/novel';
import BlogCard from './blog-card';
// import { Challenges, Hint, Solution } from './challenges';
import CodeBlock from './code-block';
import { CodeDiagram } from './code-diagram';
import { ConsoleBlock, ConsoleBlockMulti, ConsoleLogLine } from './console-block';
import Diagram from './diagram';
import DiagramGroup from './diagram-group';
import ErrorDecoder from './error-decoder';
import ExpandableCallout from './expandable-callout';
import ExpandableExample from './expandable-example';
import { H1, H2, H3, H4, H5 } from './heading';
import { Illustration, IllustrationBlock } from './illustration';
import InlineCode from './inline-code';
import { ImageGallery } from './inline-gallery';
import { InlineToc } from './inline-toc';
import Intro from './intro';
import { LanguagesContext } from './languages-context';
import Link from './link';
import { LI, OL, UL } from './list';
import { PackageImport } from './package-import';
import Recap from './recap';
import Sandpack from './sandpack';
import SandpackWithHTMLOutput from './sandpack-with-HTML-output';
import SimpleCallout from './simple-callout';
import { TeamMember } from './team-member';
import TerminalBlock from './terminal-block';
import YouWillLearnCard from './you-will-learn-card';

function CodeStep({ children, step }) {
  return (
    <span
      data-step={step}
      className={cn(
        'code-step bg-opacity-10 dark:bg-opacity-20 relative rounded px-[6px] py-[1.5px] border-b-[2px] border-opacity-60',
        {
          'bg-blue-40 border-blue-40 text-blue-60 dark:text-blue-30': step === 1,
          'bg-yellow-40 border-yellow-40 text-yellow-60 dark:text-yellow-30': step === 2,
          'bg-purple-40 border-purple-40 text-purple-60 dark:text-purple-30': step === 3,
          'bg-green-40 border-green-40 text-green-60 dark:text-green-30': step === 4,
        },
      )}
    >
      {children}
    </span>
  );
}

const P = (p) => <p className="font-text whitespace-pre-wrap my-4" {...p} />;

const Strong = (strong) => <strong className="font-bold" {...strong} />;

const Divider = () => <hr className="my-6 block border-b border-t-0 border-border dark:border-border-dark" />;
const Wip = ({ children }) => <ExpandableCallout type="wip">{children}</ExpandableCallout>;
const Pitfall = ({ children }) => <ExpandableCallout type="pitfall">{children}</ExpandableCallout>;
const Deprecated = ({ children }) => <ExpandableCallout type="deprecated">{children}</ExpandableCallout>;
const Note = ({ children }) => <ExpandableCallout type="note">{children}</ExpandableCallout>;

const Canary = ({ children }) => <ExpandableCallout type="canary">{children}</ExpandableCallout>;

const Experimental = ({ children }) => <ExpandableCallout type="experimental">{children}</ExpandableCallout>;

const NextMajor = ({ children }) => <ExpandableCallout type="major">{children}</ExpandableCallout>;

const RSC = ({ children }) => <ExpandableCallout type="rsc">{children}</ExpandableCallout>;

const CanaryBadge = ({ title }) => (
  <span
    title={title}
    className="text-base font-display px-1 py-0.5 font-bold bg-gray-10 dark:bg-gray-60 text-gray-60 dark:text-gray-10 rounded"
  >
    <IconCanary size="s" className="inline me-1 mb-0.5 text-sm text-gray-60 dark:text-gray-10" />
    Canary only
  </span>
);

const ExperimentalBadge = ({ title }) => (
  <span
    title={title}
    className="text-base font-display px-1 py-0.5 font-bold bg-gray-10 dark:bg-gray-60 text-gray-60 dark:text-gray-10 rounded"
  >
    <IconCanary size="s" className="inline me-1 mb-0.5 text-sm text-gray-60 dark:text-gray-10" />
    Experimental only
  </span>
);

const NextMajorBadge = ({ title }) => (
  <span
    title={title}
    className="text-base font-display px-2 py-0.5 font-bold bg-blue-10 dark:bg-blue-60 text-gray-60 dark:text-gray-10 rounded"
  >
    React 19
  </span>
);

const RSCBadge = ({ title }) => (
  <span
    title={title}
    className="text-base font-display px-2 py-0.5 font-bold bg-blue-10 dark:bg-blue-50 text-gray-60 dark:text-gray-10 rounded"
  >
    RSC
  </span>
);

const Blockquote = ({ children, ...props }) => {
  return (
    <blockquote
      className="mdx-blockquote py-4 px-8 my-8 shadow-inner-border dark:shadow-inner-border-dark bg-highlight dark:bg-highlight-dark bg-opacity-50 rounded-2xl leading-6 flex relative"
      {...props}
    >
      <span className="block relative">{children}</span>
    </blockquote>
  );
};

function LearnMore({ children, path }) {
  return (
    <>
      <section className="p-8 mt-16 mb-16 flex flex-row shadow-inner-border dark:shadow-inner-border-dark justify-between items-center bg-card dark:bg-card-dark rounded-2xl">
        <div className="flex-col">
          <h2 className="text-primary font-display dark:text-primary-dark font-bold text-2xl leading-tight">
            Ready to learn this topic?
          </h2>
          {children}
          {path ? (
            <ButtonLink className="mt-1" label="Read More" href={path} type="primary">
              Read More
              <IconNavArrow displayDirection="end" className="inline ms-1" />
            </ButtonLink>
          ) : null}
        </div>
      </section>
      <hr className="border-border dark:border-border-dark mb-14" />
    </>
  );
}

function ReadBlogPost({ path }) {
  return (
    <ButtonLink className="mt-1" label="Read Post" href={path} type="primary">
      Read Post
      <IconNavArrow displayDirection="end" className="inline ms-1" />
    </ButtonLink>
  );
}

function Math({ children }) {
  return (
    <span
      style={{
        fontFamily: 'STIXGeneral-Regular, Georgia, serif',
        fontSize: '1.2rem',
      }}
    >
      {children}
    </span>
  );
}

function MathI({ children }) {
  return (
    <span
      style={{
        fontFamily: 'STIXGeneral-Italic, Georgia, serif',
        fontSize: '1.2rem',
      }}
    >
      {children}
    </span>
  );
}

function YouWillLearn({ children, isChapter }) {
  let title = isChapter ? 'In this chapter' : 'You will learn';
  return <SimpleCallout title={title}>{children}</SimpleCallout>;
}

// // TODO: typing.
// function Recipes(props) {
//   return <Challenges {...props} isRecipes={true} />;
// }

function LanguageList({ progress }) {
  const allLanguages = React.useContext(LanguagesContext) ?? [];
  const languages = allLanguages
    .filter(
      ({ code }) =>
        code !== 'en' &&
        (progress === 'complete' ? finishedTranslations.includes(code) : !finishedTranslations.includes(code)),
    )
    .sort((a, b) => a.enName.localeCompare(b.enName));
  return (
    <UL>
      {languages.map(({ code, name, enName }) => {
        return (
          <LI key={code}>
            <Link href={`https://${code}.react.dev/`}>
              {enName} ({name})
            </Link>{' '}
            &mdash; <Link href={`https://github.com/reactjs/${code}.react.dev`}>Contribute</Link>
          </LI>
        );
      })}
    </UL>
  );
}

function Image(props) {
  const { alt, ...rest } = props;
  return <img alt={alt} className="max-w-[calc(min(700px,100%))]" {...rest} />;
}

export const MDXComponents = {
  p: P,
  strong: Strong,
  blockquote: Blockquote,
  ol: OL,
  ul: UL,
  li: LI,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  hr: Divider,
  a: Link,
  img: Image,
  BlogCard,
  code: InlineCode,
  pre: CodeBlock,
  CodeDiagram,
  ConsoleBlock,
  ConsoleBlockMulti,
  ConsoleLogLine,
  DeepDive: (props) => <ExpandableExample {...props} type="DeepDive" />,
  Diagram,
  DiagramGroup,
  FullWidth({ children }) {
    return children;
  },
  MaxWidth({ children }) {
    return <div className="max-w-4xl ms-0 2xl:mx-auto">{children}</div>;
  },
  BlogWrapper({ children }) {
    return <div className="sm:-mx-5 flex flex-col gap-5 mt-12">{children}</div>;
  },
  Pitfall,
  Deprecated,
  Wip,
  Illustration,
  IllustrationBlock,
  Intro,
  InlineToc,
  LanguageList,
  LearnMore,
  Math,
  MathI,
  Note,
  Canary,
  Experimental,
  ExperimentalBadge,
  CanaryBadge,
  NextMajor,
  NextMajorBadge,
  RSC,
  RSCBadge,
  PackageImport,
  ReadBlogPost,
  Recap,
  // Recipes,
  Sandpack,
  SandpackWithHTMLOutput,
  TeamMember,
  TerminalBlock,
  YouWillLearn,
  YouWillLearnCard,
  // Challenges,
  // Hint,
  // Solution,
  CodeStep,
  YouTubeIframe,
  ErrorDecoder,

  // embed
  Spotify,
  ZingIframe,
  NCTIframe,

  // novel
  Novel,

  //
  ImageGallery,
};

for (let key in MDXComponents) {
  if (MDXComponents.hasOwnProperty(key)) {
    const MDXComponent = MDXComponents[key];
    MDXComponent.mdxName = key;
  }
}
