import React from 'react';

/**
 * @param {HTMLAttributes<HTMLParagraphElement>} p
 */
function P(p) {
  return <p className='whitespace-pre-wrap my-4' {...p}/>;
}

/**
 * @param {HTMLAttributes<HTMLElement>} strong
 */
function Strong(strong) {
  return <strong className='font-bold' {...strong}/>;
}

/**
 * @param {HTMLAttributes<HTMLUListElement>} p
 */
function UL(p) {
  return <ul className='ms-6 my-3 list-disc' {...p}/>;
}

export const MDXComponents = {
  p: P,
  strong: Strong,
  ul: UL,
};
