import { User, Weight } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

interface UserWidthWeight extends User {
  weights: Weight[];
}

interface ProfileResponse {
  ok: boolean;
  profile: UserWidthWeight;
}

const useUser = () => {
  const { data, error } = useSWR<ProfileResponse>(`/api/user/me`);
  console.log(data);
  const router = useRouter();
  useEffect(() => {
    if (data && !data.ok) {
      router.replace("/user/login");
    }
  }, [data, router]);

  return { profile: data?.profile, isLoading: !data && !error };
};
export default useUser;
