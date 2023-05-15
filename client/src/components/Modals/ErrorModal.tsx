import { ErrorModalProps } from "@/src/types/feedbacks";
import FormModal from "./FormModal";

const ErrorModal = ({
  betError,
  setBetError,
  errorMessage,
}: ErrorModalProps) => {
  const props = {
    isOpen: betError,
    setIsOpen: setBetError,
    title: "Erreur",
    description: errorMessage,
  };

  return (
    <FormModal
      authModal={betError}
      setAuthModal={setBetError}
      title={"Erreur"}
      description={errorMessage}
    />
  );
};

export default ErrorModal;
