import { ChangeEvent, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthForm } from "@/src/types/forms";
import { logUserSchema } from "@/src/validations/authValidation";
import { useMutation } from "@tanstack/react-query";
import { logUser } from "@/src/utils/api/auth/logUser";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const LoginForm = () => {
  const { push } = useRouter();
  const { setIsLogged } = useAuthContext();
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(event.target.value);
  };
  const handlePasswordValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(event.target.value);
  };

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
          required
          {...register("email")}
          onChange={handleEmailValueChange}
        />
        <label
          htmlFor="emailInput"
          className={`input_label ${
            emailValue.length > 0
              ? "-translate-y-[34px] -translate-x-2 scale-[0.8] px-2"
              : ""
          } peer-focus:-translate-y-[34px] peer-focus:-translate-x-2 peer-focus:scale-[0.8]
    peer-focus:px-2`}
        >
          Adresse email
        </label>
      </div>

      <div className="input_label_container">
        <input
          type={passwordVisible ? "text" : "password"}
          id="passwordInput"
          className="peer"
          required
          {...register("password")}
          onChange={handlePasswordValueChange}
        />
        <label
          htmlFor="passwordInput"
          className={`input_label
          ${
            passwordValue.length > 0
              ? "-translate-y-[34px] -translate-x-2 scale-[0.8] px-2"
              : ""
          }
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
            aria-hidden="true"
            className="w-full h-full text-neutral-light focus-visible:text-neutral-light focus-visible:p-0"
            onClick={handleClickShowPassword}
          >
            {passwordVisible ? (
              <EyeSlashIcon className="w-full h-full" />
            ) : (
              <EyeIcon className="w-full h-full" />
            )}
          </button>
        </label>
      </div>

      {mutation.isError ? (
        <p className="w-full text-red-400">{errorMessage}</p>
      ) : errors.email || errors.password ? (
        <p className="w-full text-red-400">
          Adresse email et/ou mot de passe incorrect
        </p>
      ) : null}

      <input
        type="submit"
        value={`${
          mutation.isLoading ? (
            <CircularProgress color="secondary" size={26} />
          ) : (
            "Se connecter"
          )
        }`}
        className="w-auto mt-3 px-7 py-3 rounded shadow text-base font-bold uppercase focus:shadow-outline focus:outline-none hover:bg-secondary-light  text-neutral-dark bg-secondary focus-visible:border-neutral-light"
      />
    </form>
  );
};

export default LoginForm;
