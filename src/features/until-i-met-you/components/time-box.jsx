export const TimeBox = ({ value, label }) => {
  return (
    <div className="px-3 py-3 min-w-[80px] text-center flex-1 transition-transform duration-300 ease-in-out hover:scale-105 sm:px-5 sm:py-4 rounded-2xl bg-wash dark:bg-gray-95 shadow-lg">
      <span className="font-text text-primary dark:text-primary-dark block text-base font-bold sm:text-4xl">
        {value}
      </span>
      <span className="font-text text-secondary dark:text-secondary-dark text-[12px] sm:text-base mt-1">{label}</span>
    </div>
  );
};
