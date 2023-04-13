import { LogoutButton } from "@/src/types/buttons";
import { logoutUser } from "@/src/utils/api/auth/logoutUser";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const LogoutButton = ({ setIsLogged, handleClose }: LogoutButton) => {
  const { pathname, push } = useRouter();

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      setIsLogged!(false);
      handleClose();
    },
  });

  const handleClick = () => {
    if (pathname !== "/") {
      push("/");
    }
    handleClose();
    mutation.mutate();
  };

  return (
    <button
      aria-label="Se déconnecter"
      tabIndex={0}
      className="absolute bottom-0 left-6 w-auto px-6 py-2 rounded-lg mb-4 mx-auto shadow font-bold text-lg bg-neutral-700 focus:shadow-outline focus:outline-none hover:bg-neutral-600"
      onClick={handleClick}
    >
      Se déconnecter
    </button>
  );
};

export default LogoutButton;
