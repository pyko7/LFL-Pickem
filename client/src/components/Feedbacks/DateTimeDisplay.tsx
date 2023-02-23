import Box from "@mui/material/Box";

interface Props {
  value: number;
  type: string;
}

const DateTimeDisplay = ({ value, type }: Props) => {
  return (
    <Box sx={{ display: "flex", alignItems:"center" ,gap:1, fontWeight: "bold" }}>
      <p>{value}</p>
      <span>{type}</span>
    </Box>
  );
};

export default DateTimeDisplay;
