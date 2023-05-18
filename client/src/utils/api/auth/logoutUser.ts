import { getCsrfToken } from "../credentials/getCsrfToken";

export const logoutUser = async () => {
  try {
    const csrfToken = await getCsrfToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-csrf-token": csrfToken,
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      if (res.status === 401) {
        throw new Error("Requête non autorisée");
      }
      throw new Error(data);
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
