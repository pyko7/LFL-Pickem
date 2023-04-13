import { useState } from "react";
import Spinner from "../Loaders/Spinner";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthForm } from "@/src/types/forms";
import { logUserSchema } from "@/src/validations/authValidation";
import { useMutation } from "@tanstack/react-query";
import { logUser } from "@/src/utils/api/auth/logUser";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";
import TogglePasswordVisibility from "../Buttons/TogglePasswordVisibility";

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
      if (pathname !== "/") {
        push("/");
      }
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
          <TogglePasswordVisibility
            passwordVisible={passwordVisible}
            handleClickShowPassword={handleClickShowPassword}
          />
        </label>
      </div>

      {mutation.isError ? (
        <p className="w-full text-red-400">{errorMessage}</p>
      ) : errors.email || errors.password ? (
        <p className="w-full text-red-400">
          Adresse email et/ou mot de passe incorrect
        </p>
      ) : null}

      <button
        type="submit"
        className="w-full max-w-[275px] mt-3 py-3 rounded shadow text-base font-bold uppercase focus:shadow-outline focus:outline-none hover:bg-neutral-400  text-neutral-dark bg-neutral-500 focus-visible:border-neutral-light"
      >
        {mutation.isLoading ? (
          <Spinner dark ariaLabel="Attente de la connexion" />
        ) : (
          "Se connecter"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
