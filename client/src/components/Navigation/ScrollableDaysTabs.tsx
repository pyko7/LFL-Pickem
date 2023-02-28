import { useState } from "react";
import Skeleton from "../Loaders/Skeleton";
import Typography from "@mui/material/Typography";
import { useGameContext } from "@/context/GameContext";
import Tab from "./Tab";
import Tabs from "./Tabs";

const ScrollableDaysTabs = () => {
  const { allDays, dayData, setDayData } = useGameContext();
  const [position, setPosition] = useState(0);
  const dayDataProps = { dayData, setDayData };

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-4xl bg-main-light">
      {allDays.isLoading ? (
        <Skeleton width="100%" height="64px" rounded ariaLabel="Chargement des journées"/>
      ) : allDays.isError ? (
        <Typography sx={{ padding: "0 5px" }}>
          Une erreur est survenue, veuillez réessayer plus tard.
        </Typography>
      ) : (
        <nav aria-label="Selecteur de journée" className=" w-full h-full ">
          <Tabs position={position}>
            {allDays.data?.map((day) => (
              <Tab
                {...dayDataProps}
                setPosition={setPosition}
                label={`Journée ${day.id}`}
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
