import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement> & {
  rounded?: boolean;
  className?: string;
};

const Skeleton = ({ rounded, className, ...rest }: Props) => {
  return (
    <div
      role="status"
      className={`
       animate-pulse shadow bg-neutral-800
       ${rounded ? "rounded-lg" : ""}
       ${className}
       `}
      {...rest}
    />
  );
};

export default Skeleton;
