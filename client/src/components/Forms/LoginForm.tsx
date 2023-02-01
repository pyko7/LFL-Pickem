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
import { AuthForm } from "@/src/types/forms";
import { logUserSchema } from "@/src/validations/authValidation";
import { useMutation } from "@tanstack/react-query";
import { logUser } from "@/src/utils/api/auth/logUser";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";

type Props = {
  setOpen: (open: boolean) => void;
};

const LoginForm = ({ setOpen }: Props) => {
  const { push } = useRouter();
  const { setIsLogged } = useAuthContext();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleClickShowPassword = () => {
    return passwordVisible
      ? setPasswordVisible(false)
      : setPasswordVisible(true);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthForm>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(logUserSchema),
  });

  const mutation = useMutation({
    mutationFn: logUser,
    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === "Email is not verified") {
          push("/signup/confirm-email");
        }
        setErrorMessage(error.message);
      }
      setIsLogged(false);
    },
    onSuccess: () => {
      setIsLogged(true);
      push("/");
    },
  });

  const onSubmit: SubmitHandler<AuthForm> = (data) => {
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
    borderRadius: "0 0 8px 8px ",
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
    marginTop: 35,
    marginBottom: 10,
    padding: "10px 0",
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

  const FormLinkContainer = styled(Box)(({ theme }) => ({
    color: theme.palette.primary.dark,
    "&:hover": {
      textDecoration: "underline",
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
          type="email"
          variant="filled"
          label="Adresse email"
          {...register("email")}
        />
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

        {mutation.isError ? (
          <ErrorMessage>{errorMessage}</ErrorMessage>
        ) : errors.email || errors.password ? (
          <ErrorMessage>
            Adresse email et/ou mot de passe incorrect
          </ErrorMessage>
        ) : null}
      </Inputs>
      <SubmitButton variant="contained" type="submit">
        {mutation.isLoading ? (
          <CircularProgress color="secondary" size={26} />
        ) : (
          "Se connecter"
        )}
      </SubmitButton>
      <FormLinkContainer>
        <Button
          variant="text"
          sx={{ textTransform: "none", fontSize: 15 }}
          onClick={() => setOpen(true)}
        >
          Mot de passe oublié ?
        </Button>
      </FormLinkContainer>
    </Form>
  );
};

export default LoginForm;
