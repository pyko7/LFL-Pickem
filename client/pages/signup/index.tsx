import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SignUpForm from "~/src/components/Forms/SignUpForm";
import Typography from "@mui/material/Typography";
import lflLogo from "~/public/white_lfl.png";
import Image from "next/legacy/image";
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

  const ImageContainer = styled(Box)({
    width: 80,
    height: 80,
    marginBottom: 25,

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
      <FormContainer>
        <ImageContainer>
          <Image src={lflLogo} alt="logo" layout="responsive" priority />
        </ImageContainer>
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
  );
};

export default SignUp;
