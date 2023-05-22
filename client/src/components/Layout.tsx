import { ReactNode, useEffect, useState } from "react";
import Head from "next/head";
import Header from "./Navigation/Header";
import { ThemeProvider } from "@/context/ThemeContext";
import Modal from "./Modals/Modal";
import Carousel from "./Carousel";

const Layout = ({ children }: { children?: ReactNode }) => {
  const [ftueModal, setFtueModal] = useState(true);

  const handleClick = () => {
    localStorage.setItem("ftue", "true");
    return setFtueModal(false);
  };

  useEffect(() => {
    const isFtue = localStorage.getItem("ftue");
    if (!isFtue) {
      return setFtueModal(true);
    }
    setFtueModal(false);
  }, []);
  return (
    <>
      <Head>
        <title>LFL-Pickem</title>
        <meta
          name="description"
          content="Bienvenue dans LFL-Pickem ! Pariez sur les victoires des équipes à chaque journée de LFL et de Div2"
          key="description"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="LFL-Pickem" key="og-title" />
        <meta
          property="og:description"
          content="Bienvenue dans LFL-Pickem ! Pariez sur les victoires des équipes à chaque journée de LFL et de Div2"
          key="og-description"
        />
      </Head>

      <ThemeProvider>
        <Modal
          classname="md:max-w-4xl"
          open={ftueModal}
          setOpen={setFtueModal}
          handleClose={handleClick}
        >
          <Carousel handleClose={handleClick} />
        </Modal>
        <div className="w-full min-h-screen bg-neutral-900 text-neutral-200">
          <Header />
          <main className="w-full h-full">{children}</main>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Layout;
