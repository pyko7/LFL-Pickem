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
    width: "100%",
    minHeight: "100vh",
    height: "100vh",
    padding: "15px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    overflow: "hidden",
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
  });

  return (
    <Page component="section">
      <ImageContainer>
        <Image src={lflLogo} alt="logo" layout="responsive" />
      </ImageContainer>
      <FormContainer>
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
