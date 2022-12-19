import { Request, Response } from "express";
import { auth, db } from "../../firebase";

export const getUserById = async (req: Request, res: Response) => {
  const sessionId = req.cookies.session;
  try {
    const decodedToken = await auth.verifySessionCookie(sessionId, true);
    const data = await auth.getUser(decodedToken.uid);
    const doc = await db.collection("users").doc(decodedToken.uid).get();

    if (!doc.exists) {
      throw new Error("Unknown user");
    }
    const userName = data.providerData[0].displayName;
    const gamesData = doc.data();
    const user = {
      userName,
      gamesData,
    };
    res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json(error.message);
    }
    res.status(400).json(error);
  }
};
