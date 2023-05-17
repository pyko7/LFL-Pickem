import { useState } from "react";
import Skeleton from "../Loaders/Skeleton";
import Tab from "./Tab";
import Tabs from "./Tabs";
import { DayProps } from "@/src/types/types";

type Props = {
  schedule: DayProps[];
  dayData: DayProps;
  setDayData: (dayData: DayProps) => void;
};

const ScrollableDaysTabs = ({ schedule, dayData, setDayData }: Props) => {
  const [position, setPosition] = useState(0);

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
              value={day}
              key={day.id}
            />
          ))}
        </Tabs>
      </nav>
    </div>
  );
};

export default ScrollableDaysTabs;
