import Skeleton from "./Skeleton";

const GameContainerSkeleton = () => {
  return (
    <div className="w-full flex justify-between">
      <Skeleton width="49%" height="78px" rounded ariaLabel="Chargement des équipes" />
      <Skeleton width="49%" height="78px" rounded ariaLabel="Chargement des équipes" />
    </div>
  );
};

export default GameContainerSkeleton;
