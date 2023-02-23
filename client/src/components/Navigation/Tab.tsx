import { TabProps } from "@/src/types/navigation";
import { useEffect, useState } from "react";

const Tab = ({ dayData, setDayData, label, value }: TabProps) => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setDayData(value);
  };

  useEffect(() => {
    if (dayData?.id === value.id) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [dayData?.id]);

  return (
    <li
      className={`tab w-fit h-full py-2 flex  items-center justify-center ${
        active
          ? "text-secondary border-b-secondary font-bold"
          : "text-neutral-light border-b-transparent"
      } border-b-2 whitespace-nowrap cursor-pointer select-none hover:text-secondary focus-visible:border-b-secondary md:py-3 `}
      onClick={handleClick}
      role="tab"
      tabIndex={0}
    >
      {label}
    </li>
  );
};

export default Tab;
