"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { AxiosResponse } from "axios";

import { Card } from "@/components";
import { http } from "@/helpers/http";
import { setAuthCookie } from "@/helpers/auth";
import { notification } from "@/utils/notification";
import { signupSchema } from "@/helpers/validators";

import { useAuth } from "@/context/AuthContext";

import { SignupRequestDataType, SignupResponseType } from "@/types/signup";
import { AuthActionsEnum } from "@/types/auth";

const Signup = () => {
  const router = useRouter();
  const { state, dispatch } = useAuth();

  useEffect(() => {
    if (state.token) {
      router.replace("/home");
    }
  }, [state.token, router]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(signupSchema),
  });

  const onSubmit = (data: SignupRequestDataType) => {
    http
      .post("/auth/register", JSON.stringify(data))
      .then((res: AxiosResponse<SignupResponseType>) => {
        notification({
          message: "Registration successful. Redirecting...",
          type: "success",
        });

        const { accessToken } = res.data;

        setAuthCookie({ token: accessToken });
        dispatch({ type: AuthActionsEnum.LOGIN, token: accessToken });

        router.replace("/home");
      })
      .catch((err) => {
        console.error(err);

        notification({
          message: `An error has occurred: ${err.message}.`,
          type: "error",
        });
      });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Card title="Create a new account">
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit((data) =>
            onSubmit(data as SignupRequestDataType)
          )}
        >
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="name@company.com"
              required
            />
            {errors?.email && (
              <p className="mt-3 text-red-500" role="alert">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Your name
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="John Doe"
              required
            />
            {errors?.name && (
              <p className="mt-3 text-red-500" role="alert">
                {errors.name.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Password
            </label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              )}
            />

            {errors?.password && (
              <p className="mt-3 text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
          <details>
            <summary className="font-bold text-lg cursor-pointer">
              Password requirements
            </summary>

            <p>Minimum length of 8 characters;</p>
            <p>Contains at least 1 letter;</p>
            <p>Contains at least 1 number;</p>
            <p>Contains at least 1 special character.</p>
          </details>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Register
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Do you already have an account?{" "}
            <Link
              href="/"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign in!
            </Link>
          </p>
        </form>
      </Card>
    </main>
  );
};

export default Signup;
