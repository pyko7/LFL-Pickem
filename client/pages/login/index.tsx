import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import SendEmailForm from "@/src/components/Forms/SendEmailForm";
import { useCountdown } from "@/src/hooks/useCountdown";
import ShowCounter from "@/src/components/Feedbacks/ShowCounter";

const LoginFormContainer = dynamic(
  () => import("../../src/components/Containers/LoginFormContainer")
);

const LoginPage = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const imageUrl =
    "https://res.cloudinary.com/dkferpmf6/image/upload/v1674578020/LFL/white_lfl.webp";

  const [days, hours, minutes, seconds] = useCountdown("2023-03-01 12:00:00");

  const formProps = {
    open,
    setOpen,
    url: "auth/reset-password",
    title: "Réinitialisation du mot de passe",
    buttonName: "réinitialiser le mot de passe",
  };

  const Page = styled(Box)({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
  });

  return (
    <>
      <Head>
        <title>Connexion - LFL-Pickem</title>
        <meta
          name="description"
          content="Connectez-vous à LFL-Pickem puis pariez sur les victoires des équipes à chaque journée de LFL"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Connexion - LFL-Pickem" />
        <meta
          property="og:description"
          content="Connectez-vous à LFL-Pickem puis pariez sur les victoires des équipes à chaque journée de LFL"
        />
      </Head>
      <Page component="section">
        <Image
          src={imageUrl}
          alt="logo"
          width={85}
          height={85}
          sizes="100vw"
          priority
        />
        <Typography variant="h1" sx={{margin:4, fontSize:32}}>Lancement officiel</Typography>

        <ShowCounter
          days={days}
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />

        {/* <LoginFormContainer setOpen={setOpen} /> */}
      </Page>

      <SendEmailForm {...formProps} />
    </>
  );
};

export default LoginPage;
