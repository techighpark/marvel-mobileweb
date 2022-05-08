import Layout from "@components/layout";
import type { NextPage } from "next";

const Trainer: NextPage = () => {
  return (
    <Layout seoTitle="Trainer">
      <div className="mt-10 px-4 flex flex-col items-center">
        <div>
          <span>해운대점</span>
        </div>
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-5 w-full">
            <div className="flex flex-col">
              <div className="rounded-lg h-96 bg-gray-200" />
              <span>안나단</span>
            </div>
            <div className="flex flex-col">
              <div className="rounded-lg h-96 bg-gray-200" />
              <span>안나단</span>
            </div>
            <div className="flex flex-col">
              <div className="rounded-lg h-96 bg-gray-200" />
              <span>안나단</span>
            </div>
            <div className="flex flex-col">
              <div className="rounded-lg h-96 bg-gray-200" />
              <span>안나단</span>
            </div>
            <div className="flex flex-col">
              <div className="rounded-lg h-96 bg-gray-200" />
              <span>안나단</span>
            </div>
            <div className="flex flex-col">
              <div className="rounded-lg h-96 bg-gray-200" />
              <span>안나단</span>
            </div>
            <div className="flex flex-col">
              <div className="rounded-lg h-96 bg-gray-200" />
              <span>안나단</span>
            </div>
            <div className="flex flex-col">
              <div className="rounded-lg h-96 bg-gray-200" />
              <span>안나단</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Trainer;
