import { useState } from "react";
import { deleteUser } from "@/src/utils/api/user/deleteUser";
import Spinner from "../Loaders/Spinner";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthForm } from "@/src/types/forms";
import { sendEmailSchema } from "@/src/validations/authValidation";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";

const DeleteAccountForm = ({ handleClose }: { handleClose: () => void }) => {
  const { push } = useRouter();
  const { setIsLogged } = useAuthContext();
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
        setIsLogged(false);
        handleClose();
        push("/");
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
          placeholder=" "
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
      {errors.email ? (
        <p className="w-full text-red-400">{errors.email.message}</p>
      ) : null}

      <button
        type="submit"
        className="w-full max-w-[275px] mt-3 py-3 px-2 rounded shadow font-bold uppercase focus:shadow-outline focus:outline-none hover:bg-neutral-400  text-neutral-dark bg-neutral-500 focus-visible:border-neutral-light"
      >
        {mutation.isLoading ? (
          <Spinner dark ariaLabel="Attente de la suppression" />
        ) : (
          "Supprimer le compte"
        )}
      </button>

      {mutation.isError ? (
        <p className="pt-[2px] pb-3 text-red-400">{errorMessage}</p>
      ) : null}
      {mutation.isSuccess ? <p>{successMessage}</p> : null}
    </form>
  );
};

export default DeleteAccountForm;
