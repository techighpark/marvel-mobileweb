import { cls } from "@libs/client/utils";
import React from "react";

interface ProfileInfoProps {
  name: string;
  text?: any;
  children?: React.ReactNode;
  need?: boolean;
}

const ProfileInfo = ({
  name,
  text,
  children,
  need = false,
}: ProfileInfoProps) => {
  return (
    <div className="flex justify-center">
      <div className="flex w-full flex-col ">
        <div className="flex items-center pb-2">
          <span className="text-xs font-semibold text-neutral-500 md:text-sm ">
            {name}
          </span>
          <div className={cls(need ? "" : "hidden", "pl-2 text-purple-600")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        {text ? (
          <span
            className={cls("flex h-10 items-start text-sm text-neutral-100")}
          >
            <span>{text}</span>
          </span>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default ProfileInfo;
