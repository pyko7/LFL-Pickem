import Head from "next/head";
import Homepage from "@/src/components/Pages/Home";
import { GameProvider } from "@/context/GameContext";

const Home = () => {
  return (
    <>
      <Head>
        <title>Accueil - LFL-Pickem</title>
        <meta property="og:title" content="Accueil - LFL-Pickem" />
      </Head>

      <GameProvider>
        <Homepage />
      </GameProvider>
    </>
  );
};

export default Home;
