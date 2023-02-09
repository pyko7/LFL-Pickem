export const getCsrfToken = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/csrf-token`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error("An error has occured");
    }
    return data.csrfToken;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
