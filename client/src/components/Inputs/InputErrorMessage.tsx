import { HTMLAttributes } from "react";

type ErrorMessage = HTMLAttributes<HTMLSpanElement>;

const InputErrorMessage = ({ children, ...rest }: ErrorMessage) => {
  return (
    <span
      {...rest}
      className="w-full max-w-[290px] mb-4 text-sm text-red-400 sm:max-w-none"
    >
      {children}
    </span>
  );
};

export default InputErrorMessage;
