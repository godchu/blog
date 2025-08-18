export function Header({ children, num }) {
  return (
    <h2 className="leading-xl font-display text-primary dark:text-primary-dark font-semibold text-5xl lg:text-6xl -mt-4 mb-7 w-full max-w-3xl lg:max-w-xl">
      {num && <span className="dark:text-secondary-dark text-secondary text-3xl lg:text-4xl">{num}. </span>}
      {children}
    </h2>
  );
}
