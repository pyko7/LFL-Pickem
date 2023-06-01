import { useThemeContext } from "@/context/ThemeContext";
import { DayProps } from "@/src/types/types";
import { LiHTMLAttributes, useRef } from "react";

type Props = LiHTMLAttributes<HTMLLIElement> & {
  dayData: DayProps;
  setDayData: (dayData: DayProps) => void;
  label: string;
  value: number;
  setPosition: (position: number) => void;
};

const Tab = ({
  dayData,
  setDayData,
  label,
  value,
  setPosition,
  ...rest
}: Props) => {
  const { leagueId } = useThemeContext();
  const ref = useRef<HTMLLIElement>(null);

  const handleClick = () => {
    if (!ref.current) {
      return;
    }
    setPosition(ref.current.offsetLeft);
  };

  return (
    <li
      ref={ref}
      className={`w-fit h-full py-4 flex  items-center justify-center ${
        dayData.id === value && leagueId === 1
          ? "text-lfl-light border-b-lfl-light font-bold"
          : dayData.id === value && leagueId === 2
          ? "text-divtwo-light border-b-divtwo-light font-bold"
          : "text-neutral-light border-b-transparent"
      }
      ${leagueId === 1 ? "hover:text-lfl-light " : "hover:text-divtwo-light "}
      
      border-b-2 whitespace-nowrap cursor-pointer select-none focus-visible:border-b-lfl-light `}
      onClick={handleClick}
      role="tab"
      tabIndex={0}
      {...rest}
    >
      {label}
    </li>
  );
};

export default Tab;
