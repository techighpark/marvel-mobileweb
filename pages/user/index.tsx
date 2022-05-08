import Layout from "@components/layout";
import LinkComponent from "@components/link";
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
  const transDate = new Date(profile?.createdAt!);
  function formatDate(date: any) {
    return (
      date.getFullYear() +
      "년 " +
      (date.getMonth() + 1) +
      "월 " +
      date.getDate() +
      "일 " +
      date.getHours() +
      "시 " +
      date.getMinutes() +
      "분"
    );
  }
  const registerTime = formatDate(transDate);
  // console.log(registerTime);

  function displayedAt(createdAt: number | Date) {
    const milliSeconds = new Date().valueOf() - createdAt?.valueOf();
    const seconds = milliSeconds / 1000;
    if (seconds < 60) return `방금 전`;
    const minutes = seconds / 60;
    if (minutes < 60) return `${Math.floor(minutes)}분 전`;
    const hours = minutes / 60;
    if (hours < 24) return `${Math.floor(hours)}시간 전`;
    const days = hours / 24;
    if (days < 7) return `${Math.floor(days)}일 전`;
    const weeks = days / 7;
    if (weeks < 5) return `${Math.floor(weeks)}주 전`;
    const months = days / 30;
    if (months < 12) return `${Math.floor(months)}개월 전`;
    const years = days / 365;
    return `${Math.floor(years)}년 전`;
  }
  const timestamp = displayedAt(profile?.createdAt!);
  console.log(timestamp);

  return (
    <Layout seoTitle="Profile">
      <div className="mt-10 flex justify-center">
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
            <div className=" mx-5 mt-10 grid grid-cols-2 gap-y-6 rounded-lg bg-neutral-800 p-4 md:grid-cols-3 md:gap-x-10 md:gap-y-16 md:p-10">
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
            <div className="mx-5 mt-20 space-y-10">
              <div className="relative flex h-96 w-full items-center justify-center rounded-lg bg-neutral-800">
                <Line
                  data={chartData}
                  style={{ height: "300px", width: "500px" }}
                  width={500}
                  height={300}
                  options={options}
                />
              </div>
              <div className="h-64 rounded-lg bg-neutral-400  shadow-md shadow-neutral-600"></div>
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
