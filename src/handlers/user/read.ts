import { OK } from "../../utils/handler";
import { CustomRequest } from "src/types";

export const getUser = async (req:CustomRequest) => {
  return OK({message : "Authorized",data : req.user})
}