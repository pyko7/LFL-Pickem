import { Request, Response } from "express";
import { auth } from "../../firebase";
import prisma from "../../prisma";

export const deleteUser = async (req: Request, res: Response) => {
  const token = req.cookies.session;
  try {
    const decodedToken = await auth.verifySessionCookie(token);
    await auth.deleteUser(decodedToken.uid);
    await prisma.user.delete({
      where: {
        id: decodedToken.uid,
      },
    });
    res.clearCookie("session", {
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PROD_DOMAIN
          : process.env.ENV_DOMAIN,
    });
    res.clearCookie("pid", {
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.PROD_DOMAIN
          : process.env.ENV_DOMAIN,
    });
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    return res.status(403).json(error);
  }
};
