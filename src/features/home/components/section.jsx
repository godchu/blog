import cn from 'classnames';

export function Section({ children, background = null }) {
  return (
    <div
      className={cn(
        'mx-auto flex flex-col w-full',
        background === null && 'max-w-7xl',
        background === 'left-card' &&
          'bg-gradient-left dark:bg-gradient-left-dark border-t border-primary/10 dark:border-primary-dark/10 ',
        background === 'right-card' &&
          'bg-gradient-right dark:bg-gradient-right-dark border-t border-primary/5 dark:border-primary-dark/5',
      )}
      style={{ contain: 'content' }}
    >
      <div className="flex-col gap-2 flex grow w-full my-20 lg:my-32 mx-auto items-center">{children}</div>
    </div>
  );
}
