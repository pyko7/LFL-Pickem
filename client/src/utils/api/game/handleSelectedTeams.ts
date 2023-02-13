import { SelectedTeam } from "@/src/types/teams";
import { getCsrfToken } from "../credentials/getCsrfToken";

export const addSelectedTeams = async (bet: SelectedTeam) => {
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
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const updateSelectedTeams = async (bet: SelectedTeam) => {
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
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const deleteSelectedTeams = async (bet: SelectedTeam) => {
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
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
