import Head from "next/head";
import dynamic from "next/dynamic";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Link from "next/link";

const DynamicForm = dynamic(
  () => import("../../src/components/Forms/SignUpForm")
);

const SignUp = () => {
  const theme = useTheme();
  const imageUrl = 'https://res.cloudinary.com/dkferpmf6/image/upload/v1674578020/LFL/white_lfl.webp'
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
        <Image src={imageUrl} alt="logo" width={85} height={85} priority />

        <Title variant="h1">Inscription</Title>

        <DynamicForm />
        <Box sx={{ marginY: 2, textAlign: "center" }}>
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
      </Page>
    </>
  );
};

export default SignUp;
