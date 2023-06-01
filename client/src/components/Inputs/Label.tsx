import { LabelHTMLAttributes } from "react";

type InputProps = LabelHTMLAttributes<HTMLLabelElement>;

const Label = ({ children }: InputProps) => {
  return (
    <label
      className={`pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 bg-neutral-800 transition-all duration-200 ease-out motion-reduce:transition-none
  peer-[:not(:placeholder-shown)]:-translate-y-[34px]
  peer-[:not(:placeholder-shown)]:-translate-x-2
  peer-[:not(:placeholder-shown)]:scale-[0.8]
  peer-[:not(:placeholder-shown)]:px-2
  peer-focus:-translate-y-[34px] peer-focus:-translate-x-2 peer-focus:scale-[0.8]
peer-focus:px-2`}
    >
      {children}
    </label>
  );
};

export default Label;
