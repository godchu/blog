import React from 'react';

import { IconCanary } from './icon/icon-canary';
import { IconExperimental } from './icon/icon-experimental';
import { H1 } from './MDX/heading';
import Breadcrumbs from './breadcrumbs';
import Tag from './tag';

function PageHeading({ title, status, version, tags = [], breadcrumbs, skipTitle }) {
  return (
    <div className="px-5 sm:px-12 pt-3.5">
      <div className="max-w-4xl ms-0 2xl:mx-auto">
        {breadcrumbs && <Breadcrumbs breadcrumbs={breadcrumbs} />}
        <H1 className="mt-0 text-primary dark:text-primary-dark -mx-.5 break-words">
          {!skipTitle && title}
          {version === 'canary' && (
            <IconCanary
              title=" - This feature is available in the latest Canary version of React"
              className="ms-4 mt-1 text-gray-50 dark:text-gray-40 inline-block w-6 h-6 align-[-1px]"
            />
          )}
          {version === 'experimental' && (
            <IconExperimental
              title=" - This feature is available in the latest Experimental version of React"
              className="ms-4 mt-1 text-gray-50 dark:text-gray-40 inline-block w-6 h-6 align-[-1px]"
            />
          )}
          {status ? <em>—{status}</em> : ''}
        </H1>
        {tags?.length > 0 && (
          <div className="mt-4">
            {tags.map((tag) => (
              <Tag key={tag} variant={tag} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PageHeading;
