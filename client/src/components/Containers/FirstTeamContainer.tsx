import { useEffect, useState } from "react";
import TeamCard from "../Cards/TeamCard";
import { TeamCardContainer } from "@/src/types/teams";

const FirstTeamContainer = (props: TeamCardContainer) => {
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
    if (!disabledDay || selectedTeam !== firstTeam.id) {
      return;
    }
    if (firstTeam.id !== game.winner) {
      return setWinningBet(false);
    }
    return setWinningBet(true);
  }, [selectedTeam, disabledDay, firstTeam.id, game.winner]);

  return (
    <div
      className={`relative w-1/2 `}
      onClick={() => handleClick(firstTeam.id, secondTeam.id)}
    >
      <TeamCard
        team={firstTeam}
        notSelected={notSelected}
        disabledDay={disabledDay}
        noBet={noBet}
        winningBet={winningBet}
      />
    </div>
  );
};

export default FirstTeamContainer;
