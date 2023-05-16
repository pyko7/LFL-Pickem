import { Day } from "@/src/types/teams";
import { useEffect, useRef, useState } from "react";

type Props = {
  dayData: Day | null;
  setDayData: (dayData: Day) => void;
  label: string;
  value: Day;
  setPosition: (position: number) => void;
};

const Tab = ({ dayData, setDayData, label, value, setPosition }: Props) => {
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
      className={`w-fit h-full py-4 flex  items-center justify-center ${
        active
          ? "text-lfl-light border-b-lfl-light font-bold"
          : "text-neutral-light border-b-transparent"
      } border-b-2 whitespace-nowrap cursor-pointer select-none hover:text-lfl-light focus-visible:border-b-lfl-light`}
      onClick={handleClick}
      role="tab"
      tabIndex={0}
    >
      {label}
    </li>
  );
};

export default Tab;
