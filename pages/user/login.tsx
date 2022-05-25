import type { NextPage } from "next";
import { useForm } from "react-hook-form";
import Layout from "@components/layout";
import Input from "@components/input";
import { useEffect, useState } from "react";
import { cls } from "@libs/client/utils";
import SubmitBtn from "@components/submitBtn";
import useMutation from "@libs/client/useMutation";
import ErrorFrom from "@components/errorForm";
import { useRouter } from "next/router";
import ConfirmWindow from "@components/confirmWindow";

interface LoginForm {
  phone: number;
  password: string;
  formsError?: string;
}
interface SignUpForm {
  phone: number;
  password: string;
  name?: string;
  formsError?: string;
}
interface MutationResponse {
  ok: boolean;
  error?: string;
}

const Login: NextPage = () => {
  const [method, setMethod] = useState("login");
  const [signUpComplete, setSignUpComplete] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<LoginForm>({ mode: "onChange" });
  const {
    register: signRegister,
    handleSubmit: signHandleSubmit,
    reset: signReset,
    setError: singSetError,
    clearErrors: signClearErrors,
    formState: { errors: singErrors, isValid: signIsValid },
  } = useForm<SignUpForm>({ mode: "onChange" });
  const onClickMethod = (method: string) => {
    setMethod(method);
    reset();
    signReset();
  };

  const [login, { loading, data, error }] =
    useMutation<MutationResponse>(`/api/user/login`);
  const [
    signUp,
    { loading: signupLoading, data: signupData, error: signupError },
  ] = useMutation<MutationResponse>(`/api/user/signup`);

  const onValidLogin = (form: LoginForm) => {
    login(form);
  };
  const onValidSignUp = (form: SignUpForm) => {
    signUp(form);
  };

  useEffect(() => {
    if (data && !data?.ok && data?.error) {
      setError("formsError", { message: data?.error });
    }
    if (signupData && !signupData?.ok && signupData?.error) {
      singSetError("formsError", { message: signupData?.error });
    }
  }, [data, signupData, setError, singSetError]);
  useEffect(() => {
    if (signupData && signupData.ok) {
      setSignUpComplete(true);
      setTimeout(() => {
        setMethod("login");
        setTimeout(() => {
          setSignUpComplete(false);
        }, 500);
      }, 1000);
    }
  }, [signupData]);

  useEffect(() => {
    if (data?.ok) {
      router.push("/user");
    }
  }, [data, router]);
  return (
    <Layout seoTitle="Log In">
      {signUpComplete ? <ConfirmWindow text="Account Created!" /> : null}
      <div className="pt-36 flex justify-center px-4 h-[100vh]">
        <div className="flex w-full max-w-sm flex-col items-center">
          <div className="mb-6 grid w-full grid-cols-2 border-b border-neutral-100 md:mb-10 ">
            <div
              onClick={() => onClickMethod("login")}
              className={cls(
                " w-full border-b-2 pb-4 text-center text-neutral-100 duration-200 ease-in-out",
                method === "login"
                  ? "text-neutral-100 "
                  : "border-transparent text-neutral-400"
              )}
            >
              <span className="w-full cursor-pointer text-xs   font-medium duration-200 ease-in-out hover:text-neutral-100 md:text-sm">
                Log In
              </span>
            </div>
            <div
              onClick={() => onClickMethod("signup")}
              className={cls(
                " w-full border-b-2 pb-4 text-center text-neutral-100 duration-200 ease-in-out",
                method === "signup"
                  ? "text-neutral-100 "
                  : "border-transparent text-neutral-400"
              )}
            >
              <span className="w-full cursor-pointer text-xs   font-medium duration-200 ease-in-out hover:text-neutral-100 md:text-sm">
                Sign Up
              </span>
            </div>
          </div>
          {errors.formsError ? (
            <ErrorFrom text={errors?.formsError?.message!} />
          ) : null}
          {singErrors.formsError ? (
            <ErrorFrom text={singErrors?.formsError?.message!} />
          ) : null}
          <div className="w-full">
            {method === "login" ? (
              <form
                onSubmit={handleSubmit(onValidLogin)}
                className="mt-2 flex w-full max-w-sm flex-col space-y-4"
              >
                <Input
                  register={register("phone", {
                    required: true,
                    onChange: () => {
                      clearErrors();
                    },
                  })}
                  id="phone"
                  label="Phone Number"
                  kind="phone"
                />
                <Input
                  register={register("password", {
                    required: "Password is required",
                    onChange: () => {
                      clearErrors();
                    },
                  })}
                  id="password"
                  label="Password"
                  kind="password"
                />
                <div className="pt-7">
                  <SubmitBtn
                    text={loading ? "Loading..." : "Log In"}
                    disabled={!isValid || loading}
                  />
                </div>
              </form>
            ) : (
              <form
                onSubmit={signHandleSubmit(onValidSignUp)}
                className="mt-2 flex w-full max-w-sm flex-col space-y-4"
              >
                <Input
                  register={signRegister("phone", {
                    required: true,
                    onChange: () => {
                      signClearErrors();
                    },
                  })}
                  id="phone"
                  label="Phone Number"
                  kind="phone"
                />
                <Input
                  register={signRegister("password", {
                    required: true,
                    onChange: () => {
                      signClearErrors();
                    },
                  })}
                  id="password"
                  label="Password"
                  kind="password"
                />
                <Input
                  register={signRegister("name", {
                    required: true,
                    onChange: () => {
                      signClearErrors();
                    },
                  })}
                  id="name"
                  label="Name"
                />
                <div className="pt-7">
                  <SubmitBtn
                    text={signupLoading ? "Loading..." : "Sign Up"}
                    disabled={!signIsValid || signupLoading}
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
