import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthForm } from "~/src/types/forms";
import { createUserSchema } from "~/src/validations/authValidation";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "~/src/utils/api/auth/createUser";
import { useRouter } from "next/router";

const SignUpForm = () => {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [pseudoErrorMessage, setPseudoErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickShowPassword = () => {
    return passwordVisible
      ? setPasswordVisible(false)
      : setPasswordVisible(true);
  };

  const handleClickShowConfirmPassword = () => {
    return confirmPasswordVisible
      ? setConfirmPasswordVisible(false)
      : setConfirmPasswordVisible(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(createUserSchema),
  });

  const mutation = useMutation({
    mutationFn: createUser,
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === "Le pseudo est déjà utilisé") {
          return setPseudoErrorMessage(error.message);
        }
        if (error.message === "L'email est déjà utilisé") {
          return setEmailErrorMessage(error.message);
        } else {
          return setErrorMessage(error.message);
        }
      }
    },
    onSuccess: () => {
      router.push("/signup/confirm-email");
    },
  });

  const onSubmit: SubmitHandler<AuthForm> = (data) => {
    setPseudoErrorMessage("");
    setEmailErrorMessage("");
    setErrorMessage("");
    mutation.mutate(data);
  };

  const Form = styled(Box)(({ theme }) => ({
    width: "90%",
    maxWidth: 375,
    height: "100%",
    marginTop: "-1px",
    padding: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: 6,
    backgroundColor: theme.palette.background.paper,
    borderRadius: "0 0 8px 8px",
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

  const PasswordVisibilityButton = styled(IconButton)(({ theme }) => ({
    "&:hover": {
      background: "transparent",
      color: theme.palette.primary.main,
    },
  }));

  const SubmitButton = styled(Button)(({ theme }) => ({
    width: "100%",
    maxWidth: 290,
    padding: "10px 0",
    marginTop: 35,
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
    <Form component="form" onSubmit={handleSubmit(onSubmit)}>
      <Inputs>
        <TextField
          type="text"
          variant="filled"
          label="Pseudo"
          {...register("pseudo")}
        />
        {mutation.isError && pseudoErrorMessage.length > 0 ? (
          <ErrorMessage>{pseudoErrorMessage}</ErrorMessage>
        ) : null}
        {errors.pseudo ? (
          <ErrorMessage>{errors.pseudo.message}</ErrorMessage>
        ) : (
          ""
        )}
      </Inputs>
      <Inputs>
        <TextField
          type="email"
          variant="filled"
          label="Adresse email"
          {...register("email")}
        />
        {mutation.isError && emailErrorMessage.length > 0 ? (
          <ErrorMessage>{emailErrorMessage}</ErrorMessage>
        ) : null}

        {errors.email ? (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        ) : (
          ""
        )}
      </Inputs>
      <Inputs>
        <TextField
          type={passwordVisible ? "text" : "password"}
          variant="filled"
          label="Mot de passe"
          {...register("password")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PasswordVisibilityButton
                  aria-label="modifie la visibilité du mot de passe"
                  onClick={handleClickShowPassword}
                  edge="end"
                  color="inherit"
                >
                  {passwordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </PasswordVisibilityButton>
              </InputAdornment>
            ),
          }}
        />
        {errors.password ? (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        ) : (
          ""
        )}
      </Inputs>

      <Inputs>
        <TextField
          type={confirmPasswordVisible ? "text" : "password"}
          variant="filled"
          label="Confirmer le mot de passe"
          {...register("confirmPassword")}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <PasswordVisibilityButton
                  aria-label="modifie la visibilité de la confirmation du mot de passe"
                  onClick={handleClickShowConfirmPassword}
                  edge="end"
                  color="inherit"
                >
                  {confirmPasswordVisible ? (
                    <VisibilityOffIcon />
                  ) : (
                    <VisibilityIcon />
                  )}
                </PasswordVisibilityButton>
              </InputAdornment>
            ),
          }}
        />
        {errors.confirmPassword ? (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        ) : (
          ""
        )}
        {mutation.isError && errorMessage.length > 0 ? (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        ) : null}
      </Inputs>
      <SubmitButton variant="contained" type="submit">
        {mutation.isLoading ? (
          <CircularProgress color="secondary" size={26} />
        ) : (
          "S'inscrire"
        )}
      </SubmitButton>
    </Form>
  );
};

export default SignUpForm;
