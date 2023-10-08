import "./globals.css";

import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import { AuthProvider } from "@/context/AuthContext";
import { Navigation } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Little Auth",
  description: "Simple login app created with CNA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ToastContainer />
          <Navigation />

          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
