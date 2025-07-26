/* eslint-disable max-nested-callbacks */
/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */
import { useEffect, useRef, useState } from 'react';
import { SandpackCodeViewer, useSandpack } from '@codesandbox/sandpack-react/unstyled';
import cn from 'classnames';

import { IconChevron } from '@/components/icon/icon-chevron';

const getType = (message) => {
  if (message === 'log' || message === 'info') {
    return 'info';
  }

  if (message === 'warn') {
    return 'warning';
  }

  return 'error';
};

const getColor = (message) => {
  if (message === 'warn') {
    return 'text-yellow-50';
  } else if (message === 'error') {
    return 'text-red-40';
  } else {
    return 'text-secondary dark:text-secondary-dark';
  }
};

// based on https://github.com/tmpfs/format-util/blob/0e62d430efb0a1c51448709abd3e2406c14d8401/format.js#L1
// based on https://developer.mozilla.org/en-US/docs/Web/API/console#Using_string_substitutions
// Implements s, d, i and f placeholders
function formatStr(...inputArgs) {
  const maybeMessage = inputArgs[0];
  if (typeof maybeMessage !== 'string') {
    return inputArgs;
  }
  // If the first argument is a string, check for substitutions.
  const args = inputArgs.slice(1);
  let formatted = String(maybeMessage);
  if (args.length) {
    const REGEXP = /(%?)(%([jds]))/g;

    // eslint-disable-next-line max-params
    formatted = formatted.replace(REGEXP, (match, escaped, ptn, flag) => {
      let arg = args.shift();
      switch (flag) {
        case 's':
          arg = String(arg);
          break;
        case 'd':
        case 'i':
          arg = parseInt(arg, 10).toString();
          break;
        case 'f':
          arg = parseFloat(arg).toString();
          break;
      }
      if (!escaped) {
        return arg;
      }
      args.unshift(arg);
      return match;
    });
  }

  // Arguments that remain after formatting.
  if (args.length) {
    for (let i = 0; i < args.length; i++) {
      formatted += ' ' + String(args[i]);
    }
  }

  // Update escaped %% values.
  return [formatted.replace(/%{2,2}/g, '%')];
}

const MAX_MESSAGE_COUNT = 100;

export const SandpackConsole = ({ visible }) => {
  const { listen } = useSandpack();
  const [logs, setLogs] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    let isActive = true;
    const unsubscribe = listen((message) => {
      if (!isActive) {
        console.warn('Received an unexpected log from Sandpack.');
        return;
      }
      if ((message.type === 'start' && message.firstLoad) || message.type === 'refresh') {
        setLogs([]);
      }
      if (message.type === 'console' && message.codesandbox) {
        setLogs((prev) => {
          const newLogs = message.log
            .filter((consoleData) => {
              if (!consoleData.method) {
                return false;
              }
              if (
                typeof consoleData.data[0] === 'string' &&
                consoleData.data[0].indexOf('The above error occurred') !== -1
              ) {
                // Don't show React error addendum because
                // we have a custom error overlay.
                return false;
              }
              return true;
            })
            .map((consoleData) => {
              return {
                ...consoleData,
                data: formatStr(...consoleData.data),
              };
            });
          let messages = [...prev, ...newLogs];
          while (messages.length > MAX_MESSAGE_COUNT) {
            messages.shift();
          }
          return messages;
        });
      }
    });

    return () => {
      unsubscribe();
      isActive = false;
    };
  }, [listen]);

  const [isExpanded, setIsExpanded] = useState(true);

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = wrapperRef.current.scrollHeight;
    }
  }, [logs]);

  if (!visible || logs.length === 0) {
    return null;
  }

  return (
    <div className="absolute dark:border-gray-700 bg-white dark:bg-gray-95 border-t bottom-0 w-full dark:text-white">
      <div className="flex justify-between">
        <button className="flex items-center p-1" onClick={() => setIsExpanded(!isExpanded)}>
          <IconChevron displayDirection={isExpanded ? 'down' : 'right'} />
          <span className="ps-1 text-sm">Console ({logs.length})</span>
        </button>
        <button
          className="p-1"
          onClick={() => {
            setLogs([]);
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="18"
            height="18"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
          </svg>
        </button>
      </div>
      {isExpanded && (
        <div className="w-full h-full border-t bg-white dark:border-gray-700 dark:bg-gray-95 min-h-[28px] console">
          <div className="max-h-40 h-auto overflow-auto" ref={wrapperRef}>
            {logs.map(({ data, id, method }) => {
              return (
                <div
                  key={id}
                  className={cn(
                    'first:border-none border-t dark:border-gray-700 text-md p-1 ps-2 leading-6 font-mono min-h-[32px] whitespace-pre-wrap',
                    `console-${getType(method)}`,
                    getColor(method),
                  )}
                >
                  <span className="console-message">
                    {data.map((msg, index) => {
                      if (typeof msg === 'string') {
                        return <span key={`${msg}-${index}`}>{msg}</span>;
                      }

                      let children;
                      if (msg !== undefined && typeof msg['@t'] === 'string') {
                        // CodeSandbox wraps custom types
                        children = msg['@t'];
                      } else {
                        try {
                          children = JSON.stringify(msg, null, 2);
                        } catch (error) {
                          try {
                            children = Object.prototype.toString.call(msg);
                          } catch (err) {
                            children = '[' + typeof msg + ']';
                          }
                        }
                      }

                      return (
                        <span className={cn('console-span')} key={`${msg}-${index}`}>
                          <SandpackCodeViewer
                            initMode="user-visible"
                            showTabs={false}
                            // fileType="js"
                            code={children}
                          />
                        </span>
                      );
                    })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
