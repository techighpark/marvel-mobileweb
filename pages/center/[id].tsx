import Layout from "@components/layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout seoTitle="Home">
      <div className="mt-10 px-4 flex flex-col items-center">
        <div className="w-full max-w-6xl">
          <span>해운대점</span>
          <span>해운대 어쩌고 저쩌고 주소</span>
          <span>연락처 010-6644-3892</span>
        </div>
        <div className="w-full max-w-6xl">
          <span>Machine</span>
          <div className="grid grid-cols-2 gap-y-24">
            <div className="flex justify-center">
              <div className="w-96 rounded-lg h-96 bg-gray-200" />
            </div>
            <div className="flex justify-center">
              <div className="w-96 rounded-lg h-96 bg-gray-200" />
            </div>
            <div className="flex justify-center">
              <div className="w-96 rounded-lg h-96 bg-gray-200" />
            </div>
            <div className="flex justify-center">
              <div className="w-96 rounded-lg h-96 bg-gray-200" />
            </div>
            <div className="flex justify-center">
              <div className="w-96 rounded-lg h-96 bg-gray-200" />
            </div>
            <div className="flex justify-center">
              <div className="w-96 rounded-lg h-96 bg-gray-200" />
            </div>
            <div className="flex justify-center">
              <div className="w-96 rounded-lg h-96 bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
