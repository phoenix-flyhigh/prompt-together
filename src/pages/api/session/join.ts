import redis from "@/lib/redis";
import { NextApiRequest, NextApiResponse } from "next";
import { ErrorResponse } from "../types";

type User = {
  name: string;
};

type SuccessResponse = {
  users: User[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not supported" });

  const { sessionId, username } = req.body;

  const session = await redis.get(`session${sessionId}`);
console.log("session", session);

  if (!session) return res.status(404).json({ message: "Session not found!" });

  const data = JSON.parse(session);

  if (data.users.length > 3)
    return res.status(403).json({ message: "Session is full!" });

  const updatedData = { ...data, users: [...data.users, { name: username }] };

  await redis.set(`session${sessionId}`, JSON.stringify(updatedData))

  return res.status(200).json({users: updatedData.users})
}
