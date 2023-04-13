import { CloseButton } from "@/src/types/buttons";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CloseButton = ({ size, ariaLabel, handleClose }: CloseButton) => {
  return (
    <button
      type="button"
      className={`focus-visible:p-0 ${
        size === "small" ? "w-5 h-5" : size === "large" ? "w-9 h-9" : "w-7 h-7"
      }`}
      aria-label={ariaLabel}
    >
      <XMarkIcon className="w-full" onClick={handleClose} />
    </button>
  );
};

export default CloseButton;
