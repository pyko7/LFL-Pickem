import Head from "next/head";
import dynamic from "next/dynamic";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";
import SendEmailForm from "@/src/components/Forms/SendEmailForm";

const DynamicForm = dynamic(
  () => import("../../src/components/Forms/LoginForm")
);

const LoginPage = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const imageUrl =
    "https://res.cloudinary.com/dkferpmf6/image/upload/v1674578020/LFL/white_lfl.webp";

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
  const Title = styled(Typography)({
    width: "90%",
    maxWidth: 375,
    paddingTop: 20,
    fontSize: 32,
    fontWeight: 700,
    textAlign: "center",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.primary.dark,
    borderRadius: "8px 8px 0 0",
    [theme.breakpoints.up("sm")]: {
      maxWidth: 395,
    },
    [theme.breakpoints.up("lg")]: {
      maxWidth: 445,
    },
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

        <>
          <Title variant="h1">Connexion</Title>
          <DynamicForm setOpen={setOpen} />
          <Box sx={{ marginTop: 2, textAlign: "center" }}>
            <Typography>Vous n&apos;avez pas de compte ?</Typography>
            <Link
              href="/signup"
              style={{
                color: theme.palette.secondary.main,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Inscrivez-vous
            </Link>
          </Box>
        </>
      </Page>

      <SendEmailForm {...formProps} />
    </>
  );
};

export default LoginPage;
