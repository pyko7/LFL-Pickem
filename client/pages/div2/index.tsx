import Head from "next/head";
import { GameProvider } from "@/context/GameContext";
import League from "@/src/components/Pages/League";

const Div2 = () => {
  return (
    <>
      <Head>
        <title>Div2 - LFL-Pickem</title>
        <meta property="og:title" content="LFL - Div2-Pickem" />
      </Head>

      <GameProvider>
        <League />
      </GameProvider>
    </>
  );
};

export default Div2;
