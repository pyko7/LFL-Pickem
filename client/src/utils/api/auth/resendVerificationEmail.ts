export const resendVerificationEmail = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/confirm-email`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data);
  }
  return data;
};
