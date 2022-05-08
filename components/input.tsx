import { cls } from "@libs/client/utils";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  id: string;
  label?: string;
  placeholder?: string;
  kind?: "text" | "phone" | "password" | "number";
  register: UseFormRegisterReturn;
  isBorder?: boolean;
  [x: string]: any;
}

const Input = ({
  id,
  label,
  kind = "text",
  placeholder,
  register,
  isBorder = false,
  ...rest
}: InputProps) => {
  return (
    <div
      className={cls(
        "flex w-full max-w-sm flex-col space-y-2 ",
        isBorder ? "rounded-full border-[0.5px] border-neutral-500" : ""
      )}
    >
      {label ? (
        <label htmlFor={id} className="ml-4 text-sm text-neutral-400">
          {label}
        </label>
      ) : null}
      {kind === "phone" ? (
        <div className="flex h-8 w-full  shadow-sm md:h-10">
          <span className="flex select-none items-center justify-center rounded-l-full bg-neutral-700 bg-opacity-50 px-4 text-xs text-neutral-200">
            +82
          </span>
          <input
            id={id}
            {...register}
            type="number"
            className="h-full w-full appearance-none rounded-full rounded-l-none border-none bg-neutral-800  bg-opacity-50 px-6 text-xs focus:outline-none focus:ring-purple-700"
            {...rest}
          />
        </div>
      ) : null}
      {kind === "text" ? (
        <div className="relative flex h-8 w-full items-center shadow-sm md:h-10">
          <input
            id={id}
            {...register}
            placeholder={placeholder}
            type="text"
            className="h-full w-full appearance-none rounded-full border-none bg-neutral-800  bg-opacity-50 px-6 text-xs focus:outline-none focus:ring-purple-700"
            {...rest}
          />
        </div>
      ) : null}
      {kind === "password" ? (
        <div className="relative flex h-8 w-full items-center shadow-sm md:h-10">
          <input
            id={id}
            {...register}
            placeholder={placeholder}
            type="password"
            className="h-full w-full appearance-none rounded-full border-none bg-neutral-800  bg-opacity-50 px-6 text-xs focus:outline-none focus:ring-purple-700"
            {...rest}
          />
        </div>
      ) : null}
      {kind === "number" ? (
        <div className="relative flex h-8 w-full items-center shadow-sm md:h-10">
          <input
            id={id}
            {...register}
            placeholder={placeholder}
            type="number"
            className="h-full w-full appearance-none rounded-full border-none bg-neutral-800  bg-opacity-50 px-6 text-xs focus:outline-none focus:ring-purple-700"
            {...rest}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Input;
