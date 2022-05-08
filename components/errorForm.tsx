interface ErrorFromProps {
  text: string;
}

const ErrorFrom = ({ text }: ErrorFromProps) => {
  return (
    <div className="mb-8 flex w-full max-w-sm justify-start rounded-lg bg-neutral-800 p-4 text-red-500 ">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <div className="flex items-center justify-start pl-3 text-xs font-normal text-neutral-400">
        <span>{text}</span>
      </div>
    </div>
  );
};

export default ErrorFrom;
