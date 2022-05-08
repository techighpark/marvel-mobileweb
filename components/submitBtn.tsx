import { cls } from "@libs/client/utils";

interface SubmitBtnProps {
  text: string;
  [key: string]: any;
}

const SubmitBtn = ({ text, ...rest }: SubmitBtnProps) => {
  return (
    <button
      className={cls(
        "h-8 w-full max-w-sm appearance-none rounded-full border-none  bg-purple-800 text-xs font-bold shadow-lg  duration-200 ease-in-out hover:bg-purple-900 focus:outline-none focus:ring-purple-700 disabled:pointer-events-none disabled:opacity-30 md:h-10"
      )}
      {...rest}
    >
      {text}
    </button>
  );
};

export default SubmitBtn;
