import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import SignUpForm from "../Forms/SignUpForm";

const SignUpFormContainer = () => {
  const theme = useTheme();
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
      <Title variant="h1">Inscription</Title>

      <SignUpForm />
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
    </>
  );
};

export default SignUpFormContainer;
