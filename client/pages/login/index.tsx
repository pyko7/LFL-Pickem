import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import LoginForm from "~/src/components/Forms/LoginForm";
import Typography from "@mui/material/Typography";
import lflLogo from "~/public/white_lfl.png";
import Image from "next/legacy/image";
import Link from "next/link";

const LoginPage = () => {
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

  return (
    <Page component="section">
      <ImageContainer>
        <Image src={lflLogo} alt="logo" layout="responsive" />
      </ImageContainer>
      <FormContainer>
        <LoginForm />
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
      </FormContainer>
    </Page>
  );
};

export default LoginPage;
