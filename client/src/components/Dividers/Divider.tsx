import { HTMLAttributes } from "react";

type DividerProps = HTMLAttributes<HTMLHRElement> & {
  size?: "thin" | "large";
  color?: "lfl" | "divtwo";
  rounded?: boolean;
  className?: string;
};
const Divider = ({
  size,
  color,
  rounded,
  className,
  ...rest
}: DividerProps) => {
  return (
    <hr
      aria-hidden="true"
      className={`w-full border-0
       ${size === "thin" ? "h-[1px]" : size === "large" ? "h-4" : "h-1"}
      ${
        color === "lfl"
          ? "bg-lfl"
          : color === "divtwo"
          ? "bg-divtwo"
          : "bg-neutral-700"
      }
      ${rounded ? "rounded-xl" : ""}
      ${className}
      `}
      {...rest}
    />
  );
};

export default Divider;
