import { RouteType } from "@/utils/routes";
import Link from "next/link";

export interface NavigationItemProps {
  route: RouteType;
}

export const NavigationItem = ({ route }: NavigationItemProps) => {
  return (
    <li key={route.path}>
      <Link
        href={route.path}
        className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
        aria-current="page"
      >
        {route.label}
      </Link>
    </li>
  );
};
