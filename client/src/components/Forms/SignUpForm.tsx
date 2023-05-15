import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthForm } from "@/src/types/forms";
import { createUserSchema } from "@/src/validations/authValidation";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/src/utils/api/auth/createUser";
import { useRouter } from "next/router";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Spinner from "../Loaders/Spinner";
import Label from "../Inputs/Label";
import IconLabel from "../Inputs/IconLabel";
import IconButton from "../Buttons/IconButton";
import InputErrorMessage from "../Inputs/InputErrorMessage";
import Button from "../Buttons/Button";

const SignUpForm = ({ handleClose }: { handleClose: () => void }) => {
  const { push } = useRouter();
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
      handleClose();
      push("/signup/confirm-email");
    },
  });

  const onSubmit: SubmitHandler<AuthForm> = (data) => {
    setPseudoErrorMessage("");
    setEmailErrorMessage("");
    setErrorMessage("");
    mutation.mutate(data);
  };

  return (
    <form
      className="w-full flex flex-col items-center gap-6 rounded-lg sm:max-w-sm sm:p-9 md:max-w-md lg:max-w-md lg:gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col items-center">
        <div className="input_label_container ">
          <input
            type="text"
            id="pseudoInput"
            className="peer"
            minLength={2}
            maxLength={16}
            placeholder=" "
            required
            {...register("pseudo")}
          />
          <Label htmlFor="pseudoInput">Pseudo</Label>
        </div>
        {mutation.isError && pseudoErrorMessage.length > 0 ? (
          <InputErrorMessage>{pseudoErrorMessage}</InputErrorMessage>
        ) : null}
        {errors.pseudo ? (
          <InputErrorMessage>{errors.pseudo.message}</InputErrorMessage>
        ) : (
          ""
        )}
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="input_label_container">
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
        {mutation.isError && emailErrorMessage.length > 0 ? (
          <InputErrorMessage>{emailErrorMessage}</InputErrorMessage>
        ) : null}
        {errors.email ? (
          <InputErrorMessage>{errors.email.message}</InputErrorMessage>
        ) : (
          ""
        )}
      </div>

      <div className="w-full flex flex-col items-center">
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
          <IconLabel htmlFor="passwordInput" aria-label="toggle password">
            <IconButton size="small" onClick={handleClickShowPassword}>
              {passwordVisible ? (
                <EyeSlashIcon aria-hidden="true" className="w-full h-full" />
              ) : (
                <EyeIcon aria-hidden="true" className="w-full h-full" />
              )}
            </IconButton>
          </IconLabel>
        </div>
        {mutation.isError && errorMessage.length > 0 ? (
          <InputErrorMessage>{errorMessage}</InputErrorMessage>
        ) : null}
        {errors.password ? (
          <InputErrorMessage>{errors.password.message}</InputErrorMessage>
        ) : (
          ""
        )}
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="input_label_container">
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            id="confirmPasswordInput"
            className="peer password_input"
            placeholder=" "
            required
            {...register("confirmPassword")}
          />

          <Label htmlFor="confirmPasswordInput">
            Confirmer le mot de passe
          </Label>
          <IconLabel
            htmlFor="confirmPasswordInput"
            aria-label="toggle confirm password"
          >
            <IconButton size="small" onClick={handleClickShowConfirmPassword}>
              {confirmPasswordVisible ? (
                <EyeSlashIcon aria-hidden="true" className="w-full h-full" />
              ) : (
                <EyeIcon aria-hidden="true" className="w-full h-full" />
              )}
            </IconButton>
          </IconLabel>
        </div>
        {mutation.isError && errorMessage.length > 0 ? (
          <InputErrorMessage>{errorMessage}</InputErrorMessage>
        ) : null}
        {errors.confirmPassword ? (
          <InputErrorMessage>
            {errors.confirmPassword.message}
          </InputErrorMessage>
        ) : (
          ""
        )}
      </div>

      <Button
        type="submit"
        className="w-fit text-neutral-dark focus-visible:border-neutral-light"
      >
        {mutation.isLoading ? (
          <Spinner dark ariaLabel="Attente de l'inscription" />
        ) : (
          "S'inscrire"
        )}
      </Button>
    </form>
  );
};

export default SignUpForm;
