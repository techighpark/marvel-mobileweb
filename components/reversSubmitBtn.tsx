import { cls } from "@libs/client/utils";
import { UseFormRegisterReturn } from "react-hook-form";

interface ReverseSubmitBtnProps {
  text: string;
  [key: string]: any;
}

const ReverseSubmitBtn = ({ text, ...rest }: ReverseSubmitBtnProps) => {
  return (
    <button
      className={cls(
        "h-10 w-full max-w-sm appearance-none rounded-full border-2 border-purple-600 bg-transparent text-xs font-bold text-purple-600 duration-200 ease-in-out  hover:border-purple-800 hover:bg-purple-800 hover:text-neutral-100 focus:outline-none focus:ring-purple-700 disabled:pointer-events-none disabled:opacity-30"
      )}
      {...rest}
    >
      {text}
    </button>
  );
};

export default ReverseSubmitBtn;
