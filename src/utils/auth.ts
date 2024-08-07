import { Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";
import { CustomRequest } from "../types";

const client = new OAuth2Client(process.env.CLIENT_ID ?? "");


export const authorizeUser = async (req:CustomRequest, res: Response, next :NextFunction ) => {
    const bearerToken = req.headers.authorization ?? ""
    if(!bearerToken){
        res.status(401).send({message: "Authorization token is missing"})
    }
    const accessToken = bearerToken.split(" ")[1];
    try {
        const ticket = await client.getTokenInfo(accessToken);
        if (ticket.aud !== process.env.CLIENT_ID) {
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = ticket;
        console.log(ticket,"HERE")
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return res.status(401).json({ message: "Invalid token" });
    }
}