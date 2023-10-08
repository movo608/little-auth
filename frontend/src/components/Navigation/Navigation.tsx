"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { logout } from "@/helpers/auth";
import { useAuth } from "@/context/AuthContext";

import { NavigationItem } from "./NavigationItem/NavigationItem";
import { authenticatedRoutes, guestRoutes, RouteType } from "@/utils/routes";

export const Navigation = () => {
  const router = useRouter();
  const { state, dispatch } = useAuth();

  const handleLogout = () => {
    logout();
    dispatch({ type: "LOGOUT", token: null });

    router.replace("/");
  };

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const displayRoutes = (routesList: Array<RouteType>) => {
    return routesList.map((route: RouteType) => (
      <NavigationItem route={route} key={route.path} />
    ));
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Little Auth
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {loading ? (
              <div className="animate-pulse flex space-x-8">
                <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 mb-4"></div>
                <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 mb-4"></div>
                <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 mb-4"></div>
              </div>
            ) : (
              <>
                {displayRoutes(
                  state.isAuthenticated ? authenticatedRoutes : guestRoutes
                )}
                {state.isAuthenticated && (
                  <button
                    className="block py-2 pl-3 pr-4 text-white  rounded md:bg-transparent md:p-0 dark:text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                )}
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
