import { ButtonHTMLAttributes } from "react";

type HandleMenuButton = ButtonHTMLAttributes<HTMLButtonElement> & {
  size?: "small" | "large";
};

const IconButton = ({ size, children, ...rest }: HandleMenuButton) => {
  return (
    <button
      type="button"
      className={`focus-visible:p-0 ${
        size === "small" ? "w-5 h-5" : size === "large" ? "w-9 h-9" : "w-7 h-7"
      }`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default IconButton;
