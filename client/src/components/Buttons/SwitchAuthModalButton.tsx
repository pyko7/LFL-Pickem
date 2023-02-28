interface Props {
  label: string;
  name: string;
  handleClick: () => void;
}
const SwitchAuthModalButton = ({ label, name, handleClick }: Props) => {
  return (
    <div className="w-full h-full flex flex-col items-center gap-2">
      <p>{label}</p>
      <button
        type="button"
        className="text-secondary hover:underline"
        onClick={handleClick}
      >
        {name}
      </button>
    </div>
  );
};

export default SwitchAuthModalButton;
