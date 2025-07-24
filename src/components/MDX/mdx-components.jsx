import React from "react";
import { HTMLAttributes } from 'react';

/**
 * @param {HTMLAttributes<HTMLParagraphElement>} p 
 */
const P = (p) => (
  <p className="whitespace-pre-wrap my-4" {...p} />
);

/**
 * @param {HTMLAttributes<HTMLElement>} strong 
 */
const Strong = (strong) => (
  <strong className="font-bold" {...strong} />
);


/**
 * @param {HTMLAttributes<HTMLUListElement>} p 
 */
const UL = (p) => (
  <ul className="ms-6 my-3 list-disc" {...p} />
);


export const MDXComponents = {
  p: P,
  strong: Strong,
  ul: UL
}
