import { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LoginForm from "../Forms/LoginForm";
import SendEmailForm from "../Forms/SendEmailForm";
import SignUpForm from "../Forms/SignUpForm";

interface Props {
  userAuth: boolean;
  setUserAuth: (userAuth: boolean) => void;
}

const AuthModal = ({ userAuth, setUserAuth }: Props) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [signUpForm, setSignUpForm] = useState(false);
  const formProps = {
    open,
    setOpen,
    url: "auth/reset-password",
    title: "Réinitialisation du mot de passe",
    buttonName: "réinitialiser le mot de passe",
  };

  const handleClose = () => {
    setUserAuth(false);
  };

  const handleClick = () => {
    return signUpForm ? setSignUpForm(false) : setSignUpForm(true);
  };

  const Title = styled(DialogTitle)({
    width: "90%",
    maxWidth: 375,
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

  const Container = styled(Dialog)({
    [theme.breakpoints.down("sm")]: {
      ".MuiDialog-paper": {
        width: "100%",
        maxWidth: 500,
        margin: "10px",
      },
    },
  });

  const FormContainer = styled(Box)({
    width: 450,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      width: "auto",
      padding: 0,
      margin: 0,
    },
  });

  const FormSwitch = styled(DialogActions)({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 1.5,
  });

  const FormSwitchButton = styled(Button)({
    color: theme.palette.secondary.main,
    fontWeight: 700,
    textDecoration: "none",
    textTransform: "none",
  });

  return (
    <Container open={userAuth} onClose={handleClose}>
      <DialogContent>
        <FormContainer>
          <Title>{!signUpForm ? "Connexion" : "Inscription"}</Title>
          {!signUpForm ? <LoginForm setOpen={setOpen} /> : <SignUpForm />}
        </FormContainer>
        <FormSwitch>
          <Typography>
            {!signUpForm
              ? "Vous n'avez pas de compte ?"
              : "Vous avez déjà un compte ?"}
          </Typography>
          <FormSwitchButton variant="text" onClick={handleClick}>
            {!signUpForm ? "Inscrivez-vous" : "Connectez-vous"}
          </FormSwitchButton>
        </FormSwitch>
      </DialogContent>
      <SendEmailForm {...formProps} />

      {/* <DialogTitle sx={{ textAlign: "center" }}>
        Suppression du compte
      </DialogTitle>

      <DialogContent sx={{ margin: "auto" }}>
        <DialogContentText
          sx={{ maxWidth: 445, margin: "10px auto", paddingX: 2 }}
        >
          Cette action est irréversible, êtes-vous sûr(e) de vouloir supprimer
          votre addresse email ?
          <br />
          Inscrivez votre adresse email afin de confirmer la suppression
          <strong> définitive</strong> de votre compte.
        </DialogContentText>
        <Form component="form" onSubmit={handleSubmit(onSubmit)}>
          <Inputs>
            <TextField
              type="email"
              variant="filled"
              label="Adresse email"
              {...register("email")}
            />
            {errors.email ? (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            ) : null}
          </Inputs>
          <DialogActions sx={{ width: 1 }}>
            <SubmitButton variant="contained" type="submit">
              {mutation.isLoading ? (
                <CircularProgress color="secondary" size={26} />
              ) : (
                "Supprimer le compte"
              )}
            </SubmitButton>
          </DialogActions>
          {mutation.isError ? (
            <ErrorMessage>{errorMessage}</ErrorMessage>
          ) : null}
          {mutation.isSuccess ? (
            <DialogContentText>{successMessage}</DialogContentText>
          ) : null}
        </Form>
      </DialogContent> */}
    </Container>
  );
};

export default AuthModal;
