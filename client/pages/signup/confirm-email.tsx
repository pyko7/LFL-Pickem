import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import LoginIcon from "@mui/icons-material/Login";
import EmailIcon from "@mui/icons-material/Email";
import { useRouter } from "next/router";
import SendEmailForm from "@/src/components/Forms/SendEmailForm";

const ConfirmEmail = () => {
  const theme = useTheme();
  const { push } = useRouter();
  const [open, setOpen] = useState(false);

  const formProps = {
    open,
    setOpen,
    url: "auth/confirm-email",
    title: "Envoie d'un email de confirmation",
    buttonName: "confirmer l'email",
  };

  const handleLoginPageClick = () => {
    return (window.location.href = "/login");
  };

  const handleVerificationEmailClick = () => {
    return open ? setOpen(false) : setOpen(true);
  };

  const Page = styled(Box)(({ theme }) => ({
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    maxWidth: 1920,
    padding: "35px 20px",
    color: theme.palette.neutral.light,
    backgroundColor: theme.palette.primary.main,
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
          de vérification lors de votre inscription.
          <br />
          <br /> Vérifier votre boîte mail ainsi que vos{" "}
          <strong style={{ color: theme.palette.secondary.main }}>
            spams
          </strong>{" "}
          et cliquez sur le lien contenu dans l&apos;email.
          <br />
          <br /> Note: l&apos;envoi de l&apos;email peut prendre quelques
          minutes.
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
          Vous n&apos;avez pas reçu de mail ?
        </Typography>
        <Buttons
          variant="outlined"
          startIcon={<EmailIcon />}
          onClick={handleVerificationEmailClick}
        >
          Renvoyer un email
        </Buttons>
      </TextContainer>
      {!open ? null : <SendEmailForm {...formProps} />}
    </Page>
  );
};

export default ConfirmEmail;
