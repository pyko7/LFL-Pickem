import Box from "@mui/material/Box";
import DateTimeDisplay from "./DateTimeDisplay";

interface Props {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const ShowCounter = ({ days, hours, minutes, seconds }: Props) => {
  return (
    <Box sx={{ display: "flex", gap: 4, fontWeight: "bold" }}>
      <DateTimeDisplay value={days} type={"Days"} />
      <p>:</p>
      <DateTimeDisplay value={hours} type={"Hours"} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={"Mins"} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={"Seconds"} />
    </Box>
  );
};

export default ShowCounter;
