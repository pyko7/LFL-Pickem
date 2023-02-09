import { getCsrfToken } from "../credentials/getCsrfToken";

export const updateUserScore = async () => {
  try {
    const csrfToken = await getCsrfToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/score`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("Une erreur est survenue");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error);
      throw new Error(error.message);
    }
    throw new Error("Une erreur est survenue");
  }
};
