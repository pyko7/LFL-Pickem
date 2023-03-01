import TeamCard from "../Cards/TeamCard";
import { CheckIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { TeamContainerProps } from "@/src/types/teams";

const SecondTeamContainer = (props: TeamContainerProps) => {
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
        selectedTeam === secondTeam.id
          ? "w-3/4"
          : selectedTeam === firstTeam.id
          ? "w-1/3"
          : "w-1/2"
      } team_card_animation--width`}
      onClick={() => handleClick(secondTeam.id, firstTeam.id)}
    >
      <TeamCard
        team={secondTeam}
        notSelected={notSelected}
        disabledDay={disabledDay}
        noBet={noBet}
        firstTeam={false}
      />
      {!disabledDay ? null : selectedTeam !==
        secondTeam.id ? null : secondTeam.id === game.winner ? (
        <CheckIcon
          aria-label="pari gagnant"
          className="result_icon result_icon--success right-2 sm:right-4"
        />
      ) : (
        <XMarkIcon
          aria-label="pari perdant"
          className="result_icon result_icon--failure right-2 sm:right-4"
        />
      )}
    </div>
  );
};

export default SecondTeamContainer;
