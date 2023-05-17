import { useState } from "react";
import Tab from "./Tab";
import Tabs from "./Tabs";
import { DayProps } from "@/src/types/types";

type Props = {
  schedule: DayProps[];
  dayData: DayProps;
  setDayData: (dayData: DayProps) => void;
  fetchGames: (id: number) => void;
};

const ScrollableDaysTabs = ({
  schedule,
  dayData,
  setDayData,
  fetchGames,
}: Props) => {
  const [position, setPosition] = useState(0);

  const handleClick = (value: DayProps) => {
    fetchGames(value.id);
    setDayData(value);
  };

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-7xl rounded-md bg-neutral-700">
      <nav aria-label="Selecteur de journée" className=" w-full h-full ">
        <Tabs position={position}>
          {schedule.map((day, index) => (
            <Tab
              dayData={dayData}
              setDayData={setDayData}
              setPosition={setPosition}
              label={`Journée ${index + 1}`}
              value={day.id}
              key={day.id}
              onClick={() => handleClick(day)}
            />
          ))}
        </Tabs>
      </nav>
    </div>
  );
};

export default ScrollableDaysTabs;
