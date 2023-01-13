import Head from "next/head";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SignUpForm from "~/src/components/Forms/SignUpForm";
import Typography from "@mui/material/Typography";
import lflLogo from "~/public/white_lfl.png";
import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  const theme = useTheme();
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
        <title>Inscription - LFL-Pickem</title>
        <meta
          name="description"
          content="Inscrivez-vous à LFL-Pickem puis pariez sur les victoires des équipes à chaque journée de LFL"
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Connexion - LFL-Pickem" />
        <meta
          property="og:description"
          content="Inscrivez-vous à LFL-Pickem puis pariez sur les victoires des équipes à chaque journée de LFL"
        />
      </Head>
      <Page component="section">
        <FormContainer>
          <Image src={lflLogo} alt="logo" width={100} height={100} priority />

          <Title variant="h1">Inscription</Title>

          <SignUpForm />
          <Box sx={{ marginTop: 2, textAlign: "center" }}>
            <Typography>Vous avez déjà un compte ?</Typography>
            <Link
              href="/login"
              style={{
                color: theme.palette.secondary.main,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Connectez-vous
            </Link>
          </Box>
        </FormContainer>
      </Page>
    </>
  );
};

export default SignUp;
