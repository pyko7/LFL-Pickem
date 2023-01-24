import { Team, UserSelection } from "@/src/types/teams";

/**
 * 
 * @param array Each team that the user has chosen
 * @param gameId Id of the game
 * @param team The team that the user has chosen
 * @returns true if the user has chosen a team
 */
export const getUserSelection = (
  array: UserSelection[],
  gameId: number,
  team: Team
) => {
  return array.filter((bet) => bet.gameId === gameId && bet.teamId === team.id)
    .length > 0
    ? true
    : false;
};
