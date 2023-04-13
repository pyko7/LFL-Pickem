import { SwitchForm } from "@/src/types/modal";

const SwitchAuthModalButton = ({ label, name, handleClick }: SwitchForm) => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      <p>{label}</p>
      <button
        type="button"
        className="font-bold underline underline-offset-[3px]"
        onClick={handleClick}
      >
        {name}
      </button>
    </div>
  );
};

export default SwitchAuthModalButton;
