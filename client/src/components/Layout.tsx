import { ReactNode } from "react";
import Head from "next/head";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

const Layout = ({ children }: { children?: ReactNode }) => {
  const MainContainer = styled(Box)(({ theme }) => ({
    width: "100%",
    minHeight: "100vh",
    margin: 0,
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

      <MainContainer component="main">{children}</MainContainer>
    </>
  );
};

export default Layout;
