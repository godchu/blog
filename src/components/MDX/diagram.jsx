/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import Image from 'next/image';

function Caption({ text }) {
  return (
    <div className="w-full flex justify-center">
      <figcaption className="p-1 sm:p-2 mt-0 sm:mt-0 text-gray-40 text-base lg:text-lg text-center leading-tight table-caption max-w-lg">
        {text}
      </figcaption>
    </div>
  );
}

export function Diagram({ name, alt, height, width, children, captionPosition }) {
  return (
    <figure className="flex flex-col px-0 p-0 sm:p-10 first:mt-0 mt-10 sm:mt-0 justify-center items-center">
      {captionPosition === 'top' && <Caption text={children} />}
      <div className="dark-image">
        <Image src={`/images/docs/diagrams/${name}.dark.png`} alt={alt} height={height} width={width} />
      </div>
      <div className="light-image">
        <Image src={`/images/docs/diagrams/${name}.png`} alt={alt} height={height} width={width} />
      </div>
      {(!captionPosition || captionPosition === 'bottom') && <Caption text={children} />}
    </figure>
  );
}

export default Diagram;
