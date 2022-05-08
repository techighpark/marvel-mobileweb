import { BsCheckCircle } from "react-icons/bs";

interface ConfirmWidnowProps {
  text: string;
}

export default function ConfirmWindow({ text }: ConfirmWidnowProps) {
  return (
    <div className="absolute top-0 z-50 flex h-full w-full items-center justify-center p-4 backdrop-blur-md backdrop-brightness-50 ">
      <div className="absolute top-60 flex aspect-video w-10/12 flex-col items-center justify-center rounded-xl bg-neutral-800 md:w-96">
        <span className="scale-125 text-purple-700">
          <BsCheckCircle />
        </span>
        <div className="flex items-center justify-center px-20 pt-4 text-lg">
          <div>{text}</div>
        </div>
      </div>
    </div>
  );
}
