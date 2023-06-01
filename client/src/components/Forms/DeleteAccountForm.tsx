import { useState } from "react";
import { deleteUser } from "@/src/utils/api/user/deleteUser";
import Spinner from "../Loaders/Spinner";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthForm } from "@/src/types/types";
import { sendEmailSchema } from "@/src/validations/authValidation";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAuthContext } from "@/context/AuthContext";
import Label from "../Inputs/Label";
import InputErrorMessage from "../Inputs/InputErrorMessage";
import Button from "../Buttons/Button";

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
        <Label htmlFor="emailInput">Adresse email</Label>
      </div>

      {errors.email ? (
        <InputErrorMessage>{errors.email.message}</InputErrorMessage>
      ) : null}

      <Button
        type="submit"
        className="w-fit text-neutral-dark focus-visible:border-neutral-light"
      >
        {mutation.isLoading ? (
          <Spinner dark ariaLabel="En attente de l'envoie de l'email" />
        ) : (
          "Supprimer le compte"
        )}
      </Button>

      {mutation.isError ? (
        <p className="pt-[2px] pb-3 text-red-400">{errorMessage}</p>
      ) : null}
      {mutation.isSuccess ? <p>{successMessage}</p> : null}
    </form>
  );
};

export default DeleteAccountForm;
