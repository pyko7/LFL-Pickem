import { useState } from "react";
import { sendAuthEmail } from "@/src/utils/api/auth/sendAuthEmail";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthForm } from "@/src/types/types";
import { sendEmailSchema } from "@/src/validations/authValidation";
import { useMutation } from "@tanstack/react-query";
import Spinner from "../Loaders/Spinner";
import Label from "../Inputs/Label";
import InputErrorMessage from "../Inputs/InputErrorMessage";
import Button from "../Buttons/Button";

type Props = {
  url: string;
  buttonName: string;
};

const SendEmailForm = ({ url, buttonName }: Props) => {
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
          `${buttonName}`
        )}
      </Button>
      {mutation.isError ? (
        <p className="pt-[2px] pb-3 text-red-600">{errorMessage}</p>
      ) : null}
      {mutation.isSuccess ? <p>{successMessage}</p> : null}
    </form>
  );
};

export default SendEmailForm;
