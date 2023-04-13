import { LoginButton } from "@/src/types/buttons";

const LoginButton = ({ setIsOpen, handleClose }: LoginButton) => {
  const handleClick = () => {
    setIsOpen(true);
    handleClose();
  };
  return (
    <button
      aria-label="Se connecter"
      tabIndex={0}
      className="absolute bottom-0 left-6 w-auto px-6 py-2 rounded-lg mb-4 mx-auto shadow font-bold text-lg bg-neutral-700 focus:shadow-outline focus:outline-none hover:bg-neutral-600"
      onClick={handleClick}
    >
      Se connecter
    </button>
  );
};

export default LoginButton;
