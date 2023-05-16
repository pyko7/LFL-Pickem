import { ErrorModalProps } from "@/src/types/feedbacks";
import Modal from "./Modal";

const ErrorModal = ({
  betError,
  setBetError,
  errorMessage,
}: ErrorModalProps) => {
  return (
    <Modal
      authModal={betError}
      setAuthModal={setBetError}
      title={"Erreur"}
      description={errorMessage}
    />
  );
};

export default ErrorModal;
