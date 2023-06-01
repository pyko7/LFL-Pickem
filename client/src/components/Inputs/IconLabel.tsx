import { LabelHTMLAttributes } from "react";

type InputProps = LabelHTMLAttributes<HTMLLabelElement> & {
  className?: string;
};

const IconLabel = ({ children, className, ...rest }: InputProps) => {
  return (
    <label className="absolute top-1/2 right-4 -translate-y-1/2 z-10" {...rest}>
      <button
        type="button"
        className="w-full h-full flex items-center text-neutral-light focus-visible:text-neutral-light focus-visible:p-0"
      >
        {children}
      </button>
    </label>
  );
};

export default IconLabel;
