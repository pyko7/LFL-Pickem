import { TeamList } from "@/src/types/teams";

export const getTeamsByLeague = async (): Promise<TeamList> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/game/teams`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("Server error");
  }
};
