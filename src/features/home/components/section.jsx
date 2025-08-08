import cn from 'classnames';

export function Section({ children, background = null, icon = undefined, iconPosition = undefined, style }) {
  return (
    <div
      style={{ ...style }}
      className={cn(
        'mx-auto flex flex-col w-full relative', // relative for positioning
        background === null && 'max-w-7xl',
        background === 'left-card' &&
          'bg-gradient-left dark:bg-gradient-left-dark border-t border-primary/10 dark:border-primary-dark/10',
        background === 'right-card' &&
          'bg-gradient-right dark:bg-gradient-right-dark border-t border-primary/5 dark:border-primary-dark/5',
      )}
      // style={{ contain: 'content' }}
    >
      {icon && (
        <div className="w-full">
          <div className="mx-auto flex flex-col max-w-4xl px-5 lg:px-0 relative">
            <div
              className={cn('absolute', {
                'top-[var(--s-i-top)]': iconPosition === 'left',
                'right-0 top-[var(--s-i-top)]': iconPosition === 'right',
              })}
            >
              {icon}
            </div>
          </div>
        </div>
      )}

      <div className="flex-col gap-2 flex grow w-full my-20 lg:my-32 mx-auto items-center">{children}</div>
    </div>
  );
}
