import Layout from "@components/layout";
import type { NextPage } from "next";

const Center: NextPage = () => {
  return (
    <Layout seoTitle="Center">
      <div className="mt-10 px-4 flex flex-col items-center">
        <div className="">
          <span className="border px-4 py-1 rounded-full text-xs font-semibold text-gray-300 border-gray-300">
            해운대
          </span>
          <span className="border px-4 py-1 rounded-full text-xs font-semibold text-gray-300 border-gray-300">
            부산대학교
          </span>
          <span className="border px-4 py-1 rounded-full text-xs font-semibold text-gray-300 border-gray-300">
            장전동
          </span>
        </div>
        <div className="w-full max-w-6xl">
          <div>
            <div>해운대</div>
            <div className="h-72 w-full rounded-xl bg-gray-300" />
          </div>
          <div>
            <div>부산대학교</div>
            <div className="h-72 w-full rounded-xl bg-gray-300" />
          </div>
          <div>
            <div>장전동</div>
            <div className="h-72 w-full  rounded-xl bg-gray-300" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Center;
