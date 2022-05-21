import Layout from "@components/layout";
import ProfileInfo from "@components/profileInfo";
import ReverseSubmitBtn from "@components/reversSubmitBtn";
import phoneNumber from "@libs/client/phoneToString";
import useMutation from "@libs/client/useMutation";
import useUser from "@libs/client/useUser";
import client from "@libs/server/client";
import { withSessionSsr } from "@libs/server/withSession";
import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { SWRConfig } from "swr";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const UserProfile: NextPage = () => {
  const { profile } = useUser();
  const router = useRouter();
  const onClickEdit = () => {
    router.push("/user/edit");
  };
  const [logOut, { data, loading }] = useMutation(`/api/user/me/logout`);
  const onClickLogOut = () => {
    logOut({});
  };

  useEffect(() => {
    if (data && data?.ok) {
      router.replace("/");
    }
  }, [data, router]);

  const chartData = {
    labels: profile?.weights?.map(weight => weight.createdAt),
    datasets: [
      {
        data: profile?.weights?.map(weight => weight.weight),
        label: "Weight",
        borderColor: "purple",
        fill: false,
      },
    ],
  };
  const options = {
    type: "line",
    data: data,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },

    responsive: false,
  };

  return (
    <Layout seoTitle="Profile">
      <div className="mt-40 flex flex-col items-center">
        <div className="flex w-full max-w-6xl justify-between">
          <div className="flex w-full flex-col">
            <div className="mx-5 flex items-start justify-between md:mx-10">
              <div className="h-10 text-base text-neutral-300 md:text-3xl">
                Welcome,
                <span className="ml-4 font-medium text-neutral-100 md:font-bold">
                  {profile?.name}
                </span>
              </div>
              <div className="space-x-6">
                <button
                  className="cursor-pointer border-b px-1 py-1 text-xs hover:text-neutral-400"
                  onClick={onClickEdit}
                >
                  Edit
                </button>
              </div>
            </div>
            <div className=" mx-5 mt-10 grid grid-cols-2 gap-y-6 rounded-lg bg-neutral-800 p-4 md:grid-cols-3 md:gap-x-8 md:gap-y-8 md:p-10 ">
              <ProfileInfo name="User Number" text={profile?.userNumber} />
              <ProfileInfo
                name="Memeber Typer"
                text={profile?.type === "basic" ? "Basic" : "Personal Training"}
              />
              <ProfileInfo
                name="Register Period"
                text={profile?.createdAt || "none"}
              />
              <ProfileInfo name="Name" text={profile?.name} />
              <ProfileInfo
                name="Phone Number"
                text={phoneNumber(profile?.phone)}
              />
              <ProfileInfo
                name="Email Address"
                text={profile?.email || "none"}
              />
              <ProfileInfo
                name="Vehicle Number"
                text={profile?.vehicle || "none"}
              />
            </div>
            <div className="mx-5 mt-20 space-y-10 ">
              <div className="relative flex h-96 w-full items-center justify-center rounded-lg bg-neutral-800">
                <Line
                  data={chartData}
                  style={{ height: "300px", width: "500px" }}
                  width={500}
                  height={300}
                  options={options}
                />
              </div>
              <div className="relative flex h-96 w-full items-center justify-center rounded-lg bg-neutral-800"></div>
              <div className="h-64 rounded-lg bg-neutral-400 shadow-md shadow-neutral-600"></div>
            </div>
            <div className="flex justify-center px-5 pt-10">
              <ReverseSubmitBtn text="Log Out" />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

const Page: NextPage = ({
  profile,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <SWRConfig
      value={{ fallback: { [`/api/user/me`]: { ok: true, profile } } }}
    >
      <UserProfile />
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = withSessionSsr(
  async context => {
    const {
      req: {
        session: { user },
      },
    } = context;
    if (!user) {
      return {
        props: {},
      };
    }
    const profile = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    return {
      props: {
        profile: JSON.parse(JSON.stringify(profile)),
      },
    };
  }
);

export default Page;
