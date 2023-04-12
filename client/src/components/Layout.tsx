import { ReactNode } from "react";
import Head from "next/head";
import Header from "./Navigation/Header";

const Layout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <Head>
        <title>LFL-Pickem</title>
        <meta
          name="description"
          content="Bienvenue dans LFL-Pickem ! Pariez sur les victoires des équipes à chaque journée de LFL et de Div2"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="LFL-Pickem" />
        <meta
          property="og:description"
          content="Bienvenue dans LFL-Pickem ! Pariez sur les victoires des équipes à chaque journée de LFL et de Div2"
        />
      </Head>

      <div className="w-full min-h-screen bg-neutral-900 text-neutral-200">
        <Header />
        <main className="w-full h-full my-0 mx-auto p-0">{children}</main>
      </div>
    </>
  );
};

export default Layout;
