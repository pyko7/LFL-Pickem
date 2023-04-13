import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

type Props = {
  passwordVisible: boolean;
  handleClickShowPassword: () => void;
};

const TogglePasswordVisibility = ({
  passwordVisible,
  handleClickShowPassword,
}: Props) => {
  return (
    <button
      type="button"
      aria-label={`${
        passwordVisible ? "Masquer le mot de passe" : "Afficher le mot de passe"
      }`}
      className="w-full h-full text-neutral-light focus-visible:text-neutral-light focus-visible:p-0"
      onClick={handleClickShowPassword}
    >
      {passwordVisible ? (
        <EyeSlashIcon aria-hidden="true" className="w-full h-full" />
      ) : (
        <EyeIcon aria-hidden="true" className="w-full h-full" />
      )}
    </button>
  );
};

export default TogglePasswordVisibility;
