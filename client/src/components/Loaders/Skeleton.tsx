const Skeleton = ({
  width,
  height,
  rounded,
  ariaLabel,
}: {
  width: string;
  height: string;
  rounded?: boolean;
  ariaLabel: string;
}) => {
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      style={{
        width,
        height,
      }}
      className={`
       animate-pulse bg-main-light shadow ${
         rounded ? "rounded-md" : "rounded-none"
       }`}
    />
  );
};

export default Skeleton;
