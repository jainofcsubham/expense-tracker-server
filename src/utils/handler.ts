import { Request, Response } from "express";
import { RequestReturnType } from "../types";

export const OK: (data: any, status?: number) => RequestReturnType = (
  data,
  status = 200
) => ({ status, data });

export const ERROR: (data: any, status?: number) => RequestReturnType = (
  data,
  status = 500
) => ({ status, data });


export const handler: (
  callback: (req: Request) => Promise<RequestReturnType>
) => (req: Request, res: Response) => Promise<void> = (callback) => {
  return async (req: Request, res: Response) => {
    const result = await callback(req);
    res.status(result.status).send(result.data);
  };
};
