export const getUserScore = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/score`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();
    if (!res.ok) {
      console.log("erreur");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
    return error;
  }
};
