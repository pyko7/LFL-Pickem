import { useState } from "react";
import { sendAuthEmail } from "@/src/utils/api/auth/sendAuthEmail";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthForm, EmailFormProps } from "@/src/types/forms";
import { sendEmailSchema } from "@/src/validations/authValidation";
import { useMutation } from "@tanstack/react-query";

const SendEmailForm = ({ url, buttonName }: EmailFormProps) => {
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

  return (
    <form
      className="w-full m-auto flex flex-col items-center gap-2 rounded-lg sm:max-w-sm sm:p-9 lg:max-w-md lg:gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="input_label_container">
        <input
          type="email"
          id="emailInput"
          className="peer"
          {...register("email")}
        />
        <label
          htmlFor="emailInput"
          className="peer-focus:-translate-y-[34px] peer-focus:-translate-x-2 peer-focus:scale-[0.8]
  peer-focus:px-1 "
        >
          Adresse email
        </label>
      </div>
      {errors.email ? (
        <p className="w-full text-red-600">{errors.email.message}</p>
      ) : null}

      <button
        type="submit"
        className="w-auto mt-3 px-4 py-2 rounded shadow text-base font-bold uppercase focus:shadow-outline focus:outline-none hover:bg-secondary-light  text-neutral-dark bg-secondary"
      >
        {mutation.isLoading ? (
          <CircularProgress color="secondary" size={26} />
        ) : (
          `${buttonName}`
        )}
      </button>
      {mutation.isError ? (
        <p className="pt-[2px] pb-3 text-red-600">{errorMessage}</p>
      ) : null}
      {mutation.isSuccess ? <p>{successMessage}</p> : null}
    </form>
  );
};

export default SendEmailForm;
