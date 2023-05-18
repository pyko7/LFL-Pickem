import { useState } from "react";
import Spinner from "../Loaders/Spinner";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthForm } from "@/src/types/types";
import { logUserSchema } from "@/src/validations/authValidation";
import { useMutation } from "@tanstack/react-query";
import { logUser } from "@/src/utils/api/auth/logUser";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";
import Label from "../Inputs/Label";
import IconLabel from "../Inputs/IconLabel";
import IconButton from "../Buttons/IconButton";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import InputErrorMessage from "../Inputs/InputErrorMessage";
import Button from "../Buttons/Button";

const LoginForm = ({ handleClose }: { handleClose: () => void }) => {
  const { push, pathname } = useRouter();
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
      handleClose();
    },
  });

  const onSubmit: SubmitHandler<AuthForm> = (data) => {
    mutation.mutate(data);
  };

  return (
    <form
      className="w-full m-auto flex flex-col items-center gap-2 rounded-lg sm:max-w-sm sm:p-9 md:max-w-md lg:max-w-md lg:gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="input_label_container mb-6">
        <input
          type="email"
          id="emailInput"
          className="peer"
          placeholder=" "
          required
          {...register("email")}
        />
        <Label htmlFor="emailInput">Adresse email</Label>
      </div>

      <div className="input_label_container">
        <input
          type={passwordVisible ? "text" : "password"}
          id="passwordInput"
          className="peer password_input"
          placeholder=" "
          required
          {...register("password")}
        />
        <Label htmlFor="passwordInput">Mot de passe</Label>
        <IconLabel
          htmlFor="passwordInput"
          aria-label="toggle password"
          onClick={handleClickShowPassword}
        >
          <div className="w-5 h-5">
            {passwordVisible ? (
              <EyeSlashIcon aria-hidden="true" className="w-full h-full" />
            ) : (
              <EyeIcon aria-hidden="true" className="w-full h-full" />
            )}
          </div>
        </IconLabel>
      </div>

      {mutation.isError ? (
        <InputErrorMessage>{errorMessage}</InputErrorMessage>
      ) : errors.email || errors.password ? (
        <InputErrorMessage>
          Adresse email et/ou mot de passe incorrect
        </InputErrorMessage>
      ) : null}

      <Button
        type="submit"
        className="w-fit mt-6 text-neutral-dark focus-visible:border-neutral-light"
      >
        {mutation.isLoading ? (
          <Spinner dark ariaLabel="Attente de l'inscription" />
        ) : (
          "Se connecter"
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
