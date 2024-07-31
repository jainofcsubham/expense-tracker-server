import { Request } from "express";
import { ERROR, OK } from "../utils/handler";
import connectToMongo from "../utils/mongoClient";

export const healthCheck = async (_req: Request) => {
    // logger.info('Server is starting');
    return ERROR({message : "Working!!"})
}

export const checkDBHealth = async (_req:Request) => {
  const db = await connectToMongo();
  const data = await db.collection('Balances').find().toArray();
  return OK(data)
}