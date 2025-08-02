// import * as React from 'react';
// import cn from 'classnames';
// import Image from 'next/image';

// export function Novel({ src, tags, name, altName, author, status = 'Đang tiến hành', children }) {
//   return (
//     <section>
//       <div className="flex flex-wrap">
//         {/* Image section */}
//         <div className="1328:mb-0 1328:max-w-[25%] 1328:basis-1/4 1328:flex-none 1328:justify-start max-w-full basis-full flex-none flex justify-center mb-2">
//           <div className="relative w-40 h-60 1328:w-48 1328:h-72 rounded overflow-hidden shadow-md">
//             <Image src={src} alt="Novel cover" fill className="object-cover" />
//           </div>
//         </div>

//         {/* Content section */}
//         <div className="1328:max-w-[75%] 1328:basis-3/4 max-w-full basis-full flex flex-col justify-center">
//           <div className="flex-1">
//             <h2 className="text-3xl font-display leading-10 text-primary dark:text-primary-dark font-bold mt-0 mb-2">
//               {name}
//             </h2>
//             {/* Author & Status */}
//             <div className="flex flex-col">
//               {altName && (
//                 <div className="mb-2 font-text">
//                   <b>Tên khác: </b>
//                   <span>{altName}</span>
//                 </div>
//               )}
//               <div className="mb-2 font-text">
//                 <b>Tác giả: </b>
//                 <span>{author}</span>
//               </div>
//               <div className="mb-2 font-text">
//                 <b>Tình trạng: </b>
//                 <span>{status}</span>
//               </div>
//               {/* Tags */}
//               <div className="mb-2 font-text">
//                 <b>Tags: </b>
//                 {tags.map((tag, index) => {
//                   return (
//                     <React.Fragment key={index}>
//                       <Tag step={(index % 4) + 1}>{tag}</Tag>
//                       <span className="ml-1" />
//                     </React.Fragment>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>
//         <hr className="my-6 block border-b border-t-0 border-border dark:border-border-dark" />
//         <h4 className="text-lg font-display font-bold leading-9 mt-3 underline">Tóm tắt</h4>
//         {children}
//       </div>
//     </section>
//   );
// }

// function Tag({ children, step }) {
//   return (
//     <span
//       data-step={step}
//       className={cn(
//         'code-step bg-opacity-10 dark:bg-opacity-20 relative rounded-lg px-[10px] py-[1.5px] border-b-[2px] border-opacity-60 whitespace-nowrap',
//         {
//           'bg-blue-40 border-blue-40 text-blue-60 dark:text-blue-30': step === 1,
//           'bg-yellow-40 border-yellow-40 text-yellow-60 dark:text-yellow-30': step === 2,
//           'bg-purple-40 border-purple-40 text-purple-60 dark:text-purple-30': step === 3,
//           'bg-green-40 border-green-40 text-green-60 dark:text-green-30': step === 4,
//         },
//       )}
//     >
//       {children}
//     </span>
//   );
// }

import * as React from 'react';
import cn from 'classnames';
import Image from 'next/image';

import Link from '../link';

/**
 * Reusable Tag component
 */
export function Tag({ children, step }) {
  return (
    <span
      data-step={step}
      className={cn(
        'bg-opacity-10 dark:bg-opacity-20 relative rounded-lg px-[10px] py-px border-b border-opacity-60 whitespace-nowrap text-sm',
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

/**
 * Reusable Novel component
 * @param {object} props
 * @param {string} props.src - Image source
 * @param {object} props.meta - { name, altName, author, status, tags }
 * @param {ReactNode} props.children - Summary or description
 */
export function Novel({ src, name, altName, author, status = 'Đang tiến hành', tags = [], raws, children }) {
  return (
    <section className="mt-4">
      <div className="flex flex-wrap">
        {/* Image section */}
        <div className="1328:mb-0 1328:max-w-[25%] 1328:basis-1/4 1328:flex-none 1328:justify-start max-w-full basis-full flex-none flex justify-center mb-2">
          <div className="relative w-40 h-60 1328:w-48 1328:h-72 rounded overflow-hidden shadow-md">
            <Image src={src} alt={`${name} cover`} fill className="object-cover" />
          </div>
        </div>

        {/* Content section */}
        <div className="1328:max-w-[75%] 1328:basis-3/4 max-w-full basis-full flex flex-col justify-center">
          <div className="flex-1">
            {name && (
              <h2 className="text-3xl font-display leading-10 text-primary dark:text-primary-dark font-bold mt-0 mb-2">
                {name}
              </h2>
            )}

            <div className="flex flex-col gap-2 font-text">
              {altName && (
                <div>
                  <b>Tên khác:</b> <span>{altName}</span>
                </div>
              )}
              {author && (
                <div>
                  <b>Tác giả:</b> <span>{author}</span>
                </div>
              )}

              <div>
                <b>Tình trạng:</b> <span>{status}</span>
              </div>

              {raws.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <b>Bản raws:</b>
                  {raws.map((raw, index) => (
                    <Link className="underline" href={raw} target="_blank" key={index}>
                      {index + 1}
                    </Link>
                  ))}
                </div>
              )}

              {tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <b>Tags:</b>
                  {tags.map((tag, index) => (
                    <Tag key={index} step={(index % 4) + 1}>
                      {tag}
                    </Tag>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      {children && (
        <div>
          <hr className="my-6 block border-b border-t-0 border-border dark:border-border-dark" />
          <h4 className="text-xl font-display font-bold leading-9 mt-3 underline">Tóm tắt</h4>
          {children}
        </div>
      )}
    </section>
  );
}
