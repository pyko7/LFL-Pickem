import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import LoginForm from "../Forms/LoginForm";

type Props = {
  setOpen: (open: boolean) => void;
};

const LoginFormContainer = ({ setOpen }: Props) => {
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
  );
};

export default LoginFormContainer;
