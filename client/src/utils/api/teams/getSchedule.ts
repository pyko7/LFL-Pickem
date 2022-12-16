import { DayList } from "~/src/types/teams";

export const getSchedule = async ():Promise<DayList> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/team/schedule`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
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
