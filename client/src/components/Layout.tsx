import { ReactNode } from "react";
import Head from "next/head";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Header from "./Navigation/Header";

const Layout = ({ children }: { children?: ReactNode }) => {
  const Layout = styled(Box)(({ theme }) => ({
    width: "100%",
    margin: 0,
    minHeight: "100vh",
    backgroundColor: theme.palette.primary.main,
    [theme.breakpoints.up("xl")]: {
      padding: "0 35px",
    },
  }));

  const MainContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    margin: "0 auto",
    minHeight: "100vh",
    padding: 0,
    color: theme.palette.neutral.main,
    backgroundColor: theme.palette.primary.main,
  }));

  return (
    <>
      <Head>
        <title>LFL-Pickem</title>
        <meta
          name="description"
          content="Bienvenue dans LFL-Pickem ! Pariez sur les victoires des équipes à chaque journée de LFL"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="LFL-Pickem" />
        <meta
          property="og:description"
          content="Bienvenue dans LFL-Pickem ! Pariez sur les victoires des équipes à chaque journée de LFL"
        />
      </Head>
      <Layout>
        <Header />
        <MainContainer component="main">{children}</MainContainer>
      </Layout>
    </>
  );
};

export default Layout;
