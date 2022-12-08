import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import LoginForm from "~/src/components/Forms/LoginForm";
import lflLogo from "~/public/white_lfl.png";
import Image from "next/legacy/image";
import Link from "next/link";
import SendEmailForm from "~/src/components/Forms/sendEmailForm";
import { getLoginCsrfToken } from "~/src/utils/api/auth/getLoginCsrfToken";
import { useQuery } from "@tanstack/react-query";
import ErrorSnackbar from "~/src/components/Feedbacks/ErrorSnackbar";

const LoginPage = () => {
  const [open, setOpen] = useState(false);
  const [openError, setOpenError] = useState(true);
  const formProps = {
    open,
    setOpen,
    url: "/reset-password",
    title: "Réinitialisation du mot de passe",
    buttonName: "réinitialiser le mot de passe",
  };
  const errorProps = {
    open: openError,
    setOpen: setOpenError,
    message: "Une erreur est survenue, veuillez réessayer plus tard",
  };
  const theme = useTheme();

  const { isLoading, isError } = useQuery({
    queryKey: ["token"],
    queryFn: getLoginCsrfToken,
  });

  const Page = styled(Box)({
    width: "100%",
    minHeight: "100vh",
    height: "100vh",
    padding: "15px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  });

  const ImageContainer = styled(Box)({
    width: 80,
    height: 80,

    [theme.breakpoints.up("sm")]: {
      top: 25,
      width: 100,
      height: 100,
    },
    [theme.breakpoints.up("md")]: {
      top: 25,
      width: 125,
      height: 125,
    },
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
    <Page component="section">
      <ImageContainer>
        <Image src={lflLogo} alt="logo" layout="responsive" />
      </ImageContainer>
      <FormContainer>
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
              <Typography>Vous n'avez pas de compte ?</Typography>
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
  );
};

export default LoginPage;
