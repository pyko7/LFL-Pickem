import { useState } from "react";
import Skeleton from "../Loaders/Skeleton";
import Tab from "./Tab";
import Tabs from "./Tabs";
import { UseQueryResult } from "@tanstack/react-query";
import { Day } from "@/src/types/teams";

type Props = {
  schedule: UseQueryResult<Day[]>;
  dayData: Day | null;
  setDayData: (dayData: Day) => void;
};

const ScrollableDaysTabs = ({ schedule, dayData, setDayData }: Props) => {
  const [position, setPosition] = useState(0);

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-7xl rounded-md bg-neutral-700">
      {schedule.isLoading ? (
        <Skeleton
          width="100%"
          height="64px"
          rounded
          ariaLabel="Chargement des journées"
        />
      ) : schedule.isError ? (
        <div>
          <p className="w-full h-16 px-4 flex items-center justify-center text-neutral-light">
            Une erreur est survenue, veuillez réessayer plus tard.
          </p>
        </div>
      ) : (
        <nav aria-label="Selecteur de journée" className=" w-full h-full ">
          <Tabs position={position}>
            {schedule.data?.map((day, index) => (
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
      )}
    </div>
  );
};

export default ScrollableDaysTabs;
