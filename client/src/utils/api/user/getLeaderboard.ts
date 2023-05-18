import { UserLeaderboard } from "@/src/types/types";

export const getLeaderboard = async (): Promise<UserLeaderboard[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/game/leaderboard`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    console.log(data);
    if (!res.ok) {
      throw new Error("Une erreur est survenue");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};
