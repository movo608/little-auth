export type RouteType = {
  label: string;
  path: string;
};

export const authenticatedRoutes: Array<RouteType> = [
  { label: "Home", path: "/home" },
];

export const guestRoutes: Array<RouteType> = [
  { label: "Log in", path: "/" },
  { label: "Sign up", path: "/signup" },
];
