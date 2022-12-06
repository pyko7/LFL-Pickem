import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LoginIcon from "@mui/icons-material/Login";
import EmailIcon from "@mui/icons-material/Email";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { resendVerificationEmail } from "~/src/utils/api/auth/resendVerificationEmail";
import ErrorSnackbar from "~/src/components/Feedbacks/ErrorSnackbar";
import SuccessSnackbar from "~/src/components/Feedbacks/SuccesSnackbar";

const ConfirmEmail = () => {
  const theme = useTheme();
  const { push } = useRouter();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const mutation = useMutation({
    mutationFn: resendVerificationEmail,
    onError: () => {
      setError(true);
    },
    onSuccess: () => {
      setSuccess(true);
    },
  });

  const handleLoginPageClick = () => {
    push("/login");
  };

  const handleVerificationEmailClick = () => {
    mutation.mutate();
  };

  const Page = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: "35px 20px",
    color: theme.palette.neutral.light,
  }));

  const Title = styled(Typography)({
    fontSize: 32,
    fontWeight: 700,
    textAlign: "center",
  });

  const TextContainer = styled(Box)({
    width: "100%",
    marginTop: 35,
    display: "flex",
    flexDirection: "column",
    gap: 20,
    [theme.breakpoints.up("sm")]: {
      width: "75%",
      margin: "50px auto",
    },
  });

  const SectionDivider = styled(Divider)(({ theme }) => ({
    width: "66%",
    maxWidth: 650,
    margin: "auto",
    backgroundColor: theme.palette.primary.light,
  }));

  const Buttons = styled(Button)(({ theme }) => ({
    width: "fit-content",
    color: theme.palette.neutral.light,
    textTransform: "none",
    fontSize: 16,
    border: `1px solid ${theme.palette.primary.light}`,
    "&:hover": {
      border: `1px solid ${theme.palette.primary.light}`,

      backgroundColor: theme.palette.primary.light,
    },
  }));

  return (
    <Page component="section">
      <Title variant="h1">Email de confirmation</Title>
      <TextContainer>
        <Typography variant="h2" sx={{ fontSize: 24, fontWeight: 400 }}>
          Bienvenue !
        </Typography>
        <Typography paragraph>
          Vous êtes bientôt prêt à acceder au site. Nous avons envoyé un email
          de vérification.
          <br />
          <br /> Vérifier votre boîte mail ainsi que vos{" "}
          <strong style={{ color: theme.palette.secondary.main }}>
            spams
          </strong>{" "}
          et cliquez sur le lien contenu dans l'email.
          <br />
          <br /> Note: L'envoi de l'email peut prendre quelques minutes.
        </Typography>
      </TextContainer>
      <SectionDivider />
      <TextContainer>
        <Typography variant="h3" sx={{ fontSize: 18 }}>
          Déjà confirmé ?
        </Typography>
        <Buttons
          variant="outlined"
          startIcon={<LoginIcon />}
          onClick={handleLoginPageClick}
        >
          Page de connexion
        </Buttons>
      </TextContainer>
      <TextContainer>
        <Typography variant="h3" sx={{ fontSize: 18 }}>
          Vous n'avez pas reçu de mail ?
        </Typography>
        <Buttons
          variant="outlined"
          startIcon={<EmailIcon />}
          onClick={handleVerificationEmailClick}
        >
          Renvoyer un email
        </Buttons>
      </TextContainer>
      {mutation.isError ? (
        <ErrorSnackbar
          open={error}
          setOpen={setError}
          message="Une erreur est survenue, veuillez réessayer plus tard"
        />
      ) : null}
      {mutation.isSuccess ? (
        <SuccessSnackbar
          open={success}
          setOpen={setSuccess}
          message="Email envoyé"
        />
      ) : null}
    </Page>
  );
};

export default ConfirmEmail;
