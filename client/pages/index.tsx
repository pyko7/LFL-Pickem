import { useEffect, useState } from "react";
import Head from "next/head";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Homepage from "@/src/components/Pages/Home";
import { GameProvider } from "@/context/GameContext";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

const Home = () => {
  const [page, setPage] = useState(false);
  const { push } = useRouter();
  const { isAuth } = useAuthContext();

  useEffect(() => {
    const showPage = isAuth();
    showPage ? setPage(true) : setPage(false);
  }, [isAuth]);

  useEffect(() => {
    !isAuth() ? push("/login") : null;
  }, []);

  const Page = styled(Box)(({ theme }) => ({
    position: "relative",
    width: "100%",
    padding: "32px 0 15px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.up("sm")]: {
      paddingTop: 50,
    },
  }));
  return (
    <>
      <Head>
        <title>Accueil - LFL-Pickem</title>
        <meta property="og:title" content="Accueil - LFL-Pickem" />
      </Head>
      <GameProvider>
        {page ? (
          <Page component="section">
            <Homepage />
          </Page>
        ) : null}
      </GameProvider>
    </>
  );
};

export default Home;
