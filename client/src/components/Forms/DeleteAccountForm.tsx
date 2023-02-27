import { useState } from "react";
import { deleteUser } from "@/src/utils/api/user/deleteUser";
import CircularProgress from "@mui/material/CircularProgress";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthForm } from "@/src/types/forms";
import { sendEmailSchema } from "@/src/validations/authValidation";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const DeleteAccountForm = () => {
  const { replace } = useRouter();
  const successMessage = `Suppression confirmée, merci d'avoir fait partie de l'aventure !`;
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
    onSuccess: () => {
      setTimeout(() => {
        replace("/signup");
      }, 1000);
    },
    mutationFn: (data: AuthForm) => deleteUser(data),
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
        className="w-auto mt-3 px-4 py-2 rounded shadow text-lg focus:shadow-outline focus:outline-none hover:bg-secondary-light  text-neutral-dark bg-secondary"
      >
        {mutation.isLoading ? (
          <CircularProgress color="secondary" size={26} />
        ) : (
          "Supprimer le compte"
        )}
      </button>

      {mutation.isError ? (
        <p className="pt-[2px] pb-3 text-red-600">{errorMessage}</p>
      ) : null}
      {mutation.isSuccess ? <p>{successMessage}</p> : null}
    </form>
  );
};

export default DeleteAccountForm;
