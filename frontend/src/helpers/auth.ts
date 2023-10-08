import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const checkAuthCookie = (): string | null => {
  const authToken = Cookies.get("authToken");

  if (!authToken) {
    return null;
  }

  const tokenExpiration = new Date(authToken).getTime();
  const now = new Date().getTime();

  if (tokenExpiration < now) {
    Cookies.remove("authToken");

    return null;
  }

  return authToken;
};

interface SetAuthCookieProps {
  token: string;
}

export const setAuthCookie = ({ token }: SetAuthCookieProps) => {
  Cookies.set("authToken", token, { expires: 1 });
};

export const logout = () => {
  Cookies.remove("authToken");
};

export const useRedirectIfNotAuthenticated = () => {
  const router = useRouter();

  if (!checkAuthCookie()) {
    router.replace('/');
  }
}