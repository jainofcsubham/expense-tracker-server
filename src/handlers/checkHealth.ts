import { Request } from "express";
import { ERROR, OK } from "../utils/handler";
import connectToMongo from "../utils/mongoClient";
import { User } from "../entities/User";

export const healthCheck = async (_req: Request) => {
    return ERROR({message : "Working!!"})
}

export const checkDBHealth = async (_req:Request) => {
  const db = await connectToMongo();
  const data = await db.collection<User>('Users').find().toArray();
  return OK(data)
}