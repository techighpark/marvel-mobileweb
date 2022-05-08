import Head from "next/head";
import LinkComponent from "./link";
import { MdCopyright } from "react-icons/md";
import Link from "next/link";

interface LayoutProps {
  seoTitle: string;
  children: React.ReactNode;
}

const Layout = ({ children, seoTitle }: LayoutProps) => {
  return (
    <div className="">
      <Head>
        <title>Marvel Fitness | {seoTitle}</title>
      </Head>
      <div className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between bg-transparent px-4 md:h-20 md:px-6 ">
        <div className="">
          <LinkComponent path={"/"}>
            <span className="text-lg font-bold md:text-3xl">
              MARVEL FITNESS
            </span>
          </LinkComponent>
        </div>

        <div className=" flex items-center justify-end space-x-4">
          <LinkComponent path={"/user"}>
            <span className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </LinkComponent>
        </div>
      </div>
      <div className="">{children}</div>
      <footer className="relative inset-x-0 bottom-0  pt-10 pb-4">
        <div className="flex items-center justify-center space-x-2 text-xs text-neutral-400 ">
          <span className=" ">Marvel Fitness</span>
          <div className="flex items-center justify-center">
            <MdCopyright />
            <span className="">2022</span>
          </div>
          <span className="">Privacy & Legal</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
