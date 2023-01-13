import Head from "next/head";
import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import LoginForm from "~/src/components/Forms/LoginForm";
import lflLogo from "~/public/white_lfl.webp";
import Image from "next/image";
import Link from "next/link";
import SendEmailForm from "~/src/components/Forms/SendEmailForm";
import { getLoginCsrfToken } from "~/src/utils/api/auth/getLoginCsrfToken";
import { useQuery } from "@tanstack/react-query";
import ErrorSnackbar from "~/src/components/Feedbacks/ErrorSnackbar";

const LoginPage = () => {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(true);
  const formProps = {
    open,
    setOpen,
    url: "auth/reset-password",
    title: "Réinitialisation du mot de passe",
    buttonName: "réinitialiser le mot de passe",
  };
  const errorProps = {
    open: openError,
    setOpen: setOpenError,
    message: "Une erreur est survenue, veuillez réessayer plus tard",
  };
  const theme = useTheme();

  const { isLoading, isError } = useQuery(["token"], () =>
    getLoginCsrfToken("/auth/login")
  );

  const Page = styled(Box)({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    minHeight: "100vh",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.main,
  });

  const FormContainer = styled(Container)({
    width: "100%",
    maxWidth: 400,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flexBasis: "75%",
    backgroundColor: theme.palette.primary.main,
  });
  const Title = styled(Typography)({
    width: "100%",
    paddingTop: 25,
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
        <FormContainer>
          <Image src={lflLogo} alt="logo" width={100} height={100} priority />
          {isLoading ? (
            <CircularProgress color="secondary" />
          ) : isError ? (
            <Typography>
              Une erreur est survenue, veuillez réessayer plus tard.
            </Typography>
          ) : (
            <>
              <Title variant="h1">Connexion</Title>
              <LoginForm setOpen={setOpen} />
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
          )}
        </FormContainer>
        {isError ? <ErrorSnackbar {...errorProps} /> : null}

        <SendEmailForm {...formProps} />
      </Page>
    </>
  );
};

export default LoginPage;
