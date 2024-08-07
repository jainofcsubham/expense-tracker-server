import { Response } from "express";
import { CustomRequest, RequestReturnType } from "../types";

export const OK: (data: any, status?: number) => RequestReturnType = (
  data,
  status = 200
) => ({ status, data });

export const ERROR: (data: any, status?: number) => RequestReturnType = (
  data,
  status = 500
) => ({ status, data });

export const handler: (
  callback: (req: CustomRequest) => Promise<RequestReturnType>
) => (
  req: CustomRequest,
  res: Response
) => Promise<Response<any, Record<string, any>>> = (callback) => {
  return async (req: CustomRequest, res: Response) => {
    const result = await callback(req);
    return res.status(result.status).send(result.data);
  };
};
