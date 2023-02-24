import { TabProps } from "@/src/types/navigation";
import { useEffect, useRef, useState } from "react";

const Tab = ({ dayData, setDayData, label, value, setPosition }: TabProps) => {
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    setDayData(value);
    if (!ref.current) {
      return;
    }
    setPosition(ref.current.offsetLeft);
  };

  useEffect(() => {
    if (dayData?.id === value.id) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [dayData?.id, value.id]);

  useEffect(() => {
    const handleChange = () => {
      if (!ref.current) {
        return;
      }
      if (active) {
        setPosition(ref.current?.offsetLeft);
      }
    };
    handleChange();
  }, [active, setPosition]);

  return (
    <li
      ref={ref}
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
