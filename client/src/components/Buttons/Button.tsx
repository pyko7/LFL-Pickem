import { ButtonHTMLAttributes } from "react";

const buttonVariants = ["filled", "text"] as const;
type ButtonVariant = (typeof buttonVariants)[number];

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  className?: string;
};

const variantStyles = {
  filled:
    "px-6 py-2 rounded-lg shadow font-bold bg-neutral-700 focus:shadow-outline focus:outline-none hover:bg-neutral-600",
  text: "px-2 py-1 rounded-lg text-base hover:bg-neutral-700/30 hover:underline-offset-2",
};

const Button = ({
  children,
  className,
  variant = "filled",
  ...rest
}: ButtonProps) => {
  return (
    <button
      tabIndex={0}
      className={`${variantStyles[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
