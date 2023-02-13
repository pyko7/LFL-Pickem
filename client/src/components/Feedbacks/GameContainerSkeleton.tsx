import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const GameContainerSkeleton = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Skeleton variant="rounded" width="49%" height={78} />
      <Skeleton variant="rounded" width="49%" height={78} />
    </Box>
  );
};

export default GameContainerSkeleton;
