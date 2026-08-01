import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import BootstrapClient from "./components/Clients/BootstrapClient";
import { ReactQueryClientProvider } from "./components/Clients/ReactQueryClient";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const metadata: Metadata = {
  title: "WA loja",
  description: "Generated ny create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <ReactQueryClientProvider>
          <Navbar />
          {children}
          <ToastContainer />
          <BootstrapClient />
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
