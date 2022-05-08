import ErrorFrom from "@components/errorForm";
import Input from "@components/input";
import Layout from "@components/layout";
import ProfileInfo from "@components/profileInfo";
import ReverseSubmitBtn from "@components/reversSubmitBtn";
import SubmitBtn from "@components/submitBtn";
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SWRConfig } from "swr";
import ConfirmWindow from "@components/confirmWindow";

interface EditForm {
  name: string;
  phone: string;
  email: string;
  vehicle: number;
  formsError: string;
}
interface PasswordForm {
  password: string;
  formsError: string;
}
interface MutationResponse {
  ok: boolean;
  error?: string;
}

const EditProfile: NextPage = () => {
  const { profile } = useUser();
  const router = useRouter();
  const [editComplete, setEditComplete] = useState(false);
  const [deleteComplete, setDeleteComplete] = useState(false);

  const {
    register: pwRegister,
    handleSubmit: pwhandleSubmit,
    formState: { errors: pwErrors, isValid: pwIsValid },
    setError: pwSetError,
    clearErrors: pwClearErrors,
  } = useForm<PasswordForm>({ mode: "onChange" });
  const [passwordCheck, { data: passwordData, loading: passwordLoading }] =
    useMutation<MutationResponse>(`/api/user/me/confirm`);
  const onValidPassword = (form: PasswordForm) => {
    passwordCheck(form);
  };
  useEffect(() => {
    if (passwordData && !passwordData?.ok && passwordData?.error) {
      pwSetError("formsError", { message: passwordData?.error });
    }
  }, [passwordData, pwSetError]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    clearErrors,
    setValue,
  } = useForm<EditForm>({ mode: "onChange" });
  const [editProfile, { data: editData, loading: editLoading }] =
    useMutation(`/api/user/me/edit`);

  const onClickComplete = ({ name, phone, email, vehicle }: EditForm) => {
    editProfile({ name, phone, email, vehicle });
  };
  useEffect(() => {
    if (editData && !editData?.ok && editData?.error) {
      setError("formsError", { message: editData?.error });
    }
  }, [editData, setError]);

  useEffect(() => {
    if (profile?.name) setValue("name", profile?.name);
    if (profile?.email) setValue("email", profile?.email);
    if (profile?.phone) setValue("phone", profile?.phone);
    if (profile?.vehicle) setValue("vehicle", profile?.vehicle);
  }, [profile, setValue]);

  useEffect(() => {
    if (editData && editData?.ok) {
      setEditComplete(true);
      setTimeout(() => {
        setEditComplete(false);
        router.push(`/user`);
      }, 2000);
    }
  }, [editData, router]);

  const onClickBack = () => {
    router.push(`/user`);
  };

  const [deleteAccount, { data: deleteData, loading: deleteLoading }] =
    useMutation(`/api/user/me/delete`);

  const onDeleteClick = () => {
    deleteAccount({});
  };
  useEffect(() => {
    if (deleteData && deleteData.ok) {
      setDeleteComplete(true);
      setTimeout(() => {
        // setDeleteComplete(false);
        router.push(`/`);
      }, 2000);
    }
  }, [deleteData, router]);

  return (
    <Layout seoTitle="Edit">
      {editComplete ? <ConfirmWindow text="Profile Updated" /> : null}
      {deleteComplete ? <ConfirmWindow text="Account Deleted" /> : null}
      {!passwordData?.ok ? (
        <div className="mt-10 flex justify-center">
          <div className="flex w-full max-w-6xl justify-between">
            <div className="flex w-full flex-col">
              <div className="mx-5 flex items-center justify-between md:mx-10">
                <div className="text-base text-neutral-300 md:text-3xl">
                  Edit Profiles
                </div>
              </div>
              <div className="mt-20 flex w-full flex-col items-center justify-center px-4">
                {pwErrors.formsError ? (
                  <ErrorFrom text={pwErrors?.formsError?.message!} />
                ) : null}
                <form
                  onSubmit={pwhandleSubmit(onValidPassword)}
                  className="flex w-full flex-col items-center"
                >
                  <Input
                    id="password"
                    label="Current Password"
                    kind="password"
                    register={pwRegister("password", {
                      required: true,
                      onChange: () => pwClearErrors(),
                    })}
                  ></Input>
                  <div className="w-full max-w-sm pt-7">
                    <SubmitBtn
                      text={passwordLoading ? "Loading..." : "Check Password"}
                      disabled={!pwIsValid || passwordLoading}
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className=" mt-10 flex justify-center">
          <div className="flex w-full max-w-6xl justify-between">
            <div className="flex w-full flex-col">
              <div className="mx-5 flex items-start justify-between md:mx-10">
                <div className="h-10 text-base text-neutral-300 md:text-3xl">
                  Edit Profiles,
                  <span className="ml-4 font-medium text-neutral-100 md:font-bold">
                    {profile?.name}
                  </span>
                </div>
                <div className="space-x-6">
                  <span
                    onClick={onClickBack}
                    className="cursor-pointer border-b px-1 py-1 text-xs hover:text-neutral-400"
                  >
                    Back
                  </span>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(onClickComplete)}
                className="mx-5 mt-10 "
              >
                {errors.formsError ? (
                  <ErrorFrom text={errors?.formsError?.message!} />
                ) : null}
                <div className=" grid grid-cols-1 gap-y-6 rounded-lg bg-neutral-800 p-4  md:grid-cols-3 md:gap-x-10 md:gap-y-16 md:p-10">
                  <ProfileInfo name="User Number" text={profile?.userNumber} />
                  <ProfileInfo
                    name="Memeber Typer"
                    text={
                      profile?.type === "basic" ? "Basic" : "Personal Training"
                    }
                  />
                  <ProfileInfo
                    name="Register Period"
                    text={profile?.registerPeriod || 10 + " months"}
                  />
                  <ProfileInfo name="Name" need>
                    <Input
                      id="text"
                      kind="text"
                      register={register("name", {
                        required: true,
                        onChange: () => clearErrors(),
                      })}
                      isBorder
                    ></Input>
                  </ProfileInfo>
                  <ProfileInfo name="Phone Number" need>
                    <Input
                      id="phone"
                      kind="phone"
                      register={register("phone", {
                        required: true,
                        onChange: () => clearErrors(),
                      })}
                      isBorder
                    ></Input>
                  </ProfileInfo>
                  <ProfileInfo name="Email Address">
                    <Input
                      id="email"
                      kind="text"
                      register={register("email", {
                        onChange: () => clearErrors(),
                      })}
                      isBorder
                    ></Input>
                  </ProfileInfo>
                  <ProfileInfo name="Vehicle Number">
                    <Input
                      id="vehicle"
                      kind="number"
                      register={register("vehicle", {
                        onChange: () => clearErrors(),
                      })}
                      isBorder
                    ></Input>
                  </ProfileInfo>
                </div>
                <div className="mt-10 flex w-full flex-col items-center justify-center space-y-5 md:flex-row md:space-y-0 md:space-x-10">
                  <SubmitBtn
                    text={editLoading ? "Loading..." : "Edit Profile"}
                    disabled={!isValid || editLoading}
                  />
                  <ReverseSubmitBtn
                    text={editLoading ? "Loading..." : "Delete Account"}
                    disabled={!isValid || editLoading}
                    onClick={onDeleteClick}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
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
      <EditProfile />
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
