import { ErrorModalProps } from "@/src/types/feedbacks";
import FormModal from "./FormModal";

const ErrorModal = ({
  betError,
  setBetError,
  errorMessage,
}: ErrorModalProps) => {


  const props = {
    open: betError,
    setOpen: setBetError,
    title: "Erreur",
    description: errorMessage,
  };

  return <FormModal {...props} />;
};

export default ErrorModal;
