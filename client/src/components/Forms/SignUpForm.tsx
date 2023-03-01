import { ChangeEvent, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthForm } from "@/src/types/forms";
import { createUserSchema } from "@/src/validations/authValidation";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "@/src/utils/api/auth/createUser";
import { useRouter } from "next/router";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import Spinner from "../Loaders/Spinner";

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
          <label
            htmlFor="pseudoInput"
            className={`input_label 
            peer-[:not(:placeholder-shown)]:-translate-y-[34px]
            peer-[:not(:placeholder-shown)]:-translate-x-2
            peer-[:not(:placeholder-shown)]:scale-[0.8]
            peer-[:not(:placeholder-shown)]:px-2
            peer-focus:-translate-y-[34px] peer-focus:-translate-x-2 peer-focus:scale-[0.8]
      peer-focus:px-2`}
          >
            Pseudo
          </label>
        </div>
        {mutation.isError && pseudoErrorMessage.length > 0 ? (
          <p className="w-full max-w-[290px] mb-4 text-sm text-red-400 sm:max-w-none">
            {pseudoErrorMessage}
          </p>
        ) : null}
        {errors.pseudo ? (
          <p className="w-full max-w-[290px] mb-4 text-sm text-red-400 sm:max-w-none">
            {errors.pseudo.message}
          </p>
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
          <label
            htmlFor="emailInput"
            className={`input_label 
            peer-[:not(:placeholder-shown)]:-translate-y-[34px]
            peer-[:not(:placeholder-shown)]:-translate-x-2
            peer-[:not(:placeholder-shown)]:scale-[0.8]
            peer-[:not(:placeholder-shown)]:px-2
            peer-focus:-translate-y-[34px] peer-focus:-translate-x-2 peer-focus:scale-[0.8]
      peer-focus:px-2`}
          >
            Adresse email
          </label>
        </div>
        {mutation.isError && emailErrorMessage.length > 0 ? (
          <p className="w-full max-w-[290px] mb-4 text-sm text-red-400 sm:max-w-none">
            {emailErrorMessage}
          </p>
        ) : null}
        {errors.email ? (
          <p className="w-full max-w-[290px] mb-4 text-sm text-red-400 sm:max-w-none">
            {errors.email.message}
          </p>
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
          <label
            htmlFor="passwordInput"
            className={`input_label 
            peer-[:not(:placeholder-shown)]:-translate-y-[34px]
            peer-[:not(:placeholder-shown)]:-translate-x-2
            peer-[:not(:placeholder-shown)]:scale-[0.8]
            peer-[:not(:placeholder-shown)]:px-2
            peer-focus:-translate-y-[34px] peer-focus:-translate-x-2 peer-focus:scale-[0.8]
      peer-focus:px-2`}
          >
            Mot de passe
          </label>
          <label
            htmlFor="passwordInput"
            className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 "
          >
            <button
              type="button"
              role="button"
              aria-label={`${
                passwordVisible
                  ? "Masquer le mot de passe"
                  : "Afficher le mot de passe"
              }`}
              className="w-full h-full text-neutral-light focus-visible:text-neutral-light focus-visible:p-0"
              onClick={handleClickShowPassword}
            >
              {passwordVisible ? (
                <EyeSlashIcon aria-hidden="true" className="w-full h-full" />
              ) : (
                <EyeIcon aria-hidden="true" className="w-full h-full" />
              )}
            </button>
          </label>
        </div>
        {mutation.isError && errorMessage.length > 0 ? (
          <p className="w-full max-w-[290px] mb-4 text-sm text-red-400 sm:max-w-none">
            {errorMessage}
          </p>
        ) : null}
        {errors.password ? (
          <p className="w-full max-w-[290px] mb-4 text-sm text-red-400 sm:max-w-none">
            {errors.password.message}
          </p>
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
          <label
            htmlFor="confirmPasswordInput"
            className={`input_label 
            peer-[:not(:placeholder-shown)]:-translate-y-[34px]
            peer-[:not(:placeholder-shown)]:-translate-x-2
            peer-[:not(:placeholder-shown)]:scale-[0.8]
            peer-[:not(:placeholder-shown)]:px-2
            peer-focus:-translate-y-[34px] peer-focus:-translate-x-2 peer-focus:scale-[0.8]
      peer-focus:px-2`}
          >
            Confirmer le mot de passe
          </label>
          <label
            htmlFor="confirmPasswordInput"
            className="absolute top-1/2 right-4 -translate-y-1/2 w-5 h-5 "
          >
            <button
              type="button"
              role="button"
              aria-label={`${
                passwordVisible
                  ? "Masquer la confirmation du mot de passe"
                  : "Afficher la confirmation du mot de passe"
              }`}
              className="w-full h-full text-neutral-light focus-visible:text-neutral-light focus-visible:p-0"
              onClick={handleClickShowConfirmPassword}
            >
              {confirmPasswordVisible ? (
                <EyeSlashIcon aria-hidden="true" className="w-full h-full" />
              ) : (
                <EyeIcon aria-hidden="true" className="w-full h-full" />
              )}
            </button>
          </label>
        </div>
        {mutation.isError && errorMessage.length > 0 ? (
          <p className="w-full max-w-[290px] mb-4 text-sm text-red-400 sm:max-w-none">
            {errorMessage}
          </p>
        ) : null}
        {errors.confirmPassword ? (
          <p className="w-full max-w-[290px] mb-4 text-sm text-red-400 sm:max-w-none">
            {errors.confirmPassword.message}
          </p>
        ) : (
          ""
        )}
      </div>

      <button
        type="submit"
        className="w-full max-w-[275px] mt-3 py-3 rounded shadow text-base font-bold uppercase focus:shadow-outline focus:outline-none hover:bg-secondary-light  text-neutral-dark bg-secondary focus-visible:border-neutral-light"
      >
        {mutation.isLoading ? (
          <Spinner dark ariaLabel="Attente de l'inscription" />
        ) : (
          "S'inscrire"
        )}
      </button>
    </form>
  );
};

export default SignUpForm;
