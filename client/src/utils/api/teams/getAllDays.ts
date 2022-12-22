import { Day } from "~/src/types/teams";

export const getAllDays = async (): Promise<Day[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/games`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log("error ici");
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
