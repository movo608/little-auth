"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";

import { http } from "@/helpers/http";

import { LoginRequestDataType, LoginResponseType } from "@/types/login";
import { notification } from "@/utils/notification";
import { Card } from "@/components";
import { setAuthCookie } from "@/helpers/auth";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/helpers/validators";

const Login = () => {
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
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data: LoginRequestDataType) => {
    http
      .post("/auth/login", JSON.stringify(data))
      .then((res: AxiosResponse<LoginResponseType>) => {
        notification({
          message: "Registration successful. Redirecting...",
          type: "success",
        });

        const { accessToken } = res.data;

        setAuthCookie({ token: res.data.accessToken });
        dispatch({ type: "LOGIN", token: accessToken });

        router.replace("/home");
      })
      .catch((err) => {
        console.error(err);

        notification({
          message: `An error has occurred: ${err.response.data.message}`,
          type: "error",
        });
      });
  };

  return (
    <main className="flex h-full flex-col items-center justify-between">
      <Card title="Sign in to your account">
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleSubmit((data) =>
            onSubmit(data as LoginRequestDataType)
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
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
            {errors?.password && (
              <p className="mt-3 text-red-500" role="alert">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-end">
            <a
              href="#"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don’t have an account yet?{" "}
            <Link
              href="/signup"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Sign up
            </Link>
          </p>
        </form>
      </Card>
    </main>
  );
};

export default Login;
