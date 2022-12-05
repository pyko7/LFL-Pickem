import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { SignUpForm } from "~/src/types/forms";
import { createUserSchema } from "~/src/validations/authValidation";

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: yupResolver(createUserSchema),
  });
  const onSubmit: SubmitHandler<SignUpForm> = (data) => console.log(data);

  const Form = styled(Box)(({ theme }) => ({
    width: "100%",
    margin: 0,
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    rowGap: 14,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 8,
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
      <Inputs sx={{ width: 1 }}>
        <TextField
          type="text"
          variant="filled"
          label="Pseudo"
          {...register("pseudo")}
        />
        {errors.pseudo ? (
          <ErrorMessage>{errors.pseudo.message}</ErrorMessage>
        ) : (
          ""
        )}
      </Inputs>
      <Inputs sx={{ width: 1 }}>
        <TextField
          type="email"
          variant="filled"
          label="Adresse email"
          {...register("email")}
        />
        {errors.email ? (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        ) : (
          ""
        )}
      </Inputs>
      <Inputs sx={{ width: 1 }}>
        <TextField
          type="password"
          variant="filled"
          label="Mot de passe"
          {...register("password")}
        />
        {errors.password ? (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        ) : (
          ""
        )}
      </Inputs>

      <Inputs sx={{ width: 1 }}>
        <TextField
          type="password"
          variant="filled"
          label="Confirmer le mot de passe"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword ? (
          <ErrorMessage>{errors.confirmPassword.message}</ErrorMessage>
        ) : (
          ""
        )}
      </Inputs>

      <SubmitButton variant="contained" type="submit">
        S'inscrire
      </SubmitButton>
    </Form>
  );
};

export default SignUpForm;
