/* eslint-disable complexity */
/* eslint-disable no-unused-vars */
'use client';

import * as React from 'react';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { HighlightStyle } from '@codemirror/language';
import { highlightTree, tags } from '@lezer/highlight';
import cn from 'classnames';
import rangeParser from 'parse-numeric-range';

import { CustomTheme } from '../sandpack/themes';

import { css } from '@codemirror/lang-css';

export default function CodeBlock({
  children: {
    props: { className = 'language-js', children: code = '', meta },
  },
  noMargin,
  noShadow,
  onLineHover,
  fallback,
}) {
  const jsxLang = React.useMemo(() => javascript({ jsx: true }), []);
  const cssLang = React.useMemo(() => css(), []);
  const htmlLang = React.useMemo(() => html(), []);

  const trimmedCode = React.useMemo(() => code.trimEnd(), [code]);

  let lang = jsxLang;
  if (className === 'language-css') lang = cssLang;
  else if (className === 'language-html') lang = htmlLang;

  let parsedTree;
  let tokenStarts;
  let tokenEnds;
  let finalOutput;

  try {
    parsedTree = lang.language.parser.parse(trimmedCode);
    tokenStarts = new Map();
    tokenEnds = new Map();
    const highlightTheme = getSyntaxHighlight(CustomTheme);
    highlightTree(parsedTree, highlightTheme, (from, to, className) => {
      tokenStarts.set(from, className);
      tokenEnds.set(to, className);
    });

    finalOutput = renderHighlightedCode(trimmedCode, tokenStarts, tokenEnds, meta, onLineHover);
  } catch (err) {
    console.error('Code highlight failed:', err);
    return fallback ?? <pre>{trimmedCode}</pre>;
  }

  return (
    <div
      dir="ltr"
      className={cn(
        'sandpack sandpack--codeblock',
        'rounded-2xl h-full w-full overflow-x-auto flex items-center bg-wash dark:bg-gray-95 shadow-lg',
        !noMargin && 'my-8',
        noShadow && 'shadow-none rounded-2xl overflow-hidden w-full flex bg-transparent',
      )}
      style={{ contain: 'content' }}
    >
      <div className="sp-wrapper">
        <div className="sp-stack">
          <div className="sp-code-editor">
            <pre className="sp-cm sp-pristine flex align-start">
              <code
                className="sp-pre-placeholder grow-[2]"
                onMouseLeave={onLineHover ? () => onLineHover(null) : undefined}
              >
                {finalOutput}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// eslint-disable-next-line max-params
function renderHighlightedCode(code, tokenStarts, tokenEnds, meta, onLineHover) {
  const highlightedLines = new Map();
  const lines = code.split('\n');
  for (const d of getLineDecorators(code, meta)) {
    highlightedLines.set(d.line - 1, d.className);
  }

  const inlineDecorators = getInlineDecorators(code, meta);
  const decoratorStarts = new Map();
  const decoratorEnds = new Map();
  for (const d of inlineDecorators) {
    let decoratorStart = 0;
    for (let i = 0; i < d.line - 1; i++) {
      decoratorStart += lines[i].length + 1;
    }
    decoratorStart += d.startColumn;
    const decoratorEnd = decoratorStart + (d.endColumn - d.startColumn);

    decoratorStarts.set(decoratorStart, d.className);
    decoratorEnds.set(decoratorEnd, d.className);
  }

  let currentDecorator = null;
  let currentToken = null;
  let buffer = '';
  let lineIndex = 0;
  let lineOutput = [];
  let finalOutput = [];

  for (let i = 0; i < code.length; i++) {
    if (tokenEnds.has(i)) {
      if (currentToken) {
        if (!currentDecorator) {
          lineOutput.push(
            <span key={i + '/t'} className={currentToken}>
              {buffer}
            </span>,
          );
          buffer = '';
        }
        currentToken = null;
      }
    }
    if (decoratorEnds.has(i)) {
      if (currentDecorator) {
        lineOutput.push(
          <span key={i + '/d'} className={currentDecorator}>
            {buffer}
          </span>,
        );
        buffer = '';
        currentDecorator = null;
      }
    }
    if (decoratorStarts.has(i)) {
      if (currentToken) {
        lineOutput.push(
          <span key={i + 'd'} className={currentToken}>
            {buffer}
          </span>,
        );
        buffer = '';
      } else {
        lineOutput.push(buffer);
        buffer = '';
      }
      currentDecorator = decoratorStarts.get(i);
    }
    if (tokenStarts.has(i)) {
      currentToken = tokenStarts.get(i);
      if (!currentDecorator) {
        lineOutput.push(buffer);
        buffer = '';
      }
    }
    if (code[i] === '\n') {
      lineOutput.push(buffer);
      buffer = '';
      const ci = lineIndex;
      const isEmpty = lineOutput.length === 0 || (lineOutput.length === 1 && lineOutput[0] === '');
      finalOutput.push(
        <div
          key={lineIndex}
          className={cn('cm-line', highlightedLines.get(lineIndex) ?? '', isEmpty && 'cm-line-empty')}
          onMouseEnter={onLineHover ? () => onLineHover(lineIndex) : undefined}
        >
          {isEmpty ? '\u200B' : lineOutput}
        </div>,
      );
      lineOutput = [];
      lineIndex++;
    } else {
      buffer += code[i];
    }
  }
  lineOutput.push(buffer);
  finalOutput.push(
    <div
      key={lineIndex}
      className={'cm-line ' + (highlightedLines.get(lineIndex) ?? '')}
      onMouseEnter={onLineHover ? () => onLineHover(lineIndex) : undefined}
    >
      {lineOutput}
    </div>,
  );
  return finalOutput;
}

function classNameToken(name) {
  return `sp-syntax-${name}`;
}
function getSyntaxHighlight(theme) {
  return HighlightStyle.define([
    { tag: tags.keyword, class: classNameToken('keyword') },
    { tag: [tags.atom, tags.number, tags.bool], class: classNameToken('static') },
    { tag: tags.standard(tags.tagName), class: classNameToken('tag') },
    { tag: tags.variableName, class: classNameToken('plain') },
    { tag: tags.function(tags.variableName), class: classNameToken('definition') },
    { tag: tags.propertyName, class: classNameToken('property') },
    { tag: [tags.literal, tags.inserted], class: classNameToken(theme.syntax.string ? 'string' : 'static') },
    { tag: tags.punctuation, class: classNameToken('punctuation') },
    { tag: [tags.comment, tags.quote], class: classNameToken('comment') },
  ]);
}
function getLineDecorators(code, meta) {
  if (!meta) return [];
  const HIGHLIGHT_REGEX = /{([\d,-]+)}/;
  const parsedMeta = HIGHLIGHT_REGEX.exec(meta);
  if (!parsedMeta) return [];
  return rangeParser(parsedMeta[1]).map((line) => ({
    className: 'bg-github-highlight dark:bg-opacity-10',
    line,
  }));
}
function getInlineDecorators(code, meta) {
  if (!meta) return [];
  const INLINE_HEIGHT_REGEX = /(\[\[.*\]\])/;
  const parsedMeta = INLINE_HEIGHT_REGEX.exec(meta);
  if (!parsedMeta) return [];
  const lines = code.split('\n');
  const encodedHighlights = JSON.parse(parsedMeta[1]);
  return encodedHighlights.map(([step, lineNo, substr, fromIndex]) => {
    const line = lines[lineNo - 1];
    let index = line.indexOf(substr);
    if (index === line.lastIndexOf(substr) || fromIndex !== undefined) {
      if (fromIndex !== undefined) index = line.indexOf(substr, fromIndex);
    }
    if (index === -1) throw Error(`Could not find: '${substr}'`);
    return {
      step,
      line: lineNo,
      startColumn: index,
      endColumn: index + substr.length,
      className: cn(
        'code-step bg-opacity-10 dark:bg-opacity-20 relative rounded px-1 py-[1.5px] border-b-[2px] border-opacity-60',
        {
          'bg-blue-40 border-blue-40 text-blue-60 dark:text-blue-30': step === 1,
          'bg-yellow-40 border-yellow-40 text-yellow-60 dark:text-yellow-30': step === 2,
          'bg-purple-40 border-purple-40 text-purple-60 dark:text-purple-30': step === 3,
          'bg-green-40 border-green-40 text-green-60 dark:text-green-30': step === 4,
        },
      ),
    };
  });
}
