import redis from "@/lib/redis";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { ErrorResponse } from "../types";

type SuccessResponse = {
  sessionId: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponse | SuccessResponse>
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not supported" });

  const sessionId = uuidv4();

  await redis.set(
    `session${sessionId}`,
    JSON.stringify({ users: [], messages: [] })
  );

  res.status(201).json({ sessionId });
}
