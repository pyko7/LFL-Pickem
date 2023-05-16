import { DayProps } from "@/src/types/types";

export const getAllDays = async (): Promise<DayProps[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/game/days`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
