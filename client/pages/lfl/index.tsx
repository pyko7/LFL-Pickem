import Head from "next/head";
import { GameProvider } from "@/context/GameContext";
import League from "@/src/components/Pages/League";

const Lfl = () => {
  return (
    <>
      <Head>
        <title>LFL - LFL-Pickem</title>
        <meta property="og:title" content="LFL - LFL-Pickem" />
      </Head>

      <GameProvider>
        <League />
      </GameProvider>
    </>
  );
};

export default Lfl;
