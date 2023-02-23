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
      <DateTimeDisplay value={days} type={days > 1 ? "Jours" : "Jour"} />
      <p>:</p>
      <DateTimeDisplay value={hours} type={hours > 1 ? "Heures" : "Heure"} />
      <p>:</p>
      <DateTimeDisplay value={minutes} type={minutes > 1 ? "Minutes" : "Minute"} />
      <p>:</p>
      <DateTimeDisplay value={seconds} type={seconds > 1 ? "secondes" : "seconde"} />
    </Box>
  );
};

export default ShowCounter;
