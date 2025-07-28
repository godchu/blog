// app/(your-segment)/layout.js
import cn from 'classnames';

import { Footer } from '@/components/layout/footer';

export default function DocsLayout({ children }) {
  return (
    <div className={cn('grid grid-cols-only-content lg:grid-cols-sidebar-content 2xl:grid-cols-sidebar-content-toc')}>
      <div className="lg:-mt-16 z-10">
        <div className="fixed top-0 py-0 shadow lg:pt-16 lg:sticky start-0 end-0 lg:shadow-none">
          {/* SidebarNav rendered inside page with tree */}
        </div>
      </div>
      <main className="min-w-0 isolate">
        {children}
        <div className="self-stretch w-full">
          <div className="w-full px-5 pt-10 mx-auto sm:px-12 md:px-12 md:pt-12 lg:pt-10">
            <hr className="mx-auto max-w-7xl border-border dark:border-border-dark" />
          </div>
          <div className="py-12 px-5 sm:px-12 md:px-12 sm:py-12 md:py-16 lg:py-14">
            <Footer />
          </div>
        </div>
      </main>
      {/* Toc rendered in page */}
    </div>
  );
}
