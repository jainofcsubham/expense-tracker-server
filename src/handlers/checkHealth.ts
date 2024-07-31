import { Request } from "express";
import { ERROR } from "../utils/handler";

export const healthCheck = async (_req: Request) => {
    // logger.info('Server is starting');
    return ERROR({message : "Working!!"})
  }