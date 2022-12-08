export const getLoginCsrfToken = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data);
  }
  return data;
};
