import { useEffect, useState } from "react";
import TeamCard from "../Cards/TeamCard";
import { TeamCardContainer } from "@/src/types/teams";

const SecondTeamContainer = (props: TeamCardContainer) => {
  const [winningBet, setWinningBet] = useState<boolean | null>(null);

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

  useEffect(() => {
    if (!disabledDay || selectedTeam !== secondTeam.id) {
      return;
    }
    if (secondTeam.id !== game.winner) {
      return setWinningBet(false);
    }
    return setWinningBet(true);
  }, [selectedTeam, disabledDay, secondTeam.id, game.winner]);

  return (
    <div
      className={`relative w-1/2`}
      onClick={() => handleClick(secondTeam.id, firstTeam.id)}
    >
      <TeamCard
        team={secondTeam}
        notSelected={notSelected}
        disabledDay={disabledDay}
        noBet={noBet}
        winningBet={winningBet}
        reversed={true}

      />
    </div>
  );
};

export default SecondTeamContainer;
