import Head from "next/head";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Homepage from "@/src/components/Pages/Home";
import { GameProvider } from "@/context/GameContext";

const Home = () => {
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
        <Page component="section">
          <Homepage />
        </Page>
      </GameProvider>
    </>
  );
};

export default Home;
