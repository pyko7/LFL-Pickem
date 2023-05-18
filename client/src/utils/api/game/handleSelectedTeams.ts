import { getCsrfToken } from "../credentials/getCsrfToken";

type Bet = {
  gameId: number;
  teamId: number;
  dayId: number;
};

export const addSelectedTeams = async (bet: Bet): Promise<void> => {
  try {
    const csrfToken = await getCsrfToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/game/selected`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(bet),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(res.statusText);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const updateSelectedTeams = async (bet: Bet): Promise<void> => {
  try {
    const csrfToken = await getCsrfToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/game/selected`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(bet),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(res.statusText);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};

export const deleteSelectedTeams = async (bet: Bet): Promise<void> => {
  try {
    const csrfToken = await getCsrfToken();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/game/selected`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify(bet),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      throw new Error(res.statusText);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw error;
  }
};
