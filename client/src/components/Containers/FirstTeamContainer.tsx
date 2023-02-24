import TeamCard from "../Cards/TeamCard";
import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TeamContainerProps } from "@/src/types/teams";

const FirstTeamContainer = (props: TeamContainerProps) => {
  const {
    game,
    firstTeam,
    secondTeam,
    selectedTeam,
    disabledDay,
    notSelected,
    noBet,
    handleClick,
  } = props;

  return (
    <div
      className={`relative ${
        selectedTeam === firstTeam.id
          ? "w-3/4"
          : selectedTeam === secondTeam.id
          ? "w-1/3"
          : "w-1/2"
      }`}
      onClick={() => handleClick(firstTeam.id, secondTeam.id)}
    >
      {!disabledDay ? null : selectedTeam !==
        firstTeam.id ? null : firstTeam.id === game.winner ? (
        <CheckIcon
          aria-label="pari gagnant"
          className="result_icon result_icon--success left-2 sm:left-4"
        />
      ) : (
        <XMarkIcon
          aria-label="pari perdant"
          className="result_icon result_icon--failure left-2 sm:left-4"
        />
      )}

      <TeamCard
        team={firstTeam}
        notSelected={notSelected}
        disabledDay={disabledDay}
        noBet={noBet}
        firstTeam
      />
    </div>
  );
};

export default FirstTeamContainer;
