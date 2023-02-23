import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { useGameContext } from "@/context/GameContext";
import Tab from "./Tab";
import Tabs from "./Tabs";

const ScrollableDaysTabs = () => {
  const { allDays, dayData, setDayData } = useGameContext();
  const [value, setValue] = useState(0);
  const dayDataProps = { dayData, setDayData };

  useEffect(() => {
    if (!dayData) {
      setValue(0);
    } else {
      setValue(dayData?.id! - 1);
    }
  }, [dayData]);

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-4xl bg-main-light">
      {allDays.isLoading ? (
        <Skeleton variant="rectangular" height={48} />
      ) : allDays.isError ? (
        <Typography sx={{ padding: "0 5px" }}>
          Une erreur est survenue, veuillez réessayer plus tard.
        </Typography>
      ) : (
        <nav aria-label="Selecteur de journée" className=" w-full h-full ">
          <Tabs>
            {allDays.data?.map((day) => (
              <Tab
                {...dayDataProps}
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
