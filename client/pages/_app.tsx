import type { AppProps as NextAppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "../src/components/Layout";
import { theme } from "../src/style/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type AppProps<P = any> = {
  pageProps: P;
} & Omit<NextAppProps<P>, "pageProps">;

export default function MyApp({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
