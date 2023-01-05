import { SelectedTeam } from "~/src/types/teams";

export const addSelectedTeams = async (team: SelectedTeam) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/game/selected`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(team),
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

export const updateSelectedTeams = async (team: SelectedTeam) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/game/selected`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(team),
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

export const deleteSelectedTeams = async (team: SelectedTeam) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/game/selected`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(team),
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