import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { sendAuthEmail } from "~/src/utils/api/auth/sendAuthEmail";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthForm, EmailFormProps } from "~/src/types/forms";
import { sendEmailSchema } from "~/src/validations/authValidation";
import { useMutation } from "@tanstack/react-query";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const SendEmailForm = ({
  open,
  setOpen,
  url,
  title,
  buttonName,
}: EmailFormProps) => {
  const successMessage = `Demande réussie ! Vous recevrez un email sous peu contenant un lien pour ${buttonName}.`;
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(sendEmailSchema),
  });

  const handleClose = () => {
    setOpen(false);
  };

  const mutation = useMutation({
    onError: (error) => {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    },

    mutationFn: (data: AuthForm) => sendAuthEmail(data, url),
  });

  const onSubmit: SubmitHandler<AuthForm> = (data) => {
    mutation.mutate(data);
  };

  const Form = styled(Box)(({ theme }) => ({
    width: "100%",
    margin: "auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: 6,
    backgroundColor: theme.palette.background.paper,
    borderRadius: " 0 0 8px 8px",

    [theme.breakpoints.up("sm")]: {
      maxWidth: 395,
      padding: 35,
    },
    [theme.breakpoints.up("lg")]: {
      rowGap: 18,
      maxWidth: 445,
    },
  }));

  const Inputs = styled(FormGroup)(({ theme }) => ({
    width: "100%",
    maxWidth: 290,
    [theme.breakpoints.up("sm")]: {
      maxWidth: "none",
    },
  }));

  const SubmitButton = styled(Button)(({ theme }) => ({
    width: "100%",
    maxWidth: 290,
    marginTop: 20,
    padding: "10px ",
    fontWeight: 700,
    backgroundColor: "#0A0E13",
    color: theme.palette.neutral.light,
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "none",
    },
  }));

  const ErrorMessage = styled(FormHelperText)(({ theme }) => ({
    padding: "2px 0 0 5px",
    color: theme.palette.error.main,
  }));
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textAlign: "center" }}>{title}</DialogTitle>

      <DialogContent sx={{ margin: "auto" }}>
        <DialogContentText
          sx={{ maxWidth: 445, margin: "10px auto", paddingX: 2 }}
        >
          Renseignez votre adresse email et nous vous enverrons un mail
          contentant un lien pour {buttonName}.
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
                `${buttonName}`
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
      </DialogContent>
    </Dialog>
  );
};

export default SendEmailForm;
