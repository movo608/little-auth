import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title: string;
}

export const Card = ({ children, title }: CardProps) => {
  return (
    <div className="w-full items-center justify-center font-mono text-sm lg:flex before:absolute before:h-[300px] before:w-[300px] before:-translate-x-0 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-300 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] before:z-0">
      <section className="z-10">
        <div className="flex flex-col items-center justify-center mx-auto md:h-screen lg:py-0">
          <div className="w-[420px] bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {title}
              </h1>

              {children}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
