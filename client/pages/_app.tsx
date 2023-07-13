import type { AppProps as NextAppProps } from "next/app";
import Layout from "../src/components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/context/AuthContext";
import "../src/style/globals.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import EndPage from "@/src/components/Pages/EndPage";

type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

export default function MyApp({ Component, pageProps }: AppProps) {
  const { pathname, push } = useRouter();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  useEffect(() => {
    if (pathname !== "/") {
      push("/");
    }
  });
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <EndPage />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </QueryClientProvider>
  );
}
