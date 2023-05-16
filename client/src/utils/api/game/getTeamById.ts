import { Team } from "@/src/types/types";

export const getTeamById = async (id: number): Promise<Team> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/game/team/${id}`,
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
